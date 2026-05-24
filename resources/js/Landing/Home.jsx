import React, { useState, useEffect, useCallback, memo } from "react";
import {
    Download,
    Mail,
    Sparkles,
    MapPin,
    Star,
    Search,
    Home as HomeIcon,
} from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import AOS from "aos";
import "aos/dist/aos.css";
import { usePage, router } from "@inertiajs/react";

const StatusBadge = memo(() => (
    <div data-aos="fade-down" data-aos-delay="200">
        <div className="relative inline-block group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#93BFC7] to-[#ABE7B2] rounded-full blur opacity-30 group-hover:opacity-60 transition" />

            <div className="relative px-3 sm:px-4 py-2 rounded-full bg-[#ECF4E8]/70 backdrop-blur border border-[#ABE7B2]/40">
                <span className="flex items-center text-xs sm:text-sm font-medium text-[#3a5a60]">
                    <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2 text-[#93BFC7]" />
                    Platform Pencarian Kos Modern
                </span>
            </div>
        </div>
    </div>
));

const MainTitle = memo(() => (
    <div data-aos="fade-up" data-aos-delay="300">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-[#93BFC7] to-[#ABE7B2] bg-clip-text text-transparent">
                MyKost
            </span>
        </h1>
    </div>
));

const TechStack = memo(({ tech, icon: Icon }) => (
    <div className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-white/60 border border-[#ABE7B2]/40 text-xs sm:text-sm text-gray-700 hover:bg-[#CBF3BB]/40 transition">
        <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#93BFC7]" />
        {tech}
    </div>
));

const CTAButton = memo(({ href, text, icon: Icon }) => (
    <a href={href} className="w-full sm:w-auto">
        <div className="group relative w-full sm:w-[160px]">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#93BFC7] to-[#ABE7B2] rounded-xl blur opacity-40 group-hover:opacity-80 transition" />

            <div className="relative h-11 bg-[#ECF4E8] rounded-lg border border-[#ABE7B2]/40 flex items-center justify-center">
                <span className="flex items-center gap-2 text-sm font-medium text-gray-800 group-hover:gap-3 transition">
                    {text}
                    <Icon className="w-4 h-4 group-hover:translate-x-1 transition" />
                </span>
            </div>
        </div>
    </a>
));

/* ================= SEARCH ================= */

const SearchKos = () => {
    const [location, setLocation] = useState("");

    const handleSearch = () => {
        if (!location.trim()) return;
        router.get("/search", { q: location.trim() });
    };

    const handleFocus = () => {
        router.get("/search");
    };

    return (
        <div
            data-aos="fade-up"
            data-aos-delay="700"
            className="w-full max-w-2xl"
        >
            <div className="flex flex-col sm:flex-row sm:items-center bg-white rounded-2xl shadow-md overflow-hidden border border-[#ABE7B2]/30">
                <div className="flex items-center flex-1">
                    <div
                        className="px-4 flex items-center text-gray-400 cursor-pointer"
                        onClick={handleFocus}
                    >
                        <MapPin className="w-5 h-5" />
                    </div>

                    <input
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        onFocus={handleFocus}
                        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                        placeholder="Cari kos di sekitar Unej, Polije..."
                        className="flex-1 py-3 px-1 sm:px-2 text-sm text-gray-700 placeholder-gray-400 bg-transparent outline-none border-none focus:ring-0"
                    />
                </div>

                <button
                    onClick={handleSearch}
                    className="w-full sm:w-auto px-6 py-3 flex items-center justify-center gap-2 text-sm font-medium text-white bg-gradient-to-r from-[#93BFC7] to-[#ABE7B2]"
                >
                    <Search className="w-4 h-4" />
                    Cari
                </button>
            </div>
        </div>
    );
};

/* ================= DATA ================= */

const WORDS = [
    "Cari Kos Cepat & Mudah",
    "Temukan Kos Sesuai Budget",
    "Booking Kos Tanpa Ribet",
];

const FEATURES = [
    { text: "Lokasi Strategis", icon: MapPin },
    { text: "Harga Terjangkau", icon: Star },
    { text: "Booking Online", icon: HomeIcon },
];

/* ================= MAIN ================= */

const Home = () => {
    const { auth } = usePage().props;

    const [text, setText] = useState("");
    const [isTyping, setIsTyping] = useState(true);
    const [wordIndex, setWordIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        AOS.init({ once: true, offset: 20 });
        setIsLoaded(true);
    }, []);

    const handleTyping = useCallback(() => {
        if (isTyping) {
            if (charIndex < WORDS[wordIndex].length) {
                setText((prev) => prev + WORDS[wordIndex][charIndex]);
                setCharIndex((prev) => prev + 1);
            } else {
                setTimeout(() => setIsTyping(false), 2000);
            }
        } else {
            if (charIndex > 0) {
                setText((prev) => prev.slice(0, -1));
                setCharIndex((prev) => prev - 1);
            } else {
                setWordIndex((prev) => (prev + 1) % WORDS.length);
                setIsTyping(true);
            }
        }
    }, [charIndex, isTyping, wordIndex]);

    useEffect(() => {
        const timeout = setTimeout(handleTyping, isTyping ? 90 : 40);
        return () => clearTimeout(timeout);
    }, [handleTyping]);

    return (
        <section
            className="relative min-h-screen bg-[#ECF4E8] px-5 sm:px-[8%] lg:px-[10%] xl:px-[16%] overflow-hidden"
            id="Home"
        >
            {/* DECORATION */}
            <div className="absolute top-24 left-6 w-32 h-32 bg-[#ABE7B2]/30 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-6 w-40 h-40 bg-[#93BFC7]/25 rounded-full blur-3xl" />

            <div
                className={`relative z-10 transition duration-1000 ${
                    isLoaded ? "opacity-100" : "opacity-0"
                }`}
            >
                <div className="container mx-auto min-h-screen flex items-center pt-24 pb-12 lg:pt-20 lg:pb-10">
                    <div className="flex flex-col-reverse lg:flex-row items-center justify-between w-full gap-8 sm:gap-10 lg:gap-12">
                        {/* LEFT */}
                        <div className="w-full lg:w-1/2 space-y-5 sm:space-y-6 text-center lg:text-left">
                            <div className="flex justify-center lg:justify-start">
                                <StatusBadge />
                            </div>

                            <MainTitle />

                            {/* TYPEWRITER */}
                            <div className="flex items-center justify-center lg:justify-start min-h-[32px]">
                                <span className="text-base sm:text-xl text-gray-700">
                                    {text}
                                </span>
                                <span className="w-[2px] h-5 sm:h-6 bg-[#93BFC7] ml-1 animate-pulse" />
                            </div>

                            <p className="text-sm sm:text-base text-gray-600 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                                Temukan kos impianmu dengan mudah menggunakan
                                MyKost. Cari berdasarkan lokasi, budget, dan
                                fasilitas yang kamu butuhkan.
                            </p>

                            <div className="flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-3">
                                {FEATURES.map((f, i) => (
                                    <TechStack
                                        key={i}
                                        tech={f.text}
                                        icon={f.icon}
                                    />
                                ))}
                            </div>

                            {auth?.user && (
                                <div className="flex justify-center lg:justify-start">
                                    <SearchKos />
                                </div>
                            )}

                            {/* CTA */}
                            <div className="grid grid-cols-1 sm:flex sm:flex-wrap justify-center lg:justify-start gap-3">
                                <CTAButton
                                    href="#"
                                    text="Download App"
                                    icon={Download}
                                />

                                <CTAButton
                                    href="#Contact"
                                    text="Contact"
                                    icon={Mail}
                                />

                                {auth?.user?.role === "owner" && (
                                    <CTAButton
                                        href="/form-pengajuan"
                                        text="Daftarkan Kos"
                                        icon={HomeIcon}
                                    />
                                )}
                            </div>
                        </div>

                        {/* RIGHT */}
                        <div
                            className="w-full lg:w-1/2 h-[260px] sm:h-[360px] lg:h-[560px] flex items-center justify-center"
                            onMouseEnter={() => setIsHovering(true)}
                            onMouseLeave={() => setIsHovering(false)}
                        >
                            <DotLottieReact
                                src="https://lottie.host/3c808f76-6521-4005-b8c4-b0d0e5593fcf/6Yfn9QsLLt.lottie"
                                loop
                                autoplay
                                className={`w-full max-w-[320px] sm:max-w-[440px] lg:max-w-none transition duration-500 ${
                                    isHovering ? "lg:scale-110" : ""
                                }`}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default memo(Home);
