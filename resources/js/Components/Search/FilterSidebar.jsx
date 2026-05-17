import { TYPE_OPTIONS } from "@/constants/searchConstant";
import { fmt } from "@/utils/formatPrice";
import { Crosshair, SlidersHorizontal,Check } from "lucide-react";

export default function FilterSidebar ({
        filters,
        setFilters,
        keyword,
        setKeyword,
        onApply,
        onReset,
        facilities
    }) {
        const toggleFacility = (facility) => {
            setFilters((prev) => ({
                ...prev,
                facilities: prev.facilities.includes(facility)
                    ? prev.facilities.filter((item) => item !== facility)
                    : [...prev.facilities, facility],
            }));
        };

        return (
            <div
                className="
                    bg-white dark:bg-dark-card rounded-3xl overflow-hidden
                    border border-mint-200 dark:border-dark-border/20
                "
            >
                {/* HEADER */}
                <div className="px-5 py-4 border-b border-mint-200 dark:border-dark-border/20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <SlidersHorizontal className="w-4 h-4 text-mint-300" />
                        <span className="text-sm font-bold text-kost-dark dark:text-mint-50">
                            Filter Pencarian
                        </span>
                    </div>

                    <button
                        onClick={onReset}
                        className="text-xs text-kost-muted hover:text-red-400 font-medium transition"
                    >
                        Reset
                    </button>
                </div>

                <div className="p-5 space-y-6">
                    {/* LOKASI */}
                    {/* <section>
                        <label className="block text-xs font-bold uppercase tracking-wider text-kost-muted dark:text-mint-100/40 mb-2.5">
                            Nama / Lokasi
                        </label>

                        <div className="flex items-center gap-2 bg-mint-50 dark:bg-dark-bg rounded-2xl border border-mint-200 dark:border-dark-border/20 focus-within:border-mint-300 transition">
                            <input
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                                placeholder="Misal: Jember, Jawa Timur"
                                className="flex-1 py-3 bg-transparent border-0 outline-none focus:ring-0 text-sm text-kost-dark dark:text-mint-50 placeholder:text-kost-muted/50"
                            />

                            <Crosshair className="w-4 h-4 text-mint-300" />
                        </div>
                    </section> */}

                    {/* TIPE */}
                    <section>
                        <label className="block text-xs font-bold uppercase tracking-wider text-kost-muted dark:text-mint-100/40 mb-2.5">
                            Tipe Kost
                        </label>

                        <div className="flex flex-wrap gap-2">
                            {TYPE_OPTIONS.map((type) => {
                                const active = filters.type === type.value;

                                return (
                                    <button
                                        key={type.value}
                                        onClick={() =>
                                            setFilters((prev) => ({
                                                ...prev,
                                                type: type.value,
                                            }))
                                        }
                                        className={`
                                            flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold transition
                                            ${
                                                active
                                                    ? "bg-mint-300 text-white"
                                                    : "bg-mint-50 dark:bg-dark-bg text-kost-dark dark:text-mint-100/60 border border-mint-200 dark:border-dark-border/20 hover:bg-mint-100"
                                            }
                                        `}
                                    >
                                        {active ? (
                                            <Check className="w-3 h-3" />
                                        ) : (
                                            type.icon
                                        )}
                                        {type.label}
                                    </button>
                                );
                            })}
                        </div>
                    </section>

                    {/* HARGA */}
                    <section>
                        <div className="flex items-center justify-between mb-3">
                            <label className="text-xs font-bold uppercase tracking-wider text-kost-muted dark:text-mint-100/40">
                                Harga Maksimal
                            </label>

                            <span className="text-xs font-bold text-kost-dark dark:text-mint-50 bg-mint-50 dark:bg-dark-bg px-2.5 py-1 rounded-lg border border-mint-200 dark:border-dark-border/20">
                                {filters.maxPrice >= 2000000
                                    ? "Semua"
                                    : `≤ Rp${fmt(filters.maxPrice)}`}
                            </span>
                        </div>

                        <div className="px-1">
                            <div className="relative h-5 flex items-center">
                                <div className="absolute inset-x-0 h-1.5 bg-mint-100 dark:bg-dark-bg rounded-full" />
                                <div
                                    className="absolute h-1.5 bg-mint-300 rounded-full"
                                    style={{
                                        width: `${(filters.maxPrice / 2000000) * 100}%`,
                                    }}
                                />

                                <input
                                    type="range"
                                    min="0"
                                    max="2000000"
                                    step="100000"
                                    value={filters.maxPrice}
                                    onChange={(e) =>
                                        setFilters((prev) => ({
                                            ...prev,
                                            maxPrice: Number(e.target.value),
                                        }))
                                    }
                                    className="
                                        relative w-full appearance-none bg-transparent cursor-pointer
                                        [&::-webkit-slider-thumb]:appearance-none
                                        [&::-webkit-slider-thumb]:w-4
                                        [&::-webkit-slider-thumb]:h-4
                                        [&::-webkit-slider-thumb]:rounded-full
                                        [&::-webkit-slider-thumb]:bg-mint-300
                                        [&::-webkit-slider-thumb]:border-2
                                        [&::-webkit-slider-thumb]:border-white
                                        [&::-webkit-slider-thumb]:shadow-md
                                    "
                                />
                            </div>

                            <div className="flex justify-between mt-2 text-xs text-kost-muted dark:text-mint-100/40 font-medium">
                                <span>Rp0</span>
                                <span>Rp2 jt+</span>
                            </div>
                        </div>
                    </section>

                    {/* FASILITAS */}
                    <section>
                        <label className="block text-xs font-bold uppercase tracking-wider text-kost-muted dark:text-mint-100/40 mb-2.5">
                            Fasilitas
                        </label>

                        <div className="flex flex-wrap gap-2">
                            {facilities.map((facility) => {
                                const active =
                                    filters.facilities.includes(facility.name);

                                return (
                                    <button
                                        key={facility.id}
                                        onClick={() => toggleFacility(facility.name)}
                                        className={`
                                            px-3 py-2 rounded-full text-xs font-medium transition
                                            ${
                                                active
                                                    ? "bg-mint-300 text-white"
                                                    : "bg-mint-50 dark:bg-dark-bg text-kost-dark dark:text-mint-100/60 border border-mint-200 dark:border-dark-border/20 hover:bg-mint-100"
                                            }
                                        `}
                                    >
                                        {facility.name}
                                    </button>
                                );
                            })}
                        </div>
                    </section>
                </div>

                {/* APPLY */}
                <div className="px-5 pb-5">
                    <button
                        onClick={onApply}
                        className="w-full py-3.5 rounded-2xl font-bold text-sm bg-mint-300 hover:bg-secondary text-white transition active:scale-[0.98]"
                    >
                        Terapkan Filter
                    </button>
                </div>
            </div>
        );
    };