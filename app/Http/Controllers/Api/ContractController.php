<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Contract;
use Illuminate\Http\Request;

class ContractController extends Controller
{
    public function index(Request $request)
    {
        $contracts = Contract::with([
            'roomType.property.images',
            'roomType.property.reviews',
        ])
        ->where('tenant_id', $request->user()->id)
        ->withExists('review')
        ->get();

        return response()->json($contracts->map(function ($contract) {
            $property = $contract->roomType->property;
            $image = $property->images->first();

            return [
                'id'          => $contract->id,
                'status'      => $contract->status === 'active' ? 'Aktif' : 'Selesai',
                'start_date'  => $contract->start_date,
                'end_date'    => $contract->end_date,
                'room_type'   => $contract->roomType->name,
                'has_review'  => (bool) $contract->review_exists,
                'price'       => $contract->roomType->price,
                'property'    => [
                    'id'       => $property->id,
                    'name'     => $property->name,
                    'address'  => $property->address,
                    'city'     => $property->city,
                    'image_url'=> $image
                        ? (str_starts_with($image->image_path, 'http')
                            ? $image->image_path
                            : asset('storage/' . $image->image_path))
                        : null,
                    'rating'   => (float) ($property->reviews->avg('rating') ?? 0),
                    'type'     => $contract->roomType->name,
                    'description' => $property->description,
                    'latitude' => (float) ($property->latitude ?? 0),
                    'longitude'=> (float) ($property->longitude ?? 0),
                ],
            ];
        }));
    }
}