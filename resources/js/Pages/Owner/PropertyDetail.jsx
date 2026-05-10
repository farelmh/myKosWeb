import React from "react";
import OwnerLayout from "@/Layouts/OwnerLayout";
import {
    MapPin,
    FileText,
    ShieldCheck,
    Sparkles,
    Image as ImageIcon,
    Pencil
} from "lucide-react";

import { Link } from "@inertiajs/react";

export default function PropertyDetail({ property }) {

    return (
        <OwnerLayout>

            <div className="max-w-7xl mx-auto space-y-8">

                {/* HERO */}
                <div
                    className="
                        relative
                        overflow-hidden
                        rounded-[2rem]
                        border
                        border-white/10
                        bg-white/5
                        backdrop-blur-xl
                        shadow-[0_8px_32px_rgba(0,0,0,0.37)]
                    "
                >

                    {/* IMAGE */}
                    <div className="relative h-[320px]">

                        {property.images?.length > 0 ? (
                            <img
                                src={`/storage/${property.images[0].image_path}`}
                                alt={property.name}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div
                                className="
                                    w-full
                                    h-full
                                    flex
                                    items-center
                                    justify-center
                                    bg-gradient-to-br
                                    from-cyan-500/20
                                    to-violet-500/20
                                "
                            >

                                <ImageIcon
                                    size={80}
                                    className="text-white/30"
                                />

                            </div>
                        )}

                        {/* OVERLAY */}
                        <div
                            className="
                                absolute
                                inset-0
                                bg-gradient-to-t
                                from-[#0b0b1a]
                                via-[#0b0b1a]/40
                                to-transparent
                            "
                        />

                        {/* CONTENT */}
                        <div
                            className="
                                absolute
                                bottom-0
                                left-0
                                w-full
                                p-8
                                flex
                                items-end
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
                                        bg-cyan-500/20
                                        border
                                        border-cyan-500/30
                                        text-cyan-300
                                        text-sm
                                        mb-4
                                    "
                                >

                                    <Sparkles size={16} />

                                    Properti Aktif

                                </div>

                                <h1 className="text-4xl font-bold text-white">
                                    {property.name}
                                </h1>

                                <div className="flex items-center gap-2 text-gray-300 mt-3">

                                    <MapPin size={18} />

                                    <span>
                                        {property.address}, {property.city}
                                    </span>

                                </div>

                            </div>

                            {/* EDIT BUTTON */}
                            <Link
                                href={route(
                                    "owner.property.edit",
                                    property.id
                                )}
                                className="
                                    flex
                                    items-center
                                    gap-2
                                    px-5
                                    py-3
                                    rounded-2xl
                                    bg-gradient-to-r
                                    from-cyan-500
                                    to-violet-500
                                    text-white
                                    font-medium
                                    hover:opacity-90
                                    transition-all
                                    duration-300
                                    shadow-lg
                                "
                            >

                                <Pencil size={18} />

                                Edit Kos

                            </Link>

                        </div>

                    </div>

                </div>

                {/* CONTENT GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* LEFT */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* DESCRIPTION */}
                        <div
                            className="
                                rounded-3xl
                                border
                                border-white/10
                                bg-white/5
                                backdrop-blur-xl
                                p-8
                            "
                        >

                            <div className="flex items-center gap-3 mb-6">

                                <div
                                    className="
                                        p-3
                                        rounded-2xl
                                        bg-cyan-500/10
                                        text-cyan-400
                                    "
                                >

                                    <FileText size={22} />

                                </div>

                                <div>

                                    <h2 className="text-xl font-semibold text-white">
                                        Deskripsi Kos
                                    </h2>

                                    <p className="text-gray-400 text-sm">
                                        Informasi lengkap mengenai properti
                                    </p>

                                </div>

                            </div>

                            <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                                {property.description || "-"}
                            </p>

                        </div>

                        {/* RULES */}
                        <div
                            className="
                                rounded-3xl
                                border
                                border-white/10
                                bg-white/5
                                backdrop-blur-xl
                                p-8
                            "
                        >

                            <div className="flex items-center gap-3 mb-6">

                                <div
                                    className="
                                        p-3
                                        rounded-2xl
                                        bg-violet-500/10
                                        text-violet-400
                                    "
                                >

                                    <ShieldCheck size={22} />

                                </div>

                                <div>

                                    <h2 className="text-xl font-semibold text-white">
                                        Peraturan Kos
                                    </h2>

                                    <p className="text-gray-400 text-sm">
                                        Aturan yang berlaku untuk penghuni
                                    </p>

                                </div>

                            </div>

                            <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                                {property.rules || "-"}
                            </p>

                        </div>

                    </div>

                    {/* RIGHT */}
                    <div className="space-y-8">

                        {/* GALLERY */}
                        <div
                            className="
                                rounded-3xl
                                border
                                border-white/10
                                bg-white/5
                                backdrop-blur-xl
                                p-8
                            "
                        >

                            <h2 className="text-xl font-semibold text-white mb-6">
                                Galeri Kos
                            </h2>

                            {property.images?.length > 0 ? (
                                <div className="grid grid-cols-2 gap-4">

                                    {property.images.map((image) => (
                                        <div
                                            key={image.id}
                                            className="
                                                overflow-hidden
                                                rounded-2xl
                                                border
                                                border-white/10
                                                group
                                            "
                                        >

                                            <img
                                                src={`/storage/${image.image_path}`}
                                                alt="Property"
                                                className="
                                                    w-full
                                                    h-36
                                                    object-cover
                                                    group-hover:scale-110
                                                    transition-all
                                                    duration-500
                                                "
                                            />

                                        </div>
                                    ))}

                                </div>
                            ) : (
                                <div
                                    className="
                                        h-48
                                        rounded-2xl
                                        border
                                        border-dashed
                                        border-white/10
                                        flex
                                        flex-col
                                        items-center
                                        justify-center
                                        text-gray-500
                                    "
                                >

                                    <ImageIcon size={40} />

                                    <p className="mt-3 text-sm">
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