export default function RecentActivity() {
    const logs = [
        { text: "User Budi mendaftar",      color: "bg-mint-200" },
        { text: "Booking baru dibuat",       color: "bg-mint-300" },
        { text: "Admin update data kos",     color: "bg-mint-200" },
        { text: "Kos Melati disetujui",      color: "bg-mint-300" },
        { text: "Transaksi dibatalkan",      color: "bg-red-400"  },
    ];

    return (
        <div className="
            rounded-xl p-5
            bg-white        dark:bg-dark-card
            border
            border-mint-200 dark:border-dark-border/20
            transition-colors duration-300
        ">
            <h3 className="
                text-sm font-medium mb-4
                text-kost-dark dark:text-mint-50
            ">
                Recent Activity
            </h3>

            <ul className="space-y-3">
                {logs.map((log, i) => (
                    <li key={i} className="flex items-center gap-3">

                        {/* Dot */}
                        <span className={`w-2 h-2 rounded-full flex-shrink-0 ${log.color}`} />

                        {/* Text */}
                        <span className="text-sm text-kost-muted dark:text-mint-100/70">
                            {log.text}
                        </span>

                    </li>
                ))}
            </ul>
        </div>
    );
}