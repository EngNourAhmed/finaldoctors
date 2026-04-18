<?php

namespace App\Http\Controllers;

use App\Models\CaseNote;
use App\Models\Report;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class CaseNoteController extends Controller
{
    /**
     * Store a newly created case note in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  string  $batchId
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request, $batchId)
    {
        try {
            $user = Auth::user();
            
            // Verify access
            if (!$this->canAccessCase($user, $batchId)) {
                return back()->with('error', 'Unauthorized access');
            }

            $request->validate([
                'subject' => 'required|string|max:255',
                'message' => 'required|string',
            ]);

            CaseNote::create([
                'batch_id' => $batchId,
                'user_id' => $user->id,
                'subject' => $request->subject,
                'message' => $request->message,
            ]);

            return redirect()->back()->withFragment('notes')->with('success', 'Case note added successfully.');
        } catch (\Exception $e) {
            Log::error('Case note store error: ' . $e->getMessage());
            return redirect()->back()->withFragment('notes')->with('error', 'Failed to add case note.');
        }
    }

    /**
     * Show the form for editing the specified case note.
     */
    public function edit(CaseNote $note)
    {
        $user = Auth::user();
        if (!in_array($user->role, ['admin', 'assistant', 'admin_assistant']) && $note->user_id !== $user->id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        return response()->json([
            'subject' => $note->subject,
            'message' => $note->message,
        ]);
    }

    /**
     * Update the specified case note in storage.
     */
    public function update(Request $request, CaseNote $note)
    {
        try {
            $user = Auth::user();
            if (!in_array($user->role, ['admin', 'assistant', 'admin_assistant']) && $note->user_id !== $user->id) {
                return back()->with('error', 'Unauthorized access');
            }

            $request->validate([
                'subject' => 'required|string|max:255',
                'message' => 'required|string',
            ]);

            $note->update([
                'subject' => $request->subject,
                'message' => $request->message,
            ]);

            return redirect()->back()->withFragment('notes')->with('success', 'Case note updated successfully.');
        } catch (\Exception $e) {
            Log::error('Case note update error: ' . $e->getMessage());
            return redirect()->back()->withFragment('notes')->with('error', 'Failed to update case note.');
        }
    }

    /**
     * Remove the specified case note from storage.
     *
     * @param  \App\Models\CaseNote  $note
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(CaseNote $note)
    {
        try {
            $user = Auth::user();
            
            // Authorization: Admin can delete any, user can only delete their own
            if (!in_array($user->role, ['admin', 'assistant', 'admin_assistant']) && $note->user_id !== $user->id) {
                return back()->with('error', 'Unauthorized access');
            }

            $note->delete();

            return redirect()->back()->withFragment('notes')->with('success', 'Case note deleted successfully.');
        } catch (\Exception $e) {
            Log::error('Case note delete error: ' . $e->getMessage());
            return redirect()->back()->withFragment('notes')->with('error', 'Failed to delete case note.');
        }
    }

    /**
     * Check if user can access a specific case
     * 
     * @param mixed $user
     * @param string $batchId
     * @return bool
     */
    protected function canAccessCase($user, $batchId)
    {
        // Staff can access all cases
        if (in_array($user->role, ['admin', 'assistant', 'admin_assistant'])) {
            return true;
        }
        
        // Users can only access their own cases
        return Report::where('batch_id', $batchId)
            ->where('user_id', $user->id)
            ->exists();
    }
}
