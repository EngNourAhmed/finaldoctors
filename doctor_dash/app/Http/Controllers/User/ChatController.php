<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Conversation;
use App\Models\ConversationParticipant;
use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ChatController extends Controller
{
    public function doctors()
    {
        $currentUser = Auth::user();

        $doctors = User::whereIn('role', ['admin', 'assistant'])
            ->orderBy('name')
            ->get();

        $doctors = $this->hydrateDoctorContactsWithLastMessage($currentUser, $doctors);

        return view('user.chats.doctors', [
            'user' => $currentUser,
            'doctors' => $doctors,
            'activeDoctor' => null,
            'conversation' => null,
            'messages' => collect(),
        ]);
    }

    public function doctorConversation(User $doctor)
    {
        abort_unless(in_array($doctor->role, ['admin', 'assistant'], true), 404);

        $currentUser = Auth::user();

        $conversation = $this->findOrCreateDoctorConversation($currentUser, $doctor);

        $messages = $conversation->messages()
            ->with('sender')
            ->orderBy('created_at')
            ->get();

        $doctors = User::whereIn('role', ['admin', 'assistant'])
            ->orderBy('name')
            ->get();

        $doctors = $this->hydrateDoctorContactsWithLastMessage($currentUser, $doctors);

        return view('user.chats.doctors', [
            'user' => $currentUser,
            'doctors' => $doctors,
            'activeDoctor' => $doctor,
            'conversation' => $conversation,
            'messages' => $messages,
        ]);
    }

    public function sendToDoctor(Request $request, User $doctor)
    {
        abort_unless(in_array($doctor->role, ['admin', 'assistant'], true), 404);

        $data = $request->validate([
            'body' => ['required', 'string', 'max:2000'],
        ]);

        $currentUser = Auth::user();

        $conversation = $this->findOrCreateDoctorConversation($currentUser, $doctor);

        $message = Message::create([
            'conversation_id' => $conversation->id,
            'sender_id' => $currentUser->id,
            'body' => $data['body'],
        ]);

        if ($request->expectsJson()) {
            return response()->json([
                'ok' => true,
                'message' => [
                    'id' => $message->id,
                    'body' => $message->body,
                    'created_at' => optional($message->created_at)->toIso8601String(),
                    'created_at_label' => optional($message->created_at)->format('g:i A d/m'),
                    'sender_id' => $message->sender_id,
                    'is_self' => true,
                ]
            ]);
        }

        return redirect()->route('user.chats.doctors.show', $doctor);
    }

    public function groupConversation()
    {
        $currentUser = Auth::user();

        $conversation = Conversation::firstOrCreate([
            'type' => 'user_doctors_group',
            'admin_id' => $currentUser->id,
            'participant_id' => $currentUser->id,
        ]);

        // Ensure all doctors and the current user are participants in this group conversation
        $doctorIds = User::whereIn('role', ['admin', 'assistant'])->pluck('id');
        $participantIds = $doctorIds->push($currentUser->id)->unique()->all();
        $conversation->participants()->syncWithoutDetaching($participantIds);

        $messages = $conversation->messages()
            ->with('sender')
            ->orderBy('created_at')
            ->get();

        return view('user.chats.group', [
            'user' => $currentUser,
            'conversation' => $conversation,
            'messages' => $messages,
        ]);
    }

    public function sendToGroup(Request $request)
    {
        $currentUser = Auth::user();

        $data = $request->validate([
            'body' => ['required', 'string', 'max:2000'],
        ]);

        $conversation = Conversation::firstOrCreate([
            'type' => 'user_doctors_group',
            'admin_id' => $currentUser->id,
            'participant_id' => $currentUser->id,
        ]);

        Message::create([
            'conversation_id' => $conversation->id,
            'sender_id' => $currentUser->id,
            'body' => $data['body'],
        ]);

        return redirect()->route('user.chats.group');
    }

    public function doctorMessages(Request $request, User $doctor)
    {
        abort_unless(in_array($doctor->role, ['admin', 'assistant'], true), 404);

        $currentUser = $request->user();
        $afterId = (int) $request->query('after_id', 0);

        $conversation = $this->findOrCreateDoctorConversation($currentUser, $doctor);

        $messages = $conversation->messages()
            ->with('sender')
            ->when($afterId > 0, function ($q) use ($afterId) {
                $q->where('id', '>', $afterId);
            })
            ->orderBy('created_at')
            ->get();

        return response()->json([
            'ok' => true,
            'messages' => $messages->map(function ($m) use ($currentUser) {
                return [
                    'id' => $m->id,
                    'body' => $m->body,
                    'created_at' => optional($m->created_at)->toIso8601String(),
                    'created_at_label' => optional($m->created_at)->format('g:i A d/m'),
                    'sender_id' => $m->sender_id,
                    'sender_name' => optional($m->sender)->name,
                    'is_self' => $m->sender_id === $currentUser->id,
                ];
            })->values(),
        ]);
    }

    public function groupMessages(Request $request)
    {
        $currentUser = $request->user();
        $afterId = (int) $request->query('after_id', 0);

        $conversation = Conversation::firstOrCreate([
            'type' => 'user_doctors_group',
            'admin_id' => $currentUser->id,
            'participant_id' => $currentUser->id,
        ]);

        $messages = $conversation->messages()
            ->with('sender')
            ->when($afterId > 0, function ($q) use ($afterId) {
                $q->where('id', '>', $afterId);
            })
            ->orderBy('created_at')
            ->get();

        return response()->json([
            'ok' => true,
            'messages' => $messages->map(function ($m) use ($currentUser) {
                return [
                    'id' => $m->id,
                    'body' => $m->body,
                    'created_at' => optional($m->created_at)->toIso8601String(),
                    'created_at_label' => optional($m->created_at)->format('g:i A d/m'),
                    'sender_id' => $m->sender_id,
                    'sender_name' => optional($m->sender)->name,
                    'is_self' => $m->sender_id === $currentUser->id,
                ];
            })->values(),
        ]);
    }

    protected function findOrCreateDoctorConversation(User $user, User $doctor): Conversation
    {
        $conversation = Conversation::where('type', 'admin_user')
            ->where(function ($query) use ($user, $doctor) {
                $query->where([
                    'admin_id' => $user->id,
                    'participant_id' => $doctor->id,
                ])->orWhere(function ($query) use ($user, $doctor) {
                    $query->where([
                        'admin_id' => $doctor->id,
                        'participant_id' => $user->id,
                    ]);
                });
            })
            ->first();

        if (! $conversation) {
            $conversation = Conversation::create([
                'type' => 'admin_user',
                'admin_id' => $user->id,
                'participant_id' => $doctor->id,
            ]);
        }

        return $conversation;
    }

    protected function hydrateDoctorContactsWithLastMessage(User $currentUser, $doctors)
    {
        return $doctors->map(function (User $doctor) use ($currentUser) {
            $conversation = Conversation::where('type', 'admin_user')
                ->where(function ($query) use ($currentUser, $doctor) {
                    $query->where([
                        'admin_id' => $currentUser->id,
                        'participant_id' => $doctor->id,
                    ])->orWhere(function ($query) use ($currentUser, $doctor) {
                        $query->where([
                            'admin_id' => $doctor->id,
                            'participant_id' => $currentUser->id,
                        ]);
                    });
                })
                ->with(['messages' => function ($query) {
                    $query->latest()->limit(1);
                }])
                ->first();

            $lastMessage = null;
            $lastMessageAt = null;
            $lastFromSelf = false;

            if ($conversation && $conversation->messages && $conversation->messages->isNotEmpty()) {
                $last = $conversation->messages->first();
                $lastMessage = $last->body;
                $lastMessageAt = $last->created_at;
                $lastFromSelf = $last->sender_id === $currentUser->id;
            }

            $doctor->last_message = $lastMessage;
            $doctor->last_message_at = $lastMessageAt;
            $doctor->last_message_from_self = $lastFromSelf;

            return $doctor;
        });
    }

    public function notifications(Request $request)
    {
        $currentUser = $request->user();

        $doctors = User::whereIn('role', ['admin', 'assistant'])
            ->orderBy('name')
            ->get();

        $doctorContacts = $this->hydrateDoctorContactsWithLastMessage($currentUser, $doctors)
            ->filter(function (User $doctor) {
                return $doctor->last_message && empty($doctor->last_message_from_self) === true;
            });

        return view('user.notifications.index', [
            'currentUser' => $currentUser,
            'doctorNotifications' => $doctorContacts,
            'notifications' => $currentUser->notifications()->latest()->paginate(20),
        ]);
    }

    public function markAllNotificationsAsRead(Request $request)
    {
        $currentUser = $request->user();
        $query = $currentUser->unreadNotifications();
        
        $type = $request->query('type');
        if ($type === 'message') {
            $query->where('data->type', 'case_message_received');
        } elseif ($type === 'notification') {
            $query->where('data->type', '!=', 'case_message_received');
        }
        
        $query->get()->markAsRead();

        return response()->json(['success' => true]);
    }

    public function markNotificationAsRead(Request $request, $id)
    {
        $currentUser = $request->user();
        $notification = $currentUser->notifications()->findOrFail($id);
        $notification->markAsRead();

        return response()->json(['success' => true]);
    }

    public function clearAllNotifications(Request $request)
    {
        $currentUser = $request->user();
        $query = $currentUser->notifications();
        
        $type = $request->query('type');
        if ($type === 'message') {
            $query->where('data->type', 'case_message_received');
        } elseif ($type === 'notification') {
            $query->where('data->type', '!=', 'case_message_received');
        }
        
        $query->delete();

        return response()->json(['success' => true]);
    }

    public function recentNotifications(Request $request)
    {
        $user = $request->user();
        
        $notifications = $user->unreadNotifications()
            ->latest()
            ->take(5)
            ->get();
            
        return response()->json([
            'ok' => true,
            'notifications' => $notifications->map(function($n) {
                return [
                    'id' => $n->id,
                    'title' => $n->data['title'] ?? 'New Notification',
                    'message' => $n->data['message'] ?? '',
                    'type' => $n->data['type'] ?? 'general',
                    'url' => $n->data['url'] ?? '#',
                    'created_at' => $n->created_at->diffForHumans(),
                ];
            })
        ]);
    }
}
