import { useState, useEffect } from "react";
import { X } from "lucide-react";
import {
    MapContainer,
    TileLayer,
    Marker,
    useMapEvents,
} from "react-leaflet";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
    iconUrl:       "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    shadowUrl:     "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

function LocationPicker({ setLatLng }) {
    useMapEvents({
        click(e) {
            setLatLng(e.latlng);
        },
    });
    return null;
}

const inputClass = `
    w-full p-3 rounded-xl text-sm outline-none transition
    bg-mint-50       dark:bg-dark-bg
    border
    border-mint-200  dark:border-dark-border/20
    text-kost-dark   dark:text-mint-50
    placeholder-kost-muted dark:placeholder-mint-100/30
    focus:ring-2
    focus:ring-mint-200 dark:focus:ring-mint-300/30
`;

export default function EditKosModal({ isOpen, kos, onClose }) {
    if (!isOpen) return null;

    /* ================= STATE ================= */
    const [form, setForm] = useState({
        name:      "",
        owner:     "",
        alamat:    "",
        lat:       -8.1586,
        lng:       113.7202,
        deskripsi: "",
        rules:     "",
        fasilitas: "",
    });

    const [images, setImages] = useState([]);

    /* ================= LOAD DATA ================= */
    useEffect(() => {
        if (kos) {
            setForm({
                name:      kos.name      || "",
                owner:     kos.owner     || "",
                alamat:    kos.alamat    || "",
                lat:       kos.lat       || -8.1586,
                lng:       kos.lng       || 113.7202,
                deskripsi: kos.deskripsi || "",
                rules:     kos.rules     || "",
                fasilitas: kos.fasilitas || "",
            });
        }
    }, [kos]);

    /* ================= HANDLER ================= */
    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleImage = (e) =>
        setImages(Array.from(e.target.files));

    const setLatLng = (latlng) =>
        setForm({ ...form, lat: latlng.lat, lng: latlng.lng });

    const handleSubmit = () => {
        console.log("DATA:", form);
        console.log("IMAGES:", images);
        onClose();
    };

    /* ================= UI ================= */
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 dark:bg-black/60 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="
                    w-full max-w-2xl relative
                    max-h-[90vh] overflow-y-auto
                    rounded-2xl p-6
                    bg-white        dark:bg-dark-card
                    border
                    border-mint-200 dark:border-dark-border/20
                    shadow-sm
                    transition-colors duration-300
                "
            >
                {/* HEADER */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-base font-medium text-kost-dark dark:text-mint-50">
                        Edit Kos
                    </h2>

                    <button
                        onClick={onClose}
                        className="
                            p-1.5 rounded-lg transition
                            text-kost-muted    dark:text-mint-100/50
                            hover:bg-mint-50   dark:hover:bg-dark-bg
                            hover:text-kost-dark dark:hover:text-mint-50
                        "
                    >
                        <X className="w-5 h-5" />
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
                        className={inputClass}
                    />

                    {/* OWNER */}
                    <input
                        name="owner"
                        value={form.owner}
                        onChange={handleChange}
                        placeholder="Owner"
                        className={inputClass}
                    />

                    {/* ALAMAT */}
                    <textarea
                        name="alamat"
                        value={form.alamat}
                        onChange={handleChange}
                        placeholder="Alamat"
                        rows={2}
                        className={inputClass}
                    />

                    {/* MAP */}
                    <div>
                        <p className="text-sm mb-2 text-kost-muted dark:text-mint-100/50">
                            Pilih Lokasi (klik map)
                        </p>

                        <MapContainer
                            center={[form.lat, form.lng]}
                            zoom={13}
                            className="h-64 rounded-xl overflow-hidden border border-mint-200 dark:border-dark-border/20"
                        >
                            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                            <Marker position={[form.lat, form.lng]} />
                            <LocationPicker setLatLng={setLatLng} />
                        </MapContainer>

                        {/* LAT LNG */}
                        <div className="flex gap-3 mt-3">
                            <input
                                value={form.lat}
                                readOnly
                                className={`${inputClass} w-1/2 text-xs cursor-default`}
                            />
                            <input
                                value={form.lng}
                                readOnly
                                className={`${inputClass} w-1/2 text-xs cursor-default`}
                            />
                        </div>
                    </div>

                    {/* DESKRIPSI */}
                    <textarea
                        name="deskripsi"
                        value={form.deskripsi}
                        onChange={handleChange}
                        placeholder="Deskripsi"
                        rows={3}
                        className={inputClass}
                    />

                    {/* RULES */}
                    <textarea
                        name="rules"
                        value={form.rules}
                        onChange={handleChange}
                        placeholder="Rules"
                        rows={2}
                        className={inputClass}
                    />

                    {/* FASILITAS */}
                    <input
                        name="fasilitas"
                        value={form.fasilitas}
                        onChange={handleChange}
                        placeholder="Fasilitas (pisah koma)"
                        className={inputClass}
                    />

                    {/* UPLOAD FOTO */}
                    <div>
                        <p className="text-sm mb-2 text-kost-muted dark:text-mint-100/50">
                            Upload Foto Kos
                        </p>

                        <label className="
                            flex items-center justify-center w-full p-3 rounded-xl
                            cursor-pointer text-sm transition
                            bg-mint-50       dark:bg-dark-bg
                            border border-dashed
                            border-mint-200  dark:border-dark-border/30
                            text-kost-muted  dark:text-mint-100/40
                            hover:border-mint-300 dark:hover:border-mint-300/50
                            hover:text-kost-dark  dark:hover:text-mint-50
                        ">
                            Klik untuk upload foto
                            <input
                                type="file"
                                multiple
                                onChange={handleImage}
                                className="hidden"
                            />
                        </label>

                        {/* PREVIEW */}
                        {images.length > 0 && (
                            <div className="grid grid-cols-3 gap-3 mt-3">
                                {images.map((img, i) => (
                                    <img
                                        key={i}
                                        src={URL.createObjectURL(img)}
                                        className="
                                            h-24 w-full object-cover rounded-lg
                                            border border-mint-200 dark:border-dark-border/20
                                        "
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* ACTION */}
                    <div className="flex justify-end gap-3 pt-4 border-t border-mint-200 dark:border-dark-border/20">
                        <button
                            onClick={onClose}
                            className="
                                px-4 py-2 rounded-lg text-sm transition
                                bg-mint-50      dark:bg-dark-bg
                                border
                                border-mint-200 dark:border-dark-border/20
                                text-kost-muted dark:text-mint-100/60
                                hover:bg-mint-100 dark:hover:bg-dark-sidebar
                            "
                        >
                            Batal
                        </button>

                        <button
                            onClick={handleSubmit}
                            className="
                                px-5 py-2 rounded-lg text-sm font-medium transition
                                bg-mint-200 dark:bg-mint-200/20
                                text-kost-dark dark:text-mint-50
                                hover:bg-mint-300 dark:hover:bg-mint-300/30
                                border border-mint-200 dark:border-mint-300/20
                            "
                        >
                            Simpan
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}