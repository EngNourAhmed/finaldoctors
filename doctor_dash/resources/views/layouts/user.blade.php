<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="user-id" content="{{ auth()->id() }}">
    <title>@yield('title', 'User Dashboard') | BoneHard</title>
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700&family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="icon" type="image/png" href="{{ asset('images/favicon.png') }}">
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    <script src="https://unpkg.com/lucide@latest"></script>
    <style>
        body {
            font-family: "IBM Plex Sans", "IBM Plex Sans Arabic", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }

        :root {
            --bh-bg: #060606;
            --bh-surface: #0c0c0c;
            --bh-surface-2: #111111;
            --bh-border: rgba(255, 255, 255, 0.14);
            --bh-border-strong: rgba(255, 255, 255, 0.22);
            --bh-text: #f5f5f5;
            --bh-muted: rgba(245, 245, 245, 0.68);
            --bh-accent: rgba(255, 255, 255, 0.92);
            --bh-accent-soft: rgba(255, 255, 255, 0.12);
            --bh-accent-soft-hover: rgba(255, 255, 255, 0.18);
        }

        .bh-nav-link {
            position: relative;
            display: flex;
            items: center;
            gap: 12px;
            transition: all 0.2s ease;
        }

        .bh-nav-link i {
            width: 18px;
            height: 18px;
            opacity: 0.7;
            transition: all 0.2s ease;
        }

        .bh-nav-link:hover i {
            opacity: 1;
        }

        .bh-nav-link-active {
            background: linear-gradient(90deg, rgba(255, 255, 255, 0.14), rgba(255, 255, 255, 0.06), transparent);
            color: #ffffff !important;
            border: 1px solid rgba(255, 255, 255, 0.18);
        }

        .bh-nav-link-active i {
            opacity: 1;
            color: #ffffff;
            margin-left: 8px;
        }

        .bh-nav-link:hover::before,
        .bh-nav-link-active::before {
            content: '';
            position: absolute;
            left: 10px;
            top: 50%;
            transform: translateY(-50%);
            width: 4px;
            height: 4px;
            border-radius: 9999px;
            background: rgba(255, 255, 255, 0.9);
            box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.08);
            z-index: 10;
        }

        .bh-nav-link {
            padding-left: 24px !important;
            position: relative;
        }

        .bh-card {
            position: relative;
            border-radius: 1.5rem;
            border: 1px solid rgba(255, 255, 255, 0.14);
            background: linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02));
            box-shadow:
                0 18px 55px rgba(0, 0, 0, 0.55),
                inset 0 1px 0 rgba(255, 255, 255, 0.06);
            transition:
                transform 160ms ease,
                border-color 160ms ease,
                box-shadow 160ms ease;
        }

        .bh-card::before {
            content: '';
            position: absolute;
            inset: 0;
            border-radius: inherit;
            pointer-events: none;
            background: radial-gradient(600px 220px at 20% 0%, rgba(255,255,255,0.12), transparent 60%);
            opacity: 0.8;
        }

        .bh-card:hover {
            transform: translateY(-2px);
            border-color: rgba(255, 255, 255, 0.24);
            box-shadow:
                0 26px 80px rgba(0, 0, 0, 0.65),
                inset 0 1px 0 rgba(255, 255, 255, 0.08);
        }

        .bh-card-icon {
            border-radius: 0.9rem;
            border: 1px solid rgba(255, 255, 255, 0.16);
            background: rgba(0, 0, 0, 0.35);
            color: rgba(255, 255, 255, 0.92);
            box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06);
        }

        [class*="hover:text-amber"]:hover { color: #ffffff !important; }
        [class*="hover:text-blue"]:hover { color: #ffffff !important; }
        [class*="hover:text-emerald"]:hover { color: #ffffff !important; }
        [class*="hover:text-red"]:hover { color: #ffffff !important; }

        [class*="hover:border-amber"]:hover { border-color: rgba(255, 255, 255, 0.6) !important; }
        [class*="hover:border-blue"]:hover { border-color: rgba(255, 255, 255, 0.6) !important; }
        [class*="hover:border-emerald"]:hover { border-color: rgba(255, 255, 255, 0.6) !important; }
        [class*="hover:border-red"]:hover { border-color: rgba(255, 255, 255, 0.6) !important; }

        /* Pagination Styling */
        .pagination {
            display: flex !important;
            gap: 0.5rem !important;
            align-items: center !important;
            list-style: none !important;
            padding: 0 !important;
            margin: 2rem 0 !important;
            justify-content: center !important;
        }

        /* Target specific pagination links by their structure/content */
        .pagination a, 
        .pagination span {
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            min-width: 38px !important;
            height: 38px !important;
            padding: 0 12px !important;
            border-radius: 12px !important;
            background: rgba(255, 255, 255, 0.03) !important;
            border: 1px solid rgba(255, 255, 255, 0.05) !important;
            color: #94a3b8 !important;
            font-size: 0.875rem !important;
            font-weight: 600 !important;
            transition: all 0.2s ease !important;
            text-decoration: none !important;
        }

        /* Force active state to be yellow */
        .pagination span[class*="bg-amber"],
        .pagination span[class*="bg-yellow"],
        .pagination .active span,
        .pagination span:not([href]) {
             background-color: #FACC15 !important;
             color: #000 !important;
             border-color: #FACC15 !important;
             box-shadow: 0 4px 12px rgba(250, 204, 21, 0.3) !important;
        }

        .pagination a:hover {
            background: rgba(250, 204, 21, 0.1) !important;
            border-color: rgba(250, 204, 21, 0.3) !important;
            color: #FACC15 !important;
            transform: translateY(-1px) !important;
        }

        .pagination .disabled span {
            opacity: 0.4 !important;
            cursor: not-allowed !important;
        }

        [class*="hover:bg-amber"]:hover { background-color: var(--bh-accent-soft-hover) !important; }
        [class*="hover:bg-blue"]:hover { background-color: var(--bh-accent-soft-hover) !important; }
        [class*="hover:bg-emerald"]:hover { background-color: var(--bh-accent-soft-hover) !important; }
        [class*="hover:bg-red"]:hover { background-color: var(--bh-accent-soft-hover) !important; }

        [class*="bg-slate-"] { background-color: var(--bh-surface) !important; }
        [class*="bg-gray-"] { background-color: var(--bh-surface) !important; }
        [class*="text-slate-"] { color: var(--bh-text) !important; }
        [class*="text-gray-"] { color: var(--bh-text) !important; }
        [class*="border-slate-"] { border-color: var(--bh-border) !important; }
        [class*="border-gray-"] { border-color: var(--bh-border) !important; }

        @keyframes bhFadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .bh-page-animate {
            animation: bhFadeIn 0.4s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }

        /* Pagination Styles */
        .pagination {
            display: flex;
            gap: 0.5rem;
            align-items: center;
        }

        .pagination li a, .pagination li span {
            display: flex;
            align-items: center;
            justify-content: center;
            min-width: 32px;
            height: 32px;
            padding: 0 8px;
            border-radius: 8px;
            border: 1px solid var(--bh-border);
            background: var(--bh-surface);
            color: var(--bh-text);
            font-size: 0.75rem;
            transition: all 0.2s;
        }

        .pagination li.active span {
            background: #FACC15 !important;
            color: #000 !important;
            border-color: #FACC15 !important;
        }

        .pagination li a:hover, .pagination li span:hover {
            border-color: #FACC15 !important;
            color: #FACC15 !important;
        }

        /* Status colors */
        .status-yellow {
            background-color: rgba(250, 204, 21, 0.1) !important;
            color: #FACC15 !important;
            border-color: rgba(250, 204, 21, 0.3) !important;
        }

        .bh-status-pill {
            display: inline-flex;
            items-center: center;
            justify-content: center;
            padding: 0.25rem 0.75rem;
            border-radius: 9999px;
            font-size: 10px;
            font-weight: 700;
            line-height: 1;
            border-width: 1px;
            white-space: nowrap;
        }
    </style>
</head>

<body class="min-h-screen text-slate-100" style="background: radial-gradient(1200px 600px at 18% 0%, rgba(255,255,255,0.06), transparent 60%), radial-gradient(900px 500px at 85% 20%, rgba(255,255,255,0.04), transparent 65%), var(--bh-bg);">
    <div class="min-h-screen flex">
        <div id="bh-user-sidebar-overlay" class="hidden fixed inset-0 z-40 md:hidden" style="background: rgba(0,0,0,0.72);"></div>
        <aside id="bh-user-sidebar" class="fixed inset-y-0 left-0 z-50 w-72 -translate-x-full md:translate-x-0 md:static md:z-auto md:flex md:w-72 flex-col border-r border-slate-800/80 bg-slate-950/95 transition-transform duration-200" style="background-color: var(--bh-surface-2);">
            <div class="h-16 flex items-center px-6 border-b border-slate-800/80 from-slate-950 via-slate-900 to-slate-950">
                <div class="flex items-center gap-3 w-full">
                    <div>
                        <p class="text-xl md:text-2xl font-semibold tracking-wide">BoneHard User</p>
                    </div>
                    <button id="bh-user-sidebar-close" type="button" class="btn btn-black btn-sm ml-auto md:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5">
                            <path d="M18 6 6 18" />
                            <path d="M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>
            <nav class="flex-1 px-4 py-4 space-y-1 text-base md:text-lg">
                <a href="{{ route('user.dashboard') }}"
                    class="bh-nav-link block rounded-lg px-3 py-2 text-sm md:text-base font-medium {{ request()->routeIs('user.dashboard') ? 'bh-nav-link-active' : 'text-slate-300 hover:bg-slate-900 hover:text-white border border-transparent' }}">
                    Dashboard
                </a>
                <a href="{{ route('user.reports.index') }}"
                    class="bh-nav-link block rounded-lg px-3 py-2 text-sm md:text-base font-medium {{ request()->routeIs('user.reports.*') ? 'bh-nav-link-active' : 'text-slate-300 hover:bg-slate-900 hover:text-white border border-transparent' }}">
                    My Cases
                </a>
            </nav>

        </aside>

        <div class="flex-1 flex flex-col">
            <header class="h-16 border-b border-slate-800/80 flex items-center justify-between px-4 md:px-8 bg-black/70 backdrop-blur-xl" style="background-color: rgba(12,12,12,0.78);">
                <div class="flex items-center gap-2 md:hidden">
                    <button id="bh-user-sidebar-toggle" type="button" class="btn btn-black btn-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5">
                            <path d="M4 6h16" />
                            <path d="M4 12h16" />
                            <path d="M4 18h16" />
                        </svg>
                    </button>
                    <div class="h-8 w-8 rounded-xl bg-slate-900/80 border border-amber-400/70 flex items-center justify-center overflow-hidden">
                        <img src="{{ asset('images/favicon.png') }}" alt="BoneHard User" class="h-7 w-7 object-contain" />
                    </div>
                    <span class="text-sm font-semibold">User</span>
                </div>
                <div class="hidden md:block">
                    <h1 class="text-base md:text-lg font-semibold tracking-wide text-slate-200">@yield('header', 'Dashboard')</h1>
                </div>
                <div class="flex items-center gap-4 text-sm md:text-base">
                    @auth
                        @php
                            $__currentUser = auth()->user();
                            
                            // 1. Filter Chats for "Client Chat" only (Case Chats)
                            $__caseConversations = \App\Models\Conversation::where('type', 'case_chat')
                                ->whereHas('messages') // Only show active chats
                                ->where(function ($q) use ($__currentUser) {
                                    // Identify cases belonging to the user
                                    $batchIds = \App\Models\Report::where('user_id', $__currentUser->id)
                                        ->pluck('batch_id')
                                        ->unique();
                                    $q->whereIn('batch_id', $batchIds);
                                })
                                ->with(['messages' => function ($q) {
                                    $q->latest()->limit(1);
                                }])
                                ->get();

                             $__unreadUserMessages = $__currentUser->unreadNotifications()
                                ->where('data->type', 'case_message_received')
                                ->count();
                                
                            // 2. Filter Notifications for other Case activities
                            $__unreadNotificationsCount = $__currentUser->unreadNotifications()
                                ->whereIn('data->type', [
                                    'status_update', 
                                    'case_created', 
                                    'case_updated', 
                                    'case_file_added', 
                                    'case_response_submitted', 
                                    'case_reply_case_submitted'
                                ])
                                ->count();
                        @endphp

                         <!-- Messages Button -->
                        <button id="bh-messages-btn-header" class="relative h-10 w-10 rounded-full bg-slate-700 hover:bg-slate-600 flex items-center justify-center transition-all duration-200">
                            <div class="relative">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white">
                                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                                </svg>
                                @if($__unreadUserMessages > 0)
                                    <span class="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                                        {{ $__unreadUserMessages }}
                                    </span>
                                @endif
                            </div>
                        </button>

                        <!-- Notifications Button -->
                        <button id="bh-notifications-btn-header" class="relative h-10 w-10 rounded-full bg-slate-700 hover:bg-slate-600 flex items-center justify-center transition-all duration-200">
                            <div class="relative">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white">
                                    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/>
                                    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
                                </svg>
                                @if($__unreadNotificationsCount > 0)
                                    <span class="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                                        {{ $__unreadNotificationsCount }}
                                    </span>
                                @endif
                            </div>
                        </button>

                        <span class="hidden sm:inline text-slate-300 text-sm md:text-base">{{ auth()->user()->name }}</span>
                        <a href="{{ url('/') }}" target="_blank"
                            class="rounded-lg border border-white/20 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/10 hover:border-white/40 transition-all outline-none">Back
                            to site</a>
                        <form action="{{ route('logout') }}" method="POST">
                            @csrf
                            <button type="submit"
                                class="rounded-lg border border-white/20 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/10 hover:border-white/40 transition-all outline-none">Logout</button>
                        </form>
                    @endauth
                    @guest
                        <a href="{{ route('login') }}"
                            class="rounded-lg border border-white/20 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/10 hover:border-white/40 transition-all outline-none">Login</a>
                    @endguest
                </div>
            </header>

            <main class="flex-1 p-3 md:p-8 bh-page-animate" style="background: transparent;">
                @if (session('status'))
                    <div class="mb-4 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-xs text-emerald-200">
                        {{ session('status') }}
                    </div>
                @endif

                @yield('content')
            </main>
        </div>
    </div>

    <!-- Premium File Preview Modal -->
    <div id="bh-preview-modal" class="fixed inset-0 z-[100] hidden items-center justify-center p-4">
        <div id="bh-modal-backdrop" class="absolute inset-0 bg-black/80 backdrop-blur-md opacity-0 transition-opacity duration-500"></div>
        <div id="bh-modal-container" class="relative w-full flex flex-col bg-[#0c0c0c] rounded-3xl border border-white/10 shadow-2xl overflow-hidden pointer-events-none scale-95 opacity-0 transition-all duration-500 ease-out" style="max-width: 1000px; height: 85vh;">
            <div class="flex items-center justify-between p-5 border-b border-white/5 shrink-0 bg-black/40">
                <div class="flex items-center gap-4 min-w-0">
                    <div class="h-11 w-11 shrink-0 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-amber-400 shadow-inner">
                        <i data-lucide="file-text" class="w-6 h-6"></i>
                    </div>
                    <div class="min-w-0">
                        <h3 id="bh-modal-title" class="text-sm font-bold text-white truncate uppercase tracking-widest leading-tight">File Preview</h3>
                        <p id="bh-modal-meta" class="text-[11px] text-slate-400 truncate mt-1"></p>
                    </div>
                </div>
                <div class="flex items-center gap-3 ml-4">
                    <a id="bh-modal-download" href="#" class="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white text-[12px] font-bold text-black hover:bg-amber-400 transition-all duration-300 shadow-lg hover:shadow-amber-400/20 active:scale-95">
                        <i data-lucide="download" class="w-4 h-4 text-black"></i>
                        Download
                    </a>
                    <button id="bh-modal-close" class="h-10 w-10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200">
                        <i data-lucide="x" class="w-6 h-6"></i>
                    </button>
                </div>
            </div>
            <div id="bh-modal-content" class="flex-1 min-h-0 overflow-auto bg-black/40 flex items-center justify-center">
                <!-- Content will be injected here -->
            </div>
            <div id="bh-modal-footer" class="p-4 bg-white/5 border-t border-white/5 shrink-0">
                <p id="bh-modal-description" class="text-xs text-slate-400 leading-relaxed"></p>
            </div>
        </div>
    </div>
    <script>
        (function () {
            function initUserSidebar() {
                const sidebar = document.getElementById('bh-user-sidebar');
                const overlay = document.getElementById('bh-user-sidebar-overlay');
                const toggleBtn = document.getElementById('bh-user-sidebar-toggle');
                const closeBtn = document.getElementById('bh-user-sidebar-close');

                if (!sidebar || !overlay || !toggleBtn || !closeBtn) return;
                
                function openSidebar() {
                    sidebar.classList.remove('-translate-x-full');
                    sidebar.classList.add('translate-x-0');
                    overlay.classList.remove('hidden');
                    document.documentElement.classList.add('overflow-hidden');
                }

                function closeSidebar() {
                    sidebar.classList.add('-translate-x-full');
                    sidebar.classList.remove('translate-x-0');
                    overlay.classList.add('hidden');
                    document.documentElement.classList.remove('overflow-hidden');
                }

                toggleBtn.onclick = openSidebar;
                closeBtn.onclick = closeSidebar;
                overlay.onclick = closeSidebar;

                window.addEventListener('keydown', (e) => {
                    if (e.key === 'Escape') closeSidebar();
                });

                sidebar.querySelectorAll('a').forEach(a => {
                    a.addEventListener('click', closeSidebar);
                });

                window.addEventListener('resize', () => {
                    if (window.innerWidth >= 768) closeSidebar();
                });
            }

            function initDropdowns() {
                document.addEventListener('click', function(e) {
                    const toggle = e.target.closest('[data-dropdown-toggle]');
                    if (toggle) {
                        const container = toggle.closest('[data-dropdown-container]');
                        const menu = container.querySelector('[data-dropdown-menu]');
                        const arrow = container.querySelector('[data-dropdown-arrow]');
                        
                        const isHidden = menu.classList.contains('hidden');
                        
                        document.querySelectorAll('[data-dropdown-menu]').forEach(m => {
                            if (m !== menu) m.classList.add('hidden');
                        });
                        document.querySelectorAll('[data-dropdown-arrow]').forEach(a => {
                            if (a !== arrow) a.classList.remove('rotate-180');
                        });

                        if (isHidden) {
                            menu.classList.remove('hidden');
                            if (arrow) arrow.classList.add('rotate-180');
                        } else {
                            menu.classList.add('hidden');
                            if (arrow) arrow.classList.remove('rotate-180');
                        }
                    } else if (!e.target.closest('[data-dropdown-container]')) {
                        document.querySelectorAll('[data-dropdown-menu]').forEach(m => m.classList.add('hidden'));
                        document.querySelectorAll('[data-dropdown-arrow]').forEach(a => a.classList.remove('rotate-180'));
                    }
                });

    }

            document.addEventListener('DOMContentLoaded', () => {
                initUserSidebar();
                initDropdowns();
                if (window.initGlobalModal) window.initGlobalModal();
                if (typeof lucide !== 'undefined') lucide.createIcons();
            });
        })();

            function initGlobalModal() {
                const modal = document.getElementById('bh-preview-modal');
                const backdrop = document.getElementById('bh-modal-backdrop');
                const container = document.getElementById('bh-modal-container');
                const closeBtn = document.getElementById('bh-modal-close');
                const content = document.getElementById('bh-modal-content');
                const title = document.getElementById('bh-modal-title');
                const meta = document.getElementById('bh-modal-meta');
                const desc = document.getElementById('bh-modal-description');
                const download = document.getElementById('bh-modal-download');

                if (!modal) return;

                window.openBHPreview = function(data) {
                    content.innerHTML = '<div class="animate-pulse text-slate-500 text-xs">Loading...</div>';
                    title.textContent = data.title || 'File Preview';
                    meta.textContent = (data.name ? data.name + ' • ' : '') + (data.created || '');
                    desc.textContent = data.description || '';
                    if (data.downloadUrl) {
                        download.href = data.downloadUrl;
                        download.style.display = 'inline-flex';
                    } else {
                        download.style.display = 'none';
                    }

                    modal.classList.remove('hidden');
                    modal.classList.add('flex');
                    
                    setTimeout(() => {
                        backdrop.classList.add('opacity-100');
                        container.classList.remove('scale-95', 'opacity-0', 'pointer-events-none');
                        container.classList.add('scale-100', 'opacity-100', 'pointer-events-auto');
                    }, 10);

                    const url = data.url;
                    const mime = data.mime || '';
                    const lowerUrl = url.toLowerCase();

                    content.innerHTML = '';
                    if (mime.startsWith('image/') || /\.(png|jpe?g|gif|webp)$/i.test(lowerUrl)) {
                        const img = document.createElement('img');
                        img.src = url;
                        img.className = 'w-full h-full object-contain';
                        content.appendChild(img);
                    } else if (mime === 'application/pdf' || lowerUrl.endsWith('.pdf')) {
                        const embed = document.createElement('embed');
                        embed.src = url;
                        embed.type = 'application/pdf';
                        embed.className = 'w-full h-full';
                        content.appendChild(embed);
                    } else {
                        content.innerHTML = `
                            <div class="text-center p-8">
                                <i data-lucide="file-warning" class="w-12 h-12 text-slate-500 mx-auto mb-4"></i>
                                <p class="text-sm text-slate-400">Preview not available for this file type.</p>
                                <a href="${data.downloadUrl || url}" class="btn btn-yellow mt-4">Download to View</a>
                            </div>
                        `;
                        if (typeof lucide !== 'undefined') lucide.createIcons();
                    }
                };

                function closeModal() {
                    backdrop.classList.remove('opacity-100');
                    container.classList.add('scale-95', 'opacity-0', 'pointer-events-none');
                    container.classList.remove('scale-100', 'opacity-100', 'pointer-events-auto');
                    setTimeout(() => {
                        modal.classList.add('hidden');
                        modal.classList.remove('flex');
                        content.innerHTML = '';
                    }, 500);
                }

                closeBtn.addEventListener('click', closeModal);
                backdrop.addEventListener('click', closeModal);
                window.addEventListener('keydown', (e) => {
                    if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal();
                });
            }
    </script>
    <!-- Fixed Floating Buttons -->
    @auth
                <!-- Case Chat Notifications Dropdown -->
        <div id="bh-messages-dropdown" class="fixed top-16 right-32 z-[60] w-[400px] max-h-[80vh] bg-[#0c0c0c] rounded-2xl border border-white/10 shadow-2xl hidden flex-col overflow-hidden transform origin-top-right transition-all duration-200 scale-95 opacity-0">
            <div class="p-5 border-b border-white/10">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-2xl font-bold text-white">Case Messages</h3>
                    <div class="relative">
                        <button id="messages-actions-btn" class="h-8 w-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white">
                                <circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/>
                            </svg>
                        </button>
                        <!-- Messages Actions Menu -->
                        <div id="messages-actions-menu" class="hidden absolute right-0 top-full mt-2 w-52 bg-[#0c0c0c] rounded-xl border border-white/10 shadow-2xl overflow-hidden z-[70]">
                            <button onclick="markAllNotificationsAsRead('message')" class="w-full px-4 py-2.5 text-left text-xs text-white hover:bg-white/5 transition-colors border-b border-white/5">
                                <div class="flex items-center gap-2.5">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <polyline points="20 6 9 17 4 12"/>
                                    </svg>
                                    <span>Mark all read</span>
                                </div>
                            </button>
                            <button onclick="clearAllNotifications('message')" class="w-full px-4 py-2.5 text-left text-xs text-white hover:bg-white/5 transition-colors border-b border-white/5">
                                <div class="flex items-center gap-2.5">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                                    </svg>
                                    <span>Clear all</span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
                <input type="text" id="bh-search-chats" placeholder="Search messages..." class="w-full px-4 py-2.5 bg-[#111111] border border-white/10 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#FACC15]">
            </div>
            
            <div id="bh-conversations-list" class="flex-1 overflow-y-auto" style="max-height: calc(80vh - 100px);">
                @php
                    $__userChatNotifications = auth()->user()->notifications()
                        ->where('data->type', 'case_message_received')
                        ->orderByDesc('created_at')
                        ->take(15)->get();
                @endphp
                @forelse($__userChatNotifications as $notification)
                        @php
                            $targetUrl = isset($notification->data['batch_id']) ? route('user.reports.show', $notification->data['batch_id']) . '#chat' : '#';
                        @endphp
                        <div class="group flex items-start gap-3 p-4 hover:bg-white/5 transition-colors border-b border-white/5 cursor-pointer {{ $notification->read_at ? '' : 'bg-[#FACC15]/5 notification-unread' }}" 
                             onclick="markReadAndRedirect('{{ $notification->id }}', '{{ $targetUrl }}', event, 'message')">
                            <div class="shrink-0">
                                <div class="h-10 w-10 rounded-full bg-gradient-to-br from-[#FACC15] to-[#F59E0B] flex items-center justify-center text-black font-bold text-sm">
                                    {{ substr($notification->data['title'] ?? 'N', 0, 1) }}
                                </div>
                            </div>
                            <div class="flex-1 min-w-0">
                                <div class="flex items-center justify-between gap-2">
                                    <p class="text-xs font-bold text-white">{{ $notification->data['title'] ?? 'New Message' }}</p>
                                    <p class="text-[10px] text-gray-500">{{ $notification->created_at->diffForHumans() }}</p>
                                </div>
                                <p class="text-xs text-gray-300 mt-1 line-clamp-2 leading-relaxed">{{ $notification->data['message'] ?? '' }}</p>
                                @if(isset($notification->data['batch_id']))
                                    <span class="inline-flex items-center gap-1 mt-2 text-[10px] text-[#FACC15] group-hover:text-white transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                                        </svg>
                                        Go to Chat
                                    </span>
                                @endif
                            </div>
                            @if(!$notification->read_at)
                                <div class="h-1.5 w-1.5 rounded-full bg-[#FACC15] shrink-0 mt-1 notification-dot"></div>
                            @endif
                        </div>
                @empty
                    <div class="text-center text-gray-400 text-sm py-12">No chat notifications yet</div>
                @endforelse
            </div>
        </div>

        <!-- Notifications Dropdown -->
        <div id="bh-notifications-dropdown" class="fixed top-16 right-20 z-[60] w-[360px] max-h-[80vh] bg-[#0c0c0c] rounded-xl border border-white/10 shadow-2xl hidden flex-col overflow-hidden transform origin-top-right transition-all duration-200 scale-95 opacity-0">
            <div class="p-4 border-b border-white/10">
                <div class="flex items-center justify-between mb-3">
                    <h3 class="text-xl font-bold text-white">Notifications</h3>
                    <div class="relative">
                        <button id="notifications-actions-btn" class="h-8 w-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white">
                                <circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/>
                            </svg>
                        </button>
                        <!-- Actions Menu -->
                        <div id="notifications-actions-menu" class="hidden absolute right-0 top-full mt-2 w-52 bg-[#0c0c0c] rounded-xl border border-white/10 shadow-2xl overflow-hidden z-[70]">
                            <button onclick="markAllNotificationsAsRead('notification')" class="w-full px-4 py-2.5 text-left text-xs text-white hover:bg-white/5 transition-colors border-b border-white/5">
                                <div class="flex items-center gap-2.5">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <polyline points="20 6 9 17 4 12"/>
                                    </svg>
                                    <span>Mark all read</span>
                                </div>
                            </button>
                            <button onclick="clearAllNotifications('notification')" class="w-full px-4 py-2.5 text-left text-xs text-white hover:bg-white/5 transition-colors border-b border-white/5">
                                <div class="flex items-center gap-2.5">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                                    </svg>
                                    <span>Clear all</span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="flex gap-2">
                    <button id="notifications-all-btn" onclick="filterNotifications('all')" class="px-3 py-1.5 rounded-full bg-[#FACC15] text-black text-xs font-bold transition-colors">All</button>
                    <button id="notifications-unread-btn" onclick="filterNotifications('unread')" class="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white text-xs font-semibold transition-colors">Unread</button>
                </div>
            </div>
            
            <div id="notifications-list" class="flex-1 overflow-y-auto" style="max-height: calc(80vh - 120px);">
                @php
                    $__userStatusNotifications = auth()->user()->notifications
                        ->filter(function($n) {
                            $type = $n->data['type'] ?? '';
                            return str_contains($type, 'case_') && !str_contains($type, 'message_received')
                                || in_array($type, ['status_updated', 'status_update', 'case_status_change']);
                        })
                        ->sortByDesc('created_at')
                        ->take(15);
                @endphp
                @forelse($__userStatusNotifications as $notification)
                    @php $_linkId = $notification->data['batch_id'] ?? $notification->data['report_id'] ?? null; @endphp
                    <div class="group notification-item flex items-start gap-3 p-3 hover:bg-white/5 transition-colors border-b border-white/5 cursor-pointer {{ $notification->read_at ? '' : 'bg-[#FACC15]/5 notification-unread' }}" 
                         data-read="{{ $notification->read_at ? 'true' : 'false' }}"
                         onclick="markReadAndRedirect('{{ $notification->id }}', '{{ $_linkId ? route('user.reports.show', $_linkId) : '#' }}', event, 'notification')">
                        <div class="h-10 w-10 rounded-full bg-gradient-to-br from-[#FACC15] to-[#F59E0B] flex items-center justify-center text-black shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/>
                            </svg>
                        </div>
                        <div class="flex-1 min-w-0">
                            <div class="flex items-center justify-between gap-2">
                                <p class="text-xs font-bold text-white {{ !$notification->read_at ? 'text-[#FACC15]' : '' }}">{{ $notification->data['title'] ?? 'Case Updated' }}</p>
                                <p class="text-[10px] text-[#FACC15]">{{ $notification->created_at->diffForHumans() }}</p>
                            </div>
                            <p class="text-xs text-white leading-relaxed mt-0.5 {{ !$notification->read_at ? 'font-medium' : 'text-gray-300' }}">{{ $notification->data['message'] ?? 'Status changed.' }}</p>
                            @if($_linkId)
                                <span class="inline-flex items-center gap-1 mt-1 text-[10px] text-[#FACC15] group-hover:text-white transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                                        <polyline points="15,3 21,3 21,9"/>
                                        <line x1="10" y1="14" x2="21" y2="3"/>
                                    </svg>
                                    View Case
                                </span>
                            @endif
                        </div>
                        @if(!$notification->read_at)
                            <div class="h-1.5 w-1.5 rounded-full bg-[#FACC15] shrink-0 mt-1 notification-dot"></div>
                        @endif
                    </div>
                @empty
                    <div class="text-center text-gray-400 text-xs py-10">No case updates yet</div>
                @endforelse
            </div>
        </div>

        <!-- Chat Window Modal -->
        <div id="bh-chat-window" class="fixed bottom-4 right-4 z-[70] w-[400px] h-[600px] bg-[#0c0c0c] rounded-2xl border border-white/10 shadow-2xl hidden flex-col overflow-hidden">
            <!-- Chat Header -->
            <div class="p-4 border-b border-white/10 bg-gradient-to-r from-[#0c0c0c] to-[#111111] flex items-center justify-between">
                <div class="flex items-center gap-3">
                    <div id="chat-window-avatar" class="h-10 w-10 rounded-full bg-gradient-to-br from-[#FACC15] to-[#F59E0B] flex items-center justify-center text-black font-bold text-sm">
                        D
                    </div>
                    <div>
                        <h3 id="chat-window-name" class="text-base font-bold text-white">Doctor</h3>
                        <p id="chat-window-role" class="text-xs text-gray-400">admin</p>
                    </div>
                </div>
                <div class="flex items-center gap-2">
                    <button onclick="minimizeChatWindow()" class="h-8 w-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white">
                            <path d="M5 12h14"/>
                        </svg>
                    </button>
                    <button onclick="closeChatWindow()" class="h-8 w-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white">
                            <path d="M18 6L6 18M6 6l12 12"/>
                        </svg>
                    </button>
                </div>
            </div>
            
            <!-- Chat Messages -->
            <div id="chat-window-messages" class="flex-1 overflow-y-auto p-4 space-y-3" style="scrollbar-width: thin; scrollbar-color: rgba(250, 204, 21, 0.3) transparent;">
                <div class="text-center text-gray-400 text-sm py-8">Loading messages...</div>
            </div>
            
            <!-- Chat Input -->
            <div class="p-4 border-t border-white/10 bg-[#0c0c0c]">
                <form id="chat-window-form" class="flex gap-2">
                    <textarea 
                        id="chat-window-input" 
                        placeholder="Type a message..." 
                        rows="1"
                        class="flex-1 px-4 py-2.5 bg-[#111111] border border-white/10 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#FACC15] resize-none"
                        style="max-height: 100px;"
                    ></textarea>
                    <button type="submit" class="h-10 w-10 rounded-full bg-[#FACC15] hover:bg-[#FACC15]/90 flex items-center justify-center transition-colors shrink-0 self-end">
                        <svg class="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                        </svg>
                    </button>
                </form>
            </div>
        </div>

        <!-- Minimized Chat Window -->
        <div id="bh-chat-minimized" class="fixed bottom-4 right-4 z-[70] hidden">
            <button onclick="restoreChatWindow()" class="flex items-center gap-3 px-4 py-3 bg-[#0c0c0c] border border-white/10 rounded-2xl shadow-2xl hover:bg-[#111111] transition-colors">
                <div id="chat-minimized-avatar" class="h-10 w-10 rounded-full bg-gradient-to-br from-[#FACC15] to-[#F59E0B] flex items-center justify-center text-black font-bold text-sm">
                    D
                </div>
                <div class="text-left">
                    <p id="chat-minimized-name" class="text-sm font-bold text-white">Doctor</p>
                    <p class="text-xs text-gray-400">Click to open</p>
                </div>
            </button>
        </div>

        <script>
            (function() {
                const messagesBtnHeader = document.getElementById('bh-messages-btn-header');
                const messagesDropdown = document.getElementById('bh-messages-dropdown');
                const conversationsList = document.getElementById('bh-conversations-list');
                const newChatList = document.getElementById('bh-new-chat-list');
                const newChatBtn = document.getElementById('bh-new-chat-btn');
                const backToChatsBtn = document.getElementById('bh-back-to-chats');
                const searchChats = document.getElementById('bh-search-chats');
                const searchUsers = document.getElementById('bh-search-users');
                
                const notificationsBtnHeader = document.getElementById('bh-notifications-btn-header');
                const notificationsDropdown = document.getElementById('bh-notifications-dropdown');

                // Toggle messages dropdown
                if (messagesBtnHeader && messagesDropdown) {
                    messagesBtnHeader.addEventListener('click', (e) => {
                        e.stopPropagation();
                        const isHidden = messagesDropdown.classList.contains('hidden');
                        
                        // Close notifications
                        notificationsDropdown.classList.add('hidden');
                        notificationsDropdown.classList.add('scale-95', 'opacity-0');
                        notificationsDropdown.classList.remove('scale-100', 'opacity-100');
                        
                        if (isHidden) {
                            messagesDropdown.classList.remove('hidden');
                            messagesDropdown.classList.add('flex');
                            setTimeout(() => {
                                messagesDropdown.classList.remove('scale-95', 'opacity-0');
                                messagesDropdown.classList.add('scale-100', 'opacity-100');
                            }, 10);
                        } else {
                            messagesDropdown.classList.add('scale-95', 'opacity-0');
                            messagesDropdown.classList.remove('scale-100', 'opacity-100');
                            setTimeout(() => {
                                messagesDropdown.classList.add('hidden');
                                messagesDropdown.classList.remove('flex');
                            }, 200);
                        }
                    });
                }

                // Show new chat list
                if (newChatBtn) {
                    newChatBtn.addEventListener('click', (e) => {
                        e.preventDefault();
                        conversationsList.classList.add('hidden');
                        newChatList.classList.remove('hidden');
                        newChatList.classList.add('flex');
                    });
                }

                // Back to conversations
                if (backToChatsBtn) {
                    backToChatsBtn.addEventListener('click', (e) => {
                        e.preventDefault();
                        newChatList.classList.add('hidden');
                        newChatList.classList.remove('flex');
                        conversationsList.classList.remove('hidden');
                    });
                }

                // Search chats
                if (searchChats && conversationsList) {
                    searchChats.addEventListener('input', (e) => {
                        const query = e.target.value.toLowerCase();
                        const items = conversationsList.querySelectorAll('button');
                        items.forEach(item => {
                            const nameEl = item.querySelector('.font-semibold');
                            if (nameEl) {
                                const name = nameEl.textContent.toLowerCase();
                                item.style.display = name.includes(query) ? 'flex' : 'none';
                            }
                        });
                    });
                }

                // Search users
                if (searchUsers && newChatList) {
                    searchUsers.addEventListener('input', (e) => {
                        const query = e.target.value.toLowerCase();
                        const items = newChatList.querySelectorAll('button');
                        items.forEach(item => {
                            const nameEl = item.querySelector('.font-semibold');
                            if (nameEl) {
                                const name = nameEl.textContent.toLowerCase();
                                item.style.display = name.includes(query) ? 'flex' : 'none';
                            }
                        });
                    });
                }

                // Toggle notifications dropdown
                if (notificationsBtnHeader && notificationsDropdown) {
                    notificationsBtnHeader.addEventListener('click', (e) => {
                        e.stopPropagation();
                        const isHidden = notificationsDropdown.classList.contains('hidden');
                        
                        // Close messages
                        messagesDropdown.classList.add('hidden');
                        messagesDropdown.classList.add('scale-95', 'opacity-0');
                        messagesDropdown.classList.remove('scale-100', 'opacity-100');
                        
                        if (isHidden) {
                            notificationsDropdown.classList.remove('hidden');
                            notificationsDropdown.classList.add('flex');
                            setTimeout(() => {
                                notificationsDropdown.classList.remove('scale-95', 'opacity-0');
                                notificationsDropdown.classList.add('scale-100', 'opacity-100');
                            }, 10);
                        } else {
                            notificationsDropdown.classList.add('scale-95', 'opacity-0');
                            notificationsDropdown.classList.remove('scale-100', 'opacity-100');
                            setTimeout(() => {
                                notificationsDropdown.classList.add('hidden');
                                notificationsDropdown.classList.remove('flex');
                            }, 200);
                        }
                    });
                }

                // Close dropdowns when clicking outside
                document.addEventListener('click', (e) => {
                    const chatWindow = document.getElementById('bh-chat-window');
                    const actionsMenu = document.getElementById('notifications-actions-menu');
                    const actionsBtn = document.getElementById('notifications-actions-btn');
                    
                    // Messages Dropdown Guard
                    if (messagesBtnHeader && messagesDropdown) {
                        try {
                            const isClickInside = messagesBtnHeader.contains(e.target) || messagesDropdown.contains(e.target);
                            const isChatActive = chatWindow && !chatWindow.classList.contains('hidden');
                            
                            if (!isClickInside && !isChatActive) {
                                messagesDropdown.classList.add('scale-95', 'opacity-0');
                                messagesDropdown.classList.remove('scale-100', 'opacity-100');
                                setTimeout(() => {
                                    if (messagesDropdown) {
                                        messagesDropdown.classList.add('hidden');
                                        messagesDropdown.classList.remove('flex');
                                    }
                                    if (newChatList && conversationsList) {
                                        newChatList.classList.add('hidden');
                                        newChatList.classList.remove('flex');
                                        conversationsList.classList.remove('hidden');
                                    }
                                }, 200);
                            }
                        } catch (err) {}
                    }

                    // Notifications Dropdown Guard
                    if (notificationsBtnHeader && notificationsDropdown) {
                        try {
                            const isClickInside = notificationsBtnHeader.contains(e.target) || notificationsDropdown.contains(e.target);
                            
                            if (!isClickInside) {
                                notificationsDropdown.classList.add('scale-95', 'opacity-0');
                                notificationsDropdown.classList.remove('scale-100', 'opacity-100');
                                setTimeout(() => {
                                    if (notificationsDropdown) {
                                        notificationsDropdown.classList.add('hidden');
                                        notificationsDropdown.classList.remove('flex');
                                    }
                                }, 200);
                            }
                        } catch (err) {}
                    }

                    // Close actions menu
                    if (actionsMenu && actionsBtn) {
                        try {
                            if (!actionsBtn.contains(e.target) && !actionsMenu.contains(e.target)) {
                                actionsMenu.classList.add('hidden');
                            }
                        } catch (err) {}
                    }
                });

                // Toggle messages actions menu
                const msgActionsBtn = document.getElementById('messages-actions-btn');
                const msgActionsMenu = document.getElementById('messages-actions-menu');
                if (msgActionsBtn && msgActionsMenu) {
                    msgActionsBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        msgActionsMenu.classList.toggle('hidden');
                    });
                }

                // Toggle notifications actions menu
                const actionsBtn = document.getElementById('notifications-actions-btn');
                const actionsMenu = document.getElementById('notifications-actions-menu');
                if (actionsBtn && actionsMenu) {
                    actionsBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        actionsMenu.classList.toggle('hidden');
                    });
                }
            })();

            // Notification Functions
            function filterNotifications(filter) {
                const allBtn = document.getElementById('notifications-all-btn');
                const unreadBtn = document.getElementById('notifications-unread-btn');
                const notificationItems = document.querySelectorAll('.notification-item');
                
                if (filter === 'all') {
                    allBtn.classList.remove('bg-white/5', 'text-white');
                    allBtn.classList.add('bg-[#FACC15]', 'text-black');
                    unreadBtn.classList.remove('bg-[#FACC15]', 'text-black');
                    unreadBtn.classList.add('bg-white/5', 'text-white');
                    
                    notificationItems.forEach(item => {
                        item.style.display = 'flex';
                    });
                } else if (filter === 'unread') {
                    unreadBtn.classList.remove('bg-white/5', 'text-white');
                    unreadBtn.classList.add('bg-[#FACC15]', 'text-black');
                    allBtn.classList.remove('bg-[#FACC15]', 'text-black');
                    allBtn.classList.add('bg-white/5', 'text-white');
                    
                    notificationItems.forEach(item => {
                        const isRead = item.getAttribute('data-read') === 'true';
                        item.style.display = isRead ? 'none' : 'flex';
                    });
                }
            }

            async function markAllNotificationsAsRead(type = null) {
                try {
                    let url = '{{ route("user.notifications.mark-all-read") }}';
                    if (type) url += `?type=${type}`;
                    
                    const response = await fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
                        }
                    });
                    
                    if (response.ok) {
                        const selector = type === 'message' ? '#bh-conversations-list' : '#notifications-list';
                        const container = document.querySelector(selector);
                        
                        if (container) {
                            container.querySelectorAll('.notification-unread').forEach(item => {
                                item.setAttribute('data-read', 'true');
                                item.classList.remove('bg-[#FACC15]/5', 'notification-unread');
                                const dot = item.querySelector('.bg-\\[\\#FACC15\\], .notification-dot');
                                if (dot && dot.classList.contains('rounded-full') || dot && dot.classList.contains('notification-dot')) dot.remove();
                            });
                        }
                        
                        if (type === 'notification' || !type) {
                            const badgeNotifications = document.querySelector('#bh-notifications-btn-header .absolute');
                            if (badgeNotifications) badgeNotifications.remove();
                        }
                        
                        if (type === 'message' || !type) {
                            const badgeMessages = document.querySelector('#bh-messages-btn-header .absolute');
                            if (badgeMessages) badgeMessages.remove();
                        }
                        
                        if (msgActionsMenu) msgActionsMenu.classList.add('hidden');
                        if (actionsMenu) actionsMenu.classList.add('hidden');
                    }
                } catch (error) {
                    console.error('Error marking notifications as read:', error);
                }
            }

            async function markReadAndRedirect(id, url, event, type) {
                if (event) {
                    event.preventDefault();
                    event.stopPropagation();
                }

                // Immediate UI update
                const items = document.querySelectorAll(`[onclick*="${id}"]`);
                let wasUnread = false;
                items.forEach(item => {
                    if (item.classList.contains('notification-unread')) {
                        wasUnread = true;
                    }
                    item.classList.remove('bg-[#FACC15]/5', 'notification-unread');
                    const dot = item.querySelector('.notification-dot');
                    if (dot) dot.remove();
                });

                // Update counts immediately
                if (wasUnread) {
                    const badgeId = type === 'message' ? '#bh-messages-btn-header .absolute' : '#bh-notifications-btn-header .absolute';
                    const badge = document.querySelector(badgeId);
                    if (badge) {
                        const count = parseInt(badge.textContent.trim()) || 0;
                        if (count <= 1) {
                            badge.remove();
                        } else {
                            badge.textContent = count - 1;
                        }
                    }
                }

                try {
                    // Start marker request but don't wait for it if it takes too long
                    fetch(`/user/notifications/mark-read/${id}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
                        }
                    });
                } catch (e) {}

                if (url && url !== '#') {
                    window.location.href = url;
                }
            }

            async function clearAllNotifications(type = null) {
                if (!confirm('Are you sure you want to clear these items?')) return;
                try {
                    let url = '{{ route("user.notifications.clear-all") }}';
                    if (type) url += `?type=${type}`;
                    
                    const response = await fetch(url, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
                        }
                    });
                    
                    if (response.ok) {
                        if (type === 'notification' || !type) {
                            const notificationsList = document.getElementById('notifications-list');
                            if (notificationsList) notificationsList.innerHTML = '<div class="text-center text-gray-400 text-xs py-10">No notifications yet</div>';
                            const badge = document.querySelector('#bh-notifications-btn-header .absolute');
                            if (badge) badge.remove();
                        }
                        
                        if (type === 'message' || !type) {
                            const conversationsList = document.getElementById('bh-conversations-list');
                            if (conversationsList) conversationsList.innerHTML = '<div class="text-center text-gray-400 text-sm py-12">No chat notifications yet</div>';
                            const badge = document.querySelector('#bh-messages-btn-header .absolute');
                            if (badge) badge.remove();
                        }
                        
                        if (msgActionsMenu) msgActionsMenu.classList.add('hidden');
                        if (actionsMenu) actionsMenu.classList.add('hidden');
                    }
                } catch (error) {
                    console.error('Error clearing notifications:', error);
                }
            }

            // Notification Polling
            let seenNotificationIds = new Set();
            async function pollNotifications() {
                try {
                    const response = await fetch('{{ route("user.notifications.recent") }}');
                    const data = await response.json();
                    
                    if (data.ok && data.notifications && data.notifications.length > 0) {
                        let newCount = 0;
                        data.notifications.forEach(notification => {
                            if (!seenNotificationIds.has(notification.id)) {
                                seenNotificationIds.add(notification.id);
                                // The user requested to disable the toast popups shown in the first image
                                // if (window.showToast) {
                                //     window.showToast(notification.title, notification.message, 'info');
                                // }
                                newCount++;
                            }
                        });
                        
                        if (newCount > 0) {
                            // Update badge if possible
                            const badge = document.querySelector('#bh-notifications-btn-header .absolute');
                            if (badge) {
                                const currentCount = parseInt(badge.textContent.trim()) || 0;
                                badge.textContent = currentCount + newCount;
                            } else {
                                const btn = document.getElementById('bh-notifications-btn-header');
                                if (btn) {
                                    const relativeDiv = btn.querySelector('.relative');
                                    const newBadge = document.createElement('span');
                                    newBadge.className = 'absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center';
                                    newBadge.textContent = newCount;
                                    relativeDiv.appendChild(newBadge);
                                }
                            }
                        }
                    }
                } catch (error) {
                    console.error('Notification polling failed:', error);
                }
            }
            
            // Start polling every minute
            setInterval(pollNotifications, 60000);

            // Chat Window Functions
            let currentChatUserId = null;
            let chatPollingInterval = null;
            let lastChatMessageId = 0;

            function openChatWindow(userId, userName, userRole) {
                currentChatUserId = userId;
                const chatWindow = document.getElementById('bh-chat-window');
                const chatMinimized = document.getElementById('bh-chat-minimized');
                const messagesDropdown = document.getElementById('bh-messages-dropdown');
                
                if (messagesDropdown) {
                    messagesDropdown.classList.add('scale-95', 'opacity-0');
                    messagesDropdown.classList.remove('scale-100', 'opacity-100');
                    setTimeout(() => {
                        messagesDropdown.classList.add('hidden');
                        messagesDropdown.classList.remove('flex');
                    }, 200);
                }
                
                document.getElementById('chat-window-name').textContent = userName;
                document.getElementById('chat-window-role').textContent = userRole;
                document.getElementById('chat-window-avatar').textContent = userName.charAt(0).toUpperCase();
                document.getElementById('chat-minimized-name').textContent = userName;
                document.getElementById('chat-minimized-avatar').textContent = userName.charAt(0).toUpperCase();
                
                chatWindow.classList.remove('hidden');
                chatWindow.classList.add('flex');
                chatMinimized.classList.add('hidden');
                
                loadChatMessages(userId);
                if (chatPollingInterval) clearInterval(chatPollingInterval);
                chatPollingInterval = setInterval(() => pollChatMessages(userId), 5000);
            }

            function closeChatWindow() {
                const chatWindow = document.getElementById('bh-chat-window');
                const chatMinimized = document.getElementById('bh-chat-minimized');
                chatWindow.classList.add('hidden');
                chatWindow.classList.remove('flex');
                chatMinimized.classList.add('hidden');
                currentChatUserId = null;
                if (chatPollingInterval) {
                    clearInterval(chatPollingInterval);
                    chatPollingInterval = null;
                }
            }

            function minimizeChatWindow() {
                const chatWindow = document.getElementById('bh-chat-window');
                const chatMinimized = document.getElementById('bh-chat-minimized');
                chatWindow.classList.add('hidden');
                chatWindow.classList.remove('flex');
                chatMinimized.classList.remove('hidden');
            }

            function restoreChatWindow() {
                const chatWindow = document.getElementById('bh-chat-window');
                const chatMinimized = document.getElementById('bh-chat-minimized');
                chatWindow.classList.remove('hidden');
                chatWindow.classList.add('flex');
                chatMinimized.classList.add('hidden');
            }

            async function loadChatMessages(userId) {
                const messagesContainer = document.getElementById('chat-window-messages');
                try {
                    const response = await fetch(`/user/chats/doctors/${userId}/messages`);
                    const data = await response.json();
                    
                    if (data.ok && data.messages && data.messages.length > 0) {
                        renderChatMessages(data.messages);
                        lastChatMessageId = data.messages[data.messages.length - 1].id;
                    } else {
                        messagesContainer.innerHTML = '<div class="text-center text-gray-400 text-sm py-8">No messages yet. Start the conversation!</div>';
                    }
                } catch (error) {
                    console.error('Failed to load messages:', error);
                    messagesContainer.innerHTML = '<div class="text-center text-red-400 text-sm py-8">Failed to load messages</div>';
                }
            }

            async function pollChatMessages(userId) {
                if (!currentChatUserId || currentChatUserId !== userId) return;
                try {
                    const response = await fetch(`/user/chats/doctors/${userId}/messages?after_id=${lastChatMessageId}`);
                    const data = await response.json();
                    
                    if (data.ok && data.messages && data.messages.length > 0) {
                        const messagesContainer = document.getElementById('chat-window-messages');
                        data.messages.forEach(msg => {
                            const messageEl = createChatMessageElement(msg);
                            messagesContainer.appendChild(messageEl);
                        });
                        lastChatMessageId = data.messages[data.messages.length - 1].id;
                        scrollChatToBottom();
                    }
                } catch (error) {
                    console.error('Polling failed:', error);
                }
            }

            function renderChatMessages(messages) {
                const messagesContainer = document.getElementById('chat-window-messages');
                messagesContainer.innerHTML = '';
                messages.forEach(msg => {
                    const messageEl = createChatMessageElement(msg);
                    messagesContainer.appendChild(messageEl);
                });
                scrollChatToBottom();
            }

            function createChatMessageElement(message) {
                const div = document.createElement('div');
                const isCurrentUser = message.sender_id === {{ auth()->id() }};
                div.className = `flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`;
                div.innerHTML = `
                    <div class="max-w-[75%] ${isCurrentUser ? 'bg-[#FACC15] text-black' : 'bg-[#111111] text-white'} rounded-2xl px-4 py-2.5 shadow-sm">
                        ${!isCurrentUser ? `<p class="text-xs font-bold text-[#FACC15] mb-1">${message.sender_name}</p>` : ''}
                        <p class="text-sm leading-relaxed whitespace-pre-wrap break-words border-0 outline-none">${linkifyText(message.body)}</p>
                        <p class="text-xs ${isCurrentUser ? 'text-black/60' : 'text-gray-500'} mt-1">${message.created_at_label || message.created_at}</p>
                    </div>
                `;
                return div;
            }

            function linkifyText(text) {
                const urlRegex = /(https?:\/\/[^\s]+)/g;
                return text.replace(urlRegex, '<a href="$1" target="_blank" class="underline">$1</a>');
            }

            function scrollChatToBottom() {
                const messagesContainer = document.getElementById('chat-window-messages');
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }

            const chatForm = document.getElementById('chat-window-form');
            const chatInput = document.getElementById('chat-window-input');
            
            if (chatForm) {
                chatForm.addEventListener('submit', async (e) => {
                    e.preventDefault();
                    const message = chatInput.value.trim();
                    if (!message || !currentChatUserId) return;
                    chatInput.disabled = true;
                    try {
                        const response = await fetch(`/user/chats/doctors/${currentChatUserId}`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json',
                                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
                            },
                            body: JSON.stringify({ body: message })
                        });
                        const data = await response.json();
                        if (data.ok || response.redirected) {
                            chatInput.value = '';
                            chatInput.style.height = 'auto';
                            loadChatMessages(currentChatUserId);
                        } else {
                            alert('Failed to send message. Please try again.');
                        }
                    } catch (error) {
                        console.error('Failed to send message:', error);
                    } finally {
                        chatInput.disabled = false;
                        chatInput.focus();
                    }
                });
                
                chatInput.addEventListener('input', function() {
                    this.style.height = 'auto';
                    this.style.height = Math.min(this.scrollHeight, 100) + 'px';
                });

                chatInput.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        chatForm.requestSubmit();
                    }
                });
            }
        </script>
    @endauth

    @if (session('welcome'))
        <div id="bh-welcome-toast" class="fixed top-5 right-5 z-[9999] w-[min(92vw,360px)]">
            <div class="rounded-2xl border border-amber-400/35 bg-black/80 backdrop-blur-xl px-4 py-3 shadow-2xl">
                <div class="flex items-start gap-3">
                    <div class="mt-0.5 h-9 w-9 rounded-xl bg-amber-400/15 border border-amber-400/35 flex items-center justify-center text-amber-200 font-bold text-sm">BH</div>
                    <div class="flex-1 min-w-0">
                        <p class="text-[11px] uppercase tracking-[0.18em] text-slate-400">Welcome</p>
                        <p class="mt-0.5 text-sm font-semibold text-slate-100">{{ session('welcome') }}</p>
                    </div>
                    <button type="button" id="bh-welcome-toast-close" class="text-slate-400 hover:text-amber-200 text-xs">✕</button>
                </div>
                <div class="mt-3 h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                    <div id="bh-welcome-toast-bar" class="h-full w-full bg-amber-400/70"></div>
                </div>
            </div>
        </div>
        <script>
            (function () {
                var toast = document.getElementById('bh-welcome-toast');
                var closeBtn = document.getElementById('bh-welcome-toast-close');
                var bar = document.getElementById('bh-welcome-toast-bar');
                if (!toast || !closeBtn || !bar) return;
                var duration = 4500;
                var started = Date.now();
                var raf;
                function tick() {
                    var elapsed = Date.now() - started;
                    var left = Math.max(0, 1 - (elapsed / duration));
                    bar.style.width = (left * 100) + '%';
                    if (elapsed >= duration) {
                        toast.remove();
                        return;
                    }
                    raf = requestAnimationFrame(tick);
                }
                function close() {
                    if (raf) cancelAnimationFrame(raf);
                    toast.remove();
                }
                closeBtn.addEventListener('click', close);
                tick();
            })();
        </script>
    @endif
    @stack('scripts')
    
    <!-- Global Engagement Tracking (1 Minute Minimum Dwell Time) -->
    <script>
        setTimeout(() => {
            if (document.querySelector('meta[name="csrf-token"]')) {
                fetch('{{ route("analytics.track-engagement") }}', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                        'X-Requested-With': 'XMLHttpRequest'
                    },
                    body: JSON.stringify({ path: window.location.pathname })
                }).catch(e => {}); // Silent fail
            }
        }, 60000);
    </script>
</body>
</html>
