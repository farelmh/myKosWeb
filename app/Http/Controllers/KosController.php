<?php

namespace App\Http\Controllers;

use App\Models\Wishlist;
use Illuminate\Http\Request;
use App\Models\Property;
use Inertia\Inertia;

class KosController extends Controller
{

    public function detail($id)
    {
        $property = Property::with([
            'images',
            'facilities',

            'roomTypes' => function ($query) {
                $query
                    ->with(['images', 'facilities'])
                    ->withCount([
                        'contracts as occupied_rooms' => function ($q) {
                            $q->where('status', 'active');
                        }
                    ]);
            },

            'wishlists' => function ($query) {
                $query->where('user_id', auth()->id());
            }
        ])->findOrFail($id);

        $similar = Property::with([
            'images',
            'roomTypes'
        ])
            ->where('id', '!=', $id)
            ->limit(6)
            ->get();

        return Inertia::render('DetailKos', [
            'property' => $property,
            'similar'  => $similar,
        ]);
    }
    
}
