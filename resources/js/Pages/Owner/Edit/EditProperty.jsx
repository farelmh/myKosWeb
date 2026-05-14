import OwnerLayout from "@/Layouts/OwnerLayout";
import { Head, useForm, router } from "@inertiajs/react";
import GoogleTileLayer from "@/Components/Map/GoogleTileLayer";
import {
    Save,
    MapPin,
    FileText,
    Image as ImageIcon,
    LoaderCircle,
    Sparkles,
    Trash2,
    ArrowLeft,
} from "lucide-react";
import { MapContainer } from "react-leaflet";
import { LocationMarker } from "@/Components/Map/LocationMarker";
import { useEffect, useState } from "react";

/* ================= SECTION CARD ================= */
const SectionCard = ({ icon: Icon, title, children }) => (
    <div className="
        rounded-2xl p-6
        bg-white        dark:bg-dark-card
        border
        border-mint-200 dark:border-dark-border/20
        transition-colors duration-300
    ">
        <div className="flex items-center gap-3 mb-6">
            <div className="
                p-2.5 rounded-xl
                bg-mint-100      dark:bg-mint-200/10
                border border-mint-200 dark:border-mint-300/20
                text-mint-300    dark:text-mint-200
            ">
                <Icon size={18} />
            </div>
            <h2 className="text-sm font-medium text-kost-dark dark:text-mint-50">
                {title}
            </h2>
        </div>
        {children}
    </div>
);

/* ================= INPUT CLASS ================= */
const inputClass = (error) => `
    w-full px-4 py-3 rounded-xl text-sm outline-none transition resize-none
    bg-mint-50       dark:bg-dark-bg
    border
    ${error
        ? "border-red-300 dark:border-red-500/40 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-500/20"
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
export default function EditProperty({ property }) {

    const { data, setData, post, processing, errors } = useForm({
        _method:     "put",
        name:        property.name        || "",
        address:     property.address     || "",
        city:        property.city        || "",
        description: property.description || "",
        rules:       property.rules       || "",
        latitude:    property.latitude    || "",
        longitude:   property.longitude   || "",
        images:      [],
    });

    const [previewImages, setPreviewImages] = useState([]);
    const [position, setPosition] = useState(
        property.latitude && property.longitude
            ? { lat: property.latitude, lng: property.longitude }
            : null
    );

    useEffect(() => {
        if (position) {
            setData((prev) => ({
                ...prev,
                latitude:  position.lat,
                longitude: position.lng,
            }));
        }
    }, [position]);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setData("images", [...data.images, ...files]);
        const newPreviews = files.map((file) => ({
            url:  URL.createObjectURL(file),
            name: file.name,
        }));
        setPreviewImages((prev) => [...prev, ...newPreviews]);
        e.target.value = null;
    };

    const removePreview = (index) => {
        setPreviewImages((prev) => prev.filter((_, i) => i !== index));
        setData("images", data.images.filter((_, i) => i !== index));
    };

    const removeImageFromDB = (id) => {
        if (confirm("Hapus foto ini secara permanen?")) {
            router.delete(route("owner.propertyImage.delete", id), {
                preserveScroll: true,
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("owner.property.update", property.id), {
            forceFormData: true,
            onSuccess: () => setPreviewImages([]),
        });
    };

    return (
        <OwnerLayout>
            <Head title={`Edit ${property.name}`} />

            <div className="max-w-4xl mx-auto space-y-6 pb-20">

                <div className="
                    rounded-2xl p-6
                    bg-white        dark:bg-dark-card
                    border
                    border-mint-200 dark:border-dark-border/20
                    transition-colors duration-300
                ">
                    {/* Back button */}
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

                    <div className="
                        inline-flex items-center gap-1.5
                        px-3 py-1 rounded-full text-xs font-medium mb-3
                        bg-mint-100      dark:bg-mint-200/10
                        border border-mint-200 dark:border-mint-300/20
                        text-kost-dark   dark:text-mint-100
                    ">
                        <Sparkles size={12} />
                        Edit Info Kos
                    </div>

                    <h1 className="text-lg font-medium text-kost-dark dark:text-mint-50">
                        {property.name}
                    </h1>
                    <p className="text-sm text-kost-muted dark:text-mint-100/40 mt-1">
                        Pastikan informasi kos Anda selalu diperbarui.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">

                    <SectionCard icon={FileText} title="Informasi Dasar">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                            <div className="space-y-1.5">
                                <LabelText>Nama Kos</LabelText>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData("name", e.target.value)}
                                    className={inputClass(errors.name)}
                                    placeholder="Contoh: Kos Melati"
                                />
                                {errors.name && <p className="text-xs text-red-400">{errors.name}</p>}
                            </div>

                            <div className="space-y-1.5">
                                <LabelText>Kota</LabelText>
                                <input
                                    type="text"
                                    value={data.city}
                                    onChange={(e) => setData("city", e.target.value)}
                                    className={inputClass(errors.city)}
                                    placeholder="Jember"
                                />
                                {errors.city && <p className="text-xs text-red-400">{errors.city}</p>}
                            </div>

                            <div className="md:col-span-2 space-y-1.5">
                                <LabelText>Alamat Lengkap</LabelText>
                                <textarea
                                    rows={2}
                                    value={data.address}
                                    onChange={(e) => setData("address", e.target.value)}
                                    className={inputClass(errors.address)}
                                    placeholder="Jl. Mawar No. 10, Sumbersari"
                                />
                                {errors.address && <p className="text-xs text-red-400">{errors.address}</p>}
                            </div>

                            <div className="md:col-span-2 space-y-1.5">
                                <LabelText>Deskripsi</LabelText>
                                <textarea
                                    rows={4}
                                    value={data.description}
                                    onChange={(e) => setData("description", e.target.value)}
                                    className={inputClass(errors.description)}
                                    placeholder="Ceritakan tentang kos Anda..."
                                />
                                {errors.description && <p className="text-xs text-red-400">{errors.description}</p>}
                            </div>

                            <div className="md:col-span-2 space-y-1.5">
                                <LabelText>Peraturan</LabelText>
                                <textarea
                                    rows={4}
                                    value={data.rules}
                                    onChange={(e) => setData("rules", e.target.value)}
                                    className={inputClass(errors.rules)}
                                    placeholder="Contoh: Tidak boleh merokok..."
                                />
                                {errors.rules && <p className="text-xs text-red-400">{errors.rules}</p>}
                            </div>
                        </div>
                    </SectionCard>

                    <SectionCard icon={MapPin} title="Lokasi Kos">
                        {position && (
                            <span className="
                                inline-block mb-4 px-3 py-1 rounded-full text-xs font-mono
                                bg-mint-100 dark:bg-mint-200/10
                                text-kost-dark dark:text-mint-100
                                border border-mint-200 dark:border-mint-300/20
                            ">
                                {Number(position.lat).toFixed(5)}, {Number(position.lng).toFixed(5)}
                            </span>
                        )}
                        <div className="h-[380px] rounded-xl overflow-hidden border border-mint-200 dark:border-dark-border/20">
                            <MapContainer
                                center={position ? [position.lat, position.lng] : [-8.1724, 113.7005]}
                                zoom={15}
                                style={{ height: "100%" }}
                            >
                                <GoogleTileLayer />
                                <LocationMarker position={position} setPosition={setPosition} />
                            </MapContainer>
                        </div>
                    </SectionCard>

                    <SectionCard icon={ImageIcon} title="Galeri Foto">

                        {/* Foto dari database */}
                        {property.images?.length > 0 && (
                            <div className="mb-6">
                                <p className="text-xs font-medium text-kost-muted dark:text-mint-100/40 mb-3">
                                    Foto saat ini
                                </p>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    {property.images.map((image) => (
                                        <div
                                            key={image.id}
                                            className="
                                                relative aspect-video rounded-xl overflow-hidden
                                                border border-mint-200 dark:border-dark-border/20
                                                group
                                            "
                                        >
                                            <img
                                                src={`/storage/${image.image_path}`}
                                                className="w-full h-full object-cover group-hover:opacity-70 transition"
                                            />
                                            <div className="
                                                absolute inset-0 flex items-center justify-center
                                                opacity-0 group-hover:opacity-100 transition
                                            ">
                                                <button
                                                    type="button"
                                                    onClick={() => removeImageFromDB(image.id)}
                                                    className="p-2 rounded-full bg-red-500 text-white hover:scale-110 transition"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                            <div className="
                                                absolute top-2 left-2
                                                px-2 py-0.5 rounded text-[10px] font-medium
                                                bg-mint-200/80 dark:bg-mint-200/20
                                                text-kost-dark dark:text-mint-50
                                            ">
                                                Tersimpan
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Upload foto baru */}
                        <div className="space-y-4">
                            <p className="text-xs font-medium text-kost-muted dark:text-mint-100/40">
                                Tambah foto baru
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
                                    Klik untuk memilih foto tambahan
                                </span>
                            </label>

                            {/* Preview foto baru */}
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
                            : <><Save className="w-4 h-4" /> Simpan Perubahan</>
                        }
                    </button>
                </form>
            </div>
        </OwnerLayout>
    );
}