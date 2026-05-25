import { Link, router } from "@inertiajs/react";
import { Eye, Home, MapPin, Trash2, User } from "lucide-react";
import Swal from "sweetalert2";

const handleDelete = async (propertyId) => {

    const result = await Swal.fire({
        title: "Hapus Property?",
        text: "Property akan dihapus dari sistem.",
        icon: "warning",
        input: "textarea",
        inputLabel: "Alasan Penghapusan",
        inputPlaceholder: "Masukkan alasan penghapusan property...",
        inputAttributes: {
            maxlength: 255,
        },
        showCancelButton: true,
        confirmButtonText: "Hapus",
        cancelButtonText: "Batal",
        confirmButtonColor: "#ef4444",
        background: "#0f172a",
        color: "#fff",
        inputValidator: (value) => {
            if (!value) {
                return "Alasan wajib diisi";
            }
        }
    });

    if (result.isConfirmed) {

        router.delete(
            route('admin.properties.destroy', propertyId),
            {
                data: {
                    reason: result.value
                }
            }
        );

    }
};


export default function TableProperties({ properties }) {
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
                                Pemilik
                            </th>
                            <th className="p-4 text-right text-xs font-medium text-kost-muted dark:text-mint-100/40">
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
                                                {property.name}
                                            </span>
                                        </div>
                                    </td>

                                    <td className="p-4 text-sm text-kost-muted dark:text-mint-100/50 max-w-[200px]">
                                        <span className="line-clamp-1">{property.address}</span>
                                    </td>

                                    <td className="p-4 text-sm text-kost-muted dark:text-mint-100/50">
                                        {property.city}
                                    </td>

                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <div className="
                                                w-6 h-6 rounded-full flex-shrink-0
                                                flex items-center justify-center
                                                text-xs font-medium capitalize
                                                bg-mint-200 dark:bg-mint-200/20
                                                text-kost-dark dark:text-mint-50
                                            ">
                                                {property.owner?.name?.charAt(0)}
                                            </div>
                                            <span className="text-sm text-kost-muted dark:text-mint-100/50 capitalize">
                                                {property.owner?.name ?? "-"}
                                            </span>
                                        </div>
                                    </td>

                                    <td className="p-4">
                                        <div className="flex justify-end gap-2">
                                            <Link
                                                href={`/admin/properties/${property.id}`}
                                                className="
                                                    inline-flex items-center gap-2
                                                    px-3 py-1.5 rounded-lg text-sm transition group
                                                    bg-mint-50       dark:bg-dark-bg
                                                    border border-mint-200 dark:border-dark-border/20
                                                    text-kost-muted  dark:text-mint-100/50
                                                    hover:bg-mint-200 dark:hover:bg-mint-200/20
                                                    hover:border-mint-300 dark:hover:border-mint-300/30
                                                    hover:text-kost-dark dark:hover:text-mint-50
                                                "
                                            >
                                                <Eye className="w-4 h-4" />
                                                Detail
                                            </Link>

                                            <button
                                                onClick={() => handleDelete(property.id)}
                                                className="
                                                    inline-flex items-center gap-2
                                                    px-3 py-1.5 rounded-lg text-sm transition
                                                    bg-red-50 dark:bg-red-500/10
                                                    border border-red-200 dark:border-red-500/20
                                                    text-red-500 hover:bg-red-100
                                                "
                                            >
                                                <Trash2 className="w-4 h-4" />
                                                Hapus
                                            </button>
                                        </div>
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

            
            <div className="md:hidden space-y-3">
                {properties.length > 0 ? (
                    properties.map((property) => (
                        <div
                            key={property.id}
                            className="
                                rounded-xl p-4
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
                                        {property.name}
                                    </p>
                                </div>

                                <Link
                                    href={`/admin/properties/${property.id}`}
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
                                    Detail
                                </Link>
                            </div>

                            <div className="space-y-1.5 pl-12">
                                <div className="flex items-center gap-2 text-xs text-kost-muted dark:text-mint-100/50">
                                    <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-mint-300" />
                                    <span className="truncate">
                                        {property.address}, {property.city}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-kost-muted dark:text-mint-100/50">
                                    <User className="w-3.5 h-3.5 flex-shrink-0 text-mint-300" />
                                    <span className="capitalize">
                                        {property.owner?.name ?? "-"}
                                    </span>
                                </div>
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
                            Tidak ada data kos
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}