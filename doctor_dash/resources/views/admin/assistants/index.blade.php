@extends('layouts.admin')

@section('title', 'Admin Assistants')
@section('header', 'Admin Assistants')

@section('content')
    <div class="grid gap-6 md:grid-cols-3">
        <div class="md:col-span-2 rounded-2xl bg-slate-900/80 border border-slate-700/70 p-4">
            <h2 class="text-lg font-semibold mb-4">Assistants</h2>
            <table class="w-full text-xs text-slate-200">
                <thead class="text-slate-400 border-b border-slate-700/70 text-[14px]">
                    <tr>
                        <th class="text-left py-2 px-2">Name</th>
                        <th class="text-left py-2 px-2">Email</th>
                        <th class="text-left py-2 px-2">Address</th>
                        <th class="text-left py-2 px-2">Phone</th>
                        <th class="text-left py-2 px-2">Created</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse ($assistants as $assistant)
                        <tr class="border-b border-slate-800/70 last:border-0">
                            <td class="py-2 px-2 text-[14px] text-amber-300 font-semibold">{{ $assistant->name }}</td>
                            <td class="py-2 px-2 text-[14px]">{{ $assistant->email }}</td>
                            <td class="py-2 px-2 text-[14px]">{{ $assistant->address ?? '-' }}</td>
                            <td class="py-2 px-2 text-[14px]">{{ $assistant->phone ?? '-' }}</td>
                            <td class="py-2 px-2 text-slate-400 text-[14px]">{{ $assistant->created_at->format('Y-m-d H:i') }}</td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="4" class="py-3 px-2 text-slate-400">No assistants yet.</td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>

        <div class="rounded-2xl bg-slate-900/80 border border-slate-700/70 p-4">
            <h2 class="text-sm font-semibold mb-3">Add Assistant</h2>
            <form method="POST" action="{{ route('admin.assistants.store') }}" class="space-y-3 text-xs">
                @csrf
                <div>
                    <label class="block mb-1" for="name">Full name</label>
                    <input id="name" name="name" type="text" value="{{ old('name') }}" required class="w-full rounded-lg border border-slate-600 bg-slate-950/60 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400">
                </div>
                <div>
                    <label class="block mb-1" for="email">Email</label>
                    <input id="email" name="email" type="email" value="{{ old('email') }}" required class="w-full rounded-lg border border-slate-600 bg-slate-950/60 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400">
                </div>
                <div>
                    <label class="block mb-1" for="password">Password</label>
                    <input id="password" name="password" type="password" required class="w-full rounded-lg border border-slate-600 bg-slate-950/60 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400">
                </div>
                <div class="grid grid-cols-1 gap-3">
                    <div>
                        <label class="block mb-1" for="address">Address (optional)</label>
                        <input id="address" name="address" type="text" value="{{ old('address') }}" class="w-full rounded-lg border border-slate-600 bg-slate-950/60 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400">
                    </div>
                    <div>
                        <label class="block mb-1" for="phone">Phone number</label>
                        <input id="phone" name="phone" type="tel" value="{{ old('phone') }}" pattern="^\+?[0-9]{9,15}$" class="w-full rounded-lg border border-slate-600 bg-slate-950/60 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400" placeholder="+971501234567">
                    </div>
                </div>
                <button type="submit" class="btn btn-yellow w-full mt-4">Create assistant</button>
            </form>
        </div>
    </div>
@endsection
