import { Pencil, Trash2, X } from "lucide-react";
import { useState } from "react";
import { router, useForm } from "@inertiajs/react";

export default function TableUsers({ users }) {
    const [selectedUser, setSelectedUser] = useState(null);

    const { data, setData, put, processing, reset } = useForm({
        role: "",
    });

    const openEdit = (user) => {
        setSelectedUser(user);
        setData("role", user.role);
    };

    const closeModal = () => {
        setSelectedUser(null);
        reset();
    };

    const updateRole = (e) => {
        e.preventDefault();

        put(`/admin/users/${selectedUser.id}/role`, {
            preserveScroll: true,
            onSuccess: closeModal,
        });
    };

    const deleteUser = (user) => {
        if (!confirm(`Hapus user ${user.name}?`)) return;

        router.delete(`/admin/users/${user.id}`, {
            preserveScroll: true,
        });
    };

    return (
        <>
            <div className="mt-8">
                <div className="rounded-xl overflow-hidden bg-white dark:bg-dark-card border border-mint-200 dark:border-dark-border/20 transition-colors duration-300">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-mint-200 dark:border-dark-border/20">
                                <th className="p-4 text-left text-xs font-medium text-kost-muted dark:text-mint-100/40">Name</th>
                                <th className="p-4 text-left text-xs font-medium text-kost-muted dark:text-mint-100/40">Email</th>
                                <th className="p-4 text-left text-xs font-medium text-kost-muted dark:text-mint-100/40">Phone</th>
                                <th className="p-4 text-left text-xs font-medium text-kost-muted dark:text-mint-100/40">Role</th>
                                <th className="p-4 text-right text-xs font-medium text-kost-muted dark:text-mint-100/40">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {users.length > 0 ? (
                                users.map((user) => {
                                    const isAdmin = user.role === "admin";
                                    const isOwner = user.role === "owner";

                                    return (
                                        <tr
                                            key={user.id}
                                            className="border-b last:border-0 border-mint-200 dark:border-dark-border/20 hover:bg-mint-50 dark:hover:bg-dark-bg transition"
                                        >
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-sm font-medium capitalize bg-mint-200 dark:bg-mint-200/20 text-kost-dark dark:text-mint-50">
                                                        {user.name.charAt(0)}
                                                    </div>
                                                    <span className="text-sm font-medium text-kost-dark dark:text-mint-50 capitalize">
                                                        {user.name}
                                                    </span>
                                                </div>
                                            </td>

                                            <td className="p-4 text-sm text-kost-muted dark:text-mint-100/50">
                                                {user.email}
                                            </td>

                                            <td className="p-4 text-sm text-kost-muted dark:text-mint-100/50">
                                                {user.phone || "-"}
                                            </td>

                                            <td className="p-4">
                                                <span
                                                    className={`
                                                        px-3 py-1 rounded-full text-xs font-medium
                                                        ${
                                                            isAdmin
                                                                ? "bg-mint-300/20 text-mint-300 dark:bg-mint-300/10 dark:text-mint-300"
                                                                : isOwner
                                                                  ? "bg-mint-200/60 text-kost-dark dark:bg-mint-200/20 dark:text-mint-100"
                                                                  : "bg-mint-50 text-kost-muted dark:bg-dark-bg dark:text-mint-100/60"
                                                        }
                                                    `}
                                                >
                                                    {user.role}
                                                </span>
                                            </td>

                                            <td className="p-4">
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        onClick={() => openEdit(user)}
                                                        className="p-2 rounded-lg transition group bg-mint-50 dark:bg-dark-bg border border-mint-200 dark:border-dark-border/20 hover:bg-mint-200 dark:hover:bg-mint-200/20"
                                                    >
                                                        <Pencil className="w-4 h-4 text-kost-muted dark:text-mint-100/40 group-hover:text-kost-dark dark:group-hover:text-mint-50" />
                                                    </button>

                                                    <button
                                                        onClick={() => deleteUser(user)}
                                                        className="p-2 rounded-lg transition group bg-mint-50 dark:bg-dark-bg border border-mint-200 dark:border-dark-border/20 hover:bg-red-50 dark:hover:bg-red-500/10 hover:border-red-200 dark:hover:border-red-500/20"
                                                    >
                                                        <Trash2 className="w-4 h-4 text-kost-muted dark:text-mint-100/40 group-hover:text-red-400" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center py-12">
                                        <p className="text-sm text-kost-muted dark:text-mint-100/30">
                                            Tidak ada data user
                                        </p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {selectedUser && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <div className="w-full max-w-md bg-white dark:bg-dark-card border border-mint-200 dark:border-dark-border/20 rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-5">
                            <div>
                                <h2 className="text-lg font-semibold text-kost-dark dark:text-mint-50">
                                    Ubah Role
                                </h2>
                                <p className="text-sm text-kost-muted dark:text-mint-100/40">
                                    {selectedUser.name}
                                </p>
                            </div>

                            <button
                                onClick={closeModal}
                                className="p-2 rounded-lg hover:bg-mint-50 dark:hover:bg-dark-bg"
                            >
                                <X className="w-4 h-4 text-kost-muted" />
                            </button>
                        </div>

                        <form onSubmit={updateRole} className="space-y-4">
                            <div>
                                <label className="text-sm text-kost-muted dark:text-mint-100/50">
                                    Role
                                </label>

                                <select
                                    value={data.role}
                                    onChange={(e) => setData("role", e.target.value)}
                                    className="mt-2 w-full rounded-xl border-mint-200 dark:border-dark-border/20 bg-mint-50 dark:bg-dark-bg text-kost-dark dark:text-mint-50 focus:ring-primary"
                                >
                                    <option value="tenant">User / Pencari Kos</option>
                                    <option value="owner">Owner Kos</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>

                            <button
                                disabled={processing}
                                className="w-full py-3 rounded-xl bg-gradient-to-r from-secondary to-primary text-white font-medium disabled:opacity-50"
                            >
                                {processing ? "Menyimpan..." : "Simpan Role"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}