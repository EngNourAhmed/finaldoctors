@extends('layouts.admin')

@section('title', 'User Cases')
@section('header', 'User Cases')

@section('content')
    <div class="space-y-6">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-2 px-2">
            <div>
                <h2 class="text-2xl font-bold text-white tracking-tight">User Profile</h2>
                <p class="text-sm text-gray-400 mt-1">Detailed overview of the user and their associated cases.</p>
            </div>
            <a href="{{ route('admin.users.index') }}" class="btn btn-black shrink-0 px-5">Back to All Users</a>
        </div>

        <!-- User Details Card -->
        <div class="bh-card p-6">
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-8">
                <div>
                    <span class="block text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1.5">Full Name</span> 
                    <span class="text-white text-base font-semibold">{{ $user->name }}</span>
                </div>
                <div>
                    <span class="block text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1.5">Email Address</span> 
                    <span class="text-white text-base font-semibold">{{ $user->email }}</span>
                </div>
                <div>
                    <span class="block text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1.5">Platform Role</span> 
                    <div class="mt-1">
                        <span class="inline-flex items-center rounded-lg border border-white/10 bg-black/40 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#FACC15]">
                            {{ $user->role }}
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mt-10 mb-2 px-2">
            <div>
                <h2 class="text-2xl font-bold text-white tracking-tight">Cases</h2>
                <p class="text-sm text-gray-400 mt-1">Manage and track all uploaded medical cases for {{ $user->name }}.</p>
            </div>
            
            <div class="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                <form method="GET" action="{{ route('admin.users.reports', $user) }}" class="flex items-center gap-3 w-full sm:w-auto">
                    <span class="text-[11px] text-gray-400 font-bold tracking-widest uppercase">Filter Status</span>
                    <select name="status"
                        class="w-full sm:w-48 rounded-lg border border-white/10 bg-[#0c0c0c] px-3 py-2 text-sm text-white focus:border-[#FACC15] focus:ring-1 focus:ring-[#FACC15] outline-none transition-all cursor-pointer truncate">
                        <option value="" @selected(empty($statusFilter))>All Statuses</option>
                        @foreach($statuses as $name => $classes)
                            <option value="{{ $name }}" @selected(($statusFilter ?? null) === $name)>{{ $name }}</option>
                        @endforeach
                    </select>
                    <button type="submit" class="btn btn-yellow px-5">Apply</button>
                </form>
            </div>
        </div>

        <!-- Cases Card -->
        <div class="bh-table-transparent rounded-xl border border-white/10 bg-[#0c0c0c]">
            <div class="overflow-x-auto pb-4">
                <table class="min-w-full text-left text-gray-300 relative">
                    <thead>
                        <tr>
                            <th class="px-5 py-4 font-bold text-gray-400 uppercase tracking-widest text-[10px]">Title</th>
                            <th class="px-5 py-4 font-bold text-gray-400 uppercase tracking-widest text-[10px]">Description</th>
                            <th class="px-5 py-4 font-bold text-gray-400 uppercase tracking-widest text-[10px] text-center">Status</th>
                            <th class="px-5 py-4 font-bold text-gray-400 uppercase tracking-widest text-[10px]">Updated By</th>
                            <th class="px-5 py-4 font-bold text-gray-400 uppercase tracking-widest text-[10px]">File Reference</th>
                            <th class="px-5 py-4 font-bold text-gray-400 uppercase tracking-widest text-[10px] text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($reports as $report)
                            <tr class="transition-colors group hover:bg-white/[0.03]">
                                <td class="px-5 py-3">
                                    <div class="flex flex-col gap-1">
                                        <a href="{{ route('admin.cases.batch', $report->batch_id) }}" 
                                           class="text-[#FACC15] font-bold text-xs hover:underline">
                                            {{ $report->title }}
                                        </a>
                                        @if ($report->files_count > 1)
                                            <span class="w-fit inline-flex items-center px-2 py-0.5 rounded text-[8px] font-bold bg-amber-400/10 text-amber-400 border border-amber-400/20">
                                                COLLECTION ({{ $report->files_count }})
                                            </span>
                                        @endif
                                    </div>
                                </td>
                                <td class="px-5 py-3 text-gray-400 text-[11px] max-w-[10rem] truncate" title="{{ $report->description }}">{{ $report->description ?: '-' }}</td>
                                <td class="px-5 py-3 text-center">
                                    <span id="badge-{{ $report->id }}" class="bh-badge scale-[0.8] {{ \App\Models\Report::STATUSES[$report->status] ?? '' }}">
                                        {{ $report->status }}
                                    </span>
                                </td>
                                <td class="px-5 py-3 border-b border-white/10">
                                    @if($report->updatedBy)
                                        <div class="flex flex-col">
                                            <span class="text-white text-[13px] font-bold">{{ $report->updatedBy->name }}</span>
                                            <span class="text-[9px] text-[#FACC15] uppercase font-black tracking-widest mt-0.5">
                                                {{ str_replace('_', ' ', $report->updatedBy->role) }}
                                            </span>
                                        </div>
                                    @else
                                        <span class="text-gray-500 text-[12px]">System</span>
                                    @endif
                                </td>
                                <td class="px-5 py-3 border-b border-white/10">
                                    @if ($report->files_count > 1)
                                        <div class="flex flex-col gap-2">
                                            <div class="flex items-center gap-1.5 text-white/90 text-[8px] tracking-wider font-bold">
                                                <svg class="h-4 w-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>
                                                COLLECTION
                                            </div>
                                            <div class="flex flex-col gap-1.5 pl-6">
                                                <a href="{{ route('admin.cases.batch', $report->batch_id) }}" 
                                                   target="_blank" 
                                                   class="inline-flex items-center gap-1.5 text-[10px] font-bold text-[#FACC15] hover:text-white transition-colors">
                                                    <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                                    View Collection ({{ $report->files_count }})
                                                </a>
                                                <a href="{{ route('admin.cases.downloadBatch', $report->batch_id) }}" 
                                                   class="inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.1em] text-[#FACC15] hover:text-white transition-all bg-white/5 rounded-lg px-2 py-1 border border-white/10 hover:border-[#FACC15] w-fit">
                                                    <svg class="h-3 w-3 text-[#FACC15]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                                    Save Collection
                                                </a>
                                            </div>
                                        </div>
                                    @else
                                        <div class="flex flex-col gap-2">
                                            <div class="flex items-center gap-1.5 text-white/90 text-[8px] tracking-wider font-bold">
                                                <svg class="h-4 w-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                                SINGLE FILE
                                            </div>
                                            <div class="flex flex-col gap-1.5 pl-6">
                                                <button type="button" 
                                                    onclick='window.openBHPreview({
                                                        url: {{ json_encode(route("admin.cases.preview", $report)) }},
                                                        downloadUrl: {{ json_encode(route("admin.cases.download", $report)) }},
                                                        mime: {{ json_encode($report->mime_type) }},
                                                        title: {{ json_encode($report->title) }},
                                                        name: {{ json_encode($report->original_name) }},
                                                        created: {{ json_encode($report->created_at->format("Y-m-d H:i")) }}
                                                    })' 
                                                    class="inline-flex items-center gap-1.5 text-[10px] font-bold text-[#FACC15] hover:text-white transition-colors">
                                                    <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                                    View File
                                                </button>
                                                <a href="{{ route('admin.cases.download', $report) }}" 
                                                   class="inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.1em] text-[#FACC15] hover:text-white transition-all bg-white/5 rounded-lg px-2 py-1 border border-white/10 hover:border-[#FACC15] w-fit">
                                                    <svg class="h-3 w-3 text-[#FACC15]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                                    Save File
                                                </a>
                                            </div>
                                        </div>
                                    @endif
                                </td>
                                <td class="px-5 py-3 text-right border-b border-white/10">
                                    <div class="relative inline-block w-full max-w-[140px] scale-90 text-left dropdown-container">
                                        <button type="button" onclick="toggleDropdown(this)" 
                                            class="w-full flex items-center justify-between gap-2 rounded-lg border border-white/10 bg-[#0c0c0c] px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white hover:border-[#FACC15] transition-all dropdown-btn">
                                            <span>Actions</span>
                                            <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                                        </button>
                                        <div class="hidden dropdown-menu absolute right-0 top-full z-[9999] mt-2 w-65 flex flex-col rounded-xl border border-white/10 bg-[#0c0c0c] shadow-2xl backdrop-blur-xl max-h-[250px] overflow-y-auto overflow-x-hidden origin-top-right">
                                            @foreach(\App\Models\Report::STATUSES as $statusName => $statusClass)
                                                <button onclick="updateReportStatusManually({{ $report->id }}, '{{ $statusName }}', this)" 
                                                    class="w-full px-5 py-2.5 text-left group/item transition-colors hover:bg-white/5">
                                                    <span class="text-xs font-semibold text-gray-300 group-hover/item:text-white uppercase tracking-wider">
                                                        {{ $statusName }}
                                                    </span>
                                                </button>
                                            @endforeach
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>

            <div class="mt-8 pt-5 px-6 pb-6 border-t border-white/5">
                {{ $reports->links('vendor.pagination.custom') }}
            </div>
        </div>
    </div>

    <script>
        function toggleDropdown(btn) {
            const menu = btn.nextElementSibling;
            const isHidden = menu.classList.contains('hidden');
            const container = btn.closest('.dropdown-container');
            
            // Close all other dropdowns
            document.querySelectorAll('.dropdown-menu').forEach(m => {
                if (m !== menu) {
                    m.classList.add('hidden');
                    if (m.closest('.dropdown-container')) {
                        m.closest('.dropdown-container').style.zIndex = '10';
                    }
                }
            });
            
            if (isHidden) {
                if (container) container.style.zIndex = '9999';
                menu.classList.remove('hidden');
                
                // Optional: Adjust position if it goes off screen
                const rect = menu.getBoundingClientRect();
                if (rect.bottom > window.innerHeight) {
                    menu.style.bottom = '100%';
                    menu.style.top = 'auto';
                    menu.style.marginBottom = '0.5rem';
                    menu.style.marginTop = '0';
                    menu.classList.remove('origin-top-right');
                    menu.classList.add('origin-bottom-right');
                } else {
                    menu.style.bottom = 'auto';
                    menu.style.top = '100%';
                    menu.style.marginTop = '0.5rem';
                    menu.style.marginBottom = '0';
                    menu.classList.remove('origin-bottom-right');
                    menu.classList.add('origin-top-right');
                }
            } else {
                menu.classList.add('hidden');
                if (container) container.style.zIndex = '10';
            }
        }

        // Close dropdowns when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.dropdown-container')) {
                document.querySelectorAll('.dropdown-menu').forEach(m => {
                    m.classList.add('hidden');
                    if (m.closest('.dropdown-container')) {
                        m.closest('.dropdown-container').style.zIndex = '10';
                    }
                });
            }
        });

        async function updateReportStatusManually(reportId, newStatus, btnEl) {
            const dropdown = btnEl.closest('.absolute');
            if (dropdown) dropdown.classList.add('hidden');
            
            try {
                const response = await fetch(`/admin/cases/${reportId}/status`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': '{{ csrf_token() }}'
                    },
                    body: JSON.stringify({ status: newStatus })
                });

                if (response.ok) {
                    const data = await response.json();
                    
                    if (window.showToast) {
                        window.showToast('SUCCESS', 'Case has been updated successfully', 'success');
                    }
                    
                    setTimeout(() => {
                        window.location.reload();
                    }, 1200);
                } else {
                    alert('Failed to update status');
                }
            } catch (error) {
                console.error(error);
                alert('An error occurred');
            }
        }
    </script>
@endsection
