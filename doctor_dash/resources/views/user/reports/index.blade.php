@extends('layouts.user')

@section('title', 'My Cases')
@section('header', 'My Cases')

@section('content')
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
            <h2 class="text-xl md:text-2xl font-bold text-slate-100 tracking-tight">Cases</h2>
            <p class="text-xs text-slate-400 mt-1 font-medium italic">Track and manage your uploaded case collections</p>
        </div>
        <div class="flex flex-wrap items-center gap-3">
            <form action="{{ route('user.reports.index') }}" method="GET" class="flex items-center gap-2">
                <select name="filter" onchange="this.form.submit()" class="bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-lg px-3 py-2 outline-none focus:border-amber-400/50 transition-colors">
                    <optgroup label="Special Filters" class="bg-slate-900 text-slate-400 text-[10px] uppercase tracking-wider font-bold">
                        <option value="all" {{ request('filter') == 'all' ? 'selected' : '' }} class="bg-slate-900 text-slate-200 text-xs">All Cases</option>
                        <option value="pending" {{ request('filter') == 'pending' ? 'selected' : '' }} class="bg-slate-900 text-slate-200 text-xs">Pending</option>
                        <option value="reviewed" {{ request('filter') == 'reviewed' ? 'selected' : '' }} class="bg-slate-900 text-slate-200 text-xs">Reviewed</option>
                    </optgroup>
                    <optgroup label="By Status" class="bg-slate-900 text-slate-400 text-[10px] uppercase tracking-wider font-bold">
                        @foreach($statuses as $status => $class)
                            <option value="{{ $status }}" {{ request('filter') == $status ? 'selected' : '' }} class="bg-slate-900 text-slate-200 text-xs">{{ $status }}</option>
                        @endforeach
                    </optgroup>
                </select>
            </form>
            <!-- Submit a Case Simple Button -->
            <a href="{{ route('user.reports.create') }}" 
                class="btn btn-yellow px-6 py-2.5 shadow-lg shadow-yellow-400/10 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 text-xs font-bold">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                Submit a case
            </a>
        </div>
    </div>

    <div class="rounded-2xl bg-slate-900/80 border border-slate-700/70 p-4 font-medium">
        @if ($reports->isEmpty())
            <p class="text-slate-400 text-sm">You have not uploaded any cases yet.</p>
        @else
            <!-- Desktop Table View -->
            <div class="hidden md:block overflow-x-auto min-h-[200px]">
                <table class="min-w-full text-sm text-slate-200">
                    <thead class="bg-slate-900/80 text-slate-400 border-b border-slate-700/70">
                        <tr>
                            <th class="text-left py-3 px-4 w-1/3">Patient Name</th>
                            <th class="text-left py-3 px-4 w-1/4">Uploaded at</th>
                            <th class="text-left py-3 px-4 w-1/6">Status</th>
                            <th class="text-left py-3 px-4 w-1/6">Files</th>
                            <th class="text-left py-3 px-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($reports as $report)
                            <tr class="border-b border-slate-800/70 last:border-0">
                                <td class="py-3 px-4">
                                    <a href="{{ route('user.reports.show', $report->batch_id ?? $report->id) }}" 
                                       class="text-amber-300 font-bold hover:underline">
                                        {{ $report->title }}
                                    </a>
                                </td>
                                <td class="py-3 px-4 text-slate-400 font-bold uppercase tracking-widest text-[11px]">{{ \Carbon\Carbon::parse($report->created_at)->format('Y-m-d h:i A') }}</td>
                                <td class="py-3 px-4">
                                    <div class="flex flex-col">
                                        <span class="bh-status-pill {{ \App\Models\Report::STATUSES[$report->status] ?? 'border-slate-500/50 text-slate-400 bg-slate-500/10' }}">
                                            {{ $report->status }}
                                        </span>
                                    </div>
                                </td>
                                <td class="py-3 px-4">
                                    @if (($report->files_count ?? 1) > 1)
                                        <div class="flex flex-col gap-2">
                                            <span class="text-[10px] font-bold text-amber-500 uppercase tracking-wider flex items-center gap-1">
                                                <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>
                                                Collection
                                            </span>
                                            <div class="flex flex-col gap-1.5 pl-4">
                                                    <a href="{{ route('user.reports.show', $report->batch_id) }}" 
                                                        class="inline-flex items-center gap-2 text-xs text-amber-300 hover:text-white transition-colors">
                                                        <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                                        View ({{ $report->files_count }})
                                                    </a>
                                            </div>
                                        </div>
                                    @else
                                        <div class="flex flex-col gap-2">
                                            <span class="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                                                <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                                Single File
                                            </span>
                                            <div class="flex flex-col gap-1.5 pl-4">
                                                <button type="button"
                                                    class="inline-flex items-center gap-2 text-xs text-[#FACC15] hover:text-white transition-colors"
                                                    onclick='window.openBHPreview({
                                                        url: {{ json_encode(route("user.reports.preview", $report->id)) }},
                                                        downloadUrl: {{ json_encode(route("user.reports.download", $report->id)) }},
                                                        mime: {{ json_encode($report->mime_type) }},
                                                        title: {{ json_encode($report->title) }},
                                                        name: {{ json_encode($report->original_name) }},
                                                        description: {{ json_encode($report->description) }},
                                                        created: {{ json_encode(\Carbon\Carbon::parse($report->created_at)->format("Y-m-d h:i A")) }}
                                                    })'>
                                                    <svg class="h-3 w-3 text-[#FACC15]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                                    View
                                                </button>
                                            </div>
                                        </div>
                                    @endif
                                </td>
                                <td class="py-3 px-4">
                                    <div class="relative inline-block text-left" data-dropdown-container>
                                        <button type="button" data-dropdown-toggle
                                            class="inline-flex justify-center w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-700 focus:outline-none transition-all">
                                            Actions
                                            <svg class="-mr-1 ml-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.292a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                                            </svg>
                                        </button>

                                        <div data-dropdown-menu
                                            class="hidden origin-top-right absolute right-0 mt-2 w-40 rounded-xl shadow-2xl bg-slate-800 border border-slate-700 ring-1 ring-black ring-opacity-5 z-20 focus:outline-none">
                                            <div class="py-1">
                                                <a href="{{ route('user.reports.show', $report->batch_id ?? $report->id) }}"
                                                    class="block px-4 py-2 text-sm text-slate-200 hover:bg-slate-700 hover:text-white transition-colors">Details</a>
                                                <a href="{{ route('user.reports.edit', $report->id) }}"
                                                    class="block px-4 py-2 text-sm text-amber-300 hover:bg-slate-700 hover:text-white transition-colors">Edit</a>
                                                <form action="{{ route('user.reports.destroy', $report->id) }}" method="POST"
                                                    onsubmit="return confirm('Delete this case?');">
                                                    @csrf
                                                    @method('DELETE')
                                                    <button type="submit"
                                                        class="w-full text-left block px-4 py-2 text-sm text-red-400 hover:bg-slate-700 hover:text-white transition-colors">Delete</button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>

            <!-- Mobile Card View -->
            <div class="md:hidden space-y-4">
                @foreach ($reports as $report)
                    <div class="bg-slate-800/50 rounded-xl border border-slate-700/50 p-4 space-y-3">
                        <div class="flex items-start justify-between gap-4">
                            <div class="min-w-0">
                                <a href="{{ route('user.reports.show', $report->batch_id ?? $report->id) }}" 
                                   class="text-amber-300 font-bold hover:underline block truncate text-base">
                                    {{ $report->title }}
                                </a>
                                <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">
                                    {{ \Carbon\Carbon::parse($report->created_at)->format('Y-m-d h:i A') }}
                                </p>
                            </div>
                            <span class="shrink-0 bh-status-pill {{ \App\Models\Report::STATUSES[$report->status] ?? 'border-slate-500/50 text-slate-400 bg-slate-500/10' }}">
                                {{ $report->status }}
                            </span>
                        </div>

                        <div class="flex items-center justify-between pt-2 border-t border-slate-700/50">
                            <div class="flex items-center gap-2">
                                @if (($report->files_count ?? 1) > 1)
                                    <span class="text-[10px] font-bold text-amber-500 uppercase tracking-wider flex items-center gap-1">
                                        <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>
                                        {{ $report->files_count }} Files
                                    </span>
                                @else
                                    <span class="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                                        <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                        Single
                                    </span>
                                @endif
                            </div>

                            <div class="flex items-center gap-2">
                                <a href="{{ route('user.reports.show', $report->batch_id ?? $report->id) }}" 
                                   class="px-3 py-1.5 rounded-lg bg-amber-400 text-black text-[10px] font-bold transition-transform active:scale-95">
                                    Details
                                </a>
                                <div class="relative inline-block text-left" data-dropdown-container>
                                    <button type="button" data-dropdown-toggle
                                        class="p-1.5 rounded-lg border border-slate-700 bg-slate-800 text-white hover:bg-slate-700 transition-all">
                                        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
                                    </button>
                                    <div data-dropdown-menu
                                        class="hidden origin-top-right absolute right-0 bottom-full mb-2 w-32 rounded-xl shadow-2xl bg-slate-800 border border-slate-700 ring-1 ring-black ring-opacity-5 z-20">
                                        <div class="py-1">
                                            <a href="{{ route('user.reports.edit', $report->id) }}"
                                                class="block px-4 py-2 text-xs text-amber-300 hover:bg-slate-700 transition-colors">Edit</a>
                                            <form action="{{ route('user.reports.destroy', $report->id) }}" method="POST"
                                                onsubmit="return confirm('Delete this case?');">
                                                @csrf
                                                @method('DELETE')
                                                <button type="submit"
                                                    class="w-full text-left block px-4 py-2 text-xs text-red-400 hover:bg-slate-700 transition-colors">Delete</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                @endforeach
            </div>
            <div class="mt-4">
                {{ $reports->links('vendor.pagination.custom') }}
            </div>
        @endif
    </div>

@endsection




