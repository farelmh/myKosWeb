export default function SkeletonCard () {
        <div className="flex bg-white dark:bg-dark-card rounded-2xl overflow-hidden border border-mint-200 dark:border-dark-border/20 animate-pulse">
            <div className="w-40 sm:w-52 bg-mint-100 dark:bg-dark-bg min-h-[130px]" />
            <div className="flex-1 p-5 space-y-3">
                <div className="h-4 bg-mint-100 dark:bg-dark-bg rounded-lg w-2/3" />
                <div className="h-3 bg-mint-50 dark:bg-dark-bg rounded-lg w-1/2" />
                <div className="flex gap-2">
                    <div className="h-5 bg-mint-50 dark:bg-dark-bg rounded-md w-20" />
                    <div className="h-5 bg-mint-50 dark:bg-dark-bg rounded-md w-16" />
                </div>
                <div className="h-5 bg-mint-100 dark:bg-dark-bg rounded-lg w-28" />
            </div>
        </div>
}