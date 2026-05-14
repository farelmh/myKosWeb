<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Property;
use Inertia\Inertia;

class SearchController extends Controller
{
    public function index(Request $request)
    {
        $query = $request->get('q', '');

        $properties = Property::with(['images', 'facilities', 'roomTypes'])
            ->where('status', 'approved') // hanya kos yang sudah disetujui
            ->when($query, function ($q) use ($query) {
                $q->where(function ($q) use ($query) {
                    $q->where('name',    'like', "%{$query}%")
                      ->orWhere('city',  'like', "%{$query}%")
                      ->orWhere('address','like', "%{$query}%");
                });
            })
            ->latest()
            ->get()
            ->map(function ($property) {
                return [
                    'id'         => $property->id,
                    'name'       => $property->name,
                    'address'    => $property->address,
                    'city'       => $property->city,
                    'price'      => $property->roomTypes->min('price'), // harga terendah
                    'rating'     => null, // tambahkan nanti jika ada review
                    'type'       => $property->type ?? null,
                    'images'     => $property->images,
                    'facilities' => $property->facilities,
                    'room_types' => $property->roomTypes,
                ];
            });

        return Inertia::render('Search', [
            'properties' => $properties,
            'query'      => $query,
        ]);
    }
}

