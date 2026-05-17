<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Property;
use Inertia\Inertia;

class KosController extends Controller
{

public function detail($id)
{
    $property = Property::findOrFail($id);
    try { $property->load('images'); } catch (\Exception $e) {}
    try { $property->load('facilities'); } catch (\Exception $e) {}
    try { $property->load('roomTypes'); } catch (\Exception $e) {}


    $similar = Property::with(['images', 'roomTypes'])
        ->where('id', '!=', $id)
        ->limit(6)
        ->get();

    return Inertia::render('DetailKos', [
        'property' => $property,   
        'similar'  => $similar,
    ]);
}
}
