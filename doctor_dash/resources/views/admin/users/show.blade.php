@extends('layouts.admin')

@section('title', 'User Profile')
@section('header', 'User Profile')

@section('content')
    <div class="grid gap-6 md:grid-cols-3">
        <div class="md:col-span-2 rounded-2xl bg-slate-900/80 border border-slate-700/70 p-5">
            <h2 class="text-sm font-semibold mb-4">Account details</h2>
            <dl class="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-xs">
                <div>
                    <dt class="text-slate-400">Name</dt>
                    <dd class="mt-1 text-slate-100">{{ $user->name }}</dd>
                </div>
                <div>
                    <dt class="text-slate-400">Email</dt>
                    <dd class="mt-1 text-slate-100">{{ $user->email }}</dd>
                </div>
                <div>
                    <dt class="text-slate-400">Role</dt>
                    <dd class="mt-1 text-[11px] uppercase tracking-[0.18em] text-amber-300">{{ $user->role }}</dd>
                </div>
                <div>
                    <dt class="text-slate-400">Address</dt>
                    <dd class="mt-1 text-slate-100">{{ $user->address ?? '—' }}</dd>
                </div>
                <div>
                    <dt class="text-slate-400">Phone</dt>
                    <dd class="mt-1 text-slate-100">{{ $user->phone ?? '—' }}</dd>
                </div>
                <div>
                    <dt class="text-slate-400">Registered at</dt>
                    <dd class="mt-1 text-slate-100">{{ $user->created_at->format('Y-m-d H:i') }}</dd>
                </div>
                <div>
                    <dt class="text-slate-400">Last update</dt>
                    <dd class="mt-1 text-slate-100">{{ $user->updated_at->format('Y-m-d H:i') }}</dd>
                </div>
            </dl>
        </div>

        <div class="rounded-2xl bg-slate-900/80 border border-slate-700/70 p-5 text-xs">
            <h2 class="text-sm font-semibold mb-4">Activity</h2>
            <p class="mb-2"><span class="text-slate-400">Total visits:</span> <span class="font-semibold">{{ $visitsCount }}</span></p>
            <p class="mb-2">
                <span class="text-slate-400">Last visit:</span>
                @if ($lastVisit)
                    @php
                        $path = $lastVisit->path;
                        $pageLabel = 'Site';

                        if ($path === '/' || $path === '') {
                            $pageLabel = 'Landing page';
                        } elseif ($path === 'user' || $path === 'user/') {
                            $pageLabel = 'User dashboard';
                        } elseif (\Illuminate\Support\Str::startsWith($path, 'user/reports')) {
                            $pageLabel = 'User cases';
                        } elseif (\Illuminate\Support\Str::startsWith($path, 'user/chats/doctors')) {
                            $pageLabel = 'User chat with admin';
                        } elseif ($path === 'user/chats/group') {
                            $pageLabel = 'User admin group chat';
                        } elseif ($path === 'login') {
                            $pageLabel = 'Login page';
                        } elseif ($path === 'register') {
                            $pageLabel = 'Register page';
                        }
                    @endphp
                    <span class="font-semibold">{{ $lastVisit->created_at->format('Y-m-d H:i') }}</span>
                    <span class="block text-[11px] text-slate-400">Page: {{ $pageLabel }}</span>
                @else
                    <span class="font-semibold">No visits tracked yet.</span>
                @endif
            </p>
            @if (isset($reports) && $reports->isNotEmpty())
                <div class="mt-4 pt-3 border-t border-slate-800/80">
                    <h3 class="text-xs font-semibold mb-2 text-slate-200 flex items-center justify-between">
                        <span>Recent cases</span>
                        <a href="{{ route('admin.users.reports', $user) }}" class="text-[11px] text-amber-300 hover:text-amber-200">View all</a>
                    </h3>
                    <ul class="space-y-1">
                        @foreach ($reports as $report)
                            <li class="flex items-center justify-between gap-2">
                                <span class="truncate max-w-[140px] text-slate-200">{{ $report->title }}</span>
                                <a href="{{ asset('storage/' . $report->file_path) }}" target="_blank"
                                    class="text-[11px] text-amber-300 hover:text-amber-200">View</a>
                            </li>
                        @endforeach
                    </ul>
                </div>
            @endif
        </div>
    </div>
@endsection
