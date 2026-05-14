<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\Response as HttpResponse;

class PasswordResetOtpController extends Controller
{
    public function create(Request $request): Response
    {
        return Inertia::render('Auth/VerifyOtp', [
            'email' => $request->query('email', ''),
            'status' => session('status'),
        ]);
    }

    public function store(Request $request): HttpResponse
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
            'otp' => 'required|digits:4',
        ]);

        $cachedOtp = Cache::get('otp_' . $request->email);

        if (!$cachedOtp || $cachedOtp !== $request->otp) {
            throw ValidationException::withMessages([
                'otp' => ['OTP tidak valid atau sudah kadaluarsa'],
            ]);
        }

        Cache::put('otp_verified_' . $request->email, true, now()->addMinutes(10));
        Cache::forget('otp_' . $request->email);

        if ($request->header('X-Inertia')) {
            return Inertia::location(route('password.reset.otp', ['email' => $request->email]));
        }

        return redirect()->route('password.reset.otp', ['email' => $request->email]);
    }
}
