import { useForm, usePage, router } from "@inertiajs/react";
import { useState, useEffect } from "react";
import {
    User, Lock, ArrowLeft, Image as ImageIcon,
    ShieldCheck, MailCheck, Camera, Eye, EyeOff,
    Phone, MapPin, CheckCircle, AlertCircle,
} from "lucide-react";

const Toast = ({ message, type, onClose }) => {
    useEffect(() => {
        if (message) {
            const t = setTimeout(() => onClose(), 3000);
            return () => clearTimeout(t);
        }
    }, [message]);

    if (!message) return null;

    return (
        <div className={`
            fixed top-5 right-5 z-50
            flex items-center gap-2
            px-4 py-3 rounded-xl shadow-lg text-sm font-medium
            transition-all duration-300
            ${type === "error"
                ? "bg-red-50 dark:bg-red-500/10 text-red-500 border border-red-200 dark:border-red-500/20"
                : "bg-mint-100 dark:bg-mint-200/10 text-kost-dark dark:text-mint-50 border border-mint-200 dark:border-mint-300/20"
            }
        `}>
            {type === "error"
                ? <AlertCircle className="w-4 h-4" />
                : <CheckCircle className="w-4 h-4 text-mint-300" />
            }
            {message}
        </div>
    );
};

const getStrength = (password) => {
    if (!password) return 0;
    let score = 0;
    if (password.length > 6)              score++;
    if (password.match(/[A-Z]/))          score++;
    if (password.match(/[0-9]/))          score++;
    if (password.match(/[^A-Za-z0-9]/))   score++;
    return score;
};

const strengthConfig = [
    { label: "",          width: "w-0",    color: "" },
    { label: "Lemah",     width: "w-1/4",  color: "bg-red-400" },
    { label: "Cukup",     width: "w-2/4",  color: "bg-yellow-400" },
    { label: "Kuat",      width: "w-3/4",  color: "bg-mint-300" },
    { label: "Sangat Kuat", width: "w-full", color: "bg-mint-300" },
];

const inputClass = (error) => `
    w-full px-4 py-3 rounded-xl text-sm outline-none transition
    bg-mint-50       dark:bg-dark-bg
    border
    ${error
        ? "border-red-300 dark:border-red-500/40 focus:ring-2 focus:ring-red-200"
        : "border-mint-200 dark:border-dark-border/20 focus:ring-2 focus:ring-mint-200 dark:focus:ring-mint-300/30"
    }
    text-kost-dark   dark:text-mint-50
    placeholder-kost-muted dark:placeholder-mint-100/30
`;

const LabelText = ({ children }) => (
    <label className="text-sm font-medium text-kost-dark dark:text-mint-100/70 mb-1.5 block">
        {children}
    </label>
);

const SectionCard = ({ children }) => (
    <div className="
        rounded-2xl p-6
        bg-white        dark:bg-dark-card
        border border-mint-200 dark:border-dark-border/20
        transition-colors duration-300
    ">
        {children}
    </div>
);

const TabButton = ({ active, onClick, icon: Icon, label }) => (
    <button
        onClick={onClick}
        className={`
            flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition
            ${active
                ? "bg-mint-200 dark:bg-mint-200/20 text-kost-dark dark:text-mint-50 font-medium border border-mint-200 dark:border-mint-300/20"
                : "bg-white dark:bg-dark-card text-kost-muted dark:text-mint-100/50 border border-mint-200 dark:border-dark-border/20 hover:bg-mint-50 dark:hover:bg-dark-bg"
            }
        `}
    >
        <Icon className="w-4 h-4" />
        {label}
    </button>
);

export default function Profile() {
    const { auth } = usePage().props;
    const user     = auth.user;

    const [tab,     setTab]     = useState("profile");
    const [preview, setPreview] = useState(
        user.photo ? `/storage/${user.photo}` : null
    );
    const [toast,       setToast]       = useState(null);
    const [showPass,    setShowPass]    = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const profileForm = useForm({
        name:  user.name  || "",
        photo: null,
    });

    const passwordForm = useForm({
        current_password:      "",
        password:              "",
        password_confirmation: "",
    });

    const personalForm = useForm({
        phone:   user.phone   || "",
        address: user.address || "",
        city:    user.city    || "",
    });

    const submitProfile = (e) => {
        e.preventDefault();
        profileForm.post(route("profile.update"), {
            forceFormData: true,
            onSuccess: () => setToast({ message: "Profil berhasil diperbarui", type: "success" }),
            onError:   () => setToast({ message: "Gagal memperbarui profil",   type: "error"   }),
        });
    };

    const submitPassword = (e) => {
        e.preventDefault();
        passwordForm.post(route("profile.password"), {
            onSuccess: () => {
                passwordForm.reset();
                setToast({ message: "Password berhasil diperbarui", type: "success" });
            },
            onError: () => setToast({ message: "Gagal memperbarui password", type: "error" }),
        });
    };

    const submitPersonal = (e) => {
        e.preventDefault();
        personalForm.post(route("profile.personal"), {
            onSuccess: () => setToast({ message: "Data pribadi berhasil disimpan", type: "success" }),
            onError:   () => setToast({ message: "Gagal menyimpan data pribadi",   type: "error"   }),
        });
    };

    const handleFile = (file) => {
        if (!file) return;
        profileForm.setData("photo", file);
        setPreview(URL.createObjectURL(file));
    };

    const handleDrop = (e) => {
        e.preventDefault();
        handleFile(e.dataTransfer.files[0]);
    };

    const strength = getStrength(passwordForm.data.password);

    return (
        <div className="
            min-h-screen py-10
            px-[5%] lg:px-[10%]
            bg-mint-50 dark:bg-dark-bg
            transition-colors duration-300
        ">
            <Toast
                message={toast?.message}
                type={toast?.type}
                onClose={() => setToast(null)}
            />

            <div className="max-w-4xl mx-auto space-y-6">

                <div className="flex items-center gap-4">
                    <button
                        onClick={() => window.history.back()}
                        className="
                            p-2 rounded-xl transition
                            bg-white dark:bg-dark-card
                            border border-mint-200 dark:border-dark-border/20
                            text-kost-muted dark:text-mint-100/50
                            hover:bg-mint-50 dark:hover:bg-dark-bg
                            hover:text-kost-dark dark:hover:text-mint-50
                        "
                    >
                        <ArrowLeft className="w-4 h-4" />
                    </button>
                    <div>
                        <h1 className="text-lg font-medium text-kost-dark dark:text-mint-50">
                            Pengaturan Akun
                        </h1>
                        <p className="text-sm text-kost-muted dark:text-mint-100/40">
                            Kelola profil dan keamanan akun kamu
                        </p>
                    </div>
                </div>

                <SectionCard>
                    <div className="flex items-center gap-5">

                        {/* Avatar */}
                        <div className="relative flex-shrink-0">
                            <div className="
                                w-20 h-20 rounded-full overflow-hidden
                                bg-mint-100 dark:bg-mint-200/10
                                border-2 border-mint-200 dark:border-mint-300/20
                                flex items-center justify-center
                            ">
                                {preview
                                    ? <img src={preview} className="w-full h-full object-cover" />
                                    : <User className="w-8 h-8 text-mint-300 dark:text-mint-200" />
                                }
                            </div>
                            <label className="
                                absolute -bottom-1 -right-1 cursor-pointer
                                w-7 h-7 rounded-full flex items-center justify-center
                                bg-mint-200 dark:bg-mint-200/30
                                border-2 border-white dark:border-dark-card
                                text-kost-dark dark:text-mint-50
                                hover:bg-mint-300 transition
                            ">
                                <Camera className="w-3.5 h-3.5" />
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => handleFile(e.target.files[0])}
                                />
                            </label>
                        </div>

                        {/* User info */}
                        <div className="flex-1 min-w-0">
                            <h2 className="text-base font-medium text-kost-dark dark:text-mint-50 capitalize">
                                {user.name}
                            </h2>
                            <p className="text-sm text-kost-muted dark:text-mint-100/50 truncate">
                                {user.email}
                            </p>
                            <div className="flex items-center gap-1.5 mt-2">
                                <span className="
                                    px-2.5 py-0.5 rounded-full text-xs font-medium
                                    bg-mint-100 dark:bg-mint-200/10
                                    border border-mint-200 dark:border-mint-300/20
                                    text-kost-dark dark:text-mint-100 capitalize
                                ">
                                    {user.role || "user"}
                                </span>
                                {user.email_verified_at ? (
                                    <span className="flex items-center gap-1 text-xs text-mint-300">
                                        <MailCheck className="w-3.5 h-3.5" />
                                        Terverifikasi
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-1 text-xs text-yellow-500">
                                        <AlertCircle className="w-3.5 h-3.5" />
                                        Belum verifikasi
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </SectionCard>

                {/* ── TABS ────────────────────────────────── */}
                <div className="flex gap-2 flex-wrap">
                    <TabButton active={tab === "profile"}  onClick={() => setTab("profile")}  icon={User}        label="Profil"      />
                    <TabButton active={tab === "personal"} onClick={() => setTab("personal")} icon={ShieldCheck} label="Data Pribadi" />
                    <TabButton active={tab === "security"} onClick={() => setTab("security")} icon={Lock}        label="Keamanan"    />
                </div>

                {/* ── TAB: PROFIL ─────────────────────────── */}
                {tab === "profile" && (
                    <SectionCard>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="
                                p-2.5 rounded-xl
                                bg-mint-100 dark:bg-mint-200/10
                                border border-mint-200 dark:border-mint-300/20
                                text-mint-300 dark:text-mint-200
                            ">
                                <User size={16} />
                            </div>
                            <h2 className="text-sm font-medium text-kost-dark dark:text-mint-50">
                                Informasi Profil
                            </h2>
                        </div>

                        <form onSubmit={submitProfile} className="space-y-5">

                            {/* UPLOAD FOTO */}
                            <div>
                                <LabelText>Foto Profil</LabelText>
                                <label
                                    onDrop={handleDrop}
                                    onDragOver={(e) => e.preventDefault()}
                                    className="
                                        flex flex-col items-center justify-center
                                        border border-dashed rounded-xl p-6 cursor-pointer transition
                                        border-mint-200  dark:border-dark-border/30
                                        hover:bg-mint-50 dark:hover:bg-dark-bg
                                        hover:border-mint-300
                                    "
                                >
                                    {preview ? (
                                        <img
                                            src={preview}
                                            className="w-20 h-20 rounded-full object-cover border-2 border-mint-200"
                                        />
                                    ) : (
                                        <>
                                            <ImageIcon className="w-6 h-6 text-mint-200 dark:text-mint-200/40 mb-2" />
                                            <p className="text-sm text-kost-muted dark:text-mint-100/40">
                                                Drag & drop atau klik untuk upload
                                            </p>
                                            <p className="text-xs text-kost-muted dark:text-mint-100/30 mt-1">
                                                JPG, PNG max 2MB
                                            </p>
                                        </>
                                    )}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => handleFile(e.target.files[0])}
                                    />
                                </label>
                            </div>

                            {/* NAMA */}
                            <div>
                                <LabelText>Nama Lengkap</LabelText>
                                <input
                                    type="text"
                                    value={profileForm.data.name}
                                    onChange={(e) => profileForm.setData("name", e.target.value)}
                                    placeholder="Nama lengkap kamu"
                                    className={inputClass(profileForm.errors.name)}
                                />
                                {profileForm.errors.name && (
                                    <p className="text-xs text-red-400 mt-1">{profileForm.errors.name}</p>
                                )}
                            </div>

                            {/* EMAIL — readonly */}
                            <div>
                                <LabelText>Email</LabelText>
                                <input
                                    type="email"
                                    value={user.email}
                                    readOnly
                                    className={`${inputClass(false)} cursor-not-allowed opacity-60`}
                                />
                                <p className="text-xs text-kost-muted dark:text-mint-100/30 mt-1">
                                    Email tidak dapat diubah
                                </p>
                            </div>

                            <div className="pt-2 border-t border-mint-200 dark:border-dark-border/20">
                                <button
                                    type="submit"
                                    disabled={profileForm.processing}
                                    className="
                                        px-6 py-2.5 rounded-xl text-sm font-medium transition
                                        bg-mint-200      dark:bg-mint-200/20
                                        border border-mint-200 dark:border-mint-300/20
                                        text-kost-dark   dark:text-mint-50
                                        hover:bg-mint-300 dark:hover:bg-mint-300/30
                                        disabled:opacity-50 disabled:cursor-not-allowed
                                    "
                                >
                                    {profileForm.processing ? "Menyimpan..." : "Simpan Profil"}
                                </button>
                            </div>
                        </form>
                    </SectionCard>
                )}

                {/* ── TAB: DATA PRIBADI ───────────────────── */}
                {tab === "personal" && (
                    <SectionCard>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="
                                p-2.5 rounded-xl
                                bg-mint-100 dark:bg-mint-200/10
                                border border-mint-200 dark:border-mint-300/20
                                text-mint-300 dark:text-mint-200
                            ">
                                <ShieldCheck size={16} />
                            </div>
                            <h2 className="text-sm font-medium text-kost-dark dark:text-mint-50">
                                Data Pribadi
                            </h2>
                        </div>

                        <form onSubmit={submitPersonal} className="space-y-5">

                            {/* PHONE */}
                            <div>
                                <LabelText>Nomor HP</LabelText>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-3 w-4 h-4 text-kost-muted dark:text-mint-100/40" />
                                    <input
                                        type="tel"
                                        value={personalForm.data.phone}
                                        onChange={(e) => personalForm.setData("phone", e.target.value)}
                                        placeholder="08xxxxxxxxxx"
                                        className={`${inputClass(personalForm.errors.phone)} pl-10`}
                                    />
                                </div>
                                {personalForm.errors.phone && (
                                    <p className="text-xs text-red-400 mt-1">{personalForm.errors.phone}</p>
                                )}
                            </div>

                            {/* ALAMAT */}
                            <div>
                                <LabelText>Alamat</LabelText>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-kost-muted dark:text-mint-100/40" />
                                    <input
                                        type="text"
                                        value={personalForm.data.address}
                                        onChange={(e) => personalForm.setData("address", e.target.value)}
                                        placeholder="Jl. Contoh No. 1"
                                        className={`${inputClass(personalForm.errors.address)} pl-10`}
                                    />
                                </div>
                            </div>

                            {/* KOTA */}
                            <div>
                                <LabelText>Kota</LabelText>
                                <input
                                    type="text"
                                    value={personalForm.data.city}
                                    onChange={(e) => personalForm.setData("city", e.target.value)}
                                    placeholder="Jember"
                                    className={inputClass(personalForm.errors.city)}
                                />
                            </div>

                            <div className="pt-2 border-t border-mint-200 dark:border-dark-border/20">
                                <button
                                    type="submit"
                                    disabled={personalForm.processing}
                                    className="
                                        px-6 py-2.5 rounded-xl text-sm font-medium transition
                                        bg-mint-200      dark:bg-mint-200/20
                                        border border-mint-200 dark:border-mint-300/20
                                        text-kost-dark   dark:text-mint-50
                                        hover:bg-mint-300 dark:hover:bg-mint-300/30
                                        disabled:opacity-50 disabled:cursor-not-allowed
                                    "
                                >
                                    {personalForm.processing ? "Menyimpan..." : "Simpan Data"}
                                </button>
                            </div>
                        </form>
                    </SectionCard>
                )}

                {/* ── TAB: KEAMANAN ───────────────────────── */}
                {tab === "security" && (
                    <SectionCard>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="
                                p-2.5 rounded-xl
                                bg-mint-100 dark:bg-mint-200/10
                                border border-mint-200 dark:border-mint-300/20
                                text-mint-300 dark:text-mint-200
                            ">
                                <Lock size={16} />
                            </div>
                            <h2 className="text-sm font-medium text-kost-dark dark:text-mint-50">
                                Ubah Password
                            </h2>
                        </div>

                        <form onSubmit={submitPassword} className="space-y-5">

                            {/* PASSWORD LAMA */}
                            <div>
                                <LabelText>Password Saat Ini</LabelText>
                                <div className="relative">
                                    <input
                                        type={showPass ? "text" : "password"}
                                        placeholder="Password saat ini"
                                        value={passwordForm.data.current_password}
                                        onChange={(e) => passwordForm.setData("current_password", e.target.value)}
                                        className={`${inputClass(passwordForm.errors.current_password)} pr-10`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPass(!showPass)}
                                        className="absolute right-3 top-3 text-kost-muted dark:text-mint-100/40 hover:text-kost-dark dark:hover:text-mint-50 transition"
                                    >
                                        {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                                {passwordForm.errors.current_password && (
                                    <p className="text-xs text-red-400 mt-1">{passwordForm.errors.current_password}</p>
                                )}
                            </div>

                            {/* PASSWORD BARU */}
                            <div>
                                <LabelText>Password Baru</LabelText>
                                <div className="relative">
                                    <input
                                        type={showConfirm ? "text" : "password"}
                                        placeholder="Minimal 8 karakter"
                                        value={passwordForm.data.password}
                                        onChange={(e) => passwordForm.setData("password", e.target.value)}
                                        className={`${inputClass(passwordForm.errors.password)} pr-10`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirm(!showConfirm)}
                                        className="absolute right-3 top-3 text-kost-muted dark:text-mint-100/40 hover:text-kost-dark dark:hover:text-mint-50 transition"
                                    >
                                        {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>

                                {/* STRENGTH BAR */}
                                {passwordForm.data.password && (
                                    <div className="mt-2 space-y-1">
                                        <div className="h-1.5 rounded-full bg-mint-100 dark:bg-dark-bg overflow-hidden">
                                            <div className={`h-full rounded-full transition-all duration-300 ${strengthConfig[strength].width} ${strengthConfig[strength].color}`} />
                                        </div>
                                        <p className="text-xs text-kost-muted dark:text-mint-100/40">
                                            Kekuatan: <span className="font-medium text-kost-dark dark:text-mint-50">{strengthConfig[strength].label}</span>
                                        </p>
                                    </div>
                                )}

                                {passwordForm.errors.password && (
                                    <p className="text-xs text-red-400 mt-1">{passwordForm.errors.password}</p>
                                )}
                            </div>

                            {/* KONFIRMASI */}
                            <div>
                                <LabelText>Konfirmasi Password Baru</LabelText>
                                <input
                                    type="password"
                                    placeholder="Ulangi password baru"
                                    value={passwordForm.data.password_confirmation}
                                    onChange={(e) => passwordForm.setData("password_confirmation", e.target.value)}
                                    className={inputClass(passwordForm.errors.password_confirmation)}
                                />
                                {/* Match indicator */}
                                {passwordForm.data.password_confirmation && (
                                    <p className={`text-xs mt-1 ${
                                        passwordForm.data.password === passwordForm.data.password_confirmation
                                            ? "text-mint-300"
                                            : "text-red-400"
                                    }`}>
                                        {passwordForm.data.password === passwordForm.data.password_confirmation
                                            ? "✓ Password cocok"
                                            : "✗ Password tidak cocok"
                                        }
                                    </p>
                                )}
                            </div>

                            <div className="pt-2 border-t border-mint-200 dark:border-dark-border/20">
                                <button
                                    type="submit"
                                    disabled={passwordForm.processing}
                                    className="
                                        px-6 py-2.5 rounded-xl text-sm font-medium transition
                                        bg-mint-200      dark:bg-mint-200/20
                                        border border-mint-200 dark:border-mint-300/20
                                        text-kost-dark   dark:text-mint-50
                                        hover:bg-mint-300 dark:hover:bg-mint-300/30
                                        disabled:opacity-50 disabled:cursor-not-allowed
                                    "
                                >
                                    {passwordForm.processing ? "Memperbarui..." : "Perbarui Password"}
                                </button>
                            </div>
                        </form>
                    </SectionCard>
                )}
            </div>
        </div>
    );
}