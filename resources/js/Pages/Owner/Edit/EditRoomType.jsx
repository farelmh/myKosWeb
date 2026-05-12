import OwnerLayout from "@/Layouts/OwnerLayout";
import { useForm, usePage, router } from "@inertiajs/react";
import {
    Save,
    FileText,
    Image as ImageIcon,
    LoaderCircle,
    Plus,
    Check,
    Trash2,
} from "lucide-react";
import { useState } from "react";

export default function EditRoomType({ roomType, facilities, selectedFacilities = [] }) {

    const { auth } = usePage().props;

    const storageKey = `selectedProperty_${auth.user.id}`;

    const propertyId = Number(localStorage.getItem(storageKey));

    const { data, setData, put, processing, errors } = useForm({
        property_id: propertyId,
        name: roomType.name || "",
        room_width: roomType.room_width || "",
        room_length: roomType.room_length || "",
        price: roomType.price || "",
        capacity: roomType.capacity || "",
        total_rooms: roomType.total_rooms || "",
        rental_type: roomType.rental_type || "",
        images: [],
        facilities: selectedFacilities || [],
        custom_facility: "",
        custom_facilities: [],
    });

    const [previewImages, setPreviewImages] = useState([]);

    const toggleFacility = (id) => {
        if (data.facilities.includes(id)) {
            setData(
                "facilities",
                data.facilities.filter((item) => item !== id)
            );
        } else {
            setData(
                "facilities",
                [...data.facilities, id]
            );
        }
    };

    const addCustomFacility = () => {
        if (!data.custom_facility.trim()) return;

        setData("custom_facilities", [
            ...data.custom_facilities,
            data.custom_facility,
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
            router.delete(route("owner.room-type-image.delete", id), {
                preserveScroll: true,
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("owner.room-type.update", roomType.id), {
            forceFormData: true,
            onSuccess: () => setPreviewImages([]), // Bersihkan preview setelah berhasil
        });
    };
    
    return (
        <OwnerLayout>

            <div className="max-w-6xl mx-auto space-y-8 pb-20">
                {/* HEADER */}
                <div className="rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-xl">
                    <h1 className="text-4xl font-bold text-white tracking-tight">Tambah Tipe Kamar</h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* INFORMASI DASAR */}
                    <div className="rounded-3xl border border-white/10 bg-white/5 p-8">

                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400">
                                <FileText size={22} />
                            </div>

                            <div>
                                <h2 className="text-xl font-semibold text-white">
                                    Informasi Dasar
                                </h2>

                                <p className="text-sm text-gray-400 mt-1">
                                    Lengkapi informasi tipe kamar kos.
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* NAMA */}
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400 ml-1">
                                    Nama Tipe Kamar
                                </label>

                                <input
                                    type="text"
                                    placeholder="Reguler"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-cyan-500 outline-none"
                                />

                                {errors.name && (
                                    <p className="text-red-400 text-xs">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            {/* UKURAN */}
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400 ml-1">
                                    Ukuran Kamar ( Meter )
                                </label>

                                <div className="flex items-center gap-3">

                                    <input
                                        type="number"
                                        placeholder="4"
                                        value={data.room_width}
                                        onChange={(e) =>
                                            setData("room_width", e.target.value)
                                        }
                                        className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-cyan-500 outline-none"
                                    />

                                    <span className="text-gray-400 text-lg">
                                        ×
                                    </span>

                                    <input
                                        type="number"
                                        placeholder="4"
                                        value={data.room_length}
                                        onChange={(e) =>
                                            setData("room_length", e.target.value)
                                        }
                                        className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-cyan-500 outline-none"
                                    />

                                </div>

                                {(errors.room_width || errors.room_length) && (
                                    <p className="text-red-400 text-xs">
                                        {errors.room_width || errors.room_length}
                                    </p>
                                )}
                            </div>

                            {/* HARGA */}
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400 ml-1">
                                    Harga Sewa
                                </label>

                                <input
                                    type="number"
                                    placeholder="500000"
                                    value={data.price}
                                    onChange={(e) =>
                                        setData("price", e.target.value)
                                    }
                                    className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-cyan-500 outline-none"
                                />

                                {errors.price && (
                                    <p className="text-red-400 text-xs">
                                        {errors.price}
                                    </p>
                                )}
                            </div>

                            {/* KAPASITAS */}
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400 ml-1">
                                    Kapasitas Orang
                                </label>

                                <input
                                    type="number"
                                    placeholder="1"
                                    value={data.capacity}
                                    onChange={(e) =>
                                        setData("capacity", e.target.value)
                                    }
                                    className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-cyan-500 outline-none"
                                />

                                {errors.capacity && (
                                    <p className="text-red-400 text-xs">
                                        {errors.capacity}
                                    </p>
                                )}
                            </div>

                            {/* TOTAL ROOM */}
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400 ml-1">
                                    Total Kamar
                                </label>

                                <input
                                    type="number"
                                    placeholder="20"
                                    value={data.total_rooms}
                                    onChange={(e) =>
                                        setData("total_rooms", e.target.value)
                                    }
                                    className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-cyan-500 outline-none"
                                />

                                {errors.total_rooms && (
                                    <p className="text-red-400 text-xs">
                                        {errors.total_rooms}
                                    </p>
                                )}
                            </div>

                            {/* RENTAL TYPE */}
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400 ml-1">
                                    Tipe Sewa
                                </label>

                                <select
                                    value={data.rental_type}
                                    onChange={(e) =>
                                        setData("rental_type", e.target.value)
                                    }
                                    className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-cyan-500 outline-none"
                                >
                                    <option value="" disabled>
                                        Pilih tipe sewa
                                    </option>

                                    <option value="monthly">
                                        Bulanan
                                    </option>

                                    <option value="daily">
                                        Harian
                                    </option>
                                </select>

                                {errors.rental_type && (
                                    <p className="text-red-400 text-xs">
                                        {errors.rental_type}
                                    </p>
                                )}
                            </div>

                        </div>
                    </div>

                    {/* FACILITY LIST */}
                    <div
                        className="
                            rounded-3xl
                            border
                            border-white/10
                            bg-white/5
                            backdrop-blur-xl
                            p-8
                        "
                    >

                        <div className="mb-8">

                            <h2 className="text-xl font-semibold text-white mb-2">
                                Pilih Fasilitas
                            </h2>

                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                            {facilities.map((facility) => {

                                const active = data.facilities.includes(
                                    facility.id
                                );

                                return (
                                    <button
                                        type="button"
                                        key={facility.id}
                                        onClick={() =>
                                            toggleFacility(facility.id)
                                        }
                                        className={`
                                            relative
                                            p-5
                                            rounded-2xl
                                            border
                                            transition-all
                                            duration-300
                                            text-left

                                            ${
                                                active
                                                    ? `
                                                        border-cyan-500/50
                                                        bg-cyan-500/10
                                                    `
                                                    : `
                                                        border-white/10
                                                        bg-white/5
                                                        hover:bg-white/10
                                                    `
                                            }
                                        `}
                                    >

                                        <h3 className="text-white font-medium text-sm">
                                            {facility.name}
                                        </h3>

                                        {active && (
                                            <div
                                                className="
                                                    absolute
                                                    top-3
                                                    right-3
                                                    w-6
                                                    h-6
                                                    rounded-full
                                                    bg-cyan-500
                                                    flex
                                                    items-center
                                                    justify-center
                                                "
                                            >

                                                <Check className="w-4 h-4 text-white" />

                                            </div>
                                        )}

                                    </button>
                                );
                            })}

                        </div>

                    </div>

                    {/* CUSTOM FACILITY */}
                    <div
                        className="
                            rounded-3xl
                            border
                            border-white/10
                            bg-white/5
                            backdrop-blur-xl
                            p-8
                        "
                    >

                        <div className="mb-6">

                            <h2 className="text-xl font-semibold text-white mb-2">
                                Tambah Fasilitas Lain
                            </h2>

                            <p className="text-sm text-gray-400">
                                Tambahkan fasilitas custom jika belum tersedia.
                            </p>

                        </div>

                        <div className="flex gap-3">

                            <input
                                type="text"
                                value={data.custom_facility}
                                onChange={(e) =>
                                    setData(
                                        "custom_facility",
                                        e.target.value
                                    )
                                }
                                placeholder="Contoh: Rooftop"
                                className="
                                    flex-1
                                    px-4
                                    py-3
                                    rounded-2xl
                                    bg-white/5
                                    border
                                    border-white/10
                                    text-white
                                    placeholder:text-gray-500
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-cyan-500
                                "
                            />

                            <button
                                type="button"
                                onClick={addCustomFacility}
                                className="
                                    px-5
                                    rounded-2xl
                                    bg-cyan-500
                                    text-white
                                    hover:opacity-90
                                    transition
                                "
                            >

                                <Plus className="w-5 h-5" />

                            </button>

                        </div>

                        {/* LIST */}
                        {data.custom_facilities.length > 0 && (

                            <div className="flex flex-wrap gap-3 mt-6">

                                {data.custom_facilities.map((facility, index) => (

                                    <div
                                        key={index}
                                        className="
                                            flex
                                            items-center
                                            gap-2
                                            px-4
                                            py-2
                                            rounded-xl
                                            bg-cyan-500/10
                                            border
                                            border-cyan-500/20
                                        "
                                    >

                                        <span className="text-sm text-cyan-300">
                                            {facility}
                                        </span>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                removeCustomFacility(index)
                                            }
                                            className="
                                                text-red-400
                                                hover:text-red-300
                                            "
                                        >

                                            ✕

                                        </button>

                                    </div>
                                ))}

                            </div>
                        )}

                        {errors.facilities && (
                            <p className="text-red-400 text-sm mt-4">
                                {errors.facilities}
                            </p>
                        )}

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
                                {roomType.images?.map((image) => (
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