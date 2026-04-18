<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Visit;
use App\Models\Report;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $current = $request->user();
        $role = $current ? $current->role : 'admin';
        $welcomeKey = 'welcomed_' . $role;

        if (! $request->session()->has($welcomeKey)) {
            $request->session()->put($welcomeKey, true);
            $label = $role === 'assistant' ? 'Assistant' : 'Admin';
            $name = $current ? $current->name : '';
            $request->session()->flash('welcome', 'Welcome back, ' . $label . ($name ? ' ' . $name : '') . '!');
        }

        $totalUsers = User::count();
        $totalAdmins = User::where('role', 'admin')->count();

        // Calculate visits based on unique user sessions (active users today vs total unique visitors over time)
        $totalVisits = Visit::whereNotNull('user_id')->where('is_login', true)->count();
        $todayVisits = Visit::whereNotNull('user_id')
            ->whereDate('created_at', now()->toDateString())
            ->distinct('user_id')
            ->count('user_id');

        $pendingCasesCount = Report::where('status', 'Pending')->distinct()->count(\Illuminate\Support\Facades\DB::raw('COALESCE(batch_id, id)'));
        $otherCasesCount = Report::where('status', '!=', 'Pending')->distinct()->count(\Illuminate\Support\Facades\DB::raw('COALESCE(batch_id, id)'));

        return view('admin.dashboard', [
            'totalUsers' => $totalUsers,
            'totalAdmins' => $totalAdmins,
            'totalVisits' => $totalVisits,
            'todayVisits' => $todayVisits,
            'pendingCasesCount' => $pendingCasesCount,
            'otherCasesCount' => $otherCasesCount,
        ]);
    }

    public function stats()
    {
        $totalVisits = Visit::whereNotNull('user_id')->where('is_login', true)->count();
        $todayVisits = Visit::whereNotNull('user_id')->whereDate('created_at', now()->toDateString())->distinct('user_id')->count('user_id');

        $dashboardVisits = Visit::whereNotNull('user_id')->where('is_login', true)->where('path', 'like', 'admin%')->count();
        $websiteVisits = $totalVisits - $dashboardVisits;

        $todayDashboardVisits = Visit::whereNotNull('user_id')
            ->where('path', 'like', 'admin%')
            ->whereDate('created_at', now()->toDateString())
            ->distinct('user_id')
            ->count('user_id');
        $todayWebsiteVisits = max(0, $todayVisits - $todayDashboardVisits);

        $last7Days = Visit::whereNotNull('user_id')
            ->where('is_login', true)
            ->selectRaw('DATE(created_at) as date, COUNT(*) as count')
            ->groupBy('date')
            ->orderBy('date', 'desc')
            ->limit(7)
            ->get();

        // Sort ascending for charts so days go from oldest to newest
        $last7Sorted = $last7Days->sortBy('date')->values();
        $last7Labels = $last7Sorted->pluck('date');
        $last7Counts = $last7Sorted->pluck('count');

        $rawPaths = Visit::whereNotNull('user_id')
            ->selectRaw('path, COUNT(*) as count')
            ->where('path', '!=', 'auth/status')
            ->groupBy('path')
            ->get();

        $pageNames = [
            '' => 'Home',
            'about' => 'Services',
            'contact' => 'Upload Your Case (Contact)',
            'login' => 'Login',
            'register' => 'Register',
            'password/reset' => 'Password Reset',
            'password/forgot' => 'Forgot Password',
            'password/otp' => 'OTP Verification',
        ];

        $groupedPaths = $rawPaths
            ->groupBy(function ($row) use ($pageNames) {
                $path = $row->path ?? '';
                $trimmed = trim($path, '/');

                if (isset($pageNames[$trimmed])) {
                    return $pageNames[$trimmed];
                }

                if (Str::startsWith($trimmed, 'reports/shared/batch')) return 'Shared: Case Collection';
                if (Str::startsWith($trimmed, 'reports/shared')) {
                    if (str_contains($trimmed, 'preview')) return 'Shared: File Preview';
                    return 'Shared: File View';
                }

                if (Str::startsWith($trimmed, 'admin/users')) {
                    if (str_contains($trimmed, 'reports')) return 'Admin: User Cases';
                    return 'Admin: Users Management';
                }
                if (Str::startsWith($trimmed, 'admin/assistants')) return 'Admin: Assistants Management';
                if (Str::startsWith($trimmed, 'admin/chats')) {
                    if (str_contains($trimmed, 'users')) return 'Admin: User Chats';
                    if (str_contains($trimmed, 'groups')) return 'Admin: User Group Chats';
                    return 'Admin: Assistant Chats';
                }
                if (Str::startsWith($trimmed, 'admin/stats')) return 'Admin: Analytics';
                if (Str::startsWith($trimmed, 'admin/cases')) {
                    if (str_contains($trimmed, 'batch')) return 'Admin: Case Details';
                    return 'Admin: Cases';
                }
                if (Str::startsWith($trimmed, 'admin')) return 'Admin Dashboard';

                if (Str::startsWith($trimmed, 'case/') && str_contains($trimmed, '/chat')) return 'Case Chat';
                if (Str::startsWith($trimmed, 'case-files/') && str_contains($trimmed, '/upload')) return 'Case File Upload';
                if (Str::startsWith($trimmed, 'case/') && str_contains($trimmed, '/notes')) return 'Case Notes';

                if (Str::startsWith($trimmed, 'user/reports')) {
                    if (str_contains($trimmed, 'create')) return 'User: Upload Case';
                    if (str_contains($trimmed, 'edit')) return 'User: Edit Case';
                    if (str_contains($trimmed, 'batch')) return 'User: Case Details';
                    return 'User: My Cases';
                }
                if (Str::startsWith($trimmed, 'user/chats')) {
                    if (str_contains($trimmed, 'doctors')) return 'User: Admin Chats';
                    if (str_contains($trimmed, 'group')) return 'User: Group Chats';
                    return 'User: Chats';
                }
                if (Str::startsWith($trimmed, 'user/notifications')) return 'User: Notifications';
                if (Str::startsWith($trimmed, 'user')) return 'User Dashboard';

                $parts = explode('/', $trimmed);
                $pretty = collect($parts)
                    ->filter(fn($p) => !preg_match('/^[0-9a-f-]{36}$/i', $p) && !is_numeric($p))
                    ->map(fn($p) => ucfirst($p))
                    ->join(': ');

                return $pretty ?: '/' . $trimmed;
            })
            ->map(function($group, $key) {
                return (object)[
                    'label' => $key,
                    'count' => $group->sum('count')
                ];
            })
            ->sortByDesc('count')
            ->take(5)
            ->values();

        $topPaths = collect(); // Legacy compat for the view (it doesn't use the actual collection inside, just the labels/counts below)
        $topPathLabels = $groupedPaths->pluck('label');
        $topPathCounts = $groupedPaths->pluck('count');

        $caseStats = Report::selectRaw('status, COUNT(DISTINCT COALESCE(batch_id, id)) as count')
            ->groupBy('status')
            ->get();

        $caseStatusLabels = $caseStats->pluck('status');
        $caseStatusCounts = $caseStats->pluck('count');

        // Color mapping for chart
        $statusColors = [];
        foreach ($caseStatusLabels as $status) {
            $class = Report::STATUSES[$status] ?? '';
            // Very simple color mapping based on classes for the chart
            if (str_contains($class, 'emerald') || str_contains($class, 'green') || str_contains($class, 'lime') || str_contains($class, 'teal')) {
                $statusColors[] = 'rgba(16, 185, 129, 0.7)'; // emerald-500
            } elseif (str_contains($class, 'amber') || str_contains($class, 'yellow') || str_contains($class, 'orange')) {
                $statusColors[] = 'rgba(245, 158, 11, 0.7)'; // amber-500
            } elseif (str_contains($class, 'red') || str_contains($class, 'rose')) {
                $statusColors[] = 'rgba(239, 68, 68, 0.7)'; // red-500
            } elseif (str_contains($class, 'indigo') || str_contains($class, 'purple') || str_contains($class, 'fuchsia')) {
                $statusColors[] = 'rgba(99, 102, 241, 0.7)'; // indigo-500
            } elseif (str_contains($class, 'slate') && $status === 'Pending') {
                $statusColors[] = 'rgba(24acc15, 0.8)'; // amber text equivalent
            } else {
                $statusColors[] = 'rgba(148, 163, 184, 0.7)'; // slate-400
            }
        }

        return view('admin.stats', [
            'totalVisits' => $totalVisits,
            'todayVisits' => $todayVisits,
            'last7Days' => $last7Days,
            'topPaths' => $topPaths,
            'last7Labels' => $last7Labels,
            'last7Counts' => $last7Counts,
            'topPathLabels' => $topPathLabels,
            'topPathCounts' => $topPathCounts,
            'dashboardVisits' => $dashboardVisits,
            'websiteVisits' => $websiteVisits,
            'todayDashboardVisits' => $todayDashboardVisits,
            'todayWebsiteVisits' => $todayWebsiteVisits,
            'caseStatusLabels' => $caseStatusLabels,
            'caseStatusCounts' => $caseStatusCounts,
            'statusColors' => $statusColors,
        ]);
    }
}
