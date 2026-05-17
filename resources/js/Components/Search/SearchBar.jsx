import { useEffect, useRef, useState } from "react";
import { MapPin, Search, X } from "lucide-react";

export default function SearchBar ({ keyword, setKeyword, onSearch, onClear, onSelectLocation }) {
    const inputRef = useRef(null);
    const [suggestions, setSuggestions] = useState([]);
    const isSelecting = useRef(false);

    useEffect(() => {
        if (isSelecting.current) {
            isSelecting.current = false;
            return;
        }

        if (keyword.length < 3) {
            setSuggestions([]);
            return;
        }
        const delayDebounce = setTimeout(async () => {
            try {
                const res = await fetch(
                    `https://nominatim.openstreetmap.org/search?format=json&countrycodes=id&q=${keyword}`,
                    {
                        headers: {
                            'Accept-Language': 'id'
                        }
                    }
                );
                const data = await res.json();
    
                setSuggestions(data);
    
            } catch (error) {
                console.error(error);
            }
        }, 500);
        return () => clearTimeout(delayDebounce);
    }, [keyword]);

        return (
            <div
                className="
                    relative
                    flex items-center gap-3 px-5 py-2
                    bg-white dark:bg-dark-card
                    rounded-2xl border border-mint-200 dark:border-dark-border/20
                    shadow-sm transition
                    focus-within:border-mint-300
                "
            >
                <MapPin className="w-5 h-5 text-mint-300 flex-shrink-0" />

                <input
                    ref={inputRef}
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            setSuggestions([]);
                            onSearch();
                        }
                    }}
                    placeholder="Cari lokasi, kampus, atau nama kos..."
                    className="
                        flex-1 py-2.5 bg-transparent outline-none border-none focus:ring-0
                        text-sm text-kost-dark dark:text-mint-50
                        placeholder:text-kost-muted/50 dark:placeholder:text-mint-100/30
                    "
                    onBlur={() => {
                        setTimeout(() => {
                            setSuggestions([]);
                        }, 150);
                    }}
                />

                {suggestions.length > 0 && (

                    <div className="
                        absolute top-full left-0 right-0 mt-2 z-50
                        bg-white rounded-2xl shadow-xl
                        border border-mint-200
                        overflow-hidden
                    ">

                        {suggestions.map((item) => (

                            <button
                                key={item.place_id}
                                onClick={() => {

                                    isSelecting.current = true;

                                    setKeyword(item.display_name);

                                    onSelectLocation({
                                        lat: Number(item.lat),
                                        lng: Number(item.lon),
                                        name: item.display_name
                                    });

                                    setSuggestions([]);

                                }}
                                className="
                                    w-full text-left px-4 py-3
                                    hover:bg-mint-50
                                    border-b last:border-0
                                "
                            >
                                {item.display_name}
                            </button>

                        ))}

                    </div>
                )}

                {keyword && (
                    <button
                        onClick={() => {
                            onClear();
                            inputRef.current?.focus();
                        }}
                        className="
                            w-6 h-6 rounded-full flex items-center justify-center
                            bg-mint-100 dark:bg-dark-bg
                            text-kost-muted dark:text-mint-100/50
                            hover:text-kost-dark dark:hover:text-mint-50
                            transition
                        "
                    >
                        <X className="w-3.5 h-3.5" />
                    </button>
                )}

                <button
                    onClick={() => {
                        setSuggestions([]);
                        onSearch();
                    }}
                    className="
                        flex items-center gap-2 px-5 py-2.5 rounded-xl
                        bg-mint-300 hover:bg-secondary
                        text-white text-sm font-semibold
                        transition active:scale-[0.98]
                    "
                >
                    <Search className="w-4 h-4" />
                    <span className="hidden sm:inline">Cari</span>
                </button>
            </div>
        );
    };