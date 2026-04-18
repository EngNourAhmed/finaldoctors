<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Register | BoneHard</title>
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700&family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    <style>
        body {
            font-family: "IBM Plex Sans", "IBM Plex Sans Arabic", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }
        /* Hide browser default password reveal button */
        input::-ms-reveal,
        input::-ms-clear {
            display: none;
        }
    </style>
</head>

<body class="min-h-screen bg-black text-white flex items-center justify-center px-4" style="background: radial-gradient(1200px 600px at 18% 0%, rgba(255,255,255,0.06), transparent 60%), radial-gradient(900px 500px at 85% 20%, rgba(255,255,255,0.04), transparent 65%), #060606;">
    <div class="w-full max-w-md">
        <div class="mb-8 text-center">
        </div>
        <div class="border border-white/15 rounded-2xl shadow-xl p-6 sm:p-8 backdrop-blur" style="background: linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02)); box-shadow: 0 18px 55px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06);">
            <h1 class="text-2xl font-semibold mb-2">Create an account</h1>
            <p class="text-sm text-slate-300 mb-6">Join BoneHard doctors dashboard to manage your cases and requests.</p>
            @if ($errors->any())
                <div class="mb-4 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs text-red-200">
                    <ul class="list-disc list-inside space-y-1">
                        @foreach ($errors->all() as $error)
                            <li>{{ $error }}</li>
                        @endforeach
                    </ul>
                </div>
            @endif

            <form id="register-form" action="{{ route('register.post') }}" method="POST" class="space-y-4">
                @csrf
                <div>
                    <label for="name" class="block text-sm mb-1">Full name</label>
                    <input id="name" name="name" type="text" required autocomplete="name" value="{{ old('name') }}" class="w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/30 placeholder:text-white/40">
                </div>
                <div>
                    <label for="email" class="block text-sm mb-1">Email</label>
                    <input id="email" name="email" type="email" required autocomplete="email" value="{{ old('email') }}" class="w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/30 placeholder:text-white/40">
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div class="relative">
                        <label for="password" class="block text-sm mb-1">Password</label>
                        <div class="relative">
                            <input id="password" name="password" type="password" required autocomplete="new-password" class="w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/30 placeholder:text-white/40 pr-10">
                            <button type="button" onclick="togglePassword('password')" class="absolute inset-y-0 right-0 flex items-center pr-3 text-white/70 hover:text-white transition-colors z-20 bg-transparent border-none outline-none">
                                <svg id="password-hide" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                <svg id="password-show" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7 1.274-4.057-5.064-7 9.542-7 1.225 0 2.37.22 3.42.615m4.73 4.73C20.575 10.895 21 12 21 12c-1.274 4.057-5.064 7-9.542 7-1.225 0-2.37-.22-3.42-.615M9.88 9.88l4.24 4.24M3 3l18 18" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div class="relative">
                        <label for="password_confirmation" class="block text-sm mb-1">Confirm password</label>
                        <div class="relative">
                            <input id="password_confirmation" name="password_confirmation" type="password" required autocomplete="new-password" class="w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/30 placeholder:text-white/40 pr-10">
                            <button type="button" onclick="togglePassword('password_confirmation')" class="absolute inset-y-0 right-0 flex items-center pr-3 text-white/70 hover:text-white transition-colors z-20 bg-transparent border-none outline-none">
                                <svg id="password_confirmation-hide" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                <svg id="password_confirmation-show" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7 1.274-4.057-5.064-7 9.542-7 1.225 0 2.37.22 3.42.615m4.73 4.73C20.575 10.895 21 12 21 12c-1.274 4.057-5.064 7-9.542 7-1.225 0-2.37-.22-3.42-.615M9.88 9.88l4.24 4.24M3 3l18 18" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <script>
                    function togglePassword(id) {
                        const input = document.getElementById(id);
                        const hideIcon = document.getElementById(id + '-hide');
                        const showIcon = document.getElementById(id + '-show');
                        if (input.type === 'password') {
                            input.type = 'text';
                            hideIcon.classList.add('hidden');
                            showIcon.classList.remove('hidden');
                        } else {
                            input.type = 'password';
                            hideIcon.classList.remove('hidden');
                            showIcon.classList.add('hidden');
                        }
                    }
                </script>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                        <label for="address" class="block text-sm mb-1">Address (optional)</label>
                        <input id="address" name="address" type="text" value="{{ old('address') }}" class="w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/30 placeholder:text-white/40" placeholder="Dubai, UAE">
                    </div>
                    <div>
                        <label for="phone" class="block text-sm mb-1">Phone number</label>
                        <input id="phone" name="phone" type="tel" value="{{ old('phone') }}" pattern="^\+?[0-9]{9,15}$" class="w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/30 placeholder:text-white/40" placeholder="+971501234567">
                    </div>
                </div>
                <div class="flex items-start gap-2 text-xs text-slate-300">
                    <input id="terms" type="checkbox" required class="mt-1 rounded border-white/20 bg-black text-white focus:ring-white/30">
                    <label for="terms">I agree to the processing of my data according to BoneHard's privacy policy.</label>
                </div>
                <button type="submit" id="submit-btn" class="btn btn-white w-full mt-2 relative overflow-hidden group">
                    <span class="btn-text">Create account</span>
                    <div class="btn-spinner hidden absolute inset-0 flex items-center justify-center bg-white">
                        <svg class="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span class="ml-2 text-sm font-semibold">Processing...</span>
                    </div>
                </button>
            </form>
            <script>
                document.getElementById('register-form').addEventListener('submit', function() {
                    const btn = document.getElementById('submit-btn');
                    const text = btn.querySelector('.btn-text');
                    const spinner = btn.querySelector('.btn-spinner');
                    
                    btn.disabled = true;
                    text.classList.add('invisible');
                    spinner.classList.remove('hidden');
                });
            </script>

            <p class="mt-6 text-xs text-center text-slate-300">
                Already have an account?
                <a href="{{ route('login') }}" class="text-white hover:text-white/90 font-medium">Sign in</a>
            </p>
        </div>

        <div class="mb-8 text-center">
        </div>
    </div>
</body>

</html>