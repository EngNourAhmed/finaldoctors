<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class DailyAnalyticsMail extends Mailable
{
    use Queueable, SerializesModels;

    public $pdfContent;
    public $date;

    /**
     * Create a new message instance.
     */
    public function __construct($pdfContent, $date)
    {
        $this->pdfContent = $pdfContent;
        $this->date = $date;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Daily Analytics Report - ' . $this->date,
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.daily_analytics',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [
            Attachment::fromData(fn () => $this->pdfContent, "analytics_report_{$this->date}.pdf")
                ->withMime('application/pdf'),
        ];
    }
}
