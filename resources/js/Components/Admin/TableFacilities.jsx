import { Pencil, Trash2, Box } from "lucide-react";
import { Link } from "@inertiajs/react";

export default function TableFacilities({ facilities }) {
    return (
        <div className="mt-8">

            {/* WRAPPER */}
            <div className="bg-[#0f0f2a] border border-white/10 rounded-xl overflow-hidden">

                {/* TABLE */}
                <table className="w-full">
                    <thead className="text-gray-400 text-sm border-b border-white/10 bg-white/5 uppercase tracking-wider">
                        <tr>
                            <th className="p-4 text-left font-semibold">Fasilitas</th>
                            <th className="p-4 text-left font-semibold">Tipe Fasilitias</th>
                            <th className="p-4 text-left font-semibold">Nama Icon</th>
                            <th className="p-4 text-right font-semibold">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {facilities.length > 0 ? (
                            facilities.map((facility) => (
                                <tr
                                    key={facility.id}
                                    className="border-t border-white/10 hover:bg-white/5 transition"
                                >
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20">
                                                <Box size={16} />
                                            </div>
                                            <span className="font-semibold text-gray-200">
                                                {facility.name}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                                            facility.type === 'property' 
                                            ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' 
                                            : 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20'
                                        }`}>
                                            {facility.type}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <span className="font-medium text-white">
                                            {facility.icon || '-' }
                                        </span>
                                    </td>

                                    {/* BAGIAN ACTION TERBARU */}
                                    <td className="p-4 text-center">
                                        <div className="flex justify-end items-center gap-2">
                                            {/* Tombol Edit - Indigo/Blue */}
                                            <Link
                                                href={route('admin.facilities.edit', facility.id)}
                                                className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 hover:bg-indigo-500 hover:text-white transition-all duration-300 shadow-lg shadow-indigo-500/5"
                                                title="Edit Fasilitas"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </Link>

                                            {/* Tombol Hapus - Red */}
                                            <button
                                                onClick={() => {
                                                    if(confirm('Yakin ingin menghapus fasilitas ini?')) {
                                                        // logic delete di sini, misal: router.delete(...)
                                                    }
                                                }}
                                                className="p-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-300 shadow-lg shadow-red-500/5"
                                                title="Hapus Fasilitas"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center py-16">
                                    <div className="flex flex-col items-center gap-2">
                                        <span className="text-gray-500 text-sm">Tidak Ada Data</span>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}