<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Facility extends Model
{
    protected $fillable = [
        'name',
        'type',
        'icon',
        'created_by'
    ];

    public function properties() {
        return $this->belongsToMany(Property::class, 'property_facilities');
    }

    public function roomTypes() {
        return $this->belongsToMany(RoomType::class, 'room_type_facilities');
    }
}
