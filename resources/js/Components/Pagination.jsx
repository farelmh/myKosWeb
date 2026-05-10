import { Link } from '@inertiajs/react';

export default function Pagination({ links }) {
    return (
        <div className="flex flex-wrap gap-1.5 mt-6">
            {links.map((link, index) => {

                if (!link.url) {
                    return (
                        <span
                            key={index}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                            className="
                                px-4 py-2 rounded-lg text-sm
                                cursor-not-allowed opacity-40
                                bg-mint-50       dark:bg-dark-bg
                                border
                                border-mint-200  dark:border-dark-border/20
                                text-kost-muted  dark:text-mint-100/30
                            "
                        />
                    );
                }

                if (link.active) {
                    return (
                        <span
                            key={index}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                            className="
                                px-4 py-2 rounded-lg text-sm font-medium
                                cursor-default
                                bg-mint-200      dark:bg-mint-200/20
                                border
                                border-mint-200  dark:border-mint-300/20
                                text-kost-dark   dark:text-mint-50
                            "
                        />
                    );
                }

                return (
                    <Link
                        key={index}
                        href={link.url}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                        preserveScroll
                        className="
                            px-4 py-2 rounded-lg text-sm transition
                            bg-mint-50       dark:bg-dark-bg
                            border
                            border-mint-200  dark:border-dark-border/20
                            text-kost-muted  dark:text-mint-100/50
                            hover:bg-mint-100      dark:hover:bg-dark-card
                            hover:text-kost-dark   dark:hover:text-mint-50
                            hover:border-mint-300  dark:hover:border-mint-300/30
                        "
                    />
                );
            })}
        </div>
    );
}