import { ChevronDown, Plus, Home } from "lucide-react";
import { useState, useEffect } from "react";
import { router, usePage } from "@inertiajs/react";

export default function PropertySwitcher({ properties }) {

    const [open, setOpen] = useState(false);
    const { auth } = usePage().props;

    const storageKey = `selectedProperty_${auth.user.id}`;

    const [selectedPropertyId, setSelectedPropertyId] = useState(() => {
        const saved = localStorage.getItem(storageKey);
        return saved ? Number(saved) : properties?.[0]?.id;
    });

    const currentProperty = properties?.find(
        (p) => p.id === selectedPropertyId
    );

    const handleSelect = (property) => {
        setSelectedPropertyId(property.id);
        setOpen(false);

        router.get('/owner/dashboard');

    };

    const handleAddProperty = () => {
        router.get('/form-pengajuan');
    }

    // Simpan ke localStorage
    useEffect(() => {
        if (selectedPropertyId) {
            localStorage.setItem(storageKey, selectedPropertyId);
        }
    }, [selectedPropertyId]);

    // Fallback jika property tidak ditemukan
    useEffect(() => {
        const exists = properties?.some((p) => p.id === selectedPropertyId);
        if (!exists && properties?.length > 0) {
            setSelectedPropertyId(properties[0].id);
        }
    }, [properties]);

    return (
        <div className="relative">

            {/* ── TRIGGER ───────────────────────────────── */}
            <button
                onClick={() => setOpen(!open)}
                className="
                    w-full flex items-center justify-between gap-2
                    px-3 py-2 rounded-xl transition
                    bg-mint-50       dark:bg-dark-bg
                    border
                    border-mint-200  dark:border-dark-border/20
                    hover:bg-mint-100 dark:hover:bg-dark-card
                "
            >
                <div className="flex items-center gap-2.5 overflow-hidden">

                    {/* Avatar */}
                    <div className="
                        w-8 h-8 rounded-lg flex-shrink-0
                        flex items-center justify-center
                        text-sm font-medium
                        bg-mint-200      dark:bg-mint-200/20
                        text-kost-dark   dark:text-mint-50
                    ">
                        {currentProperty?.name?.charAt(0) ?? <Home size={14} />}
                    </div>

                    <div className="text-left overflow-hidden">
                        <p className="text-[10px] font-medium text-kost-muted dark:text-mint-100/40">
                            Properti aktif
                        </p>
                        <h3 className="text-xs font-medium text-kost-dark dark:text-mint-50 truncate -mt-0.5">
                            {currentProperty?.name || "Pilih properti"}
                        </h3>
                    </div>
                </div>

                <ChevronDown
                    size={14}
                    className={`
                        flex-shrink-0 transition-transform duration-300
                        text-kost-muted dark:text-mint-100/40
                        ${open ? "rotate-180" : ""}
                    `}
                />
            </button>

            {open && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setOpen(false)}
                    />

                    <div className="
                        absolute top-full left-0 mt-2 w-full z-50
                        rounded-xl overflow-hidden
                        bg-white        dark:bg-dark-card
                        border
                        border-mint-200 dark:border-dark-border/20
                        shadow-sm
                    ">
                        {/* Property list */}
                        <div className="p-1.5 space-y-0.5">
                            {properties?.map((property) => {
                                const isSelected = selectedPropertyId === property.id;

                                return (
                                    <button
                                        key={property.id}
                                        onClick={() => handleSelect(property)}
                                        className={`
                                            w-full flex items-center gap-2.5
                                            p-2 rounded-lg transition text-left
                                            ${isSelected
                                                ? "bg-mint-200 dark:bg-mint-200/20 border border-mint-200 dark:border-mint-300/20"
                                                : "hover:bg-mint-50 dark:hover:bg-dark-bg border border-transparent"
                                            }
                                        `}
                                    >
                                        {/* Avatar */}
                                        <div className={`
                                            w-7 h-7 rounded-lg flex-shrink-0
                                            flex items-center justify-center
                                            text-xs font-medium
                                            ${isSelected
                                                ? "bg-white/60 dark:bg-mint-200/20 text-kost-dark dark:text-mint-50"
                                                : "bg-mint-100 dark:bg-dark-bg text-kost-muted dark:text-mint-100/50"
                                            }
                                        `}>
                                            {property.name.charAt(0)}
                                        </div>

                                        <div className="overflow-hidden">
                                            <h4 className={`
                                                text-xs font-medium truncate
                                                ${isSelected
                                                    ? "text-kost-dark dark:text-mint-50"
                                                    : "text-kost-dark dark:text-mint-100/70"
                                                }
                                            `}>
                                                {property.name}
                                            </h4>
                                            <p className="text-[10px] text-kost-muted dark:text-mint-100/30 truncate">
                                                {property.city}
                                            </p>
                                        </div>

                                        {isSelected && (
                                            <div className="ml-auto w-1.5 h-1.5 rounded-full bg-mint-300 flex-shrink-0" />
                                        )}
                                    </button>
                                );
                            })}
                        </div>

                    {/* Footer */}
                    <div className="border-t border-white/10 p-1.5">

                        <button
                            className="
                                w-full
                                flex
                                items-center
                                gap-2
                                p-2
                                rounded-lg
                                text-cyan-400
                                hover:bg-cyan-500/10
                                transition-all
                                duration-300
                            "
                            onClick={handleAddProperty}
                        >

                            <Plus size={14} />

                            <span className="text-xs font-medium">
                                Add Property
                            </span>

                        </button>

                    </div>

                    </div>
                </>
            )}
        </div>
    );
}