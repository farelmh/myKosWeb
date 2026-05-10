import { useForm } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { LocationMarker } from "@/Components/Map/LocationMarker";

// --- PINDAHKAN KOMPONEN KE LUAR SINI ---

const FileInput = ({ label, fileData, onChange, onRemove, error }) => (
    <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-300">{label}</label>

        {!fileData ? (
            <label className="border border-dashed border-white/10 rounded-xl p-6 text-center cursor-pointer hover:bg-white/5 transition">
                <p className="text-sm text-gray-400">
                    Upload file
                </p>

                <input
                    type="file"
                    onChange={onChange}
                    className="hidden"
                />
            </label>
        ) : (
            <div className="flex justify-between items-center bg-white/5 border border-white/10 rounded-xl p-3">
                <span className="text-sm text-gray-300 truncate">
                    {fileData.name}
                </span>

                <button
                    onClick={onRemove}
                    className="text-red-400 text-xs"
                >
                    Hapus
                </button>
            </div>
        )}

        {error && <span className="text-xs text-red-400">{error}</span>}
    </div>
);

const InputField = ({ label, value, onChange, error, placeholder }) => (
    <div className="flex flex-col gap-1.5">
        <label className="text-sm text-gray-300">{label}</label>

        <input
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`px-4 py-3 rounded-xl bg-white/5 border outline-none text-sm
            ${
                error
                    ? "border-red-500"
                    : "border-white/10 focus:border-indigo-500"
            }`}
        />

        {error && <span className="text-xs text-red-400">{error}</span>}
    </div>
);
// --- KOMPONEN UTAMA ---

export default function FormPengajuan() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        address: "",
        city: "",
        description: "",
        rules: "",
        latitude: "",
        longitude: "",
        image_kos: null,
        image_ktp: null,
        document_extra: null,
    });

    const [position, setPosition] = useState(null);

    useEffect(() => {
        if (position) {
            setData((prev) => ({
                ...prev,
                latitude: position.lat,
                longitude: position.lng,
            }));
        }
    }, [position]);

    const submit = (e) => {
        e.preventDefault();
        post("/pengajuan-kos", {
            onSuccess: (page) => {
                reset();
                setPosition(null);
                alert("Pengajuan kos berhasil dikirim!");
            },
            onError: (errors) => {
                console.log(errors);
            },
        });
    };

    return (
        <div className="min-h-screen bg-[#0b0f2a] px-[6%] lg:px-[10%] py-10 text-white">
    <div className="max-w-4xl mx-auto">

        <div className="bg-[#0f172a] rounded-2xl border border-white/10 shadow-xl overflow-hidden">

            <div className="p-6 border-b border-white/10">
                <h2 className="text-xl font-semibold">
                    Pengajuan Kos Baru
                </h2>
                <p className="text-sm text-gray-400">
                    Lengkapi data untuk mempublikasikan kos Anda
                </p>
            </div>

                <form onSubmit={submit} className="p-8 flex flex-col gap-6">
                    <h3 className="text-lg font-bold text-gray-800 border-b pb-2">
                        Informasi Umum
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputField
                            label="Nama Kos"
                            placeholder="Contoh: Kos Mas Iqbal"
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
                                placeholder="Jozenji 1-128, Morioh, Japan"
                                value={data.address}
                                onChange={(e) =>
                                    setData("address", e.target.value)
                                }
                                error={errors.address}
                            />
                        </div>
                        {/* Textarea tetap di dalam karena tidak di-render ulang secara agresif oleh React sebagai komponen baru */}
                        <div className="md:col-span-2 flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-gray-700">
                                Deskripsi Kos
                            </label>
                            <textarea
                                value={data.description}
                                onChange={(e) =>
                                    setData("description", e.target.value)
                                }
                                rows="3"
                                className="px-4 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                            />
                        </div>
                        <div className="md:col-span-2 flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-gray-700">
                                Aturan Kos
                            </label>
                            <textarea
                                value={data.description}
                                onChange={(e) =>
                                    setData("description", e.target.value)
                                }
                                rows="3"
                                className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-indigo-500 outline-none text-sm"
                            />
                        </div>
                    </div>

                    {/* Section Map */}
                    <div className="space-y-3">
                        <div className="flex justify-between items-end">
                            <div>
                                <h4 className="font-semibold text-gray-800">
                                    Lokasi Koordinat
                                </h4>
                                <p className="text-xs text-gray-500 italic">
                                    Klik pada peta untuk menentukan lokasi
                                    persis
                                </p>
                            </div>
                            {position && (
                                <span className="text-[10px] bg-green-100 text-green-700 px-2 py-1 rounded-full font-mono">
                                    {position.lat.toFixed(5)},{" "}
                                    {position.lng.toFixed(5)}
                                </span>
                            )}
                        </div>
                        <div className="h-[350px] w-full rounded-xl overflow-hidden border-2 border-gray-100 shadow-inner z-0">
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
                            <p className="text-xs text-red-500">
                                Anda belum memilih lokasi di peta.
                            </p>
                        )}
                    </div>

                    {/* Bagian Dokumen */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-gray-800 border-b pb-2">
                            Verifikasi & Dokumen
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <FileInput
                                label="Foto Kos"
                                fileData={data.image_kos}
                                onChange={(e) =>
                                    setData("image_kos", e.target.files[0])
                                }
                                onRemove={() => setData("image_kos", null)}
                                error={errors.image_kos}
                            />
                            <FileInput
                                label="Foto KTP"
                                fileData={data.image_ktp}
                                onChange={(e) =>
                                    setData("image_ktp", e.target.files[0])
                                }
                                onRemove={() => setData("image_ktp", null)}
                                error={errors.image_ktp}
                            />
                            <FileInput
                                label="Dokumen"
                                fileData={data.document_extra}
                                onChange={(e) =>
                                    setData("document_extra", e.target.files[0])
                                }
                                onRemove={() => setData("document_extra", null)}
                                error={errors.document_extra}
                            />
                        </div>
                    </div>

                    <div className="pt-4 border-t border-gray-100">
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full md:w-auto px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
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
