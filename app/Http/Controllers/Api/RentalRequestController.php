<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\RentalRequest;
use Illuminate\Http\Request;

class RentalRequestController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'room_type_id'   => 'required|integer|exists:room_types,id',
            'start_date'     => 'required|date',
            'duration_value' => 'required|integer|min:1',
            'duration_type'  => 'required|in:daily,monthly',
            'note'           => 'nullable|string',
        ]);

        $rentalRequest = RentalRequest::create([
            'room_type_id'   => $request->room_type_id,
            'tenant_id'      => $request->user()->id,
            'start_date'     => $request->start_date,
            'duration_value' => $request->duration_value,
            'duration_type'  => $request->duration_type,
            'note'           => $request->note,
            'status'         => 'pending',
        ]);

        return response()->json([
            'message' => 'Pengajuan sewa berhasil, menunggu persetujuan pemilik kost.',
            'data'    => $rentalRequest,
        ], 201);
    }
}