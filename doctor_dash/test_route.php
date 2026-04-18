<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$request = Illuminate\Http\Request::create('/reports/shared/76c6fa84-a7f9-4c48-b9f1-4434173e74af/156/preview?signature=c0d3c87cad26af8e803aef9b5a3eb95e179b2b3b40', 'GET');
$route = app('router')->getRoutes()->match($request);
echo "Matched Route: " . $route->getName() . "\n";
