<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Conversation extends Model
{
    protected $fillable = [
        'user_one_id',
        'user_two_id',
        'last_message_at'
    ];

    // Satu conversation punya banyak message
    public function messages()
    {
        return $this->hasMany(Message::class);
    }

    // User pertama
    public function userOne()
    {
        return $this->belongsTo(User::class, 'user_one_id');
    }

    // User kedua
    public function userTwo()
    {
        return $this->belongsTo(User::class, 'user_two_id');
    }
}