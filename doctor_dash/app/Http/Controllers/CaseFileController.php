<?php

namespace App\Http\Controllers;

use App\Models\Report;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class CaseFileController extends Controller
{
    /**
     * Store new files into an existing batch.
     */
    public function store(Request $request, $batch_id)
    {
        $request->validate([
            'files' => ['required', 'array'],
            'files.*' => ['file'], // Removed size limit
            'folder_type' => ['nullable', 'string', 'in:case_folder,doctor_private,doctor_public'],
            'custom_names' => ['nullable', 'array'],
            'custom_names.*' => ['nullable', 'string', 'max:255'],
        ]);

        // Find proof that this batch exists and we have access
        $firstReport = Report::where('batch_id', $batch_id)->first();
        
        if (!$firstReport) {
            return back()->with('error', 'Case not found.');
        }

        // Authorization: Check if user can add files to this case
        if (auth()->user()->role !== 'admin' && $firstReport->user_id !== auth()->id()) {
            abort(403, 'Unauthorized action.');
        }

        $files = $request->file('files');
        $customNames = $request->input('custom_names', []);

        foreach ($files as $index => $file) {
            $extension = $file->getClientOriginalExtension() ?: pathinfo($file->getClientOriginalName(), PATHINFO_EXTENSION);
            $filename = Str::random(40) . ($extension ? '.' . $extension : '');
            $path = $file->storeAs('reports', $filename, 'public');

            // Determine folder type: Admin can choose, User is always 'case_folder'
            $folderType = auth()->user()->role === 'admin' ? ($request->folder_type ?? 'doctor_public') : 'case_folder';

            // Custom Name Logic
            $originalName = $file->getClientOriginalName();
            if (isset($customNames[$index]) && !empty(trim($customNames[$index]))) {
                $customName = trim($customNames[$index]);
                $customExt = pathinfo($customName, PATHINFO_EXTENSION);
                // If no extension in custom name, append original extension
                if (!$customExt && $extension) {
                    $customName .= '.' . $extension;
                }
                $originalName = $customName;
            }

            Report::create([
                'user_id' => $firstReport->user_id, // Keep the original owner
                'batch_id' => $batch_id,
                'title' => $firstReport->title,
                'description' => $firstReport->description,
                'file_path' => $path,
                'original_name' => $originalName,
                'mime_type' => $file->getClientMimeType(),
                'folder_type' => $folderType,
                'status' => $firstReport->status,
                'updated_by' => auth()->id(),
            ]);
        }

        if ($request->ajax() || $request->wantsJson()) {
            return response()->json([
                'success' => true,
                'message' => 'Files uploaded successfully.'
            ]);
        }

        return back()->with('success', 'Files uploaded successfully.');
    }

    /**
     * Rename a specific file.
     */
    public function rename(Request $request, Report $report)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
        ]);

        // Authorization: Admin can rename any. User can only rename files in their OWN cases.
        // BUT Users cannot rename files in the 'doctor_public' (Admin Public) folder.
        if (auth()->user()->role !== 'admin') {
            if ($report->user_id !== auth()->id()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized action. You can only rename files in your own cases.'
                ], 403);
            }
            if ($report->folder_type === 'doctor_public') {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized action. Files in the Admin Public folder cannot be renamed by users.'
                ], 403);
            }
        }

        // Smart Rename: keep extension if not provided
        $newName = $request->name;
        $currentExtension = pathinfo($report->original_name, PATHINFO_EXTENSION);
        $newExtension = pathinfo($newName, PATHINFO_EXTENSION);

        if (!$newExtension && $currentExtension) {
            $newName .= '.' . $currentExtension;
        }

        $report->update([
            'original_name' => $newName,
            'updated_by' => auth()->id(),
        ]);
        
        $report->refresh(); // Refresh to get the updated title if needed

        if ($request->ajax() || $request->wantsJson()) {
            return response()->json([
                'success' => true,
                'message' => 'File renamed successfully.',
                'new_name' => $report->original_name
            ]);
        }

        return back()->with('success', 'File renamed successfully.');
    }

    /**
     * Remove a specific file from a batch.
     */
    public function destroy(Report $report)
    {
        // Authorization: Admin can delete any. User can only delete files from THEIR OWN cases.
        // BUT Users cannot delete files in the 'doctor_public' (Admin Public) folder.
        if (auth()->user()->role !== 'admin') {
            if ($report->user_id !== auth()->id()) {
                abort(403, 'Unauthorized action. You can only remove files from your own cases.');
            }
            if ($report->folder_type === 'doctor_public') {
                abort(403, 'Unauthorized action. Files in the Admin Public folder cannot be removed by users.');
            }
        }

        $batch_id = $report->batch_id;
        
        // Delete from storage
        if ($report->file_path && Storage::disk('public')->exists($report->file_path)) {
            Storage::disk('public')->delete($report->file_path);
        }

        $report->delete();

        // Check if any reports remain in the batch
        $remaining = Report::where('batch_id', $batch_id)->count();

        if ($remaining === 0) {
            // Last file deleted, maybe redirect to index?
            $redirect = auth()->user()->role === 'admin' 
                ? route('admin.cases.index') 
                : route('user.reports.index');
            
            return redirect($redirect)->with('success', 'File removed. Since this was the last file, the case has been closed.');
        }

        return back()->with('success', 'File removed successfully.');
    }

    /**
     * Preview a specific file.
     */
    public function preview(Report $report)
    {
        $this->authorizeAccess($report);

        if (!$report->file_path || !Storage::disk('public')->exists($report->file_path)) {
            abort(404);
        }

        return response()->file(Storage::disk('public')->path($report->file_path), [
            'Content-Type' => $report->mime_type ?: 'application/octet-stream',
        ])->setContentDisposition('inline', $report->original_name);
    }

    /**
     * Download a specific file.
     */
    public function download(Report $report)
    {
        $this->authorizeAccess($report);

        if (!$report->file_path || !Storage::disk('public')->exists($report->file_path)) {
            abort(404);
        }

        return Storage::disk('public')->download($report->file_path, $report->original_name, [
            'Content-Type' => $report->mime_type ?: 'application/octet-stream',
        ]);
    }

    /**
     * Private helper to authorize access to a file based on batch association.
     */
    private function authorizeAccess(Report $report)
    {
        $user = auth()->user();
        
        // Admin categories always have access
        if (in_array($user->role, ['admin', 'assistant', 'admin_assistant'])) {
            return true;
        }

        // Users can access if they are the owner of the report
        // OR if they own the batch this report belongs to
        $ownsBatch = Report::where('user_id', $user->id)
            ->where('batch_id', $report->batch_id)
            ->exists();

        if ($ownsBatch) {
            // Further check: Users cannot see 'doctor_private' files
            if ($report->folder_type === 'doctor_private') {
                abort(403, 'Unauthorized access to internal files.');
            }
            return true;
        }

        abort(403, 'Unauthorized access to this case file.');
    }
}
