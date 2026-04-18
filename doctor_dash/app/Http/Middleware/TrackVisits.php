<?php

namespace App\Http\Middleware;

use App\Models\Visit;
use Closure;
use Illuminate\Http\Request;

class TrackVisits
{
    public function handle(Request $request, Closure $next)
    {
        $response = $next($request);

        try {
            $path = $request->path();

            // لا نسجل مسار فحص الدخول أو الملفات الثابتة (صور، فيديو، CSS, JS, ...)
            $isAuthStatus = $request->is('auth/status');
            $isAnalytics = $request->is('admin/analytics*');
            $isStaticAsset = (bool) preg_match('/\.(js|css|png|jpe?g|gif|webp|svg|ico|mp4|webm|ogg|mp3|wav|pdf|txt|json)$/i', $path);
            $isApiCall = $request->ajax() || $request->wantsJson();

            if (auth()->check() && !$isAuthStatus && !$isAnalytics && !$isStaticAsset && !$isApiCall) {
                $ip = $request->ip();
                
                // Fetch country from cache or API
                $country = \Illuminate\Support\Facades\Cache::remember('ip_country_' . $ip, 86400, function () use ($ip) {
                    if ($ip === '127.0.0.1' || $ip === '::1') {
                        return 'Localhost';
                    }
                    try {
                        $res = \Illuminate\Support\Facades\Http::get("http://ip-api.com/json/{$ip}?fields=status,country");
                        if ($res->successful() && $res->json('status') === 'success') {
                            return $res->json('country');
                        }
                    } catch (\Throwable $e) {
                        return 'Unknown';
                    }
                    return 'Unknown';
                });

                Visit::create([
                    'user_id' => optional($request->user())->id,
                    'ip_address' => $ip,
                    'country' => $country,
                    'path' => $path,
                    'user_agent' => substr((string) $request->userAgent(), 0, 1000),
                ]);
            }
        } catch (\Throwable $e) {
            // لا نكسر الطلب لو حصل خطأ في تسجيل الزيارة
        }

        return $response;
    }
}
