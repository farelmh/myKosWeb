import AdminLayout from "@/Layouts/AdminLayout";
import Pagination from "@/Components/Pagination";
import TablePengajuan from "@/Components/Admin/TablePengajuan";

export default function Request({ applications }) {
    return (
        <AdminLayout>
            <div className="space-y-6">
                
                {/* HEADER */}
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold mb-6 text-kost-dark dark:text-mint-50">Pengajuan Kos</h1>
                </div>

                {/* TABLE */}
                <TablePengajuan applications={applications.data} />

                {/* PAGINATION */}
                <Pagination links={applications.links} />
            </div>
        </AdminLayout>
    );
}