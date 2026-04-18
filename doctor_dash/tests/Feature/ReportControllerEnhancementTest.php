<?php

namespace Tests\Feature;

use App\Models\Report;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class ReportControllerEnhancementTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        Storage::fake('public');
    }

    /** @test */
    public function user_can_upload_additional_files_to_existing_case()
    {
        $user = User::factory()->create(['role' => 'user']);
        $batchId = 'test-batch-123';
        
        // Create existing report
        Report::factory()->create([
            'user_id' => $user->id,
            'batch_id' => $batchId,
            'title' => 'Test Case',
            'description' => 'Test Description',
        ]);

        $file = UploadedFile::fake()->create('document.pdf', 100);

        $response = $this->actingAs($user)->postJson("/user/reports/{$batchId}/upload-additional", [
            'files' => [$file],
        ]);

        $response->assertStatus(200)
            ->assertJson(['ok' => true]);

        $this->assertDatabaseHas('reports', [
            'user_id' => $user->id,
            'batch_id' => $batchId,
            'original_name' => 'document.pdf',
        ]);
    }

    /** @test */
    public function upload_additional_validates_file_size()
    {
        $user = User::factory()->create(['role' => 'user']);
        $batchId = 'test-batch-size';
        
        Report::factory()->create([
            'user_id' => $user->id,
            'batch_id' => $batchId,
        ]);

        // Create a file larger than 512MB (512000 KB)
        $file = UploadedFile::fake()->create('large.pdf', 512001);

        $response = $this->actingAs($user)->postJson("/user/reports/{$batchId}/upload-additional", [
            'files' => [$file],
        ]);

        $response->assertStatus(422);
    }

    /** @test */
    public function upload_additional_requires_case_ownership()
    {
        $user1 = User::factory()->create(['role' => 'user']);
        $user2 = User::factory()->create(['role' => 'user']);
        $batchId = 'test-batch-ownership';
        
        Report::factory()->create([
            'user_id' => $user1->id,
            'batch_id' => $batchId,
        ]);

        $file = UploadedFile::fake()->create('document.pdf', 100);

        $response = $this->actingAs($user2)->postJson("/user/reports/{$batchId}/upload-additional", [
            'files' => [$file],
        ]);

        $response->assertStatus(404);
    }

    /** @test */
    public function user_can_generate_file_link()
    {
        $user = User::factory()->create(['role' => 'user']);
        $report = Report::factory()->create([
            'user_id' => $user->id,
            'batch_id' => 'test-batch-link',
        ]);

        $response = $this->actingAs($user)->postJson("/reports/{$report->id}/generate-link");

        $response->assertStatus(200)
            ->assertJsonStructure(['url']);
        
        $url = $response->json('url');
        $this->assertStringContainsString('reports/shared', $url);
        $this->assertStringContainsString('signature', $url);
    }

    /** @test */
    public function staff_can_generate_file_link_for_any_case()
    {
        $staff = User::factory()->create(['role' => 'admin']);
        $client = User::factory()->create(['role' => 'user']);
        
        $report = Report::factory()->create([
            'user_id' => $client->id,
            'batch_id' => 'test-batch-staff',
        ]);

        $response = $this->actingAs($staff)->postJson("/reports/{$report->id}/generate-link");

        $response->assertStatus(200)
            ->assertJsonStructure(['url']);
    }

    /** @test */
    public function unauthorized_user_cannot_generate_file_link()
    {
        $user1 = User::factory()->create(['role' => 'user']);
        $user2 = User::factory()->create(['role' => 'user']);
        
        $report = Report::factory()->create([
            'user_id' => $user1->id,
            'batch_id' => 'test-batch-unauth',
        ]);

        $response = $this->actingAs($user2)->postJson("/reports/{$report->id}/generate-link");

        $response->assertStatus(403);
    }

    /** @test */
    public function user_can_access_shared_file_with_valid_signature()
    {
        $user = User::factory()->create(['role' => 'user']);
        $report = Report::factory()->create([
            'user_id' => $user->id,
            'batch_id' => 'test-batch-shared',
            'file_path' => 'reports/test.pdf',
            'original_name' => 'test.pdf',
        ]);

        Storage::disk('public')->put('reports/test.pdf', 'test content');

        // Generate signature
        $signature = hash_hmac('sha256', $report->id . $report->batch_id, config('app.key'));

        $response = $this->actingAs($user)->get("/reports/shared/{$report->batch_id}/{$report->id}?signature={$signature}");

        $response->assertStatus(200);
    }

    /** @test */
    public function shared_file_rejects_invalid_signature()
    {
        $user = User::factory()->create(['role' => 'user']);
        $report = Report::factory()->create([
            'user_id' => $user->id,
            'batch_id' => 'test-batch-invalid',
        ]);

        $response = $this->actingAs($user)->get("/reports/shared/{$report->batch_id}/{$report->id}?signature=invalid");

        $response->assertStatus(403);
    }

    /** @test */
    public function shared_file_requires_case_access()
    {
        $user1 = User::factory()->create(['role' => 'user']);
        $user2 = User::factory()->create(['role' => 'user']);
        
        $report = Report::factory()->create([
            'user_id' => $user1->id,
            'batch_id' => 'test-batch-access',
        ]);

        $signature = hash_hmac('sha256', $report->id . $report->batch_id, config('app.key'));

        $response = $this->actingAs($user2)->get("/reports/shared/{$report->batch_id}/{$report->id}?signature={$signature}");

        $response->assertStatus(403);
    }

    /** @test */
    public function staff_can_access_any_shared_file()
    {
        $staff = User::factory()->create(['role' => 'admin']);
        $client = User::factory()->create(['role' => 'user']);
        
        $report = Report::factory()->create([
            'user_id' => $client->id,
            'batch_id' => 'test-batch-staff-access',
            'file_path' => 'reports/staff-test.pdf',
            'original_name' => 'staff-test.pdf',
        ]);

        Storage::disk('public')->put('reports/staff-test.pdf', 'test content');

        $signature = hash_hmac('sha256', $report->id . $report->batch_id, config('app.key'));

        $response = $this->actingAs($staff)->get("/reports/shared/{$report->batch_id}/{$report->id}?signature={$signature}");

        $response->assertStatus(200);
    }
}
