import { TileLayer } from "react-leaflet";

export default function GoogleTileLayer() {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    
    return (
        <TileLayer
            url={`https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}&key=${apiKey}`}
            attribution='&copy; Google Maps'
            maxZoom={20}
        />
    );
}