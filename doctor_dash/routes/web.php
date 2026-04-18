<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\Admin\AssistantController;
use App\Http\Controllers\Admin\ChatController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\ExportController;
use App\Http\Controllers\CaseChatController;
use App\Http\Controllers\CaseNoteController;
use App\Models\Report;
use App\Http\Controllers\User\DashboardController as UserDashboardController;
use App\Http\Controllers\User\ReportController as UserReportController;
use App\Http\Controllers\User\ChatController as UserChatController;
use App\Http\Controllers\Admin\ReportController;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    $path = public_path('index.html');

    if (!file_exists($path)) {
        abort(404);
    }

    return response()->file($path, [
        'Content-Type' => 'text/html; charset=UTF-8',
    ]);
});

Route::get('/about', function () {
    $path = public_path('index.html');

    if (!file_exists($path)) {
        abort(404);
    }

    return response()->file($path, [
        'Content-Type' => 'text/html; charset=UTF-8',
    ]);
});

Route::redirect('/contact', '/');
Route::redirect('/upload-your-case', '/');
Route::redirect('/upload', '/');

// Frontend media assets served from project root
Route::get('/new_logo.png', function () {
    $path = base_path('../new_logo.png');

    if (!file_exists($path)) {
        abort(404);
    }

    $mime = File::mimeType($path) ?: 'image/png';

    return response()->file($path, [
        'Content-Type' => $mime,
    ]);
});

Route::get('/dental/{file}', function ($file) {
    $path = base_path('../dental/' . $file);

    if (!file_exists($path)) {
        abort(404);
    }

    $mime = File::mimeType($path) ?: 'image/png';

    return response()->file($path, [
        'Content-Type' => $mime,
    ]);
})->where('file', '.*');

Route::get('/hero.mp4', function () {
    $path = base_path('../hero.mp4');

    if (!file_exists($path)) {
        abort(404);
    }

    $mime = File::mimeType($path) ?: 'video/mp4';

    return response()->file($path, [
        'Content-Type' => $mime,
    ]);
});

Route::get('/works/{file}', function ($file) {
    $path = base_path('../works/' . $file);

    if (!file_exists($path)) {
        abort(404);
    }

    $mime = File::mimeType($path) ?: 'video/mp4';

    return response()->file($path, [
        'Content-Type' => $mime,
    ]);
})->where('file', '.*');

// Admin logo served from project root (Logo.svg)
Route::get('/admin-logo', function () {
    $path = base_path('../Logo.svg');

    if (!file_exists($path)) {
        abort(404);
    }

    $mime = File::mimeType($path) ?: 'image/svg+xml';

    return response()->file($path, [
        'Content-Type' => $mime,
    ]);
});

// Authentication
Route::get('/login', [AuthController::class, 'showLoginForm'])->name('login');
Route::post('/login', [AuthController::class, 'login'])->name('login.post');

Route::get('/register', [AuthController::class, 'showRegisterForm'])->name('register');
Route::post('/register', [AuthController::class, 'register'])->name('register.post');

// Password reset via OTP
Route::get('/password/forgot', [AuthController::class, 'showForgotPasswordForm'])->name('password.forgot');
Route::post('/password/forgot', [AuthController::class, 'sendResetOtp'])->name('password.otp.send');

Route::get('/password/otp', [AuthController::class, 'showOtpForm'])->name('password.otp.form');
Route::post('/password/otp', [AuthController::class, 'verifyOtp'])->name('password.otp.verify');
Route::post('/password/otp/resend', [AuthController::class, 'resendOtp'])->name('password.otp.resend');

Route::get('/password/reset', [AuthController::class, 'showResetForm'])->name('password.reset.form');
Route::post('/password/reset', [AuthController::class, 'resetPassword'])->name('password.reset');

Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

// Auth status for frontend (BoneHard) to know if user is logged in
Route::get('/auth/status', [AuthController::class, 'status'])->name('auth.status');

// Global 1-minute JS Tracking
Route::post('/analytics/track-engagement', [\App\Http\Controllers\Admin\AnalyticsController::class, 'trackEngagement'])
    ->middleware(['web', 'throttle:60,1'])
    ->name('analytics.track-engagement');

// Admin & assistants area
Route::middleware(['auth', 'role:admin,assistant,admin_assistant'])

    ->prefix('admin')
    ->name('admin.')
    ->group(function () {
        Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
        Route::get('/stats', [DashboardController::class, 'stats'])->name('stats');

        // Exports for dashboard cards + full dashboard summary
        Route::get('/export/dashboard', [ExportController::class, 'dashboardSummary'])->name('export.dashboard');
        Route::get('/export/users', [ExportController::class, 'users'])->name('export.users');
        Route::get('/export/admins', [ExportController::class, 'admins'])->name('export.admins');
        Route::get('/export/assistants', [ExportController::class, 'assistants'])->name('export.assistants');
        Route::get('/export/visits', [ExportController::class, 'visits'])->name('export.visits');

        Route::get('/analytics', [\App\Http\Controllers\Admin\AnalyticsController::class, 'index'])->name('analytics.index');
        Route::get('/analytics/export', [\App\Http\Controllers\Admin\AnalyticsController::class, 'export'])->name('analytics.export');
        Route::get('/analytics/user-activity/{user}', [\App\Http\Controllers\Admin\AnalyticsController::class, 'userActivity'])->name('analytics.user-activity');

        Route::get('/users', [UserController::class, 'index'])->name('users.index');
        Route::patch('/users/{user}/role', [UserController::class, 'updateRole'])->name('users.updateRole');
        Route::get('/users/{user}', [UserController::class, 'show'])->name('users.show');
        Route::get('/users/{user}/reports', [UserController::class, 'reports'])->name('users.reports');
        Route::patch('/users/{user}/reports/review', [UserController::class, 'setUserReportsReview'])->name('users.reports.review');
        Route::patch('/reports/{report}/review', [UserController::class, 'toggleReportReview'])->name('reports.review');

        Route::get('/cases', [ReportController::class, 'index'])->name('cases.index');
        Route::get('/cases/create', [ReportController::class, 'create'])->name('cases.create');
        Route::post('/cases', [ReportController::class, 'store'])->name('cases.store');
        Route::post('/cases/upload-temp', [ReportController::class, 'uploadTemp'])->name('cases.upload-temp');
        Route::get('/cases/batch/{batch_id}', [ReportController::class, 'batch'])->name('cases.batch');
        Route::post('/cases/{batchId}/upload-additional', [ReportController::class, 'uploadAdditional'])->name('cases.upload-additional');
        Route::post('/cases/{batchId}/submit-response', [ReportController::class, 'submitResponse'])->name('cases.submit-response');
        Route::patch('/cases/{report}/status', [ReportController::class, 'updateStatus'])->name('cases.updateStatus');
        Route::get('/cases/{report}/download', [ReportController::class, 'download'])->name('cases.download');
        Route::get('/cases/batch/{batchId}/download', [ReportController::class, 'downloadBatch'])->name('cases.downloadBatch');
        Route::get('/cases/{report}/preview', [ReportController::class, 'preview'])->name('cases.preview');

        Route::get('/assistants', [AssistantController::class, 'index'])->name('assistants.index');
        Route::post('/assistants', [AssistantController::class, 'store'])->name('assistants.store');

        // Chats with assistants
        Route::get('/chats/assistants', [ChatController::class, 'assistants'])->name('chats.assistants');
        Route::get('/chats/assistants/{assistant}', [ChatController::class, 'assistantConversation'])->name('chats.assistants.show');
        Route::post('/chats/assistants/{assistant}', [ChatController::class, 'sendToAssistant'])->name('chats.assistants.send');
        Route::get('/chats/assistants/{assistant}/messages', [ChatController::class, 'assistantMessages'])->name('chats.assistants.messages');

        // Chats with users
        Route::get('/chats/users', [ChatController::class, 'users'])->name('chats.users');
        Route::get('/chats/users/{user}', [ChatController::class, 'userConversation'])->name('chats.users.show');
        Route::post('/chats/users/{user}', [ChatController::class, 'sendToUser'])->name('chats.users.send');
        Route::get('/chats/users/{user}/messages', [ChatController::class, 'userMessages'])->name('chats.users.messages');

        // Group chats with users (user-doctors groups)
        Route::get('/chats/groups', [ChatController::class, 'userGroups'])->name('chats.groups');
        Route::get('/chats/groups/{user}', [ChatController::class, 'userGroupConversation'])->name('chats.groups.show');
        Route::post('/chats/groups/{user}', [ChatController::class, 'sendToUserGroup'])->name('chats.groups.send');
        Route::get('/chats/groups/{user}/messages', [ChatController::class, 'userGroupMessages'])->name('chats.groups.messages');

        // Notifications for admins and assistants
        Route::get('/notifications', [ChatController::class, 'notifications'])->name('notifications.index');
        Route::post('/notifications/mark-all-read', [ChatController::class, 'markAllNotificationsAsRead'])->name('notifications.mark-all-read');
        Route::post('/notifications/mark-read/{notification}', [ChatController::class, 'markNotificationAsRead'])->name('notifications.mark-read');
        Route::delete('/notifications/clear-all', [ChatController::class, 'clearAllNotifications'])->name('notifications.clear-all');
    });

// User dashboard area
Route::middleware(['auth', 'role:user'])
    ->prefix('user')
    ->name('user.')
    ->group(function () {
        Route::get('/', [UserDashboardController::class, 'index'])->name('dashboard');

        // Reports
        Route::get('/reports', [UserReportController::class, 'index'])->name('reports.index');
        Route::get('/reports/create', [UserReportController::class, 'create'])->name('reports.create');
        Route::post('/reports', [UserReportController::class, 'store'])->name('reports.store');
        Route::post('/reports/upload-temp', [UserReportController::class, 'uploadTemp'])->name('reports.upload-temp');
        Route::get('/reports/batch/{batch_id}', [UserReportController::class, 'show'])->name('reports.show');
        Route::post('/reports/{batchId}/upload-additional', [UserReportController::class, 'uploadAdditional'])->name('reports.upload-additional');
        Route::get('/reports/{report}/edit', [UserReportController::class, 'edit'])->name('reports.edit');
        Route::put('/reports/{report}', [UserReportController::class, 'update'])->name('reports.update');
        Route::get('/reports/{report}/download', [UserReportController::class, 'download'])->name('reports.download');
        Route::get('/reports/{report}/preview', [UserReportController::class, 'preview'])->name('reports.preview');
        Route::get('/reports/batch/{batchId}/download', [UserReportController::class, 'downloadBatch'])->name('reports.downloadBatch');
        Route::delete('/reports/{report}', [UserReportController::class, 'destroy'])->name('reports.destroy');

        // Chats with doctors (admins + assistants)
        Route::get('/chats/doctors', [UserChatController::class, 'doctors'])->name('chats.doctors');
        Route::get('/chats/doctors/{doctor}', [UserChatController::class, 'doctorConversation'])->name('chats.doctors.show');
        Route::post('/chats/doctors/{doctor}', [UserChatController::class, 'sendToDoctor'])->name('chats.doctors.send');
        Route::get('/chats/doctors/{doctor}/messages', [UserChatController::class, 'doctorMessages'])->name('chats.doctors.messages');

        // Group chat with all doctors
        Route::get('/chats/group', [UserChatController::class, 'groupConversation'])->name('chats.group');
        Route::post('/chats/group', [UserChatController::class, 'sendToGroup'])->name('chats.group.send');
        Route::get('/chats/group/messages', [UserChatController::class, 'groupMessages'])->name('chats.group.messages');

        // User notifications
        Route::get('/notifications', [UserChatController::class, 'notifications'])->name('notifications.index');
        Route::get('/notifications/recent', [UserChatController::class, 'recentNotifications'])->name('notifications.recent');
        Route::post('/notifications/mark-all-read', [UserChatController::class, 'markAllNotificationsAsRead'])->name('notifications.mark-all-read');
        Route::post('/notifications/mark-read/{notification}', [UserChatController::class, 'markNotificationAsRead'])->name('notifications.mark-read');
        Route::delete('/notifications/clear-all', [UserChatController::class, 'clearAllNotifications'])->name('notifications.clear-all');
    });

Route::middleware(['auth'])
    ->group(function () {
        Route::get('/case/{batchId}/chat/messages', [CaseChatController::class, 'messages'])->name('case.chat.messages');
        Route::post('/case/{batchId}/chat/send', [CaseChatController::class, 'send'])->name('case.chat.send');
        Route::post('/case/{batchId}/notes', [CaseNoteController::class, 'store'])->name('case.notes.store');
        Route::put('/case-notes/{note}', [CaseNoteController::class, 'update'])->name('case.notes.update');
        Route::get('/case-notes/{note}/edit', [CaseNoteController::class, 'edit'])->name('case.notes.edit');
        Route::delete('/case-notes/{note}', [CaseNoteController::class, 'destroy'])->name('case.notes.destroy');
        Route::post('/case-files/{batch_id}/upload', [App\Http\Controllers\CaseFileController::class, 'store'])->name('case.files.upload');
        Route::patch('/case-files/{report}/rename', [App\Http\Controllers\CaseFileController::class, 'rename'])->name('case.files.rename');
        Route::delete('/case-files/{report}', [App\Http\Controllers\CaseFileController::class, 'destroy'])->name('case.files.destroy');
        Route::get('/case-files/{report}/preview', [App\Http\Controllers\CaseFileController::class, 'preview'])->name('case.files.preview');
        Route::get('/case-files/{report}/download', [App\Http\Controllers\CaseFileController::class, 'download'])->name('case.files.download');
        Route::post('/reports/{report}/generate-link', [UserReportController::class, 'generateFileLink'])->name('reports.generate-link');
        Route::post('/reports/batch/{batchId}/generate-link', [UserReportController::class, 'generateBatchLink'])->name('reports.batch.generate-link');
    });

// Publicly accessible shared routes (protected by signatures)
Route::get('/reports/shared/{batchId}/{fileId}', [UserReportController::class, 'sharedFile'])->name('reports.file.shared');
Route::get('/reports/shared/{batchId}/{fileId}/preview', [UserReportController::class, 'sharedPreview'])->name('reports.file.preview');
Route::get('/reports/shared/batch/{batchId}', [UserReportController::class, 'sharedBatch'])->name('reports.batch.shared');




Route::get('/storage/{path}', function (string $path) {
    $normalized = str_replace('\\', '/', $path);
    $normalized = ltrim($normalized, '/');

    if ($normalized === '' || str_contains($normalized, '..')) {
        abort(404);
    }

    $fullPath = storage_path('app/public/' . $normalized);

    if (!file_exists($fullPath) || is_dir($fullPath)) {
        abort(404);
    }

    $mime = File::mimeType($fullPath) ?: 'application/octet-stream';

    // Look up the report to get its original name and intended mime type
    $report = \App\Models\Report::where('file_path', $normalized)->first();

    if ($report && $report->original_name) {
        return response()->download($fullPath, $report->original_name, [
            'Content-Type' => $report->mime_type ?: $mime,
            'Cache-Control' => 'public, max-age=86400',
        ]);
    }

    return response()->file($fullPath, [
        'Content-Type' => $mime,
        'Cache-Control' => 'public, max-age=86400',
    ]);
})->where('path', '.*');

// Temporary route to clear cache on host
Route::get('/clear-cache', function() {
    \Illuminate\Support\Facades\Artisan::call('optimize:clear');
    return 'Cache cleared successfully!';
});
