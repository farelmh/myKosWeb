<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PropertyApplicationImage extends Model
{
    protected $fillable = [
        'property_application_id',
        'image_path'
    ];

    public function application()
    {
        return $this->belongsTo(PropertyApplication::class, 'property_application_id');
    }
}