<?php

namespace App\Http\Controllers;

use App\Models\Wishlist;
use Illuminate\Http\Request;

class WishlistController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    public function toggle(Request $request)
    {
        $request->validate([
            'property_id' => 'required|integer|exists:properties,id'
        ]);

        $userId = auth()->id();
        $propertyId = $request->property_id;

        $existing = Wishlist::where('user_id', $userId)
            ->where('property_id', $propertyId)
            ->first();

        if ($existing) {
            $existing->delete();

            return redirect()->back()->with(
                'success',
                'Kos dihapus dari favorit'
            );
        }

        Wishlist::create([
            'user_id' => $userId,
            'property_id' => $propertyId,
        ]);

        return redirect()->back()->with(
            'success',
            'Ditambahkan ke favorit'
        );
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
