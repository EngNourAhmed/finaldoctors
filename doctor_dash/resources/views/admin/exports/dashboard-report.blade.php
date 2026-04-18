<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <title>BoneHard Admin Report</title>
    <style>
        @page {
            margin: 26px 30px;
        }

        body {
            font-family: DejaVu Sans, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
            background: #050505;
            color: #f5f5f5;
            font-size: 11px;
        }

        .page {
            background: #000000;
            border-radius: 18px;
            border: 1px solid rgba(255, 255, 255, 0.18);
            padding: 20px 20px 18px 20px;
        }

        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 16px;
        }

        .brand {
            font-weight: 700;
            letter-spacing: 0.18em;
            text-transform: uppercase;
            font-size: 10px;
            color: #facc15;
        }

        .badge {
            display: inline-block;
            padding: 3px 10px;
            border-radius: 999px;
            border: 1px solid rgba(250, 204, 21, 0.65);
            background: rgba(250, 204, 21, 0.10);
            color: #fef9c3;
            font-size: 9px;
            letter-spacing: 0.16em;
            text-transform: uppercase;
        }

        h1 {
            font-size: 16px;
            margin: 0 0 2px 0;
        }

        .muted {
            color: #9ca3af;
            font-size: 9px;
        }

        .grid {
            display: table;
            width: 100%;
            table-layout: fixed;
            border-spacing: 10px 0;
            margin: 10px -10px 4px -10px;
        }

        .grid-row {
            display: table-row;
        }

        .card {
            display: table-cell;
            vertical-align: top;
            padding: 12px 14px;
            border-radius: 14px;
            border: 1px solid rgba(255, 255, 255, 0.12);
            background: #111111;
        }

        .card-title {
            text-transform: uppercase;
            letter-spacing: 0.18em;
            font-size: 8px;
            color: #9ca3af;
        }

        .card-main {
            font-size: 20px;
            font-weight: 600;
            margin-top: 6px;
        }

        .card-sub {
            font-size: 9px;
            color: #6b7280;
            margin-top: 2px;
        }

        .section-title {
            font-size: 10px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.14em;
            margin-top: 24px;
            margin-bottom: 8px;
            color: #facc15;
            border-bottom: 1px solid rgba(250, 204, 21, 0.25);
            padding-bottom: 5px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 4px;
        }

        th,
        td {
            padding: 5px 6px;
            font-size: 9px;
        }

        thead th {
            text-align: left;
            border-bottom: 1px solid rgba(148, 163, 184, 0.4);
            color: #9ca3af;
            text-transform: uppercase;
            letter-spacing: 0.12em;
        }

        tbody tr:nth-child(even) {
            background: rgba(255, 255, 255, 0.05);
        }

        tbody tr:nth-child(odd) {
            background: rgba(255, 255, 255, 0.02);
        }

        tbody td {
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .chip {
            display: inline-block;
            padding: 2px 8px;
            border-radius: 999px;
            font-size: 8px;
            border: 1px solid rgba(148, 163, 184, 0.8);
        }

        .chip-admin {
            border-color: #facc15;
            color: #facc15;
        }

        .chip-assistant {
            border-color: #ffffff;
            color: #ffffff;
        }

        .footer {
            margin-top: 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 8px;
            color: #6b7280;
        }
    </style>
</head>

<body>
    <div class="page">
        <div class="header">
            <div>
                <div class="brand">BONEHARD ADMIN</div>
                <h1>Dashboard & Analytics Report</h1>
                <div class="muted">
                    Generated at {{ $generatedAt }} by {{ $generatedBy ?? 'System' }}
                </div>
            </div>
            <div style="text-align: right;">
                <div class="badge">INTERNAL USE</div>
                <div class="muted" style="margin-top: 5px;">
                    Period: Last 7 days snapshot
                </div>
            </div>
        </div>

        <div class="grid">
            <div class="grid-row">
                <div class="card">
                    <div class="card-title">Total Users</div>
                    <div class="card-main">{{ $totalUsers }}</div>
                    <div class="card-sub">All registered accounts</div>
                </div>
                <div class="card">
                    <div class="card-title">Admins</div>
                    <div class="card-main">{{ $totalAdmins }}</div>
                    <div class="card-sub">Administrative & medical staff</div>
                </div>
                <div class="card">
                    <div class="card-title">Assistants</div>
                    <div class="card-main">{{ $totalAssistants }}</div>
                    <div class="card-sub">BoneHard assistants</div>
                </div>
            </div>
        </div>

        <div class="grid" style="margin-top: 10px;">
            <div class="grid-row">
                <div class="card" style="width: 60%;">
                    <div class="card-title">Case distribution summary</div>
                    <div class="card-main" style="font-size: 14px; margin-top: 10px; color: #facc15;">
                        @foreach($caseStats->take(3) as $stat)
                            <div style="margin-bottom: 4px; display: inline-block; margin-right: 15px;">
                                <span class="muted" style="font-size: 8px;">{{ $stat->status }}:</span> 
                                <span>{{ $stat->count }}</span>
                            </div>
                        @endforeach
                    </div>
                </div>
                <div class="card">
                    <div class="card-title">Visits (Today)</div>
                    <div class="card-main">{{ $todayVisits }}</div>
                    <div class="card-sub">Total visits: {{ $totalVisits }}</div>
                </div>
            </div>
        </div>

        <div class="section-title">Detailed case status analytics</div>
        <table>
            <thead>
                <tr>
                    <th style="width: 70%;">Status</th>
                    <th style="text-align: right;">Total Count</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($caseStats as $stat)
                    <tr>
                        <td>{{ $stat->status }}</td>
                        <td style="text-align: right;">{{ $stat->count }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>

        <div class="section-title">Traffic analytics</div>
        <table>
            <thead>
                <tr>
                    <th style="width: 30%;">Metric</th>
                    <th style="width: 20%;">Total</th>
                    <th style="width: 20%;">Today</th>
                    <th>Notes</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>All visits</td>
                    <td>{{ $totalVisits }}</td>
                    <td>{{ $todayVisits }}</td>
                    <td>All tracked visits except technical `auth/status` pings.</td>
                </tr>
                <tr>
                    <td>Dashboard (admin area)</td>
                    <td>{{ $dashboardVisits }}</td>
                    <td>{{ $todayDashboardVisits }}</td>
                    <td>Traffic for `/admin` routes.</td>
                </tr>
                <tr>
                    <td>Public website</td>
                    <td>{{ $websiteVisits }}</td>
                    <td>{{ $todayWebsiteVisits }}</td>
                    <td>Landing / marketing pages.</td>
                </tr>
            </tbody>
        </table>

        <div class="section-title">Visits – last 7 days</div>
        <table>
            <thead>
                <tr>
                    <th style="width: 35%;">Date</th>
                    <th style="width: 20%;">Visits</th>
                    <th>Trend</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($last7Days as $row)
                    <tr>
                        <td>{{ $row->date }}</td>
                        <td>{{ $row->count }}</td>
                        <td>
                            @if ($row->count >= $last7Average)
                                Above 7-day average
                            @else
                                Below 7-day average
                            @endif
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>

        <div class="section-title">Top pages by traffic</div>
        <table>
            <thead>
                <tr>
                    <th style="width: 70%;">Page / Destination</th>
                    <th style="text-align: right;">Visits</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($topPaths as $index => $row)
                    <tr>
                        <td>{{ $topPathLabels[$index] ?? '/' . $row->path }}</td>
                        <td style="text-align: right;">{{ $row->count }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>

        <div class="section-title">New users (last 7 days)</div>
        <table>
            <thead>
                <tr>
                    <th style="width: 22%;">Name</th>
                    <th style="width: 18%;">Role</th>
                    <th style="width: 22%;">Phone</th>
                    <th style="width: 38%;">Address</th>
                </tr>
            </thead>
            <tbody>
                @forelse ($recentUsers as $user)
                    <tr>
                        <td>{{ $user->name }}</td>
                        <td>
                            @if ($user->role === 'admin')
                                <span class="chip chip-admin">Admin</span>
                            @elseif($user->role === 'assistant')
                                <span class="chip chip-assistant">Assistant</span>
                            @else
                                <span class="chip">User</span>
                            @endif
                        </td>
                        <td>{{ $user->phone ?? '-' }}</td>
                        <td>{{ $user->address ?? '-' }}</td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="4">No new users were registered in the selected period.</td>
                    </tr>
                @endforelse
            </tbody>
        </table>

        <div class="footer">
            <div>BoneHard Admin &mdash; internal analytics snapshot.</div>
            <div>Generated on {{ $generatedAt }}</div>
        </div>
    </div>
</body>

</html>

