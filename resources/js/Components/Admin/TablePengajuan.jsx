import { Link } from "@inertiajs/react";
import { Eye, FileText } from "lucide-react"; // Pastikan lucide-react terinstall

export default function TablePengajuan({ applications }) {
    return (
        <div className="mt-8">
            <div className="bg-[#0f0f2a] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
                <table className="w-full">
                    <thead className="text-gray-400 text-sm border-b border-white/10 bg-white/5 uppercase tracking-wider">
                        <tr>
                            <th className="p-4 text-left font-semibold">Nama Kos</th>
                            <th className="p-4 text-left font-semibold">Alamat</th>
                            <th className="p-4 text-left font-semibold">Kota</th>
                            <th className="p-4 text-left font-semibold">Status</th>
                            <th className="p-4 text-center font-semibold">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {applications.length > 0 ? (
                            applications.map((application) => (
                                <tr
                                    key={application.id}
                                    className="border-t border-white/10 hover:bg-white/5 transition"
                                >
                                    <td className="p-4">
                                        <span className="font-medium text-white">
                                            {application.name}
                                        </span>
                                    </td>

                                    <td className="p-4 text-gray-400 text-sm">
                                        {application.address}
                                    </td>

                                    <td className="p-4 text-gray-400 text-sm">
                                        {application.city}
                                    </td>

                                    <td className="p-4">
                                        <span
                                            className={`px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-tight ${
                                                application.status === 'approved'
                                                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                                                    : application.status === 'rejected'
                                                    ? "bg-red-500/20 text-red-400 border border-red-500/30"
                                                    : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                                            }`}
                                        >
                                            {application.status}
                                        </span>
                                    </td>

                                    {/* BAGIAN ACTION TERBARU */}
                                    <td className="p-4 text-center">
                                        <Link
                                            href={`/admin/pengajuan/${application.id}`}
                                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 hover:bg-indigo-500 hover:text-white transition-all group"
                                        >
                                            <FileText className="w-4 h-4" />
                                            <span className="text-sm font-medium">Review</span>
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center py-16">
                                    <div className="flex flex-col items-center gap-2">
                                        <span className="text-gray-500 text-sm">Belum ada pengajuan kos yang masuk.</span>
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