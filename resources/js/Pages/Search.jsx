    import { useState, useMemo, useEffect, useRef } from "react";
    import {
        MapPin,
        Search,
        Star,
        SlidersHorizontal,
        X,
        Home,
        Wifi,
        Car,
        Wind,
        Bath,
        Check,
        Crosshair,
        ChevronDown,
        ArrowUpDown,
        Loader2,
        Users,
        User,
    } from "lucide-react";
    import { router, Link } from "@inertiajs/react";

    /* ================= CONSTANTS ================= */

    const FACILITY_ICONS = {
        WiFi: <Wifi className="w-3 h-3" />,
        AC: <Wind className="w-3 h-3" />,
        Parkir: <Car className="w-3 h-3" />,
        "Parkir Motor": <Car className="w-3 h-3" />,
        "Kamar Mandi Dalam": <Bath className="w-3 h-3" />,
    };

    const TYPE_OPTIONS = [
        { label: "Semua", value: "all", icon: <Users className="w-3.5 h-3.5" /> },
        { label: "Putra", value: "putra", icon: <User className="w-3.5 h-3.5" /> },
        { label: "Putri", value: "putri", icon: <User className="w-3.5 h-3.5" /> },
        { label: "Campuran", value: "campur", icon: <Users className="w-3.5 h-3.5" /> },
    ];

    const FACILITY_OPTIONS = [
        "Kamar Mandi Dalam",
        "AC",
        "WiFi",
        "Parkir Motor",
        "Dapur Bersama",
        "CCTV",
        "Penjaga 24 Jam",
        "Kipas Angin",
    ];

    const SORT_OPTIONS = [
        { label: "Relevansi", value: "relevance" },
        { label: "Harga Terendah", value: "price_asc" },
        { label: "Harga Tertinggi", value: "price_desc" },
        { label: "Rating Terbaik", value: "rating" },
    ];

    const fmt = (val) => {
        if (val >= 1000000) {
            return `${(val / 1000000).toFixed(1).replace(".0", "")} jt`;
        }

        if (val >= 1000) {
            return `${(val / 1000).toFixed(0)} rb`;
        }

        return "0";
    };

    /* ================= SEARCH BAR ================= */

    const SearchBar = ({ keyword, setKeyword, onSearch }) => {
        const inputRef = useRef(null);

        return (
            <div
                className="
                    flex items-center gap-3 px-5 py-2
                    bg-white dark:bg-dark-card
                    rounded-2xl border border-mint-200 dark:border-dark-border/20
                    shadow-sm transition
                    focus-within:border-mint-300
                "
            >
                <MapPin className="w-5 h-5 text-mint-300 flex-shrink-0" />

                <input
                    ref={inputRef}
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && onSearch()}
                    placeholder="Cari lokasi, kampus, atau nama kos..."
                    className="
                        flex-1 py-2.5 bg-transparent outline-none border-none focus:ring-0
                        text-sm text-kost-dark dark:text-mint-50
                        placeholder:text-kost-muted/50 dark:placeholder:text-mint-100/30
                    "
                />

                {keyword && (
                    <button
                        onClick={() => {
                            setKeyword("");
                            inputRef.current?.focus();
                        }}
                        className="
                            w-6 h-6 rounded-full flex items-center justify-center
                            bg-mint-100 dark:bg-dark-bg
                            text-kost-muted dark:text-mint-100/50
                            hover:text-kost-dark dark:hover:text-mint-50
                            transition
                        "
                    >
                        <X className="w-3.5 h-3.5" />
                    </button>
                )}

                <button
                    onClick={onSearch}
                    className="
                        flex items-center gap-2 px-5 py-2.5 rounded-xl
                        bg-mint-300 hover:bg-secondary
                        text-white text-sm font-semibold
                        transition active:scale-[0.98]
                    "
                >
                    <Search className="w-4 h-4" />
                    <span className="hidden sm:inline">Cari</span>
                </button>
            </div>
        );
    };

    /* ================= SORT DROPDOWN ================= */

    const SortDropdown = ({ value, onChange }) => {
        const [open, setOpen] = useState(false);
        const ref = useRef(null);

        useEffect(() => {
            const close = (e) => {
                if (!ref.current?.contains(e.target)) setOpen(false);
            };

            document.addEventListener("mousedown", close);
            return () => document.removeEventListener("mousedown", close);
        }, []);

        const current = SORT_OPTIONS.find((item) => item.value === value);

        return (
            <div className="relative" ref={ref}>
                <button
                    onClick={() => setOpen((prev) => !prev)}
                    className="
                        flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold
                        bg-white dark:bg-dark-card
                        border border-mint-200 dark:border-dark-border/20
                        text-kost-dark dark:text-mint-100/80
                        hover:border-mint-300 transition
                    "
                >
                    <ArrowUpDown className="w-3.5 h-3.5 text-mint-300" />
                    {current?.label}
                    <ChevronDown
                        className={`w-3.5 h-3.5 text-kost-muted transition ${
                            open ? "rotate-180" : ""
                        }`}
                    />
                </button>

                {open && (
                    <div
                        className="
                            absolute right-0 top-full mt-2 z-30 py-1.5 min-w-[190px]
                            bg-white dark:bg-dark-card rounded-2xl overflow-hidden
                            border border-mint-200 dark:border-dark-border/20
                            shadow-xl
                        "
                    >
                        {SORT_OPTIONS.map((option) => {
                            const active = option.value === value;

                            return (
                                <button
                                    key={option.value}
                                    onClick={() => {
                                        onChange(option.value);
                                        setOpen(false);
                                    }}
                                    className={`
                                        w-full text-left px-4 py-2.5 text-xs font-medium
                                        flex items-center gap-3 transition
                                        ${
                                            active
                                                ? "bg-mint-50 dark:bg-dark-bg text-kost-dark dark:text-mint-50"
                                                : "text-kost-muted dark:text-mint-100/60 hover:bg-mint-50 dark:hover:bg-dark-bg"
                                        }
                                    `}
                                >
                                    <span
                                        className={`
                                            w-4 h-4 rounded-full border-2 flex items-center justify-center
                                            ${
                                                active
                                                    ? "border-mint-300 bg-mint-300"
                                                    : "border-mint-200 dark:border-dark-border/30"
                                            }
                                        `}
                                    >
                                        {active && (
                                            <span className="w-1.5 h-1.5 rounded-full bg-white" />
                                        )}
                                    </span>
                                    {option.label}
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>
        );
    };

    /* ================= FILTER SIDEBAR ================= */

    const FilterSidebar = ({
        filters,
        setFilters,
        keyword,
        setKeyword,
        onApply,
        onReset,
    }) => {
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
                    <section>
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
                    </section>

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
                            {FACILITY_OPTIONS.map((facility) => {
                                const active =
                                    filters.facilities.includes(facility);

                                return (
                                    <button
                                        key={facility}
                                        onClick={() => toggleFacility(facility)}
                                        className={`
                                            px-3 py-2 rounded-full text-xs font-medium transition
                                            ${
                                                active
                                                    ? "bg-mint-300 text-white"
                                                    : "bg-mint-50 dark:bg-dark-bg text-kost-dark dark:text-mint-100/60 border border-mint-200 dark:border-dark-border/20 hover:bg-mint-100"
                                            }
                                        `}
                                    >
                                        {facility}
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

    /* ================= KOS CARD ================= */

    const KosCard = ({ kos }) => {
        const price = Number(kos.price ?? kos.room_types?.[0]?.price ?? 0);

        return (
            <Link
                href={`/kos/${kos.id}`}
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

    /* ================= SKELETON ================= */

    const SkeletonCard = () => (
        <div className="flex bg-white dark:bg-dark-card rounded-2xl overflow-hidden border border-mint-200 dark:border-dark-border/20 animate-pulse">
            <div className="w-40 sm:w-52 bg-mint-100 dark:bg-dark-bg min-h-[130px]" />
            <div className="flex-1 p-5 space-y-3">
                <div className="h-4 bg-mint-100 dark:bg-dark-bg rounded-lg w-2/3" />
                <div className="h-3 bg-mint-50 dark:bg-dark-bg rounded-lg w-1/2" />
                <div className="flex gap-2">
                    <div className="h-5 bg-mint-50 dark:bg-dark-bg rounded-md w-20" />
                    <div className="h-5 bg-mint-50 dark:bg-dark-bg rounded-md w-16" />
                </div>
                <div className="h-5 bg-mint-100 dark:bg-dark-bg rounded-lg w-28" />
            </div>
        </div>
    );

    /* ================= MAP VIEW ================= */

    const MapView = () => (
        <div className="w-full h-full rounded-2xl overflow-hidden border border-mint-200 dark:border-dark-border/20">
            <iframe
                title="Peta Lokasi Kos"
                src="https://www.google.com/maps?q=Jember&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
            />
        </div>
    );

    /* ================= EMPTY STATE ================= */

    const EmptyState = ({ onReset, keyword }) => (
        <div className="flex flex-col items-center justify-center py-20 gap-3 rounded-2xl border-2 border-dashed border-mint-200 dark:border-dark-border/20 bg-white dark:bg-dark-card">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-mint-50 dark:bg-dark-bg border border-mint-200 dark:border-dark-border/20">
                <Home className="w-7 h-7 text-mint-300" />
            </div>

            <div className="text-center">
                <p className="text-sm font-semibold text-kost-dark dark:text-mint-50">
                    Kos tidak ditemukan
                </p>
                <p className="text-xs text-kost-muted dark:text-mint-100/40 mt-1">
                    {keyword
                        ? `Tidak ada hasil untuk "${keyword}".`
                        : "Coba ubah atau hapus filter yang aktif."}
                </p>
            </div>

            <button
                onClick={onReset}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-mint-300 hover:bg-secondary text-white transition"
            >
                Reset Filter
            </button>
        </div>
    );

    /* ================= MOBILE DRAWER ================= */

    const MobileFilterDrawer = ({ open, onClose, children }) => {
        useEffect(() => {
            document.body.style.overflow = open ? "hidden" : "";
            return () => {
                document.body.style.overflow = "";
            };
        }, [open]);

        if (!open) return null;

        return (
            <div className="fixed inset-0 z-50 lg:hidden">
                <div
                    className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                    onClick={onClose}
                />

                <div className="absolute bottom-0 left-0 right-0 max-h-[88vh] overflow-y-auto bg-background dark:bg-dark-bg rounded-t-3xl">
                    <div className="sticky top-0 flex justify-center pt-3 pb-2 bg-background dark:bg-dark-bg">
                        <div className="w-10 h-1 rounded-full bg-mint-300" />
                    </div>

                    <div className="px-4 pb-6">{children}</div>
                </div>
            </div>
        );
    };

    /* ================= FILTER CHIPS ================= */

    const FilterChips = ({
        applied,
        onRemoveType,
        onRemovePrice,
        onRemoveFacility,
        onClearAll,
    }) => {
        const hasType = applied.type !== "all";
        const hasPrice = applied.maxPrice < 2000000;
        const hasFacilities = applied.facilities.length > 0;

        if (!hasType && !hasPrice && !hasFacilities) return null;

        const chipClass =
            "flex items-center gap-1.5 pl-3 pr-2 py-1.5 rounded-full text-xs font-semibold bg-mint-100 dark:bg-dark-bg text-kost-dark dark:text-mint-50 border border-mint-200 dark:border-dark-border/20";

        const xClass =
            "w-4 h-4 rounded-full bg-mint-200 dark:bg-dark-card flex items-center justify-center hover:bg-mint-300 transition";

        return (
            <div className="flex flex-wrap items-center gap-2 mb-4">
                {hasType && (
                    <span className={chipClass}>
                        Tipe: {applied.type}
                        <button onClick={onRemoveType} className={xClass}>
                            <X className="w-2.5 h-2.5" />
                        </button>
                    </span>
                )}

                {hasPrice && (
                    <span className={chipClass}>
                        ≤ Rp{fmt(applied.maxPrice)}
                        <button onClick={onRemovePrice} className={xClass}>
                            <X className="w-2.5 h-2.5" />
                        </button>
                    </span>
                )}

                {applied.facilities.map((facility) => (
                    <span key={facility} className={chipClass}>
                        {facility}
                        <button
                            onClick={() => onRemoveFacility(facility)}
                            className={xClass}
                        >
                            <X className="w-2.5 h-2.5" />
                        </button>
                    </span>
                ))}

                <button
                    onClick={onClearAll}
                    className="text-xs text-red-400 hover:text-red-500 font-semibold px-2.5 py-1.5 rounded-full border border-red-100 dark:border-red-500/20 hover:bg-red-50 dark:hover:bg-red-500/10 transition"
                >
                    Hapus semua
                </button>
            </div>
        );
    };

    /* ================= RESULT HEADER ================= */

    const ResultHeader = ({ count, keyword, sortBy, setSortBy, isLoading }) => (
        <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-kost-muted dark:text-mint-100/50">
                {isLoading ? (
                    <span className="flex items-center gap-1.5 text-mint-300">
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        Mencari...
                    </span>
                ) : (
                    <>
                        <strong className="text-kost-dark dark:text-mint-50">
                            {count}
                        </strong>{" "}
                        kos ditemukan
                        {keyword && (
                            <>
                                {" "}
                                untuk{" "}
                                <strong className="text-kost-dark dark:text-mint-50">
                                    "{keyword}"
                                </strong>
                            </>
                        )}
                    </>
                )}
            </p>

            <div className="hidden lg:block">
                <SortDropdown value={sortBy} onChange={setSortBy} />
            </div>
        </div>
    );

    /* ================= MAIN PAGE ================= */

    export default function SearchPage({ properties = [], query = "" }) {
        const defaultFilters = {
            type: "all",
            maxPrice: 2000000,
            facilities: [],
        };

        const [keyword, setKeyword] = useState(query);
        const [sortBy, setSortBy] = useState("relevance");
        const [showFilter, setShowFilter] = useState(false);
        const [isLoading, setIsLoading] = useState(false);

        const [filters, setFilters] = useState(defaultFilters);
        const [applied, setApplied] = useState(defaultFilters);
        const [appliedKeyword, setAppliedKeyword] = useState(query);

        const handleApply = () => {
            setApplied(filters);
            setAppliedKeyword(keyword);
            setShowFilter(false);
        };

        const handleSearch = () => {
            setIsLoading(true);
            setAppliedKeyword(keyword);

            router.get(
                "/search",
                { q: keyword },
                {
                    preserveState: true,
                    onFinish: () => setIsLoading(false),
                }
            );
        };

        const handleReset = () => {
            setKeyword("");
            setFilters(defaultFilters);
            setApplied(defaultFilters);
            setAppliedKeyword("");
            setShowFilter(false);
        };

        const patchApplied = (patch) => {
            const next = { ...applied, ...patch };
            setApplied(next);
            setFilters(next);
        };

        const filtered = useMemo(() => {
            let list = properties.filter((kos) => {
                const q = appliedKeyword.toLowerCase();

                const matchKeyword =
                    !q ||
                    kos.name?.toLowerCase().includes(q) ||
                    kos.city?.toLowerCase().includes(q) ||
                    kos.address?.toLowerCase().includes(q);

                const price = Number(kos.price ?? kos.room_types?.[0]?.price ?? 0);

                const matchPrice =
                    applied.maxPrice >= 2000000 || price <= applied.maxPrice;

                const matchType =
                    applied.type === "all" ||
                    kos.type?.toLowerCase() === applied.type;

                const matchFacilities =
                    applied.facilities.length === 0 ||
                    applied.facilities.every((facility) =>
                        kos.facilities?.some((item) => item.name === facility)
                    );

                return matchKeyword && matchPrice && matchType && matchFacilities;
            });

            if (sortBy === "price_asc") {
                list = [...list].sort(
                    (a, b) =>
                        Number(a.price ?? a.room_types?.[0]?.price ?? 0) -
                        Number(b.price ?? b.room_types?.[0]?.price ?? 0)
                );
            }

            if (sortBy === "price_desc") {
                list = [...list].sort(
                (a, b) =>
                    Number(b.price ?? b.room_types?.[0]?.price ?? 0) -
                    Number(a.price ?? a.room_types?.[0]?.price ?? 0)
            );
        }

        if (sortBy === "rating") {
            list = [...list].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
        }

        return list;
    }, [properties, appliedKeyword, applied, sortBy]);

    const activeCount =
        (applied.maxPrice < 2000000 ? 1 : 0) +
        (applied.type !== "all" ? 1 : 0) +
        applied.facilities.length;

    const sidebar = (
        <FilterSidebar
            filters={filters}
            setFilters={setFilters}
            keyword={keyword}
            setKeyword={setKeyword}
            onApply={handleApply}
            onReset={handleReset}
        />
    );

    return (
        <div className="min-h-screen bg-background dark:bg-dark-bg px-[5%] lg:px-[8%] py-6 transition-colors duration-300">
            {/* TOP BAR */}
            <div className="sticky top-0 z-20 bg-background/95 dark:bg-dark-bg/95 backdrop-blur-md pb-3 pt-1">
                <SearchBar
                    keyword={keyword}
                    setKeyword={setKeyword}
                    onSearch={handleSearch}
                />

                <div className="flex items-center justify-between mt-3 lg:hidden">
                    <p className="text-xs text-kost-muted dark:text-mint-100/50">
                        {isLoading ? (
                            <span className="flex items-center gap-1 text-mint-300">
                                <Loader2 className="w-3 h-3 animate-spin" />
                                Mencari...
                            </span>
                        ) : (
                            <>
                                <strong className="text-kost-dark dark:text-mint-50">
                                    {filtered.length}
                                </strong>{" "}
                                kos
                            </>
                        )}
                    </p>

                    <div className="flex items-center gap-2">
                        <SortDropdown value={sortBy} onChange={setSortBy} />

                        <button
                            onClick={() => setShowFilter(true)}
                            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-dark-card border border-mint-200 dark:border-dark-border/20 text-kost-dark dark:text-mint-50 hover:border-mint-300 transition"
                        >
                            <SlidersHorizontal className="w-3.5 h-3.5 text-mint-300" />
                            Filter

                            {activeCount > 0 && (
                                <span className="w-4 h-4 rounded-full text-[10px] flex items-center justify-center bg-mint-300 text-white font-bold">
                                    {activeCount}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            <MobileFilterDrawer
                open={showFilter}
                onClose={() => setShowFilter(false)}
            >
                {sidebar}
            </MobileFilterDrawer>

            <div className="flex gap-5 mt-4">
                <aside className="hidden lg:block w-[256px] flex-shrink-0">
                    {sidebar}
                </aside>

                <main className="flex-1 min-w-0">
                    <ResultHeader
                        count={filtered.length}
                        keyword={appliedKeyword}
                        sortBy={sortBy}
                        setSortBy={setSortBy}
                        isLoading={isLoading}
                    />

                    <FilterChips
                        applied={applied}
                        onRemoveType={() => patchApplied({ type: "all" })}
                        onRemovePrice={() =>
                            patchApplied({ maxPrice: 2000000 })
                        }
                        onRemoveFacility={(facility) =>
                            patchApplied({
                                facilities: applied.facilities.filter(
                                    (item) => item !== facility
                                ),
                            })
                        }
                        onClearAll={handleReset}
                    />

                    {isLoading ? (
                        <div className="space-y-3">
                            {[...Array(4)].map((_, index) => (
                                <SkeletonCard key={index} />
                            ))}
                        </div>
                    ) : filtered.length > 0 ? (
                        <div className="space-y-3">
                            {filtered.map((kos) => (
                                <KosCard key={kos.id} kos={kos} />
                            ))}
                        </div>
                    ) : (
                        <EmptyState
                            onReset={handleReset}
                            keyword={appliedKeyword}
                        />
                    )}
                </main>

                <aside className="hidden lg:block w-[32%] flex-shrink-0 h-[680px] sticky top-24">
                    <MapView />
                </aside>
            </div>
        </div>
    );
}