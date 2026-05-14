import { Pencil, Trash2 } from "lucide-react";

export default function TableTenants({ tenants }) {
    return (
        <div className="mt-8">
            {/* WRAPPER */}
            <div
                className="
                    rounded-xl overflow-hidden
                    bg-white dark:bg-dark-card
                    border
                    border-mint-200 dark:border-dark-border/20
                    transition-colors duration-300
                "
            >
                {/* TABLE */}
                <table className="w-full">
                    {/* HEADER */}
                    <thead>
                        <tr className="border-b border-mint-200 dark:border-dark-border/20">
                            <th className="p-4 text-left text-xs font-medium text-kost-muted dark:text-mint-100/40">
                                Name
                            </th>

                            <th className="p-4 text-left text-xs font-medium text-kost-muted dark:text-mint-100/40">
                                Email
                            </th>

                            <th className="p-4 text-left text-xs font-medium text-kost-muted dark:text-mint-100/40">
                                No Telp
                            </th>

                            <th className="p-4 text-left text-xs font-medium text-kost-muted dark:text-mint-100/40">
                                Tipe Kamar
                            </th>

                            <th className="p-4 text-right text-xs font-medium text-kost-muted dark:text-mint-100/40">
                                Action
                            </th>
                        </tr>
                    </thead>

                    {/* BODY */}
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
                                    {/* USER */}
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
                                                {tenant.name.charAt(0)}
                                            </div>

                                            <span className="text-sm font-medium text-kost-dark dark:text-mint-50 capitalize">
                                                {tenant.name}
                                            </span>
                                        </div>
                                    </td>

                                    {/* EMAIL */}
                                    <td className="p-4 text-sm text-kost-muted dark:text-mint-100/50">
                                        {tenant.email}
                                    </td>

                                    {/* PHONE */}
                                    <td className="p-4 text-sm text-kost-muted dark:text-mint-100/50">
                                        {tenant.phone || "-"}
                                    </td>

                                    {/* ROOM TYPE */}
                                    <td className="p-4">
                                        <span
                                            className="
                                                px-3 py-1 rounded-full text-xs font-medium
                                                bg-mint-200/50 text-kost-dark
                                                dark:bg-mint-200/10 dark:text-mint-100
                                            "
                                        >
                                            {tenant.room_type || "Standard"}
                                        </span>
                                    </td>

                                    {/* ACTION */}
                                    <td className="p-4">
                                        <div className="flex justify-end gap-2">
                                            {/* EDIT */}
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

                                            {/* DELETE */}
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
                            /* EMPTY STATE */
                            <tr>
                                <td colSpan="5" className="text-center py-12">
                                    <p className="text-sm text-kost-muted dark:text-mint-100/30">
                                        Tidak ada data penyewa
                                    </p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}