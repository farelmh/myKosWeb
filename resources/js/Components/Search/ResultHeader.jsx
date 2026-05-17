import { Loader2 } from "lucide-react";
import SortDropdown from "./SortDropdown";

export default function ResultHeader ({ count, keyword, sortBy, setSortBy, isLoading }) {
        <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-kost-muted dark:text-mint-100/50">
                {isLoading ? (
                    <span className="flex items-center gap-1.5 text-mint-300">
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        Mencari...
                    </span>
                ) : (
                    <>
                        <strong className="text-kost-dark dark:text-mint-50">
                            {count}
                        </strong>{" "}
                        kos ditemukan
                        {keyword && (
                            <>
                                {" "}
                                untuk{" "}
                                <strong className="text-kost-dark dark:text-mint-50">
                                    "{keyword}"
                                </strong>
                            </>
                        )}
                    </>
                )}
            </p>

            <div className="hidden lg:block">
                <SortDropdown value={sortBy} onChange={setSortBy} />
            </div>
        </div>
}