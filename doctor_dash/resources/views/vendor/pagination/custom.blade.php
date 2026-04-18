@if ($paginator->total() > 0)
    <nav role="navigation" aria-label="Pagination Navigation" class="flex flex-col sm:flex-row items-center justify-between gap-4 py-3 px-4">
        {{-- Showing results info --}}
        <div class="text-[10px] text-white/50 font-black uppercase tracking-[0.2em]">
            {!! __('Showing') !!}
            <span class="text-white">{{ $paginator->firstItem() }}</span>
            {!! __('to') !!}
            <span class="text-white">{{ $paginator->lastItem() }}</span>
            <span class="mx-2">/</span>
            {!! __('Total') !!}
            <span class="text-[#FACC15]">{{ $paginator->total() }}</span>
        </div>

        @if ($paginator->hasPages())
        <div class="flex items-center gap-3">
            {{-- Previous Page Link --}}
            @if ($paginator->onFirstPage())
                <span class="flex items-center justify-center h-10 w-10 rounded-full border border-white/5 bg-white/[0.02] text-gray-700 cursor-not-allowed">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M15 19l-7-7 7-7"/></svg>
                </span>
            @else
                <a href="{{ $paginator->previousPageUrl() }}" rel="prev" 
                    class="flex items-center justify-center h-10 w-10 rounded-full border border-white/10 bg-[#0c0c0c] text-gray-400 hover:text-white hover:border-white/20 transition-all duration-300"
                    aria-label="@lang('pagination.previous')">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M15 19l-7-7 7-7"/></svg>
                </a>
            @endif

            {{-- Pagination Elements --}}
            <div class="flex items-center gap-1 bg-[#0c0c0c] p-1 rounded-full border border-white/10">
                @foreach ($elements as $element)
                    {{-- "Three Dots" Separator --}}
                    @if (is_string($element))
                        <span class="flex items-center justify-center h-8 w-8 text-gray-600 font-black text-[10px] select-none">
                            {{ $element }}
                        </span>
                    @endif

                    {{-- Array Of Links --}}
                    @if (is_array($element))
                        @foreach ($element as $page => $url)
                            @if ($page == $paginator->currentPage())
                                <span class="flex items-center justify-center h-8 min-w-[32px] px-3 rounded-full font-black text-[12px] select-none bg-[#FACC15] text-black shadow-[0_0_15px_rgba(250,204,21,0.2)]">
                                    {{ $page }}
                                </span>
                            @else
                                <a href="{{ $url }}" 
                                    class="flex items-center justify-center h-8 min-w-[32px] px-3 rounded-full text-gray-400 text-[12px] font-bold hover:text-white transition-all duration-200"
                                    aria-label="{{ __('Go to page :page', ['page' => $page]) }}">
                                    {{ $page }}
                                </a>
                            @endif
                        @endforeach
                    @endif
                @endforeach
            </div>

            {{-- Next Page Link --}}
            @if ($paginator->hasMorePages())
                <a href="{{ $paginator->nextPageUrl() }}" rel="next" 
                    class="flex items-center justify-center h-10 w-10 rounded-full border border-white/10 bg-[#0c0c0c] text-gray-400 hover:text-white hover:border-white/20 transition-all duration-300"
                    aria-label="@lang('pagination.next')">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M9 5l7 7-7 7"/></svg>
                </a>
            @else
                <span class="flex items-center justify-center h-10 w-10 rounded-full border border-white/5 bg-white/[0.02] text-gray-700 cursor-not-allowed">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M9 5l7 7-7 7"/></svg>
                </span>
            @endif
        </div>
        @endif
    </nav>
@endif