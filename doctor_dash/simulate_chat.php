<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\User;
use App\Models\Report;
use App\Models\Conversation;
use App\Models\Message;
use App\Http\Controllers\CaseChatController;
use Illuminate\Http\Request;

// 1. Find a report to chat about
$report = Report::first();
if (!$report) {
    echo "No report found\n";
    exit;
}
$batchId = $report->batch_id;
echo "Testing with Report Batch ID: " . $batchId . "\n";

// 2. Find a client user (or create a dummy one)
$client = $report->user;
echo "Client sender: " . $client->name . " (ID: " . $client->id . ", Role: " . $client->role . ")\n";

// 3. Instantiate controller and call notifyParticipants (directly via reflection since its protected)
$controller = new CaseChatController();
$conversation = Conversation::where('batch_id', $batchId)->first();
if (!$conversation) {
    echo "Creating conversation object for test...\n";
    $conversation = new Conversation(['batch_id' => $batchId, 'type' => 'case_chat']);
}

echo "Simulating message from client...\n";

$method = new ReflectionMethod(CaseChatController::class, 'notifyParticipants');
$method->setAccessible(true);
$method->invoke($controller, $conversation, $client, $batchId);

echo "Check storage/logs/laravel.log for results.\n";
