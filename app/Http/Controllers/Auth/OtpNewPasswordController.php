<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\Response as HttpResponse;

class OtpNewPasswordController extends Controller
{
    public function create(Request $request): Response
    {
        return Inertia::render('Auth/ResetPasswordOtp', [
            'email' => $request->query('email', ''),
        ]);
    }

    public function store(Request $request): HttpResponse
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        if (!Cache::get('otp_verified_' . $request->email)) {
            throw ValidationException::withMessages([
                'otp' => ['Verifikasi OTP diperlukan sebelum reset password'],
            ]);
        }

        $user = User::where('email', '=', $request->email, 'and')->firstOrFail();

        $user->forceFill([
            'password' => Hash::make($request->password),
            'remember_token' => Str::random(60),
        ])->save();

        event(new PasswordReset($user));

        Cache::forget('otp_verified_' . $request->email);

        $statusMessage = 'Password berhasil diubah. Silakan login.';

        if ($request->header('X-Inertia')) {
            $request->session()->flash('status', $statusMessage);

            return Inertia::location(route('login'));
        }

        return redirect()->route('login')->with('status', $statusMessage);
    }
}
