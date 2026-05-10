import { Marker, useMapEvents,  Popup } from "react-leaflet";
import { useMemo, useRef } from "react";

export function LocationMarker({ position, setPosition}) {
    const markerRef = useRef(null);

    const map = useMapEvents({
        click(e) {
            setPosition(e.latlng);
            map.flyTo(e.latlng, map.getZoom());
        }
    });

    const evenHandlers = useMemo(() => ({
        dragend() {
            const marker = markerRef.current;
            if (marker != null) {
                setPosition(marker.getLatlng());
            }
        },
    }), [setPosition]);

    return position === null ? null : (
        <Marker 
            position={position}
            draggable={true}
            eventHandlers={evenHandlers}
            ref={markerRef}>
            <Popup>
                {position && typeof position.lat !== 'undefined' ? (
                    <>
                        {parseFloat(position.lat).toFixed(4)}, {parseFloat(position.lng).toFixed(4)}
                    </>
                ) : (
                    "Lokasi belum ditentukan"
                )}
            </Popup>
        </Marker>
    );
}