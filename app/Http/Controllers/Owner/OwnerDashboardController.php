<?php

namespace App\Http\Controllers\Owner;

use App\Http\Controllers\Controller;
use App\Models\Property;
use App\Models\RoomType;
use App\Models\Review;
use App\Models\Contract;
use App\Models\Payment;
use App\Models\Complaint;
use Carbon\Carbon;
use Inertia\Inertia;

class OwnerDashboardController extends Controller
{
    public function index()
    {
        $ownerId     = auth()->id();
        $propertyIds = Property::where('owner_id', $ownerId)->pluck('id');

        $totalProperties = $propertyIds->count();

        $totalRooms    = RoomType::whereIn('property_id', $propertyIds)
            ->sum('total_rooms');

        $occupiedRooms = Contract::whereHas('roomType', function ($q) use ($propertyIds) {
            $q->whereIn('property_id', $propertyIds);
        })
            ->where('status', 'active')
            ->count();

        // $monthlyRevenue = Payment::whereHas(
        //     'contract',
        //     fn($q) =>
        //     $q->whereIn('property_id', $propertyIds)
        // )
        //     ->whereMonth('created_at', now()->month)
        //     ->whereYear('created_at',  now()->year)
        //     ->where('status', 'paid')
        //     ->sum('amount');

        $avgRating = Review::whereIn('property_id', $propertyIds)
            ->avg('rating');

        $pendingComplaints = Complaint::whereIn('property_id', $propertyIds)
            ->where('status', 'pending')
            ->count();

        // $revenueData = collect(range(5, 0))->map(function ($month) use ($propertyIds) {
        //     $date = now()->subMonths($month);
        //     $revenue = Payment::whereHas(
        //         'contract',
        //         fn($q) =>
        //         $q->whereIn('property_id', $propertyIds)
        //     )
        //         ->whereMonth('created_at', $date->month)
        //         ->whereYear('created_at',  $date->year)
        //         ->where('status', 'paid')
        //         ->sum('amount');

        //     return [
        //         'name'    => $date->translatedFormat('M'),
        //         'revenue' => (int) $revenue,
        //     ];
        // });

        $recentReviews = Review::with('user:id,name')
            ->whereIn('property_id', $propertyIds)
            ->latest()
            ->limit(3)
            ->get(['id', 'user_id', 'property_id', 'rating', 'comment', 'created_at']);

        // $recentPayments = Payment::with([
        //     'contract.user:id,name',
        //     'contract.property:id,name',
        // ])
        //     ->whereHas(
        //         'contract',
        //         fn($q) =>
        //         $q->whereIn('property_id', $propertyIds)
        //     )
        //     ->latest()
        //     ->limit(5)
        //     ->get();

        $complaints = Complaint::with('property:id,name')
            ->whereIn('property_id', $propertyIds)
            ->where('status', 'pending')
            ->latest()
            ->limit(5)
            ->get(['id', 'property_id', 'title', 'status', 'created_at']);

        $activities = collect();

        Review::whereIn('property_id', $propertyIds)
            ->latest()->limit(2)->get()
            ->each(fn($r) => $activities->push([
                'type' => 'review',
                'text' => "Review baru masuk",
                'time' => $r->created_at->diffForHumans(),
                'created_at' => $r->created_at->toISOString(),
            ]));

        // Payment::whereHas(
        //     'contract',
        //     fn($q) =>
        //     $q->whereIn('property_id', $propertyIds)
        // )->latest()->limit(2)->get()
        //     ->each(fn($p) => $activities->push([
        //         'type' => 'payment',
        //         'text' => "Pembayaran baru diterima",
        //         'time' => $p->created_at->diffForHumans(),
        //         'created_at' => $p->created_at->toISOString(),
        //     ]));

        Complaint::whereIn('property_id', $propertyIds)
            ->latest()->limit(2)->get()
            ->each(fn($c) => $activities->push([
                'type' => 'complaint',
                'text' => "Keluhan baru: {$c->title}",
                'time' => $c->created_at->diffForHumans(),
                'created_at' => $c->created_at->toISOString(),
            ]));

        $activities = $activities->sortByDesc('created_at')->take(6)->values();

        return Inertia::render('Owner/Dashboard', [
            'stats' => [
                'totalProperties'  => $totalProperties,
                'totalRooms'       => $totalRooms,
                'occupiedRooms'    => $occupiedRooms,
                // 'monthlyRevenue'   => $monthlyRevenue,
                'avgRating'        => round($avgRating, 1),
                'pendingComplaints' => $pendingComplaints,
            ],
            // 'revenueData'    => $revenueData,
            'recentReviews'  => $recentReviews,
            // 'recentPayments' => $recentPayments,
            'complaints'     => $complaints,
            'activities'     => $activities,
        ]);
    }
}
