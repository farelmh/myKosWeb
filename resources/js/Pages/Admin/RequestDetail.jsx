import AdminLayout from "@/Layouts/AdminLayout";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Check, X, MapPin, Phone, Mail, User, Home, FileText, ExternalLink, ShieldCheck } from "lucide-react";
import "leaflet/dist/leaflet.css";
import GoogleTileLayer from "@/Components/Map/GoogleTileLayer";
import { router } from "@inertiajs/react";

function InfoBlock({ label, value }) {
    return (
        <div>
            <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-[0.2em] mb-1">{label}</p>
            <p className="text-gray-200 text-sm leading-relaxed">{value || '-'}</p>
        </div>
    );
}

function ProfileItem({ icon, label, value }) {
    return (
        <div className="flex items-center gap-4 group">
            <div className="p-2 bg-white/5 rounded-lg text-gray-500 group-hover:text-indigo-400 transition-colors">{icon}</div>
            <div>
                <p className="text-[9px] text-gray-500 font-bold uppercase tracking-tight">{label}</p>
                <p className="text-sm text-gray-200 font-medium">{value}</p>
            </div>
        </div>
    );
}

export default function RequestDetail({ application }) {

    const handleApprove = () => {
        router.put(route('admin.request.update', application.id), {
        status: 'approved'
        });
    }

    const handleReject = () => {
        const reason = prompt('Masukkan Alasan Penolakan: ');
        if ( reason ) {
            router.put(route('admin.request.update', application.id), {
            status: 'rejected',
            rejection_reason: reason
        });
        }
    }

    const getImagePath = (item) => item ? `/storage/${item.image_path || item.file_path}` : null;

    return (
        <AdminLayout>
            <div className="max-w-7xl mx-auto p-6 space-y-6">
                
                {/* Header Section */}
                <div className="flex justify-between items-center bg-[#0f0f2a] p-6 rounded-2xl border border-white/10 shadow-xl">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-indigo-500/20 rounded-xl">
                            <ShieldCheck className="w-6 h-6 text-indigo-400" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-white uppercase tracking-tight">{application.name}</h1>
                            <p className="text-gray-400 text-sm italic">{application.city}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <span className="block text-[10px] text-gray-500 font-bold uppercase mb-1">Status Saat Ini</span>
                        <span className={`px-4 py-1.5 rounded-full text-xs font-bold border ${
                            application.status === 'approved' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                            'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                        }`}>
                            {application.status}
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* KOLOM KIRI: INFO & DOKUMEN */}
                    <div className="lg:col-span-2 space-y-6">
                        
                        {/* 1. Informasi Detail */}
                        <section className="bg-[#0f0f2a] rounded-2xl border border-white/10 p-8 shadow-lg">
                            <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                                <Home className="w-5 h-5 text-indigo-400" /> Deskripsi Properti
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <InfoBlock label="Nama Kos" value={application.name} />
                                    <InfoBlock label="Alamat Lengkap" value={application.address} />
                                    <InfoBlock label="Kota" value={application.city} />
                                </div>
                                <div className="space-y-6">
                                    <InfoBlock label="Aturan Kos" value={application.rules} />
                                    <InfoBlock label="Deskripsi" value={application.description} />
                                </div>
                            </div>
                        </section>

                        {/* 2. Foto & Dokumen */}
                        <section className="bg-[#0f0f2a] rounded-2xl border border-white/10 p-8 shadow-lg">
                            <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                                <FileText className="w-5 h-5 text-indigo-400" /> Dokumen & Foto Verifikasi
                            </h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                {/* Foto Kos */}
                                <div className="space-y-3">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Foto Depan Kos</label>
                                    <div className="rounded-xl overflow-hidden border border-white/10 aspect-video bg-black/20">
                                        <img 
                                            src={getImagePath(application.images?.[0])} 
                                            alt="Foto Kos"
                                            className="w-full h-full object-cover"
                                            onError={(e) => e.target.src = 'https://placehold.co/600x400/0f0f2a/indigo?text=Foto+Tidak+Ditemukan'}
                                        />
                                    </div>
                                </div>

                                {/* Foto KTP */}
                                <div className="space-y-3">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Identitas (KTP)</label>
                                    <div className="rounded-xl overflow-hidden border border-white/10 aspect-video bg-black/20">
                                        <img 
                                            src={getImagePath(application.documents?.[0])} 
                                            alt="Foto KTP"
                                            className="w-full h-full object-cover"
                                            onError={(e) => e.target.src = 'https://placehold.co/600x400/0f0f2a/indigo?text=KTP+Tidak+Ditemukan'}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Dokumen Kepemilikan (PDF / Penunjang) */}
                            <div className="p-5 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-between group hover:border-indigo-500/30 transition-all">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-indigo-500/10 rounded-xl group-hover:bg-indigo-500/20">
                                        <FileText className="w-6 h-6 text-indigo-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-white tracking-tight">Dokumen Kepemilikan / Penunjang</p>
                                        <p className="text-xs text-gray-500">Klik untuk meninjau validitas sertifikat</p>
                                    </div>
                                </div>
                                <a 
                                    href={getImagePath(application.documents?.[1])} 
                                    target="_blank" 
                                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg transition"
                                >
                                    BUKA DOKUMEN <ExternalLink className="w-3 h-3" />
                                </a>
                            </div>
                        </section>
                    </div>

                    {/* KOLOM KANAN: MAP & PEMOHON */}
                    <div className="space-y-6">
                        {/* Map Box */}
                        <div className="bg-[#0f0f2a] rounded-2xl border border-white/10 overflow-hidden shadow-lg">
                            <div className="p-4 border-b border-white/5 bg-white/5">
                                <h4 className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-indigo-400" /> Peta Lokasi
                                </h4>
                            </div>
                            <div className="h-60 z-0">
                                <MapContainer
                                    center={[application.latitude, application.longitude]}
                                    zoom={15}
                                    style={{ height: "100%", width: "100%" }}
                                    scrollWheelZoom={false}
                                >
                                    <GoogleTileLayer />
                                    <Marker position={[application.latitude, application.longitude]}>
                                        <Popup>{application.name}</Popup>
                                    </Marker>
                                </MapContainer>
                            </div>
                        </div>

                        {/* User Profil Card */}
                        <div className="bg-[#0f0f2a] rounded-2xl border border-white/10 p-6 shadow-lg">
                            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6 border-b border-white/5 pb-2">Kontak Pemohon</h4>
                            <div className="space-y-5">
                                <ProfileItem icon={<User className="w-4 h-4" />} label="Nama Pemilik" value={application.user?.name} />
                                <ProfileItem icon={<Mail className="w-4 h-4" />} label="Email Terdaftar" value={application.user?.email} />
                                <ProfileItem icon={<Phone className="w-4 h-4" />} label="Nomor WhatsApp" value={application.user?.phone || 'Tidak Ada Nomor'} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tampilkan tombol hanya jika status masih 'pending' atau status awal pengajuan */}
                {application.status !== 'approved' && application.status !== 'rejected' && (
                    <div className="flex gap-4 pt-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <button 
                            className="flex-1 flex items-center justify-center gap-3 py-4 rounded-2xl border border-red-500/30 bg-red-500/10 text-red-500 font-bold hover:bg-red-500 hover:text-white transition-all shadow-lg"
                            onClick={handleReject}
                        >
                            <X className="w-5 h-5" /> TOLAK PENGAJUAN
                        </button>
                        <button 
                            className="flex-[2] flex items-center justify-center gap-3 py-4 rounded-2xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-500/20"
                            onClick={handleApprove}
                        >
                            <Check className="w-5 h-5" /> KONFIRMASI & PUBLIKASIKAN
                        </button>
                    </div>
                )}

                {/* Opsional: Tampilkan pesan jika sudah diproses */}
                {application.status === 'approved' && (
                    <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-400 text-center font-medium">
                        Pengajuan ini telah disetujui dan data kos telah dipublikasikan.
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}