import { Pencil, Trash2, Home } from "lucide-react";

export default function TableKos({ kos, onEdit, onDelete }) {
    return (
        <div className="mt-6">
            <div className="
                rounded-xl overflow-hidden
                bg-white        dark:bg-dark-card
                border
                border-mint-200 dark:border-dark-border/20
                transition-colors duration-300
            ">
                <table className="w-full">

                    {/* HEADER */}
                    <thead>
                        <tr className="border-b border-mint-200 dark:border-dark-border/20">
                            <th className="p-4 text-left text-xs font-medium text-kost-muted dark:text-mint-100/40">
                                Kos
                            </th>
                            <th className="p-4 text-left text-xs font-medium text-kost-muted dark:text-mint-100/40">
                                Lokasi
                            </th>
                            <th className="p-4 text-left text-xs font-medium text-kost-muted dark:text-mint-100/40">
                                Harga
                            </th>
                            <th className="p-4 text-left text-xs font-medium text-kost-muted dark:text-mint-100/40">
                                Status
                            </th>
                            <th className="p-4 text-right text-xs font-medium text-kost-muted dark:text-mint-100/40">
                                Action
                            </th>
                        </tr>
                    </thead>

                    {/* BODY */}
                    <tbody>
                        {kos.length > 0 ? (
                            kos.map((item) => {
                                const isActive   = item.status === "aktif" || !item.status;
                                const isPending  = item.status === "pending";
                                const isInactive = item.status === "nonaktif";

                                return (
                                    <tr
                                        key={item.id}
                                        className="
                                            border-b last:border-0
                                            border-mint-200 dark:border-dark-border/20
                                            hover:bg-mint-50 dark:hover:bg-dark-bg
                                            transition
                                        "
                                    >
                                        {/* NAMA KOS */}
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
                                                    <Home size={15} />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-kost-dark dark:text-mint-50">
                                                        {item.name}
                                                    </p>
                                                    {item.owner && (
                                                        <p className="text-xs text-kost-muted dark:text-mint-100/40">
                                                            {item.owner}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </td>

                                        {/* LOKASI */}
                                        <td className="p-4 text-sm text-kost-muted dark:text-mint-100/50">
                                            {item.location || item.alamat || "-"}
                                        </td>

                                        {/* HARGA */}
                                        <td className="p-4 text-sm font-medium text-kost-dark dark:text-mint-50">
                                            {item.price
                                                ? `Rp ${item.price.toLocaleString("id-ID")}`
                                                : "-"
                                            }
                                        </td>

                                        {/* STATUS */}
                                        <td className="p-4">
                                            <span className={`
                                                px-3 py-1 rounded-full text-xs font-medium
                                                ${isActive
                                                    ? "bg-mint-200/60 dark:bg-mint-200/20 text-kost-dark dark:text-mint-100"
                                                    : isPending
                                                        ? "bg-yellow-50 dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-500/20"
                                                        : "bg-red-50 dark:bg-red-500/10 text-red-500 dark:text-red-400 border border-red-200 dark:border-red-500/20"
                                                }
                                            `}>
                                                {item.status
                                                    ? item.status.charAt(0).toUpperCase() + item.status.slice(1)
                                                    : "Aktif"
                                                }
                                            </span>
                                        </td>

                                        {/* ACTION */}
                                        <td className="p-4">
                                            <div className="flex justify-end items-center gap-2">

                                                {/* Edit */}
                                                <button
                                                    onClick={() => onEdit(item)}
                                                    title="Edit Kos"
                                                    className="
                                                        p-2 rounded-lg transition group
                                                        bg-mint-50       dark:bg-dark-bg
                                                        border
                                                        border-mint-200  dark:border-dark-border/20
                                                        hover:bg-mint-200 dark:hover:bg-mint-200/20
                                                        hover:border-mint-300 dark:hover:border-mint-300/30
                                                    "
                                                >
                                                    <Pencil className="
                                                        w-4 h-4
                                                        text-kost-muted        dark:text-mint-100/40
                                                        group-hover:text-kost-dark dark:group-hover:text-mint-50
                                                    " />
                                                </button>

                                                {/* Hapus */}
                                                <button
                                                    onClick={() => onDelete?.(item)}
                                                    title="Hapus Kos"
                                                    className="
                                                        p-2 rounded-lg transition group
                                                        bg-mint-50      dark:bg-dark-bg
                                                        border
                                                        border-mint-200 dark:border-dark-border/20
                                                        hover:bg-red-50  dark:hover:bg-red-500/10
                                                        hover:border-red-200 dark:hover:border-red-500/20
                                                    "
                                                >
                                                    <Trash2 className="
                                                        w-4 h-4
                                                        text-kost-muted  dark:text-mint-100/40
                                                        group-hover:text-red-400
                                                    " />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            /* EMPTY STATE */
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