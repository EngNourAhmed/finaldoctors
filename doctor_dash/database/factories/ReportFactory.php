<?php

namespace Database\Factories;

use App\Models\Report;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ReportFactory extends Factory
{
    protected $model = Report::class;

    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'batch_id' => $this->faker->uuid(),
            'title' => $this->faker->sentence(),
            'description' => $this->faker->paragraph(),
            'file_path' => 'reports/' . $this->faker->uuid() . '.pdf',
            'original_name' => $this->faker->word() . '.pdf',
            'mime_type' => 'application/pdf',
            'size' => $this->faker->numberBetween(1000, 1000000),
            'status' => 'Pending',
        ];
    }
}
