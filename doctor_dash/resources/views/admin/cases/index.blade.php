@extends('layouts.admin')

@section('title', 'All Cases')
@section('header', 'System Cases')

@section('content')
    <div class="space-y-6 px-2">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-2">
            <div>
                <h2 class="text-2xl md:text-3xl font-bold text-white tracking-tight">Cases</h2>
                <p class="text-[11px] md:text-sm text-gray-400 mt-1">Track and manage your uploaded case collections</p>
            </div>
            
            <div class="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                <form method="GET" action="{{ route('admin.cases.index') }}" class="flex items-center gap-3 w-full sm:w-auto">
                    <div class="relative w-full sm:w-64">
                        <select name="filter" onchange="this.form.submit()"
                            class="w-full rounded-lg border border-white/10 bg-[#0c0c0c] px-4 py-2.5 text-xs text-white focus:border-[#FACC15] outline-none transition-all cursor-pointer appearance-none pr-10">
                            <optgroup label="Special Filters" class="bg-slate-900 text-slate-400 text-[10px] uppercase tracking-wider font-bold">
                                <option value="all" @selected(empty($filterFilter) || $filterFilter === 'all')>All Cases</option>
                                <option value="pending" @selected(($filterFilter ?? null) === 'pending')>Pending</option>
                                <option value="reviewed" @selected(($filterFilter ?? null) === 'reviewed')>Reviewed</option>
                            </optgroup>
                            <optgroup label="By Status" class="bg-slate-900 text-slate-400 text-[10px] uppercase tracking-wider font-bold">
                                @foreach($statuses as $name => $classes)
                                    <option value="{{ $name }}" @selected(($filterFilter ?? null) === $name)>{{ $name }}</option>
                                @endforeach
                            </optgroup>
                        </select>
                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                    </div>
                </form>
            </div>
        </div>

        <div class="mb-4"></div>

        <div class="bh-table-transparent rounded-xl border border-white/10 bg-[#0c0c0c] overflow-hidden">
            <!-- Table Container for Horizontal Scroll -->
            <div class="overflow-x-auto no-scrollbar">
                @if ($reports->isEmpty())
                <div class="py-20 text-center">
                    <p class="text-gray-500 text-sm">No cases found in the system matching your criteria.</p>
                </div>
            @else
                <div class="pb-4">
                    <table class="w-full text-left text-gray-300 whitespace-nowrap relative border-collapse text-xs">
                        <thead class="sticky top-0 z-20 shadow-md">
                            <tr class="border-b border-white/10">
                                <th class="px-4 py-3 font-bold text-gray-400 uppercase tracking-widest text-[9px]">Patient Name</th>
                                <th class="px-4 py-3 font-bold text-gray-400 uppercase tracking-widest text-[9px]">Submitted</th>
                                <th class="px-4 py-3 font-bold text-gray-400 uppercase tracking-widest text-[9px]">Due Date</th>
                                <th class="px-4 py-3 font-bold text-gray-400 uppercase tracking-widest text-[9px]">Updated By</th>
                                <th class="px-4 py-3 font-bold text-gray-400 uppercase tracking-widest text-[9px] text-center">Status</th>
                                <th class="px-4 py-3 font-bold text-gray-400 uppercase tracking-widest text-[9px]">Files</th>
                                <th class="px-4 py-3 font-bold text-gray-400 uppercase tracking-widest text-[9px] text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody class="bh-table-text">
                            @foreach ($reports as $report)
                                <tr class="transition-colors group hover:bg-white/[0.03]">
                                    <td class="px-4 py-3 border-b border-white/10">
                                        <a href="{{ route('admin.cases.batch', $report->batch_id) }}" 
                                           target="_blank"
                                           class="text-[#FACC15] font-bold text-xs tracking-tight hover:underline cursor-pointer">
                                            {{ $report->title }}
                                        </a>
                                    </td>
                                    <td class="px-4 py-3 border-b border-white/10">
                                        <div class="flex flex-col">
                                            <span class="text-white text-xs">{{ $report->created_at->format('M d, Y') }}</span>
                                            <span class="text-gray-500 text-[10px]">{{ $report->created_at->format('h:i A') }}</span>
                                        </div>
                                    </td>
                                    <td class="px-4 py-3 border-b border-white/10">
                                        @php
                                            $dueDate = $report->created_at->addDays(7);
                                            $isOverdue = now()->isAfter($dueDate);
                                        @endphp
                                        <div class="flex flex-col">
                                            <span class="text-xs {{ $isOverdue ? 'text-red-400' : 'text-white' }}">
                                                {{ $dueDate->format('M d, Y') }}
                                            </span>
                                            @if($isOverdue)
                                                <span class="text-red-400 text-[10px] font-bold">OVERDUE</span>
                                            @else
                                                <span class="text-gray-500 text-[10px]">{{ $dueDate->diffForHumans() }}</span>
                                            @endif
                                        </div>
                                    </td>
                                    <td class="px-4 py-3 border-b border-white/10">
                                        @if($report->updatedBy)
                                            <div class="flex flex-col">
                                                <span class="text-white text-xs">{{ $report->updatedBy->name }}</span>
                                                <span class="text-[9px] text-[#FACC15] uppercase font-bold tracking-widest font-black mt-0.5">
                                                    {{ str_replace('_', ' ', $report->updatedBy->role) }}
                                                </span>
                                            </div>
                                        @else
                                            <span class="text-gray-500 text-xs">System</span>
                                        @endif
                                    </td>
                                    <td class="px-4 py-3 text-center border-b border-white/10">
                                        <div class="bh-badge {{ \App\Models\Report::STATUSES[$report->status] ?? '' }}">
                                            {{ $report->status }}
                                        </div>
                                    </td>
                                    <td class="px-4 py-3 border-b border-white/10">
                                        @if ($report->files_count > 1)
                                            <div class="flex flex-col gap-2">
                                                <div class="flex items-center gap-2 text-white/90 text-[10px] font-bold uppercase tracking-widest">
                                                    <svg class="h-4 w-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>
                                                    collection
                                                </div>
                                                <div class="flex flex-col gap-1.5 pl-6">
                                                    <a href="{{ route('admin.cases.batch', $report->batch_id) }}" 
                                                       target="_blank" 
                                                       class="inline-flex items-center gap-2 text-[10px] font-bold text-[#FACC15] hover:text-white transition-colors">
                                                        <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                                        View Collection ({{ $report->files_count }})
                                                    </a>
                                                    <a href="{{ route('admin.cases.downloadBatch', $report->batch_id) }}" 
                                                       class="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.1em] text-[#FACC15] hover:text-white transition-all bg-white/5 rounded-lg px-2.5 py-1 border border-white/10 hover:border-[#FACC15] w-fit">
                                                        <svg class="h-3 w-3 text-[#FACC15]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                                        Save Collection
                                                    </a>
                                                </div>
                                            </div>
                                        @else
                                            <div class="flex flex-col gap-2">
                                                <div class="flex items-center gap-2 text-white/90 text-[10px] font-bold uppercase tracking-widest">
                                                    <svg class="h-4 w-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                                    Single File
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
                                                        class="inline-flex items-center gap-2 text-[10px] font-bold text-[#FACC15] hover:text-white transition-colors">
                                                        <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                                        View File
                                                    </button>
                                                    <a href="{{ route('admin.cases.download', $report) }}" 
                                                       class="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.1em] text-[#FACC15] hover:text-white transition-all bg-white/5 rounded-lg px-2.5 py-1 border border-white/10 hover:border-[#FACC15] w-fit">
                                                        <svg class="h-3 w-3 text-[#FACC15]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                                        Save File
                                                    </a>
                                                </div>
                                            </div>
                                        @endif
                                    </td>
                                        <td class="px-4 py-3 text-center static border-b border-white/10">
                                            <div class="relative inline-block w-full max-w-[140px] scale-90 text-left dropdown-container">
                                                <button type="button" onclick="toggleDropdown(this)" 
                                                    class="w-full flex items-center justify-between gap-2 rounded-lg border border-white/10 bg-[#0c0c0c] px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest text-white hover:border-[#FACC15] transition-all dropdown-btn">
                                                    <span>Actions</span>
                                                    <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                                                </button>
                                                <div class="hidden dropdown-menu absolute right-0 top-full z-[9999] mt-2 w-65 flex flex-col rounded-xl border border-white/10 bg-[#0c0c0c] shadow-2xl backdrop-blur-xl max-h-[250px] overflow-y-auto overflow-x-hidden origin-top-right">
                                                    @foreach(\App\Models\Report::STATUSES as $statusName => $statusClass)
                                                        <button onclick="updateReportStatusManually({{ $report->id }}, '{{ $statusName }}', this)" 
                                                            class="w-full px-4 py-2 text-left group/item transition-colors hover:bg-white/5">
                                                            <span class="text-[10px] font-semibold text-gray-300 group-hover/item:text-white uppercase tracking-wider">
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
            </div>

            <div class="pt-3 px-4 pb-4">
                    {{ $reports->links('vendor.pagination.custom') }}
                </div>
            @endif
        </div>
    </div>

    <script>
        function toggleDropdown(btn) {
            const menu = btn.nextElementSibling;
            if (!menu) return;
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
            dropdown.classList.add('hidden');
            
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
                    
                    // Show success toast with correct type
                    if (window.showToast) {
                        window.showToast('SUCCESS', 'Case has been updated successfully', 'success');
                    }
                    
                    // Update the badge in the UI immediately for better feel
                    const row = btnEl.closest('tr');
                    const badge = row.querySelector('.bh-badge');
                    if (badge) {
                        badge.innerText = newStatus;
                        // We'd need the class mapping here too, but a reload is safer for now.
                    }

                    // Refresh after a short delay so user can see the toast
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
