<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Add new contact fields
            $table->string('address')->nullable()->after('role');
            $table->string('phone')->nullable()->after('address');

            // Drop old speciality field if it exists
            if (Schema::hasColumn('users', 'speciality')) {
                $table->dropColumn('speciality');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Restore speciality and drop address/phone
            if (!Schema::hasColumn('users', 'speciality')) {
                $table->string('speciality')->nullable()->after('role');
            }

            if (Schema::hasColumn('users', 'address')) {
                $table->dropColumn('address');
            }

            if (Schema::hasColumn('users', 'phone')) {
                $table->dropColumn('phone');
            }
        });
    }
};
