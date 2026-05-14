import { Pencil, Trash2, Phone, CalendarDays } from "lucide-react";

export default function TableTenants({ tenants }) {
    return (

        <div className="mt-8">

            {/* WRAPPER */}
            <div
                className="
                    bg-[#0f172a]
                    border
                    border-white/10
                    rounded-3xl
                    overflow-hidden
                    shadow-xl
                "
            >

                {/* HEADER */}
                <div
                    className="
                        flex
                        items-center
                        justify-between
                        px-6
                        py-5
                        border-b
                        border-white/10
                        bg-white/[0.03]
                    "
                >

                    <div>

                        <h2 className="text-lg font-semibold text-white">
                            Daftar Penyewa
                        </h2>

                        <p className="text-sm text-gray-400 mt-1">
                            Semua data penghuni kos aktif.
                        </p>

                    </div>

                    <div
                        className="
                            px-3
                            py-1.5
                            rounded-xl
                            bg-cyan-500/10
                            border
                            border-cyan-500/20
                            text-cyan-400
                            text-sm
                            font-medium
                        "
                    >
                        {tenants.length} Penyewa
                    </div>

                </div>

                {/* TABLE */}
                <div className="overflow-x-auto">

                    <table className="w-full min-w-[900px]">

                        {/* HEADER */}
                        <thead
                            className="
                                bg-white/[0.02]
                                text-gray-400
                                text-sm
                                border-b
                                border-white/10
                            "
                        >

                            <tr>

                                <th className="p-5 text-left font-medium">
                                    Penyewa
                                </th>

                                <th className="p-5 text-left font-medium">
                                    No. Telp
                                </th>

                                <th className="p-5 text-left font-medium">
                                    Tipe Kamar
                                </th>

                                <th className="p-5 text-left font-medium">
                                    Tanggal Sewa
                                </th>
                                
                                <th className="p-5 text-left font-medium">
                                    Tanggal Akhir
                                </th>

                                <th className="p-5 text-right font-medium">
                                    Action
                                </th>

                            </tr>

                        </thead>

                        {/* BODY */}
                        <tbody>

                            {tenants.length > 0 ? (

                                tenants.map((tenant) => {

                                    return (

                                        <tr
                                            key={tenant.id}
                                            className="
                                                border-t
                                                border-white/5
                                                hover:bg-white/[0.03]
                                                transition-all
                                            "
                                        >

                                            {/* USER */}
                                            <td className="p-5">

                                                <div className="flex items-center gap-3">

                                                    <div
                                                        className="
                                                            w-11
                                                            h-11
                                                            rounded-2xl
                                                            bg-gradient-to-br
                                                            from-cyan-500
                                                            to-violet-500
                                                            flex
                                                            items-center
                                                            justify-center
                                                            text-white
                                                            font-bold
                                                            shrink-0
                                                        "
                                                    >
                                                        {tenant.name?.charAt(0)}
                                                    </div>

                                                    <div>

                                                        <h3 className="text-white font-medium">
                                                            {tenant.name}
                                                        </h3>

                                                        <p className="text-xs text-gray-500 mt-0.5">
                                                            {tenant.email}
                                                        </p>

                                                    </div>

                                                </div>

                                            </td>

                                            {/* CONTACT */}
                                            <td className="p-5">

                                                <div
                                                    className="
                                                        flex
                                                        items-center
                                                        gap-2
                                                        text-sm
                                                        text-gray-300
                                                    "
                                                >

                                                    <Phone className="w-4 h-4 text-cyan-400" />

                                                    {tenant.phone || "-"}

                                                </div>

                                            </td>

                                            {/* ROOM TYPE */}
                                            <td className="p-5">

                                                <div>

                                                    <h4 className="text-white text-sm font-medium">
                                                        {tenant.room_type?.name || "-"}
                                                    </h4>

                                                </div>

                                            </td>

                                            {/* CHECK IN */}
                                            <td className="p-5">

                                                <div
                                                    className="
                                                        flex
                                                        items-center
                                                        gap-2
                                                        text-sm
                                                        text-gray-300
                                                    "
                                                >

                                                    <CalendarDays className="w-4 h-4 text-violet-400" />

                                                    {tenant.check_in || "-"}

                                                </div>

                                            </td>

                                            {/* STATUS */}
                                            <td className="p-5">

                                                <span
                                                    className={`
                                                        inline-flex
                                                        items-center
                                                        px-3
                                                        py-1
                                                        rounded-xl
                                                        border
                                                        text-xs
                                                        font-medium
                                                        capitalize
                                                        ${getStatusColor(tenant.status)}
                                                    `}
                                                >
                                                    {tenant.status}
                                                </span>

                                            </td>

                                            {/* ACTION */}
                                            <td className="p-5">

                                                <div className="flex justify-end gap-2">

                                                    {/* EDIT */}
                                                    <button
                                                        className="
                                                            p-2.5
                                                            rounded-xl
                                                            bg-white/5
                                                            hover:bg-indigo-500/20
                                                            border
                                                            border-white/10
                                                            transition-all
                                                            group
                                                        "
                                                    >

                                                        <Pencil
                                                            className="
                                                                w-4
                                                                h-4
                                                                text-gray-400
                                                                group-hover:text-indigo-300
                                                            "
                                                        />

                                                    </button>

                                                    {/* DELETE */}
                                                    <button
                                                        className="
                                                            p-2.5
                                                            rounded-xl
                                                            bg-white/5
                                                            hover:bg-red-500/20
                                                            border
                                                            border-white/10
                                                            transition-all
                                                            group
                                                        "
                                                    >

                                                        <Trash2
                                                            className="
                                                                w-4
                                                                h-4
                                                                text-gray-400
                                                                group-hover:text-red-400
                                                            "
                                                        />

                                                    </button>

                                                </div>

                                            </td>

                                        </tr>
                                    );
                                })

                            ) : (

                                <tr>

                                    <td
                                        colSpan="6"
                                        className="
                                            text-center
                                            py-16
                                            text-gray-500
                                        "
                                    >

                                        <div className="flex flex-col items-center">

                                            <div
                                                className="
                                                    w-16
                                                    h-16
                                                    rounded-2xl
                                                    bg-white/5
                                                    flex
                                                    items-center
                                                    justify-center
                                                    mb-4
                                                "
                                            >
                                                👥
                                            </div>

                                            <h3 className="text-white font-medium">
                                                Belum Ada Penyewa
                                            </h3>

                                            <p className="text-sm text-gray-500 mt-1">
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