<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Surgical Plan - {{ $title }}</title>
    <style>
        /* DejaVu Sans supports a wide range of characters including Arabic */
        @page {
            margin: 0;
            background-color: #0c0c0c;
        }
        body {
            font-family: 'DejaVu Sans', 'Helvetica', sans-serif;
            color: #ffffff;
            line-height: 1.5;
            margin: 0;
            padding: 0;
            background-color: #0c0c0c;
        }
        .container {
            padding: 40px;
        }
        .header {
            border-left: 6px solid #FACC15;
            padding-left: 20px;
            margin-bottom: 40px;
        }
        .header h1 {
            margin: 0;
            color: #FACC15;
            text-transform: uppercase;
            font-size: 24px;
            letter-spacing: 1px;
        }
        .header p {
            margin: 5px 0 0;
            color: #999;
            font-size: 14px;
            font-weight: 500;
        }
        .card {
            background-color: #111111;
            border: 1px solid rgba(255, 255, 255, 0.05);
            border-radius: 20px;
            padding: 25px;
            margin-bottom: 25px;
        }
        .card-header {
            margin-bottom: 20px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            padding-bottom: 15px;
        }
        .step-num {
            background-color: rgba(250, 204, 21, 0.1);
            color: #FACC15;
            padding: 4px 10px;
            border-radius: 8px;
            font-size: 12px;
            font-weight: bold;
            margin-right: 10px;
        }
        .card-title {
            color: #ffffff;
            font-size: 14px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 2px;
        }
        .grid {
            width: 100%;
            border-collapse: collapse;
        }
        .grid td {
            padding: 8px 0;
            vertical-align: top;
        }
        .label {
            color: #FACC15;
            font-size: 10px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            width: 35%;
        }
        .value {
            color: #ffffff;
            font-size: 13px;
        }
        .description-box {
            color: #ffffff;
            font-size: 13px;
            white-space: pre-wrap;
            background: rgba(255, 255, 255, 0.02);
            padding: 15px;
            border-radius: 12px;
            border: 1px solid rgba(255, 255, 255, 0.05);
            /* Handle Arabic RTL */
            direction: rtl;
            text-align: right;
        }
        .attachment-list {
            margin: 0;
            padding: 0;
            list-style: none;
        }
        .attachment-item {
            padding: 8px 12px;
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.05);
            border-radius: 8px;
            margin-bottom: 8px;
            display: block;
        }
        .attachment-link {
            color: #FACC15;
            text-decoration: none;
            font-size: 12px;
            font-weight: bold;
        }
        .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid rgba(255, 255, 255, 0.05);
            text-align: center;
            color: #666;
            font-size: 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Surgical Plan Summary</h1>
            <p>Premium Surgical Planning Center &bull; Case ID: {{ strtoupper(substr(md5(time()), 0, 8)) }}</p>
        </div>

        <div class="card">
            <div class="card-header">
                <span class="step-num">01</span>
                <span class="card-title">General Information</span>
            </div>
            <table class="grid">
                <tr>
                    <td class="label">Patient Name</td>
                    <td class="value">{{ $title }}</td>
                </tr>
                <tr>
                    <td class="label">Report Created</td>
                    <td class="value">{{ date('Y-m-d \a\t h:i A') }}</td>
                </tr>
            </table>
        </div>

        <div class="card">
            <div class="card-header">
                <span class="step-num">02</span>
                <span class="card-title">Clinician Details</span>
            </div>
            <table class="grid">
                <tr>
                    <td class="label">Doctor Name</td>
                    <td class="value">Dr. {{ ($clinical_data['doctor_first_name'] ?? '') . ' ' . ($clinical_data['doctor_last_name'] ?? '') }}</td>
                </tr>
                <tr>
                    <td class="label">Email Address</td>
                    <td class="value">{{ $clinical_data['doctor_email'] ?? 'N/A' }}</td>
                </tr>
                <tr>
                    <td class="label">Office Address</td>
                    <td class="value">
                        {{ $clinical_data['address_street'] ?? '' }}<br>
                        {{ $clinical_data['address_city'] ?? '' }}, {{ $clinical_data['address_state'] ?? '' }} {{ $clinical_data['address_zip'] ?? '' }}
                    </td>
                </tr>
            </table>
        </div>

        <div class="card">
            <div class="card-header">
                <span class="step-num">03</span>
                <span class="card-title">Clinical Specifications</span>
            </div>
            <table class="grid">
                @if(!empty($implants_count))
                <tr>
                    <td class="label">Planned Implants</td>
                    <td class="value">{{ $implants_count }} Units</td>
                </tr>
                @endif
                <tr>
                    <td class="label">Implant Brand</td>
                    <td class="value">{{ $implant_brand ?? 'N/A' }}</td>
                </tr>
                <tr>
                    <td class="label">Service Package</td>
                    <td class="value" style="color: #FACC15;">{{ str_replace('_', ' ', $clinical_data['package'] ?? 'N/A') }}</td>
                </tr>
            </table>
        </div>


        <div class="card">
            <div class="card-header">
                <span class="step-num">04</span>
                <span class="card-title">Clinical Instructions</span>
            </div>
            <div class="description-box">{{ $description ?: 'No additional clinical instructions provided.' }}</div>
        </div>

        <div class="footer">
            <p>CONFIDENTIAL: This document contains sensitive clinical data intended only for the treatment of public health patients.</p>
            <p>&copy; {{ date('Y') }} Premium Surgical Planning Center. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
