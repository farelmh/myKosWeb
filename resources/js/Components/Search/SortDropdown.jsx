import { SORT_OPTIONS } from "@/constants/searchConstant";
import { ArrowUpDown, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function SortDropdown ({ value, onChange }) {
        const [open, setOpen] = useState(false);
        const ref = useRef(null);

        useEffect(() => {
            const close = (e) => {
                if (!ref.current?.contains(e.target)) setOpen(false);
            };

            document.addEventListener("mousedown", close);
            return () => document.removeEventListener("mousedown", close);
        }, []);

        const current = SORT_OPTIONS.find((item) => item.value === value);

        return (
            <div className="relative" ref={ref}>
                <button
                    onClick={() => setOpen((prev) => !prev)}
                    className="
                        flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold
                        bg-white dark:bg-dark-card
                        border border-mint-200 dark:border-dark-border/20
                        text-kost-dark dark:text-mint-100/80
                        hover:border-mint-300 transition
                    "
                >
                    <ArrowUpDown className="w-3.5 h-3.5 text-mint-300" />
                    {current?.label}
                    <ChevronDown
                        className={`w-3.5 h-3.5 text-kost-muted transition ${
                            open ? "rotate-180" : ""
                        }`}
                    />
                </button>

                {open && (
                    <div
                        className="
                            absolute right-0 top-full mt-2 z-30 py-1.5 min-w-[190px]
                            bg-white dark:bg-dark-card rounded-2xl overflow-hidden
                            border border-mint-200 dark:border-dark-border/20
                            shadow-xl
                        "
                    >
                        {SORT_OPTIONS.map((option) => {
                            const active = option.value === value;

                            return (
                                <button
                                    key={option.value}
                                    onClick={() => {
                                        onChange(option.value);
                                        setOpen(false);
                                    }}
                                    className={`
                                        w-full text-left px-4 py-2.5 text-xs font-medium
                                        flex items-center gap-3 transition
                                        ${
                                            active
                                                ? "bg-mint-50 dark:bg-dark-bg text-kost-dark dark:text-mint-50"
                                                : "text-kost-muted dark:text-mint-100/60 hover:bg-mint-50 dark:hover:bg-dark-bg"
                                        }
                                    `}
                                >
                                    <span
                                        className={`
                                            w-4 h-4 rounded-full border-2 flex items-center justify-center
                                            ${
                                                active
                                                    ? "border-mint-300 bg-mint-300"
                                                    : "border-mint-200 dark:border-dark-border/30"
                                            }
                                        `}
                                    >
                                        {active && (
                                            <span className="w-1.5 h-1.5 rounded-full bg-white" />
                                        )}
                                    </span>
                                    {option.label}
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>
        );
    };