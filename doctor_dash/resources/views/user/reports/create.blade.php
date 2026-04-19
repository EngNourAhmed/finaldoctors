@extends('layouts.user')

@section('title', 'Submit a Case')
@section('header', 'Submit a New Case')

@section('content')
    <div class="w-full mx-auto pb-20">
        <div class="rounded-3xl bg-[#0c0c0c] border border-white/10 p-6 md:p-10 text-sm bh-page-animate shadow-2xl relative overflow-hidden">
            <!-- Decorative Background Element -->
            <div class="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-[#FACC15] opacity-[0.03] rounded-full blur-3xl pointer-events-none"></div>
            
            <div class="flex items-center justify-between mb-8 relative">
                <div class="flex items-center gap-4">
                    <a href="{{ route('user.reports.index') }}" class="group flex items-center justify-center h-12 w-12 rounded-2xl bg-white/5 border border-white/10 hover:border-[#FACC15] hover:bg-white/10 transition-all shadow-lg" title="Back to My Cases">
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

            <form id="bh-upload-case-form" action="{{ route('user.reports.store') }}" method="POST" enctype="multipart/form-data" class="space-y-8">
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
                        
                        <!-- Fixed User Info (Doctor submitting) -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div class="space-y-2">
                                <label class="block text-[10px] font-black uppercase tracking-widest text-[#FACC15]">Submitting As</label>
                                <div class="w-full rounded-xl border border-white/5 bg-white/5 px-4 py-3 text-sm text-white/50 font-bold">
                                    {{ auth()->user()->name }} ({{ auth()->user()->email }})
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- STANDARD GENERAL FIELDS -->
                    <div id="standard-general-fields" class="grid grid-cols-1 md:grid-cols-2 gap-6 px-2 {{ in_array(request('type', 'full_arch'), ['full_arch', 'single_implant']) ? 'hidden' : '' }}">
                        <!-- Doctor Info -->
                        <div class="space-y-2">
                            <label class="block text-[10px] font-black uppercase tracking-widest text-white/40">Doctor Email</label>
                            <input type="email" name="doctor_email" value="{{ auth()->user()->email }}"
                                class="w-full rounded-xl border border-white/5 bg-white/5 px-4 py-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#FACC15] transition-all">
                        </div>
                        <div class="space-y-2">
                            <label class="block text-[10px] font-black uppercase tracking-widest text-white/40">Doctor Phone</label>
                            <input type="text" name="doctor_phone" value="{{ auth()->user()->phone }}"
                                class="w-full rounded-xl border border-white/5 bg-white/5 px-4 py-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#FACC15] transition-all">
                        </div>

                        <!-- Office Address -->
                        <div class="md:col-span-2 space-y-2">
                            <label class="block text-[10px] font-black uppercase tracking-widest text-white/40">Dentist Office Address</label>
                            <input type="text" name="clinic_address" placeholder="Enter dentist office address" value="{{ auth()->user()->address }}"
                                class="w-full rounded-xl border border-white/5 bg-white/5 px-4 py-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#FACC15] transition-all focus:bg-white/10">
                        </div>

                        <!-- Patient Name -->
                        <div class="md:col-span-2 space-y-2">
                            <label for="title_std" class="block text-[10px] font-black uppercase tracking-widest text-[#FACC15]">
                                Patient Name <span class="text-red-500">*</span>
                            </label>
                            <input id="title_std" name="patient_name" type="text" value="{{ old('patient_name') }}"
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
                                        <input type="text" name="doctor_first_name" value="{{ explode(' ', auth()->user()->name)[0] ?? '' }}" placeholder="First Name" class="w-full rounded border border-white/20 bg-transparent px-3 py-2 text-sm text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all">
                                        <span class="text-[10px] text-gray-400 mt-1 block">First Name</span>
                                    </div>
                                    <div>
                                        <input type="text" name="doctor_last_name" value="{{ explode(' ', auth()->user()->name)[1] ?? '' }}" placeholder="Last Name" class="w-full rounded border border-white/20 bg-transparent px-3 py-2 text-sm text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all">
                                        <span class="text-[10px] text-gray-400 mt-1 block">Last Name</span>
                                    </div>
                                </div>
                            </div>
                            <div class="hidden md:block"></div>

                            <!-- Doctor's Email & Phone -->
                            <div class="space-y-2">
                                <label class="block text-sm font-black text-white">Doctor's e-mail <span class="text-red-500">*</span></label>
                                <input type="email" name="doctor_email_full_arch" value="{{ auth()->user()->email }}" placeholder="example@example.com" class="w-full rounded border border-white/20 bg-transparent px-3 py-2 text-sm text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all">
                                <span class="text-[10px] text-gray-400 mt-1 block">example@example.com</span>
                            </div>
                            <div class="space-y-2">
                                <label class="block text-sm font-black text-white">Doctor's Phone Number <span class="text-red-500">*</span></label>
                                <input type="text" name="doctor_phone_full_arch" value="{{ auth()->user()->phone }}" placeholder="(000) 000-0000" class="w-full rounded border border-white/20 bg-transparent px-3 py-2 text-sm text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all">
                                <span class="text-[10px] text-gray-400 mt-1 block">Please enter a valid phone number.</span>
                            </div>

                            <!-- Dentist Office Address -->
                            <div class="md:col-span-2 space-y-2">
                                <label class="block text-sm font-black text-white">Dentist Office Address <span class="text-red-500">*</span></label>
                                <div class="space-y-4 w-full">
                                    <div>
                                        <input type="text" name="address_street" value="{{ auth()->user()->address }}" class="w-full rounded border border-white/20 bg-transparent px-3 py-2 text-sm text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all">
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
                                                <option value="US" selected>United States</option>
                                                <option value="CA">Canada</option>
                                                <option value="UK">United Kingdom</option>
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
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                            

                                <div class="space-y-4 md:col-span-2">
                                    <label class="block text-sm font-black text-white mb-4 uppercase tracking-[0.1em]">Services Needed <span class="text-red-500">*</span></label>
                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6">
                                        @php
                                            $services = [
                                                'BH Tooth supported Surgical Guide',
                                                'BH Bone supported Surgical Guide',
                                                'BH Tissue supported Surgical Guide',
                                                'BH Stackable Guide only',
                                                'BH Stackable Guide with immediate PMMA',
                                                'BH PMMA Temps',
                                                'BH Prosthetic Finals',
                                                'BH Tooth supported prosthesis',
                                                'BH Implant Supported prosthesis',
                                                'BH Full Arch Prosthesis',
                                                'BH Digital Smile Design',
                                                'BH Occlusal Appliance',
                                                'BH Maxillofacial Prosthesis',
                                                'BH Removable Dentures',
                                                'BH Consultations',
                                                'BH Printing Services',
                                            ];
                                        @endphp
                                        @foreach($services as $service)
                                            <label class="flex items-center gap-3 cursor-pointer group hover:bg-white/5 p-2 rounded-xl transition-all border border-transparent hover:border-white/5">
                                                <input type="checkbox" name="services[]" value="{{ $service }}" class="w-5 h-5 text-[#FACC15] bg-transparent border-2 border-white/20 rounded focus:ring-[#FACC15] focus:ring-offset-0 focus:ring-offset-transparent">
                                                <span class="text-sm font-bold text-white group-hover:text-[#FACC15] transition-colors">{{ $service }}</span>
                                            </label>
                                        @endforeach
                                        
                                        <!-- Other Service -->
                                        <div class="md:col-span-2 mt-2">
                                            <label class="flex items-center gap-3 cursor-pointer group p-2">
                                                <input type="checkbox" id="service_other_checkbox" name="services[]" value="Other" class="w-5 h-5 text-[#FACC15] bg-transparent border-2 border-white/20 rounded focus:ring-[#FACC15]">
                                                <span class="text-sm font-bold text-white uppercase tracking-wider">Other</span>
                                            </label>
                                            <div id="service_other_container" class="mt-3 ml-8 hidden">
                                                <input type="text" name="services_other" placeholder="Please specify other services..." class="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#FACC15] placeholder:text-white/20">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Single Implant Specific -->
                        <div id="single-implant-fields" class="space-y-4 {{ request('type') === 'single_implant' ? '' : 'hidden' }}">
                             <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                                 <div class="space-y-2">
                                     <label class="block text-[10px] font-black uppercase tracking-widest text-emerald-400">Total Implants <span class="text-red-500">*</span></label>
                                     <input type="number" name="implants_count" placeholder="e.g. 1" min="1"
                                         class="w-full rounded-xl border border-white/5 bg-white/5 px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all focus:bg-white/10 font-bold">
                                 </div>
 
                                 <div class="space-y-4 md:col-span-2">
                                     <label class="block text-[10px] font-black uppercase tracking-widest text-[#FACC15]">Select Services <span class="text-red-500">*</span></label>
                                     <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                                         @foreach(['BH Tooth supported Surgical Guide', 'BH Bone supported Surgical Guide', 'BH Tissue supported Surgical Guide', 'BH Stackable Guide only', 'BH Stackable Guide with immediate PMMA', 'BH PMMA Temps', 'BH Prosthetic Finals', 'BH Tooth supported prosthesis', 'BH Implant Supported prosthesis', 'BH Full Arch Prosthesis', 'BH Digital Smile Design', 'BH Occlusal Appliance', 'BH Maxillofacial Prosthesis', 'BH Removable Dentures', 'BH Consultations', 'BH Printing Services'] as $service)
                                            <label class="flex items-center p-3 rounded-xl border border-white/5 bg-white/5 cursor-pointer hover:bg-white/10 transition-all">
                                                <input type="checkbox" name="services[]" value="{{ $service }}" class="w-4 h-4 text-[#FACC15] bg-transparent border-2 border-white/20 rounded focus:ring-[#FACC15] mr-3">
                                                <span class="text-xs font-bold text-white">{{ $service }}</span>
                                            </label>
                                         @endforeach
                                     </div>
                                 </div>
                             </div>
                        </div>
                        
                        <!-- Extended Implant System -->
                        <div id="extended-implant-system" class="space-y-4 mt-4 w-full {{ in_array(request('type', 'full_arch'), ['full_arch', 'single_implant']) ? '' : 'hidden' }}">
                            <div class="space-y-2">
                                <label class="block text-sm font-black text-white uppercase tracking-wider">Implant System:</label>
                                <select id="implant_brand_full_arch" name="implant_brand_full_arch" class="w-full rounded border border-white/20 bg-[#111111] px-3 py-2 text-sm text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all appearance-none">
                                    <option value="">Please Select</option>
                                    <option value="AB Dent">AB Dent</option>
                                    <option value="Adin">Adin</option>
                                    <option value="Alpha Dent">Alpha Dent</option>
                                    <option value="Bicon">Bicon</option>
                                    <option value="Biohorizons">Biohorizons</option>
                                    <option value="Blue Sky Bio">Blue Sky Bio</option>
                                    <option value="Bredent">Bredent</option>
                                    <option value="Camlog">Camlog</option>
                                    <option value="Dentis">Dentis</option>
                                    <option value="Dentsply">Dentsply</option>
                                    <option value="Glidewell (Hahn)">Glidewell (Hahn)</option>
                                    <option value="Hahn">Hahn</option>
                                    <option value="Hiossen">Hiossen</option>
                                    <option value="Hi-Tech">Hi-Tech</option>
                                    <option value="Implant Direct">Implant Direct</option>
                                    <option value="Izen">Izen</option>
                                    <option value="Jdental">Jdental</option>
                                    <option value="Megagen">Megagen</option>
                                    <option value="MIS">MIS</option>
                                    <option value="Neo-Biotech">Neo-Biotech</option>
                                    <option value="Neodent">Neodent</option>
                                    <option value="Nobel BioCare">Nobel BioCare</option>
                                    <option value="Noris">Noris</option>
                                    <option value="NucleOSS">NucleOSS</option>
                                    <option value="Osstem">Osstem</option>
                                    <option value="Ritter">Ritter</option>
                                    <option value="Straumann">Straumann</option>
                                    <option value="Surgikor">Surgikor</option>
                                    <option value="ZimVie">ZimVie</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div id="implant_brand_other_container" class="space-y-2 hidden animate-in fade-in slide-in-from-top-1 duration-200">
                                <label class="block text-[10px] font-bold text-[#FACC15] uppercase tracking-widest pl-1">Specify Brand</label>
                                <input type="text" name="implant_brand_other" placeholder="Enter implant brand name" class="w-full rounded border border-white/20 bg-[#111111] px-3 py-2 text-sm text-white focus:border-[#FACC15] focus:ring-1 focus:ring-[#FACC15] transition-all">
                            </div>
                        </div>
                        
                        <!-- Standard Implant System -->
                        <div id="standard-implant-system" class="space-y-2 {{ in_array(request('type', 'full_arch'), ['full_arch', 'single_implant']) ? 'hidden' : '' }}">
                            <label class="block text-[10px] font-black uppercase tracking-widest text-emerald-400">Implant System <span class="text-red-500">*</span></label>
                            <input type="text" name="implant_brand" placeholder="e.g. Straumann, etc."
                                class="w-full rounded-xl border border-white/5 bg-white/5 px-4 py-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all focus:bg-white/10">
                        </div>

                        <!-- Full Arch Description -->
                        <div id="full-arch-description" class="grid grid-cols-1 md:grid-cols-2 gap-6 items-start {{ in_array(request('type', 'full_arch'), ['full_arch', 'single_implant']) ? '' : 'hidden' }}">
                            <div>
                                <label class="block text-sm font-black text-white">Case Description &<br>Prescription <span class="text-red-500">*</span></label>
                            </div>
                            <div>
                                <textarea name="description_full_arch" rows="5"
                                    class="w-full rounded border border-white/20 bg-transparent px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all resize-none"></textarea>
                                <span class="text-[10px] text-gray-400 mt-1 block">implant number, implant site, etc</span>
                            </div>
                        </div>

                        <!-- Standard Description -->
                        <div id="standard-description" class="space-y-3 {{ in_array(request('type', 'full_arch'), ['full_arch', 'single_implant']) ? 'hidden' : '' }}">
                            <label class="block text-[10px] font-black uppercase tracking-widest text-emerald-400">Case Description <span class="text-red-500">*</span></label>
                            <textarea name="description" rows="5"
                                placeholder="Details..."
                                class="w-full rounded-2xl border border-white/5 bg-white/5 px-4 py-4 text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all resize-none focus:bg-white/10">{{ old('description') }}</textarea>
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
                                    <div class="flex flex-col items-center justify-center gap-6 rounded-[32px] border-2 border-dashed border-white/10 bg-white/[0.02] px-10 py-16 hover:border-[#FACC15] hover:bg-white/5 transition-all group shadow-inner">
                                        <div class="h-20 w-20 rounded-[28px] bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-[#FACC15]/40 transition-all shadow-xl">
                                            <svg class="w-10 h-10 text-white/30 group-hover:text-[#FACC15]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3 3m0 0l-3-3m3 3V10" />
                                            </svg>
                                        </div>
                                        <p class="text-xl font-black text-white group-hover:text-[#FACC15] uppercase tracking-tight">Secure HIPAA Transfer</p>
                                    </div>
                                </label>
                            </div>
                            <div id="previews-standard" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4"></div>
                        </div>

                        <div id="full-arch-file-inputs" class="space-y-6 w-full {{ in_array(request('type', 'full_arch'), ['full_arch', 'single_implant']) ? '' : 'hidden' }}">
                            
                            <!-- DICOM -->
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                                <label class="block text-sm font-black text-white">Upload DICOM Files</label>
                                <div>
                                    <input id="files_dicom" type="file" multiple data-report-file-input data-category="dicom" data-preview-container="#previews-dicom" class="hidden">
                                    <label for="files_dicom" class="flex flex-col items-center justify-center p-4 border border-dashed border-white/10 bg-white/5 shadow-inner cursor-pointer hover:bg-white/10 transition-all h-24 relative overflow-hidden group rounded-2xl">
                                        <div class="absolute inset-x-0 bottom-0 h-1 bg-[#FACC15] scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                                        <svg class="w-6 h-6 text-white/40 mb-1 group-hover:text-[#FACC15]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3 3m0 0l-3-3m3 3V10"/></svg>
                                        <span class="text-xs font-black text-white">Browse Files</span>
                                    </label>
                                    <div id="previews-dicom" class="mt-4 space-y-3"></div>
                                </div>
                            </div>
                            
                            <!-- Dual Scan -->
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                                <label class="block text-sm font-black text-white">Dual Scan DICOM</label>
                                <div>
                                    <input id="files_dual" type="file" multiple data-report-file-input data-category="dual" data-preview-container="#previews-dual" class="hidden">
                                    <label for="files_dual" class="flex flex-col items-center justify-center p-4 border border-dashed border-white/10 bg-white/5 shadow-inner cursor-pointer hover:bg-white/10 h-24 relative overflow-hidden group rounded-2xl">
                                        <div class="absolute inset-x-0 bottom-0 h-1 bg-[#FACC15] scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                                        <svg class="w-6 h-6 text-white/40 mb-1 group-hover:text-[#FACC15]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3 3m0 0l-3-3m3 3V10"/></svg>
                                        <span class="text-xs font-black text-white">Browse Files</span>
                                    </label>
                                    <div id="previews-dual" class="mt-4 space-y-3"></div>
                                </div>
                            </div>

                            <!-- STL -->
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                                <label class="block text-sm font-black text-white">STL Files</label>
                                <div>
                                    <input id="files_stl" type="file" multiple data-report-file-input data-category="stl" data-preview-container="#previews-stl" class="hidden">
                                    <label for="files_stl" class="flex flex-col items-center justify-center p-4 border border-dashed border-white/10 bg-white/5 shadow-inner cursor-pointer hover:bg-white/10 h-24 relative overflow-hidden group rounded-2xl">
                                        <div class="absolute inset-x-0 bottom-0 h-1 bg-[#FACC15] scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                                        <svg class="w-6 h-6 text-white/40 mb-1 group-hover:text-[#FACC15]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3 3m0 0l-3-3m3 3V10"/></svg>
                                        <span class="text-xs font-black text-white">Browse Files</span>
                                    </label>
                                    <div id="previews-stl" class="mt-4 space-y-3"></div>
                                </div>
                            </div>

                            <!-- Photos -->
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                                <label class="block text-sm font-black text-white">Photos & Docs</label>
                                <div>
                                    <input id="files_photos" type="file" multiple data-report-file-input data-category="photos" data-preview-container="#previews-photos" class="hidden">
                                    <label for="files_photos" class="flex flex-col items-center justify-center p-4 border border-dashed border-white/10 bg-white/5 h-24 relative overflow-hidden group rounded-2xl">
                                        <div class="absolute inset-x-0 bottom-0 h-1 bg-[#FACC15] scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                                        <svg class="w-6 h-6 text-white/40 mb-1 group-hover:text-[#FACC15]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3 3m0 0l-3-3m3 3V10"/></svg>
                                        <span class="text-xs font-black text-white">Browse Files</span>
                                    </label>
                                    <div id="previews-photos" class="mt-4 space-y-3"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- SECTION 4: AUTHORIZATION (REMOVED AS PER REQUEST) -->
                
                <div class="pt-6 relative text-center">
                    <button type="submit" id="main-submit-btn"
                        class="relative w-full text-center py-5 rounded-2xl bg-[#FACC15] text-black text-sm font-black uppercase tracking-[0.3em] flex items-center justify-center gap-4 hover:bg-[#F5C211] transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed">
                        <span id="btn-text">Submit Case</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
@endsection

@push('styles')
<style>
/* Simplified CSS for rounded dark inputs */
input[type="radio"], input[type="checkbox"] {
    cursor: pointer;
}
#bh-upload-case-form select {
    background-color: #000000 !important;
}
</style>
@endpush

@push('scripts')
    <script>
        function toggleSections(val) {
            const sections = {
                fullArch: document.getElementById('full-arch-fields'),
                singleImplant: document.getElementById('single-implant-fields'),
                fullArchGeneral: document.getElementById('full-arch-general-fields'),
                standardGeneral: document.getElementById('standard-general-fields'),
                fullArchDescription: document.getElementById('full-arch-description'),
                standardDescription: document.getElementById('standard-description'),
                standardImplantSystem: document.getElementById('standard-implant-system'),
                standardFileInputs: document.getElementById('standard-file-inputs'),
                fullArchFileInputs: document.getElementById('full-arch-file-inputs'),
                standardTerms: document.getElementById('standard-terms'),
                fullArchTerms: document.getElementById('full-arch-terms'),
                extendedImplantSystem: document.getElementById('extended-implant-system')
            };
            
            if (val === 'full_arch' || val === 'single_implant') {
                if (sections.fullArch) sections.fullArch.classList.toggle('hidden', val !== 'full_arch');
                if (sections.singleImplant) sections.singleImplant.classList.toggle('hidden', val !== 'single_implant');
                if (sections.fullArchGeneral) sections.fullArchGeneral.classList.remove('hidden');
                if (sections.standardGeneral) sections.standardGeneral.classList.add('hidden');
                if (sections.fullArchDescription) sections.fullArchDescription.classList.remove('hidden');
                if (sections.standardDescription) sections.standardDescription.classList.add('hidden');
                if (sections.standardImplantSystem) sections.standardImplantSystem.classList.add('hidden');
                if (sections.standardFileInputs) sections.standardFileInputs.classList.add('hidden');
                if (sections.fullArchFileInputs) sections.fullArchFileInputs.classList.remove('hidden');
                if (sections.standardTerms) sections.standardTerms.classList.add('hidden');
                if (sections.fullArchTerms) sections.fullArchTerms.classList.remove('hidden');
                if (sections.extendedImplantSystem) sections.extendedImplantSystem.classList.remove('hidden');
            } else {
                Object.keys(sections).forEach(key => {
                    if (sections[key]) {
                        if (key.includes('standard')) sections[key].classList.remove('hidden');
                        else sections[key].classList.add('hidden');
                    }
                });
            }
        }

        document.addEventListener('DOMContentLoaded', function() {
            const caseTypeInput = document.getElementById('case_type');
            if (caseTypeInput) toggleSections(caseTypeInput.value);

            // Toggle "Other" service field
            const otherCheckbox = document.getElementById('service_other_checkbox');
            const otherContainer = document.getElementById('service_other_container');
            if (otherCheckbox && otherContainer) {
                otherCheckbox.addEventListener('change', function() {
                    otherContainer.classList.toggle('hidden', !this.checked);
                });
            }

            // Toggle "Other" implant brand field
            const implantBrandSelect = document.getElementById('implant_brand_full_arch');
            const implantBrandOtherContainer = document.getElementById('implant_brand_other_container');
            if (implantBrandSelect && implantBrandOtherContainer) {
                implantBrandSelect.addEventListener('change', function() {
                    implantBrandOtherContainer.classList.toggle('hidden', this.value !== 'Other');
                });
            }

            const form = document.getElementById('bh-upload-case-form');
            const mainSubmitBtn = document.getElementById('main-submit-btn');
            let activeUploads = 0;

            const submitLoadingSpinner = `
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            `;

            function updateSubmitButtonState() {
                if (activeUploads > 0) {
                    mainSubmitBtn.disabled = true;
                    mainSubmitBtn.classList.add('opacity-50');
                    mainSubmitBtn.innerHTML = submitLoadingSpinner + '<span>UPLOADING...</span>';
                } else {
                    mainSubmitBtn.disabled = false;
                    mainSubmitBtn.classList.remove('opacity-50');
                    mainSubmitBtn.innerHTML = 'SUBMIT CASE';
                }
            }

            form.addEventListener('submit', function() {
                mainSubmitBtn.disabled = true;
                mainSubmitBtn.classList.add('opacity-50');
                mainSubmitBtn.innerHTML = submitLoadingSpinner + '<span>SUBMITTING...</span>';
            });

            form.addEventListener('change', function(e) {
                if (e.target && e.target.matches('[data-report-file-input]')) {
                    if (!e.target.files.length) return;
                    Array.from(e.target.files).forEach(file => {
                        startIndividualUpload(file, e.target);
                    });
                }
            });

            function startIndividualUpload(file, input) {
                activeUploads++;
                updateSubmitButtonState();
                
                const category = input.getAttribute('data-category') || 'general';
                const previewContainer = document.querySelector(input.getAttribute('data-preview-container') || '#previews-standard');

                const fileId = 'file-' + Math.random().toString(36).substr(2, 9);
                const wrapper = document.createElement('div');
                wrapper.className = 'rounded-xl border border-white/10 bg-white/5 p-3 flex items-center justify-between mb-2 shadow-sm';
                
                const lastDot = file.name.lastIndexOf('.');
                const nameOnly = lastDot !== -1 ? file.name.substring(0, lastDot) : file.name;
                const extOnly = lastDot !== -1 ? file.name.substring(lastDot) : '';

                wrapper.innerHTML = `
                    <div class="flex-1 min-w-0 mr-4">
                        <div class="flex items-center">
                            <input type="text" id="rename-${fileId}" class="w-full bg-transparent border-b border-white/10 text-[11px] text-white font-bold px-1 py-0.5 focus:outline-none focus:border-[#FACC15] transition-all" value="${nameOnly}" disabled>
                            <span class="text-[11px] text-white/50 font-bold ml-1">${extOnly}</span>
                        </div>
                    </div>
                    <div class="flex items-center gap-3">
                        <span id="prog-${fileId}" class="text-[9px] text-[#FACC15] uppercase font-black tracking-tighter animate-pulse text-right w-16">0%</span>
                        <button type="button" class="p-1.5 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm" id="del-${fileId}" title="Remove">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                        </button>
                    </div>
                `;
                if (previewContainer) previewContainer.appendChild(wrapper);

                const xhr = new XMLHttpRequest();
                
                document.getElementById('del-' + fileId).onclick = function() {
                    xhr.abort();
                    wrapper.remove();
                    // Clean up hidden inputs if they were already added
                    form.querySelectorAll(`[data-file-id="${fileId}"]`).forEach(el => el.remove());
                };

                const formData = new FormData();
                formData.append('file', file);
                formData.append('_token', '{{ csrf_token() }}');

                xhr.upload.addEventListener('progress', e => {
                    if (e.lengthComputable) {
                        const percent = Math.round((e.loaded / e.total) * 100);
                        const p = document.getElementById('prog-' + fileId);
                        if (p) {
                            p.textContent = percent + '%';
                            if (percent === 100) p.textContent = 'PRCSSING';
                        }
                    }
                });

                xhr.onreadystatechange = function() {
                    if (xhr.readyState === 4) {
                        activeUploads = Math.max(0, activeUploads - 1);
                        updateSubmitButtonState();
                        if (xhr.status === 200) {
                            const resp = JSON.parse(xhr.responseText);
                            const suffix = resp.path.replace(/\./g, '_');
                            form.insertAdjacentHTML('beforeend', `
                                <input type="hidden" name="temp_paths[]" value="${resp.path}" data-file-id="${fileId}">
                                <input type="hidden" name="categories[${suffix}]" value="${category}" data-file-id="${fileId}">
                                <input type="hidden" id="orig-${suffix}" name="original_names[${suffix}]" value="${resp.original_name}" data-file-id="${fileId}">
                                <input type="hidden" name="mime_types[${suffix}]" value="${resp.mime_type}" data-file-id="${fileId}">
                                <input type="hidden" name="sizes[${suffix}]" value="${resp.size}" data-file-id="${fileId}">
                            `);
                            const p = document.getElementById('prog-' + fileId);
                            if (p) { 
                                p.textContent = 'READY'; 
                                p.classList.remove('animate-pulse');
                                p.classList.replace('text-[#FACC15]', 'text-emerald-400'); 
                            }
                            const renameInput = document.getElementById('rename-' + fileId);
                            if (renameInput) {
                                renameInput.disabled = false;
                                renameInput.addEventListener('input', function() {
                                    const hiddenInput = document.getElementById('orig-' + suffix);
                                    if (hiddenInput) hiddenInput.value = this.value + extOnly;
                                });
                            }
                        } else if (xhr.status !== 0) { // status 0 means aborted
                            const p = document.getElementById('prog-' + fileId);
                            if (p) { p.textContent = 'FAILED'; p.classList.replace('text-[#FACC15]', 'text-red-500'); }
                        }
                    }
                };


                // Form submission loading state
                form.addEventListener('submit', function(e) {
                    if (activeUploads > 0) {
                        e.preventDefault();
                        alert('Please wait for all files to finish uploading.');
                        return;
                    }
                    
                    mainSubmitBtn.disabled = true;
                    mainSubmitBtn.classList.add('opacity-70');
                    mainSubmitBtn.innerHTML = `
                        <svg class="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Submitting Case...</span>
                    `;
                });

                xhr.open('POST', "{{ route('user.reports.upload-temp') }}");
                xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
                xhr.send(formData);
            }
        });
    </script>
@endpush
