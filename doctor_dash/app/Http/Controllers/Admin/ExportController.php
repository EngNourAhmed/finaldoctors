<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Visit;
use Illuminate\Support\Facades\Response;
use Barryvdh\DomPDF\Facade\Pdf;

class ExportController extends Controller
{
    public function dashboardSummary()
    {
        $totalUsers = User::count();
        $totalAdmins = User::where('role', 'admin')->count();
        $totalAssistants = User::where('role', 'assistant')->count();

        $totalVisits = Visit::whereNotNull('user_id')->where('path', '!=', 'auth/status')->count();
        $todayVisits = Visit::whereNotNull('user_id')->where('path', '!=', 'auth/status')
            ->whereDate('created_at', now()->toDateString())
            ->count();

        $dashboardVisits = Visit::whereNotNull('user_id')->where('path', 'like', 'admin%')->count();
        $websiteVisits = $totalVisits - $dashboardVisits;

        $todayDashboardVisits = Visit::whereNotNull('user_id')->where('path', 'like', 'admin%')
            ->whereDate('created_at', now()->toDateString())
            ->count();
        $todayWebsiteVisits = $todayVisits - $todayDashboardVisits;

        $last7Days = Visit::whereNotNull('user_id')
            ->selectRaw('DATE(created_at) as date, COUNT(*) as count')
            ->where('path', '!=', 'auth/status')
            ->groupBy('date')
            ->orderBy('date', 'desc')
            ->limit(7)
            ->get();

        $last7Average = $last7Days->avg('count') ?: 0;

        $topPaths = Visit::whereNotNull('user_id')
            ->selectRaw('path, COUNT(*) as count')
            ->where('path', '!=', 'auth/status')
            ->groupBy('path')
            ->orderByDesc('count')
            ->limit(5)
            ->get();

        $pendingCasesCount = \App\Models\Report::where('status', 'Pending')->count();
        $otherCasesCount = \App\Models\Report::where('status', '!=', 'Pending')->count();

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

        $topPathLabels = $topPaths
            ->map(function ($row) use ($pageNames) {
                $path = $row->path ?? '';
                $trimmed = trim($path, '/');

                if (isset($pageNames[$trimmed])) {
                    return $pageNames[$trimmed];
                }

                // Shared Routes
                if (str_starts_with($trimmed, 'reports/shared/batch')) {
                    return 'Shared: Case Collection';
                }
                if (str_starts_with($trimmed, 'reports/shared')) {
                    if (str_contains($trimmed, 'preview')) return 'Shared: File Preview';
                    return 'Shared: File View';
                }

                if (str_starts_with($trimmed, 'admin/users')) {
                    if (str_contains($trimmed, 'reports')) return 'Admin: User Cases';
                    return 'Admin: Users Management';
                }
                if (str_starts_with($trimmed, 'admin/assistants')) {
                    return 'Admin: Assistants Management';
                }
                if (str_starts_with($trimmed, 'admin/chats')) {
                    if (str_contains($trimmed, 'users')) return 'Admin: User Chats';
                    if (str_contains($trimmed, 'groups')) return 'Admin: User Group Chats';
                    return 'Admin: Assistant Chats';
                }
                if (str_starts_with($trimmed, 'admin/stats')) {
                    return 'Admin: Analytics';
                }
                if (str_starts_with($trimmed, 'admin/cases')) {
                    if (str_contains($trimmed, 'batch')) return 'Admin: Case Details';
                    return 'Admin: Cases';
                }
                if (str_starts_with($trimmed, 'admin')) {
                    return 'Admin Dashboard';
                }

                if (str_starts_with($trimmed, 'case/') && str_contains($trimmed, '/chat')) {
                    return 'Case Chat';
                }
                if (str_starts_with($trimmed, 'case-files/') && str_contains($trimmed, '/upload')) {
                    return 'Case File Upload';
                }
                if (str_starts_with($trimmed, 'case/') && str_contains($trimmed, '/notes')) {
                    return 'Case Notes';
                }
                if (str_starts_with($trimmed, 'user/reports')) {
                    if (str_contains($trimmed, 'create')) return 'User: Upload Case';
                    if (str_contains($trimmed, 'edit')) return 'User: Edit Case';
                    if (str_contains($trimmed, 'batch')) return 'User: Case Details';
                    return 'User: My Cases';
                }
                if (str_starts_with($trimmed, 'user/chats')) {
                    if (str_contains($trimmed, 'doctors')) return 'User: Admin Chats';
                    if (str_contains($trimmed, 'group')) return 'User: Group Chats';
                    return 'User: Chats';
                }
                if (str_starts_with($trimmed, 'user/notifications')) {
                    return 'User: Notifications';
                }
                if (str_starts_with($trimmed, 'user')) {
                    return 'User Dashboard';
                }

                // Fallback: Prettify unknown paths
                $parts = explode('/', $trimmed);
                $pretty = collect($parts)
                    ->filter(fn($p) => !preg_match('/^[0-9a-f-]{36}$/i', $p) && !is_numeric($p)) // filter out UUIDs and numbers
                    ->map(fn($p) => ucfirst($p))
                    ->join(': ');

                return $pretty ?: '/' . $trimmed;
            })
            ->values();

        $recentUsers = User::whereDate('created_at', '>=', now()->subDays(7)->toDateString())
            ->orderByDesc('created_at')
            ->limit(25)
            ->get(['name', 'role', 'phone', 'address', 'created_at']);

        // Full case status breakdown for the PDF
        $caseStats = \App\Models\Report::selectRaw('status, COUNT(*) as count')
            ->groupBy('status')
            ->get();

        $data = [
            'totalUsers' => $totalUsers,
            'totalAdmins' => $totalAdmins,
            'totalAssistants' => $totalAssistants,
            'totalVisits' => $totalVisits,
            'todayVisits' => $todayVisits,
            'dashboardVisits' => $dashboardVisits,
            'websiteVisits' => $websiteVisits,
            'todayDashboardVisits' => $todayDashboardVisits,
            'todayWebsiteVisits' => $todayWebsiteVisits,
            'last7Days' => $last7Days,
            'last7Average' => $last7Average,
            'topPaths' => $topPaths,
            'topPathLabels' => $topPathLabels,
            'recentUsers' => $recentUsers,
            'pendingCasesCount' => $pendingCasesCount,
            'otherCasesCount' => $otherCasesCount,
            'caseStats' => $caseStats,
            'generatedAt' => now()->format('Y-m-d H:i'),
            'generatedBy' => optional(auth()->user())->name,
        ];

        $pdf = Pdf::loadView('admin.exports.dashboard-report', $data)
            ->setPaper('a4', 'portrait');

        $filename = 'dashboard_report_' . now()->format('Y-m-d_H-i-s') . '.pdf';

        return $pdf->download($filename);
    }
}

