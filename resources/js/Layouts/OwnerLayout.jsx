import { useState, useEffect } from "react";
import SideBar from "@/Components/Owner/SideBar";
import TopBar from "@/Components/Owner/TopBar";
import FlashAlert from "@/Components/FlashAlert";

export default function OwnerLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // close sidebar when resize
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) setSidebarOpen(false);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="flex h-screen bg-white       dark:bg-dark-sidebar
                border-r
                border-mint-200 dark:border-dark-border/20
                transition-colors duration-300 overflow-hidden">

        <FlashAlert />

            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <SideBar open={sidebarOpen} setOpen={setSidebarOpen} />

            <div className="flex-1 flex flex-col">

                <TopBar setOpen={setSidebarOpen} />

                <main className="flex-1 overflow-y-auto p-6 md:p-8">
                    {children}
                </main>

            </div>
        </div>
    );
}