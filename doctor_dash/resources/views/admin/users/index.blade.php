@extends('layouts.admin')

@section('title', 'All Users')
@section('header', 'All Users')

@section('content')
    <div class="space-y-6">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-2 px-2">
            <div>
                <h2 class="text-2xl font-bold text-white tracking-tight">Total Users</h2>
                <p class="text-sm text-gray-400 mt-1">Manage roles, cases, and filter active members across the platform.</p>
            </div>
        </div>

        <div class="mb-4"></div>

        <div class="bh-table-transparent rounded-xl border border-white/10 bg-[#0c0c0c]">
            <div class="w-full overflow-x-auto">
                <table class="w-full text-left text-sm text-gray-300 table-users overflow-visible border-collapse">
                    <thead class="sticky top-0 z-20 shadow-md">
                        <tr class="border-b border-white/10">
                            <th class="px-4 py-3 font-bold text-gray-400 uppercase tracking-widest text-[10px]">Name</th>
                            <th class="px-4 py-3 font-bold text-gray-400 uppercase tracking-widest text-[10px]">Email</th>
                            <th class="px-4 py-3 font-bold text-gray-400 uppercase tracking-widest text-[10px]">Address</th>
                            <th class="px-4 py-3 font-bold text-gray-400 uppercase tracking-widest text-[10px]">Phone</th>
                        </tr>
                    </thead>
                    <tbody class="divide-none">
                        @foreach ($users as $user)
                            <tr class="transition-colors group hover:bg-white/[0.03]">
                                <td class="px-4 py-2.5 text-[#FACC15] font-bold search-target text-[13px] border-b border-white/10">
                                    <a href="{{ route('admin.users.reports', $user) }}" class="hover:underline">
                                        {{ $user->name }}
                                    </a>
                                </td>
                                <td class="px-4 py-2.5 text-gray-300 search-target text-[13px] border-b border-white/10">{{ $user->email }}</td>
                                <td class="px-4 py-2.5 text-gray-400 text-[13px] border-b border-white/10">{{ $user->address ?? '-' }}</td>
                                <td class="px-4 py-2.5 text-gray-400 search-target text-[13px] border-b border-white/10">{{ $user->phone ?? '-' }}</td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
               
            <div class="pt-3 px-6 pb-6">
                {{ $users->links('vendor.pagination.custom') }}
             </div>
        </div>
    </div>

    <script>
        (function () {
            const input = document.getElementById('usersSearch');
            const table = document.querySelector('.table-users');
            if (!input || !table) return;

            const rows = Array.from(table.querySelectorAll('tbody tr'));

            function normalize(value) {
                return (value || '').toLowerCase().replace(/\s+/g, ' ').trim();
            }

            function applyFilter() {
                const q = normalize(input.value);
                rows.forEach((row) => {
                    const targets = row.querySelectorAll('.search-target');
                    let text = '';
                    targets.forEach(t => { text += ' ' + t.innerText; });
                    text = normalize(text);
                    
                    row.style.display = !q || text.includes(q) ? '' : 'none';
                });
            }

            input.addEventListener('input', applyFilter);
        })();

    </script>
@endsection
