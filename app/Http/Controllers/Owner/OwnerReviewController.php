<?php

namespace App\Http\Controllers\Owner;

use App\Http\Controllers\Controller;
use App\Models\Review;
use App\Models\Property;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OwnerReviewController extends Controller
{
    public function index(Request $request)
    {
        $propertyIds = Property::where('owner_id', auth()->id())
            ->pluck('id');

        $reviews = Review::with(['user:id,name', 'property:id,name'])
            ->whereIn('property_id', $propertyIds)
            ->when($request->search, function ($q, $search) {
                $q->where(function ($q) use ($search) {
                    $q->whereHas('user', fn($q) =>
                        $q->where('name', 'like', "%{$search}%"))
                      ->orWhereHas('property', fn($q) =>
                        $q->where('name', 'like', "%{$search}%"))
                      ->orWhere('comment', 'like', "%{$search}%");
                });
            })
            ->when($request->rating, fn($q, $r) =>
                $q->where('rating', $r)
            )
            ->latest()
            ->paginate(10)
            ->withQueryString();

        $stats = Review::whereIn('property_id', $propertyIds)
            ->selectRaw('
                COUNT(*) as total,
                ROUND(AVG(rating), 1) as average,
                SUM(rating = 5) as five,
                SUM(rating = 4) as four,
                SUM(rating = 3) as three,
                SUM(rating = 2) as two,
                SUM(rating = 1) as one
            ')
            ->first();

        return Inertia::render('Owner/Reviews', [
            'reviews' => $reviews,
            'stats'   => $stats,
            'filters' => $request->only(['search', 'rating']),
        ]);
    }
}