<?php

use App\Http\Controllers\FacilityController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PropertyApplicationController;
use App\Http\Controllers\PropertyController;
use App\Http\Controllers\PropertyFacilityController;
use App\Http\Controllers\RentalRequestController;
use App\Http\Controllers\RoomTypeController;
use App\Http\Controllers\TenantController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\KosController;
use App\Http\Controllers\Admin\DashboardController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

Route::get('/', function () {
    return inertia('Landing');
})->name('landing');


Route::get('/auth/google', function () {
    return Socialite::driver('google')->redirect();
})->name('google.redirect');

Route::get('/auth/google/callback', function () {
    $googleUser = Socialite::driver('google')->user();

    $user = User::updateOrCreate(
        ['email' => $googleUser->getEmail()],
        ['name' => $googleUser->getName()]
    );

    Auth::login($user);
    if ($user->role === 'admin') {
        return redirect('admin/dashboard');
    }

    return redirect('/');
})->name('google.callback');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::put('/profile/password', [ProfileController::class, 'updatePassword'])
        ->name('profile.password');
});

require __DIR__ . '/auth.php';

Route::middleware(['auth', 'verified', 'admin'])->prefix('admin')->group(function () {

   Route::get('/dashboard', [DashboardController::class, 'index'])
    ->name('admin.dashboard');

    Route::get('/users', [UserController::class, 'index'])->name('admin.users');

    Route::get('/kos', function () {
        return Inertia::render('Admin/Kos');
    })->name('admin.kos');

    Route::get('/transaksi', function () {
        return Inertia::render('Admin/Transaksi');
    })->name('admin.transaksi');

    Route::put('/users/{user}/role', [UserController::class, 'updateRole'])
        ->name('admin.users.updateRole');

    Route::delete('/users/{user}', [UserController::class, 'destroy'])
        ->name('admin.users.destroy');

    Route::get('/properties', [PropertyController::class, 'index'])->name('admin.properties');

    Route::get('/properties/{id}', [PropertyController::class, 'show'])->name('admin.properties.detail');

    Route::get('/request', [PropertyApplicationController::class, 'index'])->name('admin.request');

    Route::get('/request/{id}', [PropertyApplicationController::class, 'show'])->name('admin.request.detail');

    Route::put('/request/update/{id}', [PropertyApplicationController::class, 'update'])->name('admin.request.update');

    Route::get('/facilities', [FacilityController::class, 'index'])->name('admin.facilities');

    Route::get('/facilities/create', [FacilityController::class, 'create'])->name('admin.facilities.create');

    Route::get('/facilities/edit', [FacilityController::class, 'edit'])->name('admin.facilities.edit');

    Route::post('/facilities/store', [FacilityController::class, 'store'])->name('admin.facilities.store');

    Route::get('/settings', function () {
        return Inertia::render('Admin/Settings');
    })->name('admin.settings');
});

Route::middleware(['auth', 'verified', 'owner'])->prefix('owner')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Owner/Dashboard');
    })->name('owner.dashboard');

    Route::get('/tenants/{id}', [
        TenantController::class,
        'tenants'
    ])->name('owner.tenants');

    Route::get('/owner/messages', function () {
        return Inertia::render('Owner/Messages');
    })->name('owner.messages');

    Route::get('/property/detail/{id}', [
        PropertyController::class,
        'detail'
    ])->name('owner.property.detail');

    Route::put('/property/update/{id}', [
        PropertyController::class,
        'update'
    ])->name('owner.property.update');

    Route::get('/property/edit/{id}', [
        PropertyController::class,
        'edit'
    ])->name('owner.property.edit');

    Route::delete('/property-image/delete/{id}', [
        PropertyController::class,
        'deleteImage'
    ])->name('owner.propertyImage.delete');

    Route::get('/facilities/{id}', [
        PropertyFacilityController::class,
        'editFacilities'
    ])->name('owner.property.facilities');

    Route::post('/facilities/{property}', [
        PropertyFacilityController::class,
        'store'
    ])->name('owner.property.facilities.store');

    Route::get(
        '/room-types/create',
        [
            RoomTypeController::class,
            'create'
        ]
    )->name('owner.room-types.create');

    Route::post('/room-types/store', [
        RoomTypeController::class,
        'store'
    ])->name('owner.room-types.store');

    Route::get('/room-types/edit/{id}', [
        RoomTypeController::class,
        'edit'
    ])->name('owner.room-types.edit');

    Route::get(
        '/room-types/{property}',
        [
            RoomTypeController::class,
            'index'
        ]
    )->name('owner.room-types');

    Route::put('/room-types/update/{id}', [
        RoomTypeController::class,
        'update'
    ])->name('owner.room-type.update');

    Route::delete('/room-types/delete/{id}', [
        RoomTypeController::class,
        'destroy'
    ])->name('owner.room-type.delete');

    Route::delete('/room-types-image/delete/{id}', [
        RoomTypeController::class,
        'deleteImage'
    ])->name('owner.room-type-image.delete');


    Route::get('/rental-request/{property}', [
        RentalRequestController::class,
        'index'
    ])->name('owner.rental-request');
});

Route::get('/DetailKos', function () {
    return Inertia::render('DetailKos');
})->name('detail.kos');

Route::get('/kos/{id}', [KosController::class, 'detail'])->name('kos.detail');

Route::middleware('auth')->group(function () {

    Route::get('/profile', function () {
        return Inertia::render('Profile');
    })->name('profile');

    Route::get('/search', [SearchController::class, 'index'])->name('search');

    Route::post('/profile/update', [ProfileController::class, 'update'])
        ->name('profile.update');

    Route::post('/profile/password', [ProfileController::class, 'updatePassword'])
        ->name('profile.password');

    Route::get('/form-pengajuan', function () {
        return Inertia::render('FormPengajuan');
    })->name('form-pengajuan');

    Route::post('/pengajuan-kos', [PropertyApplicationController::class, 'store'])
        ->name('pengajuan-kos.store');
});
