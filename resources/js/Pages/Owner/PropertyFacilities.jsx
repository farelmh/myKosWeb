import OwnerLayout from "@/Layouts/OwnerLayout";
import { Head, useForm } from "@inertiajs/react";
import {
    Plus,
    Check,
    Sparkles,
    LoaderCircle,
    X,
    ArrowLeft,
} from "lucide-react";

/* ================= SECTION CARD ================= */
const SectionCard = ({ title, subtitle, children }) => (
    <div className="
        rounded-2xl p-6
        bg-white        dark:bg-dark-card
        border
        border-mint-200 dark:border-dark-border/20
        transition-colors duration-300
    ">
        <div className="mb-5">
            <h2 className="text-sm font-medium text-kost-dark dark:text-mint-50">
                {title}
            </h2>
            {subtitle && (
                <p className="text-xs text-kost-muted dark:text-mint-100/40 mt-0.5">
                    {subtitle}
                </p>
            )}
        </div>
        {children}
    </div>
);

/* ================= MAIN ================= */
export default function PropertyFacilities({
    property,
    facilities,
    selectedFacilities = [],
}) {
    const { data, setData, post, processing, errors } = useForm({
        facilities:        selectedFacilities.map((f) => f.id),
        custom_facility:   "",
        custom_facilities: [],
    });

    const toggleFacility = (id) => {
        setData(
            "facilities",
            data.facilities.includes(id)
                ? data.facilities.filter((item) => item !== id)
                : [...data.facilities, id]
        );
    };

    const addCustomFacility = () => {
        if (!data.custom_facility.trim()) return;
        setData("custom_facilities", [
            ...data.custom_facilities,
            data.custom_facility.trim(),
        ]);
        setData("custom_facility", "");
    };

    const removeCustomFacility = (index) => {
        setData(
            "custom_facilities",
            data.custom_facilities.filter((_, i) => i !== index)
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("owner.property.facilities.store", property.id));
    };

    return (
        <OwnerLayout>
            <Head title="Fasilitas Kos" />

            <div className="max-w-4xl mx-auto space-y-6 pb-20">

                <div className="
                    rounded-2xl p-6
                    bg-white        dark:bg-dark-card
                    border
                    border-mint-200 dark:border-dark-border/20
                    transition-colors duration-300
                ">

                    <div className="
                        inline-flex items-center gap-1.5
                        px-3 py-1 rounded-full text-xs font-medium mb-3
                        bg-mint-100      dark:bg-mint-200/10
                        border border-mint-200 dark:border-mint-300/20
                        text-kost-dark   dark:text-mint-100
                    ">
                        <Sparkles size={12} />
                        Fasilitas Properti
                    </div>

                    <h1 className="text-lg font-medium text-kost-dark dark:text-mint-50">
                        {property.name}
                    </h1>
                    <p className="text-sm text-kost-muted dark:text-mint-100/40 mt-1">
                        Pilih fasilitas yang tersedia di kos Anda.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">

                    <SectionCard title="Pilih Fasilitas">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {facilities.map((facility) => {
                                const active = data.facilities.includes(facility.id);

                                return (
                                    <button
                                        type="button"
                                        key={facility.id}
                                        onClick={() => toggleFacility(facility.id)}
                                        className={`
                                            relative p-4 rounded-xl text-left
                                            border transition text-sm
                                            ${active
                                                ? "bg-mint-200      dark:bg-mint-200/20 border-mint-200 dark:border-mint-300/30 text-kost-dark dark:text-mint-50"
                                                : "bg-mint-50       dark:bg-dark-bg    border-mint-200 dark:border-dark-border/20 text-kost-muted dark:text-mint-100/50 hover:bg-mint-100 dark:hover:bg-dark-card"
                                            }
                                        `}
                                    >
                                        <span className="font-medium">
                                            {facility.name}
                                        </span>

                                        {/* Check indicator */}
                                        {active && (
                                            <div className="
                                                absolute top-2 right-2
                                                w-5 h-5 rounded-full
                                                flex items-center justify-center
                                                bg-mint-300 dark:bg-mint-300/60
                                            ">
                                                <Check className="w-3 h-3 text-white" />
                                            </div>
                                        )}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Counter */}
                        {data.facilities.length > 0 && (
                            <p className="text-xs text-kost-muted dark:text-mint-100/40 mt-4">
                                {data.facilities.length} fasilitas dipilih
                            </p>
                        )}
                    </SectionCard>

                    <SectionCard
                        title="Tambah Fasilitas Lain"
                        subtitle="Tambahkan fasilitas custom jika belum tersedia."
                    >
                        {/* Input */}
                        <div className="flex gap-3">
                            <input
                                type="text"
                                value={data.custom_facility}
                                onChange={(e) => setData("custom_facility", e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addCustomFacility())}
                                placeholder="Contoh: Rooftop"
                                className="
                                    flex-1 px-4 py-2.5 rounded-xl text-sm outline-none transition
                                    bg-mint-50       dark:bg-dark-bg
                                    border
                                    border-mint-200  dark:border-dark-border/20
                                    text-kost-dark   dark:text-mint-50
                                    placeholder-kost-muted dark:placeholder-mint-100/30
                                    focus:ring-2
                                    focus:ring-mint-200 dark:focus:ring-mint-300/30
                                "
                            />
                            <button
                                type="button"
                                onClick={addCustomFacility}
                                className="
                                    px-4 py-2.5 rounded-xl transition
                                    bg-mint-200      dark:bg-mint-200/20
                                    border border-mint-200 dark:border-mint-300/20
                                    text-kost-dark   dark:text-mint-50
                                    hover:bg-mint-300 dark:hover:bg-mint-300/30
                                "
                            >
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Custom list */}
                        {data.custom_facilities.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-4">
                                {data.custom_facilities.map((facility, index) => (
                                    <div
                                        key={index}
                                        className="
                                            flex items-center gap-1.5
                                            px-3 py-1.5 rounded-lg text-sm
                                            bg-mint-100      dark:bg-mint-200/10
                                            border border-mint-200 dark:border-mint-300/20
                                            text-kost-dark   dark:text-mint-100
                                        "
                                    >
                                        <span>{facility}</span>
                                        <button
                                            type="button"
                                            onClick={() => removeCustomFacility(index)}
                                            className="
                                                text-kost-muted dark:text-mint-100/40
                                                hover:text-red-400 transition
                                            "
                                        >
                                            <X size={12} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        {errors.facilities && (
                            <p className="text-xs text-red-400 mt-3">
                                {errors.facilities}
                            </p>
                        )}
                    </SectionCard>

                    <button
                        type="submit"
                        disabled={processing}
                        className="
                            w-full flex items-center justify-center gap-2
                            px-6 py-3 rounded-xl text-sm font-medium transition
                            bg-mint-200      dark:bg-mint-200/20
                            border border-mint-200 dark:border-mint-300/20
                            text-kost-dark   dark:text-mint-50
                            hover:bg-mint-300 dark:hover:bg-mint-300/30
                            disabled:opacity-50 disabled:cursor-not-allowed
                        "
                    >
                        {processing
                            ? <><LoaderCircle className="w-4 h-4 animate-spin" /> Menyimpan...</>
                            : <><Check className="w-4 h-4" /> Simpan Fasilitas</>
                        }
                    </button>
                </form>
            </div>
        </OwnerLayout>
    );
}