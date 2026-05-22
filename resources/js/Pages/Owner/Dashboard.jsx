import OwnerLayout from "@/Layouts/OwnerLayout";
import {
    Home,
    BedDouble,
    CheckCircle,
    Wallet,
    AlertTriangle,
    Star,
    CreditCard,
    ArrowUpRight,
} from "lucide-react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";
import { usePage } from "@inertiajs/react";

const revenueData = [
    { name: "Jan", revenue: 3200000 },
    { name: "Feb", revenue: 4500000 },
    { name: "Mar", revenue: 3900000 },
    { name: "Apr", revenue: 6200000 },
    { name: "Mei", revenue: 7800000 },
    { name: "Jun", revenue: 8200000 },
];

const activities = [
    { text: "Pembayaran kamar A1 diterima", time: "1 jam lalu", type: "payment" },
    { text: "Keluhan baru: Wifi lambat", time: "3 jam lalu", type: "complaint" },
    { text: "Review baru masuk", time: "Kemarin", type: "review" },
];

const complaints = [
    { title: "Wifi lambat", status: "Pending" },
    { title: "Air kamar mandi kecil", status: "Diproses" },
];

const reviews = [
    { name: "Budi", rating: 5, comment: "Kamar bersih dan nyaman." },
    { name: "Sinta", rating: 4, comment: "Lokasi strategis." },
];

const payments = [
    { name: "Andi", amount: 850000, status: "Lunas" },
    { name: "Rina", amount: 750000, status: "Menunggu" },
];

const formatRupiah = (value) =>
    new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    }).format(value);

const StatCard = ({ title, value, subtitle, icon: Icon }) => (
    <div className="rounded-2xl p-5 bg-white dark:bg-dark-card border border-mint-200 dark:border-dark-border/20 transition">
        <div className="flex items-start justify-between gap-4">
            <div>
                <p className="text-xs text-kost-muted dark:text-mint-100/40">
                    {title}
                </p>
                <h3 className="text-2xl font-bold text-kost-dark dark:text-mint-50 mt-2">
                    {value}
                </h3>
                {subtitle && (
                    <p className="text-xs text-kost-muted dark:text-mint-100/40 mt-1">
                        {subtitle}
                    </p>
                )}
            </div>

            <div className="w-10 h-10 rounded-xl bg-mint-100 dark:bg-mint-200/10 border border-mint-200 dark:border-mint-300/20 flex items-center justify-center">
                <Icon className="w-5 h-5 text-mint-300" />
            </div>
        </div>
    </div>
);

const SectionCard = ({ title, children, action }) => (
    <div className="rounded-2xl p-5 bg-white dark:bg-dark-card border border-mint-200 dark:border-dark-border/20 transition h-full">
        <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-kost-dark dark:text-mint-50">
                {title}
            </h3>
            {action}
        </div>
        {children}
    </div>
);

const RevenueChart = () => {
    const axisColor = "#7aa080";
    const lineColor = "#93BFC7";

    return (
        <SectionCard title="Revenue Analytics">
            <ResponsiveContainer width="100%" height={240}>
                <LineChart
                    data={revenueData}
                    margin={{ top: 8, right: 12, left: -15, bottom: 0 }}
                >
                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#ABE7B2"
                        opacity={0.18}
                        vertical={false}
                    />

                    <XAxis
                        dataKey="name"
                        tick={{ fill: axisColor, fontSize: 12 }}
                        axisLine={false}
                        tickLine={false}
                    />

                    <YAxis
                        tick={{ fill: axisColor, fontSize: 12 }}
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(v) => `${v / 1000000}jt`}
                    />

                    <Tooltip
                        formatter={(value) => formatRupiah(value)}
                        contentStyle={{
                            borderRadius: "12px",
                            border: "1px solid #ABE7B2",
                        }}
                    />

                    <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke={lineColor}
                        strokeWidth={2.5}
                        dot={{ fill: lineColor, r: 4, strokeWidth: 0 }}
                        activeDot={{ fill: lineColor, r: 6, strokeWidth: 0 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </SectionCard>
    );
};

const OccupancyCard = ({ occupied, total }) => {
    const percentage = total > 0 ? Math.round((occupied / total) * 100) : 0;

    return (
        <SectionCard title="Occupancy Rate">
            <div className="flex flex-col items-center justify-center py-5">
                <div className="relative w-36 h-36 rounded-full border-[12px] border-mint-100 dark:border-dark-bg flex items-center justify-center">
                    <div className="text-center">
                        <p className="text-3xl font-bold text-kost-dark dark:text-mint-50">
                            {percentage}%
                        </p>
                        <p className="text-xs text-kost-muted dark:text-mint-100/40">
                            Terisi
                        </p>
                    </div>
                </div>

                <div className="w-full mt-6">
                    <div className="flex justify-between text-xs text-kost-muted dark:text-mint-100/40 mb-2">
                        <span>{occupied} kamar terisi</span>
                        <span>{total - occupied} kosong</span>
                    </div>

                    <div className="h-2 rounded-full bg-mint-100 dark:bg-dark-bg overflow-hidden">
                        <div
                            className="h-full rounded-full bg-mint-300"
                            style={{ width: `${percentage}%` }}
                        />
                    </div>
                </div>
            </div>
        </SectionCard>
    );
};

export default function Dashboard({
    totalProperties, totalRooms, occupiedRooms,
}) {

    const { ownerProperties = [] } = usePage().props;

    // const totalProperties = ownerProperties.length || 1;
    // const totalRooms = 24;
    // const occupiedRooms = 18;
    const pendingComplaints = 2;
    const monthlyRevenue = 8200000;

    return (
        <OwnerLayout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-kost-dark dark:text-mint-50">
                        Dashboard
                    </h1>
                    <p className="text-sm text-kost-muted dark:text-mint-100/40 mt-1">
                        Ringkasan performa kos dan operasional Anda.
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
                    <StatCard
                        title="Properti Aktif"
                        value={totalProperties}
                        subtitle="Kos yang sedang dikelola"
                        icon={Home}
                    />
                    <StatCard
                        title="Total Kamar"
                        value={totalRooms}
                        subtitle="Semua kamar tersedia"
                        icon={BedDouble}
                    />
                    <StatCard
                        title="Kamar Terisi"
                        value={`${occupiedRooms}/${totalRooms}`}
                        subtitle="Occupancy aktif"
                        icon={CheckCircle}
                    />
                    <StatCard
                        title="Pendapatan Bulan Ini"
                        value={formatRupiah(monthlyRevenue)}
                        subtitle="Pembayaran diterima"
                        icon={Wallet}
                    />
                </div>

                <div className="grid lg:grid-cols-3 gap-5">
                    <div className="lg:col-span-2">
                        <RevenueChart />
                    </div>

                    <OccupancyCard occupied={occupiedRooms} total={totalRooms} />
                </div>

                <div className="grid lg:grid-cols-3 gap-5">
                    <SectionCard title="Recent Activity">
                        <div className="space-y-4">
                            {activities.map((item, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <span className="w-2 h-2 rounded-full bg-mint-300 mt-2" />
                                    <div>
                                        <p className="text-sm text-kost-dark dark:text-mint-50">
                                            {item.text}
                                        </p>
                                        <p className="text-xs text-kost-muted dark:text-mint-100/40 mt-1">
                                            {item.time}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </SectionCard>

                    <SectionCard
                        title="Keluhan Pending"
                        action={
                            <span className="text-xs text-red-400">
                                {pendingComplaints} pending
                            </span>
                        }
                    >
                        <div className="space-y-3">
                            {complaints.map((item, i) => (
                                <div
                                    key={i}
                                    className="flex items-center justify-between gap-3 p-3 rounded-xl bg-mint-50 dark:bg-dark-bg border border-mint-200 dark:border-dark-border/20"
                                >
                                    <div className="flex items-center gap-2">
                                        <AlertTriangle className="w-4 h-4 text-red-400" />
                                        <p className="text-sm text-kost-dark dark:text-mint-50">
                                            {item.title}
                                        </p>
                                    </div>
                                    <span className="text-xs text-kost-muted dark:text-mint-100/40">
                                        {item.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </SectionCard>

                    <SectionCard title="Quick Actions">
                        <div className="grid gap-3">
                            {[
                                "Tambah Kamar",
                                "Tambah Fasilitas",
                                "Lihat Keluhan",
                                "Lihat Pembayaran",
                            ].map((item) => (
                                <button
                                    key={item}
                                    className="flex items-center justify-between p-3 rounded-xl bg-mint-50 dark:bg-dark-bg border border-mint-200 dark:border-dark-border/20 text-sm text-kost-dark dark:text-mint-50 hover:bg-mint-100 dark:hover:bg-dark-card transition"
                                >
                                    {item}
                                    <ArrowUpRight className="w-4 h-4 text-mint-300" />
                                </button>
                            ))}
                        </div>
                    </SectionCard>
                </div>

                <div className="grid lg:grid-cols-2 gap-5">
                    <SectionCard title="Review Terbaru">
                        <div className="space-y-4">
                            {reviews.map((review, i) => (
                                <div
                                    key={i}
                                    className="p-4 rounded-xl bg-mint-50 dark:bg-dark-bg border border-mint-200 dark:border-dark-border/20"
                                >
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm font-medium text-kost-dark dark:text-mint-50">
                                            {review.name}
                                        </p>
                                        <div className="flex">
                                            {[...Array(review.rating)].map((_, x) => (
                                                <Star
                                                    key={x}
                                                    className="w-3.5 h-3.5 fill-yellow-400 stroke-yellow-400"
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-sm text-kost-muted dark:text-mint-100/50 mt-2">
                                        “{review.comment}”
                                    </p>
                                </div>
                            ))}
                        </div>
                    </SectionCard>

                    <SectionCard title="Pembayaran Terbaru">
                        <div className="space-y-3">
                            {payments.map((payment, i) => (
                                <div
                                    key={i}
                                    className="flex items-center justify-between p-4 rounded-xl bg-mint-50 dark:bg-dark-bg border border-mint-200 dark:border-dark-border/20"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-xl bg-mint-100 dark:bg-mint-200/10 flex items-center justify-center">
                                            <CreditCard className="w-4 h-4 text-mint-300" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-kost-dark dark:text-mint-50">
                                                {payment.name}
                                            </p>
                                            <p className="text-xs text-kost-muted dark:text-mint-100/40">
                                                {formatRupiah(payment.amount)}
                                            </p>
                                        </div>
                                    </div>

                                    <span className="text-xs text-mint-300">
                                        {payment.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </SectionCard>
                </div>
            </div>
        </OwnerLayout>
    );
}   