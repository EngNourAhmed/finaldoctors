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
        Schema::table('reports', function (Blueprint $table) {
            $table->string('arch_type')->nullable()->after('case_type');
            $table->integer('implants_count')->nullable()->after('arch_type');
            $table->string('implant_brand')->nullable()->after('implants_count');
            $table->json('clinical_data')->nullable()->after('implant_brand');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('reports', function (Blueprint $table) {
            $table->dropColumn(['arch_type', 'implants_count', 'implant_brand', 'clinical_data']);
        });
    }
};
