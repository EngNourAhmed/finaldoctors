@extends('layouts.user')

@section('title', 'User Dashboard')
@section('header', 'My Dashboard')

@section('content')
    <div class="space-y-6">
        <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <div class="bh-card p-6">
                <p class="text-xs md:text-sm uppercase tracking-[0.22em] text-slate-400">Total Cases</p>
                <p class="mt-4 text-3xl md:text-4xl font-semibold">{{ $reportsCount }}</p>
                <div class="mt-4 flex flex-wrap gap-2 text-[10px]">
                    <a href="{{ route('user.reports.index') }}"
                        class="inline-flex items-center justify-center rounded-full border border-slate-600/70 px-3 py-1 text-slate-200 hover:border-amber-400 hover:text-amber-300 transition-colors">
                        View all
                    </a>
                    <a href="{{ route('user.reports.create', ['type' => 'full_arch']) }}"
                        class="inline-flex items-center justify-center rounded-full px-4 py-1.5 bg-amber-400 text-black hover:bg-amber-300 transition-all font-black shadow-lg shadow-amber-400/10 group uppercase tracking-widest text-[10px]">
                        <i data-lucide="plus" class="w-3.5 h-3.5 mr-2 group-hover:rotate-90 transition-transform"></i>
                        Submit a Case
                    </a>
                </div>
            </div>

            <div class="bh-card p-6">
                <p class="text-xs md:text-sm uppercase tracking-[0.22em] text-slate-400">Pending Review</p>
                <p class="mt-4 text-3xl md:text-4xl font-semibold text-amber-300">{{ $pendingCasesCount ?? 0 }}</p>
                <div class="mt-4">
                    <a href="{{ route('user.reports.index') }}?filter=pending"
                        class="inline-flex items-center justify-center rounded-full border border-slate-600/70 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:border-amber-400 hover:text-amber-300 transition-colors">
                        View pending
                    </a>
                </div>
            </div>

            <div class="bh-card p-6">
                <p class="text-xs md:text-sm uppercase tracking-[0.22em] text-slate-400">Reviewed</p>
                <p class="mt-4 text-3xl md:text-4xl font-semibold text-emerald-300">
                    {{ $reviewedCasesCount ?? 0 }}
                </p>
                <div class="mt-4">
                    <a href="{{ route('user.reports.index') }}?filter=reviewed"
                        class="inline-flex items-center justify-center rounded-full border border-slate-600/70 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:border-amber-400 hover:text-amber-300 transition-colors">
                        View reviewed
                    </a>
                </div>
            </div>

            <div class="bh-card p-6">
                <p class="text-xs md:text-sm uppercase tracking-[0.22em] text-slate-400">Unread Messages</p>
                <p class="mt-4 text-3xl md:text-4xl font-semibold">{{ $unreadMessagesCount ?? 0 }}</p>
                <div class="mt-4 flex gap-3 text-xs">
                    <a href="{{ route('user.notifications.index') }}"
                        class="inline-flex items-center justify-center rounded-full border border-slate-600/70 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:border-amber-400 hover:text-amber-300 transition-colors">View
                        messages</a>
                </div>
            </div>

        </div>

        <div class="grid gap-6 lg:grid-cols-2">
            <div class="rounded-2xl bg-slate-900/80 border border-slate-700/70 p-5 text-xs">
                <div class="flex items-center justify-between mb-4">
                    <h2 class="text-sm font-semibold">Recent Cases</h2>
                    <a href="{{ route('user.reports.index') }}" class="text-[11px] text-amber-300 hover:text-amber-200">View all</a>
                </div>

                @if (empty($recentCases) || $recentCases->isEmpty())
                    <p class="text-slate-400 text-xs">No cases yet.</p>
                @else
                    <div class="overflow-x-auto">
                        <table class="min-w-full text-left text-xs">
                            <thead class="border-b border-slate-800 text-slate-400">
                                <tr>
                                    <th class="py-2 pr-4 w-1/3">Patient Name</th>
                                    <th class="py-2 pr-4 w-1/4">Status</th>
                                    <th class="py-2 pr-4">Uploaded</th>
                                    <th class="py-2 pr-4 text-right w-32">Action</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-800">
                                @foreach ($recentCases as $case)
                                    <tr>
                                        <td class="py-2 pr-4 text-slate-100">
                                            <a href="{{ route('user.reports.show', $case->batch_id ?? $case->id) }}" class="hover:text-amber-300 transition-colors">
                                                {{ $case->title }}
                                            </a>
                                        </td>
                                        <td class="py-2 pr-4">
                                            <div class="flex flex-col">
                                                <span class="inline-flex items-center w-fit rounded-full border {{ \App\Models\Report::STATUSES[$case->status] ?? 'border-slate-500/50 text-slate-400 bg-slate-500/10' }} px-2 py-0.5 text-[9px] font-semibold">
                                                    {{ $case->status }}
                                                </span>
                                               
                                            </div>
                                        </td>
                                        <td class="py-2 pr-4 text-slate-300">{{ $case->created_at->format('M j, Y g:i A') }}</td>
                                        <td class="py-2 pr-4 text-right">
                                            <div class="flex items-center justify-end gap-2">
                                                <a href="{{ route('user.reports.show', $case->batch_id ?? $case->id) }}" 
                                                   class="inline-flex items-center justify-center rounded-full border border-slate-700 bg-white/5 h-8 w-8 text-slate-200 hover:border-white hover:text-white transition-all shadow-sm"
                                                   title="View Case">
                                                   <i data-lucide="eye" class="w-3.5 h-3.5"></i>
                                                </a>
                                                <a href="{{ route('user.reports.edit', $case) }}" 
                                                   class="inline-flex items-center justify-center rounded-full border border-amber-500/20 bg-amber-500/10 h-8 w-8 text-amber-300 hover:bg-amber-400 hover:text-black transition-all shadow-sm"
                                                   title="Edit Case">
                                                   <i data-lucide="edit-3" class="w-3.5 h-3.5"></i>
                                                </a>
                                            </div>
                                        </td>
                                    </tr>
                                @endforeach
                            </tbody>
                        </table>
                    </div>
                @endif
            </div>

            <div class="rounded-2xl bg-slate-900/80 border border-slate-700/70 p-5 text-xs">
                <div class="flex items-center justify-between mb-4">
                    <h2 class="text-sm font-semibold">Active Case Chats</h2>
                    <a href="{{ route('user.reports.index') }}" class="text-[11px] text-amber-300 hover:text-amber-200">View cases</a>
                </div>

                <div class="space-y-3">
                    @if (empty($clientChats) || $clientChats->isEmpty())
                        <p class="text-slate-500 text-xs py-4 text-center">No recent case messages.</p>
                    @else
                        @foreach ($clientChats as $chat)
                            <a href="{{ route('user.reports.show', $chat->batch_id) }}#chat"
                                class="flex items-start gap-4 rounded-xl border border-slate-700/70 bg-slate-900/70 px-3 py-2.5 hover:border-amber-400/80 hover:bg-slate-900/90 transition-all group {{ $chat->has_unread_notifications ? 'border-amber-400/30 bg-amber-400/5' : '' }}">
                                <div class="h-8 w-8 flex items-center justify-center rounded-full text-amber-400 {{ $chat->has_unread_notifications ? 'bg-amber-400/20 group-hover:bg-amber-400/30' : 'bg-slate-800 group-hover:bg-slate-700' }}">
                                    <i data-lucide="message-square" class="w-4 h-4"></i>
                                </div>
                                <div class="flex-1 min-w-0">
                                    <div class="flex items-center justify-between gap-2">
                                        <p class="text-sm font-semibold text-slate-100 truncate group-hover:text-amber-200">{{ $chat->case_title }}</p>
                                        @if ($chat->last_message_at)
                                            <span class="text-xs text-slate-400">
                                                {{ \Carbon\Carbon::parse($chat->last_message_at)->diffForHumans() }}
                                            </span>
                                        @endif
                                    </div>
                                    <p class="mt-0.5 text-xs text-slate-400 truncate {{ $chat->has_unread_notifications ? 'text-slate-300' : '' }}">
                                        <span class="font-semibold text-white">{{ $chat->sender_name }}:</span> {{ \Illuminate\Support\Str::limit($chat->last_message, 80) }}
                                    </p>
                                </div>
                                @if ($chat->has_unread_notifications)
                                    <span class="ml-2 inline-flex items-center justify-center rounded-full bg-red-500 w-2.5 h-2.5"></span>
                                @endif
                            </a>
                        @endforeach
                    @endif
                </div>

                <div class="mt-4 pt-4 border-t border-slate-800/80">
                    <a href="{{ route('user.reports.index') }}" 
                       class="flex items-center justify-center gap-2 w-full py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-medium text-slate-100 hover:bg-white/10 transition-colors">
                        <i data-lucide="folder-open" class="w-3.5 h-3.5"></i>
                        Go to My Cases
                    </a>
                </div>
            </div>

        </div>
    </div>
@endsection
