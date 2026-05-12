import {
    LayoutDashboard,
    Users,
    Settings,
    LogOut,
    Home,
    Wallet,
    MessageSquareWarning,
    Star,
    Bed,
    Box,
    BadgeAlertIcon as ba
} from "lucide-react";

import { motion } from "framer-motion";
import { Link, usePage } from "@inertiajs/react";
import PropertySwitcher from "./PropertySwitcher";

export default function SideBar() {

    const { url, props } = usePage();

    const { auth, ownerProperties } = props;

    const storageKey = `selectedProperty_${auth.user.id}`;

    const storedPropertyId = localStorage.getItem(storageKey);

    // fallback ke property pertama
    const propertyId = storedPropertyId
        ? Number(storedPropertyId)
        : ownerProperties?.[0]?.id;

    // ambil object property aktif
    const currentProperty = ownerProperties?.find(
        (property) => property.id === propertyId
    );

    // kalau property tidak ditemukan
    const activePropertyId = currentProperty?.id;

    const menuSections = [
        {
            title: "MAIN",
            items: [
                {
                    name: "Dashboard",
                    icon: LayoutDashboard,
                    href: "/owner/dashboard"
                },

                {
                    name: "Keluhan",
                    icon: MessageSquareWarning,
                    href: activePropertyId
                        ? `/owner/complaints/${activePropertyId}`
                        : "#"
                },

                {
                    name: "Ulasan",
                    icon: Star,
                    href: activePropertyId
                        ? `/owner/reviews/${activePropertyId}`
                        : "#"
                },
            ],
        },

        {
            title: "MANAGEMENT",
            items: [
                {
                    name: "Penyewa",
                    icon: Users,
                    href: activePropertyId
                        ? `/owner/tenants/${activePropertyId}`
                        : "#"
                },

                {
                    name: "Informasi Kos",
                    icon: Home,
                    href: activePropertyId
                        ? `/owner/property/detail/${activePropertyId}`
                        : "#"
                },
                
                {
                    name: "Fasilitas Kos",
                    icon: Box,
                    href: activePropertyId
                        ? `/owner/facilities/${activePropertyId}`
                        : "#"
                },

                {
                    name: "Tipe Kamar",
                    icon: Bed,
                    href: activePropertyId
                        ? `/owner/room-types/${activePropertyId}`
                        : "#"
                },

                {
                    name: "Permintaan Sewa",
                    icon: ba,
                    href: activePropertyId
                        ? `/owner/rental-request/${activePropertyId}`
                        : "#"
                },

                {
                    name: "Pembayaran",
                    icon: Wallet,
                    href: activePropertyId
                        ? `/owner/payments/${activePropertyId}`
                        : "#"
                },
            ],
        },

        {
            title: "SYSTEM",
            items: [
                {
                    name: "Settings",
                    icon: Settings,
                    href: "/owner/settings"
                },
            ],
        },
    ];

    return (
        <motion.aside
            initial={{ x: -260 }}
            animate={{ x: 0 }}
            className="
                w-64
                h-screen
                bg-[#0b0b1a]
                border-r
                border-white/10
                flex
                flex-col
            "
        >

            {/* LOGO */}
            <div className="
                p-6
                text-lg
                font-bold
                bg-gradient-to-r
                from-primary
                to-secondary
                bg-clip-text
                text-transparent
            ">
                MyKost Owner
            </div>

            {/* PROPERTY SWITCHER */}
            <div className="mt-5 mb-3 mx-4 border-t border-white/10">
                <PropertySwitcher properties={ownerProperties} />
            </div>

            {/* MENU */}
            <div className="flex-1 px-4 space-y-6 overflow-y-auto">

                {menuSections.map((section, i) => (

                    <div key={i}>

                        <p className="text-xs text-gray-500 px-2 mb-2">
                            {section.title}
                        </p>

                        {section.items.map((item, j) => {

                            const Icon = item.icon;

                            const isActive =
                                item.href !== "#" &&
                                url.startsWith(item.href);

                            return (
                                <Link
                                    key={j}
                                    href={item.href}
                                    preserveState
                                    preserveScroll
                                    className={`
                                        flex
                                        items-center
                                        gap-3
                                        px-4
                                        py-3
                                        rounded-xl
                                        text-sm
                                        transition
                                        ${
                                            isActive
                                                ? "bg-primary/20 text-white"
                                                : "text-gray-400 hover:bg-white/5 hover:text-white"
                                        }
                                    `}
                                >

                                    <Icon className="w-5 h-5" />

                                    {item.name}

                                </Link>
                            );
                        })}

                    </div>

                ))}

            </div>

            {/* LOGOUT */}
            <div className="p-4 border-t border-white/10">

                <Link
                    href="/logout"
                    method="post"
                    as="button"
                    className="
                        flex
                        items-center
                        gap-3
                        w-full
                        px-4
                        py-3
                        rounded-xl
                        text-red-400
                        hover:bg-red-500/10
                        transition
                    "
                >

                    <LogOut className="w-5 h-5" />

                    Logout

                </Link>

            </div>

        </motion.aside>
    );
}