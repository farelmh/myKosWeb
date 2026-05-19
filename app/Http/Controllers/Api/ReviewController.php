<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Review;
use App\Models\Contract;
use Illuminate\Support\Facades\Validator;

class ReviewController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'contract_id' => 'required|exists:contracts,id',
            'rating'      => 'required|integer|min:1|max:5',
            'comment'     => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validasi gagal',
                'errors'  => $validator->errors()
            ], 422);
        }

        $contract = Contract::find($request->contract_id);

        if ($contract->tenant_id !== $request->user()->id) {
            return response()->json([
                'success' => false,
                'message' => 'Anda tidak memiliki otoritas untuk memberikan ulasan pada kontrak ini.'
            ], 403);
        }

        $review = Review::create([
            'user_id'     => $request->user()->id,
            'property_id' => $contract->roomType->property_id ?? $contract->property_id,
            'contract_id' => $contract->id,
            'rating'      => $request->rating,
            'comment'     => $request->comment,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Terima kasih, ulasan berhasil disimpan!',
            'data'    => $review
        ], 201);
    }
}
