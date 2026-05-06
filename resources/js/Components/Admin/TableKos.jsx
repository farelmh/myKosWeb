import { Pencil, Trash2 } from "lucide-react";

export default function TableKos({ kos, onEdit }) {
    return (
        <div className="mt-6">
            <div className="bg-[#12122a] border border-white/10 rounded-xl overflow-hidden">
                <table className="w-full">

                    <thead className="text-gray-400 text-sm border-b border-white/10 bg-white/5">
                        <tr>
                            <th className="p-4 text-left">Kos</th>
                            <th className="p-4 text-left">Lokasi</th>
                            <th className="p-4 text-left">Harga</th>
                            <th className="p-4 text-left">Status</th>
                            <th className="p-4 text-right">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {kos.length > 0 ? (
                            kos.map((item) => (
                                <tr
                                    key={item.id}
                                    className="border-t border-white/10 hover:bg-white/5"
                                >
                                    <td className="p-4">{item.name}</td>
                                    <td className="p-4 text-gray-400 text-sm">
                                        {item.location}
                                    </td>
                                    <td className="p-4">
                                        Rp {item.price?.toLocaleString()}
                                    </td>
                                    <td className="p-4">
                                        <span className="px-3 py-1 text-xs bg-emerald-500/20 text-emerald-300 rounded-full">
                                            Aktif
                                        </span>
                                    </td>

                                    <td className="p-4 text-right">
                                        <button
                                            onClick={() => onEdit(item)} // ✅ FIX DISINI
                                            className="p-2 bg-white/5 rounded-lg hover:bg-indigo-500/20"
                                        >
                                            <Pencil className="w-4 h-4 text-gray-400" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center py-10 text-gray-500">
                                    Tidak ada data
                                </td>
                            </tr>
                        )}
                    </tbody>

                </table>
            </div>
        </div>
    );
}