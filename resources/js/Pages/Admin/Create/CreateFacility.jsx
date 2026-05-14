import AdminLayout from "@/Layouts/AdminLayout";
import { Head, useForm, router } from "@inertiajs/react";
import { Plus, LoaderCircle, ArrowLeft } from "lucide-react";

export default function CreateFacility() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        type: "property",
        icon: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route("admin.facilities.store"), {
            onSuccess: () => reset(),
        });
    };

    return (
        <AdminLayout>
            <Head title="Tambah Fasilitas" />

            <div className="min-h-screen bg-background dark:bg-dark-bg p-6">
                <div className="max-w-3xl mx-auto space-y-6">
                    {/* HEADER */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => router.visit("/admin/facilities")}
                            className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm bg-white dark:bg-dark-card border border-mint-200 dark:border-dark-border/20 text-kost-dark dark:text-mint-50 hover:bg-mint-50 dark:hover:bg-dark-sidebar transition"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back
                        </button>

                        <div>
                            <h1 className="text-2xl font-bold text-kost-dark dark:text-mint-50">
                                Tambah Fasilitas
                            </h1>
                            <p className="text-sm text-kost-muted dark:text-mint-100/60 mt-1">
                                Tambahkan fasilitas baru yang dapat dipilih owner.
                            </p>
                        </div>
                    </div>

                    {/* FORM CARD */}
                    <div className="bg-white dark:bg-dark-card border border-mint-200 dark:border-dark-border/20 rounded-2xl p-6">
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* NAME */}
                            <div>
                                <label className="block text-sm font-medium text-kost-dark dark:text-mint-50 mb-2">
                                    Nama Fasilitas
                                </label>

                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    placeholder="Contoh: WiFi"
                                    className="w-full px-4 py-3 rounded-xl bg-mint-50 dark:bg-dark-bg border border-mint-200 dark:border-dark-border/20 text-kost-dark dark:text-mint-50 placeholder:text-kost-muted/60 outline-none focus:ring-2 focus:ring-primary transition"
                                />

                                {errors.name && (
                                    <p className="text-red-500 text-sm mt-2">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            {/* TYPE */}
                            <div>
                                <label className="block text-sm font-medium text-kost-dark dark:text-mint-50 mb-2">
                                    Tipe Fasilitas
                                </label>

                                <select
                                    value={data.type}
                                    onChange={(e) =>
                                        setData("type", e.target.value)
                                    }
                                    className="w-full px-4 py-3 rounded-xl bg-mint-50 dark:bg-dark-bg border border-mint-200 dark:border-dark-border/20 text-kost-dark dark:text-mint-50 outline-none focus:ring-2 focus:ring-primary transition"
                                >
                                    <option value="property">Property</option>
                                    <option value="room">Room</option>
                                </select>

                                {errors.type && (
                                    <p className="text-red-500 text-sm mt-2">
                                        {errors.type}
                                    </p>
                                )}
                            </div>

                            {/* ICON */}
                            <div>
                                <label className="block text-sm font-medium text-kost-dark dark:text-mint-50 mb-2">
                                    Icon
                                </label>

                                <input
                                    type="text"
                                    value={data.icon}
                                    onChange={(e) =>
                                        setData("icon", e.target.value)
                                    }
                                    placeholder="Contoh: wifi"
                                    className="w-full px-4 py-3 rounded-xl bg-mint-50 dark:bg-dark-bg border border-mint-200 dark:border-dark-border/20 text-kost-dark dark:text-mint-50 placeholder:text-kost-muted/60 outline-none focus:ring-2 focus:ring-primary transition"
                                />

                                <p className="text-sm text-kost-muted dark:text-mint-100/50 mt-2">
                                    *Gunakan nama icon Material Icons Flutter.
                                </p>

                                {errors.icon && (
                                    <p className="text-red-500 text-sm mt-2">
                                        {errors.icon}
                                    </p>
                                )}
                            </div>

                            {/* SUBMIT */}
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-secondary to-primary text-kost-dark font-semibold hover:opacity-90 transition disabled:opacity-50"
                            >
                                {processing ? (
                                    <>
                                        <LoaderCircle className="w-5 h-5 animate-spin" />
                                        Menyimpan...
                                    </>
                                ) : (
                                    <>
                                        <Plus className="w-5 h-5" />
                                        Tambah Fasilitas
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}