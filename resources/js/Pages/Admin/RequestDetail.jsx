import AdminLayout from "@/Layouts/AdminLayout";
import { MapContainer, Marker, Popup } from "react-leaflet";
import {
    Check,
    X,
    MapPin,
    Phone,
    Mail,
    User,
    Home,
    FileText,
    ExternalLink,
    ShieldCheck,
    ArrowLeft
} from "lucide-react";
import GoogleTileLayer from "@/Components/Map/GoogleTileLayer";
import { router } from "@inertiajs/react";

function InfoBlock({ label, value }) {
    return (
        <div>
            <p className="text-[10px] text-kost-muted font-bold uppercase tracking-widest mb-1">
                {label}
            </p>
            <p className="text-kost-dark dark:text-mint-50 text-sm leading-relaxed">
                {value || "-"}
            </p>
        </div>
    );
}

function ProfileItem({ icon, label, value }) {
    return (
        <div className="flex items-center gap-4 group">
            <div className="p-2 bg-mint-100 dark:bg-dark-card rounded-lg text-kost-muted group-hover:text-primary transition">
                {icon}
            </div>
            <div>
                <p className="text-[10px] text-kost-muted font-bold uppercase tracking-widest">
                    {label}
                </p>
                <p className="text-sm text-kost-dark dark:text-mint-50 font-medium">
                    {value}
                </p>
            </div>
        </div>
    );
}

export default function RequestDetail({ application }) {

    const handleApprove = () => {
        router.put(route("admin.request.update", application.id), {
            status: "approved",
        });
    };

    const handleReject = () => {
        const reason = prompt("Masukkan alasan penolakan:");
        if (reason) {
            router.put(route("admin.request.update", application.id), {
                status: "rejected",
                rejection_reason: reason,
            });
        }
    };

    const getImagePath = (item) =>
        item ? `/storage/${item.image_path || item.file_path}` : null;

    return (
        <AdminLayout>
            <div className="max-w-7xl mx-auto p-6 space-y-6">
                <button
                    onClick={() => window.history.back()}
                    className="flex items-center gap-2 text-sm text-kost-muted hover:text-kost-dark dark:hover:text-mint-50 transition"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Kembali
                </button>

                {/* HEADER */}
                <div className="flex justify-between items-center bg-white dark:bg-dark-card p-6 rounded-2xl border border-mint-200 dark:border-dark-border/20 rounded-2xl">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-mint-200/40 rounded-xl">
                            <ShieldCheck className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-kost-dark dark:text-mint-50">
                                {application.name}
                            </h1>
                            <p className="text-sm text-kost-muted">
                                {application.city}
                            </p>
                        </div>
                    </div>

                    <span
                        className={`px-4 py-1.5 rounded-full text-xs font-semibold ${
                            application.status === "approved"
                                ? "bg-green-100 text-green-700"
                                : application.status === "rejected"
                                ? "bg-red-100 text-red-600"
                                : "bg-yellow-100 text-yellow-700"
                        }`}
                    >
                        {application.status}
                    </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* LEFT */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* DESKRIPSI */}
                        <div className="bg-white dark:bg-dark-card rounded-2xl p-6 border border-mint-200 dark:border-dark-border/20 rounded-2xl">
                            <h3 className="font-semibold text-kost-dark dark:text-mint-50 mb-4 flex items-center gap-2">
                                <Home className="w-4 h-4 text-primary" />
                                Deskripsi Properti
                            </h3>

                            <div className="grid md:grid-cols-2 gap-6">
                                <InfoBlock label="Nama Kos" value={application.name} />
                                <InfoBlock label="Alamat" value={application.address} />
                                <InfoBlock label="Kota" value={application.city} />
                                <InfoBlock label="Aturan" value={application.rules} />
                                <InfoBlock label="Deskripsi" value={application.description} />
                            </div>
                        </div>

                        {/* FOTO */}
                        <div className="bg-white dark:bg-dark-card rounded-2xl p-6 border border-mint-200 dark:border-dark-border/20 rounded-2xl">
                            <h3 className="font-semibold text-kost-dark dark:text-mint-50 mb-4 flex items-center gap-2">
                                <FileText className="w-4 h-4 text-primary" />
                                Dokumen & Foto
                            </h3>

                            <div className="grid md:grid-cols-2 gap-6">
                                <img
                                    src={getImagePath(application.images?.[0])}
                                    className="rounded-xl h-48 w-full object-cover"
                                />

                                <img
                                    src={getImagePath(application.documents?.[0])}
                                    className="rounded-xl h-48 w-full object-cover"
                                />
                            </div>

                            <div className="mt-6 flex justify-between items-center bg-mint-50 dark:bg-dark-bg p-4 rounded-xl">
                                <span className="text-sm text-kost-dark dark:text-mint-50">
                                    Dokumen tambahan
                                </span>

                                <a
                                    href={getImagePath(application.documents?.[1])}
                                    target="_blank"
                                    className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg text-xs font-semibold border border-mint-200 dark:border-dark-border/20"
                                >
                                    Lihat <ExternalLink className="w-3 h-3" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="space-y-6">

                        {/* MAP */}
                        <div className="bg-white dark:bg-dark-card rounded-2xl border border-mint-200 dark:border-dark-border/20  rounded-2xl">
                            <div className="p-4 border-b border-mint-200 dark:border-dark-border text-sm font-semibold text-kost-dark dark:text-mint-50 flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-primary" />
                                Lokasi
                            </div>

                            <div className="h-60">
                                <MapContainer
                                    center={[application.latitude, application.longitude]}
                                    zoom={15}
                                    style={{ height: "100%", width: "100%" }}
                                >
                                    <GoogleTileLayer />
                                    <Marker position={[application.latitude, application.longitude]}>
                                        <Popup>{application.name}</Popup>
                                    </Marker>
                                </MapContainer>
                            </div>
                        </div>

                        {/* USER */}
                        <div className="bg-white dark:bg-dark-card rounded-2xl p-6 border border-mint-200 dark:border-dark-border/20 rounded-2xl">
                            <h4 className="text-sm font-semibold mb-4 text-kost-dark dark:text-mint-50">
                                Kontak Pemohon
                            </h4>

                            <div className="space-y-4">
                                <ProfileItem icon={<User />} label="Nama" value={application.user?.name} />
                                <ProfileItem icon={<Mail />} label="Email" value={application.user?.email} />
                                <ProfileItem icon={<Phone />} label="Telepon" value={application.user?.phone} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* ACTION */}
                {application.status === "pending" && (
                    <div className="flex gap-4 pt-4">
                        <button
                            onClick={handleReject}
                            className="flex-1 py-3 rounded-xl border border-red-300 text-red-500 hover:bg-red-500 hover:text-white transition"
                        >
                            Tolak
                        </button>

                        <button
                            onClick={handleApprove}
                            className="flex-1 py-3 rounded-xl bg-primary text-white hover:opacity-90 transition"
                        >
                            Approve
                        </button>
                    </div>
                )}

                {application.status === "approved" && (
                    <div className="p-4 bg-white dark:bg-dark-card rounded-2xl rounded-xl text-center text-sm font-semibold mb-4 text-kost-dark dark:text-mint-50 border border-mint-200 dark:border-dark-border/20 rounded-2xl">
                        Pengajuan telah disetujui
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}