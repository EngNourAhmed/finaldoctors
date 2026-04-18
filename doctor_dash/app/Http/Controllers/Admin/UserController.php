<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Report;
use App\Models\User;
use App\Models\Visit;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $role = $request->query('role');
        $status = $request->query('status');

        $query = User::withCount('reports')
            ->with('latestReport')
            ->orderByDesc('created_at');

        if ($role && in_array($role, ['admin', 'assistant', 'user'], true)) {
            $query->where('role', $role);
        } else {
            $role = null;
        }

        if ($status) {
            $query->whereHas('latestReport', function ($q) use ($status) {
                $q->where('status', $status);
            });
        }

        $users = $query->paginate(20)->withQueryString();

        return view('admin.users.index', [
            'users' => $users,
            'roleFilter' => $role,
            'statusFilter' => $status,
            'statuses' => Report::STATUSES,
        ]);
    }

    public function toggleReportReview(Request $request, Report $report)
    {
        $state = $request->input('state');

        if ($state === 'reviewed') {
            $report->reviewed_at = now();
        } elseif ($state === 'pending') {
            $report->reviewed_at = null;
        } else {
            $report->reviewed_at = $report->reviewed_at ? null : now();
        }
        $report->save();

        return back()->with('status', 'Report review status updated successfully.');
    }

    public function setUserReportsReview(Request $request, User $user)
    {
        $state = $request->input('state');

        if ($state === 'reviewed') {
            $user->reports()->whereNull('reviewed_at')->update([
                'reviewed_at' => now(),
            ]);
            $user->review_status = 'reviewed';
            $user->save();
        } elseif ($state === 'pending') {
            $user->reports()->whereNotNull('reviewed_at')->update([
                'reviewed_at' => null,
            ]);
            $user->review_status = 'pending';
            $user->save();
        }

        return back()->with('status', 'User reports review status updated successfully.');
    }

    public function updateRole(Request $request, User $user)
    {
        $data = $request->validate([
            'role' => ['required', 'in:admin,assistant,user'],
        ]);

        $currentUser = $request->user();

        // لا تسمح بتغيير دورك أنت نفسك من هنا
        if ($currentUser->id === $user->id && $data['role'] !== $user->role) {
            return back()->with('status', 'You cannot change your own role from this screen.');
        }

        // لا تسمح بإزالة آخر أدمن في النظام
        if ($user->role === 'admin' && $data['role'] !== 'admin') {
            $otherAdmins = User::where('role', 'admin')
                ->where('id', '!=', $user->id)
                ->count();

            if ($otherAdmins === 0) {
                return back()->with('status', 'You cannot remove the last admin.');
            }
        }

        $user->role = $data['role'];
        $user->save();

        return back()->with('status', 'User role updated successfully.');
    }

    public function show(User $user)
    {
        return redirect()->route('admin.users.reports', $user);
    }

    public function reports(User $user)
    {
        $status = request()->query('status');
        $query = $user->reports()
            ->with('updatedBy')
            ->selectRaw('MIN(id) as id, MAX(batch_id) as batch_id, MIN(user_id) as user_id, MIN(title) as title, MIN(description) as description, MIN(created_at) as created_at, MIN(file_path) as file_path, MIN(original_name) as original_name, MIN(mime_type) as mime_type, MIN(status) as status, COUNT(*) as files_count, MAX(updated_by) as updated_by')
            ->groupByRaw('CASE WHEN batch_id IS NULL THEN id ELSE batch_id END')
            ->latest('created_at');

        if ($status) {
            $query->having('status', $status);
        }

        $reports = $query->paginate(20)->withQueryString();

        return view('admin.users.reports', [
            'user' => $user,
            'reports' => $reports,
            'statusFilter' => $status,
            'statuses' => Report::STATUSES,
        ]);
    }
}
