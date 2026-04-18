<?php
$user = App\Models\User::first();
if (!$user) {
    echo "No user found\n";
    exit;
}

$request = Illuminate\Http\Request::create(
    '/case/f0812181-f8ec-475a-9bd5-67fc143107ca/chat/send',
    'POST',
    ['message' => 'hello']
);
$request->setUserResolver(function() use ($user) { return $user; });

$kernel = app()->make(Illuminate\Contracts\Http\Kernel::class);
$response = $kernel->handle($request);

echo "Status: " . $response->getStatusCode() . "\n";
echo "Content: " . $response->getContent() . "\n";
