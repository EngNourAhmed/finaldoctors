@extends('layouts.admin')

@section('title', 'Chats with Assistants')
@section('header', 'Chats with Admin Assistants')

@section('content')
    <div class="grid gap-8 md:grid-cols-3">
        <div class="rounded-3xl bg-slate-900/80 border border-slate-700/70 p-5 md:p-6 md:col-span-1">
            <h2 class="text-base font-semibold mb-3">Assistants & Admins</h2>
            <div class="mb-3">
                <input id="assistant-search" type="text" placeholder="Search by name or email"
                    class="w-full rounded-lg border border-slate-700 bg-slate-950/80 px-3 py-2 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400">
            </div>
            <ul class="space-y-2 text-sm">
                @forelse ($assistants as $assistant)
                    <li data-assistant-item
                        data-search-text="{{ strtolower($assistant->name . ' ' . $assistant->email) }}">
                        <a href="{{ route('admin.chats.assistants.show', $assistant) }}"
                            class="flex items-center justify-between gap-3 rounded-xl px-4 py-3 text-sm {{ optional($activeAssistant)->id === $assistant->id ? 'bg-slate-800 text-amber-300' : 'hover:bg-slate-900 text-slate-200' }}">
                            <div class="min-w-0">
                                <p class="font-medium truncate max-w-[140px]">{{ $assistant->name }}</p>
                                <p class="text-[11px] text-slate-400 truncate max-w-[160px]">{{ $assistant->email }}</p>
                            </div>
                            <div class="text-right min-w-0">
                                @if ($assistant->last_message_at)
                                    <p class="text-[11px] text-slate-400">
                                        {{ $assistant->last_message_at->format('g:i A') }}
                                    </p>
                                @endif
                                <p class="mt-1 text-[11px] text-slate-500 max-w-[150px] truncate">
                                    @if ($assistant->last_message)
                                        {{ \Illuminate\Support\Str::limit($assistant->last_message, 40) }}
                                    @else
                                        No messages yet
                                    @endif
                                </p>
                                @if ($assistant->last_message && empty($assistant->last_message_from_self))
                                    <span
                                        class="mt-1 inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-2 py-0.5 text-[10px] font-semibold text-white">New</span>
                                @endif
                                @if (!empty($assistant->last_message_from_self) && $assistant->last_message)
                                    <span
                                        class="mt-1 inline-flex items-center rounded-full bg-amber-400/10 px-2 py-0.5 text-[10px] font-semibold text-amber-300 border border-amber-400/50">Waiting
                                        reply</span>
                                @endif
                            </div>
                        </a>
                    </li>
                @empty
                    <li class="text-xs text-slate-500">No assistants or admins available.</li>
                @endforelse
            </ul>
        </div>

        <div class="md:col-span-2 rounded-3xl bg-slate-900/80 border border-slate-700/70 flex flex-col max-h-[78vh]">
            @if ($activeAssistant && $conversation)
                <div class="border-b border-slate-800 px-5 py-4 flex items-center justify-between text-sm">
                    <div>
                        <p class="font-semibold text-sm md:text-base">{{ $activeAssistant->name }}</p>
                        <p class="text-slate-400 text-xs md:text-sm">Assistant</p>
                    </div>
                </div>
                <div id="bh-chat-messages" class="flex-1 overflow-y-auto px-5 py-4 space-y-4 text-sm" data-last-message-id="{{ optional($messages->last())->id ?? 0 }}" data-poll-url="{{ route('admin.chats.assistants.messages', $activeAssistant) }}">
                    @foreach ($messages as $message)
                        <div
                            class="flex {{ $message->sender_id === auth()->id() ? 'justify-end' : 'justify-start' }}">
                            <div
                                class="max-w-md rounded-2xl px-4 py-3 border {{ $message->sender_id === auth()->id() ? 'bg-yellow-400 text-black border-yellow-300/60' : 'bg-purple-500/15 text-white border-purple-400/30' }}">
                                <p>{{ $message->body }}</p>
                                <p class="mt-1 text-[11px] font-semibold {{ $message->sender_id === auth()->id() ? 'text-black/60' : 'text-purple-200/80' }}">
                                    {{ $message->created_at->format('g:i A d/m') }}</p>
                            </div>
                        </div>
                    @endforeach
                </div>
                <form method="POST" action="{{ route('admin.chats.assistants.send', $activeAssistant) }}" class="border-t border-slate-800 px-5 py-4 flex gap-3 text-sm">
                    @csrf
                    <input type="text" name="body" class="flex-1 rounded-lg border border-slate-700 bg-slate-950/80 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400" placeholder="Type a message...">
                    <button type="submit" class="btn btn-yellow px-5 py-3">Send</button>
                </form>
            @else
                <div class="flex-1 flex items-center justify-center text-sm text-slate-400">
                    Select an assistant to start chatting.
                </div>
            @endif
        </div>
    </div>
@endsection

@push('scripts')
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            var searchInput = document.getElementById('assistant-search');
            if (!searchInput) return;

            var items = document.querySelectorAll('[data-assistant-item]');

            searchInput.addEventListener('input', function() {
                var term = this.value.toLowerCase();

                items.forEach(function(item) {
                    var text = item.getAttribute('data-search-text') || '';
                    if (text.indexOf(term) !== -1) {
                        item.style.display = '';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    </script>
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            var wrap = document.getElementById('bh-chat-messages');
            if (!wrap) return;

            function shouldAutoScroll() {
                return (wrap.scrollTop + wrap.clientHeight) >= (wrap.scrollHeight - 40);
            }

            function renderMessage(msg) {
                var outer = document.createElement('div');
                outer.className = 'flex ' + (msg.is_self ? 'justify-end' : 'justify-start');

                var bubble = document.createElement('div');
                bubble.className = 'max-w-md rounded-2xl px-4 py-3 border ' + (msg.is_self ? 'bg-yellow-400 text-black border-yellow-300/60' : 'bg-purple-500/15 text-white border-purple-400/30');

                var body = document.createElement('p');
                body.textContent = msg.body;

                var time = document.createElement('p');
                time.className = 'mt-1 text-[11px] font-semibold ' + (msg.is_self ? 'text-black/60' : 'text-purple-200/80');
                time.textContent = msg.created_at_label || '';

                bubble.appendChild(body);
                bubble.appendChild(time);
                outer.appendChild(bubble);
                return outer;
            }

            async function poll() {
                var url = wrap.getAttribute('data-poll-url');
                if (!url) return;

                var lastId = parseInt(wrap.getAttribute('data-last-message-id') || '0', 10);
                var auto = shouldAutoScroll();

                try {
                    var res = await fetch(url + '?after_id=' + lastId, {
                        headers: {
                            'Accept': 'application/json',
                            'X-Requested-With': 'XMLHttpRequest'
                        }
                    });

                    if (!res.ok) return;
                    var data = await res.json();
                    if (!data || !data.ok || !Array.isArray(data.messages)) return;

                    if (data.messages.length) {
                        data.messages.forEach(function(m) {
                            wrap.appendChild(renderMessage(m));
                            lastId = Math.max(lastId, parseInt(m.id, 10));
                        });
                        wrap.setAttribute('data-last-message-id', String(lastId));
                        if (auto) {
                            wrap.scrollTop = wrap.scrollHeight;
                        }
                    }
                } catch (e) {
                    // ignore
                }
            }

            wrap.scrollTop = wrap.scrollHeight;
            setInterval(poll, 2000);
        });
    </script>
@endpush
