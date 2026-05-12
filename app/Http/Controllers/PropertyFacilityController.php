<?php

namespace App\Http\Controllers;

use App\Models\Facility;
use App\Models\Property;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PropertyFacilityController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    public function editFacilities($id)
    {
        $property = Property::with('facilities')
            ->where('owner_id', auth()->id())
            ->findOrFail($id);

        $facilities = Facility::where('type', 'property')
            ->get();

        return Inertia::render('Owner/PropertyFacilities', [
            'property' => $property,
            'facilities' => $facilities,
            'selectedFacilities' => $property->facilities,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Property $property)
    {
        if ($property->owner_id != auth()->id()) {
            abort(403);
        }

        $facilityIds = $request->input('facilities', []);
        $customFacilities = $request->input('custom_facilities', []);

        // sync fasilitas bawaan
        $property->facilities()->sync($facilityIds);

        // tambah fasilitas custom
        foreach ($customFacilities as $facilityName) {

            $facility = Facility::firstOrCreate(
                [
                    'name' => $facilityName,
                    'type' => 'property',
                ],
                [
                    'icon' => 'check_circle',
                    'created_by' => auth()->id(),
                ]
            );

            $property->facilities()->attach($facility->id);
        }

        return redirect()
            ->back()
            ->with('success', 'Fasilitas berhasil disimpan');
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
