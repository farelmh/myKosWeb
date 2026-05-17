<?php

namespace App\Http\Controllers;
use App\Models\Facility;
use Illuminate\Http\Request;
use App\Models\Property;
use Inertia\Inertia;

class SearchController extends Controller
{
    public function index(Request $request)
    {
        $query = Property::with([
            'facilities',
            'roomTypes',
            'images'
        ]);

        // SEARCH
        if ($request->filled('search')) {

            $search = $request->search;

            $query->where(function ($q) use ($search) {

                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('address', 'like', "%{$search}%")
                    ->orWhere('city', 'like', "%{$search}%");
            });
        }

        // MAX PRICE
        if ($request->filled('max_price')) {

            $query->whereHas('roomTypes', function ($q) use ($request) {

                $q->where('price', '<=', $request->max_price);

            });
        }

        // FACILITIES
        if ($request->filled('facilities')) {

            foreach ($request->facilities as $facilityId) {

                $query->whereHas('facilities', function ($q) use ($facilityId) {

                    $q->where('facilities.id', $facilityId);

                });

            }
        }

        $facilities = Facility::select('id', 'name')->where('type', 'property')->get();

        $properties = $query->paginate(10);

        return Inertia::render('SearchPage', [
            'properties' => $properties,
            'facilities' => $facilities
        ]);
    }
}

