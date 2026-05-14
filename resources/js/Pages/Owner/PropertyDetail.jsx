import React from "react";
import OwnerLayout from "@/Layouts/OwnerLayout";
import {
    MapPin,
    FileText,
    ShieldCheck,
    Sparkles,
    Image as ImageIcon,
    Pencil,
    ArrowLeft,
} from "lucide-react";
import { Link, router } from "@inertiajs/react";

export default function PropertyDetail({ property }) {
    return (
        <OwnerLayout>
            <div className="max-w-7xl mx-auto space-y-6">

                <div className="
                    relative overflow-hidden rounded-2xl
                    bg-white        dark:bg-dark-card
                    border
                    border-mint-200 dark:border-dark-border/20
                    transition-colors duration-300
                ">
                    {/* IMAGE */}
                    <div className="relative h-[300px]">
                        {property.images?.length > 0 ? (
                            <img
                                src={`/storage/${property.images[0].image_path}`}
                                alt={property.name}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="
                                w-full h-full flex items-center justify-center
                                bg-mint-50 dark:bg-dark-bg
                            ">
                                <ImageIcon
                                    size={64}
                                    className="text-mint-200 dark:text-mint-200/30"
                                />
                            </div>
                        )}

                        {/* OVERLAY — hanya saat ada gambar */}
                        {property.images?.length > 0 && (
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                        )}

                        {/* CONTENT OVERLAY */}
                        <div className="absolute bottom-0 left-0 w-full p-6 flex items-end justify-between gap-4">
                            <div>
                                {/* Status badge */}
                                <div className="
                                    inline-flex items-center gap-1.5
                                    px-3 py-1 rounded-full text-xs font-medium mb-3
                                    bg-mint-200/80 dark:bg-mint-200/20
                                    text-kost-dark dark:text-mint-50
                                    border border-mint-200 dark:border-mint-300/20
                                ">
                                    <Sparkles size={12} />
                                    Properti Aktif
                                </div>

                                <h1 className="text-2xl font-medium text-white drop-shadow">
                                    {property.name}
                                </h1>

                                <div className="flex items-center gap-1.5 text-white/80 mt-1.5 text-sm">
                                    <MapPin size={14} />
                                    <span>
                                        {property.address}, {property.city}
                                    </span>
                                </div>
                            </div>

                            {/* EDIT BUTTON */}
                            <Link
                                href={route("owner.property.edit", property.id)}
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
                                <Pencil size={15} />
                                Edit Kos
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* LEFT */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* DESKRIPSI */}
                        <div className="
                            rounded-2xl p-6
                            bg-white        dark:bg-dark-card
                            border
                            border-mint-200 dark:border-dark-border/20
                            transition-colors duration-300
                        ">
                            <div className="flex items-center gap-3 mb-5">
                                <div className="
                                    p-2.5 rounded-xl
                                    bg-mint-100      dark:bg-mint-200/10
                                    border border-mint-200 dark:border-mint-300/20
                                    text-mint-300    dark:text-mint-200
                                ">
                                    <FileText size={18} />
                                </div>
                                <div>
                                    <h2 className="text-sm font-medium text-kost-dark dark:text-mint-50">
                                        Deskripsi Kos
                                    </h2>
                                    <p className="text-xs text-kost-muted dark:text-mint-100/40">
                                        Informasi lengkap mengenai properti
                                    </p>
                                </div>
                            </div>
                            <p className="text-sm text-kost-muted dark:text-mint-100/60 leading-relaxed whitespace-pre-line">
                                {property.description || "-"}
                            </p>
                        </div>

                        {/* PERATURAN */}
                        <div className="
                            rounded-2xl p-6
                            bg-white        dark:bg-dark-card
                            border
                            border-mint-200 dark:border-dark-border/20
                            transition-colors duration-300
                        ">
                            <div className="flex items-center gap-3 mb-5">
                                <div className="
                                    p-2.5 rounded-xl
                                    bg-mint-100      dark:bg-mint-200/10
                                    border border-mint-200 dark:border-mint-300/20
                                    text-mint-300    dark:text-mint-200
                                ">
                                    <ShieldCheck size={18} />
                                </div>
                                <div>
                                    <h2 className="text-sm font-medium text-kost-dark dark:text-mint-50">
                                        Peraturan Kos
                                    </h2>
                                    <p className="text-xs text-kost-muted dark:text-mint-100/40">
                                        Aturan yang berlaku untuk penghuni
                                    </p>
                                </div>
                            </div>
                            <p className="text-sm text-kost-muted dark:text-mint-100/60 leading-relaxed whitespace-pre-line">
                                {property.rules || "-"}
                            </p>
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="space-y-6">

                        {/* GALERI */}
                        <div className="
                            rounded-2xl p-6
                            bg-white        dark:bg-dark-card
                            border
                            border-mint-200 dark:border-dark-border/20
                            transition-colors duration-300
                        ">
                            <h2 className="text-sm font-medium text-kost-dark dark:text-mint-50 mb-4">
                                Galeri Kos
                            </h2>

                            {property.images?.length > 0 ? (
                                <div className="grid grid-cols-2 gap-3">
                                    {property.images.map((image) => (
                                        <div
                                            key={image.id}
                                            className="
                                                overflow-hidden rounded-xl
                                                border border-mint-200 dark:border-dark-border/20
                                                group
                                            "
                                        >
                                            <img
                                                src={`/storage/${image.image_path}`}
                                                alt="Property"
                                                className="
                                                    w-full h-28 object-cover
                                                    group-hover:scale-105
                                                    transition duration-300
                                                "
                                            />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="
                                    h-40 rounded-xl
                                    flex flex-col items-center justify-center gap-2
                                    border border-dashed
                                    border-mint-200 dark:border-dark-border/20
                                ">
                                    <ImageIcon size={32} className="text-mint-200 dark:text-mint-200/30" />
                                    <p className="text-sm text-kost-muted dark:text-mint-100/30">
                                        Belum ada gambar
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </OwnerLayout>
    );
}