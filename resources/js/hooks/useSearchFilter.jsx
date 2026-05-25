import { useMemo } from "react";
import { calculateDistance } from "@/utils/calculateDistance";

export default function useSearchFilter({
    properties,
    applied,
    appliedKeyword,
    sortBy,
    position,
    radius,
    selectedLocation
}) {
    const propertyList = properties?.data || [];

    return useMemo(() => {
        let list = propertyList.filter((kos) => {
            let matchRadius = true;

        if (position && kos.latitude && kos.longitude) {

            const distance = calculateDistance(
                position.lat,
                position.lng,
                Number(kos.latitude),
                Number(kos.longitude)
            );

            kos.distance = distance
            
            matchRadius = distance <= radius;
        }

            const q = appliedKeyword.toLowerCase();

            let matchKeyword = true;

            if (!selectedLocation) {

                matchKeyword =
                    !q ||
                    kos.name?.toLowerCase().includes(q) ||
                    kos.city?.toLowerCase().includes(q) ||
                    kos.address?.toLowerCase().includes(q);

            }

            const price = Number(
                kos.price ?? kos.room_types?.[0]?.price ?? 0
            );

            const matchPrice =
                applied.maxPrice >= 2000000 ||
                price <= applied.maxPrice;

            const matchType =
                applied.type === "all" ||
                kos.type?.toLowerCase() === applied.type;

            const matchFacilities =
                applied.facilities.length === 0 ||
                applied.facilities.every((facility) =>
                    kos.facilities?.some(
                        (item) => item.name === facility
                    )
                );

            return (
                matchKeyword &&
                matchPrice &&
                matchType &&
                matchFacilities &&
                matchRadius
            );
        });

        if (sortBy === "price_asc") {
            list = [...list].sort(
                (a, b) =>
                    Number(a.price ?? a.room_types?.[0]?.price ?? 0) -
                    Number(b.price ?? b.room_types?.[0]?.price ?? 0)
            );
        }

        if (sortBy === "price_desc") {
            list = [...list].sort(
                (a, b) =>
                    Number(b.price ?? b.room_types?.[0]?.price ?? 0) -
                    Number(a.price ?? a.room_types?.[0]?.price ?? 0)
            );
        }

        if (sortBy === "rating") {
            list = [...list].sort(
                (a, b) => (b.rating ?? 0) - (a.rating ?? 0)
            );
        }

            if (applied.wishlistOnly) {
            list = list.filter(
                (property) => property.wishlists?.length > 0
            );
        }

        return list;

    }, [properties, appliedKeyword, applied, sortBy]);
}