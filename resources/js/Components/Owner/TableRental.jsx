import { Link } from "@inertiajs/react";
import { Eye,Home, User } from "lucide-react";

export default function TableRental({ rentals }) {
    return (
        <div className="mt-8">
            <div className="rounded-xl overflow-hidden
                bg-white        dark:bg-dark-card
                border
                border-mint-200 dark:border-dark-border/20
                transition-colors duration-300">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-mint-200 dark:border-dark-border/20">
                            <th className="p-4 text-left text-xs font-medium text-kost-muted dark:text-mint-100/40">
                            Nama Penyewa
                            </th>
                            <th className="p-4 text-left text-xs font-medium text-kost-muted dark:text-mint-100/40">
                            Tipe Kamar dipilih
                            </th>
                            <th className="p-4 text-left text-xs font-medium text-kost-muted dark:text-mint-100/40">
                            Tanggal Mulai Sewa
                            </th>
                            <th className="p-4 text-left text-xs font-medium text-kost-muted dark:text-mint-100/40">
                            Durasi
                            </th>
                            <th className="p-4 text-left text-xs font-medium text-kost-muted dark:text-mint-100/40">
                            Status
                            </th>
                            <th className="p-4 text-center text-xs font-medium text-kost-muted dark:text-mint-100/40">
                            Action
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {rentals.length > 0 ? (
                            rentals.map((rental) => {
                                const isApproved = rental.status === "approved";
                                const isRejected = rental.status === "rejected";

                                return (
                                    <tr
                                        key={rental.id}
                                        className="
                                            border-b last:border-0
                                            border-mint-200 dark:border-dark-border/20
                                            hover:bg-mint-50 dark:hover:bg-dark-bg
                                            transition
                                        "
                                    >
                                        {/* NAMA TENANT */}
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="
                                                    w-8 h-8 rounded-lg flex-shrink-0
                                                    flex items-center justify-center
                                                    bg-mint-100      dark:bg-mint-200/10
                                                    border
                                                    border-mint-200  dark:border-mint-300/20
                                                    text-mint-300    dark:text-mint-200
                                                ">
                                                    <User size={15} />
                                                </div>
                                                <span className="text-sm font-medium text-kost-dark dark:text-mint-50">
                                                    {rental.tenant.name}
                                                </span>
                                            </div>
                                        </td>

                                        {/* ALAMAT */}
                                        <td className="p-4 text-sm text-kost-muted dark:text-mint-100/50">
                                            {rental.roomType.name || "-"}
                                        </td>

                                        {/* KOTA */}
                                        <td className="p-4 text-sm text-kost-muted dark:text-mint-100/50">
                                            {new Date(rental.start_date).toLocaleDateString("id-ID") || "-"}
                                        </td>
                                        
                                        {/* KOTA */}
                                        <td className="p-4 text-sm text-kost-muted dark:text-mint-100/50">
                                            {rental.duration_value && rental.duration_type
                                                ? `${rental.duration_value} ${rental.duration_type === "monthly" ? "Bulan" : "Hari"}`
                                                : "-"
                                            }
                                        </td>

                                        {/* STATUS */}
                                        <td className="p-4">
                                            <span className={`
                                                px-3 py-1 rounded-full text-xs font-medium border
                                                ${isApproved
                                                    ? "bg-mint-200/60 dark:bg-mint-200/20 text-kost-dark dark:text-mint-100 border-mint-200 dark:border-mint-300/20"
                                                    : isRejected
                                                        ? "bg-red-50 dark:bg-red-500/10 text-red-500 dark:text-red-400 border-red-200 dark:border-red-500/20"
                                                        : "bg-yellow-50 dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-500/20"
                                                }
                                            `}>
                                                {isApproved
                                                    ? "Disetujui"
                                                    : isRejected
                                                        ? "Ditolak"
                                                        : "Menunggu"
                                                }
                                            </span>
                                        </td>

                                        {/* ACTION */}
                                        <td className="p-4">
                                            <div className="flex justify-end">
                                                <Link
                                                    href={`/owner/rental-request/${rental.id}`}
                                                    className="
                                                        inline-flex items-center gap-2
                                                        px-3 py-1.5 rounded-lg text-sm
                                                        font-medium transition group
                                                        bg-mint-50       dark:bg-dark-bg
                                                        border
                                                        border-mint-200  dark:border-dark-border/20
                                                        text-kost-muted  dark:text-mint-100/50
                                                        hover:bg-mint-200 dark:hover:bg-mint-200/20
                                                        hover:border-mint-300 dark:hover:border-mint-300/30
                                                        hover:text-kost-dark dark:hover:text-mint-50
                                                    "
                                                >
                                                    <Eye className="w-4 h-4" />
                                                    Review
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            /* EMPTY STATE */
                            <tr>
                                <td colSpan="6" className="text-center py-14">
                                    <div className="flex flex-col items-center gap-2">
                                        <Home className="w-8 h-8 text-mint-200 dark:text-mint-200/30" />
                                        <p className="text-sm text-kost-muted dark:text-mint-100/30">
                                            Tidak ada data pengajuan
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