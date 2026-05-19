<?php

namespace App\Http\Controllers;

use App\Models\Property;
use App\Models\PropertyImage;
use App\Models\User;
use Illuminate\Http\Request;
use App\Models\PropertyApplication;
use App\Models\PropertyApplicationImage;
use App\Models\PropertyApplicationDocument;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;
use App\Models\Notification;

class PropertyApplicationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $applications = PropertyApplication::query()
            ->when($request->search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                        ->orWhere('address', 'like', "%{$search}%")
                        ->orWhere('city', 'like', "%{$search}%");
                });
            })
            ->orderByRaw("FIELD(status, 'pending', 'approved', 'rejected')")
            ->paginate(10)
            ->withQueryString();

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

            $admins = User::where('role', 'admin')->get();

            foreach ($admins as $admin) {
                Notification::create([
                    'user_id' => $admin->id,
                    'title'   => 'Pengajuan Kos Baru',
                    'message' => "Pengajuan kos baru: {$application->name} dari {$application->city}",
                    'is_read' => false,
                ]);
            }

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
                'success',
                'Pengajuan Kos Berhasil Dikirim! Silahkan Tunggu Persetujuan dari Admin'
            );
        });
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $data = PropertyApplication::with([
            'user:id,name,email',
            'images:id,property_application_id,image_path',
            'documents:id,property_application_id,type,file_path'
        ])->select(
            'id',
            'user_id',
            'name',
            'address',
            'city',
            'description',
            'rules',
            'latitude',
            'longitude',
            'status'
        )->findOrFail($id);

        return Inertia::render('Admin/RequestDetail', [
            'application' => $data
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $application = PropertyApplication::findOrFail($id);
        $status = $request->input('status');

        if ($application->status === 'approved' || $application->status === 'rejected') {
            return redirect()->back()->with(
                'error',
                'Pengajuan ini telah diproses sebelumnya!'
            );
        }

        DB::transaction(function () use ($application, $status, $request) {
            if ($status === 'approved') {
                $application->update(['status' => 'approved', 'approved_by' => auth()->id()]);

                $user = User::find($application->user_id);
                $user->update(['role' => 'owner']);

                $property = Property::create([
                    'name' => $application->name,
                    'address' => $application->address,
                    'city' => $application->city,
                    'description' => $application->description,
                    'rules' => $application->rules,
                    'latitude' => $application->latitude,
                    'longitude' => $application->longitude,
                    'owner_id' => $application->user_id,
                ]);

                foreach ($application->images as $image) {
                    PropertyImage::create([
                        'property_id' => $property->id,
                        'image_path' => $image->image_path
                    ]);
                }
            } else {
                $application->update([
                    'status' => 'rejected',
                    'rejection_reason' => $request->input('rejection_reason')
                ]);
            }
        });

        return redirect()->route('admin.request')->with('success', 'Status pengajuan berhasil diperbarui!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
