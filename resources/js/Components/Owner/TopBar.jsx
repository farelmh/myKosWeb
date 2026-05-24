import {
    Menu,
    Search,
    Bell,
    ChevronDown,
    Moon,
    Sun,
    MessageCircleIcon,
    CheckCircle,
    XCircle,
    Clock,
    Home,
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, usePage, router } from "@inertiajs/react";

const NotificationDropdown = ({
    notifications,
    onClose,
    onMarkAll,
    onMarkOne,
}) => {
    const unread = notifications.filter((n) => !n.is_read);

    const iconFor = (n) => {
        const msg = n.message?.toLowerCase() ?? "";

        if (msg.includes("disetujui") || msg.includes("approved")) {
            return <CheckCircle className="w-4 h-4 text-mint-300" />;
        }

        if (msg.includes("ditolak") || msg.includes("rejected")) {
            return <XCircle className="w-4 h-4 text-red-400" />;
        }

        if (msg.includes("sewa") || msg.includes("booking")) {
            return <Home className="w-4 h-4 text-mint-300" />;
        }

        return <Clock className="w-4 h-4 text-yellow-500" />;
    };

    const timeAgo = (dateStr) => {
        const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000);

        if (diff < 60) return `${diff}d lalu`;
        if (diff < 3600) return `${Math.floor(diff / 60)}m lalu`;
        if (diff < 86400) return `${Math.floor(diff / 3600)}j lalu`;

        return `${Math.floor(diff / 86400)}h lalu`;
    };

    return (
        <>
            {/* BACKDROP */}
            <div
                className="fixed inset-0 z-40 bg-black/0 md:bg-transparent"
                onClick={onClose}
            />

            <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className="
                    fixed md:absolute
                    left-3 right-3 top-[72px]
                    md:left-auto md:right-0 md:top-auto md:mt-2
                    md:w-80
                    z-50
                    rounded-2xl md:rounded-xl overflow-hidden
                    bg-white dark:bg-dark-card
                    border border-mint-200 dark:border-dark-border/20
                    shadow-lg md:shadow-sm
                "
            >
                {/* HEADER */}
                <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-mint-200 dark:border-dark-border/20">
                    <div className="flex items-center gap-2 min-w-0">
                        <span className="text-sm font-medium text-kost-dark dark:text-mint-50">
                            Notifikasi
                        </span>

                        {unread.length > 0 && (
                            <span
                                className="
                                    px-1.5 py-0.5 rounded-full text-xs font-medium
                                    bg-mint-200 dark:bg-mint-200/20
                                    text-kost-dark dark:text-mint-50
                                "
                            >
                                {unread.length}
                            </span>
                        )}
                    </div>

                    {unread.length > 0 && (
                        <button
                            type="button"
                            onClick={onMarkAll}
                            className="
                                flex-shrink-0
                                text-[11px] md:text-xs
                                text-mint-300 hover:text-mint-300/70
                                transition
                            "
                        >
                            Tandai semua
                        </button>
                    )}
                </div>

                {/* LIST */}
                <div className="max-h-[65vh] md:max-h-80 overflow-y-auto">
                    {notifications.length === 0 ? (
                        <div className="flex flex-col items-center gap-2 py-10">
                            <Bell className="w-8 h-8 text-mint-200 dark:text-mint-200/30" />

                            <p className="text-xs text-kost-muted dark:text-mint-100/40">
                                Tidak ada notifikasi
                            </p>
                        </div>
                    ) : (
                        notifications.map((n) => {
                            const msg = n.message?.toLowerCase() ?? "";
                            const isRent =
                                msg.includes("sewa") ||
                                msg.includes("booking");

                            const href = isRent
                                ? "/owner/rental-request"
                                : "/owner/dashboard";

                            return (
                                <Link
                                    key={n.id}
                                    href={href}
                                    onClick={() => {
                                        if (!n.is_read) onMarkOne(n.id);
                                        onClose();
                                    }}
                                    className={`
                                        flex items-start gap-3 px-4 py-3 transition
                                        border-b border-mint-200/50 dark:border-dark-border/10
                                        last:border-0
                                        ${
                                            !n.is_read
                                                ? "bg-mint-50 dark:bg-dark-bg hover:bg-mint-100 dark:hover:bg-dark-bg/80"
                                                : "hover:bg-mint-50 dark:hover:bg-dark-bg"
                                        }
                                    `}
                                >
                                    {/* ICON */}
                                    <div
                                        className="
                                            flex-shrink-0 w-8 h-8 rounded-lg mt-0.5
                                            flex items-center justify-center
                                            bg-mint-100 dark:bg-mint-200/10
                                            border border-mint-200 dark:border-mint-300/20
                                        "
                                    >
                                        {iconFor(n)}
                                    </div>

                                    {/* CONTENT */}
                                    <div className="flex-1 min-w-0">
                                        {n.title && (
                                            <p
                                                className={`
                                                    text-xs font-medium mb-0.5 truncate
                                                    ${
                                                        !n.is_read
                                                            ? "text-kost-dark dark:text-mint-50"
                                                            : "text-kost-muted dark:text-mint-100/60"
                                                    }
                                                `}
                                            >
                                                {n.title}
                                            </p>
                                        )}

                                        <p
                                            className={`
                                                text-xs leading-relaxed line-clamp-2
                                                ${
                                                    !n.is_read
                                                        ? "text-kost-dark dark:text-mint-50"
                                                        : "text-kost-muted dark:text-mint-100/60"
                                                }
                                            `}
                                        >
                                            {n.message}
                                        </p>

                                        <p className="text-[10px] text-kost-muted dark:text-mint-100/30 mt-0.5">
                                            {timeAgo(n.created_at)}
                                        </p>
                                    </div>

                                    {!n.is_read && (
                                        <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-mint-300 mt-1.5" />
                                    )}
                                </Link>
                            );
                        })
                    )}
                </div>

                {/* FOOTER */}
                {notifications.length > 0 && (
                    <div className="border-t border-mint-200 dark:border-dark-border/20 p-2">
                        <Link
                            href="/owner/dashboard"
                            onClick={onClose}
                            className="
                                block w-full text-center py-2 rounded-lg text-xs transition
                                text-mint-300 hover:bg-mint-50 dark:hover:bg-dark-bg
                            "
                        >
                            Lihat semua
                        </Link>
                    </div>
                )}
            </motion.div>
        </>
    );
};

export default function Topbar({ setOpen }) {
    const [openProfile, setOpenProfile] = useState(false);
    const [openNotification, setOpenNotification] = useState(false);

    const { auth, notifications: initialNotifs = [] } = usePage().props;
    const user = auth.user;

    const { filters } = usePage().props;
    const [searchTerm, setSearchTerm] = useState(filters?.search || "");
    const [notifications, setNotifications] = useState(initialNotifs);
    const [isDark, setIsDark] = useState(
        () => localStorage.getItem("theme") === "dark",
    );

    const unreadCount = notifications.filter((n) => !n.is_read).length;
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
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            const currentPath = window.location.pathname;
            if (currentPath.startsWith("/owner")) {
                router.get(
                    currentPath,
                    { search: searchTerm },
                    {
                        preserveState: true,
                        replace: true,
                        preserveScroll: true,
                    },
                );
            }
        }, 400);
        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);
    useEffect(() => {
        const interval = setInterval(() => {
            router.reload({
                only: ["notifications"],
                onSuccess: (page) =>
                    setNotifications(page.props.notifications ?? []),
            });
        }, 30000);
        return () => clearInterval(interval);
    }, []);

    const handleMarkAll = () => {
        router.post(
            route("owner.notifications.markAllRead"),
            {},
            {
                preserveState: true,
                preserveScroll: true,
                onSuccess: () =>
                    setNotifications((prev) =>
                        prev.map((n) => ({ ...n, is_read: true })),
                    ),
            },
        );
    };

    const handleMarkOne = (id) => {
        router.post(
            route("owner.notifications.markOneRead", id),
            {},
            {
                preserveState: true,
                preserveScroll: true,
                onSuccess: () =>
                    setNotifications((prev) =>
                        prev.map((n) =>
                            n.id === id ? { ...n, is_read: true } : n,
                        ),
                    ),
            },
        );
    };

    return (
        <div
            className="
            flex items-center justify-between px-6 py-4 sticky top-0 z-40
            bg-white        dark:bg-dark-sidebar
            border-b border-mint-200 dark:border-dark-border/20
            transition-colors duration-300
        "
        >
            {/* LEFT */}
            <div className="flex items-center gap-4">
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
                            border border-mint-200 dark:border-dark-border/20
                            text-kost-dark  dark:text-mint-50
                            placeholder-kost-muted dark:placeholder-mint-100/30
                            focus:outline-none focus:ring-2
                            focus:ring-mint-200 dark:focus:ring-mint-300/40
                            transition
                        "
                    />
                </div>

                {/* DARK MODE */}
                <button
                    onClick={() => setIsDark(!isDark)}
                    className="
                        p-2 rounded-lg transition
                        bg-mint-50      dark:bg-dark-card
                        border border-mint-200 dark:border-dark-border/20
                        text-kost-muted  dark:text-mint-100/60
                        hover:bg-mint-100 dark:hover:bg-dark-card/60
                    "
                    aria-label="Toggle dark mode"
                >
                    {isDark ? (
                        <Sun className="w-4 h-4 text-mint-200" />
                    ) : (
                        <Moon className="w-4 h-4" />
                    )}
                </button>

                {/* MESSAGE */}
                <Link
                    href={route("owner.messages")}
                    className="
                        p-2 rounded-lg transition
                        bg-mint-50      dark:bg-dark-card
                        border border-mint-200 dark:border-dark-border/20
                        text-kost-muted dark:text-mint-100/60
                        hover:bg-mint-100 dark:hover:bg-dark-card/60
                    "
                >
                    <MessageCircleIcon className="w-4 h-4" />
                </Link>

                {/* NOTIFICATION */}
                <div className="relative">
                    <button
                        onClick={() => {
                            setOpenNotification(!openNotification);
                            setOpenProfile(false);
                        }}
                        className="
                            relative p-2 rounded-lg transition
                            bg-mint-50      dark:bg-dark-card
                            border border-mint-200 dark:border-dark-border/20
                            hover:bg-mint-100 dark:hover:bg-dark-card/60
                        "
                    >
                        <Bell className="w-4 h-4 text-kost-muted dark:text-mint-100/60" />
                        {unreadCount > 0 && (
                            <span
                                className="
                                absolute -top-1 -right-1
                                min-w-[16px] h-4 px-1 rounded-full
                                text-[10px] font-medium
                                flex items-center justify-center
                                bg-red-400 text-white
                            "
                            >
                                {unreadCount > 9 ? "9+" : unreadCount}
                            </span>
                        )}
                    </button>

                    <AnimatePresence>
                        {openNotification && (
                            <NotificationDropdown
                                notifications={notifications}
                                onClose={() => setOpenNotification(false)}
                                onMarkAll={handleMarkAll}
                                onMarkOne={handleMarkOne}
                            />
                        )}
                    </AnimatePresence>
                </div>

                {/* PROFILE */}
                <div className="relative">
                    <button
                        onClick={() => {
                            setOpenProfile(!openProfile);
                            setOpenNotification(false);
                        }}
                        className="
                            flex items-center gap-2 px-3 py-1.5 rounded-lg transition
                            bg-mint-50      dark:bg-dark-card
                            border border-mint-200 dark:border-dark-border/20
                            hover:bg-mint-100 dark:hover:bg-dark-card/60
                        "
                    >
                        <div
                            className="
                            w-7 h-7 rounded-full flex items-center justify-center
                            text-sm font-medium capitalize
                            bg-mint-200 dark:bg-mint-200/20
                            text-kost-dark dark:text-mint-50
                        "
                        >
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
                                        border border-mint-200 dark:border-dark-border/20
                                        shadow-sm
                                    "
                                >
                                    <Link
                                        as="button"
                                        href={route("profile")}
                                        onClick={() => setOpenProfile(false)}
                                        className="w-full text-left px-4 py-2.5 text-sm text-kost-dark dark:text-mint-50 hover:bg-mint-50 dark:hover:bg-dark-sidebar transition"
                                    >
                                        Profile
                                    </Link>
                                    <button className="w-full text-left px-4 py-2.5 text-sm text-kost-dark dark:text-mint-50 hover:bg-mint-50 dark:hover:bg-dark-sidebar transition">
                                        Settings
                                    </button>
                                    <div className="border-t border-mint-200 dark:border-dark-border/20" />
                                    <Link
                                        href={route("landing")}
                                        as="button"
                                        onClick={() => setOpenProfile(false)}
                                        className="w-full text-left px-4 py-2.5 text-sm text-kost-dark dark:text-mint-50 hover:bg-mint-50 dark:hover:bg-dark-sidebar transition"
                                    >
                                        Landing
                                    </Link>
                                    <div className="border-t border-mint-200 dark:border-dark-border/20" />
                                    <Link
                                        href={route("logout")}
                                        method="post"
                                        as="button"
                                        onClick={() => setOpenProfile(false)}
                                        className="w-full text-left px-4 py-2.5 text-sm text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition"
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
