@extends('layouts.admin')

@section('title', 'Notifications')

@section('content')
    <div class="space-y-6">
        <div class="flex items-center justify-between">
            <h1 class="text-xl font-semibold text-slate-100">Notifications</h1>
        </div>

        <div class="grid gap-6 md:grid-cols-2">
            <div class="rounded-2xl bg-slate-900/80 border border-slate-700/70 p-4">
                <h2 class="text-sm font-semibold text-slate-200 mb-3">Messages from users</h2>

                @forelse ($userNotifications as $user)
                    <a href="{{ route('admin.chats.users.show', $user->id) }}"
                        class="flex items-start gap-3 rounded-xl border border-slate-700/70 bg-slate-900/70 px-3 py-2 mb-2 hover:border-amber-400/80 hover:bg-slate-900 transition-colors">
                        <div
                            class="h-8 w-8 flex items-center justify-center rounded-full bg-amber-400/20 text-[11px] font-semibold text-amber-200">
                            {{ strtoupper(substr($user->name, 0, 2)) }}
                        </div>
                        <div class="flex-1 min-w-0">
                            <div class="flex items-center justify-between gap-2">
                                <p class="text-xs font-semibold text-slate-100 truncate">{{ $user->name }}</p>
                                @if ($user->last_message_at)
                                    <span class="text-[10px] text-slate-400">
                                        {{ $user->last_message_at->format('g:i A') }}
                                    </span>
                                @endif
                            </div>
                            <p class="mt-0.5 text-[11px] text-slate-400 truncate">
                                {{ \Illuminate\Support\Str::limit($user->last_message, 80) }}
                            </p>
                        </div>
                        <span
                            class="ml-2 inline-flex items-center justify-center rounded-full bg-red-500 text-white text-[10px] leading-none px-1.5 py-0.5">
                            1
                        </span>
                    </a>
                @empty
                    <p class="text-xs text-slate-500">No new messages from users.</p>
                @endforelse
            </div>

            <div class="rounded-2xl bg-slate-900/80 border border-slate-700/70 p-4">
                <h2 class="text-sm font-semibold text-slate-200 mb-3">Messages from staff</h2>

                @forelse ($staffNotifications as $staff)
                    <a href="{{ route('admin.chats.assistants.show', $staff->id) }}"
                        class="flex items-start gap-3 rounded-xl border border-slate-700/70 bg-slate-900/70 px-3 py-2 mb-2 hover:border-amber-400/80 hover:bg-slate-900 transition-colors">
                        <div
                            class="h-8 w-8 flex items-center justify-center rounded-full bg-sky-500/20 text-[11px] font-semibold text-sky-200">
                            {{ strtoupper(substr($staff->name, 0, 2)) }}
                        </div>
                        <div class="flex-1 min-w-0">
                            <div class="flex items-center justify-between gap-2">
                                <p class="text-xs font-semibold text-slate-100 truncate">{{ $staff->name }}</p>
                                @if ($staff->last_message_at)
                                    <span class="text-[10px] text-slate-400">
                                        {{ $staff->last_message_at->format('g:i A') }}
                                    </span>
                                @endif
                            </div>
                            <p class="mt-0.5 text-[11px] text-slate-400 truncate">
                                {{ \Illuminate\Support\Str::limit($staff->last_message, 80) }}
                            </p>
                        </div>
                        <span
                            class="ml-2 inline-flex items-center justify-center rounded-full bg-red-500 text-white text-[10px] leading-none px-1.5 py-0.5">
                            1
                        </span>
                    </a>
                @empty
                    <p class="text-xs text-slate-500">No new messages from assistants or admins.</p>
                @endforelse
            </div>
        </div>

        <div class="rounded-2xl bg-slate-900/80 border border-slate-700/70 p-4 mt-6">
            <h2 class="text-sm font-semibold text-slate-200 mb-3">System Activity</h2>

            @forelse ($databaseNotifications as $notification)
                @php $data = $notification->data; @endphp
                <div class="flex items-start gap-3 rounded-xl border border-slate-700/70 bg-slate-900/70 px-4 py-3 mb-2 {{ !$notification->read_at ? 'bg-amber-400/5 border-amber-400/20' : '' }}">
                    <div class="h-8 w-8 flex items-center justify-center rounded-full 
                        @if(isset($data['type']) && str_contains($data['type'], 'message'))
                            bg-blue-500/20 text-blue-200
                        @elseif(isset($data['type']) && str_contains($data['type'], 'response'))
                            bg-purple-500/20 text-purple-200
                        @elseif(isset($data['type']) && str_contains($data['type'], 'status'))
                            bg-emerald-500/20 text-emerald-200
                        @elseif(($data['type'] ?? '') === 'case_activity')
                            @if(($data['activity_type'] ?? '') === 'created') bg-emerald-500/20 text-emerald-200
                            @elseif(($data['activity_type'] ?? '') === 'deleted') bg-rose-500/20 text-rose-200
                            @else bg-sky-500/20 text-sky-200 @endif
                        @else
                            {{ ($data['updated_by_role'] ?? '') === 'admin' ? 'bg-red-500/20 text-red-200' : 'bg-sky-500/20 text-sky-200' }}
                        @endif
                        text-[11px] font-bold shrink-0">
                        @if(isset($data['type']) && str_contains($data['type'], 'message'))
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                            </svg>
                        @elseif(isset($data['type']) && str_contains($data['type'], 'response'))
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="9 17 4 12 9 7"/>
                                <path d="M20 18v-2a4 4 0 0 0-4-4H4"/>
                            </svg>
                        @elseif(isset($data['type']) && str_contains($data['type'], 'status'))
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                            </svg>
                        @else
                            {{ strtoupper(substr($data['updated_by_name'] ?? 'SY', 0, 2)) }}
                        @endif
                    </div>
                    <div class="flex-1 min-w-0">
                        <div class="flex items-center justify-between gap-2">
                            <p class="text-xs font-semibold text-slate-100 {{ !$notification->read_at ? 'text-white' : '' }}">
                                @if(isset($data['title']))
                                    {{ $data['title'] }}
                                @else
                                    {{ $data['updated_by_name'] ?? 'System' }} 
                                    <span class="font-normal text-slate-400">
                                        @if(($data['type'] ?? '') === 'case_activity')
                                            @if(($data['activity_type'] ?? '') === 'created') uploaded a new case 
                                            @elseif(($data['activity_type'] ?? '') === 'updated') updated details of 
                                            @elseif(($data['activity_type'] ?? '') === 'deleted') deleted 
                                            @endif
                                        @else
                                            changed status of 
                                        @endif
                                    </span> 
                                    @if(($data['type'] ?? '') === 'case_activity')
                                        "{{ $data['report_title'] ?? 'Unknown' }}"
                                    @else
                                        Case #{{ $data['report_id'] ?? '?' }}
                                    @endif
                                @endif
                            </p>
                            <span class="text-[10px] text-slate-400">
                                {{ $notification->created_at->diffForHumans() }}
                            </span>
                        </div>
                        
                        @if(isset($data['message']))
                            <p class="mt-0.5 text-[11px] text-slate-400 {{ !$notification->read_at ? 'text-slate-300 font-medium' : '' }}">{{ $data['message'] }}</p>
                        @endif
                        
                        @if(($data['type'] ?? '') === 'status_update')
                            <div class="mt-1 flex items-center gap-2 flex-wrap text-[11px]">
                                <span class="px-2 py-0.5 rounded-full border border-white/10 bg-white/5 text-slate-400 line-through">{{ $data['old_status'] ?? 'N/A' }}</span>
                                <svg class="h-3 w-3 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                <span class="px-2 py-0.5 rounded-full {{ \App\Models\Report::STATUSES[$data['new_status']] ?? 'border-white/10 text-white bg-white/5' }}">{{ $data['new_status'] ?? 'N/A' }}</span>
                            </div>
                        @elseif(($data['type'] ?? '') === 'case_activity' && ($data['activity_type'] ?? '') === 'created')
                            <div class="mt-1">
                                <span class="text-[10px] text-[#FACC15] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-amber-400/10 border border-amber-400/20">
                                    NEW UPLOAD
                                </span>
                            </div>
                        @endif

                        @if(isset($data['batch_id']) && $data['batch_id'])
                            <a href="{{ route('admin.cases.batch', $data['batch_id']) }}" class="inline-flex items-center gap-1 mt-2 text-[10px] text-amber-400 hover:text-amber-300 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                                    <polyline points="15,3 21,3 21,9"/>
                                    <line x1="10" y1="14" x2="21" y2="3"/>
                                </svg>
                                View Case
                            </a>
                        @elseif(isset($data['report_id']) && $data['report_id'])
                            @php
                                $report = \App\Models\Report::find($data['report_id']);
                                $batchId = $report ? $report->batch_id : null;
                            @endphp
                            @if($batchId)
                                <a href="{{ route('admin.cases.batch', $batchId) }}" class="inline-flex items-center gap-1 mt-2 text-[10px] text-amber-400 hover:text-amber-300 transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                                        <polyline points="15,3 21,3 21,9"/>
                                        <line x1="10" y1="14" x2="21" y2="3"/>
                                    </svg>
                                    View Case
                                </a>
                            @endif
                        @elseif(isset($data['url']) && $data['url'])
                            <a href="{{ $data['url'] }}" class="inline-flex items-center gap-1 mt-2 text-[10px] text-amber-400 hover:text-amber-300 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                                    <polyline points="15,3 21,3 21,9"/>
                                    <line x1="10" y1="14" x2="21" y2="3"/>
                                </svg>
                                Go to Details
                            </a>
                        @endif
                    </div>
                    @if(!$notification->read_at)
                        <div class="h-2 w-2 rounded-full bg-amber-400 shrink-0 mt-1"></div>
                    @endif
                </div>
            @empty
                <p class="text-xs text-slate-500">No recent activity found.</p>
            @endforelse
        </div>
    </div>
@endsection
