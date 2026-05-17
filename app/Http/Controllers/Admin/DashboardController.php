<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Contract;
use App\Models\Property;
use App\Models\User;
use Inertia\Inertia;
use App\Models\RentalRequest;
use Carbon\Carbon;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $chartData = collect(range(6, 0))->map(function ($day) {
            $date = now()->subDays($day);

            return [
                'name' => $date->translatedFormat('D'),
                'users' => User::whereDate('created_at', $date)->count(),
            ];
        });
        $activities = collect();


        User::latest()
            ->take(3)
            ->get()
            ->each(function ($user) use ($activities) {

                $activities->push([
                    'type' => 'user',
                    'text' => "{$user->name} mendaftar",
                    'time' => $user->created_at->diffForHumans(),
                ]);
            });

        Property::latest()
            ->take(3)
            ->get()
            ->each(function ($property) use ($activities) {

                $activities->push([
                    'type' => 'property',
                    'text' => "Kos {$property->name} ditambahkan",
                    'time' => $property->created_at->diffForHumans(),
                ]);
            });
            
        RentalRequest::latest()
            ->take(3)
            ->get()
            ->each(function ($request) use ($activities) {

                $activities->push([
                    'type' => 'booking',
                    'text' => "Booking baru dibuat",
                    'time' => $request->created_at->diffForHumans(),
                ]);
            });

        $activities = $activities
            ->sortByDesc('time')
            ->take(8)
            ->values();




        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'users' => User::count(),
                'kos' => Property::count(),
                'bookings' => Contract::count(),
            ],
            'chartData' => $chartData,
            'activities' => $activities,
        ]);
    }
}
