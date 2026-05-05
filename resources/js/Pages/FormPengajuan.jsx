import { useForm } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { LocationMarker } from "@/Components/Map/LocationMarker";

// --- PINDAHKAN KOMPONEN KE LUAR SINI ---

const FileInput = ({ label, fileData, onChange, onRemove, error, hint }) => (
    <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        {!fileData ? (
            <div className={`relative border-2 border-dashed rounded-xl p-4 transition-all ${
                error ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-indigo-400 bg-gray-50'
            }`}>
                <input 
                    type="file" 
                    onChange={onChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="text-center">
                    <p className="text-xs text-gray-600 font-medium">Klik untuk upload</p>
                    {hint && <p className="text-[10px] text-gray-400 mt-1">{hint}</p>}
                </div>
            </div>
        ) : (
            <div className="flex items-center justify-between p-3 border-2 border-indigo-100 bg-indigo-50 rounded-xl">
                <div className="flex items-center gap-2 overflow-hidden">
                    <span className="text-lg">📄</span>
                    <div className="flex flex-col min-w-0">
                        <p className="text-xs font-medium text-indigo-700 truncate">{fileData.name}</p>
                        <p className="text-[10px] text-indigo-400">{(fileData.size / 1024).toFixed(1)} KB</p>
                    </div>
                </div>
                <button 
                    type="button"
                    onClick={onRemove}
                    className="p-1.5 hover:bg-red-100 text-red-500 rounded-lg transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        )}
        {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
);

const InputField = ({ label, type = "text", value, onChange, error, placeholder }) => (
    <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <input 
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`px-4 py-2 rounded-lg border bg-white transition-all focus:ring-2 focus:ring-indigo-500 outline-none ${
                error ? 'border-red-500' : 'border-gray-300 focus:border-indigo-500'
            }`}
        />
        {error && <span className="text-xs text-red-500">{error}</span>}
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
        document_extra: null
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
        post('/pengajuan-kos', {
            onSuccess: (page) => {
                reset();
                setPosition(null);
                alert('Pengajuan kos berhasil dikirim!');
            },
            onError: (errors) => {
                console.log(errors);
            }
        });
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                <div className="bg-indigo-600 p-6">
                    <h2 className="text-2xl font-bold text-white">Pengajuan Kos Baru</h2>
                    <p className="text-indigo-100 text-sm">Lengkapi data kos Anda untuk mulai memasarkan</p>
                </div>

                <form onSubmit={submit} className="p-8 flex flex-col gap-6">
                    <h3 className="text-lg font-bold text-gray-800 border-b pb-2">Informasi Umum</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputField 
                            label="Nama Kos"
                            placeholder="Contoh: Kos Mas Iqbal"
                            value={data.name}
                            onChange={e => setData('name', e.target.value)}
                            error={errors.name}
                        />
                        <InputField 
                            label="Kota"
                            placeholder="Jember"
                            value={data.city}
                            onChange={e => setData('city', e.target.value)}
                            error={errors.city}
                        />
                        <div className="md:col-span-2">
                            <InputField 
                                label="Alamat Lengkap"
                                placeholder="Jozenji 1-128, Morioh, Japan"
                                value={data.address}
                                onChange={e => setData('address', e.target.value)}
                                error={errors.address}
                            />
                        </div>
                        {/* Textarea tetap di dalam karena tidak di-render ulang secara agresif oleh React sebagai komponen baru */}
                        <div className="md:col-span-2 flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-gray-700">Deskripsi Kos</label>
                            <textarea 
                                value={data.description}
                                onChange={e => setData('description', e.target.value)}
                                rows="3"
                                className="px-4 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                            />
                        </div>
                        <div className="md:col-span-2 flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-gray-700">Aturan Kos</label>
                            <textarea 
                                value={data.rules}
                                onChange={e => setData('rules', e.target.value)}
                                rows="5"
                                className="px-4 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                            />
                        </div>
                    </div>

                    {/* Section Map */}
                    <div className="space-y-3">
                        <div className="flex justify-between items-end">
                            <div>
                                <h4 className="font-semibold text-gray-800">Lokasi Koordinat</h4>
                                <p className="text-xs text-gray-500 italic">Klik pada peta untuk menentukan lokasi persis</p>
                            </div>
                            {position && (
                                <span className="text-[10px] bg-green-100 text-green-700 px-2 py-1 rounded-full font-mono">
                                    {position.lat.toFixed(5)}, {position.lng.toFixed(5)}
                                </span>
                            )}
                        </div>
                        <div className="h-[350px] w-full rounded-xl overflow-hidden border-2 border-gray-100 shadow-inner z-0">
                            <MapContainer center={[-8.1724, 113.7005]} zoom={13} style={{ height: "100%" }}>
                                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                <LocationMarker position={position} setPosition={setPosition} />
                            </MapContainer>
                        </div>
                        {errors.latitude && <p className="text-xs text-red-500">Anda belum memilih lokasi di peta.</p>}
                    </div>

                    {/* Bagian Dokumen */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-gray-800 border-b pb-2">Verifikasi & Dokumen</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <FileInput 
                                label="Foto Kos"
                                fileData={data.image_kos}
                                onChange={e => setData('image_kos', e.target.files[0])}
                                onRemove={() => setData('image_kos', null)}
                                error={errors.image_kos}
                            />
                            <FileInput 
                                label="Foto KTP"
                                fileData={data.image_ktp}
                                onChange={e => setData('image_ktp', e.target.files[0])}
                                onRemove={() => setData('image_ktp', null)}
                                error={errors.image_ktp}
                            />
                            <FileInput 
                                label="Dokumen"
                                fileData={data.document_extra}
                                onChange={e => setData('document_extra', e.target.files[0])}
                                onRemove={() => setData('document_extra', null)}
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
    );
}