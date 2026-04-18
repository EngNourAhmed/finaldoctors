@extends('layouts.admin')

@section('title', 'Submit a Case')
@section('header', 'Submit a New Case')

@section('content')
    <div class="w-full mx-auto pb-20">
        <div class="rounded-3xl bg-[#0c0c0c] border border-white/10 p-10 text-sm bh-page-animate shadow-2xl relative overflow-hidden">
            <!-- Decorative Background Element -->
            <div class="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-[#FACC15] opacity-[0.03] rounded-full blur-3xl pointer-events-none"></div>
            
            <div class="flex items-center justify-between mb-8 relative">
                <div class="flex items-center gap-4">
                    <a href="{{ session('last_case_batch_id') ? route('admin.cases.batch', session('last_case_batch_id')) : route('admin.cases.index') }}" class="group flex items-center justify-center h-12 w-12 rounded-2xl bg-white/5 border border-white/10 hover:border-[#FACC15] hover:bg-white/10 transition-all shadow-lg" title="Back to Case Details">
                        <svg class="w-6 h-6 text-white/60 group-hover:text-[#FACC15] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                    </a>
                    <div>
                        <h2 class="text-2xl font-black text-white tracking-tight">
                             @if(request('type') === 'full_arch')
                                Submit Full Arch Case
                            @elseif(request('type') === 'single_implant')
                                Submit Single Implant Case
                            @else
                                Submit a New Case
                            @endif
                        </h2>
                        <p class="text-[11px] text-[#FACC15] font-black uppercase tracking-[0.3em] mt-1 opacity-80">Premium Surgical Planning Center</p>
                    </div>
                </div>
            </div>

            @if ($errors->any())
                <div class="mb-8 rounded-2xl border border-red-500/30 bg-red-950/50 px-6 py-5 text-sm text-red-100 shadow-xl bh-page-animate">
                    <div class="flex items-center gap-3 mb-3">
                        <div class="h-8 w-8 rounded-full bg-red-500/20 flex items-center justify-center">
                            <svg class="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                        </div>
                        <span class="font-black uppercase tracking-widest text-xs">Correction Required</span>
                    </div>
                    <ul class="list-disc list-inside space-y-1.5 ml-11 opacity-90">
                        @foreach ($errors->all() as $error)
                            <li class="font-bold">{{ $error }}</li>
                        @endforeach
                    </ul>
                </div>
            @endif

            <form id="bh-upload-case-form" action="{{ route('admin.cases.store') }}" method="POST" enctype="multipart/form-data" class="space-y-8">
                @csrf
                
                <!-- SECTION 1: GENERAL INFORMATION -->
                <div class="space-y-4">
                    <div class="flex items-center gap-4">
                        <div class="h-8 w-8 rounded-xl bg-[#FACC15]/10 flex items-center justify-center border border-[#FACC15]/20">
                            <span class="text-[#FACC15] font-black text-xs">01</span>
                        </div>
                        <h3 class="text-sm font-black uppercase tracking-[0.2em] text-white">General Information</h3>
                        <div class="flex-1 h-px bg-white/5"></div>
                    </div>
                    
                    <div class="grid grid-cols-1 gap-4 px-2">
                        <!-- Hidden Case Category Auto-Selected -->
                        <input type="hidden" id="case_type" name="case_type" value="{{ request('type', 'full_arch') }}">
                        <input type="hidden" name="reply_to" value="{{ request('reply_to') }}">
                        <!-- Select Doctor (Always visible to associate case) -->
                        <div class="space-y-2">
                            <label for="user_id" class="block text-[10px] font-black uppercase tracking-widest text-[#FACC15]">
                                Select Assistant Account <span class="text-red-500">*</span>
                            </label>
                            <select id="user_id" name="user_id" required onchange="handleDoctorChange(this)"
                                class="w-full rounded-xl border border-white/5 bg-black px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#FACC15] focus:border-[#FACC15] transition-all appearance-none cursor-pointer focus:bg-black/95">
                                <option value="">Choose a registered assistant...</option>
                                @foreach($doctors as $doctor)
                                    <option value="{{ $doctor->id }}" 
                                        data-email="{{ $doctor->email }}" 
                                        data-phone="{{ $doctor->phone }}" 
                                        data-address="{{ $doctor->address }}"
                                        {{ (isset($selectedUserId) && $selectedUserId == $doctor->id) ? 'selected' : '' }}>
                                        {{ $doctor->name }}
                                    </option>
                                @endforeach
                            </select>
                        </div>
                    </div>

                    <!-- STANDARD GENERAL FIELDS -->
                    <div id="standard-general-fields" class="grid grid-cols-1 md:grid-cols-2 gap-6 px-2 {{ in_array(request('type', 'full_arch'), ['full_arch', 'single_implant']) ? 'hidden' : '' }}">
                        <!-- Pre-filled Doctor Data -->
                        <div class="space-y-2">
                            <label class="block text-[10px] font-black uppercase tracking-widest text-white/40">Doctor Email</label>
                            <input type="email" id="doctor-email" name="email" readonly placeholder="Auto-populated"
                                class="w-full rounded-xl border border-white/5 bg-white/5 px-4 py-4 text-sm text-white/60 focus:outline-none opacity-80">
                        </div>
                        <div class="space-y-2">
                            <label class="block text-[10px] font-black uppercase tracking-widest text-white/40">Doctor Phone</label>
                            <input type="text" id="doctor-phone" name="phone" readonly placeholder="Auto-populated"
                                class="w-full rounded-xl border border-white/5 bg-white/5 px-4 py-4 text-sm text-white/60 focus:outline-none opacity-80">
                        </div>

                        <!-- Office Address -->
                        <div class="md:col-span-2 space-y-2">
                            <label class="block text-[10px] font-black uppercase tracking-widest text-white/40">Dentist Office Address</label>
                            <input type="text" id="doctor-address" name="address" placeholder="Enter dentist office address"
                                class="w-full rounded-xl border border-white/5 bg-white/5 px-4 py-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#FACC15] transition-all focus:bg-white/10">
                        </div>

                        <!-- Patient Name -->
                        <div class="md:col-span-2 space-y-2">
                            <label for="title" class="block text-[10px] font-black uppercase tracking-widest text-[#FACC15]">
                                Patient Name <span class="text-red-500">*</span>
                            </label>
                            <input id="title" name="title" type="text" value="{{ old('title') }}"
                                placeholder="Enter patient's full name"
                                class="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-[#FACC15] focus:border-[#FACC15] transition-all focus:bg-white/10 font-bold">
                        </div>
                    </div>

                    <!-- EXTENDED GENERAL FIELDS (For Full Arch & Single Implant) -->
                    <div id="full-arch-general-fields" class="space-y-4 px-2 {{ in_array(request('type', 'full_arch'), ['full_arch', 'single_implant']) ? '' : 'hidden' }}">
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <!-- Doctor's Name -->
                            <div class="space-y-2">
                                <label class="block text-sm font-black text-white">Doctor's Name <span class="text-red-500">*</span></label>
                                <div class="grid grid-cols-2 gap-4">
                                    <div>
                                        <input type="text" name="doctor_first_name" placeholder="First Name" class="w-full rounded border border-white/20 bg-transparent px-3 py-2 text-sm text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all">
                                        <span class="text-[10px] text-gray-400 mt-1 block">First Name</span>
                                    </div>
                                    <div>
                                        <input type="text" name="doctor_last_name" placeholder="Last Name" class="w-full rounded border border-white/20 bg-transparent px-3 py-2 text-sm text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all">
                                        <span class="text-[10px] text-gray-400 mt-1 block">Last Name</span>
                                    </div>
                                </div>
                            </div>
                            <div class="hidden md:block"></div> <!-- Empty column for spacing similar to screenshot -->

                            <!-- Doctor's Email & Phone -->
                            <div class="space-y-2">
                                <label class="block text-sm font-black text-white">Doctor's e-mail <span class="text-red-500">*</span></label>
                                <input type="email" name="doctor_email_full_arch" placeholder="example@example.com" class="w-full rounded border border-white/20 bg-transparent px-3 py-2 text-sm text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all">
                                <span class="text-[10px] text-gray-400 mt-1 block">example@example.com</span>
                            </div>
                            <div class="space-y-2">
                                <label class="block text-sm font-black text-white">Doctor's Phone Number <span class="text-red-500">*</span></label>
                                <input type="text" name="doctor_phone_full_arch" placeholder="(000) 000-0000" class="w-full rounded border border-white/20 bg-transparent px-3 py-2 text-sm text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all">
                                <span class="text-[10px] text-gray-400 mt-1 block">Please enter a valid phone number.</span>
                            </div>

                            <!-- Dentist Office Address -->
                            <div class="md:col-span-2 space-y-2">
                                <label class="block text-sm font-black text-white">Dentist Office Address <span class="text-red-500">*</span></label>
                                <div class="space-y-4 w-full">
                                    <div>
                                        <input type="text" name="address_street" class="w-full rounded border border-white/20 bg-transparent px-3 py-2 text-sm text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all">
                                        <span class="text-[10px] text-gray-400 mt-1 block">Street Address</span>
                                    </div>
                                    <div class="grid grid-cols-2 gap-4">
                                        <div>
                                            <input type="text" name="address_city" class="w-full rounded border border-white/20 bg-transparent px-3 py-2 text-sm text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all">
                                            <span class="text-[10px] text-gray-400 mt-1 block">City</span>
                                        </div>
                                        <div>
                                            <input type="text" name="address_state" class="w-full rounded border border-white/20 bg-transparent px-3 py-2 text-sm text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all">
                                            <span class="text-[10px] text-gray-400 mt-1 block">State</span>
                                        </div>
                                    </div>
                                    <div class="grid grid-cols-2 gap-4">
                                        <div>
                                            <input type="text" name="address_zip" class="w-full rounded border border-white/20 bg-transparent px-3 py-2 text-sm text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all">
                                            <span class="text-[10px] text-gray-400 mt-1 block">Zip Code</span>
                                        </div>
                                        <div>
                                            <select name="address_country" class="w-full rounded border border-white/20 bg-[#111111] px-3 py-2 text-sm text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all appearance-none">
                                                <option value="">Please Select</option>
                                                <option value="US">United States</option>
                                                <option value="CA">Canada</option>
                                                <option value="UK">United Kingdom</option>
                                                <!-- Add more as needed -->
                                            </select>
                                            <span class="text-[10px] text-gray-400 mt-1 block">Country</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <hr class="md:col-span-2 border-white/5 my-4">

                            <!-- Patient's Name -->
                            <div class="space-y-2">
                                <label class="block text-sm font-black text-white">Patient's Name <span class="text-red-500">*</span></label>
                                <div class="grid grid-cols-2 gap-4">
                                    <div>
                                        <input type="text" name="patient_first_name" placeholder="First Name" class="w-full rounded border border-white/20 bg-transparent px-3 py-2 text-sm text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all">
                                        <span class="text-[10px] text-gray-400 mt-1 block">First Name</span>
                                    </div>
                                    <div>
                                        <input type="text" name="patient_last_name" placeholder="Last Name" class="w-full rounded border border-white/20 bg-transparent px-3 py-2 text-sm text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all">
                                        <span class="text-[10px] text-gray-400 mt-1 block">Last Name</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <!-- SECTION 2: CLINICAL INFORMATION -->
                <div class="space-y-5 group/section">
                    <div class="flex items-center gap-4">
                        <div class="h-8 w-8 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                            <span class="text-emerald-400 font-black text-xs">02</span>
                        </div>
                        <h3 class="text-sm font-black uppercase tracking-[0.2em] text-white">Clinical Information</h3>
                        <div class="flex-1 h-px bg-white/5"></div>
                    </div>

                    <div class="px-2 space-y-6">
                        <!-- Full Arch Specific -->
                        <div id="full-arch-fields" class="space-y-5 {{ request('type') === 'full_arch' ? '' : 'hidden' }}">
                            <!-- Arch Type -->
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                             

                                <!-- Package Selection -->
                                <div class="space-y-3">
                                    <label class="block text-sm font-black text-white mb-2">Select Services <span class="text-red-500">*</span></label>
                                    <div class="flex flex-col gap-3">
                                        <label class="flex items-center gap-3 cursor-pointer group">
                                            <input type="radio" name="package_full_arch" value="package_1" class="w-4 h-4 text-blue-500 bg-transparent border border-white/20 focus:ring-blue-500 focus:ring-2">
                                            <span class="text-sm font-bold text-white">Package 1 (only available for edentulous cases)</span>
                                        </label>
                                        <label class="flex items-center gap-3 cursor-pointer group">
                                            <input type="radio" name="package_full_arch" value="package_2" class="w-4 h-4 text-blue-500 bg-transparent border border-white/20 focus:ring-blue-500 focus:ring-2">
                                            <span class="text-sm font-bold text-white">Package 2</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Implant System Extended (Moved below) -->
                        </div>

                        <!-- Single Implant Specific -->
                        <div id="single-implant-fields" class="space-y-4 {{ request('type') === 'single_implant' ? '' : 'hidden' }}">
                             <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                                 <div class="space-y-2">
                                     <label class="block text-[10px] font-black uppercase tracking-widest text-emerald-400">Total Implants <span class="text-red-500">*</span></label>
                                     <input type="number" name="implants_count" placeholder="e.g. 1" min="1"
                                         class="w-full rounded-xl border border-white/5 bg-white/5 px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all focus:bg-white/10 font-bold">
                                 </div>
 
                                 <div class="space-y-3">
                                     <label class="block text-[10px] font-black uppercase tracking-widest text-emerald-400">Select Services <span class="text-red-500">*</span></label>
                                     <div class="flex flex-col gap-2">
                                         <label class="flex items-center p-3 rounded-xl border border-white/5 bg-white/5 cursor-pointer hover:bg-white/10 transition-all">
                                             <input type="radio" name="package" value="package_3" class="w-4 h-4 text-emerald-500 bg-transparent border-2 border-white/20 focus:ring-emerald-500 focus:ring-2 mr-3">
                                             <span class="text-xs font-bold text-white">Surgical Guide Only</span>
                                         </label>
                                         <label class="flex items-center p-3 rounded-xl border border-white/5 bg-white/5 cursor-pointer hover:bg-white/10 transition-all">
                                             <input type="radio" name="package" value="package_4" class="w-4 h-4 text-emerald-500 bg-transparent border-2 border-white/20 focus:ring-emerald-500 focus:ring-2 mr-3">
                                             <span class="text-xs font-bold text-white">Guide + Provisional / Abutment</span>
                                         </label>
                                     </div>
                                 </div>
                             </div>
                        </div>
                        
                        <!-- Extended Implant System -->
                        <div id="extended-implant-system" class="space-y-2 mt-4 w-full {{ in_array(request('type', 'full_arch'), ['full_arch', 'single_implant']) ? '' : 'hidden' }}">
                            <label class="block text-sm font-black text-white">Implant System:</label>
                            <select name="implant_brand_full_arch" class="w-full rounded border border-white/20 bg-[#111111] px-3 py-2 text-sm text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all appearance-none">
                                <option value="">Please Select</option>
                                <option value="Straumann">Straumann</option>
                                <option value="Nobel Biocare">Nobel Biocare</option>
                                <option value="Zimmer">Zimmer</option>
                                <option value="BioHorizons">BioHorizons</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        
                        <!-- Common Clinical Info (System) - hide for full arch & single implant since it has its own -->
                        <div id="standard-implant-system" class="space-y-2 {{ in_array(request('type', 'full_arch'), ['full_arch', 'single_implant']) ? 'hidden' : '' }}">
                            <label class="block text-[10px] font-black uppercase tracking-widest text-emerald-400">Implant System <span class="text-red-500">*</span></label>
                            <input type="text" name="implant_brand" placeholder="e.g. Straumann, Nobel Biocare, Zimmer, etc."
                                class="w-full rounded-xl border border-white/5 bg-white/5 px-4 py-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all focus:bg-white/10">
                        </div>

                        <!-- Description & Prescription -->
                        <div id="standard-description" class="space-y-3 {{ in_array(request('type', 'full_arch'), ['full_arch', 'single_implant']) ? 'hidden' : '' }}">
                            <label class="block text-[10px] font-black uppercase tracking-widest text-emerald-400">Case Description & Prescription <span class="text-red-500">*</span></label>
                            <textarea name="description" rows="5"
                                placeholder="Please include all relevant information for the surgical guide(s) to be created, such as: the implant number, implant site, incisal edge position, etc."
                                class="w-full rounded-2xl border border-white/5 bg-white/5 px-4 py-4 text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all resize-none focus:bg-white/10 leading-relaxed">{{ old('description') }}</textarea>
                        </div>
                        
                        <!-- Extended Description & Prescription (Matches Screenshot Layout) -->
                        <div id="full-arch-description" class="grid grid-cols-1 md:grid-cols-2 gap-6 items-start {{ in_array(request('type', 'full_arch'), ['full_arch', 'single_implant']) ? '' : 'hidden' }}">
                            <div>
                                <label class="block text-sm font-black text-white">Case Description &<br>Prescription <span class="text-red-500">*</span></label>
                            </div>
                            <div>
                                <textarea name="description_full_arch" rows="5"
                                    placeholder=""
                                    class="w-full rounded border border-white/20 bg-transparent px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all resize-none"></textarea>
                                <span class="text-[10px] text-gray-400 mt-1 block">implant number, implant site, incisal edge<br>position, etc</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- SECTION 3: RECORDS & ASSETS -->
                <div class="space-y-5 pt-5">
                    <div class="flex items-center gap-4">
                        <div class="h-8 w-8 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                            <span class="text-purple-400 font-black text-xs">03</span>
                        </div>
                        <h3 class="text-sm font-black uppercase tracking-[0.2em] text-white">Records & Assets</h3>
                        <div class="flex-1 h-px bg-white/5"></div>
                    </div>
                    
                        <div id="standard-file-inputs" class="px-2 space-y-5 {{ in_array(request('type', 'full_arch'), ['full_arch', 'single_implant']) ? 'hidden' : '' }}">
                            <div class="flex items-center gap-2">
                                <input id="files" type="file" multiple data-report-file-input data-preview-container="#previews-standard" class="hidden">
                                <label for="files" class="flex-1 cursor-pointer">
                                    <div class="flex flex-col items-center justify-center gap-6 rounded-[32px] border-2 border-dashed border-white/10 bg-white/[0.02] px-10 py-16 hover:border-[#FACC15] hover:bg-white/5 transition-all group scale-100 hover:scale-[1.005] active:scale-[0.995] shadow-inner">
                                        <div class="h-20 w-20 rounded-[28px] bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-[#FACC15]/40 group-hover:bg-[#FACC15]/5 transition-all shadow-xl">
                                            <svg class="w-10 h-10 text-white/30 group-hover:text-[#FACC15] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3 3m0 0l-3-3m3 3V10" />
                                            </svg>
                                        </div>
                                        <div class="text-center">
                                            <p class="text-xl font-black text-white group-hover:text-[#FACC15] transition-colors uppercase tracking-tight">Secure HIPAA Transfer</p>
                                            <p class="text-[11px] text-white/30 font-bold uppercase tracking-widest mt-2">DICOM (CBCT) • STL (SCANS) • CLINICAL PHOTOS</p>
                                        </div>
                                    </div>
                                </label>
                            </div>
                            <!-- Standard Previews -->
                            <div id="previews-standard" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4"></div>
                        </div>

                        <!-- EXTENDED FILE INPUTS -->
                        <div id="full-arch-file-inputs" class="space-y-6 w-full {{ in_array(request('type', 'full_arch'), ['full_arch', 'single_implant']) ? '' : 'hidden' }}">
                            
                            <!-- DICOM Files -->
                            <div class="grid grid-cols-2 gap-4 items-center">
                                <div>
                                    <label class="block text-sm font-black text-white pr-4">Upload the patient's DICOM Files</label>
                                </div>
                                <div>
                                    <input id="files_dicom" type="file" multiple data-report-file-input data-preview-container="#previews-dicom" class="hidden">
                                    <label for="files_dicom" class="flex flex-col items-center justify-center p-4 border border-dashed border-white/10 bg-white/5 shadow-inner cursor-pointer hover:bg-white/10 transition-all h-24 relative overflow-hidden group rounded-2xl">
                                        <div class="absolute inset-x-0 bottom-0 h-1 bg-[#FACC15] scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                                        <svg class="w-6 h-6 text-white/40 mb-1 drop-shadow-sm group-hover:text-[#FACC15] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3 3m0 0l-3-3m3 3V10"/></svg>
                                        <span class="text-xs font-black text-white px-2">Browse Files</span>
                                        <span class="text-[10px] text-white/40 font-bold uppercase tracking-wider">Drag and drop here</span>
                                    </label>
                                    <span class="text-[10px] text-gray-400 mt-1 block">Please Compress files into a single<br>WinRar or Winzip file</span>
                                    <!-- DICOM Previews -->
                                    <div id="previews-dicom" class="mt-4 space-y-3"></div>
                                </div>
                            </div>
                            
                            <!-- Dual Scan DICOM Files -->
                            <div class="grid grid-cols-2 gap-4 items-center">
                                <div>
                                    <label class="block text-sm font-black text-white pr-4">Upload the patient's Dual Scan DICOM Files</label>
                                </div>
                                <div>
                                    <input id="files_dual" type="file" multiple data-report-file-input data-preview-container="#previews-dual" class="hidden">
                                    <label for="files_dual" class="flex flex-col items-center justify-center p-4 border border-dashed border-white/10 bg-white/5 shadow-inner cursor-pointer hover:bg-white/10 transition-all h-24 relative overflow-hidden group rounded-2xl">
                                        <div class="absolute inset-x-0 bottom-0 h-1 bg-[#FACC15] scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                                        <svg class="w-6 h-6 text-white/40 mb-1 drop-shadow-sm group-hover:text-[#FACC15] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3 3m0 0l-3-3m3 3V10"/></svg>
                                        <span class="text-xs font-black text-white px-2">Browse Files</span>
                                        <span class="text-[10px] text-white/40 font-bold uppercase tracking-wider">Drag and drop here</span>
                                    </label>
                                    <span class="text-[10px] text-gray-400 mt-1 block">Please Compress files into a single<br>WinRar or Winzip file</span>
                                    <!-- Dual Previews -->
                                    <div id="previews-dual" class="mt-4 space-y-3"></div>
                                </div>
                            </div>

                            <!-- STL Files -->
                            <div class="grid grid-cols-2 gap-4 items-center">
                                <div>
                                    <label class="block text-sm font-black text-white pr-4">Upload the patient's STL Files</label>
                                </div>
                                <div>
                                    <input id="files_stl" type="file" multiple data-report-file-input data-preview-container="#previews-stl" class="hidden">
                                    <label for="files_stl" class="flex flex-col items-center justify-center p-4 border border-dashed border-white/10 bg-white/5 shadow-inner cursor-pointer hover:bg-white/10 transition-all h-24 relative overflow-hidden group rounded-2xl">
                                        <div class="absolute inset-x-0 bottom-0 h-1 bg-[#FACC15] scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                                        <svg class="w-6 h-6 text-white/40 mb-1 drop-shadow-sm group-hover:text-[#FACC15] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3 3m0 0l-3-3m3 3V10"/></svg>
                                        <span class="text-xs font-black text-white px-2">Browse Files</span>
                                        <span class="text-[10px] text-white/40 font-bold uppercase tracking-wider">Drag and drop here</span>
                                    </label>
                                    <span class="text-[10px] text-gray-400 mt-1 block">Please Compress files into a single<br>WinRar or Winzip file</span>
                                    <!-- STL Previews -->
                                    <div id="previews-stl" class="mt-4 space-y-3"></div>
                                </div>
                            </div>

                            <!-- Photos -->
                            <div class="grid grid-cols-2 gap-4 items-center">
                                <div>
                                    <label class="block text-sm font-black text-white pr-4">Upload the patient's Photos - and any additional documents</label>
                                </div>
                                <div>
                                    <input id="files_photos" type="file" multiple data-report-file-input data-preview-container="#previews-photos" class="hidden">
                                    <label for="files_photos" class="flex flex-col items-center justify-center p-4 border border-dashed border-white/10 bg-white/5 shadow-inner cursor-pointer hover:bg-white/10 transition-all h-24 relative overflow-hidden group rounded-2xl">
                                        <div class="absolute inset-x-0 bottom-0 h-1 bg-[#FACC15] scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                                        <svg class="w-6 h-6 text-white/40 mb-1 drop-shadow-sm group-hover:text-[#FACC15] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3 3m0 0l-3-3m3 3V10"/></svg>
                                        <span class="text-xs font-black text-white px-2">Browse Files</span>
                                        <span class="text-[10px] text-white/40 font-bold uppercase tracking-wider">Drag and drop here</span>
                                    </label>
                                    <span class="text-[10px] text-gray-400 mt-1 block">Please Compress files into a single<br>WinRar or Winzip file</span>
                                    <!-- Photos Previews -->
                                    <div id="previews-photos" class="mt-4 space-y-3"></div>
                                </div>
                            </div>
                            
                        </div>
                        
                        <!-- Main/Shared Previews (for non-category specific fallback) -->
                        <div id="file-previews" class="hidden grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4"></div>
                    </div>
                </div>

                <!-- SECTION 4: AUTHORIZATION -->
                <div class="space-y-5 pt-5">
                    <div class="flex items-center gap-4">
                        <div class="h-8 w-8 rounded-xl bg-sky-500/10 flex items-center justify-center border border-sky-500/20">
                            <span class="text-sky-400 font-black text-xs">04</span>
                        </div>
                        <h3 class="text-sm font-black uppercase tracking-[0.2em] text-white">Authorization</h3>
                        <div class="flex-1 h-px bg-white/5"></div>
                    </div>

                    <div class="px-2 space-y-6">
                        <!-- Terms Acknowledgement -->
                        <div id="standard-terms" class="space-y-4 {{ in_array(request('type', 'full_arch'), ['full_arch', 'single_implant']) ? 'hidden' : '' }}">
                            <label class="flex items-start gap-4 p-5 rounded-2xl border border-white/5 bg-white/5 cursor-pointer hover:bg-white/10 transition-all select-none group">
                                <input type="checkbox" name="parts_acknowledgement" value="1" class="w-5 h-5 text-sky-500 bg-transparent border-2 border-white/10 rounded focus:ring-sky-500 focus:ring-2 mt-0.5 shrink-0 standard-required">
                                <div class="space-y-1">
                                    <span class="text-xs font-black text-white/80 group-hover:text-white uppercase tracking-wider">Parts & Components Acknowledgement</span>
                                    <p class="text-[11px] text-white/40 leading-relaxed">I understand that I am responsible for ordering all surgical components (guided kit, fixation pins, sleeves, etc.) unless otherwise specified.</p>
                                </div>
                            </label>

                            <label class="flex items-start gap-4 p-5 rounded-2xl border border-white/5 bg-white/5 cursor-pointer hover:bg-white/10 transition-all select-none group">
                                <input type="checkbox" class="w-5 h-5 text-sky-500 bg-transparent border-2 border-white/10 rounded focus:ring-sky-500 focus:ring-2 mt-0.5 shrink-0 standard-required">
                                <div class="space-y-1">
                                    <span class="text-xs font-black text-white/80 group-hover:text-white uppercase tracking-wider">Terms & Conditions</span>
                                    <p class="text-[11px] text-white/40 leading-relaxed">I agree to the terms of service and acknowledge that I have reviewed the patient information provided for accuracy.</p>
                                </div>
                            </label>
                        </div>
                        
                        <!-- Extended Terms -->
                        <div id="full-arch-terms" class="space-y-6 {{ in_array(request('type', 'full_arch'), ['full_arch', 'single_implant']) ? '' : 'hidden' }}">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                                <div>
                                    <label class="block text-sm font-black text-white pr-4">Parts - the dentist will receive<br>a surgical & prosthetic parts<br>report once the case is<br>appoved in Conference<br>Meeting. <span class="text-red-500">*</span></label>
                                </div>
                                <div>
                                    <label class="flex items-start gap-3 cursor-pointer group">
                                        <input type="radio" name="parts_acknowledgement_full_arch" value="1" class="w-4 h-4 text-blue-500 bg-transparent border border-white/20 focus:ring-blue-500 focus:ring-2 mt-1 full-arch-required">
                                        <span class="text-sm text-white">I am aware that the guided<br>kit, fixation pins, pin<br>sleeves, guide sleeves and<br>implant parts are not<br>included. I already have or I<br>will order them.</span>
                                    </label>
                                </div>
                            </div>
                            
                            <hr class="border-white/5 my-4">
                            
                            <div>
                                <label class="flex items-center gap-3 cursor-pointer group">
                                    <input type="checkbox" class="w-5 h-5 border-gray-300 rounded focus:ring-blue-500 mt-1 full-arch-required" style="appearance: auto; background-color: white;">
                                    <span class="text-sm text-white">By Checking this box and signing my name below I<br>acknowledge that I read and I agree to the <a href="#" class="text-blue-500 underline">terms & conditions</a>. <span class="text-red-500">*</span></span>
                                </label>
                            </div>
                        </div>

                        <!-- Signature -->
                        <div class="space-y-2">
                            <label class="block text-[10px] font-black uppercase tracking-widest text-sky-400">Digital Signature <span class="text-red-500">*</span></label>
                            <input type="text" name="signature" required placeholder="Type full name as signature"
                                class="w-full rounded-xl border border-white/5 bg-white/5 px-4 py-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-sky-500 transition-all focus:bg-white/10 font-serif italic text-lg">
                        </div>
                    </div>
                </div>
                
                <!-- Submit Button -->
                <div class="pt-6 relative d-flex items-center text-center justify-center">
                    <button type="submit" id="main-submit-btn"
                        class="relative w-full text-center py-5 rounded-2xl bg-[#FACC15] text-black text-sm font-black uppercase tracking-[0.3em] flex items-center justify-center gap-4 hover:bg-[#F5C211] transition-all group hover:scale-[1.01] active:scale-[0.99]">
                        <span>Submit Case</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
@endsection

@push('styles')
<style>
/* Custom Radio Button Styles */
input[type="radio"] {
    appearance: none;
    background-color: transparent;
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    cursor: pointer;
    position: relative;
}

input[type="radio"]:checked {
    border-color: #10b981;
    background-color: #10b981;
}

input[type="radio"]:checked::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: white;
}

input[type="radio"]:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.5);
}

/* Custom Checkbox Styles */
input[type="checkbox"] {
    appearance: none;
    background-color: transparent;
    border: 2px solid rgba(255, 255, 255, 0.1);
    border-radius: 4px;
    cursor: pointer;
    position: relative;
}

input[type="checkbox"]:checked {
    border-color: #0ea5e9;
    background-color: #0ea5e9;
}

input[type="checkbox"]:checked::before {
    content: '✓';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 12px;
    font-weight: bold;
}

input[type="checkbox"]:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(14, 165, 233, 0.5);
}

#user_id {
    background-color: #000000 !important;
}

#user_id option {
    background-color: #000000 !important;
    color: #ffffff !important;
}
</style>
@endpush
@push('scripts')
    <script>
        // Toggle Sections based on Case Category
        function toggleSections(val) {
            const fullArch = document.getElementById('full-arch-fields');
            const singleImplant = document.getElementById('single-implant-fields');
            const fullArchGeneral = document.getElementById('full-arch-general-fields');
            const standardGeneral = document.getElementById('standard-general-fields');
            const fullArchDescription = document.getElementById('full-arch-description');
            const standardDescription = document.getElementById('standard-description');
            const standardImplantSystem = document.getElementById('standard-implant-system');
            
            const standardFileInputs = document.getElementById('standard-file-inputs');
            const fullArchFileInputs = document.getElementById('full-arch-file-inputs');
            
            const standardTerms = document.getElementById('standard-terms');
            const fullArchTerms = document.getElementById('full-arch-terms');
            
            if (val === 'full_arch') {
                fullArch.classList.remove('hidden');
                singleImplant.classList.add('hidden');
                fullArchGeneral.classList.remove('hidden');
                standardGeneral.classList.add('hidden');
                fullArchDescription.classList.remove('hidden');
                standardDescription.classList.add('hidden');
                standardImplantSystem.classList.add('hidden');
                
                standardFileInputs.classList.add('hidden');
                fullArchFileInputs.classList.remove('hidden');
                
                standardTerms.classList.add('hidden');
                fullArchTerms.classList.remove('hidden');
                
                const extendedImplantSystem = document.getElementById('extended-implant-system');
                if (extendedImplantSystem) extendedImplantSystem.classList.remove('hidden');
                
                document.getElementById('files').removeAttribute('required');
                document.querySelectorAll('.standard-required').forEach(el => el.removeAttribute('required'));
                // note: file uploads have custom validation in the backend/frontend scripts so not required strictly by HTML
            } else if (val === 'single_implant') {
                singleImplant.classList.remove('hidden');
                fullArch.classList.add('hidden');
                
                fullArchGeneral.classList.remove('hidden');
                standardGeneral.classList.add('hidden');
                fullArchDescription.classList.remove('hidden');
                standardDescription.classList.add('hidden');
                standardImplantSystem.classList.add('hidden');
                
                standardFileInputs.classList.add('hidden');
                fullArchFileInputs.classList.remove('hidden');
                
                standardTerms.classList.add('hidden');
                fullArchTerms.classList.remove('hidden');
                
                const extendedImplantSystem = document.getElementById('extended-implant-system');
                if (extendedImplantSystem) extendedImplantSystem.classList.remove('hidden');
                
                document.getElementById('files').removeAttribute('required');
                document.querySelectorAll('.standard-required').forEach(el => el.removeAttribute('required'));
            } else {
                fullArch.classList.add('hidden');
                singleImplant.classList.add('hidden');
                
                fullArchGeneral.classList.add('hidden');
                standardGeneral.classList.remove('hidden');
                fullArchDescription.classList.add('hidden');
                standardDescription.classList.remove('hidden');
                standardImplantSystem.classList.remove('hidden');
                
                standardFileInputs.classList.remove('hidden');
                fullArchFileInputs.classList.add('hidden');
                
                standardTerms.classList.remove('hidden');
                fullArchTerms.classList.add('hidden');
                
                const extendedImplantSystem = document.getElementById('extended-implant-system');
                if (extendedImplantSystem) extendedImplantSystem.classList.add('hidden');
                
                document.getElementById('files').setAttribute('required', 'required');
                document.querySelectorAll('.standard-required').forEach(el => el.setAttribute('required', 'required'));
            }
        }

        // Handle Doctor Selection
        function handleDoctorChange(select) {
            const selectedOption = select.options[select.selectedIndex];
            if (selectedOption.value) {
                document.getElementById('doctor-email').value = selectedOption.dataset.email || '';
                document.getElementById('doctor-phone').value = selectedOption.dataset.phone || '';
                document.getElementById('doctor-address').value = selectedOption.dataset.address || '';
            } else {
                document.getElementById('doctor-email').value = '';
                document.getElementById('doctor-phone').value = '';
                document.getElementById('doctor-address').value = '';
            }
        }

        // Initialize on page load
        document.addEventListener('DOMContentLoaded', function() {
            const caseTypeSelect = document.getElementById('case_type');
            if (caseTypeSelect) {
                toggleSections(caseTypeSelect.value);
            }
        });

        // Handle File Uploads
        document.addEventListener('DOMContentLoaded', function() {
            var previews = document.getElementById('file-previews');
            var form = document.getElementById('bh-upload-case-form');
            var mainSubmitBtn = document.getElementById('main-submit-btn');
            
            var activeUploads = 0;

            if (form && previews) {
                // Event delegation for any file input matching the selector
                form.addEventListener('change', function(e) {
                    if (e.target && e.target.matches('[data-report-file-input]')) {
                        if (!e.target.files || !e.target.files.length) return;

                        Array.from(e.target.files).forEach(function(file) {
                            var fileId = 'file-' + Math.random().toString(36).substr(2, 9);
                            
                            var wrapper = document.createElement('div');
                            wrapper.id = 'wrapper-' + fileId;
                            wrapper.className = 'rounded-xl border border-white/10 bg-[#0c0c0c] p-4 flex flex-col gap-3 bh-page-animate';

                            var topRow = document.createElement('div');
                            topRow.className = 'flex items-center gap-3';

                            var info = document.createElement('div');
                            info.className = 'flex-1 min-w-0';
                            info.innerHTML = '<p class="text-sm font-bold text-white truncate">' + file.name + '</p>' +
                                '<p class="text-xs text-white/50 font-semibold uppercase tracking-wider mt-0.5">' + Math.round(file.size / 1024) + ' KB</p>';

                            topRow.appendChild(info);

                            if (file.type && file.type.startsWith('image/')) {
                                var thumb = document.createElement('img');
                                thumb.className = 'w-12 h-12 rounded-lg object-cover border border-white/10';
                                var reader = new FileReader();
                                reader.onload = function(e) { thumb.src = e.target.result; };
                                reader.readAsDataURL(file);
                                topRow.appendChild(thumb);
                            } else {
                                var ext = file.name.split('.').pop().toUpperCase();
                                var badge = document.createElement('span');
                                badge.className = 'inline-flex items-center rounded-lg bg-[#FACC15]/10 px-3 py-1.5 text-xs font-black text-[#FACC15] border border-[#FACC15]/20';
                                badge.textContent = ext;
                                topRow.appendChild(badge);
                            }
                            
                            var removeBtn = document.createElement('button');
                            removeBtn.type = 'button';
                            removeBtn.className = 'p-1.5 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all';
                            removeBtn.innerHTML = `
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            `;
                            removeBtn.onclick = function() {
                                if (window['xhr_' + fileId]) window['xhr_' + fileId].abort();
                                wrapper.remove();
                                var inputs = form.querySelectorAll(`input[data-file-id="${fileId}"]`);
                                inputs.forEach(i => i.remove());
                                if (window['xhr_' + fileId] && window['xhr_' + fileId].readyState !== 4) {
                                    activeUploads = Math.max(0, activeUploads - 1);
                                }
                                updateSubmitButtonState();
                            };
                            topRow.appendChild(removeBtn);
                            
                            wrapper.appendChild(topRow);

                            var progressOuter = document.createElement('div');
                            progressOuter.className = 'h-2 w-full rounded-full bg-white/5 overflow-hidden border border-white/10 relative';

                            var progressInner = document.createElement('div');
                            progressInner.className = 'h-full w-0 bg-[#FACC15] transition-[width] duration-300 shadow-[0_0_15px_rgba(250,204,21,0.4)] relative z-10';
                            progressInner.id = 'progress-' + fileId;

                            var progressText = document.createElement('span');
                            progressText.className = 'absolute -top-5 right-0 text-xs font-bold text-[#FACC15]';
                            progressText.id = 'text-' + fileId;
                            progressText.textContent = '0%';

                            progressOuter.appendChild(progressInner);
                            progressOuter.appendChild(progressText);
                            wrapper.appendChild(progressOuter);

                            // Determine which preview container to use
                            var containerSelector = e.target.getAttribute('data-preview-container');
                            var targetPreviews = containerSelector ? document.querySelector(containerSelector) : previews;
                            
                            if (targetPreviews) {
                                targetPreviews.appendChild(wrapper);
                            } else {
                                previews.appendChild(wrapper);
                            }

                            startIndividualUpload(file, fileId);
                        });
                        
                        // Clear the input so selecting same files again triggers change event
                        e.target.value = '';
                    }
                });

                function startIndividualUpload(file, fileId) {
                    activeUploads++;
                    updateSubmitButtonState();

                    var xhr = new XMLHttpRequest();
                    window['xhr_' + fileId] = xhr;
                    var formData = new FormData();
                    formData.append('file', file);
                    formData.append('_token', '{{ csrf_token() }}');

                    xhr.upload.addEventListener('progress', function(e) {
                        if (!e.lengthComputable) return;
                        var percent = Math.round((e.loaded / e.total) * 100);
                        var bar = document.getElementById('progress-' + fileId);
                        var txtEl = document.getElementById('text-' + fileId);
                        if (bar) bar.style.width = percent + '%';
                        if (txtEl) txtEl.textContent = percent + '%';
                    });

                    xhr.onreadystatechange = function() {
                        if (xhr.readyState !== 4) return;
                        
                        if (window['xhr_' + fileId] && window['xhr_' + fileId].readyState === 4) {
                            activeUploads = Math.max(0, activeUploads - 1);
                        }
                        updateSubmitButtonState();

                        if (xhr.status >= 200 && xhr.status < 300) {
                            var resp = JSON.parse(xhr.responseText);
                            if (resp.ok) {
                                var suffix = resp.path.replace(/\./g, '_');
                                form.insertAdjacentHTML('beforeend', `
                                    <input type="hidden" name="temp_paths[]" value="${resp.path}" data-file-id="${fileId}">
                                    <input type="hidden" name="original_names[${suffix}]" value="${resp.original_name}" data-file-id="${fileId}">
                                    <input type="hidden" name="mime_types[${suffix}]" value="${resp.mime_type}" data-file-id="${fileId}">
                                    <input type="hidden" name="sizes[${suffix}]" value="${resp.size}" data-file-id="${fileId}">
                                `);

                                var bar = document.getElementById('progress-' + fileId);
                                var txtEl = document.getElementById('text-' + fileId);
                                if (bar) {
                                    bar.classList.remove('bg-[#FACC15]');
                                    bar.classList.add('bg-emerald-500');
                                }
                                if (txtEl) {
                                    txtEl.textContent = '✓ Complete';
                                    txtEl.classList.remove('text-[#FACC15]');
                                    txtEl.classList.add('text-emerald-400');
                                }
                            }
                        } else {
                            var bar = document.getElementById('progress-' + fileId);
                            var txtEl = document.getElementById('text-' + fileId);
                            if (bar) {
                                bar.classList.remove('bg-[#FACC15]');
                                bar.classList.add('bg-red-500');
                            }
                            if (txtEl) {
                                txtEl.textContent = '✗ Failed';
                                txtEl.classList.remove('text-[#FACC15]');
                                txtEl.classList.add('text-red-400');
                            }
                        }
                    };

                    xhr.open('POST', "{{ route('admin.cases.upload-temp') }}");
                    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
                    xhr.send(formData);
                }

                function updateSubmitButtonState() {
                    if (activeUploads > 0) {
                        mainSubmitBtn.disabled = true;
                        mainSubmitBtn.classList.add('opacity-50', 'cursor-not-allowed');
                        mainSubmitBtn.innerHTML = '<span class="flex items-center justify-center gap-2"><svg class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Uploading files...</span>';
                    } else {
                        mainSubmitBtn.disabled = false;
                        mainSubmitBtn.classList.remove('opacity-50', 'cursor-not-allowed');
                        mainSubmitBtn.innerHTML = `
                            <span>Submit Case</span>
                        `;
                    }
                }
            }
        });
    </script>
@endpush