<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Analytics Report - {{ $stats['report_date'] }}</title>
    <style>
        @page { margin: 0; }
        body { 
            font-family: 'DejaVu Sans', sans-serif; 
            background-color: #060606; 
            color: #f5f5f5; 
            margin: 0; 
            padding: 40px; 
        }
        .header { 
            padding-bottom: 30px; 
            border-bottom: 2px solid #FACC15; 
            margin-bottom: 40px; 
            position: relative;
        }
        .header h1 { 
            margin: 0; 
            font-size: 32px; 
            font-weight: 900; 
            text-transform: uppercase; 
            letter-spacing: 2px;
            color: #ffffff;
        }
        .header p { 
            margin: 8px 0 0; 
            font-size: 11px; 
            color: #64748b; 
            text-transform: uppercase; 
            letter-spacing: 3px;
            font-weight: bold;
        }
        .report-meta {
            position: absolute;
            right: 0;
            top: 0;
            text-align: right;
        }
        .report-meta span {
            display: block;
            font-size: 10px;
            color: #FACC15;
            font-weight: bold;
        }

        .section-title { 
            font-size: 14px; 
            font-weight: 900; 
            text-transform: uppercase; 
            color: #ffffff;
            margin-bottom: 20px; 
            margin-top: 40px;
            letter-spacing: 2px;
            border-left: 5px solid #FACC15;
            padding-left: 15px;
        }

        /* Overview Cards Grid */
        .stats-grid { 
            width: 100%; 
            border-collapse: separate; 
            border-spacing: 15px; 
            margin-left: -15px;
            margin-right: -15px;
        }
        .stats-card { 
            background: #0c0c0c; 
            padding: 25px; 
            border-radius: 20px; 
            border: 1px solid rgba(255,255,255,0.05); 
            text-align: left;
        }
        .stats-card p { 
            margin: 0; 
            font-size: 9px; 
            color: #64748b; 
            text-transform: uppercase; 
            letter-spacing: 2px;
            font-weight: 900;
            margin-bottom: 10px;
        }
        .stats-card h2 { 
            margin: 0; 
            font-size: 32px; 
            font-weight: 900;
            color: #ffffff;
            line-height: 1;
        }
        .stats-card .today {
            display: inline-block;
            margin-top: 15px;
            font-size: 11px;
            color: #FACC15;
            font-weight: bold;
        }

        /* Table Styling */
        table.data-table { 
            width: 100%; 
            border-collapse: collapse; 
            background: #0c0c0c;
            border-radius: 25px;
            overflow: hidden;
            border: 1px solid rgba(255,255,255,0.05);
        }
        table.data-table th { 
            background: rgba(255,255,255,0.02);
            text-align: left; 
            font-size: 9px; 
            color: #64748b; 
            text-transform: uppercase; 
            padding: 15px 20px; 
            letter-spacing: 2px;
            font-weight: 900;
            border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        table.data-table td { 
            padding: 15px 20px; 
            font-size: 11px; 
            color: #cbd5e1;
            border-bottom: 1px solid rgba(255,255,255,0.03);
        }
        table.data-table tr:last-child td {
            border-bottom: none;
        }
        
        .badge {
            background: rgba(59,130,246,0.1);
            color: #60a5fa;
            padding: 4px 8px;
            border-radius: 6px;
            font-size: 9px;
            font-weight: 900;
            text-transform: uppercase;
        }
        
        .footer { 
            position: fixed; 
            bottom: 30px; 
            left: 40px; 
            right: 40px; 
            text-align: center; 
            font-size: 10px; 
            color: #475569; 
            border-top: 1px solid rgba(255,255,255,0.05); 
            padding-top: 20px; 
        }

        .page-break { page-break-after: always; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Analytics Report</h1>
        <p>BoneHard Surgical Planning Systems &bull; DATA-DRIVEN INSIGHTS & MONITORING</p>
        <div class="report-meta">
            <span>{{ $stats['report_date'] }}</span>
            <span style="color: #64748b; margin-top: 5px;">CONFIDENTIAL RECORD</span>
        </div>
    </div>

    <!-- Overview Stats -->
    <table class="stats-grid">
        <tr>
            <td width="50%">
                <div class="stats-card">
                    <p>Total Dashboard Visits</p>
                    <h2>{{ number_format($stats['dashboard_visits_total']) }}</h2>
                    <span class="today">TODAY: {{ number_format($stats['dashboard_visits_today']) }}</span>
                </div>
            </td>
            <td width="50%">
                <div class="stats-card">
                    <p>Total Website Visits</p>
                    <h2>{{ number_format($stats['website_visits_total']) }}</h2>
                    <span class="today">TODAY: {{ number_format($stats['website_visits_today']) }}</span>
                </div>
            </td>
        </tr>
        <tr>
            <td width="50%">
                <div class="stats-card">
                    <p>Total Unique Visitors</p>
                    <h2>{{ number_format($stats['unique_visitors']) }}</h2>
                    <span class="today">GLOBAL REACH</span>
                </div>
            </td>
            <td width="50%">
                <div class="stats-card">
                    <p>Conversion & Visits</p>
                    <h2>{{ number_format($stats['total_visits']) }}</h2>
                    <span class="today">TODAY: {{ number_format($stats['total_visits_today'] )}}</span>
                </div>
            </td>
        </tr>
    </table>

    <div class="section-title">Case Status Distribution</div>
    <table class="data-table">
        <thead>
            <tr>
                <th>Current Status</th>
                <th style="text-align: right;">Total Count</th>
            </tr>
        </thead>
        <tbody>
            @foreach($stats['case_stats'] as $case)
            <tr>
                <td style="font-weight: 900; color: #ffffff; text-transform: uppercase;">{{ $case->status }}</td>
                <td style="text-align: right; font-weight: 900; color: #FACC15; font-size: 14px;">{{ number_format($case->count) }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <div class="section-title">Engagement History (Last 7 Days)</div>
    <table class="data-table">
        <thead>
            <tr>
                <th>Activity Date</th>
                <th style="text-align: right;">Total Visits</th>
            </tr>
        </thead>
        <tbody>
            @foreach($stats['last_7_days'] as $day)
            <tr>
                <td>{{ $day['date'] }}</td>
                <td style="text-align: right; font-weight: 900; color: #ffffff;">{{ number_format($day['count']) }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <div class="page-break"></div>

    <div class="section-title">Content Analysis (Top Pages)</div>
    <table class="data-table">
        <thead>
            <tr>
                <th>Page Identity</th>
                <th style="text-align: right;">Total Access Hits</th>
            </tr>
        </thead>
        <tbody>
            @foreach($stats['top_pages'] as $page)
            <tr>
                <td style="font-weight: 900; color: #ffffff;">{{ $page->display_name }}</td>
                <td style="text-align: right; font-weight: 900; color: #3b82f6;">{{ number_format($page->total) }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <div class="section-title">User Engagement Analysis</div>
    <table class="data-table">
        <thead>
            <tr>
                <th>User Profile</th>
                <th>Favorite Area</th>
                <th style="text-align: center;">Sessions</th>
                <th style="text-align: right;">Activity Hits</th>
            </tr>
        </thead>
        <tbody>
            @foreach($stats['active_users'] as $user)
            <tr>
                <td>
                    <div style="font-weight: 900; color: #ffffff;">{{ $user->name }}</div>
                    <div style="font-size: 8px; color: #64748b; text-transform: uppercase; margin-top: 2px;">{{ $user->role }}</div>
                </td>
                <td><span class="badge">{{ $user->top_page }}</span></td>
                <td style="text-align: center; color: #FACC15; font-weight: bold;">{{ number_format($user->login_count) }}</td>
                <td style="text-align: right; font-weight: 900; color: #ffffff;">{{ number_format($user->total_activity) }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <div class="footer">
        <p>&copy; {{ date('Y') }} BoneHard Surgical Planning Systems. ALL RIGHTS RESERVED. CONFIDENTIAL INTERNAL DOCUMENT.</p>
    </div>
</body>
</html>
