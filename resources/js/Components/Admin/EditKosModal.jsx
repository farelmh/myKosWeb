import { useState, useEffect } from "react";
import { X } from "lucide-react";
import {
    MapContainer,
    TileLayer,
    Marker,
    useMapEvents,
} from "react-leaflet";
import L from "leaflet";

/* ================= FIX ICON LEAFLET ================= */
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
    iconUrl:
        "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    shadowUrl:
        "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

/* ================= MAP CLICK ================= */
function LocationPicker({ setLatLng }) {
    useMapEvents({
        click(e) {
            setLatLng(e.latlng);
        },
    });
    return null;
}

export default function EditKosModal({ isOpen, kos, onClose }) {
    if (!isOpen) return null; // ✅ kontrol modal

    /* ================= STATE ================= */
    const [form, setForm] = useState({
        name: "",
        owner: "",
        alamat: "",
        lat: -8.1586,
        lng: 113.7202,
        deskripsi: "",
        rules: "",
        fasilitas: "",
    });

    const [images, setImages] = useState([]);

    /* ================= LOAD DATA ================= */
    useEffect(() => {
        if (kos) {
            setForm({
                name: kos.name || "",
                owner: kos.owner || "",
                alamat: kos.alamat || "",
                lat: kos.lat || -8.1586,
                lng: kos.lng || 113.7202,
                deskripsi: kos.deskripsi || "",
                rules: kos.rules || "",
                fasilitas: kos.fasilitas || "",
            });
        }
    }, [kos]);

    /* ================= HANDLER ================= */
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleImage = (e) => {
        const files = Array.from(e.target.files);
        setImages(files);
    };

    const setLatLng = (latlng) => {
        setForm({
            ...form,
            lat: latlng.lat,
            lng: latlng.lng,
        });
    };

    const handleSubmit = () => {
        console.log("DATA:", form);
        console.log("IMAGES:", images);

        // TODO: kirim ke backend (axios / inertia)

        onClose();
    };

    /* ================= UI ================= */
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={onClose} // ✅ klik luar close
        >
            <div
                onClick={(e) => e.stopPropagation()} // ❗ supaya tidak close saat klik dalam
                className="w-full max-w-2xl bg-[#12122a] rounded-2xl border border-white/10 p-6 text-white relative max-h-[90vh] overflow-y-auto shadow-2xl"
            >
                {/* HEADER */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-semibold tracking-wide">
                        Edit Kos
                    </h2>

                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-white/10 transition"
                    >
                        <X className="w-5 h-5 text-gray-400 hover:text-white" />
                    </button>
                </div>

                {/* FORM */}
                <div className="space-y-4">

                    {/* NAMA */}
                    <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Nama Kos"
                        className="w-full p-3 rounded-xl bg-white/5 border border-white/10 focus:border-indigo-500 outline-none"
                    />

                    {/* OWNER */}
                    <input
                        name="owner"
                        value={form.owner}
                        onChange={handleChange}
                        placeholder="Owner"
                        className="w-full p-3 rounded-xl bg-white/5 border border-white/10 focus:border-indigo-500 outline-none"
                    />

                    {/* ALAMAT */}
                    <textarea
                        name="alamat"
                        value={form.alamat}
                        onChange={handleChange}
                        placeholder="Alamat"
                        className="w-full p-3 rounded-xl bg-white/5 border border-white/10 focus:border-indigo-500 outline-none"
                    />

                    {/* MAP */}
                    <div>
                        <p className="text-sm mb-2 text-gray-400">
                            Pilih Lokasi (klik map)
                        </p>

                        <MapContainer
                            center={[form.lat, form.lng]}
                            zoom={13}
                            className="h-64 rounded-xl overflow-hidden border border-white/10"
                        >
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={[form.lat, form.lng]} />
                            <LocationPicker setLatLng={setLatLng} />
                        </MapContainer>

                        <div className="flex gap-3 mt-3">
                            <input
                                value={form.lat}
                                readOnly
                                className="w-1/2 p-2 rounded-lg bg-white/5 border border-white/10 text-xs"
                            />
                            <input
                                value={form.lng}
                                readOnly
                                className="w-1/2 p-2 rounded-lg bg-white/5 border border-white/10 text-xs"
                            />
                        </div>
                    </div>

                    {/* DESKRIPSI */}
                    <textarea
                        name="deskripsi"
                        value={form.deskripsi}
                        onChange={handleChange}
                        placeholder="Deskripsi"
                        className="w-full p-3 rounded-xl bg-white/5 border border-white/10 focus:border-indigo-500 outline-none"
                    />

                    {/* RULES */}
                    <textarea
                        name="rules"
                        value={form.rules}
                        onChange={handleChange}
                        placeholder="Rules"
                        className="w-full p-3 rounded-xl bg-white/5 border border-white/10 focus:border-indigo-500 outline-none"
                    />

                    {/* FASILITAS */}
                    <input
                        name="fasilitas"
                        value={form.fasilitas}
                        onChange={handleChange}
                        placeholder="Fasilitas (pisah koma)"
                        className="w-full p-3 rounded-xl bg-white/5 border border-white/10 focus:border-indigo-500 outline-none"
                    />

                    {/* UPLOAD FOTO */}
                    <div>
                        <p className="text-sm text-gray-400 mb-2">
                            Upload Foto Kos
                        </p>

                        <input
                            type="file"
                            multiple
                            onChange={handleImage}
                            className="text-sm"
                        />

                        {/* PREVIEW */}
                        {images.length > 0 && (
                            <div className="grid grid-cols-3 gap-3 mt-3">
                                {images.map((img, i) => (
                                    <img
                                        key={i}
                                        src={URL.createObjectURL(img)}
                                        className="h-24 w-full object-cover rounded-lg border border-white/10"
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* ACTION */}
                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition"
                        >
                            Batal
                        </button>

                        <button
                            onClick={handleSubmit}
                            className="px-5 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-90 transition"
                        >
                            Simpan
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}