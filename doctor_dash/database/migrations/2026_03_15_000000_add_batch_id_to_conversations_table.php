<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('conversations', function (Blueprint $table) {
            $table->string('batch_id')->nullable()->after('type');
            $table->index('batch_id');
            
            // Make admin_id and participant_id nullable for case_chat conversations
            $table->foreignId('admin_id')->nullable()->change();
            $table->foreignId('participant_id')->nullable()->change();
        });
    }

    public function down(): void
    {
        Schema::table('conversations', function (Blueprint $table) {
            $table->dropIndex(['batch_id']);
            $table->dropColumn('batch_id');
        });
    }
};
