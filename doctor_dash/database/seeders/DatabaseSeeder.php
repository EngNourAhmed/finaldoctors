<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Cleanup non-admin users to prevent duplicates or unwanted static users
        \App\Models\User::where('role', '!=', 'admin')->delete();

        // Ensure only one admin exists
        \App\Models\User::updateOrCreate(
            ['email' => 'admin@admin.com'],
            [
                'name' => 'Admin',
                'password' => bcrypt('12345678'),
                'role' => 'admin',
            ]
        );
    }

}
