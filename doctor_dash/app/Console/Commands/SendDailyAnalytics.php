<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Services\AnalyticsService;
use App\Mail\DailyAnalyticsMail;
use Illuminate\Support\Facades\Mail;
use Barryvdh\DomPDF\Facade\Pdf;

class SendDailyAnalytics extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'analytics:send-daily';

    /**
     * The message of the console command.
     *
     * @var string
     */
    protected $description = 'Generate and send the daily analytics PDF report to info@bone-hard.com';

    /**
     * Execute the console command.
     */
    public function handle(AnalyticsService $service)
    {
        $this->info('Starting daily analytics report generation...');

        try {
            $stats = $service->getAnalyticsData();
            $date = now()->format('Y-m-d');

            // Generate PDF content
            $pdfContent = Pdf::loadView('pdfs.analytics_report', compact('stats'))->output();

            // Send Email
            Mail::to('info@bone-hard.com')->send(new DailyAnalyticsMail($pdfContent, $date));

            // Notify Admin Users in Dashboard
            $admins = \App\Models\User::whereIn('role', ['admin', 'assistant', 'admin_assistant'])->get();
            \Illuminate\Support\Facades\Notification::send($admins, new \App\Notifications\DailyAnalyticsSent($date));

            $this->info('Daily analytics report sent successfully to info@bone-hard.com');
        } catch (\Exception $e) {
            $this->error('Failed to send daily analytics: ' . $e->getMessage());
            return 1;
        }

        return 0;
    }
}
