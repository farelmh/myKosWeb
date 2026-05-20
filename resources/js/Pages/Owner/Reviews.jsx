import OwnerLayout from "@/Layouts/OwnerLayout";
import { Head, router, usePage } from "@inertiajs/react";
import { Star, Search, MessageSquare, X } from "lucide-react";
import { useState } from "react";
import Pagination from "@/Components/Pagination";

const StarDisplay = ({ rating, size = "sm" }) => {
    const s = size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4";
    return (
        <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((i) => (
                <Star
                    key={i}
                    className={`${s} ${
                        i <= rating
                            ? "fill-yellow-400 stroke-yellow-400"
                            : "stroke-gray-300 dark:stroke-mint-100/20"
                    }`}
                />
            ))}
        </div>
    );
};

const RatingBar = ({ label, count, total }) => {
    const pct = total > 0 ? Math.round((count / total) * 100) : 0;
    return (
        <div className="flex items-center gap-3">
            <span className="text-xs text-kost-muted dark:text-mint-100/50 w-4 text-right">
                {label}
            </span>
            <Star className="w-3 h-3 fill-yellow-400 stroke-yellow-400 flex-shrink-0" />
            <div className="flex-1 h-1.5 rounded-full bg-mint-100 dark:bg-dark-bg overflow-hidden">
                <div
                    className="h-full rounded-full bg-yellow-400 transition-all duration-500"
                    style={{ width: `${pct}%` }}
                />
            </div>
            <span className="text-xs text-kost-muted dark:text-mint-100/40 w-6">
                {count}
            </span>
        </div>
    );
};

const ReviewCard = ({ review }) => (
    <div className="
        rounded-xl p-4
        bg-white        dark:bg-dark-card
        border border-mint-200 dark:border-dark-border/20
        space-y-3 transition-colors duration-300
    ">
        <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
                <div className="
                    w-9 h-9 rounded-full flex-shrink-0
                    flex items-center justify-center
                    text-sm font-medium capitalize
                    bg-mint-200 dark:bg-mint-200/20
                    text-kost-dark dark:text-mint-50
                ">
                    {review.user?.name?.charAt(0) ?? "?"}
                </div>
                <div>
                    <p className="text-sm font-medium text-kost-dark dark:text-mint-50 capitalize">
                        {review.user?.name ?? "Anonim"}
                    </p>
                    <p className="text-xs text-kost-muted dark:text-mint-100/40">
                        {review.property?.name ?? "-"}
                    </p>
                </div>
            </div>

            <div className="flex flex-col items-end gap-1 flex-shrink-0">
                <StarDisplay rating={review.rating} />
                <p className="text-[10px] text-kost-muted dark:text-mint-100/30">
                    {new Date(review.created_at).toLocaleDateString("id-ID", {
                        day:   "numeric",
                        month: "long",
                        year:  "numeric",
                    })}
                </p>
            </div>
        </div>

        {review.comment && (
            <p className="text-sm text-kost-muted dark:text-mint-100/60 leading-relaxed border-t border-mint-200 dark:border-dark-border/20 pt-3">
                "{review.comment}"
            </p>
        )}
    </div>
);

export default function Reviews({ reviews, stats, filters }) {
    const [search, setSearch] = useState(filters?.search || "");
    const [rating, setRating] = useState(filters?.rating || "");

    const handleFilter = (newFilters) => {
        router.get(route("owner.reviews"), newFilters, {
            preserveState:  true,
            replace:        true,
            preserveScroll: true,
        });
    };

    const handleSearch = (val) => {
        setSearch(val);
        handleFilter({ search: val, rating });
    };

    const handleRating = (val) => {
        const newRating = rating === val ? "" : val;
        setRating(newRating);
        handleFilter({ search, rating: newRating });
    };

    const handleReset = () => {
        setSearch("");
        setRating("");
        handleFilter({});
    };

    const activeFilter = search || rating;

    return (
        <OwnerLayout>
            <Head title="Ulasan" />

            <div className="max-w-5xl mx-auto space-y-6">

                <div className="
                    rounded-2xl p-6
                    bg-white        dark:bg-dark-card
                    border border-mint-200 dark:border-dark-border/20
                    transition-colors duration-300
                ">
                    <h1 className="text-lg font-medium text-kost-dark dark:text-mint-50">
                        Ulasan Kos
                    </h1>
                    <p className="text-sm text-kost-muted dark:text-mint-100/40 mt-1">
                        Semua ulasan dari penghuni kos Anda
                    </p>
                </div>

                {stats?.total > 0 && (
                    <div className="
                        rounded-2xl p-6
                        bg-white        dark:bg-dark-card
                        border border-mint-200 dark:border-dark-border/20
                        transition-colors duration-300
                    ">
                        <div className="flex flex-col sm:flex-row gap-6">
                            <div className="flex flex-col items-center justify-center text-center sm:w-40 flex-shrink-0">
                                <p className="text-4xl font-medium text-kost-dark dark:text-mint-50">
                                    {stats.average}
                                </p>
                                <StarDisplay rating={Math.round(stats.average)} size="md" />
                                <p className="text-xs text-kost-muted dark:text-mint-100/40 mt-1">
                                    {stats.total} ulasan
                                </p>
                            </div>

                            <div className="flex-1 space-y-2 justify-center flex flex-col">
                                {[
                                    { label: "5", count: stats.five   },
                                    { label: "4", count: stats.four   },
                                    { label: "3", count: stats.three  },
                                    { label: "2", count: stats.two    },
                                    { label: "1", count: stats.one    },
                                ].map((r) => (
                                    <RatingBar
                                        key={r.label}
                                        label={r.label}
                                        count={r.count}
                                        total={stats.total}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex flex-wrap items-center gap-3">
                    <div className="relative flex-1 min-w-[200px]">
                        <Search className="absolute left-3 top-2.5 w-4 h-4 text-kost-muted dark:text-mint-100/40" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => handleSearch(e.target.value)}
                            placeholder="Cari nama, kos, atau komentar..."
                            className="
                                w-full pl-9 pr-4 py-2 rounded-xl text-sm outline-none transition
                                bg-white        dark:bg-dark-card
                                border border-mint-200 dark:border-dark-border/20
                                text-kost-dark  dark:text-mint-50
                                placeholder-kost-muted dark:placeholder-mint-100/30
                                focus:ring-2 focus:ring-mint-200 dark:focus:ring-mint-300/30
                            "
                        />
                    </div>

                    <div className="flex items-center gap-1.5">
                        {[5, 4, 3, 2, 1].map((r) => (
                            <button
                                key={r}
                                onClick={() => handleRating(String(r))}
                                className={`
                                    flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs transition border
                                    ${rating === String(r)
                                        ? "bg-yellow-50 dark:bg-yellow-500/10 border-yellow-300 dark:border-yellow-500/30 text-yellow-700 dark:text-yellow-400"
                                        : "bg-white dark:bg-dark-card border-mint-200 dark:border-dark-border/20 text-kost-muted dark:text-mint-100/50 hover:bg-mint-50 dark:hover:bg-dark-bg"
                                    }
                                `}
                            >
                                <Star className={`w-3 h-3 ${rating === String(r) ? "fill-yellow-400 stroke-yellow-400" : ""}`} />
                                {r}
                            </button>
                        ))}
                    </div>

                    {activeFilter && (
                        <button
                            onClick={handleReset}
                            className="
                                flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition
                                text-red-400 hover:text-red-500
                                bg-red-50 dark:bg-red-500/10
                                border border-red-200 dark:border-red-500/20
                            "
                        >
                            <X className="w-3 h-3" />
                            Reset
                        </button>
                    )}
                </div>

                {reviews.data.length > 0 ? (
                    <div className="space-y-3">
                        {reviews.data.map((review) => (
                            <ReviewCard key={review.id} review={review} />
                        ))}
                        <Pagination links={reviews.links} />
                    </div>
                ) : (
                    <div className="
                        flex flex-col items-center justify-center py-16 gap-3
                        rounded-2xl border border-dashed
                        border-mint-200 dark:border-dark-border/20
                        bg-white dark:bg-dark-card
                    ">
                        <MessageSquare className="w-10 h-10 text-mint-200 dark:text-mint-200/30" />
                        <p className="text-sm font-medium text-kost-dark dark:text-mint-50">
                            Belum ada ulasan
                        </p>
                        <p className="text-xs text-kost-muted dark:text-mint-100/40">
                            {activeFilter ? "Tidak ada hasil untuk filter ini" : "Ulasan dari penghuni akan muncul di sini"}
                        </p>
                    </div>
                )}
            </div>
        </OwnerLayout>
    );
}