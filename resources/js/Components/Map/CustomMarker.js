// src/Components/Map/mapIcon.js
import L from "leaflet";

// CSS bawaan agar tidak ada kotak putih di sekitar ikon
if (typeof window !== "undefined") {
    const style = document.createElement("style");
    style.innerHTML = `
        .custom-font-marker {
            background: none !important;
            border: none !important;
        }
    `;
    document.head.appendChild(style);
}

// Export fungsi untuk membuat ikon merah
export const createLocationIcon = (color = "rgb(255, 0, 0)", size = 32) => {
    // Menggunakan SVG path resmi dari ikon location-dot FontAwesome
    const svgIcon = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="${size}" height="${size}" fill="${color}">
            <path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"/>
        </svg>
    `;

    return L.divIcon({
        html: svgIcon,
        className: "custom-font-marker",
        iconSize: [size, size],
        iconAnchor: [size / 2, size], // Titik tajam bawah SVG pas di koordinat
        popupAnchor: [0, -size],
    });
};