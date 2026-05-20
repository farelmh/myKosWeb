export default function RecentActivity({ activities = [] }) {
    const sortedActivities = [...activities].sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );

    const getColor = (type) => {
        switch (type) {
            case "user":
                return "bg-mint-200";
            case "booking":
                return "bg-mint-300";
            case "property":
                return "bg-secondary";
            case "transaction":
                return "bg-red-400";
            default:
                return "bg-mint-200";
        }
    };

    return (
        <div
            className="
            rounded-xl p-5
            bg-white dark:bg-dark-card
            border
            border-mint-200 dark:border-dark-border/20
            transition-colors duration-300
        "
        >
            <h3
                className="
                text-sm font-medium mb-4
                text-kost-dark dark:text-mint-50
            "
            >
                Recent Activity
            </h3>

            <ul className="space-y-4">
                {sortedActivities.length > 0 ? (
                    sortedActivities.map((activity, i) => (
                        <li key={i} className="flex items-start gap-3">
                            {/* DOT */}
                            <span
                                className={`
                                    w-2 h-2 mt-2 rounded-full flex-shrink-0
                                    ${getColor(activity.type)}
                                `}
                            />

                            {/* CONTENT */}
                            <div className="flex-1">
                                <p
                                    className="
                                    text-sm
                                    text-kost-dark dark:text-mint-50
                                "
                                >
                                    {activity.text}
                                </p>

                                <p
                                    className="
                                    text-xs mt-1
                                    text-kost-muted dark:text-mint-100/40
                                "
                                >
                                    {activity.time}
                                </p>
                            </div>
                        </li>
                    ))
                ) : (
                    <p
                        className="
                        text-sm
                        text-kost-muted dark:text-mint-100/40
                    "
                    >
                        Belum ada aktivitas terbaru
                    </p>
                )}
            </ul>
        </div>
    );
}
