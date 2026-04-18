<?php

namespace Tests\Feature;

use App\Models\Report;
use App\Models\User;
use App\Models\Conversation;
use App\Models\Message;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminReplyVisibilityTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function user_can_see_admin_text_replies_in_case_details()
    {
        // 1. Setup: Create a User and a Case
        $user = User::factory()->create(['role' => 'user']);
        $admin = User::factory()->create(['role' => 'admin']);
        $batchId = 'test-batch-reply-visibility';
        
        $report = Report::create([
            'user_id' => $user->id,
            'batch_id' => $batchId,
            'title' => 'User Case',
            'description' => 'Help me',
            'file_path' => 'reports/test.pdf',
            'original_name' => 'test.pdf',
            'mime_type' => 'application/pdf',
            'size' => 100,
            'status' => 'Pending',
        ]);

        // 2. Create an admin message in the case chat
        $conversation = Conversation::create([
            'type' => 'case_chat',
            'batch_id' => $batchId,
        ]);

        $adminMessageText = "This is a reply from admin regarding your case.";
        Message::create([
            'conversation_id' => $conversation->id,
            'sender_id' => $admin->id,
            'body' => $adminMessageText,
        ]);

        // 3. Act: User views the case
        $response = $this->actingAs($user)->get("/user/reports/batch/{$batchId}");

        // 4. Assert: Reply text is visible
        $response->assertStatus(200);
        $response->assertSee($adminMessageText);
        $response->assertSee($admin->name);
        
        // Check tab counter (should be 1 reply - the message)
        $response->assertSee("Admin Reply (1)");
    }
}
