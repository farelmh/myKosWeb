import OwnerLayout from "@/Layouts/OwnerLayout";

export default function Complaints({ propertyId }) {
    return (
        <OwnerLayout>
            <h1 className="text-xl font-bold text-kost-dark dark:text-mint-50">
                Keluhan Kos #{propertyId}
            </h1>
        </OwnerLayout>
    );
}