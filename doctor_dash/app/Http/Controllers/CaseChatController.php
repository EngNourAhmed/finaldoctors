<?php

namespace App\Http\Controllers;

use App\Models\Conversation;
use App\Models\Message;
use App\Models\Report;
use App\Models\User;
use App\Notifications\CaseActivity;
use Illuminate\Http\Request;

class CaseChatController extends Controller
{
    /**
     * Get messages for a specific case chat
     * 
     * @param Request $request
     * @param string $batchId
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages(Request $request, $batchId)
    {
        try {
            $user = $request->user();
            \Illuminate\Support\Facades\Log::info('Case chat messages request', ['batch_id' => $batchId, 'user_id' => $user->id]);
            
            // Verify access
            if (!$this->canAccessCase($user, $batchId)) {
                return response()->json(['error' => 'Unauthorized access'], 403);
            }
            
            $conversation = $this->getOrCreateConversation($batchId);
            
            $query = $conversation->messages()
                ->with('sender')
                ->orderBy('created_at', 'asc');
            
            // Support polling with 'since' parameter
            if ($request->has('since')) {
                $query->where('id', '>', $request->since);
            }
            
            $messages = $query->get()->map(function ($message) use ($user) {
                return [
                    'id' => $message->id,
                    'sender_name' => $message->sender ? $message->sender->name : 'Unknown',
                    'sender_id' => $message->sender_id,
                    'body' => $message->body,
                    'file_url' => $message->file_path ? \Illuminate\Support\Facades\Storage::url($message->file_path) : null,
                    'file_name' => $message->file_name,
                    'mime_type' => $message->mime_type,
                    'is_self' => (String)$message->sender_id === (String)$user->id,
                    'created_at' => $message->created_at->format('Y-m-d h:i A'),
                    'created_at_label' => $message->created_at->format('M d, Y h:i A'),
                ];
            });
            
            return response()->json(['messages' => $messages]);
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error('Case chat messages error: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to load messages'], 500);
        }
    }
    
    /**
     * Send a message in case chat
     * 
     * @param Request $request
     * @param string $batchId
     * @return \Illuminate\Http\JsonResponse
     */
    public function send(Request $request, $batchId)
    {
        \Illuminate\Support\Facades\Log::emergency('DEEP DEBUG: REACHED CaseChatController@send', [
            'batch_id' => $batchId,
            'user' => $request->user()?->id,
            'method' => $request->method(),
            'url' => $request->fullUrl()
        ]);

        try {
            $user = $request->user();
            
            // Verify access
            if (!$this->canAccessCase($user, $batchId)) {
                \Illuminate\Support\Facades\Log::warning('DEEP DEBUG: Unauthorized', ['user_id' => $user?->id, 'batch_id' => $batchId]);
                return response()->json(['error' => 'Unauthorized access'], 403);
            }
            
            \Illuminate\Support\Facades\Log::info('Case chat send request processed', [
                'batch_id' => $batchId,
                'user_id' => $user->id,
                'has_message' => !empty($request->message),
                'has_file' => $request->hasFile('file')
            ]);

            try {
                $request->validate([
                    'message' => 'nullable|string|max:10000',
                    'file' => 'nullable|file|max:2048000',
                ]);
            } catch (\Illuminate\Validation\ValidationException $ve) {
                \Illuminate\Support\Facades\Log::error('DEEP DEBUG: Validation failed', ['errors' => $ve->errors()]);
                throw $ve;
            }
            
            if (!$request->message && !$request->hasFile('file')) {
                return response()->json(['error' => 'Message or file is required'], 422);
            }
            
            $conversation = $this->getOrCreateConversation($batchId);
            
            $fileData = [];
            if ($request->hasFile('file')) {
                $file = $request->file('file');
                $extension = strtolower($file->getClientOriginalExtension()) ?: pathinfo($file->getClientOriginalName(), PATHINFO_EXTENSION);
                $filename = \Illuminate\Support\Str::random(40) . ($extension ? '.' . $extension : '');
                $path = $file->storeAs('chat_attachments', $filename, 'public');
                
                $fileData = [
                    'file_path' => $path,
                    'file_name' => $file->getClientOriginalName(),
                    'mime_type' => $file->getClientMimeType(),
                ];
                
                \Illuminate\Support\Facades\Log::info('Chat file stored successfully', ['path' => $path]);
            }
            
            $message = Message::create(array_merge([
                'conversation_id' => $conversation->id,
                'sender_id' => $user->id,
                'body' => (string)($request->message ?? ''),
            ], $fileData));
            
            \Illuminate\Support\Facades\Log::info('DEEP DEBUG: Message created in DB', ['id' => $message->id]);

            // Notify participants
            try {
                $this->notifyParticipants($conversation, $user, $batchId);
            } catch (\Exception $ne) {
                \Illuminate\Support\Facades\Log::error('DEEP DEBUG: Notification failed (non-blocking)', ['error' => $ne->getMessage()]);
            }
            
            return response()->json(['ok' => true, 'message' => $message]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['error' => $e->errors()], 422);
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error('DEEP DEBUG: General error in send: ' . $e->getMessage(), [
                'trace' => $e->getTraceAsString()
            ]);
            return response()->json(['error' => 'Failed to send message: ' . $e->getMessage()], 500);
        }
    }
    
    /**
     * Check if user can access a specific case
     * 
     * @param User $user
     * @param string $batchId
     * @return bool
     */
    protected function canAccessCase($user, $batchId)
    {
        // Staff can access all cases
        if (in_array($user->role, ['admin', 'assistant', 'admin_assistant'])) {
            \Illuminate\Support\Facades\Log::info('Access granted: user is staff', ['user_id' => $user->id, 'role' => $user->role]);
            return true;
        }
        
        // Users can only access their own cases
        $exists = Report::where('batch_id', $batchId)
            ->where('user_id', $user->id)
            ->exists();
            
        if (!$exists) {
            \Illuminate\Support\Facades\Log::warning('Access denied: user is not the owner', ['user_id' => $user->id, 'batch_id' => $batchId]);
        } else {
            \Illuminate\Support\Facades\Log::info('Access granted: user is owner', ['user_id' => $user->id, 'batch_id' => $batchId]);
        }
        
        return $exists;
    }
    
    /**
     * Get or create conversation for case chat
     * 
     * @param string $batchId
     * @return Conversation
     */
    protected function getOrCreateConversation($batchId)
    {
        return Conversation::firstOrCreate(
            [
                'type' => 'case_chat',
                'batch_id' => $batchId,
            ],
            [
                'admin_id' => null,
                'participant_id' => null,
            ]
        );
    }
    
    /**
     * Notify participants about new message
     * 
     * @param Conversation $conversation
     * @param User $sender
     * @param string $batchId
     * @return void
     */
    protected function notifyParticipants($conversation, $sender, $batchId)
    {
        \Illuminate\Support\Facades\Log::info('notifyParticipants called', ['sender_id' => $sender->id, 'batch_id' => $batchId]);
        
        $report = Report::where('batch_id', $batchId)->first();
        
        if (!$report) {
            \Illuminate\Support\Facades\Log::warning('notifyParticipants: No report found for batch_id', ['batch_id' => $batchId]);
            return;
        }
        
        // Notify case owner if sender is staff
        if (in_array($sender->role, ['admin', 'assistant', 'admin_assistant'])) {
            \Illuminate\Support\Facades\Log::info('Notifying user of staff message', ['user_id' => $report->user_id]);
            $report->user->notify(new CaseActivity($report, 'message_received'));
        } else {
            // Notify all staff if sender is client
            $staff = User::whereIn('role', ['admin', 'assistant', 'admin_assistant'])->get();
            \Illuminate\Support\Facades\Log::info('Notifying staff of client message', ['staff_count' => $staff->count()]);
            foreach ($staff as $person) {
                \Illuminate\Support\Facades\Log::info('Notifying staff member', ['staff_id' => $person->id]);
                $person->notify(new CaseActivity($report, 'message_received'));
            }
        }
    }
}
