<?php

namespace App\Http\Controllers\Owner;

use App\Http\Controllers\Controller;
use App\Models\Property;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $properties = Property::where('owner_id', auth()->id())
            ->with([
                'roomTypes.contracts'
            ])
            ->get();

        $totalProperties = $properties->count();

        $totalRooms = $properties->sum(function ($property) {
            return $property->roomTypes->sum('total_rooms');
        });

        $occupiedRooms = $properties->sum(function ($property) {
            return $property->roomTypes->sum(function ($roomType) {
                return $roomType->contracts
                    ->where('status', 'active')
                    ->count();
            });
        });

        return Inertia::render('Owner/Dashboard', [
                'totalProperties' => $totalProperties,
                'totalRooms' => $totalRooms,
                'occupiedRooms' => $occupiedRooms,
        ]);
    }
}
