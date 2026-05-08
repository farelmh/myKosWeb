import AdminLayout from "@/Layouts/AdminLayout";
import TableProperties from "@/Components/Admin/TableProperties";
import Pagination from "@/Components/Pagination";

export default function Properties({ properties }) {
    return (
        <AdminLayout>

            <h1 className="text-2xl font-bold mb-6">Data Kos</h1>

            <TableProperties properties={properties.data} />

            <Pagination links={properties.links}/>

        </AdminLayout>
    );
}