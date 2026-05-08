import { Pencil, Trash2 } from "lucide-react";

export default function TableTenants({ tenants }) {
    return (
        <div className="mt-8">

            {/* WRAPPER */}
            <div className="bg-[#0f0f2a] border border-white/10 rounded-xl overflow-hidden">

                {/* TABLE */}
                <table className="w-full">

                    {/* HEADER */}
                    <thead className="text-gray-400 text-sm border-b border-white/10 bg-white/5">
                        <tr>
                            <th className="p-4 text-left">Name</th>
                            <th className="p-4 text-left">Email</th>
                            <th className="p-4 text-left">No Telp</th>
                            <th className="p-4 text-left">Tipe Kamar</th>
                            <th className="p-4 text-right">Action</th>
                        </tr>
                    </thead>

                    {/* BODY */}
                    <tbody>
                        {tenants.length > 0 ? (
                            tenants.map((tenant) => {
                                return (
                                    <tr
                                        key={tenant.id}
                                        className="border-t border-white/10 hover:bg-white/5 transition"
                                    >
                                        {/* USER */}
                                        <td className="p-4 flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-full bg-gradient-to-r from-[#6366f1] to-[#a855f7] flex items-center justify-center text-sm font-bold">
                                                {tenant.name.charAt(0)}
                                            </div>
                                            <span className="font-medium">
                                                {tenant.name}
                                            </span>
                                        </td>

                                        {/* EMAIL */}
                                        <td className="p-4 text-gray-400 text-sm">
                                            {tenant.email}
                                        </td>

                                        {/* Phone */}
                                        <td className="p-4 text-gray-400 text-sm">
                                            {tenant.phone}
                                        </td>

                                        {/* ACTION */}
                                        <td className="p-4">
                                            <div className="flex justify-end gap-2">
                                                <button className="p-2 rounded-lg bg-white/5 hover:bg-indigo-500/20 transition group">
                                                    <Pencil className="w-4 h-4 text-gray-400 group-hover:text-indigo-300" />
                                                </button>

                                                <button className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 transition group">
                                                    <Trash2 className="w-4 h-4 text-gray-400 group-hover:text-red-400" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            /* EMPTY STATE */
                            <tr>
                                <td colSpan="5" className="text-center py-10 text-gray-500">
                                    Tidak ada data user
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}