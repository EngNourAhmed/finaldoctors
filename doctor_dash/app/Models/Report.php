<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'batch_id',
        'title',
        'case_type',
        'arch_type',
        'implants_count',
        'implant_brand',
        'clinical_data',
        'description',
        'file_path',
        'original_name',
        'mime_type',
        'size',
        'folder_type',
        'status',
        'is_reply',
        'reviewed_at',
        'updated_by',
    ];

    protected $casts = [
        'clinical_data' => 'array',
        'reviewed_at' => 'datetime',
    ];

    public const STATUSES = [
        'Order Received' => 'border-sky-400/50 text-sky-300 bg-sky-400/10',
        'Planning' => 'border-indigo-400/50 text-indigo-300 bg-indigo-400/10',
        'Waxup Design' => 'border-purple-400/50 text-purple-300 bg-purple-400/10',
        'Milling' => 'border-fuchsia-400/50 text-fuchsia-300 bg-fuchsia-400/10',
        'Planning Completed (Need Scheduling)' => 'border-pink-400/50 text-pink-300 bg-pink-400/10',
        'Pending Doctor Approval (Video Sent)' => 'border-rose-400/50 text-rose-300 bg-rose-400/10',
        'REVIEW SCHEDULED' => 'border-red-400/50 text-red-300 bg-red-400/10',
        'Need New CBCT Scan' => 'border-orange-400/50 text-orange-300 bg-orange-400/10',
        'Waiting model or STL' => 'border-amber-400/50 text-amber-300 bg-amber-400/10',
        'Waiting on Confirmation' => 'border-yellow-400/50 text-yellow-300 bg-yellow-400/10',
        'CASE ON HOLD (DR\'S REQUEST)' => 'border-yellow-600/50 text-yellow-500 bg-yellow-600/10',
        'Case Approved / QC & Paperwork' => 'border-lime-400/50 text-lime-300 bg-lime-400/10',
        'Surgical Guide Design' => 'border-green-400/50 text-green-300 bg-green-400/10',
        'Guide Printing' => 'border-emerald-400/50 text-emerald-300 bg-emerald-400/10',
        'Finishing / Preparing for Shipping' => 'border-teal-400/50 text-teal-300 bg-teal-400/10',
        'Case Shipped' => 'border-cyan-400/50 text-cyan-300 bg-cyan-400/10',
        'Guide STL shared with doctor' => 'border-blue-400/50 text-blue-300 bg-blue-400/10',
        'Completed' => 'border-emerald-500/50 text-emerald-400 bg-emerald-500/10',
        'Pending' => 'border-slate-400/50 text-slate-300 bg-slate-400/10',
        'Order Cancelled' => 'border-red-500/50 text-red-400 bg-red-500/10',
        'Treatment Planning Only' => 'border-indigo-500/50 text-indigo-400 bg-indigo-500/10',
        'Invoice Sent' => 'border-lime-500/50 text-lime-400 bg-lime-500/10',
        'Guide Printing (Romania)' => 'border-teal-500/50 text-teal-400 bg-teal-500/10',
        'Radiology Report Order' => 'border-sky-500/50 text-sky-400 bg-sky-500/10',
        'Radiology Report Completed' => 'border-sky-600/50 text-sky-500 bg-sky-600/10',
        'Received without CBCT' => 'border-orange-500/50 text-orange-400 bg-orange-500/10',
        'Received without STL' => 'border-orange-600/50 text-orange-500 bg-orange-600/10',
        'Case Shipped/Guide STL Shared' => 'border-cyan-500/50 text-cyan-400 bg-cyan-500/10',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function updatedBy()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }

    public function caseConversation()
    {
        return $this->hasOne(Conversation::class, 'batch_id', 'batch_id')
            ->where('type', 'case_chat');
    }

    public function caseNotes()
    {
        return $this->hasMany(CaseNote::class, 'batch_id', 'batch_id');
    }
}
