<?php

namespace App\Providers;

use App\Models\Conversation;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        View::composer('layouts.admin', function ($view) {
            $user = Auth::user();

            if (! $user) {
                $view->with('bhGroupChatHasNew', false);
                return;
            }

            $hasNew = Conversation::query()
                ->where('type', 'user_doctors_group')
                ->whereExists(function ($q) use ($user) {
                    $q->select(DB::raw(1))
                        ->from('messages as m')
                        ->whereColumn('m.conversation_id', 'conversations.id')
                        ->whereColumn(
                            'm.id',
                            DB::raw('(select m2.id from messages as m2 where m2.conversation_id = conversations.id order by m2.created_at desc, m2.id desc limit 1)')
                        )
                        ->where('m.sender_id', '!=', $user->id);
                })
                ->exists();

            $view->with('bhGroupChatHasNew', $hasNew);
        });
    }
}
