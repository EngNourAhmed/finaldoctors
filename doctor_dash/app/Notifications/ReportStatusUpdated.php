<?php

namespace App\Notifications;

use App\Models\Report;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ReportStatusUpdated extends Notification
{
    use Queueable;

    protected $report;
    protected $newStatus;
    protected $oldStatus;
    protected $updatedBy;

    /**
     * Create a new notification instance.
     */
    public function __construct(Report $report, string $newStatus, ?string $oldStatus = null)
    {
        $this->report = $report;
        $this->newStatus = $newStatus;
        $this->oldStatus = $oldStatus;
        $this->updatedBy = auth()->user();
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
        $updaterName = $this->updatedBy ? $this->updatedBy->name : 'System';
        $updaterRole = $this->updatedBy ? $this->updatedBy->role : 'system';

        // Neutral message for users, detailed for staff
        if ($notifiable->role === 'user') {
            $message = "The status of your case \"{$this->report->title}\" has been updated from \"{$this->oldStatus}\" to \"{$this->newStatus}\".";
        } else {
            $message = "{$updaterName} updated status from \"{$this->oldStatus}\" to \"{$this->newStatus}\".";
        }

        return [
            'report_id' => $this->report->id,
            'batch_id' => $this->report->batch_id,
            'title' => 'Case Status Updated',
            'message' => $message,
            'old_status' => $this->oldStatus,
            'new_status' => $this->newStatus,
            'updated_by_id' => $this->updatedBy ? $this->updatedBy->id : null,
            'updated_by_name' => $updaterName,
            'updated_by_role' => $updaterRole,
            'url' => $notifiable->role === 'user' ? route('user.reports.show', $this->report->batch_id) : route('admin.cases.index'),
            'type' => 'status_update',
        ];
    }
}
