<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\User;
use Illuminate\Support\Facades\DB;

$admin = User::where('role', 'admin')->first();
if (!$admin) {
    echo "No admin found\n";
    exit;
}

echo "Admin: " . $admin->name . " (ID: " . $admin->id . ")\n";

$counts = DB::table('notifications')
    ->where('notifiable_id', $admin->id)
    ->where('data->type', 'case_created')
    ->count();

echo "Count with -> operator: " . $counts . "\n";

$all = DB::table('notifications')
    ->where('notifiable_id', $admin->id)
    ->get();

$filtered = $all->filter(function($n) {
    $data = json_decode($n->data, true);
    return isset($data['type']) && $data['type'] === 'case_created';
});

echo "Count with PHP filter: " . $filtered->count() . "\n";

$chatCounts = DB::table('notifications')
    ->where('notifiable_id', $admin->id)
    ->where('data->type', 'case_message_received')
    ->count();

echo "Chat Notification Count with -> operator: " . $chatCounts . "\n";
