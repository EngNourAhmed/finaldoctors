@extends('layouts.admin')

@section('title', 'Dashboard')
@section('header', 'Overview')

@section('content')
    <div class="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 class="text-sm md:text-base font-semibold text-slate-200">Overview</h2>
        <a href="{{ route('admin.export.dashboard') }}" id="export-btn"
            class="btn btn-yellow relative overflow-hidden group min-w-[140px]">
            <span class="btn-text">Export as PDF</span>
            <div class="btn-spinner hidden absolute inset-0 flex items-center justify-center bg-[#FACC15]">
                <div class="premium-spinner text-black"></div>
            </div>
        </a>
    </div>

    <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {{-- Total Users Card --}}
        <div class="bh-card p-7 md:p-8 flex flex-col justify-between">
            <div class="flex items-start justify-between">
                <div>
                    <p class="text-xs md:text-sm uppercase tracking-[0.2em] text-slate-400 font-bold">Total Users</p>
                    <p class="mt-3 text-4xl md:text-5xl font-bold">{{ $totalUsers }}</p>
                </div>
                <div class="bh-card-icon h-12 w-12 flex shrink-0 items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-6 w-6">
                        <path d="M7.5 7.5a3 3 0 116 0 3 3 0 01-6 0z" />
                        <path d="M4.5 18a4.5 4.5 0 019 0v.75a.75.75 0 01-.75.75h-7.5a.75.75 0 01-.75-.75V18z" />
                        <path d="M15.75 8.25a2.25 2.25 0 112.25 2.25 2.25 2.25 0 01-2.25-2.25z" />
                        <path d="M15.004 18.75a3.751 3.751 0 013.746-3.5 3.75 3.75 0 013.75 3.75v.75a.75.75 0 01-.75.75h-5.996" />
                    </svg>
                </div>
            </div>
            <div class="mt-5 flex gap-3 text-xs">
                <a href="{{ route('admin.users.index') }}"
                    class="inline-flex items-center justify-center rounded-full border border-slate-600/70 px-4 py-1.5 text-xs font-semibold text-slate-200 hover:border-amber-400 hover:text-amber-300 transition-colors">
                    View users
                </a>
            </div>
        </div>

        {{-- Pending Cases Card --}}
        <div class="bh-card p-7 md:p-8 flex flex-col justify-between border-amber-500/30 bg-amber-500/5">
            <div class="flex items-start justify-between">
                <div>
                    <p class="text-xs md:text-sm uppercase tracking-[0.2em] text-amber-500/80 font-bold">Pending Cases</p>
                    <p class="mt-3 text-4xl md:text-5xl font-bold text-amber-400">{{ $pendingCasesCount }}</p>
                </div>
                <div class="bh-card-icon h-12 w-12 flex shrink-0 items-center justify-center border-amber-500/30 text-amber-400">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-6 w-6">
                        <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clip-rule="evenodd" />
                    </svg>
                </div>
            </div>
            <div class="mt-5 flex gap-3 text-xs">
                <a href="{{ route('admin.cases.index', ['status' => 'Pending']) }}"
                    class="inline-flex items-center justify-center rounded-full border border-amber-500/40 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold text-amber-300 hover:bg-amber-500/20 hover:border-amber-400 transition-all">
                    Go to Pending
                </a>
            </div>
        </div>

        {{-- All Other Cases Card --}}
        <div class="bh-card p-7 md:p-8 flex flex-col justify-between border-emerald-500/30 bg-emerald-500/5">
            <div class="flex items-start justify-between">
                <div>
                    <p class="text-xs md:text-sm uppercase tracking-[0.2em] text-emerald-500/80 font-bold">Other Cases</p>
                    <p class="mt-3 text-4xl md:text-5xl font-bold text-emerald-400">{{ $otherCasesCount }}</p>
                </div>
                <div class="bh-card-icon h-12 w-12 flex shrink-0 items-center justify-center border-emerald-500/30 text-emerald-400">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-6 w-6">
                        <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
                    </svg>
                </div>
            </div>
            <div class="mt-5 flex gap-3 text-xs">
                <a href="{{ route('admin.cases.index', ['status' => 'Other']) }}"
                    class="inline-flex items-center justify-center rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-300 hover:bg-emerald-500/20 hover:border-emerald-400 transition-all">
                    View other cases
                </a>
            </div>
        </div>

        {{-- Admins Card --}}
        <div class="bh-card p-7 md:p-8 flex flex-col justify-between">
            <div class="flex items-start justify-between">
                <div>
                    <p class="text-xs md:text-sm uppercase tracking-[0.2em] text-slate-400 font-bold">Admins</p>
                    <p class="mt-3 text-4xl md:text-5xl font-bold">{{ $totalAdmins }}</p>
                </div>
                <div class="bh-card-icon h-12 w-12 flex shrink-0 items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-6 w-6">
                        <path d="M12 2.25a.75.75 0 01.673.418l1.89 3.78 4.176.607a.75.75 0 01.416 1.279L16.5 11.25l.714 4.164a.75.75 0 01-1.088.791L12 14.708l-4.126 2.197a.75.75 0 01-1.088-.79L7.5 11.25 4.845 8.334a.75.75 0 01.416-1.28l4.176-.606 1.89-3.78A.75.75 0 0112 2.25z" />
                    </svg>
                </div>
            </div>
            <div class="mt-5 flex gap-3 text-xs">
                <a href="{{ route('admin.users.index', ['role' => 'admin']) }}"
                    class="inline-flex items-center justify-center rounded-full border border-slate-600/70 px-4 py-1.5 text-xs font-semibold text-slate-200 hover:border-amber-400 hover:text-amber-300 transition-colors">
                    View admins
                </a>
            </div>
        </div>



        {{-- Visits Card --}}
        <div class="bh-card p-7 md:p-8 flex flex-col justify-between">
            <div class="flex items-start justify-between">
                <div>
                    <p class="text-xs md:text-sm uppercase tracking-[0.2em] text-slate-400 font-bold">Visits (Today)</p>
                    <p class="mt-3 text-4xl md:text-5xl font-bold">{{ $todayVisits }}</p>
                    <p class="mt-2 text-xs font-semibold text-slate-400">Total: {{ $totalVisits }}</p>
                </div>
                <div class="bh-card-icon h-12 w-12 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-6 w-6">
                        <path d="M12 4.5a7.5 7.5 0 107.5 7.5A7.509 7.509 0 0012 4.5zm0 1.5a6 6 0 11-6 6 6.007 6.007 0 016-6zm-.75 2.25a.75.75 0 011.5 0v3.19l2.28 2.28a.75.75 0 11-1.06 1.06l-2.47-2.47A.75.75 0 0111.25 12z" />
                    </svg>
                </div>
            </div>
            <div class="mt-6 flex gap-3 text-xs">
                <a href="{{ route('admin.analytics.index') }}"
                    class="inline-flex items-center justify-center rounded-full border border-slate-600/70 px-4 py-2 text-sm font-semibold text-slate-200 hover:border-amber-400 hover:text-amber-300 transition-colors">
                    View analytics
                </a>
            </div>
        </div>
    </div>



    @push('scripts')
    <script>
        document.getElementById('export-btn').addEventListener('click', async function(e) {
            e.preventDefault();
            
            const btn = this;
            const text = btn.querySelector('.btn-text');
            const spinner = btn.querySelector('.btn-spinner');
            
            // Show spinner
            text.classList.add('invisible');
            spinner.classList.remove('hidden');
            
            try {
                const response = await fetch(btn.href, {
                    method: 'GET',
                    headers: { 'X-Requested-With': 'XMLHttpRequest' }
                });
                
                if (!response.ok) throw new Error('Download failed');
                
                // Get filename from header if possible
                let filename = 'dashboard_report.pdf';
                const disposition = response.headers.get('Content-Disposition');
                if (disposition && disposition.indexOf('attachment') !== -1) {
                    const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                    const matches = filenameRegex.exec(disposition);
                    if (matches != null && matches[1]) { 
                        filename = matches[1].replace(/['"]/g, '');
                    }
                }
                
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                a.remove();
                window.URL.revokeObjectURL(url);
            } catch (error) {
                console.error(error);
                alert('Export failed. Please try again later.');
            } finally {
                // Hide spinner
                text.classList.remove('invisible');
                spinner.classList.add('hidden');
            }
        });
    </script>
    @endpush
@endsection
