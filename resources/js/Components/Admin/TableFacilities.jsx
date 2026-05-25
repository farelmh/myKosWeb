import { Pencil, Trash2, Box, Tag, Code2 } from "lucide-react";
import { Link, router } from "@inertiajs/react";
import Swal from "sweetalert2";

const confirmDelete = (callback) => {
    Swal.fire({
        title: "Hapus fasilitas?",
        text: "Fasilitas yang dihapus tidak dapat dikembalikan.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ef4444",
        cancelButtonColor: "#64748b",
        confirmButtonText: "Ya, hapus",
        cancelButtonText: "Batal",
        background: "#0f172a",
        color: "#fff",
    }).then((result) => {
        if (result.isConfirmed) {
            callback();
        }
    });
};

const TypeBadge = ({ type }) => {

    const isProperty = type === "property";

    return (
        <span
            className={`
                inline-flex items-center px-2.5 py-0.5
                rounded-full text-xs font-medium border capitalize
                ${
                    isProperty
                        ? "bg-mint-100 dark:bg-mint-200/10 text-kost-dark dark:text-mint-100 border-mint-200 dark:border-mint-300/20"
                        : "bg-mint-50 dark:bg-mint-300/10 text-mint-300 dark:text-mint-300 border-mint-200 dark:border-mint-300/20"
                }
            `}
        >
            {type}
        </span>
    );
};

const FacilityIcon = () => (
    <div
        className="
            w-9 h-9 rounded-lg flex-shrink-0
            flex items-center justify-center
            bg-mint-100 dark:bg-mint-200/10
            border border-mint-200 dark:border-mint-300/20
            text-mint-300 dark:text-mint-200
        "
    >
        <Box size={16} />
    </div>
);

export default function TableFacilities({ facilities = [] }) {
    return (
        <div className="mt-8">
            <div
                className="
                    hidden md:block
                    rounded-xl overflow-hidden
                    bg-white dark:bg-dark-card
                    border border-mint-200 dark:border-dark-border/20
                    transition-colors duration-300
                "
            >
                <table className="w-full">
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
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <FacilityIcon />
                                            <span className="text-sm font-medium text-kost-dark dark:text-mint-50">
                                                {facility.name}
                                            </span>
                                        </div>
                                    </td>

                                    <td className="p-4">
                                        <TypeBadge type={facility.type} />
                                    </td>

                                    <td className="p-4">
                                        <span className="text-sm font-mono text-kost-muted dark:text-mint-100/50">
                                            {facility.icon || "-"}
                                        </span>
                                    </td>

                                    <td className="p-4">
                                        <div className="flex justify-end items-center gap-2">

                                            <button
                                                type="button"
                                                title="Hapus Fasilitas"
                                                onClick={() =>
                                                    confirmDelete(() =>
                                                        router.delete(route("admin.facilities.destroy", facility.id))
                                                    )
                                                }
                                                className="
                                                    p-2 rounded-lg transition group
                                                    bg-mint-50 dark:bg-dark-bg
                                                    border border-mint-200 dark:border-dark-border/20
                                                    hover:bg-red-50 dark:hover:bg-red-500/10
                                                    hover:border-red-200 dark:hover:border-red-500/20
                                                "
                                            >
                                                <Trash2 className="w-4 h-4 text-kost-muted dark:text-mint-100/40 group-hover:text-red-400" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
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

            <div className="md:hidden space-y-3">
                {facilities.length > 0 ? (
                    facilities.map((facility) => (
                        <div
                            key={facility.id}
                            className="
                                rounded-xl p-3
                                bg-white dark:bg-dark-card
                                border border-mint-200 dark:border-dark-border/20
                                transition-colors duration-300
                            "
                        >
                            <div className="flex items-start justify-between gap-3 mb-3">
                                <div className="flex items-center gap-3 min-w-0">
                                    <FacilityIcon />

                                    <div className="min-w-0">
                                        <p className="text-sm font-medium text-kost-dark dark:text-mint-50 truncate">
                                            {facility.name}
                                        </p>

                                        <div className="mt-1">
                                            <TypeBadge type={facility.type} />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-1.5 flex-shrink-0">

                                    <button
                                        type="button"
                                        title="Hapus Fasilitas"
                                        onClick={() =>
                                                    confirmDelete(() =>
                                                        router.delete(route("admin.facilities.destroy", facility.id))
                                                    )
                                                }
                                        className="
                                            p-2 rounded-lg transition group
                                            bg-mint-50 dark:bg-dark-bg
                                            border border-mint-200 dark:border-dark-border/20
                                            hover:bg-red-50 dark:hover:bg-red-500/10
                                            hover:border-red-200 dark:hover:border-red-500/20
                                        "
                                    >
                                        <Trash2 className="w-3.5 h-3.5 text-kost-muted dark:text-mint-100/40 group-hover:text-red-400" />
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-2 pl-12">
                                <div className="flex items-center gap-2 text-xs text-kost-muted dark:text-mint-100/50">
                                    <Tag className="w-3.5 h-3.5 flex-shrink-0 text-mint-300" />
                                    <span className="capitalize">
                                        Tipe: {facility.type || "-"}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2 text-xs text-kost-muted dark:text-mint-100/50">
                                    <Code2 className="w-3.5 h-3.5 flex-shrink-0 text-mint-300" />
                                    <span className="font-mono truncate">
                                        Icon: {facility.icon || "-"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div
                        className="
                            flex flex-col items-center justify-center py-14 gap-2
                            rounded-xl border border-dashed
                            border-mint-200 dark:border-dark-border/20
                            bg-white dark:bg-dark-card
                        "
                    >
                        <Box className="w-8 h-8 text-mint-200 dark:text-mint-200/30" />
                        <p className="text-sm text-kost-muted dark:text-mint-100/30">
                            Tidak ada data fasilitas
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}