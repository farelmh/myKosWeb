import OwnerLayout from "@/Layouts/OwnerLayout";
import Card from "../../Components/Admin/Card";
import Charts from "../../Components/Admin/Charts";
import Activity from "../../Components/Admin/Activity";
import { usePage } from "@inertiajs/react";


export default function Dashboard() {
    
    const { ownerProperties } = usePage().props;
    
    return (
        <OwnerLayout>

            {/* TITLE */}
            <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

            {/* STATS */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
                <Card title="Users" value="120" />
                <Card title="Kos Listed" value="54" />
                <Card title="Bookings" value="89" />
            </div>

            {/* CHART + ACTIVITY */}
            <div className="grid lg:grid-cols-3 gap-6 mb-8">
                <div className="lg:col-span-2">
                    <Charts />
                </div>
                <Activity />
            </div>

        </OwnerLayout>
    );
}