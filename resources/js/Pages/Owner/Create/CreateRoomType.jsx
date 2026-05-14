import OwnerLayout from "@/Layouts/OwnerLayout";
import { useForm, usePage } from "@inertiajs/react";
import {
    Save,
    FileText,
    Image as ImageIcon,
    LoaderCircle,
    Plus,
    Check,
    Trash2,
    ArrowLeft,
    X,
} from "lucide-react";
import { useState } from "react";

/* ================= SECTION CARD ================= */
const SectionCard = ({ icon: Icon, title, subtitle, children }) => (
    <div className="
        rounded-2xl p-6
        bg-white        dark:bg-dark-card
        border
        border-mint-200 dark:border-dark-border/20
        transition-colors duration-300
    ">
        <div className="flex items-center gap-3 mb-6">
            {Icon && (
                <div className="
                    p-2.5 rounded-xl
                    bg-mint-100      dark:bg-mint-200/10
                    border border-mint-200 dark:border-mint-300/20
                    text-mint-300    dark:text-mint-200
                ">
                    <Icon size={18} />
                </div>
            )}
            <div>
                <h2 className="text-sm font-medium text-kost-dark dark:text-mint-50">
                    {title}
                </h2>
                {subtitle && (
                    <p className="text-xs text-kost-muted dark:text-mint-100/40 mt-0.5">
                        {subtitle}
                    </p>
                )}
            </div>
        </div>
        {children}
    </div>
);

/* ================= INPUT CLASS ================= */
const inputClass = (error) => `
    w-full px-4 py-3 rounded-xl text-sm outline-none transition
    bg-mint-50       dark:bg-dark-bg
    border
    ${error
        ? "border-red-300 dark:border-red-500/40 focus:ring-2 focus:ring-red-200"
        : "border-mint-200 dark:border-dark-border/20 focus:ring-2 focus:ring-mint-200 dark:focus:ring-mint-300/30"
    }
    text-kost-dark   dark:text-mint-50
    placeholder-kost-muted dark:placeholder-mint-100/30
`;

const LabelText = ({ children }) => (
    <label className="text-sm font-medium text-kost-dark dark:text-mint-100/70">
        {children}
    </label>
);

/* ================= MAIN ================= */
export default function CreateRoomType({ facilities }) {

    const { auth }    = usePage().props;
    const storageKey  = `selectedProperty_${auth.user.id}`;
    const propertyId  = Number(localStorage.getItem(storageKey));

    const { data, setData, post, processing, errors } = useForm({
        property_id:       propertyId,
        name:              "",
        room_width:        "",
        room_length:       "",
        price:             "",
        capacity:          "",
        total_rooms:       "",
        rental_type:       "",
        images:            [],
        facilities:        [],
        custom_facility:   "",
        custom_facilities: [],
    });

    const [previewImages, setPreviewImages] = useState([]);

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

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setData("images", [...data.images, ...files]);
        setPreviewImages((prev) => [
            ...prev,
            ...files.map((file) => ({
                url:  URL.createObjectURL(file),
                name: file.name,
            })),
        ]);
        e.target.value = null;
    };

    const removePreview = (index) => {
        setPreviewImages((prev) => prev.filter((_, i) => i !== index));
        setData("images", data.images.filter((_, i) => i !== index));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("owner.room-types.store"), {
            forceFormData: true,
            onSuccess: () => setPreviewImages([]),
        });
    };

    return (
        <OwnerLayout>
            <div className="max-w-4xl mx-auto space-y-6 pb-20">

                <div className="
                    rounded-2xl p-6
                    bg-white        dark:bg-dark-card
                    border
                    border-mint-200 dark:border-dark-border/20
                    transition-colors duration-300
                ">
                    <button
                        type="button"
                        onClick={() => window.history.back()}
                        className="
                            flex items-center gap-2 mb-4 text-sm transition
                            text-kost-muted dark:text-mint-100/50
                            hover:text-kost-dark dark:hover:text-mint-50
                        "
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Kembali
                    </button>

                    <h1 className="text-lg font-medium text-kost-dark dark:text-mint-50">
                        Tambah Tipe Kamar
                    </h1>
                    <p className="text-sm text-kost-muted dark:text-mint-100/40 mt-1">
                        Lengkapi informasi tipe kamar baru.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">

                    <SectionCard
                        icon={FileText}
                        title="Informasi Dasar"
                        subtitle="Lengkapi informasi tipe kamar kos."
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                            {/* NAMA */}
                            <div className="space-y-1.5">
                                <LabelText>Nama Tipe Kamar</LabelText>
                                <input
                                    type="text"
                                    placeholder="Reguler"
                                    value={data.name}
                                    onChange={(e) => setData("name", e.target.value)}
                                    className={inputClass(errors.name)}
                                />
                                {errors.name && <p className="text-xs text-red-400">{errors.name}</p>}
                            </div>

                            {/* UKURAN */}
                            <div className="space-y-1.5">
                                <LabelText>Ukuran Kamar (Meter)</LabelText>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="number"
                                        placeholder="4"
                                        value={data.room_width}
                                        onChange={(e) => setData("room_width", e.target.value)}
                                        className={inputClass(errors.room_width)}
                                    />
                                    <span className="text-kost-muted dark:text-mint-100/40">×</span>
                                    <input
                                        type="number"
                                        placeholder="4"
                                        value={data.room_length}
                                        onChange={(e) => setData("room_length", e.target.value)}
                                        className={inputClass(errors.room_length)}
                                    />
                                </div>
                                {(errors.room_width || errors.room_length) && (
                                    <p className="text-xs text-red-400">
                                        {errors.room_width || errors.room_length}
                                    </p>
                                )}
                            </div>

                            {/* HARGA */}
                            <div className="space-y-1.5">
                                <LabelText>Harga Sewa</LabelText>
                                <input
                                    type="number"
                                    placeholder="500000"
                                    value={data.price}
                                    onChange={(e) => setData("price", e.target.value)}
                                    className={inputClass(errors.price)}
                                />
                                {errors.price && <p className="text-xs text-red-400">{errors.price}</p>}
                            </div>

                            {/* KAPASITAS */}
                            <div className="space-y-1.5">
                                <LabelText>Kapasitas Orang</LabelText>
                                <input
                                    type="number"
                                    placeholder="1"
                                    value={data.capacity}
                                    onChange={(e) => setData("capacity", e.target.value)}
                                    className={inputClass(errors.capacity)}
                                />
                                {errors.capacity && <p className="text-xs text-red-400">{errors.capacity}</p>}
                            </div>

                            {/* TOTAL KAMAR */}
                            <div className="space-y-1.5">
                                <LabelText>Total Kamar</LabelText>
                                <input
                                    type="number"
                                    placeholder="20"
                                    value={data.total_rooms}
                                    onChange={(e) => setData("total_rooms", e.target.value)}
                                    className={inputClass(errors.total_rooms)}
                                />
                                {errors.total_rooms && <p className="text-xs text-red-400">{errors.total_rooms}</p>}
                            </div>

                            {/* TIPE SEWA */}
                            <div className="space-y-1.5">
                                <LabelText>Tipe Sewa</LabelText>
                                <select
                                    value={data.rental_type}
                                    onChange={(e) => setData("rental_type", e.target.value)}
                                    className={inputClass(errors.rental_type)}
                                >
                                    <option value="" disabled>Pilih tipe sewa</option>
                                    <option value="monthly">Bulanan</option>
                                    <option value="daily">Harian</option>
                                </select>
                                {errors.rental_type && <p className="text-xs text-red-400">{errors.rental_type}</p>}
                            </div>
                        </div>
                    </SectionCard>

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
                                            relative p-4 rounded-xl text-left text-sm border transition
                                            ${active
                                                ? "bg-mint-200 dark:bg-mint-200/20 border-mint-200 dark:border-mint-300/30 text-kost-dark dark:text-mint-50"
                                                : "bg-mint-50 dark:bg-dark-bg border-mint-200 dark:border-dark-border/20 text-kost-muted dark:text-mint-100/50 hover:bg-mint-100 dark:hover:bg-dark-card"
                                            }
                                        `}
                                    >
                                        <span className="font-medium">{facility.name}</span>
                                        {active && (
                                            <div className="
                                                absolute top-2 right-2 w-5 h-5 rounded-full
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
                        <div className="flex gap-3">
                            <input
                                type="text"
                                value={data.custom_facility}
                                onChange={(e) => setData("custom_facility", e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addCustomFacility())}
                                placeholder="Contoh: Rooftop"
                                className={inputClass(false)}
                            />
                            <button
                                type="button"
                                onClick={addCustomFacility}
                                className="
                                    px-4 py-2.5 rounded-xl transition flex-shrink-0
                                    bg-mint-200      dark:bg-mint-200/20
                                    border border-mint-200 dark:border-mint-300/20
                                    text-kost-dark   dark:text-mint-50
                                    hover:bg-mint-300 dark:hover:bg-mint-300/30
                                "
                            >
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>

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
                                            className="text-kost-muted dark:text-mint-100/40 hover:text-red-400 transition"
                                        >
                                            <X size={12} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        {errors.facilities && (
                            <p className="text-xs text-red-400 mt-3">{errors.facilities}</p>
                        )}
                    </SectionCard>

                    <SectionCard icon={ImageIcon} title="Galeri Foto">
                        <div className="space-y-4">
                            <p className="text-xs font-medium text-kost-muted dark:text-mint-100/40">
                                Upload foto kamar
                            </p>

                            <input
                                type="file"
                                multiple
                                id="multi-upload"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                            <label
                                htmlFor="multi-upload"
                                className="
                                    flex flex-col items-center justify-center
                                    w-full h-28 rounded-xl cursor-pointer transition
                                    border border-dashed
                                    border-mint-200  dark:border-dark-border/30
                                    hover:bg-mint-50 dark:hover:bg-dark-bg
                                    hover:border-mint-300 dark:hover:border-mint-300/40
                                    group
                                "
                            >
                                <ImageIcon className="w-6 h-6 mb-2 text-mint-200 dark:text-mint-200/40 group-hover:text-mint-300 transition" />
                                <span className="text-sm text-kost-muted dark:text-mint-100/40">
                                    Klik untuk memilih foto
                                </span>
                            </label>

                            {/* Preview */}
                            {previewImages.length > 0 && (
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    {previewImages.map((image, index) => (
                                        <div
                                            key={index}
                                            className="
                                                relative aspect-video rounded-xl overflow-hidden
                                                border border-mint-300/40 dark:border-mint-300/20
                                                group
                                            "
                                        >
                                            <img
                                                src={image.url}
                                                className="w-full h-full object-cover group-hover:opacity-70 transition"
                                            />
                                            <div className="
                                                absolute inset-0 flex items-center justify-center
                                                opacity-0 group-hover:opacity-100 transition
                                            ">
                                                <button
                                                    type="button"
                                                    onClick={() => removePreview(index)}
                                                    className="p-2 rounded-full bg-red-500 text-white hover:scale-110 transition"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                            <div className="
                                                absolute top-2 left-2
                                                px-2 py-0.5 rounded text-[10px] font-medium
                                                bg-mint-300/80 dark:bg-mint-300/20
                                                text-kost-dark dark:text-mint-50
                                            ">
                                                Baru
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
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
                            : <><Save className="w-4 h-4" /> Simpan Tipe Kamar</>
                        }
                    </button>
                </form>
            </div>
        </OwnerLayout>
    );
}