<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PropertyApplication;
use App\Models\PropertyApplicationImage;
use App\Models\PropertyApplicationDocument;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;

class PropertyApplicationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $applications = PropertyApplication::query()
        ->when($request->search, function ($query, $search) {
            $query->where('name', 'like', "%{$search}%")
            ->orWhere('address', 'like', "%{$search}%")
            ->orWhere('city', 'like', "%{$search}%");
        })->paginate(10)->withQueryString();

        return Inertia::render('Admin/Request', [
            'applications' => $applications,
            'filters' => $request->only(['search'])
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'address' => 'required|string',
            'city' => 'required|string',
            'description' => 'nullable|string',
            'rules' => 'nullable|string',
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
            'image_kos' => 'required|image|mimes:jpeg,jpg,png|max:2048',
            'image_ktp' => 'required|image|mimes:jpeg,jpg,png|max:2048',
            'document_extra' => 'required|file|mimes:pdf|max:2048'
        ]);

        return DB::transaction(function () use ($request, $validated) {
            $application = PropertyApplication::create([
                'user_id' => auth()->id(),
                'name' => $validated['name'],
                'address' => $validated['address'],
                'city' => $validated['city'],
                'description' => $validated['description'],
                'rules' => $validated['rules'],
                'latitude' => $validated['latitude'],
                'longitude' => $validated['longitude'],
                'status' => 'pending',
            ]);

            $pathImages = $request->file('image_kos')->store('kos_images', 'public');
            PropertyApplicationImage::create([
                'property_application_id' => $application->id,
                'image_path' => $pathImages
            ]);

            $pathKtp = $request->file('image_ktp')->store('ktp_images', 'public');
            PropertyApplicationDocument::create([
                'property_application_id' => $application->id,
                'type' => 'identity',
                'file_path' => $pathKtp
            ]);

            $pathDocument = $request->file('document_extra')->store('extra_documents', 'public');
            PropertyApplicationDocument::create([
                'property_application_id' => $application->id,
                'type' => 'ownership',
                'file_path' => $pathDocument
            ]);

            return redirect()->back()->with(
                'success', 'Pengajuan Kos Berhasil Dikirim! Silahkan Tunggu Persetujuan dari Admin'
            );
        });
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $application = PropertyApplication::with(['images', 'documents'])->findOrFail($id);

        return Inertia::render('Admin/RequestDetail', [
            'application' => $application
        ]);
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
