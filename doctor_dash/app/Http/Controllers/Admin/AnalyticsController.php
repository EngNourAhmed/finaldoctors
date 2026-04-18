<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Visit;
use App\Models\Report;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;

class AnalyticsController extends Controller
{
    protected $analyticsService;

    public function __construct(\App\Services\AnalyticsService $analyticsService)
    {
        $this->analyticsService = $analyticsService;
    }

    public function index()
    {
        $stats = $this->analyticsService->getAnalyticsData();
        return view('admin.analytics.index', compact('stats'));
    }

    public function export()
    {
        $stats = $this->analyticsService->getAnalyticsData();
        $pdf = Pdf::loadView('pdfs.analytics_report', compact('stats'));
        return $pdf->download('analytics_report_' . now()->format('Ymd') . '.pdf');
    }

    public function userActivity(User $user)
    {
        $activities = Visit::where('user_id', $user->id)
            ->latest()
            ->limit(50)
            ->get()
            ->map(function ($visit) {
                return [
                    'date' => $visit->created_at->format('Y-m-d H:i:s'),
                    'time_ago' => $visit->created_at->diffForHumans(),
                    'page' => $this->analyticsService->getPageName($visit->path),
                    'ip' => $visit->ip_address,
                    'location' => $visit->country ?? 'Unknown',
                    'is_login' => $visit->is_login,
                ];
            });

        return response()->json([
            'user' => [
                'name' => $user->name,
                'role' => strtoupper($user->role),
            ],
            'activities' => $activities
        ]);
    }

    public function trackEngagement(Request $request)
    {
        try {
            $path = $request->input('path', '/');
            
            // Clean absolute URLs to relative paths for analytics consistency
            if (str_starts_with($path, 'http')) {
                $parsedUrl = parse_url($path);
                $path = ltrim($parsedUrl['path'] ?? '/', '/');
            } else {
                $path = ltrim($path, '/');
            }
            
            if (empty($path)) {
                $path = '/';
            }

            $ip = $request->ip();
            
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
                'user_id' => auth()->id(),
                'ip_address' => $ip,
                'country' => $country,
                'path' => $path,
                'user_agent' => substr((string) $request->userAgent(), 0, 1000),
            ]);

            return response()->json(['status' => 'tracked']);
        } catch (\Throwable $e) {
            return response()->json(['status' => 'error'], 500);
        }
    }
}
