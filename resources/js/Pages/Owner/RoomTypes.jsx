import OwnerLayout from "@/Layouts/OwnerLayout";
import TableRoomTypes from "@/Components/Owner/TableRoomTypes";
import Pagination from "@/Components/Pagination";
import { usePage } from "@inertiajs/react";

export default function RoomTypes({ RoomTypes }) {

    const { ownerProperties } = usePage().props;

    return (
            <OwnerLayout>
    
                {/* Header Section dengan Flexbox */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-white">Manajemen Tipe Kamar</h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Kelola daftar tipe kamar yang tersedia di kos
                        </p>
                    </div>
    
                    {/* Tombol Tambah */}
                    <Link
                        href={route('owner.roomTypes.create')} // Ganti dengan nama route kamu
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
                        Tambah Tipe Kamar
                    </Link>
                </div>
    
                <TableRoomTypes RoomTypes={RoomTypes.data} />
                
                <Pagination links={RoomTypes.links}/>
    
            </OwnerLayout>
        );
}