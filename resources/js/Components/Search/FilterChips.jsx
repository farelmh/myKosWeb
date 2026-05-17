import { fmt } from "@/utils/formatPrice";
import { X } from "lucide-react";

export default function FilterChips ({
        applied,
        onRemoveType,
        onRemovePrice,
        onRemoveFacility,
        onClearAll,
    }) {
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