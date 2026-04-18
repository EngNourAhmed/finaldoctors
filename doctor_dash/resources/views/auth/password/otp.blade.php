<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Enter code | BoneHard</title>
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700&family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    <style>
        body {
            font-family: "IBM Plex Sans", "IBM Plex Sans Arabic", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }
    </style>
</head>

<body class="min-h-screen bg-black text-white flex items-center justify-center px-4" style="background: radial-gradient(1200px 600px at 18% 0%, rgba(255,255,255,0.06), transparent 60%), radial-gradient(900px 500px at 85% 20%, rgba(255,255,255,0.04), transparent 65%), #060606;">
    <div class="w-full max-w-md">
        <div class="mb-8 text-center"></div>
        <div class="border border-white/15 rounded-2xl shadow-xl p-6 sm:p-8 backdrop-blur" style="background: linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02)); box-shadow: 0 18px 55px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06);">
            <h1 class="text-2xl font-semibold mb-2">Check your email</h1>
            <p class="text-sm text-slate-300 mb-2">We have sent a 6-digit code to <span class="font-semibold">{{ $email }}</span>.</p>
            <p class="text-xs text-slate-400 mb-6">Enter the code below. The code is valid for 2 minutes.</p>

            @if (session('status'))
                <div class="mb-4 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-xs text-emerald-200">
                    {{ session('status') }}
                </div>
            @endif

            @if ($errors->any())
                <div class="mb-4 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs text-red-200">
                    <ul class="list-disc list-inside space-y-1">
                        @foreach ($errors->all() as $error)
                            <li>{{ $error }}</li>
                        @endforeach
                    </ul>
                </div>
            @endif

            <form action="{{ route('password.otp.verify') }}" method="POST" class="space-y-4">
                @csrf
                <input type="hidden" name="email" value="{{ $email }}">
                <div>
                    <label for="code" class="block text-sm mb-1">6-digit code</label>
                    <input id="code" name="code" type="text" inputmode="numeric" pattern="[0-9]{6}" maxlength="6" required 
                        class="w-full tracking-[0.35em] text-center rounded-lg border border-white/15 bg-black/40 px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/30 placeholder:text-white/40">
                </div>
                <button type="submit" class="btn btn-white w-full mt-2">
                    Verify code
                </button>
            </form>

            <div class="mt-6 flex items-center justify-between text-xs text-slate-400">
                <span id="bh-otp-timer" data-remaining="{{ $remainingSeconds }}"></span>
                <button type="submit" form="bh-otp-resend-form" id="bh-otp-resend-btn" 
                    class="btn btn-black btn-sm mt-2">Resend code</button>
            </div>

            <form method="POST" action="{{ route('password.otp.resend') }}" id="bh-otp-resend-form" class="hidden">
                @csrf
                <input type="hidden" name="email" value="{{ $email }}">
            </form>

            <div class="mt-8 pt-6 border-t border-white/5 text-center">
                <p class="text-xs text-slate-300">
                    Remembered your password?
                    <a href="{{ route('login') }}" class="text-white hover:text-white/90 font-medium">Back to login</a>
                </p>
            </div>
        </div>
    </div>

    <script>
        (function () {
            var timerEl = document.getElementById('bh-otp-timer');
            var resendBtn = document.getElementById('bh-otp-resend-btn');
            var remaining = parseInt(timerEl?.getAttribute('data-remaining') || '0', 10);

            function formatSeconds(sec) {
                var m = Math.floor(sec / 60);
                var s = sec % 60;
                return (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s);
            }

            function tick() {
                if (!timerEl) return;

                if (remaining > 0) {
                    timerEl.textContent = 'Code expires in ' + formatSeconds(remaining);
                    if (resendBtn) {
                        resendBtn.disabled = true;
                    }
                    remaining -= 1;
                    setTimeout(tick, 1000);
                } else {
                    timerEl.textContent = 'You can request a new code.';
                    if (resendBtn) {
                        resendBtn.disabled = false;
                    }
                }
            }

            if (timerEl) {
                tick();
            }
        })();
    </script>
</body>

</html>
