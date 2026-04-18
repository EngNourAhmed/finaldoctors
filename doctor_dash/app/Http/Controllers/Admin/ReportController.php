<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Report;
use App\Notifications\ReportStatusUpdated;

use Illuminate\Http\Request;

class ReportController extends Controller
{
    public function create(Request $request)
    {
        $selectedUserId = $request->query('user_id');
        $doctors = \App\Models\User::whereIn('role', ['assistant', 'admin_assistant'])->orderBy('name')->get();
        return view('admin.cases.create', compact('doctors', 'selectedUserId'));
    }

    public function store(Request $request)
    {
        $rules = [
            'user_id' => 'nullable|exists:users,id',
            'reply_to' => 'nullable|string',
            'case_type' => 'required|string|in:full_arch,single_implant,multiple_implants,treatment_planning,radiology_report',
            'arch_type' => 'nullable|string|in:mandible,maxilla,both,upper,lower',
            'implants_count' => 'nullable|integer|min:1|max:20',
            'temp_paths' => 'nullable|array',
            'temp_paths.*' => 'nullable|string',
            'original_names' => 'nullable|array',
            'mime_types' => 'nullable|array',
            'sizes' => 'nullable|array',
        ];

        if (!in_array($request->case_type, ['full_arch', 'single_implant'])) {
            $rules['title'] = 'required|string|max:255';
        }

        $request->validate($rules);

        try {
            $batchId = $request->reply_to ?? (string)\Illuminate\Support\Str::uuid();
            $reports = [];
            
            // Handle different fields based on case type
            if ($request->case_type === 'full_arch' || $request->case_type === 'single_implant') {
                $title = trim($request->patient_first_name . ' ' . $request->patient_last_name);
                if (empty($title)) {
                    $title = 'Full Arch Case ' . date('Y-m-d');
                }
                $description = $request->description_full_arch;
                $package = $request->package_full_arch;
                $implantBrand = $request->implant_brand_full_arch;

                $clinicalData = [
                    'doctor_first_name' => $request->doctor_first_name,
                    'doctor_last_name' => $request->doctor_last_name,
                    'doctor_email' => $request->doctor_email_full_arch,
                    'doctor_phone' => $request->doctor_phone_full_arch,
                    'address_street' => $request->address_street,
                    'address_city' => $request->address_city,
                    'address_state' => $request->address_state,
                    'address_zip' => $request->address_zip,
                    'address_country' => $request->address_country,
                    'patient_first_name' => $request->patient_first_name,
                    'patient_last_name' => $request->patient_last_name,
                    'package' => $request->case_type === 'full_arch' ? $request->package_full_arch : $request->package,
                    'parts_acknowledgement' => $request->case_type === 'full_arch' ? (bool)$request->parts_acknowledgement_full_arch : (bool)$request->parts_acknowledgement,
                ];
                
                if ($request->case_type === 'single_implant') {
                    $description = $request->description_full_arch;
                    $implantBrand = $request->implant_brand_full_arch;
                }
            } else {
                $title = $request->title;
                $description = $request->description;
                $package = $request->package;
                $implantBrand = $request->implant_brand;

                $clinicalData = [
                    'package' => $package,
                    'prosthesis_exists' => $request->prosthesis_exists,
                    'parts_acknowledgement' => (bool)$request->parts_acknowledgement,
                    'signature' => $request->signature,
                    'address' => $request->address, // From form
                    'phone' => $request->phone,
                    'email' => $request->email,
                ];
            }

            if (empty($request->temp_paths)) {
                return back()->withErrors(['temp_paths' => 'Please upload at least one file before submitting.'])->withInput();
            }

            $uploadedFiles = [];
            foreach ($request->temp_paths as $tempPath) {
                if (empty($tempPath)) continue;

                $suffix = str_replace('.', '_', $tempPath);
                $originalName = $request->original_names[$suffix] ?? 'unknown';
                $mimeType = $request->mime_types[$suffix] ?? 'application/octet-stream';
                $size = $request->sizes[$suffix] ?? 0;

                $tempFullPath = storage_path('app/public/' . $tempPath);
                if (!file_exists($tempFullPath)) {
                    // Try without public just in case
                    $tempFullPath = storage_path('app/' . $tempPath);
                }

                if (!file_exists($tempFullPath)) {
                    \Illuminate\Support\Facades\Log::warning("Temporary file not found during case submission: {$tempPath}");
                    continue; // Skip missing files instead of crashing
                }

                $extension = pathinfo($originalName, PATHINFO_EXTENSION);
                $filename = \Illuminate\Support\Str::random(40) . ($extension ? '.' . $extension : '');
                $finalPath = 'reports/' . $filename;

                if (!\Illuminate\Support\Facades\Storage::disk('public')->put($finalPath, file_get_contents($tempFullPath))) {
                    throw new \Exception("Failed to move file: {$originalName}");
                }

                unlink($tempFullPath);

                $report = Report::create([
                    'user_id' => $request->user_id ?? auth()->id(),
                    'batch_id' => $batchId,
                    'title' => $title,
                    'description' => $description,
                    'case_type' => $request->case_type,
                    'arch_type' => $request->arch_type,
                    'implants_count' => $request->implants_count,
                    'implant_brand' => $implantBrand,
                    'clinical_data' => $clinicalData,
                    'is_reply' => $request->filled('reply_to'),
                    'file_path' => $finalPath,
                    'original_name' => $originalName,
                    'mime_type' => $mimeType,
                    'size' => $size,
                    'status' => 'Pending',
                    'folder_type' => 'user',
                ]);

                $reports[] = $report;
                $uploadedFiles[] = [
                    'name' => $originalName,
                    'path' => $finalPath,
                    'url' => \Illuminate\Support\Facades\URL::to(\Illuminate\Support\Facades\Storage::url($finalPath))
                ];
            }

            // Generate PDF summary for Full Arch / Single Implant replies
            if (($request->case_type === 'full_arch' || $request->case_type === 'single_implant') && $request->filled('reply_to')) {
                try {
                    $pdfFileName = 'Case_Summary_' . str_replace(' ', '_', $title) . '_' . time() . '.pdf';
                    $pdfPath = 'reports/' . $pdfFileName;
                    
                    $pdf = \Barryvdh\DomPDF\Facade\Pdf::loadView('pdfs.case_summary', [
                        'title' => $title,
                        'case_type' => $request->case_type,
                        'arch_type' => $request->arch_type,
                        'implants_count' => $request->implants_count,
                        'implant_brand' => $implantBrand,
                        'clinical_data' => $clinicalData,
                        'description' => $description,
                        'attachments' => $uploadedFiles,
                    ]);

                    \Illuminate\Support\Facades\Storage::disk('public')->put($pdfPath, $pdf->output());

                    Report::create([
                        'user_id' => $request->user_id ?? auth()->id(),
                        'batch_id' => $batchId,
                        'title' => $title,
                        'description' => 'Automated PDF Summary',
                        'case_type' => $request->case_type,
                        'is_reply' => true,
                        'file_path' => $pdfPath,
                        'original_name' => $pdfFileName,
                        'mime_type' => 'application/pdf',
                        'size' => \Illuminate\Support\Facades\Storage::disk('public')->size($pdfPath),
                        'status' => 'Pending',
                        'folder_type' => 'user',
                    ]);
                } catch (\Exception $e) {
                    \Illuminate\Support\Facades\Log::error("PDF Generation failed: " . $e->getMessage());
                    // Don't crash the whole submission if PDF fails, but maybe report it?
                }
            }

            if (empty($reports)) {
                throw new \Exception("No files were successfully processed.");
            }

            // Notify User if this is a reply
            if ($request->filled('reply_to')) {
                $targetUser = \App\Models\User::find($request->user_id);
                if ($targetUser) {
                    $targetUser->notify(new \App\Notifications\CaseActivity($reports[0], 'reply_case_submitted'));
                }
            }

            // Notify all staff about new case
            $staff = \App\Models\User::whereIn('role', ['admin', 'assistant', 'admin_assistant'])->get();
            foreach ($staff as $person) {
                if ($person->id !== auth()->id()) {
                    $person->notify(new \App\Notifications\CaseActivity($reports[0], 'case_submitted'));
                }
            }

            // Store batch_id in session for back button
            session(['last_case_batch_id' => $batchId]);

            return redirect()->route('admin.cases.batch', $batchId)->with('success', 'Case submitted successfully!');
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error('Admin case submission error: ' . $e->getMessage());
            return back()->withErrors(['error' => 'Failed to submit case. Please try again.'])->withInput();
        }
    }

    public function uploadTemp(Request $request)
    {
        try {
            $request->validate([
                'file' => 'required|file|max:512000',
            ]);

            $file = $request->file('file');
            $extension = $file->getClientOriginalExtension() ?: pathinfo($file->getClientOriginalName(), PATHINFO_EXTENSION);
            $filename = \Illuminate\Support\Str::random(40) . ($extension ? '.' . $extension : '');
            $path = $file->storeAs('temp', $filename, 'public');

            return response()->json([
                'ok' => true,
                'path' => $path,
                'original_name' => $file->getClientOriginalName(),
                'mime_type' => $file->getClientMimeType(),
                'size' => $file->getSize(),
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['ok' => false, 'error' => $e->errors()], 422);
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error('Admin temp upload error: ' . $e->getMessage());
            return response()->json(['ok' => false, 'error' => 'Upload failed'], 500);
        }
    }

    public function index(Request $request)
    {
        $filter = $request->query('filter');
        $search = $request->query('search');

        $query = Report::with(['user', 'updatedBy'])
            ->selectRaw('MIN(id) as id, MAX(batch_id) as batch_id, MIN(user_id) as user_id, MIN(title) as title, MIN(description) as description, MIN(created_at) as created_at, MIN(file_path) as file_path, MIN(original_name) as original_name, MIN(mime_type) as mime_type, MIN(status) as status, COUNT(*) as files_count, MAX(updated_by) as updated_by')
            ->groupByRaw('CASE WHEN batch_id IS NULL THEN id ELSE batch_id END')
            ->latest('created_at');

        if ($filter) {
            if ($filter === 'pending') {
                $query->having('status', 'Pending');
            } elseif ($filter === 'reviewed') {
                $query->having('status', '!=', 'Pending');
            } elseif ($filter !== 'all') {
                $query->having('status', $filter);
            }
        }

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhereHas('user', function ($uq) use ($search) {
                      $uq->where('name', 'like', "%{$search}%");
                  });
            });
        }

        $reports = $query->paginate(6)->withQueryString();

        return view('admin.cases.index', [
            'reports' => $reports,
            'filterFilter' => $filter,
            'searchFilter' => $search,
            'statuses' => Report::STATUSES,
        ]);
    }

    public function updateStatus(Request $request, Report $report)
    {
        $request->validate([
            'status' => 'required|string|in:' . implode(',', array_keys(Report::STATUSES)),
        ]);

        try {
            $oldStatus = $report->status;
            $newStatus = $request->status;
            $reviewedAt = null;

            if (in_array($newStatus, ['Completed', 'Case Shipped', 'Case Shipped/Guide STL Shared'])) {
                $reviewedAt = $report->reviewed_at ?? now();
            }

            if ($report->batch_id) {
                Report::where('batch_id', $report->batch_id)->update([
                    'status' => $newStatus,
                    'reviewed_at' => $reviewedAt,
                    'updated_by' => auth()->id()
                ]);
                $report->status = $newStatus; // Update local instance for response
                $report->updated_by = auth()->id();
            } else {
                $report->status = $newStatus;
                $report->reviewed_at = $reviewedAt;
                $report->updated_by = auth()->id();
                $report->save();
            }

            // Notify the user about the status change
            if ($report->user) {
                $report->user->notify(new ReportStatusUpdated($report, $newStatus, $oldStatus));
            }

            // Also notify other admins/assistants about this update
            $staff = \App\Models\User::whereIn('role', ['admin', 'assistant', 'admin_assistant'])->get();
            
            foreach ($staff as $person) {
                $person->notify(new ReportStatusUpdated($report, $newStatus, $oldStatus));
            }

            return response()->json([
                'success' => true,
                'status' => $report->status,
                'class' => Report::STATUSES[$report->status],
            ]);
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error('Status Update Failed: ' . $e->getMessage(), [
                'report_id' => $report->id,
                'batch_id' => $report->batch_id,
                'status' => $request->status
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Internal server error: ' . $e->getMessage()
            ], 500);
        }
    }

    public function download(Request $request, Report $report)
    {
        if (!$report->file_path || !\Illuminate\Support\Facades\Storage::disk('public')->exists($report->file_path)) {
            abort(404);
        }

        return \Illuminate\Support\Facades\Storage::disk('public')->download($report->file_path, $report->original_name, [
            'Content-Type' => $report->mime_type ?: 'application/octet-stream',
        ]);
    }

    public function preview(Request $request, Report $report)
    {
        if (!$report->file_path || !\Illuminate\Support\Facades\Storage::disk('public')->exists($report->file_path)) {
            abort(404);
        }

        return response()->file(storage_path('app/public/' . $report->file_path), [
            'Content-Type' => $report->mime_type ?: 'application/octet-stream',
        ])->setContentDisposition('inline', $report->original_name);
    }

    public function batch($batch_id)
    {
        $reports = Report::where('batch_id', $batch_id)->with(['user', 'caseNotes.user'])->orderByDesc('created_at')->get();

        if ($reports->isEmpty()) {
            abort(404);
        }

        // Store batch_id in session for back button
        session(['last_case_batch_id' => $batch_id]);

        $originalFiles = $reports->filter(function($report) {
            return $report->description !== 'Automated PDF Summary';
        });
        $caseReplies = $reports->filter(function($report) {
            return $report->description === 'Automated PDF Summary';
        });

        return view('admin.cases.batch', [
            'reports' => $reports,
            'originalFiles' => $originalFiles,
            'caseReplies' => $caseReplies,
            'title' => $reports->first()->title,
            'batch_id' => $batch_id
        ]);
    }

    public function uploadAdditional(Request $request, $batchId)
    {
        try {
            // Verify case exists
            $existingReport = Report::where('batch_id', $batchId)->first();
            
            if (!$existingReport) {
                return response()->json(['error' => 'Case not found'], 404);
            }
            
            $request->validate([
                'files' => 'required|array',
                'files.*' => 'file|max:512000',
            ]);
            
            $uploadedFiles = [];
            
            foreach ($request->file('files') as $file) {
                $extension = $file->getClientOriginalExtension() ?: 
                    pathinfo($file->getClientOriginalName(), PATHINFO_EXTENSION);
                $filename = \Illuminate\Support\Str::random(40) . 
                    ($extension ? '.' . $extension : '');
                $path = $file->storeAs('reports', $filename, 'public');
                
                if (!$path) {
                    throw new \Exception('Failed to store file: ' . $file->getClientOriginalName());
                }
                
                $report = Report::create([
                    'user_id' => $existingReport->user_id,
                    'batch_id' => $batchId,
                    'title' => $existingReport->title,
                    'description' => $existingReport->description,
                    'file_path' => $path,
                    'original_name' => $file->getClientOriginalName(),
                    'mime_type' => $file->getClientMimeType(),
                    'size' => $file->getSize(),
                    'status' => $existingReport->status,
                    'is_reply' => true,
                    'folder_type' => $request->folder_type ?? 'additional_files',
                    'updated_by' => auth()->id(),
                ]);
                
                $uploadedFiles[] = $report;
            }
            
            // Notify case owner
            if ($existingReport->user) {
                $existingReport->user->notify(new \App\Notifications\CaseActivity($existingReport, 'file_added'));
            }
            
            return response()->json([
                'ok' => true,
                'files' => $uploadedFiles,
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['error' => $e->errors()], 422);
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error('Admin file upload error: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to upload files. Please try again.'], 500);
        }
    }

    public function submitResponse(Request $request, $batchId)
    {
        $existingReport = Report::where('batch_id', $batchId)->first();

        if (!$existingReport) {
            abort(404);
        }

        $request->validate([
            'response_type' => 'required|string|in:update,question,file_request,approval',
            'message' => 'required|string|max:5000',
            'attachments' => 'nullable|array',
            'attachments.*' => 'file|max:512000',
        ]);

        $attachments = [];

        if ($request->hasFile('attachments')) {
            foreach ($request->file('attachments') as $file) {
                $extension = $file->getClientOriginalExtension() ?:
                    pathinfo($file->getClientOriginalName(), PATHINFO_EXTENSION);
                $filename = \Illuminate\Support\Str::random(40) .
                    ($extension ? '.' . $extension : '');
                $path = $file->storeAs('reports', $filename, 'public');

                $report = Report::create([
                    'user_id' => $existingReport->user_id,
                    'batch_id' => $batchId,
                    'title' => $existingReport->title,
                    'description' => $existingReport->description,
                    'file_path' => $path,
                    'original_name' => $file->getClientOriginalName(),
                    'mime_type' => $file->getClientMimeType(),
                    'size' => $file->getSize(),
                    'status' => $existingReport->status,
                    'is_reply' => true,
                ]);

                $attachments[] = $report;
            }
        }

        // Send message to case chat
        $conversation = \App\Models\Conversation::firstOrCreate(
            [
                'type' => 'case_chat',
                'batch_id' => $batchId,
            ],
            [
                'admin_id' => null,
                'participant_id' => null,
            ]
        );

        $responseTypeDisplay = ucwords(str_replace('_', ' ', $request->response_type));
        $messageText = "[{$responseTypeDisplay}] {$request->message}";

        $message = \App\Models\Message::create([
            'conversation_id' => $conversation->id,
            'sender_id' => auth()->id(),
            'body' => $messageText,
        ]);

        // Notify case owner
        if ($existingReport->user) {
            $existingReport->user->notify(new \App\Notifications\CaseActivity($existingReport, 'response_submitted'));
        }

        return back()->with('success', 'Case response submitted successfully');
    }
    public function back()
    {
        $batchId = session('last_case_batch_id');
        if ($batchId) {
            return redirect()->route('admin.cases.batch', $batchId);
        }
        return redirect()->route('admin.cases.index');
    }

    public function downloadBatch(Request $request, $batchId)
    {
        $reports = Report::where('batch_id', $batchId)->get();

        if ($reports->isEmpty()) {
            abort(404);
        }

        // IMPROVED: If only one file, serve it directly instead of zipping
        if ($reports->count() === 1) {
            $report = $reports->first();
            if ($report->file_path && \Illuminate\Support\Facades\Storage::disk('public')->exists($report->file_path)) {
                return \Illuminate\Support\Facades\Storage::disk('public')->download($report->file_path, $report->original_name, [
                    'Content-Type' => $report->mime_type ?: 'application/octet-stream',
                ]);
            }
            abort(404);
        }

        $zip = new \ZipArchive();
        $fileName = 'case_collection_' . $batchId . '.zip';
        $tempFile = tempnam(sys_get_temp_dir(), 'zip');

        $filesAdded = 0;
        if ($zip->open($tempFile, \ZipArchive::CREATE | \ZipArchive::OVERWRITE)) {
            foreach ($reports as $report) {
                if ($report->file_path && \Illuminate\Support\Facades\Storage::disk('public')->exists($report->file_path)) {
                    $fullPath = \Illuminate\Support\Facades\Storage::disk('public')->path($report->file_path);
                    $zip->addFile($fullPath, $report->original_name);
                    $filesAdded++;
                }
            }
            $zip->close();
        } else {
            return back()->with('error', 'Could not create zip file');
        }

        // Verify we actually have files and the zip exists
        if ($filesAdded === 0) {
            if (file_exists($tempFile)) {
                @unlink($tempFile);
            }
            return back()->with('error', 'No valid files found in this case to download.');
        }

        if (!file_exists($tempFile)) {
            return back()->with('error', 'The archive file could not be generated.');
        }

        return response()->download($tempFile, $fileName)->deleteFileAfterSend(true);
    }
}
