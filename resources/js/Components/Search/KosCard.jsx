import { FACILITY_ICONS } from "@/constants/searchConstant";
import { Link } from "@inertiajs/react";
import { MapPin, Star } from "lucide-react";

export default function KosCard ({ kos }) {
        const price = Number(kos.price ?? kos.room_types?.[0]?.price ?? 0);

        return (
            <Link
                href={route("kos.detail", kos.id)}
                className="
                    group flex bg-white dark:bg-dark-card rounded-2xl overflow-hidden
                    border border-mint-200 dark:border-dark-border/20
                    hover:border-mint-300 dark:hover:border-mint-200/30
                    transition
                "
            >
                <div className="relative w-40 sm:w-52 flex-shrink-0 overflow-hidden bg-mint-50 dark:bg-dark-bg">
                    <img
                        src={
                            kos.images?.[0]
                                ? `/storage/${kos.images[0].image_path}`
                                : "https://placehold.co/400x300/ECF4E8/93BFC7?text=Kos"
                        }
                        alt={kos.name}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                </div>

                <div className="flex-1 p-4 sm:p-5 min-w-0 flex flex-col gap-2.5">
                    <div>
                        <h3 className="font-semibold text-sm text-kost-dark dark:text-mint-50 truncate group-hover:text-secondary transition">
                            {kos.name}
                        </h3>

                        <div className="flex items-center gap-1 text-xs text-kost-muted dark:text-mint-100/40 mt-0.5">
                            <MapPin className="w-3 h-3 text-mint-300 flex-shrink-0" />
                            <span className="truncate">
                                {kos.address}, {kos.city}
                            </span>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-red-500">

                            <MapPin className="w-3 h-3" />

                            <span>
                                {kos.distance?.toFixed(1)} km dari lokasi
                            </span>

                        </div>
                    </div>

                    {kos.facilities?.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                            {kos.facilities.slice(0, 4).map((facility) => (
                                <span
                                    key={facility.id}
                                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium bg-mint-50 dark:bg-dark-bg border border-mint-200 dark:border-dark-border/20 text-kost-muted dark:text-mint-100/40"
                                >
                                    {FACILITY_ICONS[facility.name]}
                                    {facility.name}
                                </span>
                            ))}
                        </div>
                    )}

                    <div className="flex items-end justify-between mt-auto pt-2 border-t border-mint-100 dark:border-dark-border/20">
                        <div>
                            <p className="text-[10px] text-kost-muted/60 dark:text-mint-100/30">
                                mulai dari
                            </p>
                            <p className="font-bold text-base text-kost-dark dark:text-mint-50">
                                Rp {price.toLocaleString("id-ID")}
                                <span className="text-xs text-kost-muted/60 dark:text-mint-100/30 font-normal">
                                    {" "}
                                    /bln
                                </span>
                            </p>
                        </div>

                        {kos.rating && (
                            <div className="flex items-center gap-1 bg-mint-50 dark:bg-dark-bg px-2.5 py-1.5 rounded-xl border border-mint-200 dark:border-dark-border/20">
                                <Star className="w-3 h-3 fill-yellow-400 stroke-yellow-400" />
                                <span className="text-xs font-bold text-kost-dark dark:text-mint-50">
                                    {kos.rating}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </Link>
        );
    };