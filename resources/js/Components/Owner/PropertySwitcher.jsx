import { ChevronDown, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { router, usePage } from "@inertiajs/react";

export default function PropertySwitcher({ properties }) {

    const [open, setOpen] = useState(false);

    const { auth } = usePage().props;

    // key berdasarkan user login
    const storageKey = `selectedProperty_${auth.user.id}`;

    // ambil id property tersimpan
    const [selectedPropertyId, setSelectedPropertyId] = useState(() => {

        const saved = localStorage.getItem(storageKey);

        return saved
            ? Number(saved)
            : properties?.[0]?.id;

    });

    // cari object property berdasarkan id
    const currentProperty = properties?.find(
        (property) => property.id === selectedPropertyId
    );

    // pilih property
    const handleSelect = (property) => {

        setSelectedPropertyId(property.id);

        setOpen(false);

        router.get('/owner/dashboard');

    };

    const handleAddProperty = () => {
        router.get('/form-pengajuan');
    }

    // simpan ke localStorage
    useEffect(() => {

        if (selectedPropertyId) {

            localStorage.setItem(
                storageKey,
                selectedPropertyId
            );

        }

    }, [selectedPropertyId]);

    // kalau property sudah tidak ada / beda user
    useEffect(() => {

        const exists = properties?.some(
            (property) => property.id === selectedPropertyId
        );

        if (!exists && properties?.length > 0) {

            setSelectedPropertyId(properties[0].id);

        }

    }, [properties]);

    return (
        <div className="relative">

            {/* Current Property */}
            <button
                onClick={() => setOpen(!open)}
                className="
                    w-full
                    flex
                    items-center
                    justify-between
                    gap-2
                    px-3
                    py-2
                    rounded-xl
                    bg-white/5
                    border
                    border-white/10
                    duration-300
                    hover:bg-white/10
                "
            >

                <div className="flex items-center gap-2.5 overflow-hidden">

                    <div
                        className="
                            w-9
                            h-9
                            rounded-lg
                            bg-gradient-to-br
                            from-cyan-500
                            to-violet-500
                            flex
                            items-center
                            justify-center
                            text-white
                            font-bold
                            text-sm
                            shrink-0
                        "
                    >
                        {currentProperty?.name?.charAt(0)}
                    </div>

                    <div className="text-left overflow-hidden">

                        <p className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">
                            Active
                        </p>

                        <h3 className="text-xs font-semibold text-white truncate -mt-0.5">
                            {currentProperty?.name || "No Property"}
                        </h3>

                    </div>

                </div>

                <ChevronDown
                    size={14}
                    className={`text-gray-500 transition-transform duration-300 ${
                        open ? "rotate-180" : ""
                    }`}
                />

            </button>

            {/* Dropdown */}
            {open && (

                <div
                    className="
                        absolute
                        top-full
                        left-0
                        mt-2
                        w-full
                        z-50
                        rounded-xl
                        bg-[#0f172a]/95
                        backdrop-blur-xl
                        border
                        border-white/10
                        shadow-2xl
                        overflow-hidden
                    "
                >

                    {/* Property List */}
                    <div className="p-1.5 space-y-1">

                        {properties?.map((property) => (

                            <button
                                key={property.id}
                                className={`
                                    w-full
                                    flex
                                    items-center
                                    gap-2.5
                                    p-2
                                    rounded-lg
                                    transition-all
                                    duration-300
                                    ${
                                        selectedPropertyId === property.id
                                            ? "bg-cyan-500/10 border border-cyan-500/20"
                                            : "hover:bg-white/10"
                                    }
                                `}
                                onClick={() => handleSelect(property)}
                            >

                                <div
                                    className="
                                        w-8
                                        h-8
                                        rounded-lg
                                        bg-white/10
                                        flex
                                        items-center
                                        justify-center
                                        text-xs
                                        font-semibold
                                        text-gray-300
                                        shrink-0
                                    "
                                >
                                    {property.name.charAt(0)}
                                </div>

                                <div className="text-left overflow-hidden">

                                    <h4 className="text-xs text-white font-medium truncate">
                                        {property.name}
                                    </h4>

                                    <p className="text-[10px] text-gray-500 truncate">
                                        {property.city}
                                    </p>

                                </div>

                            </button>

                        ))}

                    </div>

                    {/* Footer */}
                    <div className="border-t border-white/10 p-1.5">

                        <button
                            className="
                                w-full
                                flex
                                items-center
                                gap-2
                                p-2
                                rounded-lg
                                text-cyan-400
                                hover:bg-cyan-500/10
                                transition-all
                                duration-300
                            "
                            onClick={handleAddProperty}
                        >

                            <Plus size={14} />

                            <span className="text-xs font-medium">
                                Add Property
                            </span>

                        </button>

                    </div>

                </div>

            )}

        </div>
    );
}