<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ $title }} | Shared Case | BoneHard</title>
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700&family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    <script src="https://unpkg.com/lucide@latest"></script>
    <style>
        body {
            font-family: "IBM Plex Sans", "IBM Plex Sans Arabic", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
            background-color: #060606;
            color: #f5f5f5;
        }
        :root {
            --bh-bg: #060606;
            --bh-surface: #0c0c0c;
            --bh-surface-2: #111111;
            --bh-border: rgba(255, 255, 255, 0.1);
            --bh-accent: #FACC15;
        }
        .bh-card {
            background: linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01));
            border-radius: 24px;
            border: 1px solid var(--bh-border);
            box-shadow: 0 10px 40px -10px rgba(0,0,0,0.5);
            transition: border-color 0.3s ease;
        }
        .bh-card:hover {
            border-color: rgba(250, 204, 21, 0.2);
        }
    </style>
</head>
<body class="min-h-screen flex flex-col p-4 md:p-8" style="background: radial-gradient(1200px 600px at 18% 0%, rgba(255,255,255,0.06), transparent 60%), var(--bh-bg);">
    <div class="max-w-6xl mx-auto w-full flex-1">
        <!-- Header -->
        <header class="flex items-center justify-between mb-12">
            <div class="flex items-center gap-4">
                <div class="h-10 w-10 rounded-xl bg-slate-900 border border-amber-400/50 flex items-center justify-center overflow-hidden">
                    <img src="{{ asset('images/favicon.png') }}" alt="BoneHard" class="h-8 w-8 object-contain" />
                </div>
                <h1 class="text-xl font-bold tracking-tight text-white uppercase tracking-widest">BoneHard <span class="text-amber-400">Case Share</span></h1>
            </div>
            <div class="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-white/5 border border-white/10 px-3 py-1.5 rounded-full flex items-center gap-2">
                <span class="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                Secure Link
            </div>
        </header>

        <!-- Case Information Banner -->
        <div class="bh-card p-6 md:p-10 mb-10 overflow-hidden relative">
            <div class="absolute top-0 right-0 p-4 opacity-5">
                <i data-lucide="shield-check" class="w-32 h-32 text-white"></i>
            </div>
            <div class="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div class="space-y-4">
                    <h2 class="text-2xl md:text-3xl font-extrabold text-[#FACC15] tracking-tight leading-tight">{{ $title }}</h2>
                    @php $firstReport = $reports->first(); @endphp
                    @if($firstReport && $firstReport->description)
                        <div class="bg-black/20 rounded-2xl p-6 border border-white/5">
                            <h3 class="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">Case Information / Notes</h3>
                            <p class="text-gray-200 text-sm md:text-base leading-relaxed whitespace-pre-wrap font-medium">{{ $firstReport->description }}</p>
                        </div>
                    @endif
                    <div class="flex flex-wrap gap-4 mt-6">
                        <div class="bg-white/5 border border-white/10 rounded-xl px-4 py-2">
                            <p class="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Current Status</p>
                            <span class="inline-flex items-center gap-1.5 text-sm font-bold text-green-400">
                                <span class="w-2 h-2 bg-green-500 rounded-full"></span>
                                {{ $firstReport->status }}
                            </span>
                        </div>
                        <div class="bg-white/5 border border-white/10 rounded-xl px-4 py-2">
                            <p class="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Date Shared</p>
                            <p class="text-sm font-bold text-white">{{ now()->format('Y-m-d h:i A') }}</p>
                        </div>
                        <div class="bg-white/5 border border-white/10 rounded-xl px-4 py-2">
                            <p class="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Collection Ref</p>
                            <p class="text-sm font-bold text-white">#{{ substr($batch_id, 0, 8) }}...</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Files Section -->
        <div class="mb-12">
            <h3 class="text-xl font-bold text-white mb-8 flex items-center gap-3">
                <i data-lucide="folder-open" class="text-amber-400"></i>
                Case Files ({{ $reports->count() }})
            </h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                @foreach ($reports as $report)
                    <div class="bg-[#111111] rounded-[24px] border border-white/5 p-6 group hover:border-[#FACC15]/30 transition-all duration-500 flex flex-col justify-between">
                        <div>
                            <div class="flex items-start justify-between mb-4">
                                <div class="h-12 w-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform duration-500">
                                    <i data-lucide="file-text"></i>
                                </div>
                                <span class="inline-flex items-center rounded-lg bg-white/5 px-2.5 py-1 text-[10px] font-black text-gray-400 border border-white/10 uppercase tracking-widest group-hover:bg-[#FACC15]/10 group-hover:text-[#FACC15] group-hover:border-[#FACC15]/20">
                                    {{ strtoupper(pathinfo($report->original_name, PATHINFO_EXTENSION)) }}
                                </span>
                            </div>
                            <h4 class="text-sm font-bold text-white mb-1 line-clamp-2 break-words" title="{{ $report->original_name }}">
                                {{ $report->original_name }}
                            </h4>
                            <p class="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-6">
                                {{ round($report->size / 1024, 1) }} KB • {{ $report->mime_type }}
                            </p>
                        </div>
                        
                        <div class="flex flex-col gap-2">
                            @php
                                $sig = hash_hmac('sha256', 'file_' . (string)$report->id . '_' . (string)$batch_id, (string)config('app.key'));
                                $publicDownloadUrl = route('reports.file.shared', ['batchId' => $batch_id, 'fileId' => $report->id, 'signature' => $sig]);
                                $publicPreviewUrl = route('reports.file.preview', ['batchId' => $batch_id, 'fileId' => $report->id, 'signature' => $sig]);
                            @endphp

                            <button type="button" 
                                class="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-black border border-white/10 text-xs font-bold text-white hover:bg-white/5 transition-colors"
                                onclick="openSharedPreview({
                                    url: '{{ $publicPreviewUrl }}',
                                    downloadUrl: '{{ $publicDownloadUrl }}',
                                    mime: '{{ $report->mime_type }}',
                                    name: '{{ addslashes($report->original_name) }}'
                                })">
                                <i data-lucide="eye" class="w-4 h-4"></i>
                                Preview
                            </button>

                            <a href="{{ $publicDownloadUrl }}" class="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#FACC15] text-black font-black text-xs hover:bg-white transition-all transform active:scale-95 shadow-lg shadow-amber-400/10">
                                <i data-lucide="download" class="w-4 h-4"></i>
                                Download
                            </a>
                        </div>
                    </div>
                @endforeach
            </div>
        </div>

        <footer class="mt-20 py-10 border-t border-white/5 text-center">
            <p class="text-xs text-gray-500 font-medium">BoneHard Premium Dashboard • Secured Shared Case View</p>
            <p class="text-[10px] text-gray-600 mt-2 uppercase tracking-[0.2em] font-black">Professional Dental Planning Experts</p>
        </footer>
    </div>

    <!-- Premium File Preview Modal (Shared) -->
    <div id="bh-preview-modal" class="fixed inset-0 z-[100] hidden items-center justify-center p-4">
        <div id="bh-modal-backdrop" class="absolute inset-0 bg-black/80 backdrop-blur-md opacity-0 transition-opacity duration-500"></div>
        <div id="bh-modal-container" class="relative w-full flex flex-col bg-[#0c0c0c] rounded-3xl border border-white/10 shadow-2xl overflow-hidden pointer-events-none scale-95 opacity-0 transition-all duration-500 ease-out" style="max-width: 1000px; height: 85vh;">
            <div class="flex items-center justify-between p-5 border-b border-white/5 shrink-0 bg-black/40">
                <div class="flex items-center gap-4 min-w-0">
                    <div class="h-11 w-11 shrink-0 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-amber-500 shadow-inner">
                        <i data-lucide="file-text"></i>
                    </div>
                    <div class="min-w-0">
                        <h3 id="bh-modal-title" class="text-sm font-bold text-white truncate uppercase tracking-widest leading-tight">File Preview</h3>
                        <p id="bh-modal-meta" class="text-[11px] text-slate-400 truncate mt-1"></p>
                    </div>
                </div>
                <div class="flex items-center gap-3 ml-4">
                    <a id="bh-modal-download" href="#" class="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white text-[12px] font-bold text-black hover:bg-amber-400 transition-all duration-300 shadow-lg active:scale-95">
                        <i data-lucide="download" class="w-4 h-4"></i>
                        Download
                    </a>
                    <button id="bh-modal-close" class="h-10 w-10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200">
                        <i data-lucide="x"></i>
                    </button>
                </div>
            </div>
            <div id="bh-modal-content" class="flex-1 min-h-0 overflow-auto bg-black/40 flex items-center justify-center">
                <!-- Content -->
            </div>
        </div>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }

            const modal = document.getElementById('bh-preview-modal');
            const backdrop = document.getElementById('bh-modal-backdrop');
            const container = document.getElementById('bh-modal-container');
            const modalCloseBtn = document.getElementById('bh-modal-close');
            const content = document.getElementById('bh-modal-content');
            const title = document.getElementById('bh-modal-title');
            const meta = document.getElementById('bh-modal-meta');
            const download = document.getElementById('bh-modal-download');

            window.openSharedPreview = function(data) {
                content.innerHTML = '<div class="text-slate-500 text-xs">Loading preview...</div>';
                title.textContent = data.name;
                meta.textContent = data.mime;
                download.href = data.downloadUrl;

                modal.classList.remove('hidden');
                modal.classList.add('flex');
                
                setTimeout(() => {
                    backdrop.classList.add('opacity-100');
                    container.classList.remove('scale-95', 'opacity-0', 'pointer-events-none');
                    container.classList.add('scale-100', 'opacity-100', 'pointer-events-auto');
                }, 10);

                const url = data.url;
                const mime = data.mime || '';

                content.innerHTML = '';
                if (mime.startsWith('image/')) {
                    const img = document.createElement('img');
                    img.src = url;
                    img.className = 'max-w-full max-h-full object-contain';
                    content.appendChild(img);
                } else if (mime === 'application/pdf') {
                    const embed = document.createElement('embed');
                    embed.src = url;
                    embed.type = 'application/pdf';
                    embed.className = 'w-full h-full';
                    content.appendChild(embed);
                } else {
                    content.innerHTML = `
                        <div class="text-center p-8">
                            <i data-lucide="alert-circle" class="w-12 h-12 text-slate-500 mx-auto mb-4"></i>
                            <p class="text-sm text-slate-400">Preview not supported for this file type.</p>
                            <a href="${data.downloadUrl}" class="inline-flex items-center gap-2 px-6 py-2.5 mt-4 rounded-xl bg-amber-400 text-black font-black text-xs hover:bg-white transition-colors">Download to View</a>
                        </div>
                    `;
                    lucide.createIcons();
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

            modalCloseBtn.addEventListener('click', closeModal);
            backdrop.addEventListener('click', closeModal);
            window.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal();
            });
        });
    </script>
    <script>
        setTimeout(() => {
            const csrf = document.querySelector('meta[name="csrf-token"]');
            if (csrf) {
                fetch('{{ route("analytics.track-engagement") }}', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': csrf.getAttribute('content'),
                        'X-Requested-With': 'XMLHttpRequest'
                    },
                    body: JSON.stringify({ path: window.location.pathname })
                }).catch(e => {});
            }
        }, 60000);
    </script>
</body>
</html>
