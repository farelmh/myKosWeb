import { useEffect } from "react";

export default function MobileFilterDrawer ({ open, onClose, children }) {
        useEffect(() => {
            document.body.style.overflow = open ? "hidden" : "";
            return () => {
                document.body.style.overflow = "";
            };
        }, [open]);

        if (!open) return null;

        return (
            <div className="fixed inset-0 z-50 lg:hidden">
                <div
                    className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                    onClick={onClose}
                />

                <div className="absolute bottom-0 left-0 right-0 max-h-[88vh] overflow-y-auto bg-background dark:bg-dark-bg rounded-t-3xl">
                    <div className="sticky top-0 flex justify-center pt-3 pb-2 bg-background dark:bg-dark-bg">
                        <div className="w-10 h-1 rounded-full bg-mint-300" />
                    </div>

                    <div className="px-4 pb-6">{children}</div>
                </div>
            </div>
        );
    };