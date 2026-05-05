<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PropertyApplication extends Model
{
    protected $fillable = [
        'user_id',
        'property_id',
        'name',
        'address',
        'city',
        'description',
        'rules',
        'latitude',
        'longitude',
        'status',
        'rejection_reason',
        'approved_by',
        'approved_at'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function property()
    {
        return $this->belongsTo(Property::class);
    }

    public function approver()
    {
        return $this->belongsTo(User::class, 'approved_by');
    }

    public function images()
    {
        return $this->hasMany(PropertyApplicationImage::class);
    }

    public function documents()
    {
        return $this->hasMany(PropertyApplicationDocument::class);
    }
}