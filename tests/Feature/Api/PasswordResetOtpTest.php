<?php

use App\Models\User;
use App\Notifications\PasswordResetOtpNotification;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Notification;

test('api forgot-password sends otp notification and caches otp', function () {
    Notification::fake();

    $user = User::factory()->create();

    $this->postJson('/api/forgot-password', ['email' => $user->email])
        ->assertOk();

    Notification::assertSentTo($user, PasswordResetOtpNotification::class);

    expect(Cache::get('otp_' . $user->email))->not->toBeNull();
});

test('api otp can be verified and used to reset password', function () {
    Notification::fake();

    $user = User::factory()->create([
        'password' => Hash::make('old-password'),
    ]);

    $this->postJson('/api/forgot-password', ['email' => $user->email])
        ->assertOk();

    $otp = Cache::get('otp_' . $user->email);
    expect($otp)->not->toBeNull();

    $this->postJson('/api/verify-otp', [
        'email' => $user->email,
        'otp' => $otp,
    ])->assertOk();

    expect(Cache::get('otp_' . $user->email))->toBeNull();
    expect(Cache::get('otp_verified_' . $user->email))->toBeTrue();

    $this->postJson('/api/reset-password', [
        'email' => $user->email,
        'password' => 'new-password',
        'password_confirmation' => 'new-password',
    ])->assertOk();

    $user->refresh();
    expect(Hash::check('new-password', $user->password))->toBeTrue();
    expect(Cache::get('otp_verified_' . $user->email))->toBeNull();
});
