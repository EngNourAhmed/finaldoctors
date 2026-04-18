@extends('layouts.admin')

@section('content')
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<div class="space-y-10 animate-in fade-in duration-700">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 mt-5">
        <div>
            <h1 class="text-3xl font-black text-white tracking-tight uppercase">Analytics Overview</h1>
            <p class="text-xs text-slate-500 font-bold tracking-[0.2em] mt-1 uppercase">DATA-DRIVEN INSIGHTS & MONITORING</p>
        </div>
        <div class="flex items-center gap-4">
            <a href="{{ route('admin.analytics.export') }}" class="flex items-center gap-3 px-8 py-4 bg-[#FACC15] hover:bg-[#EAB308] rounded-2xl text-black font-black text-xs transition-all shadow-xl shadow-yellow-400/10 hover:scale-105 active:scale-95">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                EXPORT AS PDF
            </a>
        </div>
    </div>

    <!-- Row 1: Stat Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
        <!-- Total Visits -->
        <div class="bg-gradient-to-br from-[#1a1a1a] to-[#0c0c0c] border border-white/5 rounded-[40px] p-10 overflow-hidden relative group shadow-2xl">
            <div class="relative z-10">
                <p class="text-[11px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4">Total Visits</p>
                <div class="flex items-baseline gap-4">
                    <h3 class="text-6xl font-black text-white leading-none">{{ number_format($stats['total_visits']) }}</h3>
                </div>
                <p class="text-[12px] font-bold text-slate-400 mt-6 flex items-center gap-2">
                    Today: <span class="text-[#FACC15] text-sm">{{ number_format($stats['total_visits_today']) }}</span>
                </p>
            </div>
            <div class="absolute -right-8 -bottom-8 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity">
                <svg class="w-40 h-40" fill="currentColor" viewBox="0 0 24 24"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6h-6z"/></svg>
            </div>
        </div>

        <!-- Dashboard Visits -->
        <div class="bg-gradient-to-br from-[#1a1a1a] to-[#0c0c0c] border border-white/5 rounded-[40px] p-10 overflow-hidden relative group shadow-2xl">
            <div class="relative z-10">
                <p class="text-[11px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4">Dashboard Visits</p>
                <div class="flex items-baseline gap-4">
                    <h3 class="text-6xl font-black text-white leading-none">{{ number_format($stats['dashboard_visits_total']) }}</h3>
                </div>
                <p class="text-[12px] font-bold text-slate-400 mt-6 flex items-center gap-2">
                    Today: <span class="text-[#FACC15] text-sm">{{ number_format($stats['dashboard_visits_today']) }}</span>
                </p>
            </div>
            <div class="absolute -right-8 -bottom-8 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity">
                <svg class="w-40 h-40" fill="currentColor" viewBox="0 0 24 24"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/></svg>
            </div>
        </div>

        <!-- Website Visits -->
        <div class="bg-gradient-to-br from-[#1a1a1a] to-[#0c0c0c] border border-white/5 rounded-[40px] p-10 overflow-hidden relative group shadow-2xl">
            <div class="relative z-10">
                <p class="text-[11px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4">Website Visits</p>
                <div class="flex items-baseline gap-4">
                    <h3 class="text-6xl font-black text-white leading-none">{{ number_format($stats['website_visits_total']) }}</h3>
                </div>
                <p class="text-[12px] font-bold text-slate-400 mt-6 flex items-center gap-2">
                    Today: <span class="text-[#FACC15] text-sm">{{ number_format($stats['website_visits_today']) }}</span>
                </p>
            </div>
            <div class="absolute -right-8 -bottom-8 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity">
                <svg class="w-40 h-40" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
            </div>
        </div>
    </div>

    <!-- Row 2: Distribution & Detailed Stats -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Distribution Chart -->
        <div class="bg-[#0c0c0c]/60 backdrop-blur-xl border border-white/5 rounded-[40px] p-8 lg:p-12 overflow-hidden shadow-2xl">
            <h3 class="text-xl font-black text-white uppercase tracking-widest mb-10">Case Status Distribution</h3>
            <div class="h-[300px] flex items-center justify-center">
                <canvas id="statusDonutChart"></canvas>
            </div>
        </div>

        <!-- Case Stats Table -->
        <div class="bg-[#0c0c0c]/60 backdrop-blur-xl border border-white/5 rounded-[40px] p-8 lg:p-12 overflow-hidden shadow-2xl">
            <h3 class="text-xl font-black text-white uppercase tracking-widest mb-10">Case Statistics</h3>
            <div class="overflow-hidden">
                <table class="w-full text-left">
                    <thead>
                        <tr class="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] border-b border-white/5">
                            <th class="pb-4">Status</th>
                            <th class="pb-4 text-right">Count</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-white/5">
                        @foreach($stats['case_stats'] as $case)
                        <tr class="group hover:bg-white/[0.02] transition-colors">
                            <td class="py-5 flex items-center gap-3">
                                <div class="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                                <span class="text-xs font-black text-slate-300 uppercase tracking-widest group-hover:text-white transition-colors">{{ $case->status }}</span>
                            </td>
                            <td class="py-5 text-right font-black text-white text-sm">{{ number_format($case->count) }}</td>
                        </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <!-- Row 3: Last 7 Days & Top Pages -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-10">
        <!-- Last 7 Days -->
        <div class="bg-[#0c0c0c]/60 backdrop-blur-xl border border-white/5 rounded-[40px] p-8 lg:p-12 overflow-hidden shadow-2xl">
            <h3 class="text-xl font-black text-white uppercase tracking-widest mb-10">Last 7 days</h3>
            <div class="h-[250px] mb-10">
                <canvas id="weekLineChart"></canvas>
            </div>
            <table class="w-full text-left">
                <thead>
                    <tr class="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] border-b border-white/5">
                        <th class="pb-4">Date</th>
                        <th class="pb-4 text-right">Visits</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-white/5">
                    @foreach($stats['last_7_days'] as $day)
                    <tr class="hover:bg-white/[0.02] transition-colors">
                        <td class="py-5 text-xs font-black text-slate-300">{{ $day['date'] }}</td>
                        <td class="py-5 text-right font-black text-white text-sm">{{ number_format($day['count'] ?? 0) }}</td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
        </div>

        <!-- Top Pages -->
        <div class="bg-[#0c0c0c]/60 backdrop-blur-xl border border-white/5 rounded-[40px] p-8 lg:p-12 overflow-hidden shadow-2xl">
            <h3 class="text-xl font-black text-white uppercase tracking-widest mb-10">Top pages</h3>
            <div class="h-[250px] mb-10">
                <canvas id="topPagesBarChart"></canvas>
            </div>
            <table class="w-full text-left">
                <thead>
                    <tr class="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] border-b border-white/5">
                        <th class="pb-4">Page</th>
                        <th class="pb-4 text-right">Visits</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-white/5">
                    @foreach($stats['top_pages'] as $page)
                    <tr class="hover:bg-white/[0.02] transition-colors">
                        <td class="py-5 text-xs font-black text-slate-300 truncate max-w-[200px]" title="{{ $page->display_name }}">{{ $page->display_name }}</td>
                        <td class="py-5 text-right font-black text-white text-sm">{{ number_format($page->total) }}</td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>

    <!-- Row 4: User Engagement Analysis -->
    <div class="bg-[#0c0c0c]/60 backdrop-blur-xl border border-white/5 rounded-[40px] p-8 lg:p-12 overflow-hidden shadow-2xl pb-10 min-h-[600px] flex flex-col justify-start">
        <div class="flex items-center justify-between mb-12">
            <div>
                <h3 class="text-xl font-black text-white uppercase tracking-widest">User Engagement Analysis</h3>
                <p class="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mt-2">INDIVIDUAL PERFORMANCE & TRAFFIC PROFILES</p>
            </div>
            <div class="px-5 py-2 bg-white/5 rounded-xl border border-white/5">
                <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Users: {{ count($stats['active_users']) }}</span>
            </div>
        </div>
        <div class="overflow-x-auto selection:bg-[#FACC15] selection:text-black">
            <table class="w-full text-left border-collapse">
                <thead>
                    <tr class="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] border-b border-white/5">
                        <th class="pb-6">User Profile</th>
                        <th class="pb-6">Primary Location</th>
                        <th class="pb-6">Favorite Page</th>
                        <th class="pb-6 text-center">Login Frequency</th>
                        <th class="pb-6 text-right">Total Activity</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-white/5">
                    @foreach($stats['active_users'] as $user)
                    <tr class="hover:bg-white/[0.03] transition-all duration-300 group">
                        <td class="py-8">
                            <div class="flex items-center gap-5">
                                <div class="h-12 w-12 rounded-2xl bg-gradient-to-br from-[#FACC15] to-amber-600 flex items-center justify-center text-black font-black text-sm shadow-lg shadow-yellow-400/20 group-hover:scale-110 transition-transform duration-500">
                                    {{ strtoupper(substr($user->name, 0, 2)) }}
                                </div>
                                <div>
                                    <p class="text-base font-black text-white group-hover:text-[#FACC15] transition-colors">{{ $user->name }}</p>
                                    <p class="text-[10px] text-slate-500 font-bold uppercase tracking-[0.3em] mt-0.5">{{ $user->role }}</p>
                                </div>
                            </div>
                        </td>
                        <td class="py-8">
                            @if(strtoupper($user->primary_country) === 'UNKNOWN' || !$user->primary_country)
                                <span class="px-4 py-1.5 rounded-full bg-slate-500/10 text-slate-400 text-[9px] font-black border border-slate-500/20 uppercase tracking-[0.1em]">
                                    Global Access
                                </span>
                            @else
                                <span class="px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-[9px] font-black border border-blue-500/20 uppercase tracking-[0.1em] flex items-center w-fit gap-2">
                                    <span class="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
                                    {{ $user->primary_country }}
                                </span>
                            @endif
                        </td>
                        <td class="py-8">
                            <div class="flex items-center gap-3">
                                <svg class="w-4 h-4 text-slate-600 group-hover:text-[#FACC15] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                                <p class="text-xs font-black text-slate-300 group-hover:text-white transition-colors tracking-wide">{{ $user->top_page }}</p>
                            </div>
                        </td>
                        <td class="py-8 text-center">
                            <div class="inline-flex flex-col items-center">
                                <span class="text-lg font-black text-[#FACC15] leading-none">{{ number_format($user->login_count) }}</span>
                                <span class="text-[8px] text-slate-600 font-black uppercase tracking-widest mt-1">Sessions</span>
                            </div>
                        </td>
                        <td class="py-8 text-right">
                            <div class="inline-flex flex-col items-end cursor-pointer group/hits" onclick="viewUserActivity({{ $user->id }})">
                                <span class="text-lg font-black text-white leading-none group-hover/hits:text-[#FACC15] transition-colors">{{ number_format($user->total_activity) }}</span>
                                <span class="text-[8px] text-slate-600 font-black uppercase tracking-widest mt-1 group-hover/hits:text-slate-400">Total Hits</span>
                                <span class="text-[7px] text-[#FACC15] font-bold uppercase tracking-tighter opacity-0 group-hover/hits:opacity-100 transition-opacity mt-0.5">View Details</span>
                            </div>
                        </td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>
    
    <!-- User Activity Modal -->
    <div id="activityModal" class="fixed inset-0 z-[100] hidden items-center justify-center p-4">
        <div class="absolute inset-0 bg-black/80 backdrop-blur-md opacity-0 transition-opacity duration-500 activity-modal-backdrop"></div>
        <div class="relative w-full max-w-4xl bg-[#0c0c0c] rounded-[30px] border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.6)] overflow-hidden pointer-events-none scale-95 opacity-0 transition-all duration-500 ease-out activity-modal-container flex flex-col max-h-[80vh]">
            <!-- Modal Header -->
            <div class="p-8 border-b border-white/5 flex items-center justify-between bg-black/40">
                <div class="flex items-center gap-6">
                    <div id="activityUserAvatar" class="h-14 w-14 rounded-2xl bg-gradient-to-br from-[#FACC15] to-amber-600 flex items-center justify-center text-black font-black text-xl shadow-lg shadow-yellow-400/20">
                        ?
                    </div>
                    <div>
                        <h3 id="activityUserName" class="text-2xl font-black text-white uppercase tracking-widest">User Activity</h3>
                        <p id="activityUserRole" class="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mt-1">ACTIVITY LOGS & VISIT HISTORY</p>
                    </div>
                </div>
                <button onclick="closeActivityModal()" class="h-12 w-12 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 rounded-2xl transition-all duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="M6 6l12 12"/></svg>
                </button>
            </div>
            
            <!-- Modal Content -->
            <div class="flex-1 min-h-0 overflow-y-auto p-8 bh-scrollbar-sleek">
                <div id="activityLoading" class="flex flex-col items-center justify-center py-20 space-y-4">
                    <div class="premium-spinner border-t-[#FACC15]"></div>
                    <p class="text-[10px] font-black text-slate-500 uppercase tracking-widest">Retrieving logs...</p>
                </div>
                
                <div id="activityTableContainer" class="hidden">
                    <table class="w-full text-left">
                        <thead>
                            <tr class="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] border-b border-white/5 pb-4">
                                <th class="pb-6">Date & Time</th>
                                <th class="pb-6">Viewed Page</th>
                                <th class="pb-6">Origin IP</th>
                                <th class="pb-6 text-right">Location</th>
                            </tr>
                        </thead>
                        <tbody id="activityTableBody" class="divide-y divide-white/5">
                            <!-- Injected rows -->
                        </tbody>
                    </table>
                </div>
                
                <div id="activityEmpty" class="hidden text-center py-20">
                    <p class="text-sm font-black text-slate-500 uppercase tracking-widest">No activity found for this user</p>
                </div>
            </div>
            
            <!-- Modal Footer -->
            <div class="p-6 bg-white/5 border-t border-white/5 flex items-center justify-between">
                <p class="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Showing last 50 activity logs</p>
                <button onclick="closeActivityModal()" class="px-8 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-white font-black text-xs transition-colors border border-white/5">
                    CLOSE
                </button>
            </div>
        </div>
    </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    Chart.defaults.color = '#64748b';
    Chart.defaults.font.family = 'IBM Plex Sans, sans-serif';
    Chart.defaults.font.weight = '700';

    // 1. Status Donut Chart
    const ctxDonut = document.getElementById('statusDonutChart').getContext('2d');
    new Chart(ctxDonut, {
        type: 'doughnut',
        data: {
            labels: {!! json_encode($stats['case_stats']->pluck('status')) !!},
            datasets: [{
                data: {!! json_encode($stats['case_stats']->pluck('count')) !!},
                backgroundColor: [
                    '#FACC15', '#3B82F6', '#10B981', '#6366F1', '#EC4899', '#8B5CF6'
                ],
                borderWidth: 0,
                cutout: '75%'
            }]
        },
        options: {
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            }
        }
    });

    // 2. Last 7 Days Chart (Logins)
    const ctxWeek = document.getElementById('weekLineChart').getContext('2d');
    new Chart(ctxWeek, {
        type: 'bar',
        data: {
            labels: {!! json_encode(collect($stats['last_7_days'])->pluck('date')) !!},
            datasets: [{
                label: 'Visits',
                data: {!! json_encode(collect($stats['last_7_days'])->pluck('count')) !!},
                backgroundColor: 'rgba(250, 204, 21, 0.4)',
                borderColor: '#FACC15',
                borderWidth: 2,
                borderRadius: 12,
                barThickness: 30
            }]
        },
        options: {
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { display: false },
                x: { grid: { display : false } }
            }
        }
    });

    // 3. Top Pages Bar Chart (Friendly Names)
    const ctxPages = document.getElementById('topPagesBarChart').getContext('2d');
    new Chart(ctxPages, {
        type: 'bar',
        data: {
            labels: {!! json_encode($stats['top_pages']->pluck('display_name')) !!},
            datasets: [{
                label: 'Visits',
                data: {!! json_encode($stats['top_pages']->pluck('total')) !!},
                backgroundColor: 'rgba(59, 130, 246, 0.4)',
                borderColor: '#3B82F6',
                borderWidth: 2,
                borderRadius: 12,
                barThickness: 30
            }]
        },
        options: {
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { display: false },
                x: { 
                    grid: { display : false },
                    ticks: {
                        callback: function(value, index) {
                            const label = this.getLabelForValue(value);
                            return label.length > 15 ? label.substr(0, 15) + '...' : label;
                        }
                    }
                }
            }
        }
    });
});

function viewUserActivity(userId) {
    const modal = document.getElementById('activityModal');
    const backdrop = modal.querySelector('.activity-modal-backdrop');
    const container = modal.querySelector('.activity-modal-container');
    const loading = document.getElementById('activityLoading');
    const tableContainer = document.getElementById('activityTableContainer');
    const tableBody = document.getElementById('activityTableBody');
    const isEmpty = document.getElementById('activityEmpty');
    
    const userName = document.getElementById('activityUserName');
    const userRole = document.getElementById('activityUserRole');
    const userAvatar = document.getElementById('activityUserAvatar');

    // Show modal loading state
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    setTimeout(() => {
        backdrop.classList.add('opacity-100');
        container.classList.remove('scale-95', 'opacity-0', 'pointer-events-none');
        container.classList.add('scale-100', 'opacity-100', 'pointer-events-auto');
    }, 10);

    loading.classList.remove('hidden');
    tableContainer.classList.add('hidden');
    isEmpty.classList.add('hidden');
    tableBody.innerHTML = '';

    // Fetch data
    fetch(`/admin/analytics/user-activity/${userId}`)
        .then(response => response.json())
        .then(data => {
            userName.textContent = data.user.name;
            userRole.textContent = data.user.role + ' • ACTIVITY LOGS';
            userAvatar.textContent = data.user.name.substring(0, 2).toUpperCase();
            
            loading.classList.add('hidden');
            
            if (data.activities.length === 0) {
                isEmpty.classList.remove('hidden');
            } else {
                tableContainer.classList.remove('hidden');
                data.activities.forEach(activity => {
                    const row = `
                        <tr class="group hover:bg-white/[0.02] transition-colors">
                            <td class="py-6">
                                <p class="text-xs font-black text-white uppercase tracking-wider">${activity.date}</p>
                                <p class="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">${activity.time_ago}</p>
                            </td>
                            <td class="py-6">
                                <span class="px-3 py-1 rounded-lg bg-white/5 border border-white/5 text-[10px] font-black text-slate-300 uppercase tracking-widest truncate max-w-[200px] inline-block">
                                    ${activity.page}
                                </span>
                            </td>
                            <td class="py-6">
                                <code class="text-[10px] font-mono text-slate-400 font-bold">${activity.ip}</code>
                            </td>
                            <td class="py-6 text-right">
                                <span class="text-[10px] font-black text-blue-400 uppercase tracking-widest">${activity.location}</span>
                            </td>
                        </tr>
                    `;
                    tableBody.insertAdjacentHTML('beforeend', row);
                });
            }
        })
        .catch(error => {
            console.error('Error fetching activity:', error);
            loading.classList.add('hidden');
            isEmpty.classList.remove('hidden');
            isEmpty.querySelector('p').textContent = 'Error loading activity data';
        });
}

function closeActivityModal() {
    const modal = document.getElementById('activityModal');
    const backdrop = modal.querySelector('.activity-modal-backdrop');
    const container = modal.querySelector('.activity-modal-container');
    
    backdrop.classList.remove('opacity-100');
    container.classList.add('scale-95', 'opacity-0', 'pointer-events-none');
    container.classList.remove('scale-100', 'opacity-100', 'pointer-events-auto');
    
    setTimeout(() => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }, 500);
}

// Close modal on escape
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeActivityModal();
});
</script>
@endsection
