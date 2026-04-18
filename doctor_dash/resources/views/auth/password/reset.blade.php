<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Reset password | BoneHard</title>
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
            <h1 class="text-2xl font-semibold mb-2">Set a new password</h1>
            <p class="text-sm text-slate-300 mb-4">For account <span class="font-semibold">{{ $email }}</span>.</p>

            @if ($errors->any())
                <div class="mb-4 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs text-red-200">
                    <ul class="list-disc list-inside space-y-1">
                        @foreach ($errors->all() as $error)
                            <li>{{ $error }}</li>
                        @endforeach
                    </ul>
                </div>
            @endif

            @if (session('status'))
                <div class="mb-4 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-xs text-emerald-200">
                    {{ session('status') }}
                </div>
            @endif

            <form action="{{ route('password.reset') }}" method="POST" class="space-y-4">
                @csrf
                <div>
                    <label for="password" class="block text-sm mb-1">New password</label>
                    <input id="password" name="password" type="password" required autocomplete="new-password" 
                        class="w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/30 placeholder:text-white/40">
                </div>
                <div>
                    <label for="password_confirmation" class="block text-sm mb-1">Confirm new password</label>
                    <input id="password_confirmation" name="password_confirmation" type="password" required autocomplete="new-password" 
                        class="w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/30 placeholder:text-white/40">
                </div>
                <button type="submit" class="btn btn-white w-full mt-2">
                    Save new password
                </button>
            </form>

            <div class="mt-8 pt-6 border-t border-white/5 text-center">
                <p class="text-xs text-slate-300">
                    Remembered your password?
                    <a href="{{ route('login') }}" class="text-white hover:text-white/90 font-medium">Back to login</a>
                </p>
            </div>
        </div>
    </div>
</body>

</html>
