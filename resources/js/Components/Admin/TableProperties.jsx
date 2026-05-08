import { Link } from "@inertiajs/react";
import { Eye } from "lucide-react";

export default function TableProperties({ properties }) {
    return (
        <div className="mt-8">
            <div className="bg-[#0f0f2a] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
                <table className="w-full">
                    <thead className="text-gray-400 text-sm border-b border-white/10 bg-white/5 uppercase tracking-wider">
                        <tr>
                            <th className="p-4 text-left font-semibold">Nama Kos</th>
                            <th className="p-4 text-left font-semibold">Alamat</th>
                            <th className="p-4 text-left font-semibold">Kota</th>
                            <th className="p-4 text-left font-semibold">Nama Pemilik</th>
                            <th className="p-4 text-center font-semibold">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {properties.length > 0 ? (
                            properties.map((property) => (
                                <tr
                                    key={property.id}
                                    className="border-t border-white/10 hover:bg-white/5 transition"
                                >
                                    <td className="p-4">
                                        <span className="font-medium text-white">
                                            {property.name}
                                        </span>
                                    </td>

                                    <td className="p-4 text-gray-400 text-sm">
                                        {property.address}
                                    </td>

                                    <td className="p-4 text-gray-400 text-sm">
                                        {property.city}
                                    </td>

                                    <td className="p-4 text-gray-400 text-sm">
                                        {property.owner.name}
                                    </td>

                                    {/* BAGIAN ACTION TERBARU */}
                                    <td className="p-4 text-center">
                                        <Link
                                            href={`/admin/properties/${property.id}`}
                                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 hover:bg-indigo-500 hover:text-white transition-all group"
                                        >
                                            <Eye className="w-4 h-4" />
                                            <span className="text-sm font-medium">Detail</span>
                                        </Link>
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