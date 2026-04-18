<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$report = \App\Models\Report::where('id', 156)->first();
if ($report) {
    echo "Found report!\n";
    echo "Batch ID: " . $report->batch_id . "\n";
    echo "File Path: " . $report->file_path . "\n";
    echo "Exists on disk: " . (\Illuminate\Support\Facades\Storage::disk('public')->exists($report->file_path) ? 'Yes' : 'No') . "\n";
} else {
    echo "Report NOT FOUND.\n";
}
