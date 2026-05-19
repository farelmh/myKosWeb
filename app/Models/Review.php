<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    protected $fillable = [
        'user_id',
        'property_id',
        'contract_id',
        'rating',
        'comment'
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function property() {
        return $this->belongsTo(Property::class);
    }

    public function contract() {
        return $this->belongsTo(Contract::class);
    }
}
