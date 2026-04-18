<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Conversation;
use App\Models\ConversationParticipant;
use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ChatController extends Controller
{
    public function assistants()
    {
        $currentUser = Auth::user();

        $assistants = User::whereIn('role', ['admin', 'assistant'])
            ->where('id', '!=', $currentUser->id)
            ->orderBy('name')
            ->get();

        $assistants = $this->hydrateStaffContactsWithLastMessage($currentUser, $assistants);

        return view('admin.chats.assistants', [
            'assistants' => $assistants,
            'activeAssistant' => null,
            'conversation' => null,
            'messages' => collect(),
        ]);
    }

    public function assistantConversation(User $assistant)
    {
        abort_unless(in_array($assistant->role, ['assistant', 'admin'], true), 404);

        $currentUser = Auth::user();

        if ($assistant->id === $currentUser->id) {
            abort(404);
        }

        $conversation = $this->findOrCreateStaffConversation($currentUser, $assistant);

        $messages = $conversation->messages()
            ->with('sender')
            ->orderBy('created_at')
            ->get();

        $assistants = User::whereIn('role', ['admin', 'assistant'])
            ->where('id', '!=', $currentUser->id)
            ->orderBy('name')
            ->get();

        $assistants = $this->hydrateStaffContactsWithLastMessage($currentUser, $assistants);

        return view('admin.chats.assistants', [
            'assistants' => $assistants,
            'activeAssistant' => $assistant,
            'conversation' => $conversation,
            'messages' => $messages,
        ]);
    }

    public function sendToAssistant(Request $request, User $assistant)
    {
        abort_unless(in_array($assistant->role, ['assistant', 'admin'], true), 404);

        $data = $request->validate([
            'body' => ['required', 'string', 'max:2000'],
        ]);

        $currentUser = Auth::user();

        if ($assistant->id === $currentUser->id) {
            abort(404);
        }

        $conversation = $this->findOrCreateStaffConversation($currentUser, $assistant);

        Message::create([
            'conversation_id' => $conversation->id,
            'sender_id' => $currentUser->id,
            'body' => $data['body'],
        ]);

        return redirect()->route('admin.chats.assistants.show', $assistant);
    }

    public function assistantMessages(Request $request, User $assistant)
    {
        abort_unless(in_array($assistant->role, ['assistant', 'admin'], true), 404);

        $currentUser = $request->user();
        if ($assistant->id === $currentUser->id) {
            abort(404);
        }

        $afterId = (int) $request->query('after_id', 0);
        $conversation = $this->findOrCreateStaffConversation($currentUser, $assistant);

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

    public function users()
    {
        $users = User::where('role', 'user')->orderBy('name')->get();

        $currentUser = Auth::user();

        $users = $this->hydrateUserContactsWithLastMessage($currentUser, $users);

        return view('admin.chats.users', [
            'users' => $users,
            'activeUser' => null,
            'conversation' => null,
            'messages' => collect(),
        ]);
    }

    public function userConversation(User $user)
    {
        abort_unless($user->role === 'user', 404);

        $currentUser = Auth::user();

        $conversation = $this->findOrCreateAdminUserConversation($currentUser, $user);

        $messages = $conversation->messages()
            ->with('sender')
            ->orderBy('created_at')
            ->get();

        $users = User::where('role', 'user')->orderBy('name')->get();

        $users = $this->hydrateUserContactsWithLastMessage($currentUser, $users);

        return view('admin.chats.users', [
            'users' => $users,
            'activeUser' => $user,
            'conversation' => $conversation,
            'messages' => $messages,
        ]);
    }

    public function sendToUser(Request $request, User $user)
    {
        abort_unless($user->role === 'user', 404);

        $data = $request->validate([
            'body' => ['required', 'string', 'max:2000'],
        ]);

        $currentUser = Auth::user();

        $conversation = $this->findOrCreateAdminUserConversation($currentUser, $user);

        $message = Message::create([
            'conversation_id' => $conversation->id,
            'sender_id' => $currentUser->id,
            'body' => $data['body'],
        ]);

        // Return JSON for AJAX requests
        if ($request->expectsJson() || $request->ajax()) {
            return response()->json([
                'ok' => true,
                'message' => $message
            ]);
        }

        return redirect()->route('admin.chats.users.show', $user);
    }

    public function userMessages(Request $request, User $user)
    {
        abort_unless($user->role === 'user', 404);

        $currentUser = $request->user();
        $afterId = (int) $request->query('after_id', 0);

        $conversation = $this->findOrCreateAdminUserConversation($currentUser, $user);

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

    public function userGroups()
    {
        $currentUser = Auth::user();

        $users = User::where('role', 'user')->orderBy('name')->get();

        $users = $this->hydrateUserGroupContactsWithLastMessage($currentUser, $users);

        return view('admin.chats.groups', [
            'users' => $users,
            'activeUser' => null,
            'conversation' => null,
            'messages' => collect(),
        ]);
    }

    public function userGroupConversation(User $user)
    {
        abort_unless($user->role === 'user', 404);

        $currentUser = Auth::user();

        $conversation = Conversation::firstOrCreate([
            'type' => 'user_doctors_group',
            'admin_id' => $user->id,
            'participant_id' => $user->id,
        ]);

        $doctorIds = User::whereIn('role', ['admin', 'assistant'])->pluck('id');
        $participantIds = $doctorIds->push($user->id)->unique()->all();
        $conversation->participants()->syncWithoutDetaching($participantIds);

        $messages = $conversation->messages()
            ->with('sender')
            ->orderBy('created_at')
            ->get();

        $users = User::where('role', 'user')->orderBy('name')->get();
        $users = $this->hydrateUserGroupContactsWithLastMessage($currentUser, $users);

        return view('admin.chats.groups', [
            'users' => $users,
            'activeUser' => $user,
            'conversation' => $conversation,
            'messages' => $messages,
        ]);
    }

    public function sendToUserGroup(Request $request, User $user)
    {
        abort_unless($user->role === 'user', 404);

        $data = $request->validate([
            'body' => ['required', 'string', 'max:2000'],
        ]);

        $currentUser = Auth::user();

        $conversation = Conversation::firstOrCreate([
            'type' => 'user_doctors_group',
            'admin_id' => $user->id,
            'participant_id' => $user->id,
        ]);

        $doctorIds = User::whereIn('role', ['admin', 'assistant'])->pluck('id');
        $participantIds = $doctorIds->push($user->id)->unique()->all();
        $conversation->participants()->syncWithoutDetaching($participantIds);

        Message::create([
            'conversation_id' => $conversation->id,
            'sender_id' => $currentUser->id,
            'body' => $data['body'],
        ]);

        return redirect()->route('admin.chats.groups.show', $user);
    }

    public function userGroupMessages(Request $request, User $user)
    {
        abort_unless($user->role === 'user', 404);

        $currentUser = $request->user();
        $afterId = (int) $request->query('after_id', 0);

        $conversation = Conversation::firstOrCreate([
            'type' => 'user_doctors_group',
            'admin_id' => $user->id,
            'participant_id' => $user->id,
        ]);

        $doctorIds = User::whereIn('role', ['admin', 'assistant'])->pluck('id');
        $participantIds = $doctorIds->push($user->id)->unique()->all();
        $conversation->participants()->syncWithoutDetaching($participantIds);

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

    protected function findOrCreateStaffConversation(User $currentUser, User $other): Conversation
    {
        $conversation = Conversation::where('type', 'admin_assistant')
            ->where(function ($query) use ($currentUser, $other) {
                $query->where([
                    'admin_id' => $currentUser->id,
                    'participant_id' => $other->id,
                ])->orWhere(function ($query) use ($currentUser, $other) {
                    $query->where([
                        'admin_id' => $other->id,
                        'participant_id' => $currentUser->id,
                    ]);
                });
            })
            ->first();

        if (! $conversation) {
            $conversation = Conversation::create([
                'type' => 'admin_assistant',
                'admin_id' => $currentUser->id,
                'participant_id' => $other->id,
            ]);
        }

        return $conversation;
    }

    protected function findOrCreateAdminUserConversation(User $currentUser, User $user): Conversation
    {
        $conversation = Conversation::where('type', 'admin_user')
            ->where(function ($query) use ($currentUser, $user) {
                $query->where([
                    'admin_id' => $currentUser->id,
                    'participant_id' => $user->id,
                ])->orWhere(function ($query) use ($currentUser, $user) {
                    $query->where([
                        'admin_id' => $user->id,
                        'participant_id' => $currentUser->id,
                    ]);
                });
            })
            ->first();

        if (! $conversation) {
            $conversation = Conversation::create([
                'type' => 'admin_user',
                'admin_id' => $currentUser->id,
                'participant_id' => $user->id,
            ]);
        }

        return $conversation;
    }

    protected function hydrateStaffContactsWithLastMessage(User $currentUser, $contacts)
    {
        return $contacts->map(function (User $contact) use ($currentUser) {
            $conversation = Conversation::where('type', 'admin_assistant')
                ->where(function ($query) use ($currentUser, $contact) {
                    $query->where([
                        'admin_id' => $currentUser->id,
                        'participant_id' => $contact->id,
                    ])->orWhere(function ($query) use ($currentUser, $contact) {
                        $query->where([
                            'admin_id' => $contact->id,
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

            $contact->last_message = $lastMessage;
            $contact->last_message_at = $lastMessageAt;
            $contact->last_message_from_self = $lastFromSelf;

            return $contact;
        });
    }

    protected function hydrateUserContactsWithLastMessage(User $currentUser, $users)
    {
        return $users->map(function (User $user) use ($currentUser) {
            $conversation = Conversation::where('type', 'admin_user')
                ->where(function ($query) use ($currentUser, $user) {
                    $query->where([
                        'admin_id' => $currentUser->id,
                        'participant_id' => $user->id,
                    ])->orWhere(function ($query) use ($currentUser, $user) {
                        $query->where([
                            'admin_id' => $user->id,
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

            $user->last_message = $lastMessage;
            $user->last_message_at = $lastMessageAt;
            $user->last_message_from_self = $lastFromSelf;

            return $user;
        });
    }

    protected function hydrateUserGroupContactsWithLastMessage(User $currentUser, $users)
    {
        return $users->map(function (User $user) use ($currentUser) {
            $conversation = Conversation::where('type', 'user_doctors_group')
                ->where('admin_id', $user->id)
                ->where('participant_id', $user->id)
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

            $user->group_last_message = $lastMessage;
            $user->group_last_message_at = $lastMessageAt;
            $user->group_last_message_from_self = $lastFromSelf;

            return $user;
        });
    }

    public function notifications(Request $request)
    {
        $currentUser = $request->user();

        // Assistants & other admins conversations
        $staff = User::whereIn('role', ['admin', 'assistant'])
            ->where('id', '!=', $currentUser->id)
            ->orderBy('name')
            ->get();

        $staffContacts = $this->hydrateStaffContactsWithLastMessage($currentUser, $staff)
            ->filter(function (User $contact) {
                return $contact->last_message && empty($contact->last_message_from_self) === true;
            });

        // Users conversations
        $users = User::where('role', 'user')
            ->orderBy('name')
            ->get();

        $userContacts = $this->hydrateUserContactsWithLastMessage($currentUser, $users)
            ->filter(function (User $user) {
                return $user->last_message && empty($user->last_message_from_self) === true;
            });

        $databaseNotifications = $currentUser->notifications()->latest()->take(50)->get();

        return view('admin.notifications.index', [
            'currentUser' => $currentUser,
            'staffNotifications' => $staffContacts,
            'userNotifications' => $userContacts,
            'databaseNotifications' => $databaseNotifications,
        ]);
    }

    public function markAllNotificationsAsRead(Request $request)
    {
        $currentUser = $request->user();
        $query = $currentUser->unreadNotifications();
        
        $type = $request->query('type');
        if ($type === 'message') {
            // Adjust message type for admin if needed, current system uses case_message_received for both
            $query->where('data->type', 'case_message_received');
        } elseif ($type === 'notification') {
            $query->where('data->type', '!=', 'case_message_received');
        }
        
        $query->get()->markAsRead();

        return response()->json(['success' => true]);
    }

    public function markNotificationAsRead(Request $request, $id)
    {
        $notification = $request->user()->notifications()->findOrFail($id);
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

}
