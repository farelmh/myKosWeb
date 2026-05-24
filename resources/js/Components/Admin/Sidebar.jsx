import {
    LayoutDashboard, Users, Settings, LogOut,
    Home, ClipboardList, CheckCircle, Sofa, X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, usePage } from "@inertiajs/react";

const menuSections = [
    {
        title: "MAIN",
        items: [
            { name: "Dashboard", icon: LayoutDashboard, href: "/admin/dashboard" },
        ],
    },
    {
        title: "MANAGEMENT",
        items: [
            { name: "Pengguna",   icon: Users,         href: "/admin/users"       },
            { name: "Kos",        icon: Home,          href: "/admin/properties"  },
            { name: "Permintaan", icon: CheckCircle,   href: "/admin/request"     },
            { name: "Fasilitas",  icon: Sofa,          href: "/admin/facilities"  },
            { name: "Transaksi",  icon: ClipboardList, href: "/admin/transaksi"   },
        ],
    },
];

const SidebarContent = ({ onClose }) => {
    const { url } = usePage();

    return (
        <div className="
            w-64 h-full flex flex-col
            bg-white       dark:bg-dark-sidebar
            border-r border-mint-200 dark:border-dark-border/20
            transition-colors duration-300
        ">
            <div className="p-5 flex items-center justify-between border-b border-mint-200 dark:border-dark-border/20">
                <span className="text-lg font-bold">
                    <span className="text-mint-300">MyKost</span>
                    <span className="text-kost-dark dark:text-mint-50"> Admin</span>
                </span>

                {onClose && (
                    <button
                        onClick={onClose}
                        className="
                            md:hidden p-1.5 rounded-lg transition
                            text-kost-muted dark:text-mint-100/40
                            hover:bg-mint-50 dark:hover:bg-dark-bg
                            hover:text-kost-dark dark:hover:text-mint-50
                        "
                    >
                        <X className="w-4 h-4" />
                    </button>
                )}
            </div>

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
                            const Icon     = item.icon;
                            const isActive = url.startsWith(item.href);

                            return (
                                <Link
                                    key={j}
                                    href={item.href}
                                    onClick={onClose} 
                                    preserveState
                                    preserveScroll
                                    className={`
                                        flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm
                                        transition-all duration-150 mb-0.5
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

            <div className="p-3 border-t border-mint-200 dark:border-dark-border/20">
                <Link
                    href="/logout"
                    method="post"
                    as="button"
                    className="
                        flex items-center gap-3 w-full
                        px-3 py-2.5 rounded-xl text-sm
                        text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10
                        transition
                    "
                >
                    <LogOut className="w-4 h-4 flex-shrink-0" />
                    Logout
                </Link>
            </div>
        </div>
    );
};

export default function Sidebar({ open, setOpen }) {
    return (
        <>
            <motion.aside
                initial={{ x: -260 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="hidden md:flex h-screen sticky top-0 flex-shrink-0"
            >
                <SidebarContent />
            </motion.aside>

            <AnimatePresence>
                {open && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
                            onClick={() => setOpen(false)}
                        />

                        <motion.div
                            initial={{ x: -280 }}
                            animate={{ x: 0 }}
                            exit={{ x: -280 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="fixed inset-y-0 left-0 z-50 md:hidden"
                        >
                            <SidebarContent onClose={() => setOpen(false)} />
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}