import OwnerLayout from "@/Layouts/OwnerLayout";
import { Head, useForm } from "@inertiajs/react";
import { useState } from "react";

import {
    Plus,
    Check,
    Sparkles,
    LoaderCircle,
} from "lucide-react";

export default function PropertyFacilities({
    property,
    facilities,
    selectedFacilities = [],
}) {

    const { data, setData, post, processing, errors } = useForm({
        facilities: selectedFacilities.map((f) => f.id),
        custom_facility: "",
        custom_facilities: [],
    });

    const toggleFacility = (id) => {

        if (data.facilities.includes(id)) {
            setData(
                "facilities",
                data.facilities.filter((item) => item !== id)
            );
        } else {
            setData(
                "facilities",
                [...data.facilities, id]
            );
        }
    };

    const addCustomFacility = () => {

        if (!data.custom_facility.trim()) return;

        setData("custom_facilities", [
            ...data.custom_facilities,
            data.custom_facility,
        ]);

        setData("custom_facility", "");
    };

    const removeCustomFacility = (index) => {
        setData(
            "custom_facilities",
            data.custom_facilities.filter((_, i) => i !== index)
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route("owner.property.facilities.store", property.id));
    };

    return (
        <OwnerLayout>

            <Head title="Fasilitas Kos" />

            <div className="max-w-6xl mx-auto space-y-8">

                {/* HEADER */}
                <div
                    className="
                        rounded-[2rem]
                        border
                        border-white/10
                        bg-white/5
                        backdrop-blur-xl
                        p-8
                    "
                >

                    <div
                        className="
                            inline-flex
                            items-center
                            gap-2
                            px-4
                            py-1.5
                            rounded-full
                            bg-cyan-500/10
                            border
                            border-cyan-500/20
                            text-cyan-300
                            text-sm
                            mb-5
                        "
                    >

                        <Sparkles size={16} />

                        Fasilitas Properti

                    </div>

                    <h1 className="text-4xl font-bold text-white">
                        {property.name}
                    </h1>

                    <p className="text-gray-400 mt-3">
                        Pilih fasilitas yang tersedia di kos Anda.
                    </p>

                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-8"
                >

                    {/* FACILITY LIST */}
                    <div
                        className="
                            rounded-3xl
                            border
                            border-white/10
                            bg-white/5
                            backdrop-blur-xl
                            p-8
                        "
                    >

                        <div className="mb-8">

                            <h2 className="text-xl font-semibold text-white mb-2">
                                Pilih Fasilitas
                            </h2>

                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                            {facilities.map((facility) => {

                                const active = data.facilities.includes(
                                    facility.id
                                );

                                return (
                                    <button
                                        type="button"
                                        key={facility.id}
                                        onClick={() =>
                                            toggleFacility(facility.id)
                                        }
                                        className={`
                                            relative
                                            p-5
                                            rounded-2xl
                                            border
                                            transition-all
                                            duration-300
                                            text-left

                                            ${
                                                active
                                                    ? `
                                                        border-cyan-500/50
                                                        bg-cyan-500/10
                                                    `
                                                    : `
                                                        border-white/10
                                                        bg-white/5
                                                        hover:bg-white/10
                                                    `
                                            }
                                        `}
                                    >

                                        <h3 className="text-white font-medium text-sm">
                                            {facility.name}
                                        </h3>

                                        {active && (
                                            <div
                                                className="
                                                    absolute
                                                    top-3
                                                    right-3
                                                    w-6
                                                    h-6
                                                    rounded-full
                                                    bg-cyan-500
                                                    flex
                                                    items-center
                                                    justify-center
                                                "
                                            >

                                                <Check className="w-4 h-4 text-white" />

                                            </div>
                                        )}

                                    </button>
                                );
                            })}

                        </div>

                    </div>

                    {/* CUSTOM FACILITY */}
                    <div
                        className="
                            rounded-3xl
                            border
                            border-white/10
                            bg-white/5
                            backdrop-blur-xl
                            p-8
                        "
                    >

                        <div className="mb-6">

                            <h2 className="text-xl font-semibold text-white mb-2">
                                Tambah Fasilitas Lain
                            </h2>

                            <p className="text-sm text-gray-400">
                                Tambahkan fasilitas custom jika belum tersedia.
                            </p>

                        </div>

                        <div className="flex gap-3">

                            <input
                                type="text"
                                value={data.custom_facility}
                                onChange={(e) =>
                                    setData(
                                        "custom_facility",
                                        e.target.value
                                    )
                                }
                                placeholder="Contoh: Rooftop"
                                className="
                                    flex-1
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

                            <button
                                type="button"
                                onClick={addCustomFacility}
                                className="
                                    px-5
                                    rounded-2xl
                                    bg-cyan-500
                                    text-white
                                    hover:opacity-90
                                    transition
                                "
                            >

                                <Plus className="w-5 h-5" />

                            </button>

                        </div>

                        {/* LIST */}
                        {data.custom_facilities.length > 0 && (

                            <div className="flex flex-wrap gap-3 mt-6">

                                {data.custom_facilities.map((facility, index) => (

                                    <div
                                        key={index}
                                        className="
                                            flex
                                            items-center
                                            gap-2
                                            px-4
                                            py-2
                                            rounded-xl
                                            bg-cyan-500/10
                                            border
                                            border-cyan-500/20
                                        "
                                    >

                                        <span className="text-sm text-cyan-300">
                                            {facility}
                                        </span>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                removeCustomFacility(index)
                                            }
                                            className="
                                                text-red-400
                                                hover:text-red-300
                                            "
                                        >

                                            ✕

                                        </button>

                                    </div>
                                ))}

                            </div>
                        )}

                        {errors.facilities && (
                            <p className="text-red-400 text-sm mt-4">
                                {errors.facilities}
                            </p>
                        )}

                    </div>

                    {/* SUBMIT */}
                    <button
                        type="submit"
                        disabled={processing}
                        className="
                            w-full
                            flex
                            items-center
                            justify-center
                            gap-3
                            px-6
                            py-4
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
                                <Check className="w-5 h-5" />
                                Simpan Fasilitas
                            </>
                        )}

                    </button>

                </form>

            </div>

        </OwnerLayout>
    );
}