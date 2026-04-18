@extends('layouts.admin')

@section('title', 'Submit a Case')
@section('header', 'Submit a New Case')

@section('content')
    <div class="max-w-4xl mx-auto pb-20">
        <div class="rounded-3xl bg-[#0c0c0c] border border-white/10 p-10 text-sm bh-page-animate shadow-2xl relative overflow-hidden py-6 px-6">
            <!-- Decorative Background Element -->
            <div class="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-[#FACC15] opacity-[0.03] rounded-full blur-3xl pointer-events-none"></div>
            
            <div class="flex items-center justify-between mb-10 relative">
                <div class="flex items-center gap-6 pt-5">
                    <a href="{{ route('admin.cases.index') }}" class="group flex items-center justify-center h-12 w-12 rounded-2xl bg-white/5 border border-white/10 hover:border-[#FACC15] hover:bg-white/10 transition-all shadow-lg" title="Back to All Cases">
                        <svg class="w-6 h-6 text-white/60 group-hover:text-[#FACC15] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                    </a>
                    <div>
                        <h2 class="text-3xl font-black text-white tracking-tight">
                             @if(request('type') === 'full_arch')
                                Submit Full Arch Case
                            @elseif(request('type') === 'single_implant')
                                Submit Single Implant Case
                            @else
                                Submit a New Case
                            @endif
                        </h2>
                        <p class="text-[11px] text-[#FACC15] font-black uppercase tracking-[0.3em] mt-1.5 opacity-80">Premium Surgical Planning Center</p>
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

            <form id="bh-upload-case-form" action="{{ route('admin.cases.store') }}" method="POST" enctype="multipart/form-data" class="space-y-12">
                @csrf
                <input type="hidden" name="case_type" value="{{ request('type', 'full_arch') }}">
                @if(request('reply_to'))
                    <input type="hidden" name="reply_to" value="{{ request('reply_to') }}">
                @endif
                
                <!-- SECTION 1: GENERAL INFORMATION -->
                <div class="space-y-6">
                    <div class="flex items-center gap-4">
                        <div class="h-8 w-8 rounded-xl bg-[#FACC15]/10 flex items-center justify-center border border-[#FACC15]/20">
                            <span class="text-[#FACC15] font-black text-xs">01</span>
                        </div>
                        <h3 class="text-sm font-black uppercase tracking-[0.2em] text-white">General Information</h3>
                        <div class="flex-1 h-px bg-white/5"></div>
                    </div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 px-2">
                        <!-- Select Doctor -->
                        <div class="space-y-2">
                            <label for="user_id" class="block text-[10px] font-black uppercase tracking-widest text-[#FACC15]">
                                Select Doctor <span class="text-red-500">*</span>
                            </label>
                            <select id="user_id" name="user_id" required onchange="handleDoctorChange(this)"
                                class="w-full rounded-xl border border-white/5 bg-white/5 px-4 py-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#FACC15] focus:border-[#FACC15] transition-all appearance-none cursor-pointer focus:bg-white/10">
                                <option value="">Choose a registered doctor...</option>
                                @foreach($doctors as $doctor)
                                    <option value="{{ $doctor->id }}" 
                                        data-email="{{ $doctor->email }}" 
                                        data-phone="{{ $doctor->phone }}" 
                                        data-address="{{ $doctor->address }}">
                                        {{ $doctor->name }}
                                    </option>
                                @endforeach
                            </select>
                        </div>

                        <!-- Case Category -->
                        <div class="space-y-2">
                            <label for="case_type" class="block text-[10px] font-black uppercase tracking-widest text-[#FACC15]">
                                Case Category <span class="text-red-500">*</span>
                            </label>
                            <select id="case_type" name="case_type" required onchange="toggleSections(this.value)"
                                class="w-full rounded-xl border border-white/5 bg-white/5 px-4 py-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#FACC15] focus:border-[#FACC15] transition-all appearance-none cursor-pointer focus:bg-white/10">
                                <option value="full_arch" {{ request('type') === 'full_arch' ? 'selected' : '' }}>Full Arch Case</option>
                                <option value="single_implant" {{ request('type') === 'single_implant' ? 'selected' : '' }}>Single Implant</option>
                                <option value="multiple_implants" {{ request('type') === 'multiple_implants' ? 'selected' : '' }}>Multiple Implants</option>
                                <option value="treatment_planning" {{ request('type') === 'treatment_planning' ? 'selected' : '' }}>Treatment Planning Only</option>
                                <option value="radiology_report" {{ request('type') === 'radiology_report' ? 'selected' : '' }}>Radiology Report</option>
                            </select>
                        </div>

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
                            <input id="title" name="title" type="text" value="{{ old('title') }}" required
                                placeholder="Enter patient's full name"
                                class="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-[#FACC15] focus:border-[#FACC15] transition-all focus:bg-white/10 font-bold">
                        </div>
                    </div>
                </div>

                <!-- SECTION 2: CLINICAL INFORMATION -->
                <div class="space-y-6 group/section pt-6">
                    <div class="flex items-center gap-4">
                        <div class="h-8 w-8 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                            <span class="text-emerald-400 font-black text-xs">02</span>
                        </div>
                        <h3 class="text-sm font-black uppercase tracking-[0.2em] text-white">Clinical Information</h3>
                        <div class="flex-1 h-px bg-white/5"></div>
                    </div>

                    <div class="px-2 space-y-8">
                        <!-- Full Arch Specific -->
                        <div id="full-arch-fields" class="space-y-8 {{ request('type') === 'full_arch' ? '' : 'hidden' }}">
                            <!-- Arch Type -->
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                              
                                <!-- Package Selection -->
                                <div class="space-y-4">
                                    <label class="block text-[10px] font-black uppercase tracking-widest text-emerald-400">Select Services <span class="text-red-500">*</span></label>
                                    <div class="flex flex-col gap-3">
                                        <label class="flex flex-col p-4 rounded-xl border border-white/5 bg-white/5 cursor-pointer hover:bg-white/10 transition-all has-[:checked]:border-emerald-500/50 has-[:checked]:bg-emerald-500/5">
                                            <input type="radio" name="package" value="package_1" class="sr-only">
                                            <div class="flex items-center">
                                                <div class="h-5 w-5 rounded-full border-2 border-white/20 flex items-center justify-center mr-4">
                                                    <div class="h-2.5 w-2.5 rounded-full bg-emerald-500 scale-0 transition-transform"></div>
                                                </div>
                                                <span class="text-sm font-bold text-white">Full-Arch Package 1</span>
                                            </div>
                                            <p class="text-[11px] text-white/40 mt-1 ml-9">Implant Plan, Surgical Case, Bone Reduction, Interim Hybrid (Edentulous Only)</p>
                                        </label>
                                        <label class="flex flex-col p-4 rounded-xl border border-white/5 bg-white/5 cursor-pointer hover:bg-white/10 transition-all has-[:checked]:border-emerald-500/50 has-[:checked]:bg-emerald-500/5">
                                            <input type="radio" name="package" value="package_2" class="sr-only">
                                            <div class="flex items-center">
                                                <div class="h-5 w-5 rounded-full border-2 border-white/20 flex items-center justify-center mr-4">
                                                    <div class="h-2.5 w-2.5 rounded-full bg-emerald-500 scale-0 transition-transform"></div>
                                                </div>
                                                <span class="text-sm font-bold text-white">Full-Arch Package 2</span>
                                            </div>
                                            <p class="text-[11px] text-white/40 mt-1 ml-9">Implant Plan, Stackable Design, Chrome Guide, Bone Reduction, Interim Hybrid</p>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <!-- Prosthesis Info -->
                            <div class="space-y-4 pt-6">
                                <label class="block text-[10px] font-black uppercase tracking-widest text-emerald-400">Patient Status</label>
                                <div class="flex gap-6">
                                    <label class="flex items-center gap-2 cursor-pointer group">
                                        <input type="radio" name="prosthesis_exists" value="yes" class="sr-only peer">
                                        <div class="h-5 w-5 rounded-full border-2 border-white/20 peer-checked:border-emerald-500 flex items-center justify-center transition-all">
                                            <div class="h-2.5 w-2.5 rounded-full bg-emerald-500 scale-0 peer-checked:scale-100 transition-transform"></div>
                                        </div>
                                        <span class="text-xs font-bold text-white/60 group-hover:text-white transition-colors">Patient has existing prosthesis</span>
                                    </label>
                                    <label class="flex items-center gap-2 cursor-pointer group">
                                        <input type="radio" name="prosthesis_exists" value="no" class="sr-only peer">
                                        <div class="h-5 w-5 rounded-full border-2 border-white/20 peer-checked:border-emerald-500 flex items-center justify-center transition-all">
                                            <div class="h-2.5 w-2.5 rounded-full bg-emerald-500 scale-0 peer-checked:scale-100 transition-transform"></div>
                                        </div>
                                        <span class="text-xs font-bold text-white/60 group-hover:text-white transition-colors">No prosthesis</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <!-- Single Implant Specific -->
                        <div id="single-implant-fields" class="space-y-8 {{ request('type') === 'single_implant' ? '' : 'hidden' }} pt-6">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div class="space-y-2">
                                    <label class="block text-[10px] font-black uppercase tracking-widest text-emerald-400">Total Implants <span class="text-red-500">*</span></label>
                                    <input type="number" name="implants_count" placeholder="e.g. 1" min="1"
                                        class="w-full rounded-xl border border-white/5 bg-white/5 px-4 py-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all focus:bg-white/10 font-bold">
                                </div>

                                <div class="space-y-4">
                                    <label class="block text-[10px] font-black uppercase tracking-widest text-emerald-400">Select Services <span class="text-red-500">*</span></label>
                                    <div class="flex flex-col gap-3">
                                        <label class="flex items-center p-4 rounded-xl border border-white/5 bg-white/5 cursor-pointer hover:bg-white/10 transition-all has-[:checked]:border-emerald-500/50">
                                            <input type="radio" name="package" value="package_3" class="sr-only">
                                            <div class="h-5 w-5 rounded-full border-2 border-white/20 flex items-center justify-center mr-4">
                                                <div class="h-2.5 w-2.5 rounded-full bg-emerald-500 scale-0 transition-transform"></div>
                                            </div>
                                            <span class="text-sm font-bold text-white">Surgical Guide Only</span>
                                        </label>
                                        <label class="flex items-center p-4 rounded-xl border border-white/5 bg-white/5 cursor-pointer hover:bg-white/10 transition-all has-[:checked]:border-emerald-500/50">
                                            <input type="radio" name="package" value="package_4" class="sr-only">
                                            <div class="h-5 w-5 rounded-full border-2 border-white/20 flex items-center justify-center mr-4">
                                                <div class="h-2.5 w-2.5 rounded-full bg-emerald-500 scale-0 transition-transform"></div>
                                            </div>
                                            <span class="text-sm font-bold text-white">Guide + Provisional / Abutment</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Commmon Clinical Info (System) -->
                        <div class="space-y-2 pt-6">
                            <label class="block text-[10px] font-black uppercase tracking-widest text-emerald-400">Implant System <span class="text-red-500">*</span></label>
                            <input type="text" name="implant_brand" placeholder="e.g. Straumann, Nobel Biocare, Zimmer, etc."
                                class="w-full rounded-xl border border-white/5 bg-white/5 px-4 py-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all focus:bg-white/10">
                        </div>

                        <!-- Description & Prescription -->
                        <div class="space-y-3 pt-6">
                            <label class="block text-[10px] font-black uppercase tracking-widest text-emerald-400">Case Description & Prescription <span class="text-red-500">*</span></label>
                            <textarea name="description" rows="5"
                                placeholder="Please include all relevant information for the surgical guide(s) to be created, such as: the implant number, implant site, incisal edge position, etc."
                                class="w-full rounded-2xl border border-white/5 bg-white/5 px-4 py-4 text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all resize-none focus:bg-white/10 leading-relaxed">{{ old('description') }}</textarea>
                        </div>
                    </div>
                </div>

                <!-- SECTION 3: RECORDS & ASSETS -->
                <div class="space-y-6 pt-6">
                    <div class="flex items-center gap-4">
                        <div class="h-8 w-8 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                            <span class="text-purple-400 font-black text-xs">03</span>
                        </div>
                        <h3 class="text-sm font-black uppercase tracking-[0.2em] text-white">Records & Assets</h3>
                        <div class="flex-1 h-px bg-white/5"></div>
                    </div>
                    
                    <div class="px-2 space-y-6">
                        <div id="file-inputs">
                            <div class="flex items-center gap-2">
                                <input id="files" name="files[]" type="file" required multiple data-report-file-input class="hidden">
                                <label for="files" class="flex-1 cursor-pointer">
                                    <div class="flex flex-col items-center justify-center gap-6 rounded-[32px] border-2 border-dashed border-white/10 bg-white/[0.02] px-10 py-16 hover:border-[#FACC15] hover:bg-white/5 transition-all group scale-100 hover:scale-[1.005] active:scale-[0.995]">
                                        <div class="h-20 w-20 rounded-[28px] bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-[#FACC15]/40 group-hover:bg-[#FACC15]/5 transition-all shadow-xl">
                                            <svg class="w-10 h-10 text-white/30 group-hover:text-[#FACC15] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3 3m0 0l-3-3m3 3V10" />
                                            </svg>
                                        </div>
                                        <div class="text-center">
                                            <p class="text-xl font-black text-white group-hover:text-[#FACC15] transition-colors">Secure HIPAA Transfer</p>
                                            <p class="text-[11px] text-white/30 font-bold uppercase tracking-widest mt-2">DICOM (CBCT) • STL (SCANS) • CLINICAL PHOTOS</p>
                                        </div>
                                    </div>
                                </label>
                            </div>
                        </div>
                        
                        <div id="file-previews" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4"></div>
                    </div>
                </div>

                <!-- SECTION 4: AUTHORIZATION -->
                <div class="space-y-6 pt-6">
                    <div class="flex items-center gap-4">
                        <div class="h-8 w-8 rounded-xl bg-sky-500/10 flex items-center justify-center border border-sky-500/20">
                            <span class="text-sky-400 font-black text-xs">04</span>
                        </div>
                        <h3 class="text-sm font-black uppercase tracking-[0.2em] text-white">Authorization</h3>
                        <div class="flex-1 h-px bg-white/5"></div>
                    </div>

                    <div class="px-2 space-y-8 pt-6">
                        <!-- Terms Acknowledgement -->
                        <div class="space-y-4">
                            <label class="flex items-start gap-4 p-5 rounded-2xl border border-white/5 bg-white/5 cursor-pointer hover:bg-white/10 transition-all select-none group">
                                <input type="checkbox" name="parts_acknowledgement" value="1" required class="sr-only peer">
                                <div class="mt-0.5 h-6 w-6 rounded-lg border-2 border-white/10 flex items-center justify-center shrink-0 peer-checked:border-sky-500 peer-checked:bg-sky-500 transition-all shadow-inner">
                                    <svg class="w-4 h-4 text-white scale-0 peer-checked:scale-100 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M5 13l4 4L19 7"/>
                                    </svg>
                                </div>
                                <div class="space-y-1">
                                    <span class="text-xs font-black text-white/80 group-hover:text-white uppercase tracking-wider">Parts & Components Acknowledgement</span>
                                    <p class="text-[11px] text-white/40 leading-relaxed">I understand that I am responsible for ordering all surgical components (guided kit, fixation pins, sleeves, etc.) unless otherwise specified.</p>
                                </div>
                            </label>

                            <label class="flex items-start gap-4 p-5 rounded-2xl border border-white/5 bg-white/5 cursor-pointer hover:bg-white/10 transition-all select-none group">
                                <input type="checkbox" required class="sr-only peer">
                                <div class="mt-0.5 h-6 w-6 rounded-lg border-2 border-white/10 flex items-center justify-center shrink-0 peer-checked:border-sky-500 peer-checked:bg-sky-500 transition-all shadow-inner">
                                    <svg class="w-4 h-4 text-white scale-0 peer-checked:scale-100 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M5 13l4 4L19 7"/>
                                    </svg>
                                </div>
                                <div class="space-y-1">
                                    <span class="text-xs font-black text-white/80 group-hover:text-white uppercase tracking-wider">Terms & Conditions</span>
                                    <p class="text-[11px] text-white/40 leading-relaxed">I agree to the terms of service and acknowledge that I have reviewed the patient information provided for accuracy.</p>
                                </div>
                            </label>
                        </div>

                        <!-- Signature -->
                        <div class="space-y-2 pt-6">
                            <label class="block text-[10px] font-black uppercase tracking-widest text-sky-400">Digital Signature <span class="text-red-500">*</span></label>
                            <input type="text" name="signature" required placeholder="Type full name as signature"
                                class="w-full rounded-xl border border-white/5 bg-white/5 px-4 py-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-sky-500 transition-all focus:bg-white/10 font-serif italic text-lg">
                        </div>
                    </div>
                </div>
                
                <!-- Submit Button -->
                <div class="pt-6 relative py-6 pb-6 flex justify-center">
                    <div class="absolute inset-0 bg-yellow-400/20 blur-3xl rounded-full opacity-50"></div>
                    <button type="submit" id="main-submit-btn"
                        class="relative w-50 py-9 text-center px-5 rounded-2xl bg-[#FACC15] text-black text-sm font-black uppercase tracking-[0.3em] flex items-center justify-center gap-4 hover:bg-[#F5C211] transition-all shadow-[0_20px_50px_rgba(250,204,21,0.3)] group hover:scale-[1.01] active:scale-[0.99]">
                        <span>Submit Case</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
@endsection

@push('scripts')
    <script>
        // Toggle Sections based on Case Category
        function toggleSections(val) {
            const fullArch = document.getElementById('full-arch-fields');
            const singleImplant = document.getElementById('single-implant-fields');
            
            if (val === 'full_arch') {
                fullArch.classList.remove('hidden');
                singleImplant.classList.add('hidden');
            } else if (val === 'single_implant') {
                fullArch.classList.add('hidden');
                singleImplant.classList.remove('hidden');
            } else {
                fullArch.classList.add('hidden');
                singleImplant.classList.add('hidden');
            }
        }

        // Handle Doctor Selection Change
        function handleDoctorChange(select) {
            const option = select.options[select.selectedIndex];
            document.getElementById('doctor-email').value = option.dataset.email || '';
            document.getElementById('doctor-phone').value = option.dataset.phone || '';
            document.getElementById('doctor-address').value = option.dataset.address || '';
        }

        document.addEventListener('DOMContentLoaded', function() {
            var fileInput = document.getElementById('files');
            var previews = document.getElementById('file-previews');
            var form = document.getElementById('bh-upload-case-form');
            var mainSubmitBtn = document.getElementById('main-submit-btn');

            var activeUploads = 0;

            if (fileInput && previews) {
                fileInput.addEventListener('change', function(e) {
                    if (!this.files || !this.files.length) return;

                    Array.from(this.files).forEach(function(file) {
                        var fileId = 'file-' + Math.random().toString(36).substr(2, 9);
                        
                        var wrapper = document.createElement('div');
                        wrapper.id = 'wrapper-' + fileId;
                        wrapper.className = 'rounded-2xl border border-white/5 bg-white/[0.03] p-4 flex flex-col gap-4 bh-page-animate shadow-xl';

                        var topRow = document.createElement('div');
                        topRow.className = 'flex items-center gap-3';

                        var info = document.createElement('div');
                        info.className = 'flex-1 min-w-0';
                        info.innerHTML = '<p class="text-[13px] font-black text-white truncate">' + file.name + '</p>' +
                            '<p class="text-[10px] text-white/30 font-bold uppercase tracking-widest mt-0.5">' + Math.round(file.size / (1024 * 1024) * 100) / 100 + ' MB</p>';

                        topRow.appendChild(info);

                        if (file.type && file.type.startsWith('image/')) {
                            var thumb = document.createElement('img');
                            thumb.className = 'w-10 h-10 rounded-xl object-cover border border-white/10';
                            var reader = new FileReader();
                            reader.onload = function(e) { thumb.src = e.target.result; };
                            reader.readAsDataURL(file);
                            topRow.appendChild(thumb);
                        } else {
                            var ext = file.name.split('.').pop().toUpperCase();
                            var badge = document.createElement('span');
                            badge.className = 'inline-flex items-center rounded-lg bg-white/5 px-2.5 py-1.5 text-[9px] font-black text-white/60 border border-white/10';
                            badge.textContent = ext;
                            topRow.appendChild(badge);
                        }
                        
                        var removeBtn = document.createElement('button');
                        removeBtn.type = 'button';
                        removeBtn.className = 'text-white/20 hover:text-red-400 transition-colors p-2 rounded-xl hover:bg-red-500/5';
                        removeBtn.innerHTML = '<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" /></svg>';
                        removeBtn.onclick = function() {
                            if (window['xhr_' + fileId]) window['xhr_' + fileId].abort();
                            wrapper.remove();
                            var inputs = form.querySelectorAll(`input[data-file-id="${fileId}"]`);
                            inputs.forEach(i => i.remove());
                            activeUploads = Math.max(0, activeUploads - (window['xhr_' + fileId] && window['xhr_' + fileId].readyState !== 4 ? 1 : 0));
                            updateSubmitButtonState();
                        };
                        topRow.appendChild(removeBtn);
                        
                        wrapper.appendChild(topRow);

                        var progressOuter = document.createElement('div');
                        progressOuter.className = 'h-1.5 w-full rounded-full bg-white/5 overflow-hidden relative';

                        var progressInner = document.createElement('div');
                        progressInner.className = 'h-full w-0 bg-[#FACC15] transition-[width] duration-300 shadow-[0_0_10px_rgba(250,204,21,0.3)]';
                        progressInner.id = 'progress-' + fileId;

                        progressOuter.appendChild(progressInner);
                        wrapper.appendChild(progressOuter);

                        var statusText = document.createElement('p');
                        statusText.className = 'text-[9px] font-black uppercase tracking-widest text-white/20';
                        statusText.id = 'text-' + fileId;
                        statusText.textContent = 'Preparing Transfer...';
                        wrapper.appendChild(statusText);

                        previews.appendChild(wrapper);

                        startIndividualUpload(file, fileId);
                    });
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
                        if (txtEl) txtEl.textContent = 'Enrypting & Sending... ' + percent + '%';
                    });

                    xhr.onreadystatechange = function() {
                        if (xhr.readyState !== 4) return;
                        
                        activeUploads--;
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
                                    txtEl.textContent = '✓ Securely Transferred';
                                    txtEl.classList.remove('text-white/20');
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
                                txtEl.textContent = '✗ Transfer Failed';
                                txtEl.classList.remove('text-white/20');
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
                        mainSubmitBtn.innerHTML = '<span class="flex items-center justify-center gap-3"><svg class="animate-spin h-6 w-6" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Transfereing Data...</span>';
                    } else {
                        mainSubmitBtn.disabled = false;
                        mainSubmitBtn.classList.remove('opacity-50', 'cursor-not-allowed');
                        mainSubmitBtn.innerHTML = `
                            <svg class="w-7 h-7 transition-transform group-hover:rotate-12 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                            <span>Confirm & Submit To Lab</span>
                        `;
                    }
                }
            }

            if (form) {
                form.addEventListener('submit', function(e) {
                    e.preventDefault();
                    if (mainSubmitBtn.disabled) return;

                    mainSubmitBtn.disabled = true;
                    mainSubmitBtn.innerHTML = '<span class="flex items-center justify-center gap-3"><svg class="animate-spin h-6 w-6" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Finalizing Submission...</span>';

                    var formData = new FormData(form);
                    var xhr = new XMLHttpRequest();
                    xhr.open('POST', form.getAttribute('action'));
                    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
                    xhr.setRequestHeader('Accept', 'application/json');

                    xhr.onreadystatechange = function() {
                        if (xhr.readyState !== 4) return;
                        if (xhr.status >= 200 && xhr.status < 300) {
                            window.location.href = "{{ route('admin.cases.index') }}";
                            return;
                        }
                        
                        mainSubmitBtn.disabled = false;
                        mainSubmitBtn.innerHTML = `
                            <svg class="w-7 h-7 transition-transform group-hover:rotate-12 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                            <span>Confirm & Submit To Lab</span>
                        `;
                        form.submit();
                    };
                    xhr.send(formData);
                });
            }
        });
    </script>
@endpush
