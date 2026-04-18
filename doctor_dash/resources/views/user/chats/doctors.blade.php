@extends('layouts.user')

@section('title', 'Chat with admin')
@section('header', 'Chats with Admin')

@section('content')
    <div class="grid gap-8 md:grid-cols-3">
        <div class="rounded-3xl bg-slate-900/80 border border-slate-700/70 p-5 md:p-6 md:col-span-1">
            <h2 class="text-base font-semibold mb-3">Admins</h2>
            <div class="mb-3">
                <input id="doctor-search" type="text" placeholder="Search by name or email"
                    class="w-full rounded-lg border border-slate-700 bg-slate-950/80 px-3 py-2 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400">
            </div>
            <ul class="space-y-2 text-sm">
                @forelse ($doctors as $doctor)
                    <li data-doctor-item data-search-text="{{ strtolower($doctor->name . ' ' . $doctor->email) }}">
                        <a href="{{ route('user.chats.doctors.show', $doctor) }}"
                            class="flex items-center justify-between gap-3 rounded-xl px-4 py-3 text-sm {{ optional($activeDoctor)->id === $doctor->id ? 'bg-slate-800 text-amber-300' : 'hover:bg-slate-900 text-slate-200' }}">
                            <div class="min-w-0">
                                <p class="font-medium truncate max-w-[140px]">{{ $doctor->name }}</p>
                                <p class="text-[11px] text-slate-400 truncate max-w-[160px]">{{ $doctor->email }}</p>
                            </div>
                            <div class="text-right min-w-0">
                                @if ($doctor->last_message_at)
                                    <p class="text-[11px] text-slate-400">
                                        {{ $doctor->last_message_at->format('g:i A') }}
                                    </p>
                                @endif
                                <p class="mt-1 text-[11px] text-slate-500 max-w-[150px] truncate">
                                    @if ($doctor->last_message)
                                        {{ \Illuminate\Support\Str::limit($doctor->last_message, 40) }}
                                    @else
                                        No messages yet
                                    @endif
                                </p>
                                @if (!empty($doctor->last_message_from_self) && $doctor->last_message)
                                    <span
                                        class="mt-1 inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold border status-yellow">Waiting
                                        reply</span>
                                @endif

                            </div>
                        </a>
                    </li>
                @empty
                    <li class="text-xs text-slate-500">No doctors available.</li>
                @endforelse
            </ul>
        </div>

        <div class="md:col-span-2 rounded-3xl bg-slate-900/80 border border-slate-700/70 flex flex-col max-h-[78vh]">
            @if ($activeDoctor && $conversation)
                <div class="border-b border-slate-800 px-5 py-4 flex items-center justify-between text-sm">
                    <div>
                        <p class="font-semibold text-sm md:text-base">{{ $activeDoctor->name }}</p>
                        <p class="text-slate-400 text-xs md:text-sm">Admin</p>
                    </div>
                </div>
                <div id="bh-chat-messages" class="flex-1 overflow-y-auto px-5 py-4 space-y-4 text-sm" data-last-message-id="{{ optional($messages->last())->id ?? 0 }}" data-poll-url="{{ route('user.chats.doctors.messages', $activeDoctor) }}">
                    @foreach ($messages as $message)
                        <div
                            class="flex {{ $message->sender_id === auth()->id() ? 'justify-end' : 'justify-start' }}">
                            <div
                                class="max-w-md rounded-2xl px-4 py-3 border {{ $message->sender_id === auth()->id() ? 'bg-yellow-400 text-black border-yellow-300/60' : 'bg-emerald-500/15 text-white border-emerald-400/30' }}">
                                <p>{{ $message->body }}</p>
                                <p class="mt-1 text-[11px] font-semibold {{ $message->sender_id === auth()->id() ? 'text-black/60' : 'text-emerald-200/80' }}">
                                    {{ $message->created_at->format('g:i A d/m') }}</p>
                            </div>
                        </div>
                    @endforeach
                </div>
                <form method="POST" action="{{ route('user.chats.doctors.send', $activeDoctor) }}"
                    class="border-t border-slate-800 px-5 py-4 flex gap-3 text-sm">
                    @csrf
                    <input type="text" name="body"
                        class="flex-1 rounded-lg border border-slate-700 bg-slate-950/80 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                        placeholder="Type a message...">
                    <button type="submit"
                        class="btn btn-yellow px-5 py-3">Send</button>
                </form>
            @else
                <div class="flex-1 flex items-center justify-center text-sm text-slate-400">
                    Select an admin to start chatting.
                </div>
            @endif
        </div>
    </div>
@endsection

@push('scripts')
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            var searchInput = document.getElementById('doctor-search');
            if (!searchInput) return;

            var items = document.querySelectorAll('[data-doctor-item]');

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
                bubble.className = 'max-w-md rounded-2xl px-4 py-3 border ' + (msg.is_self ? 'bg-yellow-400 text-black border-yellow-300/60' : 'bg-emerald-500/15 text-white border-emerald-400/30');

                var body = document.createElement('p');
                body.textContent = msg.body;

                var time = document.createElement('p');
                time.className = 'mt-1 text-[11px] font-semibold ' + (msg.is_self ? 'text-black/60' : 'text-emerald-200/80');
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

            // initial scroll to bottom
            wrap.scrollTop = wrap.scrollHeight;

            setInterval(poll, 2000);
        });
    </script>
@endpush
