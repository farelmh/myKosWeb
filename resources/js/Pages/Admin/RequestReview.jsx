import AdminLayout from "@/Layouts/AdminLayout";
import Pagination from "@/Components/Pagination";

export default function Request({ applications }) {
    return (
        <AdminLayout>
            <div className="space-y-6">
                
                {/* HEADER */}
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Pengajuan Kos</h1>
                </div>

                {/* TABLE */}
                <TablePengajuan applications={applications.data} />

                {/* PAGINATION */}
                <Pagination links={applications.links} />
            </div>
        </AdminLayout>
    );
}