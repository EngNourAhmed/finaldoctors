<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Report;
use App\Models\User;
use App\Notifications\CaseActivity;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class ReportController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        $query = $user->reports()
            ->selectRaw('MIN(id) as id, MAX(batch_id) as batch_id, MIN(title) as title, MIN(description) as description, MIN(created_at) as created_at, MIN(file_path) as file_path, MIN(original_name) as original_name, MIN(mime_type) as mime_type, MIN(status) as status, MIN(updated_by) as updated_by, COUNT(*) as files_count')
            ->groupByRaw('CASE WHEN batch_id IS NULL THEN id ELSE batch_id END')
            ->with('updatedBy')
            ->latest('created_at');

        if ($request->query('filter') === 'pending') {
            $query->having('status', 'Pending');
        } elseif ($request->query('filter') === 'reviewed') {
            $query->having('status', '!=', 'Pending');
        }

        $reports = $query->paginate(6)->withQueryString();

        return view('user.reports.index', [
            'user' => $user,
            'reports' => $reports,
            'statuses' => Report::STATUSES,
        ]);
    }

    public function create()
    {
        $user = Auth::user();

        return view('user.reports.create', [
            'user' => $user,
        ]);
    }

    public function uploadTemp(Request $request)
    {
        $request->validate([
            'file' => ['required', 'file'], // Removed max size limit
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
    }

    public function store(Request $request)
    {
        $user = $request->user();

        $data = $request->validate([
            // 1. Doctor Information
            'doctor_name' => ['nullable', 'string', 'max:255'],
            'doctor_first_name' => ['nullable', 'string', 'max:100'],
            'doctor_last_name' => ['nullable', 'string', 'max:100'],
            'doctor_email' => ['nullable', 'email', 'max:255'],
            'doctor_email_full_arch' => ['nullable', 'email', 'max:255'],
            'doctor_phone' => ['nullable', 'string', 'max:50'],
            'doctor_phone_full_arch' => ['nullable', 'string', 'max:50'],
            'clinic_name' => ['nullable', 'string', 'max:255'],
            'clinic_address' => ['nullable', 'string'],
            'address_street' => ['nullable', 'string'],
            'address_city' => ['nullable', 'string'],
            'address_state' => ['nullable', 'string'],
            'address_zip' => ['nullable', 'string'],
            'address_country' => ['nullable', 'string'],
            // 2. Patient Information
            'patient_name' => ['nullable', 'string', 'max:255'],
            'patient_first_name' => ['nullable', 'string', 'max:100'],
            'patient_last_name' => ['nullable', 'string', 'max:100'],
            'patient_age' => ['nullable', 'integer'],
            'patient_gender' => ['nullable', 'string', 'max:50'],
            'case_date' => ['nullable', 'date'],
            'surgery_date' => ['nullable', 'date'],
            // 3. Case Overview
            'arch_to_treat' => ['nullable', 'string'],
            'arch_type' => ['nullable', 'string'],
            'opposing_arch_condition' => ['nullable', 'string'],
            'current_condition' => ['nullable', 'string'],
            'implants_planned' => ['nullable', 'integer'],
            'implants_count' => ['nullable', 'integer'],
            'guide_type' => ['nullable', 'string'],
            'case_type' => ['nullable', 'string'],
            'package' => ['nullable', 'string'],
            'package_full_arch' => ['nullable', 'string'],
            'immediate_loading' => ['nullable', 'string'],
            'final_prosthesis' => ['nullable', 'string'],
            'provisional_required' => ['nullable', 'string'],
            'shade' => ['nullable', 'string', 'max:50'],
            'services' => ['nullable', 'array'],
            'services.*' => ['string'],
            'services_other' => ['nullable', 'string'],
            'description' => ['nullable', 'string'],
            'description_full_arch' => ['nullable', 'string'],
            // 4. Implant System
            'implant_brand' => ['nullable', 'string'],
            'implant_brand_full_arch' => ['nullable', 'string'],
            'implant_brand_other' => ['nullable', 'string'],
            'implant_system' => ['nullable', 'string'],
            'implant_sizes' => ['nullable', 'string'],
            'multi_unit_abutments' => ['nullable', 'string'],
            'fixation_pins' => ['nullable', 'string'],
            'bone_reduction' => ['nullable', 'string'],
            // 5-7. Files & Records
            'temp_paths' => ['nullable', 'array'],
            'temp_paths.*' => ['string'],
            'categories' => ['nullable', 'array'],
            'additional_records' => ['nullable', 'string'],
            // 8. Prescription
            'lab_instructions' => ['nullable', 'string'],
            'prosthesis_design' => ['nullable', 'string'],
            'final_shade' => ['nullable', 'string'],
            'due_date' => ['nullable', 'date'],
            'doctor_signature' => ['nullable', 'string'],
            'signature' => ['nullable', 'string'],
            // 9. Delivery
            'preferred_delivery_date' => ['nullable', 'date'],
            'shipping_address' => ['nullable', 'string'],
            'logistics_comments' => ['nullable', 'string'],
        ]);

        // Map Full Arch / Single Implant UI names to internal names
        $doctorName = trim(($data['doctor_first_name'] ?? '') . ' ' . ($data['doctor_last_name'] ?? ''));
        if (empty($doctorName)) {
            $doctorName = $user->name;
        }

        $doctorEmail = $data['doctor_email'] ?? $data['doctor_email_full_arch'] ?? $user->email;
        $doctorPhone = $data['doctor_phone'] ?? $data['doctor_phone_full_arch'] ?? $user->phone;
        
        $clinicAddress = $data['clinic_address'] ?? trim(
            ($data['address_street'] ?? '') . ', ' . 
            ($data['address_city'] ?? '') . ' ' . 
            ($data['address_state'] ?? '') . ' ' . 
            ($data['address_zip'] ?? '') . ' ' . 
            ($data['address_country'] ?? '')
        );

        $patientName = $data['patient_name'] ?? trim(($data['patient_first_name'] ?? '') . ' ' . ($data['patient_last_name'] ?? ''));
        $archToTreat = $data['arch_to_treat'] ?? $data['arch_type'] ?? 'Both';
        $implantsPlanned = $data['implants_planned'] ?? $data['implants_count'] ?? 0;
        $guideType = $data['guide_type'] ?? $data['case_type'] ?? $data['package_full_arch'] ?? $data['package'] ?? 'Standard';
        $description = $data['description'] ?? $data['description_full_arch'] ?? '';
        $implantBrand = $data['implant_brand'] ?? $data['implant_brand_full_arch'] ?? 'Not Specified';
        $signature = $data['doctor_signature'] ?? $data['signature'] ?? $user->name;

        $batchId = (string) \Illuminate\Support\Str::uuid();
        
        $implantBrandFinal = ($implantBrand === 'Other') 
            ? ($data['implant_brand_other'] ?? 'Other') 
            : $implantBrand;

        $clinicalData = [
            'doctor_info' => [
                'name' => $doctorName,
                'email' => $doctorEmail,
                'phone' => $doctorPhone,
                'clinic_name' => $data['clinic_name'] ?? 'Not Specified',
                'clinic_address' => $clinicAddress,
            ],
            'patient_info' => [
                'name' => $patientName,
                'age' => $data['patient_age'] ?? 'N/A',
                'gender' => $data['patient_gender'] ?? 'N/A',
                'case_date' => $data['case_date'] ?? now()->toDateString(),
                'surgery_date' => $data['surgery_date'] ?? now()->toDateString(),
            ],
            'case_overview' => [
                'arch' => $archToTreat,
                'opposing_arch' => $data['opposing_arch_condition'] ?? 'N/A',
                'condition' => $data['current_condition'] ?? 'N/A',
                'implants_planned' => $implantsPlanned,
                'guide_type' => $guideType,
                'immediate_loading' => $data['immediate_loading'] ?? 'N/A',
                'final_prosthesis' => $data['final_prosthesis'] ?? 'N/A',
                'provisional_required' => $data['provisional_required'] ?? 'N/A',
                'shade' => $data['shade'] ?? 'N/A',
                'services' => $data['services'] ?? [$guideType],
                'services_other' => $data['services_other'] ?? null,
            ],
            'implant_system' => [
                'brand' => $implantBrandFinal,
                'system' => $data['implant_system'] ?? 'N/A',
                'sizes' => $data['implant_sizes'] ?? 'N/A',
                'mua' => $data['multi_unit_abutments'] ?? 'N/A',
                'pins' => $data['fixation_pins'] ?? 'N/A',
                'bone_reduction' => $data['bone_reduction'] ?? 'N/A',
            ],
            'records' => [
                'additional' => $data['additional_records'] ?? null,
            ],
            'prescription' => [
                'lab_instructions' => $data['lab_instructions'] ?? $description,
                'prosthesis_design' => $data['prosthesis_design'] ?? null,
                'shade' => $data['final_shade'] ?? null,
                'due_date' => $data['due_date'] ?? now()->addDays(7)->toDateString(),
                'signature' => $signature,
            ],
            'logistics' => [
                'preferred_date' => $data['preferred_delivery_date'] ?? now()->addDays(10)->toDateString(),
                'shipping_address' => $data['shipping_address'] ?? $clinicAddress,
                'comments' => $data['logistics_comments'] ?? null,
            ]
        ];

        $reportAttributes = [
            'user_id' => $user->id,
            'batch_id' => $batchId,
            'title' => $patientName, // Use patient name as title
            'description' => $description,
            'arch_type' => $archToTreat,
            'implants_count' => $implantsPlanned,
            'implant_brand' => $implantBrandFinal,
            'case_type' => $guideType,
            'clinical_data' => $clinicalData,
            'status' => 'Pending',
        ];

        // Handle temporary uploads
        $processedTempFiles = false;
        if (!empty($data['temp_paths'])) {
            foreach ($data['temp_paths'] as $tempPath) {
                if (Storage::disk('public')->exists($tempPath)) {
                    $suffix = str_replace('.', '_', $tempPath);
                    $category = $request->input('categories.' . $suffix, 'general');
                    
                    $filename = basename($tempPath);
                    $newPath = 'reports/' . $filename;
                    Storage::disk('public')->move($tempPath, $newPath);

                    $fileClinicalData = $clinicalData;
                    $fileClinicalData['file_category'] = $category;

                    Report::create(array_merge($reportAttributes, [
                        'file_path' => $newPath,
                        'original_name' => $request->input('original_names.' . $suffix, $filename),
                        'mime_type' => $request->input('mime_types.' . $suffix, 'application/octet-stream'),
                        'size' => $request->input('sizes.' . $suffix, 0),
                        'clinical_data' => $fileClinicalData,
                        'folder_type' => 'user',
                        'updated_by' => auth()->id(),
                    ]));
                    $processedTempFiles = true;
                }
            }
        }

        // Handle direct uploads (fallback)
        if (!$processedTempFiles && !empty($data['files'])) {
            foreach ($data['files'] as $file) {
                $extension = $file->getClientOriginalExtension() ?: pathinfo($file->getClientOriginalName(), PATHINFO_EXTENSION);
                $filename = \Illuminate\Support\Str::random(40) . ($extension ? '.' . $extension : '');
                $path = $file->storeAs('reports', $filename, 'public');

                Report::create(array_merge($reportAttributes, [
                    'file_path' => $path,
                    'original_name' => $file->getClientOriginalName(),
                    'mime_type' => $file->getClientMimeType(),
                    'size' => $file->getSize(),
                    'folder_type' => 'user',
                    'updated_by' => auth()->id(),
                ]));
            }
        }

        // Special case: If NO files uploaded but form submitted (should handle appropriately)
        if (!$processedTempFiles && empty($data['files'])) {
             Report::create($reportAttributes);
        }

        // GENERATE CASE SUBMISSION PDF
        try {
            $allUploadedFiles = [];
            $batchReports = Report::where('batch_id', $batchId)->get();
            foreach($batchReports as $br) {
                if ($br->file_path && $br->description !== 'Automated Case Submission') {
                    $allUploadedFiles[] = [
                        'id' => $br->id,
                        'original_name' => $br->original_name,
                        'category' => $br->clinical_data['file_category'] ?? 'General',
                    ];
                }
            }

            $pdf = \Barryvdh\DomPDF\Facade\Pdf::loadView('pdfs.case_submission', [
                'batch_id' => $batchId,
                'clinical_data' => $clinicalData,
                'description' => $description,
                'uploaded_files' => $allUploadedFiles,
            ]);

            $pdfFileName = 'Case_Submission_' . time() . '.pdf';
            $pdfPath = 'reports/' . $pdfFileName;
            Storage::disk('public')->put($pdfPath, $pdf->output());

            Report::create(array_merge($reportAttributes, [
                'title' => $patientName,
                'description' => 'Automated Case Submission',
                'file_path' => $pdfPath,
                'original_name' => 'Case Submission.pdf',
                'mime_type' => 'application/pdf',
                'size' => Storage::disk('public')->size($pdfPath),
                'folder_type' => 'user', // Ensure it goes to "Case Folder"
                'status' => 'Pending',
                'updated_by' => auth()->id(),
            ]));
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error('User Case PDF Generation failed: ' . $e->getMessage());
        }

        // Notify all staff about the new case
        $staff = User::whereIn('role', ['admin', 'assistant', 'admin_assistant'])->get();
        foreach ($staff as $person) {
            $person->notify(new CaseActivity(Report::where('batch_id', $batchId)->first(), 'created'));
        }

        if ($request->expectsJson()) {
            return response()->json([
                'ok' => true,
                'redirect' => route('user.reports.index'),
                'message' => 'Case uploaded successfully.',
            ]);
        }

        return redirect()->route('user.reports.index')->with('status', 'Case uploaded successfully.');
    }

    public function show(Request $request, $batchId)
    {
        $user = $request->user();
        
        // Verify user owns at least one report in this batch
        $ownsBatch = Report::where('user_id', $user->id)
            ->where('batch_id', $batchId)
            ->exists();

        if (!$ownsBatch) {
            // Check if it's an ID for backward compatibility
            $report = Report::where('user_id', $user->id)->find($batchId);
            if ($report) {
                $batchId = $report->batch_id;
            } else {
                abort(404);
            }
        }

        // Mark related notifications as read
        $user->unreadNotifications()
            ->where(function($q) use ($batchId) {
                $q->where('data->batch_id', $batchId)
                  ->orWhere('data->report_id', $batchId);
            })
            ->get()
            ->markAsRead();

        // Now fetch ALL reports in this batch (including replies from admins)
        $allReports = Report::where('batch_id', $batchId)
            ->with(['caseNotes.user'])
            ->orderByDesc('created_at')
            ->get();

        $caseFiles = $allReports->filter(function($report) {
            return $report->description !== 'Automated PDF Summary';
        });
        $adminReplies = $allReports->filter(function($report) {
            return $report->description === 'Automated PDF Summary';
        });

        // Fetch text replies from Case Chat Conversation
        $adminMessages = collect();
        $conversation = \App\Models\Conversation::where('type', 'case_chat')
            ->where('batch_id', $batchId)
            ->first();
        
        if ($conversation) {
            $adminMessages = $conversation->messages()
                ->whereHas('sender', function($q) {
                    $q->whereIn('role', ['admin', 'assistant', 'admin_assistant']);
                })
                ->with('sender')
                ->latest()
                ->get();
        }

        return view('user.reports.show', [
            'user' => $user,
            'reports' => $caseFiles,
            'adminReplies' => $adminReplies,
            'adminMessages' => $adminMessages,
            'allReports' => $allReports,
            'title' => $allReports->first()->title ?? 'Case Details',
            'batch_id' => $batchId
        ]);
    }

    public function edit(Request $request, Report $report)
    {
        $user = $request->user();

        abort_unless($report->user_id === $user->id, 404);

        return view('user.reports.edit', [
            'user' => $user,
            'report' => $report,
        ]);
    }

    public function update(Request $request, Report $report)
    {
        $user = $request->user();

        abort_unless($report->user_id === $user->id, 404);

        $data = $request->validate([
            // 1. Doctor Information
            'doctor_name' => ['nullable', 'string', 'max:255'],
            'doctor_first_name' => ['nullable', 'string', 'max:100'],
            'doctor_last_name' => ['nullable', 'string', 'max:100'],
            'doctor_email' => ['nullable', 'email', 'max:255'],
            'doctor_email_full_arch' => ['nullable', 'email', 'max:255'],
            'doctor_phone' => ['nullable', 'string', 'max:50'],
            'doctor_phone_full_arch' => ['nullable', 'string', 'max:50'],
            'clinic_name' => ['nullable', 'string', 'max:255'],
            'clinic_address' => ['nullable', 'string'],
            'address_street' => ['nullable', 'string'],
            'address_city' => ['nullable', 'string'],
            'address_state' => ['nullable', 'string'],
            'address_zip' => ['nullable', 'string'],
            'address_country' => ['nullable', 'string'],
            // 2. Patient Information
            'patient_name' => ['nullable', 'string', 'max:255'],
            'patient_first_name' => ['nullable', 'string', 'max:100'],
            'patient_last_name' => ['nullable', 'string', 'max:100'],
            'patient_age' => ['nullable', 'integer'],
            'patient_gender' => ['nullable', 'string', 'max:50'],
            'case_date' => ['nullable', 'date'],
            'surgery_date' => ['nullable', 'date'],
            // 3. Case Overview
            'arch_to_treat' => ['nullable', 'string'],
            'arch_type' => ['nullable', 'string'],
            'opposing_arch_condition' => ['nullable', 'string'],
            'current_condition' => ['nullable', 'string'],
            'implants_planned' => ['nullable', 'integer'],
            'implants_count' => ['nullable', 'integer'],
            'guide_type' => ['nullable', 'string'],
            'case_type' => ['nullable', 'string'],
            'package' => ['nullable', 'string'],
            'package_full_arch' => ['nullable', 'string'],
            'immediate_loading' => ['nullable', 'string'],
            'final_prosthesis' => ['nullable', 'string'],
            'provisional_required' => ['nullable', 'string'],
            'shade' => ['nullable', 'string', 'max:50'],
            'services' => ['nullable', 'array'],
            'services.*' => ['string'],
            'services_other' => ['nullable', 'string'],
            'description' => ['nullable', 'string'],
            'description_full_arch' => ['nullable', 'string'],
            // 4. Implant System
            'implant_brand' => ['nullable', 'string'],
            'implant_brand_full_arch' => ['nullable', 'string'],
            'implant_brand_other' => ['nullable', 'string'],
            'implant_system' => ['nullable', 'string'],
            'implant_sizes' => ['nullable', 'string'],
            'multi_unit_abutments' => ['nullable', 'string'],
            'fixation_pins' => ['nullable', 'string'],
            'bone_reduction' => ['nullable', 'string'],
            // 5-7. Files & Records
            'temp_paths' => ['nullable', 'array'],
            'temp_paths.*' => ['string'],
            'categories' => ['nullable', 'array'],
            'additional_records' => ['nullable', 'string'],
            // 8. Prescription
            'lab_instructions' => ['nullable', 'string'],
            'prosthesis_design' => ['nullable', 'string'],
            'final_shade' => ['nullable', 'string'],
            'due_date' => ['nullable', 'date'],
            'doctor_signature' => ['nullable', 'string'],
            'signature' => ['nullable', 'string'],
            // 9. Delivery
            'preferred_delivery_date' => ['nullable', 'date'],
            'shipping_address' => ['nullable', 'string'],
            'logistics_comments' => ['nullable', 'string'],
        ]);

        $doctorName = trim(($data['doctor_first_name'] ?? '') . ' ' . ($data['doctor_last_name'] ?? ''));
        if (empty($doctorName)) {
            $doctorName = $user->name;
        }

        $doctorEmail = $data['doctor_email'] ?? $data['doctor_email_full_arch'] ?? $user->email;
        $doctorPhone = $data['doctor_phone'] ?? $data['doctor_phone_full_arch'] ?? $user->phone;
        
        $clinicAddress = $data['clinic_address'] ?? trim(
            ($data['address_street'] ?? '') . ', ' . 
            ($data['address_city'] ?? '') . ' ' . 
            ($data['address_state'] ?? '') . ' ' . 
            ($data['address_zip'] ?? '') . ' ' . 
            ($data['address_country'] ?? '')
        );

        $patientName = $data['patient_name'] ?? trim(($data['patient_first_name'] ?? '') . ' ' . ($data['patient_last_name'] ?? ''));
        $archToTreat = $data['arch_to_treat'] ?? $data['arch_type'] ?? 'Both';
        $implantsPlanned = $data['implants_planned'] ?? $data['implants_count'] ?? 0;
        $guideType = $data['guide_type'] ?? $data['case_type'] ?? $data['package_full_arch'] ?? $data['package'] ?? 'Standard';
        $description = $data['description'] ?? $data['description_full_arch'] ?? '';
        $implantBrand = $data['implant_brand'] ?? $data['implant_brand_full_arch'] ?? 'Not Specified';
        $signature = $data['doctor_signature'] ?? $data['signature'] ?? $user->name;

        $implantBrandFinal = ($implantBrand === 'Other') 
            ? ($data['implant_brand_other'] ?? 'Other') 
            : $implantBrand;

        $clinicalData = [
            'doctor_info' => [
                'name' => $doctorName,
                'email' => $doctorEmail,
                'phone' => $doctorPhone,
                'clinic_name' => $data['clinic_name'] ?? 'Not Specified',
                'clinic_address' => $clinicAddress,
            ],
            'patient_info' => [
                'name' => $patientName,
                'age' => $data['patient_age'] ?? 'N/A',
                'gender' => $data['patient_gender'] ?? 'N/A',
                'case_date' => $data['case_date'] ?? now()->toDateString(),
                'surgery_date' => $data['surgery_date'] ?? now()->toDateString(),
            ],
            'case_overview' => [
                'arch' => $archToTreat,
                'opposing_arch' => $data['opposing_arch_condition'] ?? 'N/A',
                'condition' => $data['current_condition'] ?? 'N/A',
                'implants_planned' => $implantsPlanned,
                'guide_type' => $guideType,
                'immediate_loading' => $data['immediate_loading'] ?? 'N/A',
                'final_prosthesis' => $data['final_prosthesis'] ?? 'N/A',
                'provisional_required' => $data['provisional_required'] ?? 'N/A',
                'shade' => $data['shade'] ?? 'N/A',
                'services' => $data['services'] ?? [$guideType],
                'services_other' => $data['services_other'] ?? null,
            ],
            'implant_system' => [
                'brand' => $implantBrandFinal,
                'system' => $data['implant_system'] ?? 'N/A',
                'sizes' => $data['implant_sizes'] ?? 'N/A',
                'mua' => $data['multi_unit_abutments'] ?? 'N/A',
                'pins' => $data['fixation_pins'] ?? 'N/A',
                'bone_reduction' => $data['bone_reduction'] ?? 'N/A',
            ],
            'records' => [
                'additional' => $data['additional_records'] ?? null,
            ],
            'prescription' => [
                'lab_instructions' => $data['lab_instructions'] ?? $description,
                'prosthesis_design' => $data['prosthesis_design'] ?? null,
                'shade' => $data['final_shade'] ?? null,
                'due_date' => $data['due_date'] ?? now()->addDays(7)->toDateString(),
                'signature' => $signature,
            ],
            'logistics' => [
                'preferred_date' => $data['preferred_delivery_date'] ?? now()->addDays(10)->toDateString(),
                'shipping_address' => $data['shipping_address'] ?? $clinicAddress,
                'comments' => $data['logistics_comments'] ?? null,
            ]
        ];

        $reportAttributes = [
            'title' => $patientName,
            'description' => $description,
            'arch_type' => $archToTreat,
            'implants_count' => $implantsPlanned,
            'implant_brand' => $implantBrandFinal,
            'case_type' => $guideType,
            'clinical_data' => $clinicalData,
        ];

        if ($report->batch_id) {
            Report::where('batch_id', $report->batch_id)->update($reportAttributes);
        } else {
            $report->update($reportAttributes);
        }

        // Handle temporary uploads
        if (!empty($data['temp_paths'])) {
            foreach ($data['temp_paths'] as $tempPath) {
                if (Storage::disk('public')->exists($tempPath)) {
                    $suffix = str_replace('.', '_', $tempPath);
                    $category = $request->input('categories.' . $suffix, 'general');
                    
                    $filename = basename($tempPath);
                    $newPath = 'reports/' . $filename;
                    Storage::disk('public')->move($tempPath, $newPath);

                    $fileClinicalData = $clinicalData;
                    $fileClinicalData['file_category'] = $category;

                    Report::create(array_merge($reportAttributes, [
                        'user_id' => $user->id,
                        'batch_id' => $report->batch_id ?? (string) \Illuminate\Support\Str::uuid(),
                        'status' => $report->status,
                        'file_path' => $newPath,
                        'original_name' => $request->input('original_names.' . $suffix, $filename),
                        'mime_type' => $request->input('mime_types.' . $suffix, 'application/octet-stream'),
                        'size' => $request->input('sizes.' . $suffix, 0),
                        'clinical_data' => $fileClinicalData,
                    ]));
                }
            }
        }

        // Notify all staff about the case update
        $staff = User::whereIn('role', ['admin', 'assistant', 'admin_assistant'])->get();
        foreach ($staff as $person) {
            $person->notify(new CaseActivity($report, 'updated'));
        }

        if ($request->expectsJson()) {
            return response()->json([
                'ok' => true,
                'redirect' => route('user.reports.index'),
                'message' => 'Case updated successfully.',
            ]);
        }

        return redirect()->route('user.reports.index')->with('status', 'Case updated successfully.');
    }

    public function destroy(Request $request, Report $report)
    {
        $user = $request->user();

        abort_unless($report->user_id === $user->id, 404);

        if ($report->batch_id) {
            $batchReports = Report::where('batch_id', $report->batch_id)->get();
            foreach ($batchReports as $br) {
                if ($br->file_path) {
                    Storage::disk('public')->delete($br->file_path);
                }
                $br->delete();
            }
        } else {
            if ($report->file_path) {
                Storage::disk('public')->delete($report->file_path);
            }
            $report->delete();
        }

        // Notify all staff about case deletion
        $staff = User::whereIn('role', ['admin', 'assistant', 'admin_assistant'])->get();
        foreach ($staff as $person) {
            // Use local copy of report since it's deleted from DB
            $person->notify(new CaseActivity($report, 'deleted'));
        }

        if ($request->expectsJson()) {
            return response()->json([
                'ok' => true,
                'redirect' => route('user.reports.index'),
                'message' => 'Case deleted successfully.',
            ]);
        }

        return redirect()->route('user.reports.index')->with('status', 'Case deleted successfully.');
    }

    public function download(Request $request, Report $report)
    {
        $user = $request->user();

        // Verify user owns the batch this report belongs to
        $ownsBatch = Report::where('user_id', $user->id)
            ->where('batch_id', $report->batch_id)
            ->exists();

        abort_unless($ownsBatch || in_array($user->role, ['admin', 'assistant', 'admin_assistant']), 404);

        if (!$report->file_path || !Storage::disk('public')->exists($report->file_path)) {
            abort(404);
        }

        return Storage::disk('public')->download($report->file_path, $report->original_name, [
            'Content-Type' => $report->mime_type ?: 'application/octet-stream',
        ]);
    }

    public function preview(Request $request, Report $report)
    {
        $user = $request->user();

        // Verify user owns the batch this report belongs to
        $ownsBatch = Report::where('user_id', $user->id)
            ->where('batch_id', $report->batch_id)
            ->exists();

        abort_unless($ownsBatch || in_array($user->role, ['admin', 'assistant', 'admin_assistant']), 404);

        if (!$report->file_path || !Storage::disk('public')->exists($report->file_path)) {
            abort(404);
        }

        return response()->file(Storage::disk('public')->path($report->file_path), [
            'Content-Type' => $report->mime_type ?: 'application/octet-stream',
        ])->setContentDisposition('inline', $report->original_name);
    }

    public function uploadAdditional(Request $request, $batchId)
    {
        try {
            $user = $request->user();
            
            // Verify ownership
            $existingReport = Report::where('batch_id', $batchId)
                ->where('user_id', $user->id)
                ->first();
            
            if (!$existingReport) {
                return response()->json(['error' => 'Case not found or access denied'], 404);
            }
            
            $request->validate([
                'files' => 'required|array',
                'files.*' => 'file', // Removed max size limit
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
                    'user_id' => $user->id,
                    'batch_id' => $batchId,
                    'title' => $existingReport->title,
                    'description' => $existingReport->description,
                    'file_path' => $path,
                    'original_name' => $file->getClientOriginalName(),
                    'mime_type' => $file->getClientMimeType(),
                    'size' => $file->getSize(),
                    'status' => $existingReport->status,
                    'folder_type' => 'additional_files',
                ]);
                
                $uploadedFiles[] = $report;
            }
            
            // Notify staff
            $staff = User::whereIn('role', ['admin', 'assistant', 'admin_assistant'])->get();
            foreach ($staff as $person) {
                $person->notify(new CaseActivity($existingReport, 'file_added'));
            }
            
            return response()->json([
                'ok' => true,
                'files' => $uploadedFiles,
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['error' => $e->errors()], 422);
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error('File upload error: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to upload files. Please try again.'], 500);
        }
    }

    public function generateFileLink(Request $request, Report $report)
    {
        $user = $request->user();
        
        // Verify access
        if ($report->user_id !== $user->id && 
            !in_array($user->role, ['admin', 'assistant', 'admin_assistant'])) {
            abort(403);
        }
        
        $url = route('reports.file.preview', [
            'batchId' => (string)$report->batch_id,
            'fileId' => (string)$report->id,
            'signature' => $this->generateSignature($report),
        ]);
        
        return response()->json(['url' => $url]);
    }

    public function generateBatchLink(Request $request, $batchId)
    {
        $user = $request->user();
        
        $report = Report::where('batch_id', $batchId)->first();
        if (!$report) {
            return response()->json(['error' => 'Case not found'], 404);
        }
        
        // Verify access
        if ($report->user_id !== $user->id && 
            !in_array($user->role, ['admin', 'assistant', 'admin_assistant'])) {
            abort(403);
        }
        
        $url = route('reports.batch.shared', [
            'batchId' => (string)$batchId,
            'signature' => hash_hmac('sha256', 'batch_' . (string)$batchId, (string)config('app.key')),
        ]);
        
        return response()->json(['url' => $url]);
    }

    public function sharedFile(Request $request, $batchId, $fileId)
    {
        // Verify signature
        if (!$this->verifySignature($request, $fileId)) {
            abort(403, 'Invalid or expired link');
        }
        
        $report = Report::where('id', $fileId)
            ->where('batch_id', trim($batchId))
            ->first();
        
        if (!$report) {
            $report = Report::find($fileId); // Fallback: signature validated the ID/Batch combo already
        }
        
        if (!$report || !Storage::disk('public')->exists($report->file_path)) {
            abort(404, 'File not found on server.');
        }
        
        return Storage::disk('public')->download(
            $report->file_path, 
            $report->original_name,
            ['Content-Type' => $report->mime_type ?: 'application/octet-stream']
        );
    }

    public function sharedPreview(Request $request, $batchId, $fileId)
    {
        // Verify signature
        if (!$this->verifySignature($request, $fileId)) {
            abort(403, 'Invalid or expired link');
        }
        
        $report = Report::where('id', $fileId)
            ->where('batch_id', trim($batchId))
            ->first();
        
        if (!$report) {
            $report = Report::find($fileId);
        }
        
        if (!$report || !Storage::disk('public')->exists($report->file_path)) {
            abort(404, 'File preview not available.');
        }
        
        return response()->file(Storage::disk('public')->path($report->file_path), [
            'Content-Type' => $report->mime_type ?: 'application/octet-stream',
            'Cache-Control' => 'public, max-age=86400',
            'Content-Disposition' => 'inline; filename="' . $report->original_name . '"'
        ]);
    }

    public function sharedBatch(Request $request, $batchId)
    {
        // Verify signature
        $expected = hash_hmac('sha256', 'batch_' . (string)$batchId, (string)config('app.key'));
        if (!hash_equals($expected, (string)$request->query('signature'))) {
            abort(403, 'Invalid or expired link');
        }
        
        $reports = Report::where('batch_id', $batchId)->get();
        
        if ($reports->isEmpty()) {
            abort(404);
        }
        
        return view('shared.batch', [
            'reports' => $reports,
            'title' => $reports->first()->title,
            'batch_id' => $batchId,
            'signature' => $request->query('signature')
        ]);
    }

    public function downloadBatch(Request $request, $batchId)
    {
        $user = $request->user();
        
        // Check if user owns at least one report in this batch
        $ownsBatch = Report::where('user_id', $user->id)
            ->where('batch_id', $batchId)
            ->exists();

        if (!$ownsBatch) {
            abort(403, 'You do not have permission to download this case collection.');
        }

        // Fetch ALL reports in this batch (including admin replies)
        $reports = Report::where('batch_id', $batchId)->get();

        if ($reports->isEmpty()) {
            abort(404);
        }

        // IMPROVED: If only one file, serve it directly instead of zipping
        if ($reports->count() === 1) {
            $report = $reports->first();
            if ($report->file_path && Storage::disk('public')->exists($report->file_path)) {
                return Storage::disk('public')->download($report->file_path, $report->original_name, [
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
                if ($report->file_path && Storage::disk('public')->exists($report->file_path)) {
                    $fullPath = Storage::disk('public')->path($report->file_path);
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

    protected function generateSignature($report)
    {
        return hash_hmac('sha256', 'file_' . (string)$report->id . '_' . (string)$report->batch_id, (string)config('app.key'));
    }

    protected function verifySignature($request, $fileId)
    {
        $signature = (string)$request->query('signature');
        $batchId = (string)$request->route('batchId');
        $expected = hash_hmac('sha256', 'file_' . (string)$fileId . '_' . (string)$batchId, (string)config('app.key'));
        return hash_equals($expected, $signature);
    }
}
