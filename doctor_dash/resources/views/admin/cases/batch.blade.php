@extends('layouts.admin')

@section('title', 'Case Collection - ' . $title)
@section('header', 'Case Collection')

@section('content')
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="user-id" content="{{ auth()->id() }}">
    
    @if(session('success'))
        <div class="mb-6 bg-green-500/10 border border-green-500/20 rounded-xl p-4">
            <p class="text-green-400 text-sm font-medium">{{ session('success') }}</p>
        </div>
    @endif
    
    <div class="mb-5 flex items-center justify-between px-1">
        <a href="{{ route('admin.cases.index') }}" class="text-sm text-gray-400 hover:text-white flex items-center gap-2 font-medium transition-colors">
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to All Cases
        </a>
    </div>

    @php $firstReport = $reports->first(); @endphp
    <!-- Case Information Card (Redesigned) -->
    <div class="bg-[#111111] rounded-[24px] border border-white/10 p-6 md:p-10 mb-8 shadow-2xl relative overflow-hidden group">
        
        <div class="relative z-10">
            <div class="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
                <div>
                    <h3 class="text-xl font-black text-[#FACC15] tracking-tight uppercase">Case Information</h3>
                    <p class="text-[10px] text-slate-500 tracking-widest mt-1">MAIN DETAILS & CLINICAL CONTEXT</p>
                </div>
                <div class="flex items-center gap-3">
                    <a href="{{ route('admin.cases.downloadBatch', $batch_id) }}" 
                       class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FACC15] border border-[#FACC15] text-[11px] font-black text-black hover:bg-[#FACC15]/90 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-yellow-400/20">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        {{ $reports->count() === 1 ? 'SAVE FILE' : 'SAVE ALL FILES' }}
                    </a>
                </div>
            </div>
            
            <div class="space-y-16">
                <div>
                    <h4 class="text-[12px] font-black text-[#FACC15] uppercase tracking-[0.2em] mb-1">CASE TITLE</h4>
                    <p class="text-white text-2xl font-medium leading-relaxed max-w-4xl whitespace-pre-wrap mb-3">{{ $title }}</p>
                </div>
                
                <div>
                    <h4 class="text-[12px] font-black text-[#FACC15] uppercase tracking-[0.2em] mb-1">DESCRIPTION</h4>
                    @if($firstReport && $firstReport->description)
                        <p class="text-white text-1xl font-medium leading-relaxed max-w-4xl whitespace-pre-wrap mb-3">{{ $firstReport->description }}</p>
                    @else
                        <p class="text-slate-600 italic font-medium mb-10">No description provided for this case.</p>
                    @endif
                </div>

                <div class="py-6 border-t border-white/5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
                    
                  

                  

                    @if($firstReport->implant_brand)
                    <div>
                        <h4 class="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">IMPLANT SYSTEM</h4>
                        <span class="text-white text-xs font-bold uppercase tracking-wider">{{ $firstReport->implant_brand }}</span>
                    </div>
                    @endif

                    @if(isset($firstReport->clinical_data['gender']))
                    <div>
                        <h4 class="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">GENDER</h4>
                        <span class="text-white text-xs font-bold uppercase tracking-wider">{{ $firstReport->clinical_data['gender'] }}</span>
                    </div>
                    @endif

                    @if(isset($firstReport->clinical_data['age']))
                    <div>
                        <h4 class="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">AGE</h4>
                        <span class="text-white text-xs font-bold uppercase tracking-wider">{{ $firstReport->clinical_data['age'] }}</span>
                    </div>
                    @endif

                    @if(!empty($firstReport->clinical_data['services']))
                    <div class="md:col-span-2 lg:col-span-3">
                        <h4 class="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3">SERVICES NEEDED</h4>
                        <div class="flex flex-wrap gap-2">
                            @foreach($firstReport->clinical_data['services'] as $service)
                                <span class="text-[#FACC15] text-[10px] font-black uppercase tracking-widest bg-[#FACC15]/10 px-3 py-1.5 rounded-lg border border-[#FACC15]/20">
                                    {{ $service }}
                                </span>
                            @endforeach
                        </div>
                    </div>
                    @elseif(isset($firstReport->clinical_data['service_package']))
                    <div>
                        <h4 class="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">PACKAGE</h4>
                        <span class="text-[#FACC15] text-xs font-black uppercase tracking-widest bg-[#FACC15]/10 px-3 py-1.5 rounded-lg border border-[#FACC15]/20">
                            {{ str_replace('_', ' ', $firstReport->clinical_data['service_package']) }}
                        </span>
                    </div>
                    @endif

                    @if(isset($firstReport->clinical_data['medical_history']))
                    <div class="md:col-span-2 lg:col-span-4 mt-4 p-4 rounded-xl bg-white/5 border border-white/10">
                        <h4 class="text-[10px] font-black text-[#FACC15] uppercase tracking-[0.2em] mb-3">MEDICAL HISTORY / CONCERNS</h4>
                        <p class="text-white text-sm leading-relaxed">{{ $firstReport->clinical_data['medical_history'] }}</p>
                    </div>
                    @endif

                    <div>
                        <h4 class="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">STATUS</h4>
                        <span class="inline-flex items-center px-6 py-3 rounded-xl text-[11px] font-black border {{ \App\Models\Report::STATUSES[$firstReport->status] ?? 'border-slate-500/30 text-slate-400 bg-transparent' }} shadow-2xl">
                            {{ strtoupper($firstReport->status) }}
                        </span>
                    </div>
                    <div>
                        <h4 class="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">FILES COUNT</h4>
                        <div class="flex items-center gap-3">
                            <span class="text-[#FACC15] text-1xl font-black tracking-tight">{{ $reports->count() }}</span>
                            <span class="text-slate-500 text-[11px] font-bold uppercase tracking-widest">file(s)</span>
                        </div>
                    </div>

                    @if(isset($firstReport->clinical_data['submission_date']))
                    <div>
                        <h4 class="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">SUBMISSION DATE</h4>
                        <span class="text-white text-xs font-bold uppercase tracking-wider">{{ $firstReport->clinical_data['submission_date'] }}</span>
                    </div>
                    @endif

                    @if(!empty($firstReport->clinical_data['dentist_info']['first_name']))
                    <div class="md:col-span-2 lg:col-span-4 mt-6 pt-6 border-t border-white/5 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <h4 class="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">DENTIST NAME</h4>
                            <p class="text-white text-sm font-bold">{{ $firstReport->clinical_data['dentist_info']['first_name'] }} {{ $firstReport->clinical_data['dentist_info']['last_name'] }}</p>
                        </div>
                        <div>
                            <h4 class="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">DENTIST EMAIL</h4>
                            <p class="text-white text-sm font-medium">{{ $firstReport->clinical_data['dentist_info']['email'] }}</p>
                        </div>
                        <div>
                            <h4 class="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">DENTIST PHONE</h4>
                            <p class="text-white text-sm font-medium">{{ $firstReport->clinical_data['dentist_info']['phone'] }}</p>
                        </div>
                    </div>
                    @endif
                </div>
            </div>
        </div>
    </div>

    <!-- Tabbed Interface Container -->
    <div id="case-detail-tabs" class="bg-[#0c0c0c] rounded-[24px] border border-white/5 p-5 md:p-8" style="box-shadow: 0 10px 40px -10px rgba(0,0,0,0.5);">
        <!-- Tab Navigation -->
        <div class="flex gap-2 mb-8 border-b border-white/10 overflow-x-auto no-scrollbar scroll-smooth">
            <style>
                .tab-button.active {
                    color: white;
                    border-bottom-color: #FACC15;
                }
            </style>
            <button data-tab="files" class="tab-button px-6 py-3 text-sm font-bold text-gray-400 hover:text-white transition-colors border-b-2 border-transparent whitespace-nowrap">
                Files
            </button>
            <button data-tab="notes" class="tab-button px-6 py-3 text-sm font-bold text-gray-400 hover:text-white transition-colors border-b-2 border-transparent whitespace-nowrap">
                Case Notes
            </button>
            <button data-tab="chat" class="tab-button px-6 py-3 text-sm font-bold text-gray-400 hover:text-white transition-colors border-b-2 border-transparent whitespace-nowrap relative">
                Client Chat
                <span id="chat-notification-indicator" class="hidden absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
        </div>

        <!-- Files Tab Content -->
        <div data-tab-content="files" class="tab-content hidden">
            <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                <h3 class="text-xl font-bold text-white tracking-tight">Case Files ({{ $reports->count() }})</h3>
                <button type="button" id="toggle-upload-btn" class="group flex items-center gap-4 px-8 py-4 bg-[#FACC15] hover:bg-[#EAB308] rounded-2xl text-black font-black tracking-widest transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(250,204,21,0.2)]">
                    <svg class="w-6 h-6 transition-transform group-hover:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4" />
                    </svg>
                    ADD NEW FILES
                </button>
            </div>

            @php
                $folders = [
                    'case_folder' => ['title' => 'Case Folder', 'icon' => 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z', 'color' => 'text-blue-400'],
                    'doctor_public' => ['title' => 'Admin Public', 'icon' => 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z', 'color' => 'text-[#FACC15]'],
                    'doctor_private' => ['title' => 'Admin Private', 'icon' => 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z', 'color' => 'text-red-400'],
                    'additional_files' => ['title' => 'Additional Files', 'icon' => 'M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z', 'color' => 'text-emerald-400'],
                ];
            @endphp

            @foreach($folders as $type => $info)
                @php 
                    $folderFiles = $reports->filter(function($r) use ($type) {
                        if ($type === 'case_folder') {
                            return $r->folder_type === 'case_folder' || $r->folder_type === 'user' || is_null($r->folder_type);
                        }
                        return $r->folder_type === $type;
                    });
                @endphp
                @if($folderFiles->count() > 0)
                    <div class="mb-4">
                        <!-- Folder Header (Clickable) -->
                        <button type="button" 
                            onclick="window.toggleBHFolders('{{ $type }}')"
                            class="w-full flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#FACC15]/30 transition-all group overflow-hidden relative">
                            <div class="absolute inset-x-0 bottom-0 h-[2px] bg-[#FACC15] transform translate-y-full group-hover:translate-y-0 transition-transform opacity-30"></div>
                            
                            <div class="flex items-center gap-4">
                                <div class="h-12 w-12 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center {{ $info['color'] }} group-hover:scale-110 transition-transform">
                                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="{{ $info['icon'] }}" />
                                    </svg>
                                </div>
                                <div class="text-left">
                                    <h4 class="text-sm font-black text-white uppercase tracking-widest group-hover:text-[#FACC15] transition-colors">{{ $info['title'] }}</h4>
                                    <p class="text-[10px] text-slate-500 font-bold tracking-widest mt-0.5 uppercase">{{ $folderFiles->count() }} FILE(S)</p>
                                </div>
                            </div>

                            <div class="flex items-center gap-4">
                                <span class="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] group-hover:text-slate-400 transition-colors">CLICK TO VIEW</span>
                                <div class="h-8 w-8 rounded-lg bg-white/5 flex items-center justify-center text-slate-500 group-hover:text-white transition-all transform transition-transform duration-300" id="chevron-{{ $type }}">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M19 9l-7 7-7-7"/></svg>
                                </div>
                            </div>
                        </button>

                        <!-- Folder Content -->
                        <div id="folder-content-{{ $type }}" class="hidden overflow-hidden transition-all duration-500 ease-in-out mt-6">
                            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 animate-in fade-in slide-in-from-top-4 duration-500">
                                @foreach ($folderFiles as $report)
                                    <div class="bg-[#111111] rounded-[20px] border border-white/10 p-5 group/card flex flex-col justify-between hover:border-white/20 hover:bg-black/40 transition-all duration-300">
                                        <div class="flex flex-col mb-6">
                                            <div class="flex items-start justify-between mb-2">
                                                <p class="text-sm font-bold text-white leading-tight pr-4 break-words line-clamp-2" title="{{ $report->original_name }}">
                                                    {{ $report->original_name }}
                                                </p>
                                                <div class="flex flex-col items-end gap-1">
                                                    <span class="shrink-0 inline-flex items-center rounded-md bg-[#FACC15]/10 px-2 py-0.5 text-[10px] font-bold text-[#FACC15] border border-[#FACC15]/20 uppercase tracking-widest">
                                                        {{ strtoupper(pathinfo($report->original_name, PATHINFO_EXTENSION)) }}
                                                    </span>
                                                </div>
                                            </div>
                                            <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                                {{ $report->mime_type }} • {{ round($report->size / 1024, 1) }} KB
                                            </p>
                                            <div class="flex items-center justify-between mt-1">
                                                <p class="text-[10px] text-gray-500">
                                                    Uploaded: {{ $report->created_at->format('Y-m-d h:i A') }}
                                                </p>
                                            </div>
                                        </div>

                                        <div class="flex flex-col gap-2">
                                            <div class="flex items-center gap-2">
                                                <button type="button"
                                                    class="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-black border border-white/10 text-[11px] font-bold text-white hover:bg-white/5 transition-colors text-center shadow-sm"
                                                    onclick='window.openBHPreview({
                                                        url: {{ json_encode(route("admin.cases.preview", $report)) }},
                                                        downloadUrl: {{ json_encode(route("admin.cases.download", $report)) }},
                                                        mime: {{ json_encode($report->mime_type) }},
                                                        title: {{ json_encode($title) }},
                                                        name: {{ json_encode($report->original_name) }},
                                                        created: {{ json_encode($report->created_at->format("Y-m-d h:i A")) }}
                                                    })'>
                                                    View File
                                                </button>

                                                <a href="{{ route('admin.cases.download', $report) }}" 
                                                class="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-[#FACC15] border border-[#FACC15] text-[11px] font-black text-black hover:bg-[#FACC15]/90 transition-colors text-center shadow-sm">
                                                    Save File
                                                </a>
                                            </div>
                                            <div class="flex items-center gap-2">
                                                <button type="button" 
                                                    class="rename-file-btn flex-1 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[11px] font-bold text-[#FACC15] hover:bg-[#FACC15]/10 transition-colors flex items-center justify-center gap-1.5"
                                                    data-report-id="{{ $report->id }}"
                                                    data-current-name="{{ $report->original_name }}">
                                                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                                                    Rename
                                                </button>
                                                <button type="button" 
                                                    class="copy-link-btn flex-1 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[11px] font-bold text-white hover:bg-white/10 transition-colors"
                                                    data-report-id="{{ $report->id }}">
                                                    Link
                                                </button>
                                                <form action="{{ route('case.files.destroy', $report) }}" method="POST" onsubmit="return confirm('Are you sure you want to remove this file?')" class="m-0">
                                                    @csrf
                                                    @method('DELETE')
                                                    <button type="submit" class="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all">
                                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                @endforeach
                            </div>
                            <div class="h-12"></div> <!-- Spacer -->
                        </div>
                    </div>
                @endif
            @endforeach

            @if($reports->count() === 0)
                <div class="text-center py-20 bg-[#111111] rounded-[32px] border border-white/5 border-dashed">
                    <p class="text-slate-500 font-bold uppercase tracking-widest text-sm">No files uploaded yet</p>
                </div>
            @endif

            <div id="upload-section-container" class="hidden mt-8 bg-[#111111]/50 rounded-3xl border border-white/5 p-8 animate-fade-in-up">
                <div class="flex items-center justify-between mb-8">
                    <div>
                        <h3 class="text-xl font-black text-white tracking-tight uppercase">Upload New Files</h3>
                        <p class="text-[11px] text-slate-500 font-bold tracking-widest mt-1">THE UPLOAD WILL START AUTOMATICALLY UPON SELECTION</p>
                    </div>
                    <button type="button" id="close-upload-btn" class="p-2 rounded-xl bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white transition-all">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
                    </button>
                </div>

                <form id="ajax-upload-form" action="{{ route('case.files.upload', $batch_id) }}" method="POST" enctype="multipart/form-data" class="space-y-6">
                    @csrf
                    
                    <!-- Folder Selection -->
                    <div class="mb-6">
                        <label class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1 mb-2 block">SELECT DESTINATION FOLDER</label>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <label class="relative flex items-center gap-3 p-4 rounded-2xl bg-black border border-white/10 cursor-pointer hover:border-[#FACC15]/50 transition-all group">
                                <input type="radio" name="folder_type" value="doctor_public" checked class="hidden peer">
                                <div class="w-4 h-4 rounded-full border-2 border-white/20 peer-checked:border-[#FACC15] peer-checked:bg-[#FACC15] flex items-center justify-center transition-all">
                                    <div class="w-1.5 h-1.5 rounded-full bg-black opacity-0 peer-checked:opacity-100 transition-all"></div>
                                </div>
                                <div class="flex-1">
                                    <p class="text-xs font-black text-white uppercase tracking-wider">Admin Public</p>
                                    <p class="text-[9px] text-slate-500 font-bold">SHARED WITH DOCTOR</p>
                                </div>
                            </label>

                            <label class="relative flex items-center gap-3 p-4 rounded-2xl bg-black border border-white/10 cursor-pointer hover:border-red-500/50 transition-all group">
                                <input type="radio" name="folder_type" value="doctor_private" class="hidden peer">
                                <div class="w-4 h-4 rounded-full border-2 border-white/20 peer-checked:border-red-500 peer-checked:bg-red-500 flex items-center justify-center transition-all">
                                    <div class="w-1.5 h-1.5 rounded-full bg-white opacity-0 peer-checked:opacity-100 transition-all"></div>
                                </div>
                                <div class="flex-1">
                                    <p class="text-xs font-black text-white uppercase tracking-wider">Admin Private</p>
                                    <p class="text-[9px] text-slate-500 font-bold">INTERNAL USE ONLY</p>
                                </div>
                            </label>
                        </div>
                    </div>

                    <div class="group relative">
                        <input type="file" name="files[]" id="new_case_files" multiple
                            class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10">
                        <div class="border-2 border-dashed border-white/10 rounded-2xl p-10 flex flex-col items-center justify-center gap-4 group-hover:border-[#FACC15]/30 group-hover:bg-[#FACC15]/5 transition-all">
                            <div class="h-14 w-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-[#FACC15]/20 group-hover:border-[#FACC15]/30 group-hover:scale-110 transition-all">
                                <svg class="w-8 h-8 text-slate-400 group-hover:text-[#FACC15]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                            </div>
                            <div class="text-center">
                                <p class="text-white font-bold tracking-tight">Drop files here or click to upload</p>
                                <p class="text-[11px] text-slate-500 font-bold tracking-widest mt-1 uppercase">SUPPORTED FILES: ANY FORMAT, NO SIZE LIMIT</p>
                            </div>
                        </div>
                    </div>

                    <div id="file-list-preview" class="hidden grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-2xl bg-black/40 border border-white/5">
                        <!-- Preview list will be populated by JS -->
                    </div>

                    <div class="flex justify-end pt-4">
                        <button type="submit" id="submit-upload-btn" class="group flex items-center gap-3 px-8 py-4 bg-[#FACC15] hover:bg-[#EAB308] rounded-2xl text-black font-black tracking-widest transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(250,204,21,0.2)]">
                            <svg class="w-5 h-5 transition-transform group-hover:translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/></svg>
                            SAVE FILES
                        </button>
                    </div>
                </form>
            </div>
        </div>

        <!-- Case Notes Tab Content -->
        <div data-tab-content="notes" class="tab-content hidden">
            <div class="max-w-6xl mx-auto space-y-6">
                <!-- Case Notes Header & List -->
                <div class="bg-[#111111] rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
                    <div class="p-6 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-white/[0.02] to-transparent">
                        <div>
                            <h3 class="text-xl font-black text-white tracking-tight uppercase">Case Notes</h3>
                            <p class="text-[11px] text-slate-500 font-bold tracking-widest mt-1">INTERNAL DOCUMENTATION & TIMELINE</p>
                        </div>
                        <button type="button" onclick="toggleAddNoteForm()"
                            class="px-5 py-2.5 rounded-xl bg-[#FACC15] text-black text-xs font-black hover:bg-[#FACC15]/90 transition-all flex items-center gap-2 shadow-lg shadow-yellow-400/10">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/></svg>
                            ADD NEW NOTE
                        </button>
                    </div>

                    <div class="overflow-x-auto">
                        <table class="w-full text-left border-collapse">
                            <thead>
                                <tr class="bg-white/[0.02]">
                                    <th class="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-white/5">Details</th>
                                    <th class="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-white/5">Subject</th>
                                    <th class="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-white/5">Note Content</th>
                                    <th class="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-white/5 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-white/5">
                                @php
                                    $allNotes = $reports->first()->caseNotes->sortByDesc('created_at');
                                @endphp
                                @forelse($allNotes as $note)
                                    <tr class="hover:bg-white/[0.02] transition-colors group">
                                        <td class="px-6 py-5 align-top w-48">
                                            <div class="flex flex-col gap-1">
                                                <span class="text-xs font-black text-[#FACC15]">{{ $note->user->name }}</span>
                                                <span class="text-[10px] text-slate-500 font-bold">{{ $note->created_at->format('M d, Y') }}</span>
                                                <span class="text-[10px] text-slate-600 font-medium">{{ $note->created_at->format('h:i A') }}</span>
                                            </div>
                                        </td>
                                        <td class="px-6 py-5 align-top w-64">
                                            <span class="text-sm font-bold text-white tracking-tight leading-snug">{{ $note->subject }}</span>
                                        </td>
                                        <td class="px-6 py-5 align-top">
                                            <div class="text-sm text-slate-300 leading-relaxed prose prose-invert prose-sm max-w-none">
                                                {!! $note->message !!}
                                            </div>
                                        </td>
                                        <td class="px-6 py-5 align-top text-right">
                                            <div class="flex items-center justify-end gap-2">
                                                <button type="button" onclick="editNote({{ $note->id }})" class="p-2 rounded-lg bg-blue-500/10 text-blue-500 hover:bg-blue-500 hover:text-white transition-all">
                                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                                                    </svg>
                                                </button>
                                                <form action="{{ route('case.notes.destroy', $note) }}" method="POST" onsubmit="return confirm('Are you sure you want to delete this note?')" class="m-0">
                                                    @csrf
                                                    @method('DELETE')
                                                    <button type="submit" class="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all">
                                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                </form>
                                            </div>
                                        </td>
                                    </tr>
                                @empty
                                    <tr>
                                        <td colspan="4" class="px-6 py-12 text-center">
                                            <div class="flex flex-col items-center gap-3">
                                                <div class="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
                                                    <svg class="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                                                </div>
                                                <p class="text-slate-500 text-sm font-bold tracking-tight">No case notes recorded yet</p>
                                            </div>
                                        </td>
                                    </tr>
                                @endforelse
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Add Note Form -->
                <div id="add-note-section" class="hidden bg-[#111111] rounded-2xl border border-white/10 overflow-hidden shadow-2xl mt-8">
                    <div class="p-6 border-b border-white/10 bg-gradient-to-r from-white/[0.02] to-transparent">
                        <h3 class="text-xl font-black text-white tracking-tight uppercase">Add Case Note</h3>
                        <p class="text-[11px] text-slate-500 font-bold tracking-widest mt-1">RECORD IMPORTANT UPDATES OR INSTRUCTIONS</p>
                    </div>

                    <form action="{{ route('case.notes.store', $batch_id) }}" method="POST" class="p-6 space-y-6">
                        @csrf
                        <div class="space-y-2">
                            <label for="subject" class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Subject / Title</label>
                            <input type="text" name="subject" id="subject" required placeholder="e.g., Clinical instruction for printing"
                                class="w-full px-5 py-4 bg-black border border-white/10 rounded-2xl text-white text-sm font-bold placeholder-slate-600 focus:outline-none focus:border-[#FACC15] transition-all shadow-inner">
                        </div>

                        <div class="space-y-2">
                            <label for="editor" class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Detailed Message</label>
                            <div class="rounded-2xl overflow-hidden border border-white/10 bg-black shadow-inner">
                                <textarea name="message" id="editor"></textarea>
                            </div>
                        </div>

                        <div class="flex justify-end pt-4">
                            <button type="submit" id="save-note-btn"
                                class="px-10 py-4 rounded-2xl bg-[#FACC15] border border-[#FACC15] text-sm font-black text-black hover:bg-[#FACC15]/90 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-yellow-400/20 flex items-center justify-center gap-2">
                                <span class="btn-text">SAVE CASE NOTE</span>
                                <div class="loading-spinner hidden">
                                    <svg class="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                </div>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <!-- styles for CKEditor dark mode -->
        <style>
            .ck-editor__edged { border: none !important; }
            .ck-editor__main > .ck-editor__editable {
                background: #000 !important;
                color: #fff !important;
                border: none !important;
                min-height: 200px;
                padding: 1.5rem !important;
                font-size: 14px !important;
            }
            .ck.ck-toolbar {
                background: #0c0c0c !important;
                border: none !important;
                border-bottom: 1px solid rgba(255,255,255,0.1) !important;
                padding: 0.5rem !important;
            }
            .ck.ck-button {
                color: #fff !important;
                cursor: pointer !important;
            }
            .ck.ck-button:hover {
                background: rgba(255,255,255,0.05) !important;
            }
            .ck.ck-button.ck-on {
                background: #FACC15 !important;
                color: #000 !important;
            }
            .ck.ck-toolbar__separator {
                background: rgba(255,255,255,0.1) !important;
            }
            .ck.ck-reset_all * {
                color: #fff !important;
            }
            .ck.ck-dropdown__panel {
                background: #0c0c0c !important;
                border: 1px solid rgba(255,255,255,0.1) !important;
            }
            .ck.ck-list {
                background: #0c0c0c !important;
            }
            .ck.ck-list__item:hover {
                background: rgba(255,255,255,0.05) !important;
            }
        </style>
        <script src="https://cdn.ckeditor.com/ckeditor5/41.1.0/classic/ckeditor.js"></script>
        <script>
            let editorInstance;
            ClassicEditor
                .create(document.querySelector('#editor'), {
                    toolbar: ['heading', '|', 'bold', 'italic', 'bulletedList', 'numberedList', 'blockQuote', 'insertTable', 'undo', 'redo'],
                    heading: {
                        options: [
                            { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                            { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                            { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' }
                        ]
                    }
                })
                .then(editor => {
                    window.editorInstance = editor;
                    const form = document.querySelector('#add-note-section form');
                    if (form) {
                        form.addEventListener('submit', () => {
                            editor.updateSourceElement();
                        });
                    }
                    editor.model.document.on('change:data', () => {
                        document.querySelector('#editor').value = editor.getData();
                    });
                })
                .catch(error => {
                    console.error(error);
                });

            function toggleAddNoteForm() {
                const addNoteSection = document.getElementById('add-note-section');
                const form = addNoteSection.querySelector('form');
                const title = addNoteSection.querySelector('h3');
                const submitBtn = addNoteSection.querySelector('button[type="submit"]');

                if (addNoteSection.classList.contains('hidden')) {
                    // Reset form for fresh note
                    form.reset();
                    if (editorInstance) editorInstance.setData('');
                    form.action = `{{ route('case.notes.store', $batch_id) }}`;
                    title.textContent = 'Add Case Note';
                    submitBtn.textContent = 'SAVE CASE NOTE';
                    
                    const methodInput = form.querySelector('input[name="_method"]');
                    if (methodInput) methodInput.remove();

                    addNoteSection.classList.remove('hidden');
                    addNoteSection.scrollIntoView({behavior: 'smooth'});
                } else {
                    addNoteSection.classList.add('hidden');
                }
            }

            function editNote(noteId) {
                const addNoteSection = document.getElementById('add-note-section');
                const form = addNoteSection.querySelector('form');
                const title = addNoteSection.querySelector('h3');
                const submitBtn = addNoteSection.querySelector('button[type="submit"]');

                fetch(`/case-notes/${noteId}/edit`)
                    .then(response => response.json())
                    .then(data => {
                        document.getElementById('subject').value = data.subject;
                        if (editorInstance) {
                            editorInstance.setData(data.message);
                        }
                        
                        form.action = `/case-notes/${noteId}`;
                        title.textContent = 'Edit Case Note';
                        submitBtn.textContent = 'UPDATE CASE NOTE';
                        
                        addNoteSection.classList.remove('hidden');
                        
                        if (!form.querySelector('input[name="_method"]')) {
                            const methodInput = document.createElement('input');
                            methodInput.type = 'hidden';
                            methodInput.name = '_method';
                            methodInput.value = 'PUT';
                            form.appendChild(methodInput);
                        }
                        
                        addNoteSection.scrollIntoView({behavior: 'smooth'});
                    })
                    .catch(error => {
                        console.error('Failed to load note:', error);
                        window.showToast?.('Failed to load note for editing', 'error');
                    });
            }
        </script>

        <!-- Client Chat Tab Content -->
        <div data-tab-content="chat" class="tab-content hidden">
            <div class="max-w-5xl mx-auto">
                <div class="flex flex-col h-[600px] md:h-[750px] bg-[#0c0c0c] rounded-[32px] border border-white/10 shadow-2xl overflow-hidden relative">
                    <!-- Background Decor -->
                    <div class="absolute inset-0 opacity-[0.03] pointer-events-none" style="background-image: url('https://www.transparenttextures.com/patterns/cubes.png');"></div>
                    
                    <!-- Chat Header -->
                    <div class="p-5 border-b border-white/10 bg-[#111111]/80 backdrop-blur-md flex items-center justify-between z-10">
                        <div class="flex items-center gap-4">
                            <div class="w-12 h-12 rounded-2xl bg-[#FACC15] flex items-center justify-center text-black shadow-lg shadow-yellow-400/20">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                            </div>
                            <div>
                                <h3 class="text-lg font-black text-white tracking-tight uppercase">Client Talk</h3>
                                <div class="flex items-center gap-2">
                                    <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                    <p class="text-[10px] text-slate-500 font-bold tracking-widest uppercase">Direct line with Case Owner</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Messages Container -->
                    <div id="case-chat-messages" class="flex-1 overflow-y-auto p-6 space-y-4 relative z-10 flex flex-col no-scrollbar" style="scroll-behavior: smooth;">
                        <!-- Messages will be loaded here by JavaScript -->
                    </div>

                    <!-- Message Input Form -->
                    <div class="p-6 bg-[#0c0c0c] border-t border-white/5 z-10">
                        <div id="case-chat-file-preview" class="mb-4 hidden animate-in slide-in-from-bottom-2 duration-300">
                            <!-- Preview items will go here -->
                        </div>
                        
                        <form id="case-chat-form" class="flex items-end gap-4">
                            <input type="file" id="case-chat-file" class="hidden" multiple>
                            
                            <div class="chat-input-wrapper flex-1 group">
                                <button type="button" id="case-chat-attach-btn" class="p-3 rounded-full text-slate-400 hover:text-[#FACC15] hover:bg-white/5 transition-all">
                                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"/>
                                    </svg>
                                </button>
                                
                                <textarea 
                                    id="case-chat-input" 
                                    placeholder="Type your clinical notes or message..." 
                                    rows="1"
                                    class="flex-1 bg-transparent border-none text-white text-sm font-bold placeholder-slate-600 focus:ring-0 focus:outline-none py-3 h-auto max-h-32 resize-none"
                                    oninput="this.style.height = ''; this.style.height = this.scrollHeight + 'px'"
                                ></textarea>
                            </div>

                            <button type="submit" class="w-12 h-12 flex items-center justify-center rounded-full bg-[#FACC15] text-black hover:bg-[#EAB308] transition-all shadow-lg active:scale-95 group">
                                <svg class="w-6 h-6 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                                </svg>
                            </button>
                        </form>
                    </div>
                </div>

                <!-- Chat Lightbox -->
                <div id="chat-lightbox" class="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center hidden opacity-0 transition-opacity duration-300">
                    <button id="close-lightbox" class="absolute top-6 right-6 text-white/50 hover:text-white transition-colors p-2">
                        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                    </button>
                    <div class="max-w-[90vw] max-h-[90vh] relative group">
                        <img id="lightbox-img" src="" class="max-w-full max-h-[90vh] object-contain rounded-lg">
                        <p id="lightbox-caption" class="text-white/70 text-sm mt-4 text-center font-medium"></p>
                    </div>
                </div>                <style>
                    /* Upload Progress & WhatsApp Styles */
                    #case-chat-messages {
                        background-color: #0c0c0c;
                    }

                    .message-bubble {
                        position: relative;
                        max-width: 75%;
                        padding: 12px 16px;
                        border-radius: 20px;
                        margin-bottom: 8px;
                        box-shadow: 0 4px 15px -3px rgba(0, 0, 0, 0.4);
                        min-width: 100px;
                        z-index: 5;
                    }

                    .message-self {
                        background-color: #FACC15;
                        color: #000000;
                        align-self: flex-end;
                        border-bottom-right-radius: 4px;
                    }

                    .message-other {
                        background-color: #111111;
                        color: #e9edef;
                        align-self: flex-start;
                        border-bottom-left-radius: 4px;
                        border: 1px solid rgba(255,255,255,0.08);
                    }

                    .message-tail-self, .message-tail-other { display: none; } /* Using smoother rounded corners instead of tails */

                    .message-info {
                        display: flex;
                        justify-content: flex-end;
                        align-items: center;
                        gap: 4px;
                        margin-top: 4px;
                        font-size: 10px;
                        color: rgba(0, 0, 0, 0.4);
                        font-weight: 600;
                    }

                    .message-other .message-info {
                        color: rgba(233, 237, 239, 0.4);
                    }

                    .loading-spinner-whatsapp {
                        display: inline-block;
                        width: 24px;
                        height: 24px;
                        border: 2px solid rgba(255, 255, 255, 0.2);
                        border-radius: 50%;
                        border-top-color: #fff;
                        animation: spin 1s ease-in-out infinite;
                    }

                    .progress-overlay-whatsapp {
                        position: absolute;
                        inset: 0;
                        background: rgba(0, 0, 0, 0.5);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        backdrop-filter: blur(1px);
                        z-index: 20;
                    }

                    #case-chat-messages::-webkit-scrollbar { width: 6px; }
                    #case-chat-messages::-webkit-scrollbar-track { background: transparent; }
                    #case-chat-messages::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
                    #case-chat-messages::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }

                    .chat-image-preview {
                        cursor: pointer;
                        transition: filter 0.2s;
                    }
                    .chat-image-preview:hover {
                        filter: brightness(0.9);
                    }
                    
                    #case-chat-file-preview {
                        overflow-x: auto;
                    }
                    #case-chat-file-preview::-webkit-scrollbar { height: 4px; }
                    #case-chat-file-preview .preview-item {
                        flex: 0 0 auto;
                        width: 220px;
                    }

                    /* Input area redesign */
                    .chat-input-wrapper {
                        background: #111111;
                        border-radius: 20px;
                        padding: 4px 12px;
                        display: flex;
                        align-items: center;
                        gap: 8px;
                        border: 1px solid rgba(255,255,255,0.05);
                        transition: border-color 0.2s;
                    }
                    .chat-input-wrapper:focus-within {
                        border-color: rgba(250, 204, 21, 0.3);
                    }
                </style>
            </div>
        </div>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            try {
                // Initialize CaseDetailTabs
                window.caseDetailTabs = new CaseDetailTabs('case-detail-tabs', 'files');
            } catch (e) { console.error('Tabs init error:', e); }
            
            try {
                // Initialize CaseFileUpload
                window.caseFileUpload = new CaseFileUpload('case-file-upload-form', '{{ $batch_id }}');
            } catch (e) { console.error('File upload init error:', e); }
            
            try {
                console.log('Main Init: Starting CaseChatManager');
                window.caseChatManager = new CaseChatManager(
                    '{{ $batch_id }}',
                    '{{ route('case.chat.messages', $batch_id) }}',
                    '{{ route('case.chat.send', $batch_id) }}'
                );
            } catch (e) { console.error('Chat manager init error:', e); }

            // Handle Copy Case Link button
            const copyCaseLinkBtn = document.getElementById('copy-case-link-btn');
            if (copyCaseLinkBtn) {
                copyCaseLinkBtn.addEventListener('click', async function() {
                    try {
                        const response = await fetch('{{ route('reports.batch.generate-link', ['batchId' => $batch_id]) }}', {
                            method: 'POST',
                            headers: {
                                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                                'Content-Type': 'application/json',
                                'Accept': 'application/json'
                            }
                        });
                        const data = await response.json();
                        if (data.url) {
                            const success = await window.copyToClipboard(data.url);
                            if (success) {
                                window.showToast('Collection link copied to clipboard');
                            } else {
                                window.showToast('Copied to clipboard, but your browser might restricted it. Please copy manually: ' + data.url, 'error');
                            }
                        }
                    } catch (error) {
                        window.showToast('Failed to generate collection link', 'error');
                    }
                });
            }

            // Note Form Toggle
            window.toggleAddNoteForm = function() {
                const section = document.getElementById('add-note-section');
                if (section.classList.contains('hidden')) {
                    section.classList.remove('hidden');
                    section.scrollIntoView({ behavior: 'smooth' });
                } else {
                    section.classList.add('hidden');
                }
            };

            // Global modal state
            let currentRenameReportId = null;

            // Handle Rename button clicks
            document.querySelectorAll('.rename-file-btn').forEach(button => {
                button.addEventListener('click', function() {
                    currentRenameReportId = this.dataset.reportId;
                    const currentName = this.dataset.currentName;
                    
                    // Remove extension from name for easier editing
                    const nameParts = currentName.split('.');
                    const nameWithoutExt = nameParts.length > 1 ? nameParts.slice(0, -1).join('.') : currentName;
                    
                    document.getElementById('rename-input').value = nameWithoutExt;
                    document.getElementById('rename-modal').classList.remove('hidden');
                    document.getElementById('rename-input').focus();
                });
            });

            // Handle Rename Modal Actions
            const renameModal = document.getElementById('rename-modal');
            if (renameModal) {
                renameModal.querySelector('.cancel-rename').onclick = () => {
                    renameModal.classList.add('hidden');
                    currentRenameReportId = null;
                };

                renameModal.querySelector('.confirm-rename').onclick = async () => {
                    const newName = document.getElementById('rename-input').value.trim();
                    if (!newName || !currentRenameReportId) return;

                    try {
                        const response = await fetch(`/case-files/${currentRenameReportId}/rename`, {
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/json',
                                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                                'Accept': 'application/json'
                            },
                            body: JSON.stringify({ name: newName })
                        });
                        
                        const data = await response.json();
                        if (data.success) {
                            window.showToast('File renamed successfully');
                            setTimeout(() => window.location.reload(), 800);
                        } else {
                            window.showToast(data.message || 'Rename failed', 'error');
                        }
                    } catch (error) {
                        window.showToast('Failed to rename file', 'error');
                    }
                };
            }

            // Handle Copy Link buttons for individual files
            document.querySelectorAll('.copy-link-btn').forEach(button => {
                button.addEventListener('click', async function() {
                    const reportId = this.dataset.reportId;
                    try {
                        const response = await fetch(`/reports/${reportId}/generate-link`, {
                            method: 'POST',
                            headers: {
                                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                                'Content-Type': 'application/json',
                                'Accept': 'application/json'
                            }
                        });
                        const data = await response.json();
                        if (data.url) {
                            const success = await window.copyToClipboard(data.url);
                            if (success) {
                                window.showToast('File link copied to clipboard');
                            } else {
                                window.showToast('Failed to copy. URL: ' + data.url, 'error');
                            }
                        }
                    } catch (error) {
                        window.showToast('Failed to generate link', 'error');
                    }
                });
            });

            // UI Toggle Logic
            const toggleBtn = document.getElementById('toggle-upload-btn');
            const closeBtn = document.getElementById('close-upload-btn');
            const container = document.getElementById('upload-section-container');

            if (toggleBtn && container) {
                toggleBtn.addEventListener('click', () => {
                    container.classList.remove('hidden');
                    toggleBtn.parentElement.classList.add('hidden');
                    
                    // Smooth scroll to the upload section
                    setTimeout(() => {
                        container.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 50);
                });
            }

            if (closeBtn && container) {
                closeBtn.addEventListener('click', () => {
                    container.classList.add('hidden');
                    toggleBtn.parentElement.classList.remove('hidden');
                });
            }

            // Handle New Files Preview with Appending & Manual Upload
            const newFilesInput = document.getElementById('new_case_files');
            const fileListPreview = document.getElementById('file-list-preview');
            const uploadForm = document.getElementById('ajax-upload-form');
            const submitBtn = document.getElementById('submit-upload-btn');
            let selectedFiles = [];

            const renderPreview = () => {
                fileListPreview.innerHTML = '';
                if (selectedFiles.length > 0) {
                    fileListPreview.classList.remove('hidden');
                    selectedFiles.forEach((file, index) => {
                        const extension = file.name.split('.').pop().toUpperCase();
                        const div = document.createElement('div');
                        div.className = 'bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col gap-3 relative overflow-hidden group/item';
                        div.innerHTML = `
                            <div class="flex items-center gap-3">
                                <div class="h-10 w-10 rounded-xl bg-[#FACC15]/10 flex items-center justify-center text-[#FACC15] border border-[#FACC15]/20 text-[11px] font-black italic">
                                    ${extension}
                                </div>
                                <div class="flex-1 min-w-0">
                                    <p class="text-[11px] font-bold text-white truncate">${file.name}</p>
                                    <p class="text-[9px] text-slate-500 font-bold tracking-widest uppercase">${(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                                </div>
                                <button type="button" class="remove-pending-file p-1.5 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover/item:opacity-100" data-index="${index}">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>

                            <div class="space-y-1.5">
                                <label class="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Rename To (Optional)</label>
                                <input type="text" 
                                    class="custom-file-name-input w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-[11px] text-white font-bold focus:border-[#FACC15] outline-none transition-all placeholder:text-slate-700" 
                                    placeholder="Enter filename..."
                                    value="${file.customName || ''}"
                                    data-index="${index}">
                            </div>

                            <div id="progress-container-${index}" class="w-full h-1 bg-white/5 rounded-full overflow-hidden mt-1">
                                <div id="progress-bar-${index}" class="h-full bg-[#FACC15] w-0 transition-all duration-300"></div>
                            </div>
                        `;
                        fileListPreview.appendChild(div);
                    });

                    // Sync custom names back to state
                    document.querySelectorAll('.custom-file-name-input').forEach(input => {
                        input.oninput = (e) => {
                            const idx = parseInt(e.target.dataset.index);
                            selectedFiles[idx].customName = e.target.value;
                        };
                    });

                    // Add click listeners to remove buttons
                    document.querySelectorAll('.remove-pending-file').forEach(btn => {
                        btn.onclick = (e) => {
                            const idx = parseInt(e.currentTarget.dataset.index);
                            selectedFiles.splice(idx, 1);
                            renderPreview();
                        };
                    });
                } else {
                    fileListPreview.classList.add('hidden');
                }
            };

            if (newFilesInput && fileListPreview) {
                newFilesInput.addEventListener('change', function() {
                    const newFiles = Array.from(this.files);
                    selectedFiles = [...selectedFiles, ...newFiles];
                    this.value = '';
                    renderPreview();
                });
            }

            // 5. Case Note Functions
            window.toggleAddNoteForm = function() {
                const section = document.getElementById('add-note-section');
                if (section) {
                    section.classList.toggle('hidden');
                    if (!section.classList.contains('hidden')) {
                        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        document.getElementById('subject').focus();
                    }
                }
            };

            const noteForm = document.querySelector('#add-note-section form');
            if (noteForm) {
                noteForm.addEventListener('submit', function(e) {
                    // CkEditor validation
                    // Sync editor data before validation
                    if (window.editorInstance) {
                        window.editorInstance.updateSourceElement();
                    }
                    
                    const editorData = window.editorInstance ? window.editorInstance.getData() : '';
                    if (!editorData.trim() || editorData === '<p>&nbsp;</p>') {
                        e.preventDefault();
                        if (window.showToast) {
                            window.showToast('Please enter a message for the case note.', 'error');
                        } else {
                            alert('Please enter a message for the case note.');
                        }
                        return;
                    }

                    const btn = document.getElementById('save-note-btn');
                    if (btn) {
                        btn.disabled = true;
                        btn.querySelector('.btn-text').textContent = 'SAVING...';
                        btn.querySelector('.loading-spinner').classList.remove('hidden');
                    }
                });
            }

            // AJAX Upload Logic (Manual)
            if (uploadForm) {
                uploadForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    if (!selectedFiles.length) return;

                    const formData = new FormData();
                    selectedFiles.forEach((file, i) => {
                        formData.append('files[]', file);
                        formData.append('custom_names[]', file.customName || '');
                    });

                    // Add folder type
                    const folderType = document.querySelector('input[name="folder_type"]:checked')?.value || 'doctor_public';
                    formData.append('folder_type', folderType);

                    const xhr = new XMLHttpRequest();
                    const originalBtnContent = submitBtn.innerHTML;

                    // Update button content
                    submitBtn.innerHTML = `
                        <svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        UPLOADING...
                    `;

                    xhr.upload.addEventListener('progress', function(e) {
                        if (e.lengthComputable) {
                            const percent = (e.loaded / e.total) * 100;
                            selectedFiles.forEach((_, i) => {
                                const bar = document.getElementById(`progress-bar-${i}`);
                                if (bar) bar.style.width = percent + '%';
                            });
                            submitBtn.innerHTML = `
                                <svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                UPLOADING ${Math.round(percent)}%
                            `;
                        }
                    });

                    xhr.addEventListener('load', function() {
                        if (xhr.status >= 200 && xhr.status < 300) {
                            window.showToast('Files uploaded successfully!');
                            setTimeout(() => window.location.reload(), 1000);
                        } else {
                            window.showToast('Upload failed. Please try again.', 'error');
                            submitBtn.innerHTML = originalBtnContent;
                            submitBtn.disabled = false;
                        }
                    });

                    xhr.addEventListener('error', function() {
                        window.showToast('Upload failed. Network error.', 'error');
                        submitBtn.innerHTML = originalBtnContent;
                        submitBtn.disabled = false;
                    });

                    xhr.open('POST', uploadForm.action);
                    xhr.setRequestHeader('X-CSRF-TOKEN', document.querySelector('meta[name="csrf-token"]').content);
                    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
                    xhr.send(formData);
                    submitBtn.disabled = true;
                });
            }
            // 6. Folder Toggle Logic
            window.toggleBHFolders = function(type) {
                const content = document.getElementById(`folder-content-${type}`);
                const chevron = document.getElementById(`chevron-${type}`);
                
                if (!content) return;

                const isHidden = content.classList.contains('hidden');
                
                // Toggle this folder
                if (isHidden) {
                    content.classList.remove('hidden');
                    if (chevron) chevron.classList.add('rotate-180');
                    
                    // Optional: Smoothly scroll to the folder
                    setTimeout(() => {
                        content.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    }, 50);
                } else {
                    content.classList.add('hidden');
                    if (chevron) chevron.classList.remove('rotate-180');
                }
            };
        });
    </script>
    <!-- Rename Modal Template -->
    <div id="rename-modal" class="hidden fixed inset-0 z-[10000] flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-black/80 backdrop-blur-sm cancel-rename"></div>
        <div class="relative bg-[#111111] rounded-[24px] border border-white/10 p-8 max-w-md w-full shadow-2xl animate-in fade-in zoom-in duration-200">
            <h4 class="text-xl font-black text-white mb-2 uppercase tracking-tight">Rename File</h4>
            <p class="text-[11px] text-slate-500 font-bold tracking-widest uppercase mb-6">EXTENSION WILL BE PRESERVED AUTOMATICALLY</p>
            
            <div class="space-y-4">
                <div class="space-y-2">
                    <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">NEW FILENAME</label>
                    <input type="text" id="rename-input" class="w-full px-5 py-4 bg-black border border-white/10 rounded-2xl text-white font-bold focus:border-[#FACC15] focus:outline-none transition-all shadow-inner">
                </div>

                <div class="flex gap-3 justify-end pt-4">
                    <button type="button" class="cancel-rename px-6 py-3 rounded-xl bg-white/5 text-white text-[11px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">Cancel</button>
                    <button type="button" class="confirm-rename px-6 py-3 rounded-xl bg-[#FACC15] text-black text-[11px] font-black uppercase tracking-widest hover:bg-[#FACC15]/90 transition-all shadow-lg shadow-yellow-400/20">SAVE CHANGES</button>
                </div>
            </div>
        </div>
    </div>
@endsection
