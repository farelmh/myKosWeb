<?php

use App\Models\User;
use App\Notifications\PasswordResetOtpNotification;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Notification;

test('reset password link screen can be rendered', function () {
    $response = $this->get('/forgot-password');

    $response->assertStatus(200);
});

test('reset password link can be requested', function () {
    Notification::fake();

    $user = User::factory()->create();

    $this->post('/forgot-password', ['email' => $user->email]);

    Notification::assertSentTo($user, PasswordResetOtpNotification::class);
});

test('otp verification screen can be rendered', function () {
    Notification::fake();

    $user = User::factory()->create();

    $this->post('/forgot-password', ['email' => $user->email]);

    $response = $this->get('/forgot-password/otp?email=' . urlencode($user->email));
    $response->assertStatus(200);
});

test('password can be reset with valid otp', function () {
    Notification::fake();

    $user = User::factory()->create();

    $this->post('/forgot-password', ['email' => $user->email]);

    $otp = Cache::get('otp_' . $user->email);
    expect($otp)->not->toBeNull();

    $this->post('/forgot-password/otp', [
        'email' => $user->email,
        'otp' => $otp,
    ])->assertRedirect('/reset-password/otp?email=' . urlencode($user->email));

    $response = $this->post('/reset-password/otp', [
        'email' => $user->email,
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    $response
        ->assertSessionHasNoErrors()
        ->assertRedirect(route('login'));
});
