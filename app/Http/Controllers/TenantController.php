<?php

namespace App\Http\Controllers;

use App\Models\Contract;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TenantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
         $tenants = User::query()
        ->when($request->search, function ($query, $search) {
            $query->where('name', 'like', "%{$search}%")
            ->orWhere('email', 'like', "{$search}")
            ->orWhere('phone', 'like', "{$search}");
        })->paginate(10)->withQueryString();

        return Inertia::render('Owner/Tenants', [
            'tenants' => $tenants,
            'filters' => $request->only(['search'])
        ]);
    }

    public function tenants(Request $request)
    {
        $propertyId = $request->property_id;

        $search = $request->search;
        $status = $request->status;

        $tenants = Contract::with([
                'tenant',
                'roomType',
            ])
            ->whereHas('roomType', function ($query) use ($propertyId) {

                $query->where('property_id', $propertyId);

            })
            ->when($search, function ($query) use ($search) {

                $query->whereHas('tenant', function ($q) use ($search) {

                    $q->where('name', 'like', "%{$search}%");

                });

            })
            ->when($status, function ($query) use ($status) {

                $query->where('status', $status);

            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Owner/Tenants', [
            'tenants' => $tenants,
            'filters' => [
                'search' => $search,
                'status' => $status,
            ]
        ]);
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
