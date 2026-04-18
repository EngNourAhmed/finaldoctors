<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Case Submission - {{ $clinical_data['patient_info']['name'] ?? 'Case' }}</title>
    <style>
        @page { margin: 0; background-color: #0c0c0c; }
        body { font-family: 'DejaVu Sans', sans-serif; color: #ffffff; margin: 0; padding: 0; background-color: #0c0c0c; }
        .container { padding: 40px; }
        .header { border-left: 6px solid #FACC15; padding-left: 20px; margin-bottom: 40px; }
        .header h1 { margin: 0; color: #FACC15; text-transform: uppercase; font-size: 28px; letter-spacing: 2px; }
        .header p { margin: 5px 0 0; color: #666; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; }
        
        .section { margin-bottom: 30px; }
        .section-title { color: #FACC15; font-size: 14px; font-weight: 900; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 15px; padding-bottom: 8px; border-bottom: 1px solid rgba(255, 255, 255, 0.1); }
        .card { background-color: #111111; border-radius: 16px; padding: 25px; border: 1px solid rgba(255, 255, 255, 0.05); }
        
        .grid { width: 100%; border-collapse: collapse; }
        .grid td { padding: 10px 0; vertical-align: top; }
        .label { color: #888; font-size: 10px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; width: 30%; }
        .value { color: #fff; font-size: 13px; font-weight: 500; }
        
        .services-grid { margin-top: 10px; }
        .service-tag { 
            display: inline-block; 
            background: rgba(250, 204, 21, 0.1); 
            color: #FACC15; 
            padding: 5px 12px; 
            border-radius: 8px; 
            font-size: 11px; 
            font-weight: bold; 
            margin: 0 8px 8px 0;
            border: 1px solid rgba(250, 204, 21, 0.2);
        }
        
        .description-box { 
            background-color: rgba(255, 255, 255, 0.02); 
            border-radius: 12px; 
            padding: 20px; 
            font-size: 13px; 
            line-height: 1.6; 
            color: #ddd; 
            border: 1px solid rgba(255, 255, 255, 0.05); 
            white-space: pre-wrap;
        }
        
        .file-list { margin-top: 10px; }
        .file-item { padding: 12px; background: rgba(255, 255, 255, 0.03); border-radius: 10px; margin-bottom: 8px; font-size: 11px; border: 1px solid rgba(255, 255, 255, 0.05); }
        .file-name { color: #FACC15; font-weight: bold; }
        
        .footer { position: fixed; bottom: 40px; left: 40px; right: 40px; text-align: center; font-size: 9px; color: #444; border-top: 1px solid rgba(255, 255, 255, 0.05); padding-top: 20px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Case Submission</h1>
            <p>Official Record &bull; Batch ID: {{ substr($batch_id, 0, 8) }} &bull; {{ date('Y-m-d H:i') }}</p>
        </div>

        <div style="width: 100%; display: table; margin-bottom: 30px;">
            <div style="display: table-row;">
                <!-- Patient Information -->
                <div style="display: table-cell; width: 48%; vertical-align: top;">
                    <div class="section-title">Patient Information</div>
                    <div class="card">
                        <table class="grid">
                            <tr><td class="label">Patient Name</td><td class="value">{{ $clinical_data['patient_info']['name'] ?? 'N/A' }}</td></tr>
                            <tr><td class="label">Submission Date</td><td class="value">{{ $clinical_data['patient_info']['case_date'] ?? date('Y-m-d') }}</td></tr>
                        </table>
                    </div>
                </div>
                <div style="display: table-cell; width: 4%;"></div>
                <!-- Doctor Information -->
                <div style="display: table-cell; width: 48%; vertical-align: top;">
                    <div class="section-title">Doctor Information</div>
                    <div class="card">
                        <table class="grid">
                            <tr><td class="label">Doctor</td><td class="value">{{ $clinical_data['doctor_info']['name'] ?? 'N/A' }}</td></tr>
                            <tr><td class="label">Contact</td><td class="value">{{ $clinical_data['doctor_info']['email'] ?? '' }}<br>{{ $clinical_data['doctor_info']['phone'] ?? '' }}</td></tr>
                            <tr><td class="label">Office Address</td><td class="value">{{ $clinical_data['doctor_info']['clinic_address'] ?? 'N/A' }}</td></tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <!-- Services Requested -->
        <div class="section">
            <div class="section-title">Services Requested</div>
            <div class="card">
                <div class="services-grid">
                    @if(!empty($clinical_data['case_overview']['services']))
                        @foreach($clinical_data['case_overview']['services'] as $service)
                            @if($service !== 'Other')
                                <span class="service-tag">{{ $service }}</span>
                            @endif
                        @endforeach
                    @endif
                    
                    @if(!empty($clinical_data['case_overview']['services_other']))
                        <span class="service-tag">Other: {{ $clinical_data['case_overview']['services_other'] }}</span>
                    @endif
                </div>
            </div>
        </div>

        <!-- Clinical & Implant Specifications -->
        <div class="section">
            <div class="section-title">Clinical & Implant Specifications</div>
            <div class="card">
                <table class="grid">
                    <tr>
                        <td class="label">Implant Brand</td>
                        <td class="value">
                            {{ $clinical_data['implant_system']['brand'] ?? 'Not Specified' }}
                        </td>
                        @if(!empty($clinical_data['case_overview']['implants_planned']))
                        <td class="label">Implants Count</td>
                        <td class="value">{{ $clinical_data['case_overview']['implants_planned'] }} Units</td>
                        @endif
                    </tr>
                </table>
            </div>
        </div>

        <!-- Case Description & Prescription -->
        <div class="section">
            <div class="section-title">Description & Prescription</div>
            <div class="description-box" style="direction: ltr; text-align: left;">
                {{ $description ?: 'No additional description provided.' }}
            </div>
        </div>

        @if(!empty($uploaded_files))
        <div class="section">
            <div class="section-title">Attached Records ({{ count($uploaded_files) }})</div>
            <div class="file-list">
                @foreach($uploaded_files as $file)
                <div class="file-item">
                    <span class="file-name">{{ $file['original_name'] }}</span>
                    <span style="color: #666; margin-left: 10px;">• Category: {{ $file['category'] ?? 'General' }}</span>
                </div>
                @endforeach
            </div>
        </div>
        @endif

        <div class="footer">
            <p>Signature: {{ $clinical_data['prescription']['signature'] ?? 'ELECTRONICALLY SIGNED' }}</p>
            <p>This document is an automated clinical record generated by BoneHard Surgical Planning Systems. CONFIDENTIAL.</p>
        </div>
    </div>
</body>
</html>
