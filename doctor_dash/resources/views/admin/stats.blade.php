@extends('layouts.admin')

@section('title', 'Analytics')
@section('header', 'Visitors Analytics')

@section('content')
    <div class="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 class="text-sm md:text-base font-semibold text-slate-200">Analytics Overview</h2>
        <a href="{{ route('admin.export.dashboard') }}" id="export-analytics-btn"
            class="btn btn-yellow relative overflow-hidden group min-w-[140px]">
            <span class="btn-text">Export as PDF</span>
            <div class="btn-spinner hidden absolute inset-0 flex items-center justify-center bg-[#FACC15]">
                <div class="premium-spinner text-black"></div>
            </div>
        </a>
    </div>
    <div class="grid gap-6 md:grid-cols-3 mb-10">
        <div class="bh-card p-6 md:p-7">
            <p class="text-sm uppercase tracking-[0.22em] text-slate-400">Total Visits</p>
            <p class="mt-4 text-4xl md:text-5xl font-semibold">{{ $totalVisits }}</p>
            <p class="mt-2 text-xs text-slate-400">Today: <span class="font-semibold text-slate-100">{{ $todayVisits }}</span></p>
        </div>
        <div class="bh-card p-6 md:p-7">
            <p class="text-sm uppercase tracking-[0.22em] text-slate-400">Dashboard Visits</p>
            <p class="mt-4 text-4xl md:text-5xl font-semibold">{{ $dashboardVisits }}</p>
            <p class="mt-2 text-xs text-slate-400">Today: <span class="font-semibold text-slate-100">{{ $todayDashboardVisits }}</span></p>
        </div>
        <div class="bh-card p-6 md:p-7">
            <p class="text-sm uppercase tracking-[0.22em] text-slate-400">Website Visits</p>
            <p class="mt-4 text-4xl md:text-5xl font-semibold">{{ $websiteVisits }}</p>
            <p class="mt-2 text-xs text-slate-400">Today: <span class="font-semibold text-slate-100">{{ $todayWebsiteVisits }}</span></p>
        </div>
    </div>

    <div class="grid gap-6 md:grid-cols-2">
        <div class="bh-card p-6 md:p-7">
            <h2 class="text-base md:text-lg font-semibold mb-4">Last 7 days</h2>
            <canvas id="visitsLast7Chart" class="mt-2 h-48 w-full"></canvas>
            <div class="mt-4 border-t border-slate-800/70 pt-3">
                <table class="w-full text-sm text-slate-200">
                    <thead class="text-slate-400 border-b border-slate-700/60">
                        <tr>
                            <th class="text-left py-2">Date</th>
                            <th class="text-right py-2">Visits</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($last7Days as $row)
                            <tr class="border-b border-slate-800/60 last:border-0">
                                <td class="py-1.5">{{ $row->date }}</td>
                                <td class="py-1.5 text-right">{{ $row->count }}</td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>
        <div class="bh-card p-6 md:p-7">
            <h2 class="text-base md:text-lg font-semibold mb-4">Top pages</h2>
            <canvas id="topPathsChart" class="mt-2 h-48 w-full"></canvas>
            <div class="mt-4 border-t border-slate-800/70 pt-3">
                <table class="w-full text-sm text-slate-200">
                    <thead class="text-slate-400 border-b border-slate-700/60">
                        <tr>
                            <th class="text-left py-2">Page</th>
                            <th class="text-right py-2">Visits</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($topPaths as $index => $row)
                            <tr class="border-b border-slate-800/60 last:border-0">
                                <td class="py-1.5">
                                    <div>{{ $topPathLabels[$index] ?? ('/' . $row->path) }}</div>
                                </td>
                                <td class="py-1.5 text-right">{{ $row->count }}</td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <!-- Case Analytics -->
    <div class="grid gap-6 md:grid-cols-2 mt-6">
        <div class="bh-card p-6 md:p-7">
            <h2 class="text-base md:text-lg font-bold text-white mb-6 tracking-wide">Case Status Distribution</h2>
            <div class="flex items-center justify-center">
                <div style="height: 250px; width: 250px;">
                    <canvas id="casesChart"></canvas>
                </div>
            </div>
        </div>
        
        <div class="bh-card p-6 md:p-7">
            <h2 class="text-base md:text-lg font-bold text-white mb-6 tracking-wide">Case Statistics</h2>
            <div class="border-t border-slate-800/70 pt-3 h-[250px] overflow-y-auto custom-scrollbar">
                <table class="w-full text-sm text-slate-200">
                    <thead class="text-slate-400 border-b border-slate-700/60 top-0 bg-[#111111]">
                        <tr>
                            <th class="text-left py-2 font-bold text-white">Status</th>
                            <th class="text-right py-2 font-bold text-white">Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($caseStatusLabels as $index => $label)
                            <tr class="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
                                <td class="py-3">
                                    <div class="flex items-center gap-3">
                                        <div class="w-2 h-2 rounded-full" style="background-color: {{ str_replace('rgba(', 'rgb(', str_replace(', 0.7)', ')', $statusColors[$index] ?? '#475569')) }};"></div>
                                        <span class="text-[13px] font-medium text-slate-200">{{ $label }}</span>
                                    </div>
                                </td>
                                <td class="py-3 text-right font-bold text-white text-[13px] pr-2">{{ $caseStatusCounts[$index] }}</td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    </div>
@endsection

@push('scripts')
    <style>
        .custom-scrollbar::-webkit-scrollbar {
            width: 14px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.02);
            border-left: 1px solid rgba(255, 255, 255, 0.05);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
            background-color: #f3f4f6;
            border: 4px solid #111111;
            border-radius: 12px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background-color: #d1d5db;
        }
    </style>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', function () {
            const last7Labels = @json($last7Labels);
            const last7Counts = @json($last7Counts);
            const topPathLabels = @json($topPathLabels);
            const topPathCounts = @json($topPathCounts);
            const caseLabels = @json($caseStatusLabels);
            const caseCounts = @json($caseStatusCounts);
            const caseColors = @json($statusColors);

            const last7Ctx = document.getElementById('visitsLast7Chart');
            if (last7Ctx) {
                new Chart(last7Ctx, {
                    type: 'bar',
                    data: {
                        labels: last7Labels,
                        datasets: [{
                            label: 'Visits',
                            data: last7Counts,
                            backgroundColor: 'rgba(255, 255, 255, 0.28)',
                            borderColor: 'rgba(255, 255, 255, 0.9)',
                            borderWidth: 1,
                            borderRadius: 10,
                            barPercentage: 0.7,
                            categoryPercentage: 0.7,
                        }],
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: {
                                display: false,
                            },
                            tooltip: {
                                backgroundColor: 'rgba(0, 0, 0, 0.9)',
                                borderColor: 'rgba(255, 255, 255, 0.25)',
                                borderWidth: 1,
                                titleColor: '#ffffff',
                                bodyColor: '#e5e7eb',
                            },
                        },
                        scales: {
                            x: {
                                ticks: { color: 'rgba(229, 231, 235, 0.85)', font: { size: 10 } },
                                grid: { display: false },
                            },
                            y: {
                                ticks: { color: 'rgba(229, 231, 235, 0.75)', font: { size: 10 } },
                                grid: { color: 'rgba(255, 255, 255, 0.10)' },
                                beginAtZero: true,
                                precision: 0,
                            },
                        },
                    },
                });
            }

            const topCtx = document.getElementById('topPathsChart');
            if (topCtx) {
                new Chart(topCtx, {
                    type: 'bar',
                    data: {
                        labels: topPathLabels,
                        datasets: [{
                            label: 'Visits',
                            data: topPathCounts,
                            backgroundColor: 'rgba(255, 255, 255, 0.18)',
                            borderColor: 'rgba(255, 255, 255, 0.55)',
                            borderWidth: 1,
                            borderRadius: 10,
                        }],
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: {
                                display: false,
                            },
                        },
                        scales: {
                            x: {
                                ticks: { color: 'rgba(229, 231, 235, 0.75)', font: { size: 10 } },
                                grid: { display: false },
                            },
                            y: {
                                ticks: { color: 'rgba(229, 231, 235, 0.75)', font: { size: 10 } },
                                grid: { color: 'rgba(255, 255, 255, 0.10)' },
                                beginAtZero: true,
                                precision: 0,
                            },
                        },
                    },
                });
            }

            const casesCtx = document.getElementById('casesChart');
            if (casesCtx && caseLabels.length > 0) {
                new Chart(casesCtx, {
                    type: 'doughnut',
                    data: {
                        labels: caseLabels,
                        datasets: [{
                            data: caseCounts,
                            backgroundColor: caseColors,
                            borderColor: '#111111',
                            borderWidth: 2,
                            hoverOffset: 4
                        }],
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        cutout: '65%',
                        plugins: {
                            legend: {
                                display: false
                            },
                            tooltip: {
                                backgroundColor: 'rgba(0, 0, 0, 0.9)',
                                borderColor: 'rgba(255, 255, 255, 0.25)',
                                borderWidth: 1,
                                titleColor: '#ffffff',
                                bodyColor: '#e5e7eb',
                                padding: 10,
                                cornerRadius: 8,
                                callbacks: {
                                    label: function(context) {
                                        let label = context.label || '';
                                        if (label) {
                                            label += ': ';
                                        }
                                        if (context.parsed !== null) {
                                            label += context.parsed + ' cases';
                                        }
                                        return label;
                                    }
                                }
                            }
                        }
                    }
                });
            }

            const exportBtn = document.getElementById('export-analytics-btn');
            if (exportBtn) {
                exportBtn.addEventListener('click', async function(e) {
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
                        let filename = 'analytics_report.pdf';
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
            }
        });
    </script>
@endpush
