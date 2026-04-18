<?php

namespace App\Services;

use App\Models\Visit;
use App\Models\Report;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class AnalyticsService
{
    /**
     * Get all analytics data for dashboard and reports.
     */
    public function getAnalyticsData()
    {
        $today = Carbon::today();
        
        // 1. Visit Stats
        $totalVisits = Visit::where('is_login', true)->count();
        $totalVisitsToday = Visit::where('is_login', true)->whereDate('created_at', $today)->count();
        $uniqueVisitors = Visit::where('is_login', true)->distinct('ip_address')->count('ip_address');

        // Dashboard Visits (Logins by Admin/Assistant staff)
        $dashboardVisitsTotal = Visit::where('is_login', true)
            ->whereHas('user', function($q) {
                $q->whereIn('role', ['admin', 'assistant', 'admin_assistant']);
            })->count();
        $dashboardVisitsToday = Visit::where('is_login', true)
            ->whereHas('user', function($q) {
                $q->whereIn('role', ['admin', 'assistant', 'admin_assistant']);
            })->whereDate('created_at', $today)->count();

        // Website Visits (Logins by regular Users/Clients)
        $websiteVisitsTotal = Visit::where('is_login', true)
            ->whereHas('user', function($q) {
                $q->where('role', 'user');
            })->count();
        $websiteVisitsToday = Visit::where('is_login', true)
            ->whereHas('user', function($q) {
                $q->where('role', 'user');
            })->whereDate('created_at', $today)->count();

        // 2. Last 7 Days Logins
        $last7Days = [];
        for ($i = 6; $i >= 0; $i--) {
            $date = Carbon::today()->subDays($i)->toDateString();
            $count = Visit::where('is_login', true)->whereDate('created_at', $date)->count();
            $last7Days[] = ['date' => $date, 'count' => $count];
        }

        // 3. Case Status Distribution
        $caseStats = Report::select('status', \Illuminate\Support\Facades\DB::raw('COUNT(DISTINCT COALESCE(batch_id, id)) as count'))
            ->groupBy('status')
            ->get();

        // 4. Top Pages (Friendly Names)
        $rawPages = Visit::select('path', \Illuminate\Support\Facades\DB::raw('count(*) as total'))
            ->where('path', '!=', 'auth/status')
            ->groupBy('path')
            ->get();

        $topPages = collect($rawPages)
            ->groupBy(function($visit) {
                return $this->getPageName($visit->path);
            })
            ->map(function($group, $key) {
                return (object)[
                    'display_name' => $key,
                    'total' => $group->sum('total')
                ];
            })
            ->sortByDesc('total')
            ->take(10)
            ->values();

        // 5. User Engagement Table
        $userTopPaths = DB::select("
            SELECT user_id, path
            FROM (
                SELECT user_id, path, ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY count(*) DESC) as rn
                FROM visits
                WHERE user_id IS NOT NULL
                GROUP BY user_id, path
            ) as t
            WHERE rn = 1
        ");
        $userTopPathsMap = collect($userTopPaths)->pluck('path', 'user_id');

        $userTopCountries = DB::select("
            SELECT user_id, country
            FROM (
                SELECT user_id, country, ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY count(*) DESC) as rn
                FROM visits
                WHERE user_id IS NOT NULL AND country IS NOT NULL
                GROUP BY user_id, country
            ) as t
            WHERE rn = 1
        ");
        $userTopCountriesMap = collect($userTopCountries)->pluck('country', 'user_id');

        $activeUsers = User::whereHas('visits')
            ->withCount(['visits as total_activity' => function($q) {
                $q->where('path', '!=', 'auth/status');
            }])
            ->withCount(['visits as login_count' => function($q) {
                $q->where('is_login', true);
            }])
            ->get()
            ->map(function($user) use ($userTopPathsMap, $userTopCountriesMap) {
                $user->top_page = $this->getPageName($userTopPathsMap[$user->id] ?? '');
                $user->primary_country = $userTopCountriesMap[$user->id] ?? 'Unknown';
                return $user;
            });

        $topCountries = Visit::select('country', DB::raw('count(*) as total'))
            ->whereNotNull('country')
            ->groupBy('country')
            ->orderBy('total', 'desc')
            ->limit(10)
            ->get();

        return [
            'total_visits' => $totalVisits,
            'total_visits_today' => $totalVisitsToday,
            'unique_visitors' => $uniqueVisitors,
            'dashboard_visits_total' => $dashboardVisitsTotal,
            'dashboard_visits_today' => $dashboardVisitsToday,
            'website_visits_total' => $websiteVisitsTotal,
            'website_visits_today' => $websiteVisitsToday,
            'last_7_days' => $last7Days,
            'case_stats' => $caseStats,
            'top_pages' => $topPages,
            'top_countries' => $topCountries,
            'active_users' => $activeUsers,
            'recent_activity' => Visit::with('user')->latest()->limit(50)->get(),
            'report_date' => now()->format('Y-m-d H:i'),
        ];
    }

    /**
     * Map a path to a human-readable page name.
     */
    public function getPageName($path)
    {
        $path = trim($path, '/');
        
        if ($path === '' || $path === '/') return 'Landing Page';
        if ($path === 'login' || $path === 'auth/login') return 'Login Page';

        $cleanPath = preg_replace('/\/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}|[0-9]{8,})/', '', $path);
        
        if (preg_match('/^admin$/', $cleanPath)) return 'Admin Dashboard';
        if (preg_match('/^admin\/cases$/', $cleanPath)) return 'Case Management';
        if (preg_match('/^admin\/users$/', $cleanPath)) return 'User Management';
        if (preg_match('/^admin\/analytics$/', $cleanPath)) return 'Analytics Dashboard';
        if (str_starts_with($cleanPath, 'admin/cases/batch')) return 'Case Detail View';
        if (str_starts_with($cleanPath, 'admin/chats/users')) return 'User Support Chat';
        if (str_starts_with($cleanPath, 'case/')) return 'Detailed Case View';
        
        if (preg_match('/^user$/', $cleanPath)) return 'User Dashboard';
        if (preg_match('/^user\/reports$/', $cleanPath)) return 'My Case Files';
        if (str_starts_with($cleanPath, 'user/reports/batch')) return 'Case Record';
        if (str_starts_with($cleanPath, 'user/notifications')) return 'Notifications Center';
        if (str_starts_with($cleanPath, 'user/chats/doctors')) return 'Doctor Consultation';
        
        if (str_contains($cleanPath, 'admin/')) return 'Admin: ' . ucwords(str_replace(['admin/', '_', '-'], ['', ' ', ' '], $cleanPath));
        if (str_contains($cleanPath, 'user/')) return 'User: ' . ucwords(str_replace(['user/', '_', '-'], ['', ' ', ' '], $cleanPath));

        return ucwords(str_replace(['/', '_', '-'], [' > ', ' ', ' '], $cleanPath));
    }
}
