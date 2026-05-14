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
        if (confirm("Apakah Anda yakin ingin menghapus tipe kamar ini?")) {
            router.delete(route("owner.room-type.delete", id), {
                preserveScroll: true,
            });
        }
    };

    return (
        <OwnerLayout>
            <Head title="Tipe Kamar" />

            <div className="max-w-7xl mx-auto space-y-6">

                <div className="
                    rounded-2xl p-6
                    bg-white        dark:bg-dark-card
                    border
                    border-mint-200 dark:border-dark-border/20
                    flex items-center justify-between gap-4
                    transition-colors duration-300
                ">
                    <div>
                        <div className="
                            inline-flex items-center gap-1.5
                            px-3 py-1 rounded-full text-xs font-medium mb-3
                            bg-mint-100      dark:bg-mint-200/10
                            border border-mint-200 dark:border-mint-300/20
                            text-kost-dark   dark:text-mint-100
                        ">
                            <Sparkles size={12} />
                            Room Types
                        </div>

                        <h1 className="text-lg font-medium text-kost-dark dark:text-mint-50">
                            Tipe Kamar
                        </h1>
                        <p className="text-sm text-kost-muted dark:text-mint-100/40 mt-1">
                            Kelola berbagai tipe kamar yang tersedia pada properti Anda.
                        </p>
                    </div>

                    <Link
                        href={route("owner.room-types.create")}
                        className="
                            flex items-center gap-2
                            px-4 py-2 rounded-xl text-sm font-medium
                            flex-shrink-0 transition
                            bg-mint-200      dark:bg-mint-200/20
                            border border-mint-200 dark:border-mint-300/20
                            text-kost-dark   dark:text-mint-50
                            hover:bg-mint-300 dark:hover:bg-mint-300/30
                        "
                    >
                        <Plus className="w-4 h-4" />
                        Tambah Tipe
                    </Link>
                </div>

                {roomTypes.length === 0 && (
                    <div className="
                        rounded-2xl p-16 text-center
                        bg-white        dark:bg-dark-card
                        border border-dashed
                        border-mint-200 dark:border-dark-border/20
                        transition-colors duration-300
                    ">
                        <div className="
                            w-16 h-16 mx-auto rounded-2xl mb-5
                            flex items-center justify-center
                            bg-mint-100      dark:bg-mint-200/10
                            border border-mint-200 dark:border-mint-300/20
                            text-mint-300    dark:text-mint-200
                        ">
                            <BedDouble className="w-8 h-8" />
                        </div>

                        <h2 className="text-base font-medium text-kost-dark dark:text-mint-50 mb-2">
                            Belum Ada Tipe Kamar
                        </h2>
                        <p className="text-sm text-kost-muted dark:text-mint-100/40 mb-6 max-w-sm mx-auto">
                            Tambahkan tipe kamar pertama untuk mulai mengelola kamar pada properti Anda.
                        </p>

                        <Link
                            href={route("owner.room-types.create")}
                            className="
                                inline-flex items-center gap-2
                                px-4 py-2 rounded-xl text-sm font-medium transition
                                bg-mint-200      dark:bg-mint-200/20
                                border border-mint-200 dark:border-mint-300/20
                                text-kost-dark   dark:text-mint-50
                                hover:bg-mint-300 dark:hover:bg-mint-300/30
                            "
                        >
                            <Plus className="w-4 h-4" />
                            Tambah Sekarang
                        </Link>
                    </div>
                )}

                {roomTypes.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                        {roomTypes.map((roomType) => (
                            <div
                                key={roomType.id}
                                className="
                                    group rounded-2xl overflow-hidden
                                    bg-white        dark:bg-dark-card
                                    border
                                    border-mint-200 dark:border-dark-border/20
                                    hover:border-mint-300 dark:hover:border-mint-300/30
                                    transition-all duration-300
                                "
                            >
                                {/* IMAGE */}
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={
                                            roomType.images?.[0]
                                                ? `/storage/${roomType.images[0].image_path}`
                                                : "https://placehold.co/600x400/ECF4E8/93BFC7?text=Room+Type"
                                        }
                                        alt={roomType.name}
                                        className="
                                            w-full h-full object-cover
                                            group-hover:scale-105
                                            transition-all duration-500
                                        "
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                                    {/* Badge + nama */}
                                    <div className="absolute bottom-0 left-0 right-0 p-4">
                                        <div className="
                                            inline-flex items-center gap-1.5
                                            px-2.5 py-1 rounded-full text-xs mb-2
                                            bg-black/30 backdrop-blur-sm
                                            text-white/80 border border-white/10
                                        ">
                                            <BedDouble className="w-3 h-3" />
                                            Room Type
                                        </div>
                                        <h2 className="text-lg font-medium text-white drop-shadow">
                                            {roomType.name}
                                        </h2>
                                    </div>
                                </div>

                                {/* CONTENT */}
                                <div className="p-5 space-y-4">

                                    {/* HARGA */}
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-xs text-kost-muted dark:text-mint-100/40 mb-0.5">
                                                Harga
                                            </p>
                                            <h3 className="text-lg font-medium text-kost-dark dark:text-mint-50">
                                                Rp {Number(roomType.price).toLocaleString("id-ID")}
                                            </h3>
                                        </div>
                                        <span className="
                                            px-3 py-1 rounded-lg text-xs font-medium
                                            bg-mint-100      dark:bg-mint-200/10
                                            border border-mint-200 dark:border-mint-300/20
                                            text-kost-dark   dark:text-mint-100
                                        ">
                                            {roomType.rental_type === "monthly" ? "/Bulan" : "/Hari"}
                                        </span>
                                    </div>

                                    {/* STATS */}
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="
                                            rounded-xl p-3
                                            bg-mint-50       dark:bg-dark-bg
                                            border border-mint-200 dark:border-dark-border/20
                                        ">
                                            <div className="flex items-center gap-1.5 mb-1.5">
                                                <Users className="w-3.5 h-3.5 text-mint-300" />
                                                <span className="text-xs text-kost-muted dark:text-mint-100/40">
                                                    Kapasitas
                                                </span>
                                            </div>
                                            <p className="text-sm font-medium text-kost-dark dark:text-mint-50">
                                                {roomType.capacity} Orang
                                            </p>
                                        </div>

                                        <div className="
                                            rounded-xl p-3
                                            bg-mint-50       dark:bg-dark-bg
                                            border border-mint-200 dark:border-dark-border/20
                                        ">
                                            <div className="flex items-center gap-1.5 mb-1.5">
                                                <BedDouble className="w-3.5 h-3.5 text-mint-300" />
                                                <span className="text-xs text-kost-muted dark:text-mint-100/40">
                                                    Total Kamar
                                                </span>
                                            </div>
                                            <p className="text-sm font-medium text-kost-dark dark:text-mint-50">
                                                {roomType.total_rooms || 0}
                                            </p>
                                        </div>
                                    </div>

                                    {/* FASILITAS */}
                                    {roomType.facilities?.length > 0 && (
                                        <div>
                                            <p className="text-xs text-kost-muted dark:text-mint-100/40 mb-2">
                                                Fasilitas
                                            </p>
                                            <div className="flex flex-wrap gap-1.5">
                                                {roomType.facilities.slice(0, 4).map((facility) => (
                                                    <span
                                                        key={facility.id}
                                                        className="
                                                            px-2.5 py-1 rounded-lg text-xs
                                                            bg-mint-100      dark:bg-mint-200/10
                                                            border border-mint-200 dark:border-mint-300/20
                                                            text-kost-dark   dark:text-mint-100
                                                        "
                                                    >
                                                        {facility.name}
                                                    </span>
                                                ))}
                                                {roomType.facilities.length > 4 && (
                                                    <span className="
                                                        px-2.5 py-1 rounded-lg text-xs
                                                        bg-mint-50       dark:bg-dark-bg
                                                        border border-mint-200 dark:border-dark-border/20
                                                        text-kost-muted   dark:text-mint-100/40
                                                    ">
                                                        +{roomType.facilities.length - 4}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* ACTION */}
                                    <div className="grid grid-cols-2 gap-2 pt-1">
                                        <Link
                                            href={route("owner.room-types.edit", roomType.id)}
                                            className="
                                                flex items-center justify-center gap-2
                                                px-4 py-2 rounded-xl text-sm transition group
                                                bg-mint-50       dark:bg-dark-bg
                                                border border-mint-200 dark:border-dark-border/20
                                                text-kost-muted  dark:text-mint-100/50
                                                hover:bg-mint-200 dark:hover:bg-mint-200/20
                                                hover:text-kost-dark dark:hover:text-mint-50
                                            "
                                        >
                                            <Pencil className="w-4 h-4" />
                                            Edit
                                        </Link>

                                        <button
                                            type="button"
                                            onClick={() => handleDelete(roomType.id)}
                                            className="
                                                flex items-center justify-center gap-2
                                                px-4 py-2 rounded-xl text-sm transition group
                                                bg-mint-50      dark:bg-dark-bg
                                                border border-mint-200 dark:border-dark-border/20
                                                text-kost-muted  dark:text-mint-100/50
                                                hover:bg-red-50  dark:hover:bg-red-500/10
                                                hover:border-red-200 dark:hover:border-red-500/20
                                                hover:text-red-400
                                            "
                                        >
                                            <Trash2 className="w-4 h-4" />
                                            Hapus
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