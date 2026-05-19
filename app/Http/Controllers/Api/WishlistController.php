<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Wishlist;
use Illuminate\Http\Request;

class WishlistController extends Controller
{
    public function index(Request $request)
    {
        $wishlists = Wishlist::with(['property.images', 'property.roomTypes', 'property.reviews'])
            ->where('user_id', $request->user()->id)
            ->get();

        return response()->json($wishlists->map(function ($wishlist) {
            $property = $wishlist->property;
            $image = $property->images->first();
            $cheapestRoom = $property->roomTypes->sortBy('price')->first();
            $avgRating = $property->reviews->avg('rating');

            $type = 'Campuran';
            if ($cheapestRoom) {
                $name = strtolower($cheapestRoom->name);
                if (str_contains($name, 'putri')) $type = 'Putri';
                elseif (str_contains($name, 'putra')) $type = 'Putra';
            }

            $imageUrl = null;
            if ($image) {
                $imageUrl = str_starts_with($image->image_path, 'http')
                    ? $image->image_path
                    : asset('storage/' . $image->image_path);
            }

            return [
                'wishlist_id' => $wishlist->id,
                'property_id' => $property->id,
                'room_type_id' => $cheapestRoom ? $cheapestRoom->id : null,
                'name'        => $property->name,
                'address'     => $property->address,
                'city'        => $property->city,
                'image_url'   => $imageUrl,
                'price'       => $cheapestRoom ? $cheapestRoom->price : 0,
                'type'        => $type,
                'rating'      => $avgRating ? round($avgRating, 1) : 0,
                'description' => $property->description,
                'latitude'    => (float) ($property->latitude ?? 0),
                'longitude'   => (float) ($property->longitude ?? 0),
            ];
        }));
    }

    public function toggle(Request $request)
    {
        $request->validate(['property_id' => 'required|integer|exists:properties,id']);

        $userId = $request->user()->id;
        $propertyId = $request->property_id;

        $existing = Wishlist::where('user_id', $userId)
            ->where('property_id', $propertyId)
            ->first();

        if ($existing) {
            $existing->delete();
            return response()->json(['status' => 'removed', 'message' => 'Dihapus dari favorit']);
        }

        Wishlist::create([
            'user_id'     => $userId,
            'property_id' => $propertyId,
        ]);

        return response()->json(['status' => 'added', 'message' => 'Ditambahkan ke favorit']);
    }

    public function check(Request $request, $propertyId)
    {
        $isFavorite = Wishlist::where('user_id', $request->user()->id)
            ->where('property_id', $propertyId)
            ->exists();

        return response()->json(['is_favorite' => $isFavorite]);
    }
}