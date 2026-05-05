<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PropertyApplicationDocument extends Model
{
    protected $fillable = [
        'property_application_id',
        'type',
        'file_path'
    ];

    public function application()
    {
        return $this->belongsTo(PropertyApplication::class, 'property_application_id');
    }
}