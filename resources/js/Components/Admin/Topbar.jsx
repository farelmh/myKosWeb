import { Menu, Search, Bell, ChevronDown, Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, usePage, router } from "@inertiajs/react";

export default function Topbar({ setOpen }) {
    const [openProfile, setOpenProfile] = useState(false);

    const { auth } = usePage().props;
    const user = auth.user;

    const { filters } = usePage().props;
    const [searchTerm, setSearchTerm] = useState(filters?.search || "");

    // ── Dark mode ────────────────────────────────────────────
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

    // ── Debounce search ──────────────────────────────────────
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            const currentPath = window.location.pathname;
            if (currentPath.startsWith("/admin")) {
                router.get(
                    currentPath,
                    { search: searchTerm },
                    { preserveState: true, replace: true, preserveScroll: true }
                );
            }
        }, 400);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

    return (
        <div className="
            flex items-center justify-between px-6 py-4 sticky top-0 z-40
            bg-white        dark:bg-dark-sidebar
            border-b
            border-mint-200 dark:border-dark-border/20
            transition-colors duration-300
        ">
            {/* LEFT */}
            <div className="flex items-center gap-4">

                {/* MOBILE MENU */}
                <button
                    onClick={() => setOpen(true)}
                    className="md:hidden text-kost-muted dark:text-mint-100/60 hover:text-kost-dark dark:hover:text-mint-50 transition"
                >
                    <Menu />
                </button>

            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-3">

                {/* SEARCH */}
                <div className="relative hidden md:block">
                    <Search className="absolute left-3 top-2.5 w-4 h-4 text-kost-muted dark:text-mint-100/40" />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search..."
                        className="
                            w-60 pl-10 pr-4 py-2 rounded-lg text-sm
                            bg-mint-50      dark:bg-dark-card
                            border
                            border-mint-200 dark:border-dark-border/20
                            text-kost-dark  dark:text-mint-50
                            placeholder-kost-muted dark:placeholder-mint-100/30
                            focus:outline-none
                            focus:ring-2
                            focus:ring-mint-200 dark:focus:ring-mint-300/40
                            transition
                        "
                    />
                </div>

                {/* DARK MODE TOGGLE */}
                <button
                    onClick={() => setIsDark(!isDark)}
                    className="
                        p-2 rounded-lg
                        bg-mint-50      dark:bg-dark-card
                        border
                        border-mint-200 dark:border-dark-border/20
                        text-kost-muted  dark:text-mint-100/60
                        hover:bg-mint-100 dark:hover:bg-dark-card/60
                        transition
                    "
                    aria-label="Toggle dark mode"
                >
                    {isDark
                        ? <Sun  className="w-4 h-4 text-mint-200" />
                        : <Moon className="w-4 h-4" />
                    }
                </button>

                {/* NOTIFICATION */}
                <button className="
                    relative p-2 rounded-lg
                    bg-mint-50      dark:bg-dark-card
                    border
                    border-mint-200 dark:border-dark-border/20
                    hover:bg-mint-100 dark:hover:bg-dark-card/60
                    transition
                ">
                    <Bell className="w-4 h-4 text-kost-muted dark:text-mint-100/60" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-400 rounded-full" />
                </button>

                {/* PROFILE */}
                <div className="relative">
                    <button
                        onClick={() => setOpenProfile(!openProfile)}
                        className="
                            flex items-center gap-2 px-3 py-1.5 rounded-lg
                            bg-mint-50      dark:bg-dark-card
                            border
                            border-mint-200 dark:border-dark-border/20
                            hover:bg-mint-100 dark:hover:bg-dark-card/60
                            transition
                        "
                    >
                        {/* Avatar */}
                        <div className="
                            w-7 h-7 rounded-full flex items-center justify-center
                            text-sm font-medium capitalize
                            bg-mint-200 dark:bg-mint-200/20
                            text-kost-dark dark:text-mint-50
                        ">
                            {user.name.charAt(0)}
                        </div>

                        <div className="hidden md:block text-left">
                            <p className="text-sm font-medium capitalize text-kost-dark dark:text-mint-50">
                                {user.name}
                            </p>
                            <p className="text-xs capitalize text-kost-muted dark:text-mint-100/40">
                                {user.role}
                            </p>
                        </div>

                        <ChevronDown className="w-4 h-4 text-kost-muted dark:text-mint-100/40" />
                    </button>

                    {/* DROPDOWN */}
                    <AnimatePresence>
                        {openProfile && (
                            <>
                                <div
                                    className="fixed inset-0 z-40"
                                    onClick={() => setOpenProfile(false)}
                                />

                                <motion.div
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 8 }}
                                    transition={{ duration: 0.15 }}
                                    className="
                                        absolute right-0 mt-2 w-48 z-50
                                        rounded-xl overflow-hidden
                                        bg-white        dark:bg-dark-card
                                        border
                                        border-mint-200 dark:border-dark-border/20
                                        shadow-sm
                                    "
                                >
                                    <button className="
                                        w-full text-left px-4 py-2.5 text-sm
                                        text-kost-dark  dark:text-mint-50
                                        hover:bg-mint-50 dark:hover:bg-dark-sidebar
                                        transition
                                    ">
                                        Profile
                                    </button>

                                    <button className="
                                        w-full text-left px-4 py-2.5 text-sm
                                        text-kost-dark  dark:text-mint-50
                                        hover:bg-mint-50 dark:hover:bg-dark-sidebar
                                        transition
                                    ">
                                        Settings
                                    </button>

                                    <div className="border-t border-mint-200 dark:border-dark-border/20" />

                                    <Link
                                        href={route("landing")}
                                        as="button"
                                        onClick={() => setOpenProfile(false)}
                                        className="
                                            w-full text-left px-4 py-2.5 text-sm
                                            text-kost-dark  dark:text-mint-50
                                            hover:bg-mint-50 dark:hover:bg-dark-sidebar
                                            transition
                                        "
                                    >
                                        Landing
                                    </Link>

                                    <div className="border-t border-mint-200 dark:border-dark-border/20" />

                                    <Link
                                        href={route("logout")}
                                        method="post"
                                        as="button"
                                        onClick={() => setOpenProfile(false)}
                                        className="
                                            w-full text-left px-4 py-2.5 text-sm
                                            text-red-400
                                            hover:bg-red-50 dark:hover:bg-red-500/10
                                            transition
                                        "
                                    >
                                        Logout
                                    </Link>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}