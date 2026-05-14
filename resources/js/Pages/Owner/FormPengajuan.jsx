import { useForm } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { LocationMarker } from "@/Components/Map/LocationMarker";
import { Upload, X } from "lucide-react";

/* ================= FILE INPUT ================= */
const FileInput = ({ label, fileData, onChange, onRemove, error }) => (
    <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-kost-dark dark:text-mint-100/70">
            {label}
        </label>

        {!fileData ? (
            <label className="
                flex flex-col items-center gap-2
                border border-dashed rounded-xl p-6
                text-center cursor-pointer transition
                border-mint-200  dark:border-dark-border/30
                hover:bg-mint-50 dark:hover:bg-dark-bg
            ">
                <Upload className="w-5 h-5 text-kost-muted dark:text-mint-100/30" />
                <p className="text-sm text-kost-muted dark:text-mint-100/40">
                    Upload file
                </p>
                <input type="file" onChange={onChange} className="hidden" />
            </label>
        ) : (
            <div className="
                flex justify-between items-center gap-3
                p-3 rounded-xl
                bg-mint-50       dark:bg-dark-bg
                border
                border-mint-200  dark:border-dark-border/20
            ">
                <span className="text-sm truncate text-kost-dark dark:text-mint-50">
                    {fileData.name}
                </span>
                <button
                    type="button"
                    onClick={onRemove}
                    className="flex-shrink-0 text-red-400 hover:text-red-500 transition"
                >
                    <X size={14} />
                </button>
            </div>
        )}

        {error && <span className="text-xs text-red-400">{error}</span>}
    </div>
);

/* ================= INPUT FIELD ================= */
const inputClass = (error) => `
    w-full px-4 py-3 rounded-xl text-sm outline-none transition
    bg-mint-50       dark:bg-dark-bg
    border
    ${error
        ? "border-red-300 dark:border-red-500/40 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-500/20"
        : "border-mint-200 dark:border-dark-border/20 focus:ring-2 focus:ring-mint-200 dark:focus:ring-mint-300/30"
    }
    text-kost-dark   dark:text-mint-50
    placeholder-kost-muted dark:placeholder-mint-100/30
`;

const InputField = ({ label, value, onChange, error, placeholder }) => (
    <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-kost-dark dark:text-mint-100/70">
            {label}
        </label>
        <input
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={inputClass(error)}
        />
        {error && <span className="text-xs text-red-400">{error}</span>}
    </div>
);

/* ================= SECTION TITLE ================= */
const SectionTitle = ({ title, subtitle }) => (
    <div className="pb-3 border-b border-mint-200 dark:border-dark-border/20">
        <h3 className="text-sm font-medium text-kost-dark dark:text-mint-50">
            {title}
        </h3>
        {subtitle && (
            <p className="text-xs text-kost-muted dark:text-mint-100/40 mt-0.5">
                {subtitle}
            </p>
        )}
    </div>
);

/* ================= MAIN ================= */
export default function FormPengajuan() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name:           "",
        address:        "",
        city:           "",
        description:    "",
        rules:          "",  // ← fix: sebelumnya rules tidak ada di useForm
        latitude:       "",
        longitude:      "",
        image_kos:      null,
        image_ktp:      null,
        document_extra: null,
    });

    const [position, setPosition] = useState(null);

    useEffect(() => {
        if (position) {
            setData((prev) => ({
                ...prev,
                latitude:  position.lat,
                longitude: position.lng,
            }));
        }
    }, [position]);

    const submit = (e) => {
        e.preventDefault();
        post("/pengajuan-kos", {
            onSuccess: () => {
                reset();
                setPosition(null);
            },
            onError: (errs) => console.log(errs),
        });
    };

    return (
        <div className="
            min-h-screen py-10
            px-[6%] lg:px-[10%]
            bg-mint-50 dark:bg-dark-bg
            transition-colors duration-300
        ">
            <div className="max-w-4xl mx-auto">
                <div className="
                    rounded-2xl overflow-hidden
                    bg-white        dark:bg-dark-card
                    border
                    border-mint-200 dark:border-dark-border/20
                    shadow-sm
                ">
                    {/* HEADER */}
                    <div className="p-6 border-b border-mint-200 dark:border-dark-border/20">
                        <h2 className="text-base font-medium text-kost-dark dark:text-mint-50">
                            Pengajuan Kos Baru
                        </h2>
                        <p className="text-sm text-kost-muted dark:text-mint-100/40 mt-0.5">
                            Lengkapi data untuk mempublikasikan kos Anda
                        </p>
                    </div>

                    <form onSubmit={submit} className="p-6 flex flex-col gap-8">

                        {/* ── INFORMASI UMUM ──────────────────── */}
                        <div className="flex flex-col gap-5">
                            <SectionTitle title="Informasi Umum" />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <InputField
                                    label="Nama Kos"
                                    placeholder="Contoh: Kos Melati"
                                    value={data.name}
                                    onChange={(e) => setData("name", e.target.value)}
                                    error={errors.name}
                                />
                                <InputField
                                    label="Kota"
                                    placeholder="Jember"
                                    value={data.city}
                                    onChange={(e) => setData("city", e.target.value)}
                                    error={errors.city}
                                />
                                <div className="md:col-span-2">
                                    <InputField
                                        label="Alamat Lengkap"
                                        placeholder="Jl. Mawar No. 10, Sumbersari"
                                        value={data.address}
                                        onChange={(e) => setData("address", e.target.value)}
                                        error={errors.address}
                                    />
                                </div>

                                {/* DESKRIPSI */}
                                <div className="md:col-span-2 flex flex-col gap-1.5">
                                    <label className="text-sm font-medium text-kost-dark dark:text-mint-100/70">
                                        Deskripsi Kos
                                    </label>
                                    <textarea
                                        value={data.description}
                                        onChange={(e) => setData("description", e.target.value)}
                                        rows={3}
                                        placeholder="Ceritakan tentang kos Anda..."
                                        className={inputClass(errors.description)}
                                    />
                                    {errors.description && (
                                        <span className="text-xs text-red-400">{errors.description}</span>
                                    )}
                                </div>

                                {/* ATURAN — fix: sebelumnya bind ke data.description (bug!) */}
                                <div className="md:col-span-2 flex flex-col gap-1.5">
                                    <label className="text-sm font-medium text-kost-dark dark:text-mint-100/70">
                                        Aturan Kos
                                    </label>
                                    <textarea
                                        value={data.rules}
                                        onChange={(e) => setData("rules", e.target.value)}
                                        rows={3}
                                        placeholder="Contoh: Tidak boleh merokok, tamu max jam 9 malam..."
                                        className={inputClass(errors.rules)}
                                    />
                                    {errors.rules && (
                                        <span className="text-xs text-red-400">{errors.rules}</span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* ── LOKASI ──────────────────────────── */}
                        <div className="flex flex-col gap-4">
                            <SectionTitle
                                title="Lokasi Koordinat"
                                subtitle="Klik pada peta untuk menentukan lokasi persis"
                            />

                            {/* Koordinat badge */}
                            {position && (
                                <span className="
                                    self-start px-3 py-1 rounded-full text-xs font-mono
                                    bg-mint-100 dark:bg-mint-200/10
                                    text-kost-dark dark:text-mint-100
                                    border border-mint-200 dark:border-mint-300/20
                                ">
                                    {position.lat.toFixed(5)}, {position.lng.toFixed(5)}
                                </span>
                            )}

                            <div className="h-[350px] w-full rounded-xl overflow-hidden border border-mint-200 dark:border-dark-border/20">
                                <MapContainer
                                    center={[-8.1724, 113.7005]}
                                    zoom={13}
                                    style={{ height: "100%" }}
                                >
                                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                    <LocationMarker
                                        position={position}
                                        setPosition={setPosition}
                                    />
                                </MapContainer>
                            </div>

                            {errors.latitude && (
                                <p className="text-xs text-red-400">
                                    Anda belum memilih lokasi di peta.
                                </p>
                            )}
                        </div>

                        {/* ── DOKUMEN ─────────────────────────── */}
                        <div className="flex flex-col gap-4">
                            <SectionTitle title="Verifikasi & Dokumen" />

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                <FileInput
                                    label="Foto Kos"
                                    fileData={data.image_kos}
                                    onChange={(e) => setData("image_kos", e.target.files[0])}
                                    onRemove={() => setData("image_kos", null)}
                                    error={errors.image_kos}
                                />
                                <FileInput
                                    label="Foto KTP"
                                    fileData={data.image_ktp}
                                    onChange={(e) => setData("image_ktp", e.target.files[0])}
                                    onRemove={() => setData("image_ktp", null)}
                                    error={errors.image_ktp}
                                />
                                <FileInput
                                    label="Dokumen Tambahan"
                                    fileData={data.document_extra}
                                    onChange={(e) => setData("document_extra", e.target.files[0])}
                                    onRemove={() => setData("document_extra", null)}
                                    error={errors.document_extra}
                                />
                            </div>
                        </div>

                        {/* ── SUBMIT ──────────────────────────── */}
                        <div className="pt-4 border-t border-mint-200 dark:border-dark-border/20">
                            <button
                                type="submit"
                                disabled={processing}
                                className="
                                    px-8 py-2.5 rounded-xl text-sm font-medium transition
                                    bg-mint-200      dark:bg-mint-200/20
                                    border
                                    border-mint-200  dark:border-mint-300/20
                                    text-kost-dark   dark:text-mint-50
                                    hover:bg-mint-300 dark:hover:bg-mint-300/30
                                    disabled:opacity-50 disabled:cursor-not-allowed
                                "
                            >
                                {processing ? "Memproses..." : "Ajukan Sekarang"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}