import { Eye, Trash2 } from "lucide-react";

export default function TableTransaksi({ transactions = [] }) {
    return (
        <div className="mt-8">

            {/* WRAPPER */}
            <div className="rounded-xl overflow-hidden
                bg-white        dark:bg-dark-card
                border
                border-mint-200 dark:border-dark-border/20
                transition-colors duration-300">

                <table className="w-full">

                    {/* HEADER */}
                    <thead className="uppercase tracking-wider">
                        <tr className="border-b border-mint-200 dark:border-dark-border/20">
                            <th className="p-4 text-left text-xs font-medium text-kost-muted dark:text-mint-100/40">User</th>
                            <th className="p-4 text-left text-xs font-medium text-kost-muted dark:text-mint-100/40">Kos</th>
                            <th className="p-4 text-left text-xs font-medium text-kost-muted dark:text-mint-100/40">Tanggal</th>
                            <th className="p-4 text-left text-xs font-medium text-kost-muted dark:text-mint-100/40">Total</th>
                            <th className="p-4 text-left text-xs font-medium text-kost-muted dark:text-mint-100/40">Status</th>
                            <th className="p-4 text-right text-xs font-medium text-kost-muted dark:text-mint-100/40">Action</th>
                        </tr>
                    </thead>

                    {/* BODY */}
                    <tbody>
                        {transactions.length > 0 ? (
                            transactions.map((trx) => {
                                const statusColor =
                                    trx.status === "paid"
                                        ? "bg-emerald-500/20 text-emerald-300"
                                        : trx.status === "pending"
                                        ? "bg-yellow-500/20 text-yellow-300"
                                        : "bg-red-500/20 text-red-300";

                                return (
                                    <tr
                                        key={trx.id}
                                        className="border-b last:border-0
                                            border-mint-200 dark:border-dark-border/20
                                            hover:bg-mint-50 dark:hover:bg-dark-bg
                                            transition"
                                    >
                                        {/* USER */}
                                        <td className="p-4 flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full flex-shrink-0
                                                    flex items-center justify-center
                                                    text-sm font-medium capitalize
                                                    bg-mint-200      dark:bg-mint-200/20
                                                    text-kost-dark   dark:text-mint-50">
                                                {trx.user.name.charAt(0)}
                                            </div>
                                            <span className="text-sm font-medium text-kost-dark dark:text-mint-50 capitalize">
                                                {trx.user.name}
                                            </span>
                                        </td>

                                        {/* KOS */}
                                        <td className="p-4 text-sm text-kost-muted dark:text-mint-100/50">
                                            {trx.kos.name}
                                        </td>

                                        {/* DATE */}
                                        <td className="p-4 text-sm text-kost-muted dark:text-mint-100/50">
                                            {trx.date}
                                        </td>

                                        {/* TOTAL */}
                                        <td className="p-4 text-sm text-kost-muted dark:text-mint-100/50">
                                            Rp {trx.total.toLocaleString()}
                                        </td>

                                        {/* STATUS */}
                                        <td className="p-4">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor}`}
                                            >
                                                {trx.status}
                                            </span>
                                        </td>

                                        {/* ACTION */}
                                        <td className="p-4">
                                            <div className="flex justify-end gap-2">

                                                {/* DETAIL */}
                                                <button className="p-2 rounded-lg bg-white/5 hover:bg-blue-500/20 transition group">
                                                    <Eye className="w-4 h-4 text-gray-400 group-hover:text-blue-300" />
                                                </button>

                                                <button className="
                                                    p-2 rounded-lg transition group
                                                    bg-mint-50      dark:bg-dark-bg
                                                    border
                                                    border-mint-200 dark:border-dark-border/20
                                                    hover:bg-red-50  dark:hover:bg-red-500/10
                                                    hover:border-red-200 dark:hover:border-red-500/20
                                                ">
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
                            <tr>
                                <td colSpan="5" className="text-center py-14">
                                    <div className="flex flex-col items-center gap-2">
                                        <p className="text-sm text-kost-muted dark:text-mint-100/30">
                                            Tidak ada Transaksi
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