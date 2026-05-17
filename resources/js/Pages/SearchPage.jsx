import { useState } from "react";
import { router } from "@inertiajs/react";

import SearchBar from "@/Components/Search/SearchBar";
import FilterSidebar from "@/Components/Search/FilterSidebar";
import KosCard from "@/Components/Search/KosCard";
import ResultHeader from "@/Components/Search/ResultHeader";
import FilterChips from "@/Components/Search/FilterChips";
import MobileFilterDrawer from "@/Components/Search/MobileFilterDrawer";
import SkeletonCard from "@/Components/Search/SkeletonCard";
import SortDropdown from "@/Components/Search/SortDropdown";
import { MapContainer, Marker, Popup, Circle } from "react-leaflet";

import useSearchFilter from "@/hooks/useSearchFilter";
import { Home, Loader2 } from "lucide-react";
import GoogleTileLayer from "@/Components/Map/GoogleTileLayer";
import Pagination from "@/Components/Pagination";
import { createLocationIcon } from "@/Components/Map/CustomMarker";

export default function SearchPage({ properties = [], query = "", facilities = [] }) {

        const defaultFilters = {
            type: "all",
            maxPrice: 2000000,
            facilities: [],
        };

        const [keyword, setKeyword] = useState(query);
        const [sortBy, setSortBy] = useState("relevance");
        const [showFilter, setShowFilter] = useState(false);
        const [isLoading, setIsLoading] = useState(false);

        const [filters, setFilters] = useState(defaultFilters);
        const [applied, setApplied] = useState(defaultFilters);
        const [appliedKeyword, setAppliedKeyword] = useState(query);

        const [radius, setRadius] = useState(5);
        const [position, setPosition] = useState(null);
        const [selectedLocation, setSelectedLocation] = useState(null);

        const handleApply = () => {
            setApplied(filters);
            setAppliedKeyword(keyword);
            setShowFilter(false);
        };

        const handleSearch = () => {
            setIsLoading(true);
            setAppliedKeyword(keyword);

            router.get(
                "/search",
                { q: keyword },
                {
                    preserveState: true,
                    replace: true,
                    onFinish: () => setIsLoading(false),
                }
            );
        };

        const handleClear = () => {
            setAppliedKeyword("");
            setKeyword("");
            setPosition(null);
        }

        const handleReset = () => {
            setKeyword("");
            setFilters(defaultFilters);
            setApplied(defaultFilters);
            setAppliedKeyword("");
            setShowFilter(false);
        };

        const patchApplied = (patch) => {
            const next = { ...applied, ...patch };
            setApplied(next);
            setFilters(next);
        };

    const filtered = useSearchFilter({
        properties,
        applied,
        appliedKeyword,
        sortBy,
        position,
        radius,
        selectedLocation
    });

    const sidebar = (
        <FilterSidebar
            filters={filters}
            setFilters={setFilters}
            keyword={keyword}
            setKeyword={setKeyword}
            onApply={handleApply}
            onReset={handleReset}
            facilities={facilities}
        />
    );

    const redIcon = createLocationIcon();
    
    const MapView = ({ properties }) => (
        <div className="w-full h-full rounded-2xl overflow-hidden border border-mint-200 dark:border-dark-border/20">
            <MapContainer center={position? [position.lat, position.lng]: [-8.159822347307612, 113.72309285357674]}
                zoom={15}
                style={{ height: "100%", width: "100%" }}
            >
                <GoogleTileLayer />

                {position && (
                    <Circle
                        center={[position.lat, position.lng]}
                        radius={radius * 1000}
                        pathOptions={{
                            color: "#4ade80",
                            fillColor: "#86efac",
                            fillOpacity: 0.2,
                        }}
                    />
                )}

                {position && (
                    <Marker position={[position.lat, position.lng]}>
                        <Popup>
                            Lokasi pencarian
                        </Popup>
                    </Marker>
                )}
                

                {/* Marker semua kos */}
                {properties.map((property) => (

                    <Marker key={property.id} 
                            icon={redIcon}
                            position={[ property.latitude, property.longitude ]} >
                                
                        <Popup>
                            <div className="space-y-1">

                                <h3 className="font-semibold">
                                    {property.name}
                                </h3>

                                <p className="text-xs text-gray-500">
                                    {property.address}
                                </p>

                                <p className="text-sm font-medium text-green-600">
                                    Rp {Number(property.room_types?.[0]?.price ?? 0)
                                        .toLocaleString("id-ID")}
                                </p>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
    </div>
);

    /* ================= EMPTY STATE ================= */

    const EmptyState = ({ onReset, keyword }) => (
        <div className="flex flex-col items-center justify-center py-20 gap-3 rounded-2xl border-2 border-dashed border-mint-200 dark:border-dark-border/20 bg-white dark:bg-dark-card">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-mint-50 dark:bg-dark-bg border border-mint-200 dark:border-dark-border/20">
                <Home className="w-7 h-7 text-mint-300" />
            </div>

            <div className="text-center">
                <p className="text-sm font-semibold text-kost-dark dark:text-mint-50">
                    Kos tidak ditemukan
                </p>
                <p className="text-xs text-kost-muted dark:text-mint-100/40 mt-1">
                    {keyword
                        ? `Tidak ada hasil untuk "${keyword}".`
                        : "Coba ubah atau hapus filter yang aktif."}
                </p>
            </div>

            <button
                onClick={onReset}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-mint-300 hover:bg-secondary text-white transition"
            >
                Reset Filter
            </button>
        </div>
    );

    return (
        <div className="min-h-screen bg-background dark:bg-dark-bg px-[5%] lg:px-[8%] py-6 transition-colors duration-300">
            {/* TOP BAR */}
            <div className="sticky top-0 z-20 bg-background/95 dark:bg-dark-bg/95 backdrop-blur-md pb-3 pt-1">
                <SearchBar
                    keyword={keyword}
                    setKeyword={setKeyword}
                    onSearch={handleSearch}
                    onClear={handleClear}
                    onSelectLocation={(location) => {
                        setPosition({
                            lat: location.lat,
                            lng: location.lng
                        });

                        setSelectedLocation(location);
                    }}
                />

                {/* RADIUS */}
                <div className="mt-3 flex items-center gap-3">

                    <span className="text-sm">
                        Radius:
                    </span>

                    <input
                        type="range"
                        min="1"
                        max="20"
                        value={radius}
                        onChange={(e) => setRadius(Number(e.target.value))}
                    />

                    <span className="text-sm font-semibold">
                        {radius} km
                    </span>

                </div>

                <div className="flex items-center justify-between mt-3 lg:hidden">
                    <p className="text-xs text-kost-muted dark:text-mint-100/50">
                        {isLoading ? (
                            <span className="flex items-center gap-1 text-mint-300">
                                <Loader2 className="w-3 h-3 animate-spin" />
                                Mencari...
                            </span>
                        ) : (
                            <>
                                <strong className="text-kost-dark dark:text-mint-50">
                                    {filtered.length}
                                </strong>{" "}
                                kos
                            </>
                        )}
                    </p>
                </div>
            </div>

            <MobileFilterDrawer
                open={showFilter}
                onClose={() => setShowFilter(false)}
            >
                {sidebar}
            </MobileFilterDrawer>

            <div className="flex gap-5 mt-4">
                <aside className="hidden lg:block w-[256px] flex-shrink-0">
                    {sidebar}
                </aside>

                <main className="flex-1 min-w-0">

                    <div className="flex items-center gap-2 mb-3">
                        <SortDropdown value={sortBy} onChange={setSortBy} />
                    </div>

                    <ResultHeader
                        count={filtered.length}
                        keyword={appliedKeyword}
                        sortBy={sortBy}
                        setSortBy={setSortBy}
                        isLoading={isLoading}
                    />

                    <FilterChips
                        applied={applied}
                        onRemoveType={() => patchApplied({ type: "all" })}
                        onRemovePrice={() =>
                            patchApplied({ maxPrice: 2000000 })
                        }
                        onRemoveFacility={(facility) =>
                            patchApplied({
                                facilities: applied.facilities.filter(
                                    (item) => item !== facility
                                ),
                            })
                        }
                        onClearAll={handleReset}
                    />

                    {isLoading ? (
                        <div className="space-y-3">
                            {[...Array(4)].map((_, index) => (
                                <SkeletonCard key={index} />
                            ))}
                        </div>
                    ) : filtered.length > 0 ? (
                        <div className="space-y-3">
                            {filtered.map((kos) => (
                                <KosCard key={kos.id} kos={kos} />
                            ))}
                            <Pagination links={properties.links} />
                        </div>
                    ) : (
                        <EmptyState
                            onReset={handleReset}
                            keyword={appliedKeyword}
                        />
                    )}
                </main>

                <aside className="hidden lg:block w-[32%] flex-shrink-0 h-[680px] sticky top-24">
                    <MapView properties={filtered} />
                </aside>
            </div>
        </div>
    );
}