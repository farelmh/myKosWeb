<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class KostSeeder extends Seeder
{
    public function run(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('reviews')->truncate();
        DB::table('contracts')->truncate();
        DB::table('room_type_images')->truncate();
        DB::table('room_type_facilities')->truncate();
        DB::table('room_types')->truncate();
        DB::table('property_facilities')->truncate();
        DB::table('property_images')->truncate();
        DB::table('properties')->truncate();
        DB::table('facilities')->truncate();
        DB::table('users')->whereNotIn('email', [
            'raffintianoadzani@gmail.com',
            'rtadzani22@gmail.com',
            'raffintianoadzani21@gmail.com',
            'tabakamari253@gmail.com',
        ])->delete();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        $now = Carbon::now();

        // =====================
        // OWNERS
        // =====================
        $owners = [
            ['name' => 'Budi Santoso',     'email' => 'budi.owner@gmail.com'],
            ['name' => 'Sari Wulandari',   'email' => 'sari.owner@gmail.com'],
            ['name' => 'Ahmad Fauzi',      'email' => 'ahmad.owner@gmail.com'],
            ['name' => 'Dewi Rahayu',      'email' => 'dewi.owner@gmail.com'],
            ['name' => 'Hendra Kusuma',    'email' => 'hendra.owner@gmail.com'],
            ['name' => 'Rina Marlina',     'email' => 'rina.owner@gmail.com'],
            ['name' => 'Bambang Sutrisno', 'email' => 'bambang.owner@gmail.com'],
            ['name' => 'Fitri Handayani',  'email' => 'fitri.owner@gmail.com'],
        ];

        $ownerIds = [];
        foreach ($owners as $owner) {
            $ownerIds[] = DB::table('users')->insertGetId([
                'name'              => $owner['name'],
                'email'             => $owner['email'],
                'role'              => 'owner',
                'phone'             => '08' . rand(100000000, 999999999),
                'email_verified_at' => $now,
                'password'          => bcrypt('password123'),
                'created_at'        => $now,
                'updated_at'        => $now,
            ]);
        }

        // =====================
        // TENANTS
        // =====================
        $sahrilId = DB::table('users')->insertGetId([
            'name'              => 'Sahril WFC',
            'email'             => 'sahrilwfc@gmail.com',
            'role'              => 'tenant',
            'phone'             => '081234567890',
            'email_verified_at' => $now,
            'password'          => bcrypt('sahrilwfc'),
            'created_at'        => $now,
            'updated_at'        => $now,
        ]);

        $tenants = [
            ['name' => 'Siti Aminah',    'email' => 'siti.tenant@gmail.com',  'phone' => '082111222333'],
            ['name' => 'Rizky Pratama',  'email' => 'rizky.tenant@gmail.com', 'phone' => '083222333444'],
            ['name' => 'Maya Sari',      'email' => 'maya.tenant@gmail.com',  'phone' => '084333444555'],
            ['name' => 'Doni Kurniawan', 'email' => 'doni.tenant@gmail.com',  'phone' => '085444555666'],
            ['name' => 'Ayu Lestari',    'email' => 'ayu.tenant@gmail.com',   'phone' => '086555666777'],
        ];

        $tenantIds = [$sahrilId];
        foreach ($tenants as $tenant) {
            $tenantIds[] = DB::table('users')->insertGetId([
                'name'              => $tenant['name'],
                'email'             => $tenant['email'],
                'role'              => 'tenant',
                'phone'             => $tenant['phone'],
                'email_verified_at' => $now,
                'password'          => bcrypt('password123'),
                'created_at'        => $now,
                'updated_at'        => $now,
            ]);
        }

        // =====================
        // FACILITIES — sekarang ada kolom type dan icon
        // =====================
        $propertyFacilitiesData = [
            'WiFi', 'Parkir Motor', 'Parkir Mobil', 'Jemuran',
            'Dapur Bersama', 'Ruang Tamu', 'CCTV', 'Penjaga 24 Jam',
        ];

        $roomFacilitiesData = [
            'Kasur', 'Lemari', 'Meja Belajar', 'Kursi',
            'AC', 'Kipas Angin', 'Kamar Mandi Dalam', 'Kamar Mandi Luar',
        ];

        $allFacilityIds = [];

        foreach ($propertyFacilitiesData as $name) {
            $id = DB::table('facilities')->insertGetId([
                'name'       => $name,
                'type'       => 'property', // kolom baru
                'icon'       => null,
                'created_at' => $now,
                'updated_at' => $now,
            ]);
            $allFacilityIds[$name] = $id;
        }

        foreach ($roomFacilitiesData as $name) {
            $id = DB::table('facilities')->insertGetId([
                'name'       => $name,
                'type'       => 'room', // kolom baru
                'icon'       => null,
                'created_at' => $now,
                'updated_at' => $now,
            ]);
            $allFacilityIds[$name] = $id;
        }

        // =====================
        // DATA KOST — sekarang ada kolom type di properties
        // dan width + length di room_types (bukan size)
        // =====================
        $properties = [
            [
                'owner_index' => 0,
                'name'        => 'Kost Griya Jember Indah',
                'address'     => 'Jl. Kalimantan No. 37, Kampus UNEJ',
                'city'        => 'Jember',
                'type'        => 'campuran', // kolom baru
                'description' => 'Kost nyaman dekat kampus UNEJ, lingkungan aman dan bersih, tersedia WiFi kecepatan tinggi, dapur bersama, dan parkir motor.',
                'rules'       => 'Tidak boleh membawa tamu menginap. Jam malam pukul 22.00. Dilarang merokok di dalam kamar.',
                'latitude'    => -8.1590,
                'longitude'   => 113.7150,
                'images'      => [
                    'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800',
                    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
                ],
                'prop_facilities' => ['WiFi', 'Parkir Motor', 'Jemuran', 'Dapur Bersama', 'CCTV'],
                'rooms' => [
                    [
                        'name'        => 'Kamar Campuran Standar',
                        'room_width'       => 3, // kolom baru (ganti size)
                        'room_length'      => 4, // kolom baru (ganti size)
                        'price'       => 600000,
                        'capacity'    => 1,
                        'total_rooms' => 8,
                        'rental_type' => 'monthly',
                        'facilities'  => ['Kasur', 'Lemari', 'Meja Belajar', 'Kipas Angin', 'Kamar Mandi Luar'],
                        'images'      => ['https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800'],
                        'contracts'   => [
                            ['tenant_index' => 0, 'start' => '2025-01-01', 'end' => '2025-06-30', 'status' => 'ended',
                             'rating' => 5, 'comment' => 'Kost sangat nyaman, WiFi kenceng, recommended!'],
                            ['tenant_index' => 1, 'start' => '2026-01-01', 'end' => '2026-12-31', 'status' => 'active',
                             'rating' => null, 'comment' => null],
                        ],
                    ],
                ],
            ],
            [
                'owner_index' => 1,
                'name'        => 'Kost Putri Melati UNEJ',
                'address'     => 'Jl. Jawa No. 12, Sumbersari',
                'city'        => 'Jember',
                'type'        => 'putri',
                'description' => 'Kost khusus putri dekat UNEJ. Lingkungan tenang, cocok untuk mahasiswi. Kamar mandi dalam, AC, dan WiFi tersedia.',
                'rules'       => 'Khusus perempuan. Jam malam pukul 21.30. Tamu laki-laki tidak diperbolehkan masuk.',
                'latitude'    => -8.1620,
                'longitude'   => 113.7180,
                'images'      => [
                    'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800',
                    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800',
                ],
                'prop_facilities' => ['WiFi', 'Parkir Motor', 'Jemuran', 'Dapur Bersama', 'Penjaga 24 Jam'],
                'rooms' => [
                    [
                        'name'        => 'Kamar Putri AC',
                        'room_width'       => 3,
                        'room_length'      => 4,
                        'price'       => 750000,
                        'capacity'    => 1,
                        'total_rooms' => 6,
                        'rental_type' => 'monthly',
                        'facilities'  => ['Kasur', 'Lemari', 'Meja Belajar', 'Kursi', 'AC', 'Kamar Mandi Dalam'],
                        'images'      => ['https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800'],
                        'contracts'   => [
                            ['tenant_index' => 0, 'start' => '2026-01-01', 'end' => '2026-12-31', 'status' => 'active',
                             'rating' => null, 'comment' => null],
                            ['tenant_index' => 2, 'start' => '2026-02-01', 'end' => '2026-07-31', 'status' => 'active',
                             'rating' => null, 'comment' => null],
                        ],
                    ],
                    [
                        'name'        => 'Kamar Putri Kipas',
                        'room_width'       => 3,
                        'room_length'      => 3,
                        'price'       => 550000,
                        'capacity'    => 1,
                        'total_rooms' => 4,
                        'rental_type' => 'monthly',
                        'facilities'  => ['Kasur', 'Lemari', 'Kipas Angin', 'Kamar Mandi Luar'],
                        'images'      => ['https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800'],
                        'contracts'   => [
                            ['tenant_index' => 3, 'start' => '2025-06-01', 'end' => '2025-12-31', 'status' => 'ended',
                             'rating' => 4, 'comment' => 'Tempat bersih, aman, cocok buat mahasiswi.'],
                        ],
                    ],
                ],
            ],
            [
                'owner_index' => 2,
                'name'        => 'Kost Putra Mandiri POLIJE',
                'address'     => 'Jl. Mastrip PO BOX 164, dekat POLIJE',
                'city'        => 'Jember',
                'type'        => 'putra',
                'description' => 'Kost khusus putra dekat kampus POLIJE. Kamar luas, parkir motor luas, keamanan 24 jam.',
                'rules'       => 'Khusus laki-laki. Jam malam pukul 23.00. Dilarang merokok di kamar.',
                'latitude'    => -8.1720,
                'longitude'   => 113.6980,
                'images'      => [
                    'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800',
                    'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800',
                ],
                'prop_facilities' => ['WiFi', 'Parkir Motor', 'Parkir Mobil', 'Jemuran', 'CCTV', 'Penjaga 24 Jam'],
                'rooms' => [
                    [
                        'name'        => 'Kamar Putra Standar',
                        'room_width'       => 3,
                        'room_length'      => 4,
                        'price'       => 500000,
                        'capacity'    => 1,
                        'total_rooms' => 10,
                        'rental_type' => 'monthly',
                        'facilities'  => ['Kasur', 'Lemari', 'Meja Belajar', 'Kipas Angin', 'Kamar Mandi Luar'],
                        'images'      => ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800'],
                        'contracts'   => [
                            ['tenant_index' => 0, 'start' => '2025-07-01', 'end' => '2025-12-31', 'status' => 'ended',
                             'rating' => 4, 'comment' => 'Kost luas, parkir aman, dekat POLIJE.'],
                            ['tenant_index' => 4, 'start' => '2026-01-01', 'end' => '2026-06-30', 'status' => 'active',
                             'rating' => null, 'comment' => null],
                        ],
                    ],
                    [
                        'name'        => 'Kamar Putra AC',
                        'room_width'       => 3,
                        'room_length'      => 5,
                        'price'       => 750000,
                        'capacity'    => 1,
                        'total_rooms' => 5,
                        'rental_type' => 'monthly',
                        'facilities'  => ['Kasur', 'Lemari', 'Meja Belajar', 'Kursi', 'AC', 'Kamar Mandi Dalam'],
                        'images'      => ['https://images.unsplash.com/photo-1564078516393-cf04bd966897?w=800'],
                        'contracts'   => [
                            ['tenant_index' => 1, 'start' => '2026-03-01', 'end' => '2026-08-31', 'status' => 'active',
                             'rating' => null, 'comment' => null],
                        ],
                    ],
                ],
            ],
            [
                'owner_index' => 3,
                'name'        => 'Kost Sejahtera Sumbersari',
                'address'     => 'Jl. Danau Toba No. 5, Sumbersari',
                'city'        => 'Jember',
                'type'        => 'campuran',
                'description' => 'Kost campuran strategis dekat UNEJ dan pusat kota Jember. Harga terjangkau, fasilitas lengkap.',
                'rules'       => 'Jam malam pukul 22.00. Bayar tepat waktu setiap tanggal 1.',
                'latitude'    => -8.1650,
                'longitude'   => 113.7200,
                'images'      => [
                    'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800',
                    'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=800',
                ],
                'prop_facilities' => ['WiFi', 'Parkir Motor', 'Jemuran', 'Dapur Bersama'],
                'rooms' => [
                    [
                        'name'        => 'Kamar Ekonomi',
                        'room_width'       => 3,
                        'room_length'      => 3,
                        'price'       => 450000,
                        'capacity'    => 1,
                        'total_rooms' => 12,
                        'rental_type' => 'monthly',
                        'facilities'  => ['Kasur', 'Lemari', 'Kipas Angin', 'Kamar Mandi Luar'],
                        'images'      => ['https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=800'],
                        'contracts'   => [
                            ['tenant_index' => 0, 'start' => '2026-03-01', 'end' => '2027-02-28', 'status' => 'active',
                             'rating' => null, 'comment' => null],
                            ['tenant_index' => 5, 'start' => '2025-09-01', 'end' => '2025-12-31', 'status' => 'ended',
                             'rating' => 4, 'comment' => 'Harga murah, lokasi strategis.'],
                        ],
                    ],
                ],
            ],
            [
                'owner_index' => 4,
                'name'        => 'Kost Premium Mastrip',
                'address'     => 'Jl. Mastrip No. 88, Jember',
                'city'        => 'Jember',
                'type'        => 'campuran',
                'description' => 'Kost premium dekat POLIJE dengan fasilitas AC, kamar mandi dalam, dan dapur bersama.',
                'rules'       => 'Tamu hanya boleh sampai pukul 21.00. Dilarang membawa hewan peliharaan.',
                'latitude'    => -8.1700,
                'longitude'   => 113.7000,
                'images'      => [
                    'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800',
                    'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800',
                ],
                'prop_facilities' => ['WiFi', 'Parkir Motor', 'Parkir Mobil', 'Jemuran', 'Dapur Bersama', 'CCTV', 'Penjaga 24 Jam', 'Ruang Tamu'],
                'rooms' => [
                    [
                        'name'        => 'Kamar Premium AC',
                        'room_width'       => 4,
                        'room_length'      => 4,
                        'price'       => 900000,
                        'capacity'    => 1,
                        'total_rooms' => 6,
                        'rental_type' => 'monthly',
                        'facilities'  => ['Kasur', 'Lemari', 'Meja Belajar', 'Kursi', 'AC', 'Kamar Mandi Dalam'],
                        'images'      => ['https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800'],
                        'contracts'   => [
                            ['tenant_index' => 2, 'start' => '2026-01-01', 'end' => '2026-12-31', 'status' => 'active',
                             'rating' => null, 'comment' => null],
                            ['tenant_index' => 3, 'start' => '2025-01-01', 'end' => '2025-12-31', 'status' => 'ended',
                             'rating' => 5, 'comment' => 'Kost terbaik di Jember, fasilitas lengkap!'],
                        ],
                    ],
                    [
                        'name'        => 'Kamar Deluxe AC',
                        'room_width'       => 4,
                        'room_length'      => 5,
                        'price'       => 1200000,
                        'capacity'    => 2,
                        'total_rooms' => 3,
                        'rental_type' => 'monthly',
                        'facilities'  => ['Kasur', 'Lemari', 'Meja Belajar', 'Kursi', 'AC', 'Kamar Mandi Dalam'],
                        'images'      => ['https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800'],
                        'contracts'   => [
                            ['tenant_index' => 4, 'start' => '2026-02-01', 'end' => '2026-07-31', 'status' => 'active',
                             'rating' => null, 'comment' => null],
                        ],
                    ],
                ],
            ],
            [
                'owner_index' => 5,
                'name'        => 'Kost Putri Anggrek POLIJE',
                'address'     => 'Jl. Brawijaya No. 23, dekat POLIJE',
                'city'        => 'Jember',
                'type'        => 'putri',
                'description' => 'Kost putri dengan suasana asri dekat POLIJE. Kamar bersih, ada taman kecil, penjaga 24 jam.',
                'rules'       => 'Khusus perempuan. Jam malam 22.00. Tidak boleh masak di kamar.',
                'latitude'    => -8.1740,
                'longitude'   => 113.6960,
                'images'      => [
                    'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800',
                    'https://images.unsplash.com/photo-1582582494705-f8ce0b0c24f0?w=800',
                ],
                'prop_facilities' => ['WiFi', 'Parkir Motor', 'Jemuran', 'Penjaga 24 Jam', 'CCTV'],
                'rooms' => [
                    [
                        'name'        => 'Kamar Putri Standar',
                        'room_width'       => 3,
                        'room_length'      => 4,
                        'price'       => 650000,
                        'capacity'    => 1,
                        'total_rooms' => 8,
                        'rental_type' => 'monthly',
                        'facilities'  => ['Kasur', 'Lemari', 'Meja Belajar', 'Kipas Angin', 'Kamar Mandi Dalam'],
                        'images'      => ['https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800'],
                        'contracts'   => [
                            ['tenant_index' => 5, 'start' => '2026-01-01', 'end' => '2026-12-31', 'status' => 'active',
                             'rating' => null, 'comment' => null],
                            ['tenant_index' => 2, 'start' => '2025-01-01', 'end' => '2025-12-31', 'status' => 'ended',
                             'rating' => 5, 'comment' => 'Aman dan nyaman untuk mahasiswi.'],
                        ],
                    ],
                ],
            ],
            [
                'owner_index' => 6,
                'name'        => 'Kost Barokah Tegalboto',
                'address'     => 'Jl. Tegalboto Lor No. 15',
                'city'        => 'Jember',
                'type'        => 'putra',
                'description' => 'Kost nyaman di kawasan Tegalboto, sangat dekat dengan kampus UNEJ.',
                'rules'       => 'Jam malam pukul 22.00. Bayar sewa paling lambat tanggal 5.',
                'latitude'    => -8.1580,
                'longitude'   => 113.7220,
                'images'      => [
                    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800',
                    'https://images.unsplash.com/photo-1564078516393-cf04bd966897?w=800',
                ],
                'prop_facilities' => ['WiFi', 'Parkir Motor', 'Jemuran', 'Dapur Bersama'],
                'rooms' => [
                    [
                        'name'        => 'Kamar Putra Ekonomi',
                        'room_width'       => 3,
                        'room_length'      => 3,
                        'price'       => 400000,
                        'capacity'    => 1,
                        'total_rooms' => 15,
                        'rental_type' => 'monthly',
                        'facilities'  => ['Kasur', 'Lemari', 'Kipas Angin', 'Kamar Mandi Luar'],
                        'images'      => ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800'],
                        'contracts'   => [
                            ['tenant_index' => 0, 'start' => '2024-07-01', 'end' => '2024-12-31', 'status' => 'ended',
                             'rating' => 4, 'comment' => 'Harga paling murah, dekat UNEJ.'],
                            ['tenant_index' => 1, 'start' => '2026-01-01', 'end' => '2026-06-30', 'status' => 'active',
                             'rating' => null, 'comment' => null],
                        ],
                    ],
                ],
            ],
            [
                'owner_index' => 7,
                'name'        => 'Kost Nyaman Kalimantan',
                'address'     => 'Jl. Kalimantan No. 72, Sumbersari',
                'city'        => 'Jember',
                'type'        => 'campuran',
                'description' => 'Kost campuran di Jalan Kalimantan kawasan kost mahasiswa UNEJ. Akses mudah ke kampus.',
                'rules'       => 'Tamu hanya sampai pukul 21.00. Jaga kebersihan bersama.',
                'latitude'    => -8.1600,
                'longitude'   => 113.7160,
                'images'      => [
                    'https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=800',
                    'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800',
                ],
                'prop_facilities' => ['WiFi', 'Parkir Motor', 'Jemuran', 'Dapur Bersama', 'Ruang Tamu'],
                'rooms' => [
                    [
                        'name'        => 'Kamar Campuran Standar',
                        'room_width'       => 3,
                        'room_length'      => 4,
                        'price'       => 550000,
                        'capacity'    => 1,
                        'total_rooms' => 10,
                        'rental_type' => 'monthly',
                        'facilities'  => ['Kasur', 'Lemari', 'Meja Belajar', 'Kipas Angin', 'Kamar Mandi Luar'],
                        'images'      => ['https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=800'],
                        'contracts'   => [
                            ['tenant_index' => 3, 'start' => '2026-01-01', 'end' => '2026-12-31', 'status' => 'active',
                             'rating' => null, 'comment' => null],
                            ['tenant_index' => 4, 'start' => '2025-03-01', 'end' => '2025-08-31', 'status' => 'ended',
                             'rating' => 4, 'comment' => 'Lokasi strategis, harga wajar.'],
                        ],
                    ],
                ],
            ],
        ];

        // =====================
        // INSERT DATA
        // =====================
        foreach ($properties as $propertyData) {
            $ownerId = $ownerIds[$propertyData['owner_index']];

            $propertyId = DB::table('properties')->insertGetId([
                'owner_id'    => $ownerId,
                'name'        => $propertyData['name'],
                'address'     => $propertyData['address'],
                'city'        => $propertyData['city'],
                'type'        => $propertyData['type'], // kolom baru
                'description' => $propertyData['description'],
                'rules'       => $propertyData['rules'],
                'latitude'    => $propertyData['latitude'],
                'longitude'   => $propertyData['longitude'],
                'created_at'  => $now,
                'updated_at'  => $now,
            ]);

            foreach ($propertyData['images'] as $imagePath) {
                DB::table('property_images')->insert([
                    'property_id' => $propertyId,
                    'image_path'  => $imagePath,
                    'created_at'  => $now,
                    'updated_at'  => $now,
                ]);
            }

            foreach ($propertyData['prop_facilities'] as $facilityName) {
                DB::table('property_facilities')->insert([
                    'property_id' => $propertyId,
                    'facility_id' => $allFacilityIds[$facilityName],
                    'created_at'  => $now,
                    'updated_at'  => $now,
                ]);
            }

            foreach ($propertyData['rooms'] as $roomData) {
                $roomTypeId = DB::table('room_types')->insertGetId([
                    'property_id' => $propertyId,
                    'name'        => $roomData['name'],
                    'room_width'       => $roomData['room_width'],  // ganti size -> width
                    'room_length'      => $roomData['room_length'], // ganti size -> length
                    'price'       => $roomData['price'],
                    'capacity'    => $roomData['capacity'],
                    'total_rooms' => $roomData['total_rooms'],
                    'rental_type' => $roomData['rental_type'],
                    'created_at'  => $now,
                    'updated_at'  => $now,
                ]);

                foreach ($roomData['facilities'] as $facilityName) {
                    DB::table('room_type_facilities')->insert([
                        'room_type_id' => $roomTypeId,
                        'facility_id'  => $allFacilityIds[$facilityName],
                        'created_at'   => $now,
                        'updated_at'   => $now,
                    ]);
                }

                foreach ($roomData['images'] as $imagePath) {
                    DB::table('room_type_images')->insert([
                        'room_type_id' => $roomTypeId,
                        'image_path'   => $imagePath,
                        'created_at'   => $now,
                        'updated_at'   => $now,
                    ]);
                }

                $reviewedContracts = [];

                foreach ($roomData['contracts'] as $contractData) {
                    $tenantId = $tenantIds[$contractData['tenant_index']];

                    $contractId = DB::table('contracts')->insertGetId([
                        'room_type_id' => $roomTypeId,
                        'tenant_id'    => $tenantId,
                        'start_date'   => $contractData['start'],
                        'end_date'     => $contractData['end'],
                        'status'       => $contractData['status'],
                        'created_at'   => $now,
                        'updated_at'   => $now,
                    ]);

                    if ($contractData['rating'] !== null && !in_array($contractId, $reviewedContracts)) {
                        DB::table('reviews')->insert([
                            'user_id'     => $tenantId,
                            'property_id' => $propertyId,
                            'contract_id' => $contractId,
                            'rating'      => $contractData['rating'],
                            'comment'     => $contractData['comment'],
                            'created_at'  => $now,
                            'updated_at'  => $now,
                        ]);
                        $reviewedContracts[] = $contractId;
                    }
                }
            }
        }
    }
}