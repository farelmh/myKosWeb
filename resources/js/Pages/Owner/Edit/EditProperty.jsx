import OwnerLayout from "@/Layouts/OwnerLayout";
import { Head, useForm } from "@inertiajs/react";
import GoogleTileLayer from "@/Components/Map/GoogleTileLayer";
import {
    Save,
    MapPin,
    FileText,
    Image as ImageIcon,
    LoaderCircle,
    Sparkles,
    Trash2,
} from "lucide-react";
import { MapContainer } from "react-leaflet";
import { LocationMarker } from "@/Components/Map/LocationMarker";
import { useEffect, useState } from "react";
import { router } from "@inertiajs/react";

export default function EditProperty({ property }) {
    // 1. Inisialisasi: images di form hanya untuk file BARU
    const { data, setData, post, processing, errors } = useForm({
        _method: 'put', // Trik agar Laravel bisa terima file lewat request PUT
        name: property.name || "",
        address: property.address || "",
        city: property.city || "",
        description: property.description || "",
        rules: property.rules || "",
        latitude: property.latitude || "",
        longitude: property.longitude || "",
        images: [], 
    });

    const [previewImages, setPreviewImages] = useState([]);
    const [position, setPosition] = useState(
        property.latitude && property.longitude
            ? { lat: property.latitude, lng: property.longitude }
            : null
    );

    // Update lat/lng saat posisi marker di map berubah
    useEffect(() => {
        if (position) {
            setData((prev) => ({
                ...prev,
                latitude: position.lat,
                longitude: position.lng,
            }));
        }
    }, [position]);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        
        // Tambah ke array yang sudah ada (tidak tertimpa)
        setData("images", [...data.images, ...files]);

        const newPreviews = files.map((file) => ({
            url: URL.createObjectURL(file),
            name: file.name
        }));

        setPreviewImages((prev) => [...prev, ...newPreviews]);
        e.target.value = null; // Reset agar bisa pilih file yang sama
    };

    const removePreview = (index) => {
        setPreviewImages((prev) => prev.filter((_, i) => i !== index));
        const updatedFiles = data.images.filter((_, i) => i !== index);
        setData("images", updatedFiles);
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
            onSuccess: () => setPreviewImages([]), // Bersihkan preview setelah berhasil
        });
    };

    return (
        <OwnerLayout>
            <Head title={`Edit ${property.name}`} />

            <div className="max-w-6xl mx-auto space-y-8 pb-20">
                {/* HEADER */}
                <div className="rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-xl">
                    <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-sm w-fit mb-4">
                        <Sparkles size={16} /> Edit Info Kos
                    </div>
                    <h1 className="text-4xl font-bold text-white tracking-tight">{property.name}</h1>
                    <p className="text-gray-400 mt-2">Pastikan informasi kos Anda selalu diperbarui.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* INFORMASI DASAR */}
                    <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400">
                                <FileText size={22} />
                            </div>
                            <h2 className="text-xl font-semibold text-white">Informasi Dasar</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400 ml-1">Nama Kos</label>
                                <input type="text" value={data.name} onChange={e => setData("name", e.target.value)} className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-cyan-500 outline-none" />
                                {errors.name && <p className="text-red-400 text-xs">{errors.name}</p>}
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400 ml-1">Kota</label>
                                <input type="text" value={data.city} onChange={e => setData("city", e.target.value)} className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-cyan-500 outline-none" />
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-sm text-gray-400 ml-1">Alamat Lengkap</label>
                                <textarea rows={2} value={data.address} onChange={e => setData("address", e.target.value)} className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white resize-none" />
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-sm text-gray-400 ml-1">Deskripsi</label>
                                <textarea rows={4} value={data.description} onChange={e => setData("description", e.target.value)} className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white resize-none" />
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-sm text-gray-400 ml-1">Peraturan</label>
                                <textarea rows={4} value={data.rules} onChange={e => setData("rules", e.target.value)} className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white resize-none" />
                            </div>
                        </div>
                    </div>

                    {/* LOKASI MAP */}
                    <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
                        <div className="flex items-center gap-3 mb-6 text-emerald-400">
                            <MapPin size={22} />
                            <h2 className="text-xl font-semibold text-white">Lokasi Kos</h2>
                        </div>
                        <div className="h-[400px] rounded-3xl overflow-hidden border border-white/10">
                            <MapContainer center={position ? [position.lat, position.lng] : [-8.1724, 113.7005]} zoom={15} style={{ height: "100%" }}>
                                <GoogleTileLayer />
                                <LocationMarker position={position} setPosition={setPosition} />
                            </MapContainer>
                        </div>
                    </div>

                    {/* GALERI FOTO */}
                    <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
                        <div className="flex items-center gap-3 mb-8 text-orange-400">
                            <ImageIcon size={22} />
                            <h2 className="text-xl font-semibold text-white">Galeri Foto</h2>
                        </div>

                        {/* Foto yang Sudah Ada di Database */}
                        <div className="mb-8">
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Foto Saat Ini</p>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {property.images?.map((image) => (
                                    <div key={image.id} className="relative rounded-2xl overflow-hidden border border-white/10 aspect-video group">
                                        <img src={`/storage/${image.image_path}`} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition" />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <button type="button" onClick={() => removeImageFromDB(image.id)} className="p-2 bg-red-500 text-white rounded-full hover:scale-110 transition">
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        <div className="absolute top-2 left-2 bg-black/50 px-2 py-0.5 rounded text-[10px] text-white">DATABASE</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Input Gambar Baru */}
                        <div className="space-y-6">
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Tambah Foto Baru</p>
                            <input type="file" multiple id="multi-upload" onChange={handleImageChange} className="hidden" />
                            <label htmlFor="multi-upload" className="flex flex-col items-center justify-center w-full h-32 rounded-2xl border-2 border-dashed border-white/10 bg-white/5 hover:border-cyan-500/50 transition-all cursor-pointer group">
                                <ImageIcon className="text-gray-500 group-hover:text-cyan-400 mb-2" />
                                <span className="text-sm text-gray-400">Klik untuk memilih foto tambahan</span>
                            </label>

                            {/* Preview Foto Baru */}
                            {previewImages.length > 0 && (
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {previewImages.map((image, index) => (
                                        <div key={index} className="relative aspect-video rounded-2xl overflow-hidden border border-cyan-500/30 group">
                                            <img src={image.url} className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <button type="button" onClick={() => removePreview(index)} className="p-2 bg-red-500 text-white rounded-full hover:scale-110 transition">
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                            <div className="absolute bottom-2 left-2 bg-cyan-600 px-2 py-0.5 rounded text-[10px] text-white font-bold">BARU</div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* SUBMIT BUTTON */}
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-violet-500 text-white font-bold hover:shadow-lg hover:shadow-cyan-500/20 transition-all disabled:opacity-50"
                    >
                        {processing ? <LoaderCircle className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                        {processing ? "Menyimpan Perubahan..." : "Simpan Perubahan"}
                    </button>
                </form>
            </div>
        </OwnerLayout>
    );
}