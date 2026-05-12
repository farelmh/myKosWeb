import { Link } from "@inertiajs/react";
import { Eye, Home } from "lucide-react";

export default function TableProperties({ properties }) {
    return (
        <div className="mt-8">
            <div
                className="rounded-xl overflow-hidden
                bg-white        dark:bg-dark-card
                border
                border-mint-200 dark:border-dark-border/20
                transition-colors duration-300"
            >
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-mint-200 dark:border-dark-border/20">
                            <th className="p-4 text-left text-xs font-medium text-kost-muted dark:text-mint-100/40">
                                Nama Kos
                            </th>
                            <th className="p-4 text-left text-xs font-medium text-kost-muted dark:text-mint-100/40">
                                Alamat
                            </th>
                            <th className="p-4 text-left text-xs font-medium text-kost-muted dark:text-mint-100/40">
                                Kota
                            </th>
                            <th className="p-4 text-left text-xs font-medium text-kost-muted dark:text-mint-100/40">
                                Nama Pemilik
                            </th>
                            <th className="p-4 text-center text-xs font-medium text-kost-muted dark:text-mint-100/40">
                                Action
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {properties.length > 0 ? (
                            properties.map((property) => (
                                <tr
                                        key={property.id}
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
                                                    w-8 h-8 rounded-lg flex-shrink-0
                                                    flex items-center justify-center
                                                    bg-mint-100      dark:bg-mint-200/10
                                                    border
                                                    border-mint-200  dark:border-mint-300/20
                                                    text-mint-300    dark:text-mint-200
                                                "
                                            >
                                                <Home size={15} />
                                            </div>
                                            <span className="text-sm font-medium text-kost-dark dark:text-mint-50">
                                                {property.name}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="p-4 text-sm text-kost-muted dark:text-mint-100/50">
                                        {property.address}
                                    </td>

                                    <td className="p-4 text-sm text-kost-muted dark:text-mint-100/50">
                                        {property.city}
                                    </td>

                                    <td className="p-4 text-sm text-kost-muted dark:text-mint-100/50">
                                        {property.owner.name}
                                    </td>

                                    {/* BAGIAN ACTION TERBARU */}
                                    <td className="p-4">
                                        <Link
                                            href={`/admin/properties/${property.id}`}
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
                                                Detail
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
