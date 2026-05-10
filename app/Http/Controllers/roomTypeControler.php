<?php

namespace App\Http\Controllers;

use App\Models\Property;
use App\Models\RoomType;
use Illuminate\Http\Request;
use Inertia\Inertia;

class roomTypeControler extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Property $property)
    {
        $roomTypes = RoomType::with([
            'facilities',
            'images',
        ])
        ->where('property_id', $property->id)
        ->get();

        return Inertia::render('Owner/RoomTypes', [
            'roomTypes' => $roomTypes,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
