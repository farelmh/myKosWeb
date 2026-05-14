import { Pencil, Trash2, Phone, CalendarDays } from "lucide-react";

const getStatusColor = (status) => {
    switch (status) {
        case "active":
            return "bg-mint-200/60 text-kost-dark dark:bg-mint-200/20 dark:text-mint-100";
        case "pending":
            return "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400";
        case "expired":
            return "bg-red-50 text-red-500 dark:bg-red-500/10 dark:text-red-400";
        default:
            return "bg-mint-50 text-kost-muted dark:bg-dark-bg dark:text-mint-100/60";
    }
};

export default function TableTenants({ tenants = [] }) {
    return (
        <div className="mt-8">
            <div
                className="
                    rounded-xl overflow-hidden
                    bg-white dark:bg-dark-card
                    border
                    border-mint-200 dark:border-dark-border/20
                    transition-colors duration-300
                "
            >
                <div className="flex items-center justify-between px-4 py-4 border-b border-mint-200 dark:border-dark-border/20">
                    <div>
                        <h2 className="text-sm font-semibold text-kost-dark dark:text-mint-50">
                            Daftar Penyewa
                        </h2>
                        <p className="text-xs text-kost-muted dark:text-mint-100/40 mt-1">
                            Semua data penghuni kos aktif.
                        </p>
                    </div>

                    <span
                        className="
                            px-3 py-1 rounded-full text-xs font-medium
                            bg-mint-200/60 text-kost-dark
                            dark:bg-mint-200/20 dark:text-mint-100
                        "
                    >
                        {tenants.length} Penyewa
                    </span>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[900px]">
                        <thead>
                            <tr className="border-b border-mint-200 dark:border-dark-border/20">
                                <th className="p-4 text-left text-xs font-medium text-kost-muted dark:text-mint-100/40">
                                    Penyewa
                                </th>
                                <th className="p-4 text-left text-xs font-medium text-kost-muted dark:text-mint-100/40">
                                    No. Telp
                                </th>
                                <th className="p-4 text-left text-xs font-medium text-kost-muted dark:text-mint-100/40">
                                    Tipe Kamar
                                </th>
                                <th className="p-4 text-left text-xs font-medium text-kost-muted dark:text-mint-100/40">
                                    Tanggal Sewa
                                </th>
                                <th className="p-4 text-left text-xs font-medium text-kost-muted dark:text-mint-100/40">
                                    Status
                                </th>
                                <th className="p-4 text-right text-xs font-medium text-kost-muted dark:text-mint-100/40">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {tenants.length > 0 ? (
                                tenants.map((tenant) => (
                                    <tr
                                        key={tenant.id}
                                        className="
                                            border-b last:border-0
                                            border-mint-200 dark:border-dark-border/20
                                            hover:bg-mint-50 dark:hover:bg-dark-bg
                                            transition
                                        "
                                    >
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className="
                                                        w-8 h-8 rounded-full flex-shrink-0
                                                        flex items-center justify-center
                                                        text-sm font-medium capitalize
                                                        bg-mint-200 dark:bg-mint-200/20
                                                        text-kost-dark dark:text-mint-50
                                                    "
                                                >
                                                    {tenant.name?.charAt(0)}
                                                </div>

                                                <div>
                                                    <p className="text-sm font-medium text-kost-dark dark:text-mint-50 capitalize">
                                                        {tenant.name}
                                                    </p>
                                                    <p className="text-xs text-kost-muted dark:text-mint-100/40 mt-0.5">
                                                        {tenant.email || "-"}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="p-4">
                                            <div className="flex items-center gap-2 text-sm text-kost-muted dark:text-mint-100/50">
                                                <Phone className="w-4 h-4 text-kost-muted dark:text-mint-100/40" />
                                                {tenant.phone || "-"}
                                            </div>
                                        </td>

                                        <td className="p-4">
                                            <span
                                                className="
                                                    px-3 py-1 rounded-full text-xs font-medium
                                                    bg-mint-200/50 text-kost-dark
                                                    dark:bg-mint-200/10 dark:text-mint-100
                                                "
                                            >
                                                {tenant.room_type?.name || "-"}
                                            </span>
                                        </td>

                                        <td className="p-4">
                                            <div className="flex items-center gap-2 text-sm text-kost-muted dark:text-mint-100/50">
                                                <CalendarDays className="w-4 h-4 text-kost-muted dark:text-mint-100/40" />
                                                {tenant.check_in || "-"}
                                            </div>
                                        </td>

                                        <td className="p-4">
                                            <span
                                                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(
                                                    tenant.status
                                                )}`}
                                            >
                                                {tenant.status || "active"}
                                            </span>
                                        </td>

                                        <td className="p-4">
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    className="
                                                        p-2 rounded-lg transition group
                                                        bg-mint-50 dark:bg-dark-bg
                                                        border
                                                        border-mint-200 dark:border-dark-border/20
                                                        hover:bg-mint-200 dark:hover:bg-mint-200/20
                                                    "
                                                >
                                                    <Pencil
                                                        className="
                                                            w-4 h-4
                                                            text-kost-muted dark:text-mint-100/40
                                                            group-hover:text-kost-dark
                                                            dark:group-hover:text-mint-50
                                                        "
                                                    />
                                                </button>

                                                <button
                                                    className="
                                                        p-2 rounded-lg transition group
                                                        bg-mint-50 dark:bg-dark-bg
                                                        border
                                                        border-mint-200 dark:border-dark-border/20
                                                        hover:bg-red-50 dark:hover:bg-red-500/10
                                                        hover:border-red-200 dark:hover:border-red-500/20
                                                    "
                                                >
                                                    <Trash2
                                                        className="
                                                            w-4 h-4
                                                            text-kost-muted dark:text-mint-100/40
                                                            group-hover:text-red-400
                                                        "
                                                    />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center py-12">
                                        <div className="flex flex-col items-center">
                                            <div
                                                className="
                                                    w-12 h-12 rounded-xl
                                                    bg-mint-50 dark:bg-dark-bg
                                                    flex items-center justify-center
                                                    mb-3
                                                "
                                            >
                                                👥
                                            </div>

                                            <p className="text-sm font-medium text-kost-dark dark:text-mint-50">
                                                Belum Ada Penyewa
                                            </p>

                                            <p className="text-sm text-kost-muted dark:text-mint-100/30 mt-1">
                                                Data penghuni kos akan muncul di sini.
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}