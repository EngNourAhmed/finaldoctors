<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Conversation extends Model
{
    use HasFactory;

    protected $fillable = [
        'type',
        'batch_id',
        'admin_id',
        'participant_id',
    ];

    public function admin()
    {
        return $this->belongsTo(User::class, 'admin_id');
    }

    public function participant()
    {
        return $this->belongsTo(User::class, 'participant_id');
    }

    public function messages()
    {
        return $this->hasMany(Message::class);
    }

    public function participants()
    {
        return $this->belongsToMany(User::class, 'conversation_participants')->withTimestamps();
    }

    public function caseReports()
    {
        return $this->hasMany(Report::class, 'batch_id', 'batch_id');
    }
}
