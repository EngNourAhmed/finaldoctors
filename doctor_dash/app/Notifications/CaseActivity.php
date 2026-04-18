<?php

namespace App\Notifications;

use App\Models\Report;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class CaseActivity extends Notification
{
    use Queueable;

    public $report;
    public $action;

    /**
     * Create a new notification instance.
     */
    public function __construct(?Report $report, $action)
    {
        $this->report = $report;
        $this->action = $action;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via($notifiable): array
    {
        return ['database'];
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray($notifiable): array
    {
        $userName = $this->report && $this->report->user ? $this->report->user->name : 'User';
        $reportTitle = $this->report ? $this->report->title : 'Unknown Case';
        $adminName = auth()->user() ? auth()->user()->name : 'Admin';

        // Different messages based on action and user role
        if ($this->action === 'response_submitted') {
            if ($notifiable->role === 'user') {
                $message = "You have a new response from {$adminName} on your case \"{$reportTitle}\".";
                $title = "New Response on Your Case";
            } else {
                $message = "{$adminName} submitted a response to case \"{$reportTitle}\".";
                $title = "Case Response Submitted";
            }
        } elseif ($this->action === 'reply_case_submitted') {
            if ($notifiable->role === 'user') {
                $message = "The staff has uploaded a new result/plan for your case \"{$reportTitle}\". Check the Admin Reply tab.";
                $title = "New Case Result Available";
            } else {
                $message = "{$adminName} uploaded a result/plan to case \"{$reportTitle}\".";
                $title = "Case Result Uploaded";
            }
        } elseif ($this->action === 'message_received') {
            if ($notifiable->role === 'user') {
                $message = "You have a new message from {$adminName} regarding your case \"{$reportTitle}\".";
                $title = "New Message on Your Case";
            } else {
                $message = "{$userName} sent a new message on case \"{$reportTitle}\".";
                $title = "New Case Message";
            }
        } else {
            $actionText = ucfirst(str_replace('_', ' ', $this->action));
            $message = "Case \"{$reportTitle}\" was {$this->action} by {$userName}.";
            $title = "Case {$actionText}";
        }

        return [
            'report_id' => $this->report ? $this->report->id : null,
            'batch_id' => $this->report ? $this->report->batch_id : null,
            'title' => $title,
            'message' => $message,
            'url' => $notifiable->role === 'user' 
                ? route('user.reports.show', $this->report->batch_id ?? $this->report->id ?? 0)
                : route('admin.cases.index'),
            'type' => "case_{$this->action}",
            'admin_name' => $adminName,
        ];
    }
}
