<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Conversation;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();

        if (! $request->session()->has('welcomed_user')) {
            $request->session()->put('welcomed_user', true);
            $request->session()->flash('welcome', 'Welcome back, ' . $user->name . '!');
        }

        $reportsCount = $user->reports()
            ->selectRaw('COUNT(DISTINCT CASE WHEN batch_id IS NULL THEN id ELSE batch_id END) as count')
            ->first()->count;

        $reviewedCasesCount = $user->reports()
            ->where('status', '!=', 'Pending')
            ->selectRaw('COUNT(DISTINCT CASE WHEN batch_id IS NULL THEN id ELSE batch_id END) as count')
            ->first()->count;

        $pendingCasesCount = $user->reports()
            ->where('status', 'Pending')
            ->selectRaw('COUNT(DISTINCT CASE WHEN batch_id IS NULL THEN id ELSE batch_id END) as count')
            ->first()->count;

        $recentCases = \App\Models\Report::where('user_id', $user->id)
            ->with('updatedBy')
            ->get()
            ->groupBy('batch_id')
            ->map(function ($group) {
                return $group->first();
            })
            ->sortByDesc('created_at')
            ->take(5);

        $userBatchIds = \App\Models\Report::where('user_id', $user->id)
            ->pluck('batch_id')
            ->unique();

        $clientChats = Conversation::where('type', 'case_chat')
            ->whereIn('batch_id', $userBatchIds)
            ->with(['messages' => function ($query) {
                $query->latest()->limit(1)->with('sender');
            }])
            ->get()
            ->filter(function ($conv) {
                return $conv->messages->first() !== null;
            })
            ->map(function ($conv) use ($user) {
                $last = $conv->messages->first();
                $conv->last_message = $last->body ?: ($last->file_path ? '📎 Shared an attachment' : 'Sent a file');
                $conv->last_message_at = $last->created_at;
                $conv->last_message_from_self = ($last->sender_id == $user->id);
                $conv->sender_name = $last->sender ? $last->sender->name : 'Admin';
                
                $report = \App\Models\Report::where('batch_id', $conv->batch_id)->first();
                $conv->case_title = $report ? $report->title : 'Unknown Case';
                
                // NEW: Check for unread notifications for this batch
                $conv->has_unread_notifications = $user->unreadNotifications()
                    ->where(function($q) use ($conv) {
                        $q->where('data->batch_id', $conv->batch_id)
                          ->orWhere('data->report_id', $conv->batch_id);
                    })->count() > 0;
                
                return $conv;
            })
            ->filter(function ($conv) {
                return !$conv->last_message_from_self;
            })
            ->sortByDesc('last_message_at')
            ->take(5);

        $unreadMessagesCount = $user->unreadNotifications()
            ->where('data->type', 'case_message_received')
            ->count();

        return view('user.dashboard', [
            'user' => $user,
            'reportsCount' => $reportsCount,
            'reviewedCasesCount' => $reviewedCasesCount,
            'pendingCasesCount' => $pendingCasesCount,
            'recentCases' => $recentCases,
            'unreadMessagesCount' => $unreadMessagesCount,
            'clientChats' => $clientChats,

        ]);
    }
}
