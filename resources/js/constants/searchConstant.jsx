import {
    Wifi,
    Wind,
    Car,
    Bath,
    Users,
    User,
} from "lucide-react";

export const FACILITY_ICONS = {
    WiFi: <Wifi className="w-3 h-3" />,
    AC: <Wind className="w-3 h-3" />,
    Parkir: <Car className="w-3 h-3" />,
    "Parkir Motor": <Car className="w-3 h-3" />,
    "Kamar Mandi Dalam": <Bath className="w-3 h-3" />,
};

export const TYPE_OPTIONS = [
    { label: "Semua", value: "all", icon: <Users className="w-3.5 h-3.5" /> },
    { label: "Putra", value: "putra", icon: <User className="w-3.5 h-3.5" /> },
    { label: "Putri", value: "putri", icon: <User className="w-3.5 h-3.5" /> },
    { label: "Campuran", value: "campur", icon: <Users className="w-3.5 h-3.5" /> },
];

export const SORT_OPTIONS = [
    { label: "Relevansi", value: "relevance" },
    { label: "Harga Terendah", value: "price_asc" },
    { label: "Harga Tertinggi", value: "price_desc" },
    { label: "Rating Terbaik", value: "rating" },
];