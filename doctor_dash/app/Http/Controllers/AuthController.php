<?php

namespace App\Http\Controllers;

use App\Mail\PasswordOtpMail;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class AuthController extends Controller
{
    public function showLoginForm()
    {
        return view('auth.login');
    }

    public function showRegisterForm()
    {
        return view('auth.register');
    }

    public function register(Request $request)
    {
        $request->merge([
            'name' => is_string($request->input('name')) ? trim($request->input('name')) : $request->input('name'),
            'email' => is_string($request->input('email')) ? trim($request->input('email')) : $request->input('email'),
            'phone' => is_string($request->input('phone')) ? trim($request->input('phone')) : $request->input('phone'),
        ]);

        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
            'address' => ['nullable', 'string', 'max:255'],
            'phone' => ['required', 'string', 'max:20', 'regex:/^\+?[0-9]{9,15}$/'],
        ]);

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'role' => 'user',
            'address' => $data['address'] ?? null,
            'phone' => $data['phone'],
        ]);

        // بعد إنشاء الحساب، لا نقوم بتسجيل الدخول تلقائياً
        // نعيد توجيه المستخدم إلى صفحة تسجيل الدخول مع رسالة نجاح
        return redirect()
            ->route('login')
            ->with('status', 'Account created successfully. Please log in.');
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

        $remember = $request->boolean('remember');

        if (Auth::attempt($credentials, $remember)) {
            $request->session()->regenerate();
            $user = Auth::user();

            // Record this as a login event in the visits table
            try {
                \App\Models\Visit::create([
                    'user_id' => $user->id,
                    'is_login' => true,
                    'ip_address' => $request->ip(),
                    'path' => $request->path(),
                    'user_agent' => substr((string) $request->userAgent(), 0, 1000),
                ]);
            } catch (\Throwable $e) {}

            $redirectTo = in_array($user->role, ['admin', 'assistant', 'admin_assistant'], true)
                ? route('admin.dashboard')
                : route('user.dashboard');


            return redirect()->intended($redirectTo);
        }

        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ])->onlyInput('email');
    }

    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }

    public function status(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            return response()->json([
                'authenticated' => false,
            ]);
        }

        $redirectTo = in_array($user->role, ['admin', 'assistant', 'admin_assistant'], true)
            ? '/admin'
            : '/user';


        return response()->json([
            'authenticated' => true,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
            ],
            'redirect_url' => $redirectTo,
        ]);
    }

    // Password reset via OTP

    public function showForgotPasswordForm()
    {
        return view('auth.password.forgot');
    }

    public function sendResetOtp(Request $request)
    {
        $data = $request->validate([
            'email' => ['required', 'email', 'exists:users,email'],
        ]);

        $email = $data['email'];
        $user = User::where('email', $email)->first();

        $otp = (string) random_int(100000, 999999);

        DB::table('password_reset_tokens')->updateOrInsert(
            ['email' => $email],
            [
                'token' => Hash::make($otp),
                'created_at' => now(),
            ]
        );

        // إرسال الكود عبر الإيميل
        try {
            Mail::to($email)->send(new PasswordOtpMail($otp));
        } catch (\Throwable $e) {
            // في وضع التطوير قد لا يكون الإيميل مهيئاً، لذا نتجاهل الخطأ ونكمل
        }

        // لتسهيل الاختبار في بيئة التطوير، نظهر الكود في الجلسة
        if (app()->environment('local')) {
            $request->session()->flash('debug_otp', $otp);
        }

        $request->session()->put('password_reset_email', $email);

        return redirect()->route('password.otp.form', ['email' => $email])
            ->with('status', 'We have sent a 6-digit code to your email. The code is valid for 2 minutes.');
    }

    public function showOtpForm(Request $request)
    {
        $email = $request->query('email') ?: $request->session()->get('password_reset_email');

        if (!$email) {
            return redirect()->route('password.forgot')->withErrors([
                'email' => 'Please enter your email first.',
            ]);
        }

        $record = DB::table('password_reset_tokens')->where('email', $email)->first();

        $remainingSeconds = 0;

        if ($record && $record->created_at) {
            $createdAt = Carbon::parse($record->created_at);
            $age = now()->diffInSeconds($createdAt);
            $remainingSeconds = max(0, 120 - $age);
        }

        return view('auth.password.otp', [
            'email' => $email,
            'remainingSeconds' => $remainingSeconds,
        ]);
    }

    public function verifyOtp(Request $request)
    {
        $data = $request->validate([
            'email' => ['required', 'email', 'exists:users,email'],
            'code' => ['required', 'string', 'size:6'],
        ]);

        $email = $data['email'];
        $code = $data['code'];

        $record = DB::table('password_reset_tokens')->where('email', $email)->first();

        if (!$record) {
            return back()->withErrors([
                'code' => 'No active code found for this email. Please request a new one.',
            ])->withInput();
        }

        $createdAt = Carbon::parse($record->created_at);
        if ($createdAt->addMinutes(2)->isPast()) {
            return back()->withErrors([
                'code' => 'This code has expired. Please request a new one.',
            ])->withInput();
        }

        if (!Hash::check($code, $record->token)) {
            return back()->withErrors([
                'code' => 'The code you entered is incorrect.',
            ])->withInput();
        }

        // اعتبار الإيميل موثّق لعملية إعادة التعيين
        $request->session()->put('password_reset_email_verified', $email);

        // يمكن حذف السجل حتى لا يُستخدم مرة أخرى
        DB::table('password_reset_tokens')->where('email', $email)->delete();

        return redirect()->route('password.reset.form')
            ->with('status', 'Code verified. You can now set a new password.');
    }

    public function resendOtp(Request $request)
    {
        $email = $request->input('email') ?: $request->session()->get('password_reset_email');

        if (!$email) {
            return redirect()->route('password.forgot')->withErrors([
                'email' => 'Please enter your email first.',
            ]);
        }

        $record = DB::table('password_reset_tokens')->where('email', $email)->first();

        if ($record && $record->created_at) {
            $createdAt = Carbon::parse($record->created_at);
            if ($createdAt->addMinutes(2)->isFuture()) {
                return back()->withErrors([
                    'code' => 'A code was already sent. Please wait until it expires before requesting a new one.',
                ]);
            }
        }

        // إعادة إرسال كود جديد
        $otp = (string) random_int(100000, 999999);

        DB::table('password_reset_tokens')->updateOrInsert(
            ['email' => $email],
            [
                'token' => Hash::make($otp),
                'created_at' => now(),
            ]
        );

        try {
            Mail::to($email)->send(new PasswordOtpMail($otp));
        } catch (\Throwable $e) {
            // نتجاهل أي خطأ في الإرسال
        }

        if (app()->environment('local')) {
            $request->session()->flash('debug_otp', $otp);
        }

        $request->session()->put('password_reset_email', $email);

        return back()->with('status', 'A new code has been sent to your email.');
    }

    public function showResetForm(Request $request)
    {
        $email = $request->session()->get('password_reset_email_verified');

        if (!$email) {
            return redirect()->route('password.forgot')->withErrors([
                'email' => 'Please verify your email with a code first.',
            ]);
        }

        return view('auth.password.reset', [
            'email' => $email,
        ]);
    }

    public function resetPassword(Request $request)
    {
        $email = $request->session()->get('password_reset_email_verified');

        if (!$email) {
            return redirect()->route('password.forgot')->withErrors([
                'email' => 'Please verify your email with a code first.',
            ]);
        }

        $data = $request->validate([
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        $user = User::where('email', $email)->first();

        if (!$user) {
            return redirect()->route('password.forgot')->withErrors([
                'email' => 'User not found.',
            ]);
        }

        $user->password = Hash::make($data['password']);
        $user->save();

        // تنظيف الحالة
        $request->session()->forget('password_reset_email_verified');
        $request->session()->forget('password_reset_email');
        DB::table('password_reset_tokens')->where('email', $email)->delete();

        return redirect()->route('login')->with('status', 'Password reset successfully. Please log in with your new password.');
    }
}
