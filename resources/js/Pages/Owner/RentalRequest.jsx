import OwnerLayout from "@/Layouts/OwnerLayout";
import TableRental from "@/Components/Owner/TableRental";
import Pagination from "@/Components/Pagination";
import { usePage } from "@inertiajs/react";

export default function RentalRequest({ rentals }) {

    const { ownerProperties } = usePage().props;

    return(
        <OwnerLayout>

        <TableRental rentals={rentals.data} />

        <Pagination links={rentals.links} />

        </OwnerLayout>
    );
}