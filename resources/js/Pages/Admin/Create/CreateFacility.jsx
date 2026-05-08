import AdminLayout from "@/Layouts/AdminLayout";
import { Head, useForm } from "@inertiajs/react";
import { Plus, LoaderCircle } from "lucide-react";

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

            <div className="max-w-3xl mx-auto">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white">
                        Tambah Fasilitas
                    </h1>

                    <p className="text-gray-400 mt-2">
                        Tambahkan fasilitas baru yang dapat dipilih owner.
                    </p>
                </div>

                {/* Form */}
                <div
                    className="
                        bg-white/5
                        backdrop-blur-xl
                        border
                        border-white/10
                        rounded-3xl
                        p-8
                        shadow-[0_8px_32px_rgba(0,0,0,0.37)]
                    "
                >

                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Facility Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Nama Fasilitas
                            </label>

                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => setData("name", e.target.value)}
                                placeholder="Contoh: WiFi"
                                className="
                                    w-full
                                    px-4
                                    py-3
                                    rounded-2xl
                                    bg-white/5
                                    border
                                    border-white/10
                                    text-white
                                    placeholder:text-gray-500
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-cyan-500
                                "
                            />

                            {errors.name && (
                                <p className="text-red-400 text-sm mt-2">
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        {/* Type */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Tipe Fasilitas
                            </label>

                            <select
                                value={data.type}
                                onChange={(e) => setData("type", e.target.value)}
                                className="
                                    w-full
                                    px-4
                                    py-3
                                    rounded-2xl
                                    bg-white/5
                                    border
                                    border-white/10
                                    text-white
                                    placeholder:text-gray-500
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-cyan-500
                                "
                            >
                                <option value="property">
                                    Property
                                </option>

                                <option value="room">
                                    Room
                                </option>
                            </select>

                            {errors.type && (
                                <p className="text-red-400 text-sm mt-2">
                                    {errors.type}
                                </p>
                            )}
                        </div>

                        {/* Icon */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Icon
                            </label>

                            <input
                                type="text"
                                value={data.icon}
                                onChange={(e) => setData("icon", e.target.value)}
                                placeholder="Contoh: wifi"
                                className="
                                    w-full
                                    px-4
                                    py-3
                                    rounded-2xl
                                    bg-white/5
                                    border
                                    border-white/10
                                    text-white
                                    placeholder:text-gray-500
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-cyan-500
                                "
                            />

                            <p className="text-sm text-gray-500 mt-2">
                                *Gunakan nama icon Material Icons Flutter.
                            </p>

                            {errors.icon && (
                                <p className="text-red-400 text-sm mt-2">
                                    {errors.icon}
                                </p>
                            )}
                        </div>

                        {/* Submit */}
                        <div className="pt-4">

                            <button
                                type="submit"
                                disabled={processing}
                                className="
                                    w-full
                                    flex
                                    items-center
                                    justify-center
                                    gap-2
                                    px-5
                                    py-3
                                    rounded-2xl
                                    bg-gradient-to-r
                                    from-cyan-500
                                    to-violet-500
                                    text-white
                                    font-semibold
                                    hover:opacity-90
                                    transition-all
                                    duration-300
                                    disabled:opacity-50
                                "
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

                        </div>

                    </form>

                </div>

            </div>

        </AdminLayout>
    );
}