<?php

namespace App\Http\Controllers;

use App\Models\Property;
use App\Models\RentalRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Notification;

class RentalRequestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, string $propertyId)
{
    $property = Property::where('id', $propertyId)
        ->where('owner_id', auth()->id())
        ->firstOrFail();

    $rentals = RentalRequest::with([
        'tenant',
        'roomType'
    ])

    ->whereHas('roomType', function ($query) use ($propertyId) {

        $query->where(
            'property_id',
            $propertyId
        );

    })

    ->when($request->search, function ($query, $search) {

        $query->where(function ($q) use ($search) {

            $q->where(
                'rental_type',
                'like',
                "%{$search}%"
            )

            ->orWhereHas('tenant', function ($tenantQuery) use ($search) {

                $tenantQuery->where(
                    'name',
                    'like',
                    "%{$search}%"
                );

            })

            ->orWhereHas('roomType', function ($roomTypeQuery) use ($search) {

                $roomTypeQuery->where(
                    'name',
                    'like',
                    "%{$search}%"
                );

            });

        });

    })

    ->latest()
    ->paginate(10)
    ->withQueryString();

//     $property = Property::find($request->property_id);

//     Notification::create([
//     'user_id' => $property->owner_id,
//     'title'   => 'Permintaan Sewa Baru',
//     'message' => "Ada permintaan sewa baru untuk kos \"{$property->name}\".",
//     'is_read' => false,
// ]);

    return Inertia::render('Owner/RentalRequest', [
        'rentals' => $rentals,
        'property' => $property,
        'filters' => $request->only(['search']),
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
