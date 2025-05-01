<?php

namespace App\Notifications\Auth;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\URL;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\JWT;

class VerifyEmailNotification extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct($token)
    {
        //
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {

        $backend_url = URL::temporarySignedRoute(
            'verification.verify',
            now()->addMinutes(60),
            [
                'id' => JWTAuth::user()->id,
                'hash' => sha1(JWTAuth::user()->getEmailForVerification())
            ],
        );

        // dd($backend_url);

        $queryString = parse_url($backend_url, PHP_URL_QUERY);

        $frontend_url = config('app.frontend_url') . '/verify-email' . '?' . $queryString;


        //COMPROBAR PARAMETROS RECIBIDOS EN FRONT Y LOS QUE SE ENVIAN
        
        return (new MailMessage)
            ->subject('Verify Email Address ')
            ->view('emails.auth.verify_email', [
                'url' => $frontend_url,
                'user' => $notifiable,
            ]);
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
