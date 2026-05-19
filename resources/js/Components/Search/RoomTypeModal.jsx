import { X, BedDouble, Users, Ruler, Calendar, Wifi, Car, Snowflake, Bath, ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const FACILITY_ICONS = {
    "WiFi":              <Wifi      className="w-4 h-4" />,
    "Wifi":              <Wifi      className="w-4 h-4" />,
    "WIFI":              <Wifi      className="w-4 h-4" />,
    "AC":                <Snowflake className="w-4 h-4" />,
    "Parkir":            <Car       className="w-4 h-4" />,
    "Kamar Mandi Dalam": <Bath      className="w-4 h-4" />,
};

const ImageSlider = ({ images }) => {
    const [current, setCurrent] = useState(0);

    if (!images?.length) {
        return (
            <div className="
                h-48 flex flex-col items-center justify-center gap-2
                bg-mint-50 dark:bg-dark-bg
                border-b border-mint-200 dark:border-dark-border/20
            ">
                <ImageIcon className="w-8 h-8 text-mint-200 dark:text-mint-200/30" />
                <p className="text-xs text-kost-muted dark:text-mint-100/30">
                    Belum ada foto
                </p>
            </div>
        );
    }

    const prev = (e) => {
        e.stopPropagation();
        setCurrent((p) => (p - 1 + images.length) % images.length);
    };

    const next = (e) => {
        e.stopPropagation();
        setCurrent((p) => (p + 1) % images.length);
    };

    return (
        <div className="relative h-52 overflow-hidden group">
            <div
                className="flex h-full transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${current * 100}%)` }}
            >
                {images.map((img, i) => (
                    <img
                        key={i}
                        src={`/storage/${img.image_path}`}
                        alt={`Foto ${i + 1}`}
                        className="w-full h-full object-cover flex-shrink-0"
                        style={{ minWidth: "100%" }}
                    />
                ))}
            </div>

            {images.length > 1 && (
                <>
                    <button
                        onClick={prev}
                        className="
                            absolute left-2 top-1/2 -translate-y-1/2
                            p-1.5 rounded-full transition
                            bg-white/80 dark:bg-dark-card/80
                            text-kost-dark dark:text-mint-50
                            opacity-0 group-hover:opacity-100
                            hover:bg-white dark:hover:bg-dark-card
                        "
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                        onClick={next}
                        className="
                            absolute right-2 top-1/2 -translate-y-1/2
                            p-1.5 rounded-full transition
                            bg-white/80 dark:bg-dark-card/80
                            text-kost-dark dark:text-mint-50
                            opacity-0 group-hover:opacity-100
                            hover:bg-white dark:hover:bg-dark-card
                        "
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>

                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                        {images.map((_, i) => (
                            <button
                                key={i}
                                onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
                                className={`
                                    rounded-full transition-all
                                    ${i === current
                                        ? "w-4 h-1.5 bg-white"
                                        : "w-1.5 h-1.5 bg-white/50 hover:bg-white/80"
                                    }
                                `}
                            />
                        ))}
                    </div>

                    {/* Counter */}
                    <div className="
                        absolute top-2 right-2
                        px-2 py-0.5 rounded-full text-xs
                        bg-black/40 text-white backdrop-blur-sm
                    ">
                        {current + 1}/{images.length}
                    </div>
                </>
            )}
        </div>
    );
};

export default function RoomTypeModal({ room, onClose, onBook }) {
    if (!room) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black/40 dark:bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center px-4 pb-4 sm:pb-0"
                onClick={onClose}
            >
                <motion.div
                    initial={{ opacity: 0, y: 60, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0,  scale: 1    }}
                    exit={{ opacity: 0, y: 60, scale: 0.97 }}
                    transition={{ duration: 0.2 }}
                    onClick={(e) => e.stopPropagation()}
                    className="
                        w-full max-w-lg rounded-2xl overflow-hidden
                        bg-white        dark:bg-dark-card
                        border border-mint-200 dark:border-dark-border/20
                        shadow-sm max-h-[90vh] flex flex-col
                    "
                >
                    <div className="flex items-center justify-between p-5 border-b border-mint-200 dark:border-dark-border/20 flex-shrink-0">
                        <div>
                            <h2 className="text-base font-medium text-kost-dark dark:text-mint-50">
                                {room.name}
                            </h2>
                            <p className="text-xs text-kost-muted dark:text-mint-100/40 mt-0.5">
                                Detail tipe kamar
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="
                                p-1.5 rounded-lg transition flex-shrink-0
                                text-kost-muted dark:text-mint-100/40
                                hover:bg-mint-50 dark:hover:bg-dark-bg
                                hover:text-kost-dark dark:hover:text-mint-50
                            "
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    <ImageSlider images={room.images} />
                    <div className="p-5 space-y-5 overflow-y-auto">
                        <div className="grid grid-cols-2 gap-3">
                            {room.room_width && room.room_length && (
                                <div className="rounded-xl p-3 bg-mint-50 dark:bg-dark-bg border border-mint-200 dark:border-dark-border/20">
                                    <div className="flex items-center gap-1.5 mb-1">
                                        <Ruler className="w-3.5 h-3.5 text-mint-300" />
                                        <span className="text-xs text-kost-muted dark:text-mint-100/40">Ukuran</span>
                                    </div>
                                    <p className="text-sm font-medium text-kost-dark dark:text-mint-50">
                                        {room.room_width} × {room.room_length} m
                                    </p>
                                </div>
                            )}
                            {room.capacity && (
                                <div className="rounded-xl p-3 bg-mint-50 dark:bg-dark-bg border border-mint-200 dark:border-dark-border/20">
                                    <div className="flex items-center gap-1.5 mb-1">
                                        <Users className="w-3.5 h-3.5 text-mint-300" />
                                        <span className="text-xs text-kost-muted dark:text-mint-100/40">Kapasitas</span>
                                    </div>
                                    <p className="text-sm font-medium text-kost-dark dark:text-mint-50">
                                        {room.capacity} orang
                                    </p>
                                </div>
                            )}
                            {room.total_rooms && (
                                <div className="rounded-xl p-3 bg-mint-50 dark:bg-dark-bg border border-mint-200 dark:border-dark-border/20">
                                    <div className="flex items-center gap-1.5 mb-1">
                                        <BedDouble className="w-3.5 h-3.5 text-mint-300" />
                                        <span className="text-xs text-kost-muted dark:text-mint-100/40">Ketersediaan</span>
                                    </div>
                                    <p className="text-sm font-medium text-kost-dark dark:text-mint-50">
                                        {room.total_rooms} unit
                                    </p>
                                </div>
                            )}
                            {room.rental_type && (
                                <div className="rounded-xl p-3 bg-mint-50 dark:bg-dark-bg border border-mint-200 dark:border-dark-border/20">
                                    <div className="flex items-center gap-1.5 mb-1">
                                        <Calendar className="w-3.5 h-3.5 text-mint-300" />
                                        <span className="text-xs text-kost-muted dark:text-mint-100/40">Tipe Sewa</span>
                                    </div>
                                    <p className="text-sm font-medium text-kost-dark dark:text-mint-50">
                                        {room.rental_type === "monthly" ? "Bulanan" : "Harian"}
                                    </p>
                                </div>
                            )}
                        </div>

                        {room.facilities?.length > 0 && (
                            <div>
                                <p className="text-xs font-medium text-kost-muted dark:text-mint-100/40 mb-2">
                                    Fasilitas Kamar
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {room.facilities.map((f) => (
                                        <span
                                            key={f.id}
                                            className="
                                                flex items-center gap-1.5
                                                px-3 py-1.5 rounded-lg text-xs
                                                bg-mint-50 dark:bg-dark-bg
                                                border border-mint-200 dark:border-dark-border/20
                                                text-kost-muted dark:text-mint-100/60
                                            "
                                        >
                                            {FACILITY_ICONS[f.name] ?? null}
                                            {f.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* HARGA + TOMBOL */}
                        <div className="pt-3 border-t border-mint-200 dark:border-dark-border/20">
                            <div className="mb-4">
                                <p className="text-xs text-kost-muted dark:text-mint-100/40 mb-0.5">Harga</p>
                                <p className="text-xl font-medium text-kost-dark dark:text-mint-50">
                                    Rp {Number(room.price).toLocaleString("id-ID")}
                                    <span className="text-xs text-kost-muted dark:text-mint-100/40 font-normal ml-1">
                                        /{room.rental_type === "monthly" ? "bulan" : "hari"}
                                    </span>
                                </p>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={onClose}
                                    className="
                                        flex-1 py-2.5 rounded-xl text-sm transition
                                        bg-mint-50 dark:bg-dark-bg
                                        border border-mint-200 dark:border-dark-border/20
                                        text-kost-muted dark:text-mint-100/50
                                        hover:bg-mint-100 dark:hover:bg-dark-card
                                    "
                                >
                                    Tutup
                                </button>
                                <button
                                    onClick={() => onBook(room)}
                                    className="
                                        flex-1 py-2.5 rounded-xl text-sm font-medium transition
                                        bg-mint-200      dark:bg-mint-200/20
                                        border border-mint-200 dark:border-mint-300/20
                                        text-kost-dark   dark:text-mint-50
                                        hover:bg-mint-300 dark:hover:bg-mint-300/30
                                    "
                                >
                                    Pilih Kamar
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}