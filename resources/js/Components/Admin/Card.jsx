export default function Card({ title, value, icon: Icon }) {
    return (
        <div className="bg-white        dark:bg-dark-card
            border
            border-mint-200 dark:border-dark-border/20
            transition-colors duration-300 rounded-xl p-5 hover:border-primary/40 transition">

            <div className="flex justify-between items-center">
                <p className="text-kost-dark dark:text-mint-50">{title}</p>

                {Icon && (
                    <div className="p-2 bg-primary/10 rounded-lg">
                        <Icon className="w-4 h-4 text-primary" />
                    </div>
                )}
            </div>

            <h2 className="text-2xl font-bold mt-3 text-kost-dark dark:text-mint-50">{value}</h2>
        </div>
    );
}