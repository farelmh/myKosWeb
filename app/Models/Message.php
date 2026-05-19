<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Message extends Model
{
    protected $fillable = [
        'conversation_id',
        'sender_id',
        'message',
        'is_read'
    ];

    // Pesan milik conversation mana
    public function conversation()
    {
        return $this->belongsTo(Conversation::class);
    }

    // Pengirim pesan
    public function sender()
    {
        return $this->belongsTo(User::class, 'sender_id');
    }
}