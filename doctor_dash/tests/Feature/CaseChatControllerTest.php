<?php

namespace Tests\Feature;

use App\Models\Conversation;
use App\Models\Message;
use App\Models\Report;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CaseChatControllerTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
    }

    /** @test */
    public function staff_can_access_case_chat_messages()
    {
        $staff = User::factory()->create(['role' => 'admin']);
        $client = User::factory()->create(['role' => 'user']);
        $batchId = 'test-batch-123';
        
        Report::factory()->create([
            'user_id' => $client->id,
            'batch_id' => $batchId,
        ]);

        $response = $this->actingAs($staff)->getJson("/case/{$batchId}/chat/messages");

        $response->assertStatus(200)
            ->assertJsonStructure(['messages']);
    }

    /** @test */
    public function case_owner_can_access_their_case_chat()
    {
        $client = User::factory()->create(['role' => 'user']);
        $batchId = 'test-batch-456';
        
        Report::factory()->create([
            'user_id' => $client->id,
            'batch_id' => $batchId,
        ]);

        $response = $this->actingAs($client)->getJson("/case/{$batchId}/chat/messages");

        $response->assertStatus(200)
            ->assertJsonStructure(['messages']);
    }

    /** @test */
    public function unauthorized_user_cannot_access_case_chat()
    {
        $client1 = User::factory()->create(['role' => 'user']);
        $client2 = User::factory()->create(['role' => 'user']);
        $batchId = 'test-batch-789';
        
        Report::factory()->create([
            'user_id' => $client1->id,
            'batch_id' => $batchId,
        ]);

        $response = $this->actingAs($client2)->getJson("/case/{$batchId}/chat/messages");

        $response->assertStatus(403);
    }

    /** @test */
    public function can_send_message_to_case_chat()
    {
        $client = User::factory()->create(['role' => 'user']);
        $batchId = 'test-batch-send';
        
        Report::factory()->create([
            'user_id' => $client->id,
            'batch_id' => $batchId,
        ]);

        $response = $this->actingAs($client)->postJson("/case/{$batchId}/chat/send", [
            'message' => 'Test message content',
        ]);

        $response->assertStatus(200)
            ->assertJson(['ok' => true]);

        $this->assertDatabaseHas('messages', [
            'sender_id' => $client->id,
            'body' => 'Test message content',
        ]);
    }

    /** @test */
    public function message_validation_requires_content()
    {
        $client = User::factory()->create(['role' => 'user']);
        $batchId = 'test-batch-validation';
        
        Report::factory()->create([
            'user_id' => $client->id,
            'batch_id' => $batchId,
        ]);

        $response = $this->actingAs($client)->postJson("/case/{$batchId}/chat/send", [
            'message' => '',
        ]);

        $response->assertStatus(422);
    }

    /** @test */
    public function message_validation_enforces_max_length()
    {
        $client = User::factory()->create(['role' => 'user']);
        $batchId = 'test-batch-maxlength';
        
        Report::factory()->create([
            'user_id' => $client->id,
            'batch_id' => $batchId,
        ]);

        $response = $this->actingAs($client)->postJson("/case/{$batchId}/chat/send", [
            'message' => str_repeat('a', 5001),
        ]);

        $response->assertStatus(422);
    }

    /** @test */
    public function messages_endpoint_supports_since_parameter_for_polling()
    {
        $client = User::factory()->create(['role' => 'user']);
        $batchId = 'test-batch-polling';
        
        Report::factory()->create([
            'user_id' => $client->id,
            'batch_id' => $batchId,
        ]);

        $conversation = Conversation::create([
            'type' => 'case_chat',
            'batch_id' => $batchId,
        ]);

        $message1 = Message::create([
            'conversation_id' => $conversation->id,
            'sender_id' => $client->id,
            'body' => 'First message',
        ]);

        $message2 = Message::create([
            'conversation_id' => $conversation->id,
            'sender_id' => $client->id,
            'body' => 'Second message',
        ]);

        $response = $this->actingAs($client)->getJson("/case/{$batchId}/chat/messages?since={$message1->id}");

        $response->assertStatus(200);
        $messages = $response->json('messages');
        
        $this->assertCount(1, $messages);
        $this->assertEquals('Second message', $messages[0]['body']);
    }

    /** @test */
    public function conversation_is_created_with_case_chat_type()
    {
        $client = User::factory()->create(['role' => 'user']);
        $batchId = 'test-batch-conversation';
        
        Report::factory()->create([
            'user_id' => $client->id,
            'batch_id' => $batchId,
        ]);

        $this->actingAs($client)->postJson("/case/{$batchId}/chat/send", [
            'message' => 'Creating conversation',
        ]);

        $this->assertDatabaseHas('conversations', [
            'type' => 'case_chat',
            'batch_id' => $batchId,
        ]);
    }
}
