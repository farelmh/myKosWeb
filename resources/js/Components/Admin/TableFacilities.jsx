import { Pencil, Trash2, Box } from "lucide-react";
import { Link } from "@inertiajs/react";

export default function TableFacilities({ facilities }) {
    return (
        <div className="mt-8">

            {/* WRAPPER */}
            <div className="
                rounded-xl overflow-hidden
                bg-white        dark:bg-dark-card
                border
                border-mint-200 dark:border-dark-border/20
                transition-colors duration-300
            ">
                {/* TABLE */}
                <table className="w-full">

                    {/* HEADER */}
                    <thead>
                        <tr className="border-b border-mint-200 dark:border-dark-border/20">
                            <th className="p-4 text-left text-xs font-medium text-kost-muted dark:text-mint-100/40">
                                Fasilitas
                            </th>
                            <th className="p-4 text-left text-xs font-medium text-kost-muted dark:text-mint-100/40">
                                Tipe Fasilitas
                            </th>
                            <th className="p-4 text-left text-xs font-medium text-kost-muted dark:text-mint-100/40">
                                Nama Icon
                            </th>
                            <th className="p-4 text-right text-xs font-medium text-kost-muted dark:text-mint-100/40">
                                Action
                            </th>
                        </tr>
                    </thead>

                    {/* BODY */}
                    <tbody>
                        {facilities.length > 0 ? (
                            facilities.map((facility) => (
                                <tr
                                    key={facility.id}
                                    className="
                                        border-b last:border-0
                                        border-mint-200 dark:border-dark-border/20
                                        hover:bg-mint-50 dark:hover:bg-dark-bg
                                        transition
                                    "
                                >
                                    {/* NAMA FASILITAS */}
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
                                                <Box size={15} />
                                            </div>
                                            <span className="text-sm font-medium text-kost-dark dark:text-mint-50">
                                                {facility.name}
                                            </span>
                                        </div>
                                    </td>

                                    {/* TIPE */}
                                    <td className="p-4">
                                        <span className={`
                                            inline-flex items-center px-2.5 py-0.5
                                            rounded-full text-xs font-medium
                                            border
                                            ${facility.type === "property"
                                                ? "bg-mint-100 dark:bg-mint-200/10 text-kost-dark dark:text-mint-100 border-mint-200 dark:border-mint-300/20"
                                                : "bg-mint-50  dark:bg-mint-300/10 text-mint-300 dark:text-mint-300 border-mint-200 dark:border-mint-300/20"
                                            }
                                        `}>
                                            {facility.type}
                                        </span>
                                    </td>

                                    {/* ICON NAME */}
                                    <td className="p-4">
                                        <span className="
                                            text-sm font-mono
                                            text-kost-muted dark:text-mint-100/50
                                        ">
                                            {facility.icon || "-"}
                                        </span>
                                    </td>

                                    {/* ACTION */}
                                    <td className="p-4">
                                        <div className="flex justify-end items-center gap-2">

                                            {/* Edit */}
                                            <Link
                                                href={route("admin.facilities.edit", facility.id)}
                                                title="Edit Fasilitas"
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
                                            </Link>

                                            {/* Hapus */}
                                            <button
                                                title="Hapus Fasilitas"
                                                onClick={() => {
                                                    if (confirm("Yakin ingin menghapus fasilitas ini?")) {
                                                        // router.delete(route('admin.facilities.destroy', facility.id))
                                                    }
                                                }}
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
                            ))
                        ) : (
                            /* EMPTY STATE */
                            <tr>
                                <td colSpan="4" className="text-center py-14">
                                    <div className="flex flex-col items-center gap-2">
                                        <Box className="w-8 h-8 text-mint-200 dark:text-mint-200/30" />
                                        <p className="text-sm text-kost-muted dark:text-mint-100/30">
                                            Tidak ada data fasilitas
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