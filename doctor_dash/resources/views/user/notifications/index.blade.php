@extends('layouts.user')

@section('title', 'Notifications')
@section('header', 'Notifications')

@section('content')
    <div class="space-y-6">
        @if ($notifications->isNotEmpty())
            <div class="rounded-2xl bg-slate-900/80 border border-slate-700/70 p-4">
                <h2 class="text-sm font-semibold text-slate-200 mb-3 flex items-center gap-2">
                    <svg class="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Status Updates
                </h2>

                @foreach ($notifications as $notification)
                    @php
                        $data = $notification->data;
                    @endphp
                    <div class="flex items-start gap-3 rounded-xl border border-slate-700/70 bg-slate-900/70 px-3 py-3 mb-2 hover:border-amber-400/50 transition-colors {{ $notification->unread() ? 'border-amber-400/30 bg-amber-400/5' : '' }}">
                        <div class="h-8 w-8 flex items-center justify-center rounded-full bg-slate-800 border border-slate-700 text-amber-400">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                        </div>
                        <div class="flex-1 min-w-0">
                            <div class="flex items-center justify-between gap-2">
                                <p class="text-sm font-bold text-slate-100">{{ $data['title'] ?? 'Update' }}</p>
                                <span class="text-xs text-slate-400">{{ $notification->created_at->diffForHumans() }}</span>
                            </div>
                            <p class="mt-1 text-[13px] text-slate-300 leading-relaxed">
                                {!! $data['message'] ?? '' !!}
                            </p>
                            <div class="mt-2">
                                <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold border {{ \App\Models\Report::STATUSES[$data['new_status'] ?? ''] ?? 'border-slate-500/50 text-slate-400 bg-slate-500/10' }}">
                                    {{ $data['new_status'] ?? 'Updated' }}
                                </span>
                            </div>
                        </div>
                        @if ($notification->unread())
                            <div class="h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]"></div>
                        @endif
                    </div>
                    @php $notification->markAsRead(); @endphp
                @endforeach

                <div class="mt-4">
                    {{ $notifications->links() }}
                </div>
            </div>
        @endif

        <div class="rounded-2xl bg-slate-900/80 border border-slate-700/70 p-4">
            <h2 class="text-sm font-semibold text-slate-200 mb-3 flex items-center gap-2">
                <svg class="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                Messages from admin
            </h2>

            @forelse ($doctorNotifications as $doctor)
                <a href="{{ route('user.chats.doctors.show', $doctor->id) }}"
                    class="flex items-start gap-3 rounded-xl border border-slate-700/70 bg-slate-900/70 px-3 py-2 mb-2 hover:border-amber-400/80 hover:bg-slate-900 transition-colors">
                    <div
                        class="h-8 w-8 flex items-center justify-center rounded-full bg-amber-400/20 text-[11px] font-semibold text-amber-200">
                        {{ strtoupper(substr($doctor->name, 0, 2)) }}
                    </div>
                    <div class="flex-1 min-w-0">
                        <div class="flex items-center justify-between gap-2">
                            <p class="text-sm font-semibold text-slate-100 truncate">{{ $doctor->name }}</p>
                            @if ($doctor->last_message_at)
                                <span class="text-xs text-slate-400">
                                    {{ $doctor->last_message_at->format('g:i A') }}
                                </span>
                            @endif
                        </div>
                        <p class="mt-0.5 text-[13px] text-slate-400 truncate">
                            {{ \Illuminate\Support\Str::limit($doctor->last_message, 80) }}
                        </p>
                    </div>
                    <span
                        class="ml-2 inline-flex items-center justify-center rounded-full bg-red-500 text-white text-[10px] leading-none px-1.5 py-0.5">
                        1
                    </span>
                </a>
            @empty
                <p class="text-xs text-slate-500">No new messages from admin.</p>
            @endforelse
        </div>
    </div>
@endsection
