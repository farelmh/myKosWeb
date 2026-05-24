import { Link } from "@inertiajs/react";
import { Eye, Home, MapPin, CheckCircle, XCircle, Clock } from "lucide-react";

const StatusBadge = ({ status }) => {
    const isApproved = status === "approved";
    const isRejected = status === "rejected";

    return (
        <span className={`
            px-2.5 py-1 rounded-full text-xs font-medium border
            ${isApproved
                ? "bg-mint-200/60 dark:bg-mint-200/20 text-kost-dark dark:text-mint-100 border-mint-200 dark:border-mint-300/20"
                : isRejected
                    ? "bg-red-50 dark:bg-red-500/10 text-red-500 dark:text-red-400 border-red-200 dark:border-red-500/20"
                    : "bg-yellow-50 dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-500/20"
            }
        `}>
            {isApproved ? "Disetujui" : isRejected ? "Ditolak" : "Menunggu"}
        </span>
    );
};

const StatusIcon = ({ status }) => {
    if (status === "approved") return <CheckCircle className="w-3.5 h-3.5 text-mint-300" />;
    if (status === "rejected") return <XCircle     className="w-3.5 h-3.5 text-red-400"  />;
    return                            <Clock       className="w-3.5 h-3.5 text-yellow-500" />;
};

export default function TablePengajuan({ applications }) {
    return (
        <div className="mt-8">

            <div className="
                hidden md:block rounded-xl overflow-hidden
                bg-white        dark:bg-dark-card
                border border-mint-200 dark:border-dark-border/20
                transition-colors duration-300
            ">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-mint-200 dark:border-dark-border/20">
                            <th className="p-4 text-left text-xs font-medium text-kost-muted dark:text-mint-100/40">Nama Kos</th>
                            <th className="p-4 text-left text-xs font-medium text-kost-muted dark:text-mint-100/40">Alamat</th>
                            <th className="p-4 text-left text-xs font-medium text-kost-muted dark:text-mint-100/40">Kota</th>
                            <th className="p-4 text-left text-xs font-medium text-kost-muted dark:text-mint-100/40">Status</th>
                            <th className="p-4 text-left text-xs font-medium text-kost-muted dark:text-mint-100/40">Alasan Penolakan</th>
                            <th className="p-4 text-right text-xs font-medium text-kost-muted dark:text-mint-100/40">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {applications.length > 0 ? (
                            applications.map((application) => (
                                <tr
                                    key={application.id}
                                    className="
                                        border-b last:border-0
                                        border-mint-200 dark:border-dark-border/20
                                        hover:bg-mint-50 dark:hover:bg-dark-bg
                                        transition
                                    "
                                >
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="
                                                w-8 h-8 rounded-lg flex-shrink-0
                                                flex items-center justify-center
                                                bg-mint-100      dark:bg-mint-200/10
                                                border border-mint-200 dark:border-mint-300/20
                                                text-mint-300    dark:text-mint-200
                                            ">
                                                <Home size={15} />
                                            </div>
                                            <span className="text-sm font-medium text-kost-dark dark:text-mint-50">
                                                {application.name}
                                            </span>
                                        </div>
                                    </td>

                                    <td className="p-4 text-sm text-kost-muted dark:text-mint-100/50 max-w-[180px]">
                                        <span className="line-clamp-1">{application.address || "-"}</span>
                                    </td>

                                    <td className="p-4 text-sm text-kost-muted dark:text-mint-100/50">
                                        {application.city || "-"}
                                    </td>

                                    <td className="p-4">
                                        <StatusBadge status={application.status} />
                                    </td>

                                    <td className="p-4 text-sm max-w-[180px]">
                                        {application.status === "rejected" && application.rejection_reason
                                            ? <span className="text-red-400 dark:text-red-400/70 line-clamp-1">
                                                {application.rejection_reason}
                                              </span>
                                            : <span className="text-kost-muted dark:text-mint-100/30">-</span>
                                        }
                                    </td>

                                    <td className="p-4">
                                        <div className="flex justify-end">
                                            <Link
                                                href={`/admin/request/${application.id}`}
                                                className="
                                                    inline-flex items-center gap-2
                                                    px-3 py-1.5 rounded-lg text-sm transition
                                                    bg-mint-50       dark:bg-dark-bg
                                                    border border-mint-200 dark:border-dark-border/20
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
                            ))
                        ) : (
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

            <div className="md:hidden space-y-3">
                {applications.length > 0 ? (
                    applications.map((application) => (
                        <div
                            key={application.id}
                            className="
                                rounded-xl p-2 
                                bg-white        dark:bg-dark-card
                                border border-mint-200 dark:border-dark-border/20
                                transition-colors duration-300
                            "
                        >
                            <div className="flex items-start justify-between gap-3 mb-3">
                                <div className="flex items-center gap-3 min-w-0">
                                    <div className="
                                        w-9 h-9 rounded-lg flex-shrink-0
                                        flex items-center justify-center
                                        bg-mint-100      dark:bg-mint-200/10
                                        border border-mint-200 dark:border-mint-300/20
                                        text-mint-300    dark:text-mint-200
                                    ">
                                        <Home size={16} />
                                    </div>
                                    <p className="text-sm font-medium text-kost-dark dark:text-mint-50 truncate">
                                        {application.name}
                                    </p>
                                </div>

                                <Link
                                    href={`/admin/request/${application.id}`}
                                    className="
                                        flex-shrink-0 flex items-center gap-1.5
                                        px-3 py-1.5 rounded-lg text-xs transition
                                        bg-mint-50       dark:bg-dark-bg
                                        border border-mint-200 dark:border-dark-border/20
                                        text-kost-muted  dark:text-mint-100/50
                                        hover:bg-mint-200 dark:hover:bg-mint-200/20
                                        hover:text-kost-dark dark:hover:text-mint-50
                                    "
                                >
                                    <Eye className="w-3.5 h-3.5" />
                                    Review
                                </Link>
                            </div>

                            <div className="space-y-1.5 pl-12">
                                <div className="flex items-center gap-2 text-xs text-kost-muted dark:text-mint-100/50">
                                    <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-mint-300" />
                                    <span className="truncate">
                                        {application.address || "-"}, {application.city || "-"}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <StatusIcon status={application.status} />
                                    <StatusBadge status={application.status} />
                                </div>

                                {application.status === "rejected" && application.rejection_reason && (
                                    <p className="text-xs text-red-400 dark:text-red-400/70 line-clamp-2">
                                        Alasan: {application.rejection_reason}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="
                        flex flex-col items-center justify-center py-14 gap-2
                        rounded-xl border border-dashed
                        border-mint-200 dark:border-dark-border/20
                        bg-white dark:bg-dark-card
                    ">
                        <Home className="w-8 h-8 text-mint-200 dark:text-mint-200/30" />
                        <p className="text-sm text-kost-muted dark:text-mint-100/30">
                            Tidak ada data pengajuan
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}