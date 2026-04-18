@extends('layouts.user')

@section('title', 'Admin group')
@section('header', 'Admin group chat')

@section('content')
    <div class="rounded-3xl bg-slate-900/80 border border-slate-700/70 flex flex-col max-h-[78vh]">
        <div class="border-b border-slate-800 px-5 py-4 flex items-center justify-between text-sm">
            <div>
                <p class="font-semibold text-sm md:text-base">Admin Group</p>
                <p class="text-slate-400 text-xs md:text-sm">Group conversation with admin and assistants</p>
            </div>
        </div>
        <div id="bh-chat-messages" class="flex-1 overflow-y-auto px-5 py-4 space-y-4 text-sm" data-last-message-id="{{ optional($messages->last())->id ?? 0 }}" data-poll-url="{{ route('user.chats.group.messages') }}">
            @forelse ($messages as $message)
                <div class="flex {{ $message->sender_id === auth()->id() ? 'justify-end' : 'justify-start' }}">
                    <div
                        class="max-w-md rounded-2xl px-4 py-3 border {{ $message->sender_id === auth()->id() ? 'bg-yellow-400 text-black border-yellow-300/60' : 'bg-indigo-500/15 text-white border-indigo-400/30' }}">
                        <p class="text-[11px] font-semibold mb-1 {{ $message->sender_id === auth()->id() ? 'text-black/70' : 'text-indigo-200/90' }}">
                            {{ optional($message->sender)->name ?? 'Admin' }}
                        </p>
                        <p>{{ $message->body }}</p>
                        <p class="mt-1 text-[11px] font-semibold {{ $message->sender_id === auth()->id() ? 'text-black/60' : 'text-indigo-200/70' }}">
                            {{ $message->created_at->format('g:i A d/m') }}</p>
                    </div>
                </div>
            @empty
                <p class="text-sm text-slate-400">No messages yet. Start the conversation.</p>
            @endforelse
        </div>
        <form method="POST" action="{{ route('user.chats.group.send') }}"
            class="border-t border-slate-800 px-5 py-4 flex gap-3 text-sm">
            @csrf
            <input type="text" name="body"
                class="flex-1 rounded-lg border border-slate-700 bg-slate-950/80 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                placeholder="Type a message...">
            <button type="submit"
                class="btn btn-yellow px-5 py-3">Send</button>
        </form>
    </div>
@endsection

@push('scripts')
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
                bubble.className = 'max-w-md rounded-2xl px-4 py-3 border ' + (msg.is_self ? 'bg-yellow-400 text-black border-yellow-300/60' : 'bg-indigo-500/15 text-white border-indigo-400/30');

                var name = document.createElement('p');
                name.className = 'text-[11px] font-semibold mb-1 ' + (msg.is_self ? 'text-black/70' : 'text-indigo-200/90');
                name.textContent = msg.sender_name || 'Admin';

                var body = document.createElement('p');
                body.textContent = msg.body;

                var time = document.createElement('p');
                time.className = 'mt-1 text-[11px] font-semibold ' + (msg.is_self ? 'text-black/60' : 'text-indigo-200/70');
                time.textContent = msg.created_at_label || '';

                bubble.appendChild(name);
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
