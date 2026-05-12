import OwnerLayout from "@/Layouts/OwnerLayout";
import { Head, Link, router } from "@inertiajs/react";

import {
    Plus,
    BedDouble,
    Users,
    Pencil,
    Sparkles,
    Trash2,
} from "lucide-react";

export default function RoomTypes({ roomTypes }) {

    const handleDelete = (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus tipe kamar ini? Semua data terkait tipe ini akan hilang.")) {
        router.delete(route("owner.room-type.delete", id), {
            preserveScroll: true,
            onSuccess: () => {
                // Opsional: tambahkan notifikasi sukses di sini
            }
        });
    }
};

    return (
        <OwnerLayout>

            <Head title="Tipe Kamar" />

            <div className="max-w-7xl mx-auto space-y-8">

                {/* HEADER */}
                <div
                    className="
                        rounded-[2rem]
                        border
                        border-white/10
                        bg-white/5
                        backdrop-blur-xl
                        p-8
                        flex
                        items-center
                        justify-between
                        gap-6
                    "
                >

                    <div>

                        <div
                            className="
                                inline-flex
                                items-center
                                gap-2
                                px-4
                                py-1.5
                                rounded-full
                                bg-cyan-500/10
                                border
                                border-cyan-500/20
                                text-cyan-300
                                text-sm
                                mb-5
                            "
                        >

                            <Sparkles size={16} />

                            Room Types

                        </div>

                        <h1 className="text-4xl font-bold text-white">
                            Tipe Kamar
                        </h1>

                        <p className="text-gray-400 mt-3 max-w-2xl">
                            Kelola berbagai tipe kamar yang tersedia pada properti Anda.
                        </p>

                    </div>

                    <Link
                        href={route("owner.room-types.create")}
                        className="
                            flex
                            items-center
                            gap-2
                            px-6
                            py-3
                            rounded-2xl
                            bg-gradient-to-r
                            from-cyan-500
                            to-violet-500
                            text-white
                            font-semibold
                            hover:opacity-90
                            transition-all
                        "
                    >

                        <Plus className="w-5 h-5" />

                        Tambah Tipe

                    </Link>

                </div>

                {/* EMPTY STATE */}
                {roomTypes.length === 0 && (
                    <div
                        className="
                            rounded-3xl
                            border
                            border-dashed
                            border-white/10
                            bg-white/5
                            backdrop-blur-xl
                            p-16
                            text-center
                        "
                    >

                        <div
                            className="
                                w-20
                                h-20
                                mx-auto
                                rounded-3xl
                                bg-cyan-500/10
                                flex
                                items-center
                                justify-center
                                text-cyan-400
                                mb-6
                            "
                        >

                            <BedDouble className="w-10 h-10" />

                        </div>

                        <h2 className="text-2xl font-bold text-white mb-3">
                            Belum Ada Tipe Kamar
                        </h2>

                        <p className="text-gray-400 mb-8 max-w-lg mx-auto">
                            Tambahkan tipe kamar pertama untuk mulai mengelola kamar pada properti Anda.
                        </p>

                        <Link
                            href={route("owner.room-types.create")}
                            className="
                                inline-flex
                                items-center
                                gap-2
                                px-6
                                py-3
                                rounded-2xl
                                bg-cyan-500
                                text-white
                                font-semibold
                                hover:opacity-90
                                transition-all
                            "
                        >

                            <Plus className="w-5 h-5" />

                            Tambah Sekarang

                        </Link>

                    </div>
                )}

                {/* CARD GRID */}
                {roomTypes.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                        {roomTypes.map((roomType) => (

                            <div
                                key={roomType.id}
                                className="
                                    group
                                    rounded-3xl
                                    overflow-hidden
                                    border
                                    border-white/10
                                    bg-white/5
                                    backdrop-blur-xl
                                    hover:border-cyan-500/30
                                    transition-all
                                    duration-300
                                "
                            >

                                {/* IMAGE */}
                                <div className="relative h-56 overflow-hidden">

                                    <img
                                        src={
                                            roomType.images?.[0]
                                                ? `/storage/${roomType.images[0].image_path}`
                                                : 'https://placehold.co/600x400/111827/06b6d4?text=Room+Type'
                                        }
                                        alt={roomType.name}
                                        className="
                                            w-full
                                            h-full
                                            object-cover
                                            group-hover:scale-105
                                            transition-all
                                            duration-500
                                        "
                                    />

                                    <div
                                        className="
                                            absolute
                                            inset-0
                                            bg-gradient-to-t
                                            from-black/70
                                            via-black/20
                                            to-transparent
                                        "
                                    />

                                    <div className="absolute bottom-4 left-4 right-4">

                                        <div
                                            className="
                                                inline-flex
                                                items-center
                                                gap-2
                                                px-3
                                                py-1
                                                rounded-full
                                                bg-black/40
                                                backdrop-blur-md
                                                text-xs
                                                text-cyan-300
                                                border
                                                border-white/10
                                                mb-3
                                            "
                                        >

                                            <BedDouble className="w-4 h-4" />

                                            Room Type

                                        </div>

                                        <h2 className="text-2xl font-bold text-white">
                                            {roomType.name}
                                        </h2>

                                    </div>

                                </div>

                                {/* CONTENT */}
                                <div className="p-6 space-y-5">

                                    {/* PRICE */}
                                    <div className="flex items-center justify-between">

                                        <div>
                                            <p className="text-xs text-gray-500 uppercase tracking-widest">
                                                Harga
                                            </p>

                                            <h3 className="text-2xl font-bold text-white mt-1">
                                                Rp {Number(roomType.price).toLocaleString("id-ID")}
                                            </h3>
                                        </div>

                                        <div
                                            className="
                                                px-4
                                                py-2
                                                rounded-2xl
                                                bg-cyan-500/10
                                                border
                                                border-cyan-500/20
                                            "
                                        >
                                            <p className="text-xs text-cyan-300 font-semibold">
                                                {roomType.rental_type === "monthly"  ? "/Bulan" : "/Hari"}
                                            </p>
                                        </div>

                                    </div>

                                    {/* STATS */}
                                    <div className="grid grid-cols-2 gap-4">

                                        <div
                                            className="
                                                rounded-2xl
                                                bg-white/5
                                                border
                                                border-white/10
                                                p-4
                                            "
                                        >

                                            <div className="flex items-center gap-2 text-gray-400 mb-2">
                                                <Users className="w-4 h-4" />
                                                <span className="text-xs">
                                                    Kapasitas
                                                </span>
                                            </div>

                                            <h4 className="text-lg font-bold text-white">
                                                {roomType.capacity} Orang
                                            </h4>

                                        </div>

                                        <div
                                            className="
                                                rounded-2xl
                                                bg-white/5
                                                border
                                                border-white/10
                                                p-4
                                            "
                                        >

                                            <div className="flex items-center gap-2 text-gray-400 mb-2">
                                                <BedDouble className="w-4 h-4" />
                                                <span className="text-xs">
                                                    Total Kamar
                                                </span>
                                            </div>

                                            <h4 className="text-lg font-bold text-white">
                                                {roomType.total_rooms || 0}
                                            </h4>

                                        </div>

                                    </div>

                                    {/* FACILITIES */}
                                    <div>

                                        <p className="text-xs text-gray-500 uppercase tracking-widest mb-3">
                                            Fasilitas
                                        </p>

                                        <div className="flex flex-wrap gap-2">

                                            {roomType.facilities?.slice(0, 4).map((facility) => (

                                                <div
                                                    key={facility.id}
                                                    className="
                                                        px-3
                                                        py-1.5
                                                        rounded-xl
                                                        bg-cyan-500/10
                                                        border
                                                        border-cyan-500/20
                                                        text-cyan-300
                                                        text-xs
                                                    "
                                                >
                                                    {facility.name}
                                                </div>
                                            ))}

                                            {roomType.facilities?.length > 4 && (
                                                <div
                                                    className="
                                                        px-3
                                                        py-1.5
                                                        rounded-xl
                                                        bg-white/5
                                                        border
                                                        border-white/10
                                                        text-gray-400
                                                        text-xs
                                                    "
                                                >
                                                    +{roomType.facilities.length - 4}
                                                </div>
                                            )}

                                        </div>

                                    </div>

                                    {/* ACTION */}
                                    <div className="grid grid-cols-2 gap-3 pt-2">

                                        <Link
                                            href={route(
                                                "owner.room-types.edit",
                                                roomType.id
                                            )}
                                            className="
                                                flex
                                                items-center
                                                justify-center
                                                gap-2
                                                px-4
                                                py-3
                                                rounded-2xl
                                                bg-blue-500/10
                                                border
                                                border-blue-500/20
                                                text-blue-400
                                                hover:bg-blue-500
                                                hover:text-white
                                                transition-all
                                                duration-300
                                                group
                                                shadow-lg shadow-blue-500.10
                                            "
                                        >

                                            <Pencil className="w-4 h-4" />

                                            Edit

                                        </Link>

                                        <button
                                            type="button"
                                            onClick={() => handleDelete(roomType.id)}
                                            className="
                                                flex
                                                items-center
                                                justify-center
                                                gap-2
                                                px-4
                                                py-3
                                                rounded-2xl
                                                bg-red-500/10
                                                border
                                                border-red-500/20
                                                text-red-400
                                                hover:bg-red-500
                                                hover:text-white
                                                transition-all
                                                duration-300
                                                group
                                                shadow-lg shadow-red-500.10
                                            "
                                        >
                                            <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                            <span className="font-semibold text-sm">Hapus</span>
                                        </button>

                                    </div>

                                </div>

                            </div>
                        ))}

                    </div>
                )}

            </div>

        </OwnerLayout>
    );
}
