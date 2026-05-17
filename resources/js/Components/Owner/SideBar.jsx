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
    BadgeAlertIcon
} from "lucide-react";

import { motion } from "framer-motion";
import { Link, usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";
import PropertySwitcher from "./PropertySwitcher";

export default function SideBar() {

    const { url, props } = usePage();
    const { auth, ownerProperties } = props;

    /* ================= THEME ================= */
    const [isDark, setIsDark] = useState(
        () => localStorage.getItem("theme") === "dark"
    );

    useEffect(() => {
        const root = document.documentElement;
        if (isDark) {
            root.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            root.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [isDark]);

    /* ================= PROPERTY ================= */

    const storageKey = `selectedProperty_${auth.user.id}`;
    const storedPropertyId = localStorage.getItem(storageKey);

    const propertyId = storedPropertyId
        ? Number(storedPropertyId)
        : ownerProperties?.[0]?.id;

    const currentProperty = ownerProperties?.find(
        (property) => property.id === propertyId
    );

    const activePropertyId = currentProperty?.id;

    /* ================= MENU ================= */

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
                    icon: BadgeAlertIcon,
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
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="
                w-64 h-screen flex flex-col
                bg-white dark:bg-dark-sidebar
                border-r
                border-mint-200 dark:border-dark-border/20
                transition-colors duration-300
            "
        >
            {/* HEADER */}
            <div className="p-6 border-b border-mint-200 dark:border-dark-border/20">
                <span className="text-lg font-bold">
                    <span className="text-mint-300">MyKost</span>
                    <span className="text-kost-dark dark:text-mint-50"> Owner</span>
                </span>
            </div>

            {/* PROPERTY SWITCHER */}
            <div className="px-3 pt-4">
                <PropertySwitcher properties={ownerProperties} />
            </div>

            {/* MENU */}
            <div className="flex-1 px-3 py-4 space-y-5 overflow-y-auto">

                {menuSections.map((section, i) => (
                    <div key={i}>

                        <p className="
                            text-[11px] font-medium tracking-wider px-3 mb-1.5
                            text-kost-muted dark:text-mint-100/40
                        ">
                            {section.title}
                        </p>

                        {section.items.map((item, j) => {

                            const Icon = item.icon;

                            const isActive =
                                item.href !== "#" &&
                                url.startsWith(item.href);

                            const isDisabled = item.href === "#";

                            return (
                                <Link
                                    key={j}
                                    href={item.href}
                                    preserveState
                                    preserveScroll
                                    className={`
                                        flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm
                                        transition-all duration-150 mb-0.5
                                        ${isDisabled
                                            ? "opacity-40 cursor-not-allowed"
                                            : ""
                                        }
                                        ${isActive
                                            ? "bg-mint-200 dark:bg-mint-200/20 text-kost-dark dark:text-mint-50 font-medium"
                                            : "text-kost-muted dark:text-mint-100/60 hover:bg-mint-50 dark:hover:bg-dark-card hover:text-kost-dark dark:hover:text-mint-50"
                                        }
                                    `}
                                >
                                    <Icon className={`w-4 h-4 flex-shrink-0 ${
                                        isActive
                                            ? "text-kost-dark dark:text-mint-200"
                                            : "text-kost-muted dark:text-mint-100/40"
                                    }`} />

                                    {item.name}

                                    {isActive && (
                                        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-mint-300 dark:bg-mint-200" />
                                    )}
                                </Link>
                            );
                        })}

                    </div>
                ))}

            </div>

            {/* LOGOUT */}
            <div className="p-3 border-t border-mint-200 dark:border-dark-border/20">
                <Link
                    href="/logout"
                    method="post"
                    as="button"
                    className="
                        flex items-center gap-3 w-full
                        px-3 py-2.5 rounded-xl text-sm
                        text-red-400
                        hover:bg-red-50 dark:hover:bg-red-500/10
                        transition
                    "
                >
                    <LogOut className="w-4 h-4 flex-shrink-0" />
                    Logout
                </Link>
            </div>
        </motion.aside>
    );
}