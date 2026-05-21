<?php

namespace App\Http\Controllers;

use App\Models\Facility;
use App\Models\Property;
use App\Models\RoomType;
use App\Models\RoomTypeImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class RoomTypeController extends Controller
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
    ->withCount([
        'contracts as occupied' => function ($query) {
            $query->where('status', 'active');
        }
    ])
    ->where('property_id', $property->id)
    ->get()
    ->map(function ($roomType) {

        $roomType->available =
            $roomType->total_rooms - $roomType->occupied;

        return $roomType;
    });

    return Inertia::render('Owner/RoomTypes', [
        'roomTypes' => $roomTypes,
    ]);
}
    public function create()
    {
        $facilities = Facility::where('type', 'room')->get();

        return Inertia::render('Owner/Create/CreateRoomType', ['facilities' => $facilities]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'property_id' => 'required|exists:properties,id',

            'name' => 'required|string',
            'room_width' => 'required|numeric',
            'room_length' => 'required|numeric',
            'price' => 'required|numeric',
            'capacity' => 'required|numeric',
            'total_rooms' => 'required|numeric',
            'rental_type' => 'nullable|string',

            'facilities' => 'nullable|array',
            'facilities.*' => 'exists:facilities,id',

            'custom_facilities' => 'nullable|array',

            'images' => 'nullable|array',
            'images.*' => 'image|mimes:jpeg,jpg,png|max:2048',
        ]);

        $property = Property::where('id', $validated['property_id'])
            ->where('owner_id', auth()->id())
            ->firstOrFail();

        // CREATE ROOM TYPE
        $roomType = RoomType::create([
            'property_id' => $property->id,
            'name' => $validated['name'],
            'room_width' => $validated['room_width'],
            'room_length' => $validated['room_length'],
            'price' => $validated['price'],
            'capacity' => $validated['capacity'],
            'total_rooms' => $validated['total_rooms'],
            'rental_type' => $validated['rental_type'],
        ]);

        if (!empty($validated['facilities'])) {

            $roomType->facilities()->attach(
                $validated['facilities']
            );
        }

        if (!empty($validated['custom_facilities'])) {

            foreach ($validated['custom_facilities'] as $facilityName) {

                $facility = Facility::firstOrCreate(
                    [
                        'name' => $facilityName,
                    ],
                    [
                        'type' => 'room',
                        'icon' => 'check_circle',
                        'created_by' => auth()->id(),
                    ]
                );

                $roomType->facilities()->attach($facility->id);
            }
        }

        if ($request->hasFile('images')) {

            foreach ($request->file('images') as $image) {

                $path = $image->store(
                    'room-types',
                    'public'
                );

                RoomTypeImage::create([
                    'room_type_id' => $roomType->id,
                    'image_path' => $path,
                ]);
            }
        }

        return redirect()
            ->route('owner.room-types', $property->id)
            ->with('success', 'Tipe kamar berhasil dibuat');
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

    public function edit(string $id)
    {
        $roomType = RoomType::with('images', 'facilities', 'contracts')->findOrFail($id);
        $facilities = Facility::where('type', 'room')->get();
        $occupiedRooms = $roomType->contracts()
            ->where('status', 'active')
            ->count();

        $availableRooms = $roomType->total_rooms - $occupiedRooms;

        return Inertia::render('Owner/Edit/EditRoomType', [
            'roomType' => $roomType,
            'facilities' => $facilities,
            'selectedFacilities' => $roomType->facilities->pluck('id')->toArray(),
            'occupied' => $occupiedRooms != null ? $occupiedRooms : 0,
            'available' => $availableRooms != null ? $availableRooms : $roomType->total_rooms,
        ]);
    }

    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'property_id' => 'required|exists:properties,id',

            'name' => 'required|string',
            'room_width' => 'required|numeric',
            'room_length' => 'required|numeric',
            'price' => 'required|numeric',
            'capacity' => 'required|numeric',
            'total_rooms' => 'required|numeric',
            'rental_type' => 'nullable|string',

            'facilities' => 'nullable|array',
            'facilities.*' => 'exists:facilities,id',

            'custom_facilities' => 'nullable|array',

            'images' => 'nullable|array',
            'images.*' => 'image|mimes:jpeg,jpg,png|max:2048',
        ]);

        $property = Property::where('id', $validated['property_id'])
            ->where('owner_id', auth()->id())
            ->firstOrFail();

        $roomType = RoomType::findOrFail($id);

        $roomType->update([
            'name' => $validated['name'],
            'room_width' => $validated['room_width'],
            'room_length' => $validated['room_length'],
            'price' => $validated['price'],
            'capacity' => $validated['capacity'],
            'total_rooms' => $validated['total_rooms'],
            'rental_type' => $validated['rental_type'],
        ]);

        $facilityIds = $validated['facilities'] ?? [];

        if (!empty($validated['custom_facilities'])) {

            foreach ($validated['custom_facilities'] as $facilityName) {

                $facility = Facility::firstOrCreate(
                    [
                        'name' => $facilityName,
                        'type' => 'room',
                    ],
                    [
                        'icon' => 'check_circle',
                        'created_by' => auth()->id(),
                    ]
                );

                $facilityIds[] = $facility->id;
            }
        }

        $roomType->facilities()->sync($facilityIds);

        if ($request->hasFile('images')) {

            foreach ($request->file('images') as $image) {

                $path = $image->store(
                    'room-types',
                    'public'
                );

                RoomTypeImage::create([
                    'room_type_id' => $roomType->id,
                    'image_path' => $path,
                ]);
            }
        }

        return redirect()
            ->route('owner.room-types', $property->id)
            ->with('success', 'Tipe kamar berhasil diubah');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $roomType = RoomType::findOrFail($id);

        if ($roomType->property->owner_id !== auth()->id()) {
            abort(403);
        }

        $roomType->delete();

        return redirect()->back()->with('success', 'Tipe kamar berhasil dihapus');
    }

    public function deleteImage(string $id)
    {
        $image = RoomTypeImage::findOrFail($id);

        Storage::disk('public')->delete($image->image_path);

        $image->delete();

        return redirect()->back()->with('success', 'foto berhasil dihapus!');
    }
}
