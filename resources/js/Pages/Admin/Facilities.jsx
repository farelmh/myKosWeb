import AdminLayout from "@/Layouts/AdminLayout";
import TableFacilities from "@/Components/Admin/TableFacilities";
import Pagination from "@/Components/Pagination";
import { Plus } from "lucide-react";
import { Link } from "@inertiajs/react";

export default function Facilities({ facilities }) {
    console.log("Halaman Saat Ini:", facilities.current_page);
    console.log("Data:", facilities.data);

    return (
        <AdminLayout>

            {/* Header Section dengan Flexbox */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold mb-6 text-kost-dark dark:text-mint-50">Manajemen Fasilitas</h1>
                    <p className="text-sm text-kost-dark dark:text-mint-50 mt-1">
                        Kelola daftar fasilitas yang tersedia untuk properti kos.
                    </p>
                </div>

                {/* Tombol Tambah */}
                <Link
                    href={route('admin.facilities.create')} // Ganti dengan nama route kamu
                    className="
                        inline-flex 
                        items-center 
                        justify-center 
                        gap-2 
                        px-5 
                        py-2.5 
                        bg-indigo-600 
                        hover:bg-indigo-700 
                        text-white 
                        text-sm 
                        font-bold 
                        rounded-xl 
                        transition-all 
                        shadow-lg 
                        shadow-indigo-500/20
                    "
                >
                    <Plus size={18} />
                    Tambah Fasilitas
                </Link>
            </div>

            <TableFacilities
             key={facilities.current_page}
             facilities={facilities.data} />
            
            <Pagination links={facilities.links}/>

        </AdminLayout>
    );
}