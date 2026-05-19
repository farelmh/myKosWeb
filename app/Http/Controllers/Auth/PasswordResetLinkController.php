<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;

use App\Models\User;
use App\Notifications\PasswordResetOtpNotification;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\Response as HttpResponse; 

class PasswordResetLinkController extends Controller
{
    /**
     * Display the password reset link request view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/ForgotPassword', [
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming password reset link request.
     *
     * @throws ValidationException
     */
    public function store(Request $request): HttpResponse
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
        ]);

        $expiresMinutes = 10;
        $otp = str_pad(random_int(0, 9999), 4, '0', STR_PAD_LEFT);

        Cache::put('otp_' . $request->email, $otp, now()->addMinutes($expiresMinutes));

        $user = User::where('email', '=', $request->email, 'and')->first();
        if ($user) {
            $smtpUsername = (string) config('mail.mailers.smtp.username');
            $smtpPassword = (string) config('mail.mailers.smtp.password');

            if (config('mail.default') === 'smtp' && ($smtpUsername === '' || $smtpPassword === '')) {
                throw ValidationException::withMessages([
                    'email' => ['Konfigurasi email belum lengkap. Isi MAIL_USERNAME dan MAIL_PASSWORD (App Password Gmail) di .env.'],
                ]);
            }

            try {
                $user->notify(new PasswordResetOtpNotification($otp, $expiresMinutes));
            } catch (\Throwable $e) {
                report($e);
                throw ValidationException::withMessages([
                    'email' => ['Gagal mengirim OTP. Silakan coba lagi.'],
                ]);
            }
        }

        $statusMessage = 'Kode OTP telah dikirim ke ' . $request->email;

        if ($request->header('X-Inertia')) {
            $request->session()->flash('status', $statusMessage);

            return Inertia::location(route('password.otp', ['email' => $request->email]));
        }

        return redirect()
            ->route('password.otp', ['email' => $request->email])
            ->with('status', $statusMessage);

    }
}
