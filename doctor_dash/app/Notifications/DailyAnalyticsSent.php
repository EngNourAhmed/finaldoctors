<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class DailyAnalyticsSent extends Notification
{
    use Queueable;

    protected $date;

    /**
     * Create a new notification instance.
     */
    public function __construct($date)
    {
        $this->date = $date;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['database'];
    }

    /**
     * Get the array representation of the notification for database storage.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'title' => 'Daily Analytics Sent',
            'message' => 'The daily analytics report for ' . $this->date . ' has been sent to info@bone-hard.com',
            'type' => 'analytics',
            'icon' => 'fas fa-chart-line',
            'link' => route('admin.analytics.index'),
        ];
    }
}
