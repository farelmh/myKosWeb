import { Link } from "@inertiajs/react";
import { Eye,Home } from "lucide-react";

export default function TablePengajuan({ applications }) {
    return (
        <div className="mt-8">
            <div className="rounded-xl overflow-hidden
                bg-white        dark:bg-dark-card
                border
                border-mint-200 dark:border-dark-border/20
                transition-colors duration-300">
                <table className="w-full">
                    <thead className="uppercase tracking-wider">
                        <tr className="border-b border-mint-200 dark:border-dark-border/20">
                            <th className="p-4 text-left text-xs font-medium text-kost-muted dark:text-mint-100/40">Nama Kos</th>
                            <th className="p-4 text-left text-xs font-medium text-kost-muted dark:text-mint-100/40">Alamat</th>
                            <th className="p-4 text-left text-xs font-medium text-kost-muted dark:text-mint-100/40">Kota</th>
                            <th className="p-4 text-left text-xs font-medium text-kost-muted dark:text-mint-100/40">Status</th>
                            <th className="p-4 text-left text-xs font-medium text-kost-muted dark:text-mint-100/40">Alasan Penolakan</th>
                            <th className="p-4 text-center text-xs font-medium text-kost-muted dark:text-mint-100/40">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {applications.length > 0 ? (
                            applications.map((application) => (
                                <tr
                                    key={application.id}
                                    className="border-b last:border-0
                                            border-mint-200 dark:border-dark-border/20
                                            hover:bg-mint-50 dark:hover:bg-dark-bg
                                            transition"
                                >
                                    <td className="p-4">
                                        <span className="w-8 h-8 rounded-lg flex-shrink-0
                                                    flex items-center justify-center
                                                    bg-mint-100      dark:bg-mint-200/10
                                                    border
                                                    border-mint-200  dark:border-mint-300/20
                                                    text-mint-300    dark:text-mint-200">
                                            {application.name}
                                        </span>
                                    </td>

                                    <td className="p-4 text-sm text-kost-muted dark:text-mint-100/50">
                                        {application.address}
                                    </td>

                                    <td className="p-4 text-sm text-kost-muted dark:text-mint-100/50">
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

                                    <td className="p-4 text-sm text-kost-muted dark:text-mint-100/50">
                                        {application.rejection_reason || '-'}
                                    </td>

                                    {/* BAGIAN ACTION TERBARU */}
                                    <td className="p-4 text-center">
                                        <Link
                                            href={`/admin/request/${application.id}`}
                                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 hover:bg-indigo-500 hover:text-white transition-all group"
                                        >
                                            <Eye className="w-4 h-4" />
                                            <span className="text-sm font-medium">Review</span>
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center py-14">
                                    <div className="flex flex-col items-center gap-2">
                                        <Home className="w-8 h-8 text-mint-200 dark:text-mint-200/30" />
                                        <p className="text-sm text-kost-muted dark:text-mint-100/30">
                                            Tidak ada data kos
                                        </p>
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