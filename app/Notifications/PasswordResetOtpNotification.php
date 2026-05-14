<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class PasswordResetOtpNotification extends Notification
{
    use Queueable;

    public function __construct(
        private readonly string $otp,
        private readonly int $expiresMinutes = 10,
    ) {
    }

    /**
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Kode OTP Reset Password')
            ->line('Kami menerima permintaan untuk reset password akun Anda.')
            ->line('Kode OTP Anda: ' . $this->otp)
            ->line('Kode ini berlaku selama ' . $this->expiresMinutes . ' menit.')
            ->line('Jika Anda tidak meminta reset password, abaikan email ini.');
    }
}
