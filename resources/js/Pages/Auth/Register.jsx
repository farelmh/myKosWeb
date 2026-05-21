import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import { Head, Link, useForm } from "@inertiajs/react";
import logo from "../../../assets/logo.png";
import { User, Home } from "lucide-react";

export default function Register() {
    const role = ["tenant", "owner"].includes(
        new URLSearchParams(window.location.search).get("role")
    )
        ? new URLSearchParams(window.location.search).get("role")
        : "tenant"; 

    const isOwner = role === "owner";

    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        phone: "",
        jenis_kelamin: "",
        password: "",
        password_confirmation: "",
        role: role, 
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <>
            <Head title="Register" />

            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-100 relative overflow-hidden">

                {/* GRID */}
                <div className="absolute inset-0 opacity-20 bg-[linear-gradient(#00000010_1px,transparent_1px),linear-gradient(90deg,#00000010_1px,transparent_1px)] bg-[size:40px_40px]" />

                {/* GLOW */}
                <div className="absolute w-[400px] h-[400px] bg-green-400/30 blur-3xl rounded-full" />

                {/* CARD */}
                <div className="relative w-full max-w-sm p-7 rounded-2xl bg-white/70 backdrop-blur-xl border border-green-100 shadow-xl">

                    {/* LOGO */}
                    <div className="flex justify-center mb-3">
                        <img src={logo} alt="MyKost" className="w-20 h-20 object-contain" />
                    </div>

                    {/* BADGE ROLE — tambahan baru */}
                    <div className="flex justify-center mb-4">
                        <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium
                            ${isOwner
                                ? "bg-[#93BFC7]/20 text-[#2f3e46]"
                                : "bg-[#ABE7B2]/20 text-[#2f3e46]"
                            }`}>
                            {isOwner
                                ? <><Home className="w-4 h-4" /> Daftar sebagai Owner Kos</>
                                : <><User className="w-4 h-4" /> Daftar sebagai Pencari Kos</>
                            }
                        </div>
                    </div>

                    <p className="text-md bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent text-center mb-4">
                        Buat akun baru
                    </p>

                    {/* FORM */}
                    <form onSubmit={submit} className="space-y-5">

                        {/* NAME */}
                        <div>
                            <InputLabel htmlFor="name" value="Nama" className="text-gray-500" />
                            <input
                                id="name"          // ← fix: tambah id
                                type="text"
                                value={data.name}
                                onChange={(e) => setData("name", e.target.value)}
                                className="text-sm mt-1 w-full px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="Nama lengkap"
                                autoFocus
                            />
                            <InputError message={errors.name} className="mt-2" />
                        </div>

                        {/* EMAIL */}
                        <div>
                            <InputLabel htmlFor="email" value="Email" className="text-gray-500" />
                            <input
                                id="email"         // ← fix: tambah id
                                type="email"
                                value={data.email}
                                onChange={(e) => setData("email", e.target.value)}
                                className="text-sm mt-1 w-full px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="email@gmail.com"
                            />
                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="phone" value="Nomor Telepon" className="text-gray-500" />
                            <input
                                id="phone"
                                type="text"
                                value={data.phone}
                                onChange={(e) => setData("phone", e.target.value)}
                                className="text-sm mt-1 w-full px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="Nomor telepon"
                            />
                            <InputError message={errors.phone} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="jenis_kelamin" value="Jenis Kelamin" className="text-gray-500" />
                            <select
                                id="jenis_kelamin"
                                value={data.jenis_kelamin}
                                onChange={(e) => setData("jenis_kelamin", e.target.value)}
                                className="text-sm mt-1 w-full px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                            >
                                <option value="">Pilih Jenis Kelamin</option>
                                <option value="laki-laki">Laki-laki</option>
                                <option value="perempuan">Perempuan</option>
                            </select>
                            <InputError message={errors.jenis_kelamin} className="mt-2" />
                        </div>

                        {/* PASSWORD */}
                        <div>
                            <InputLabel htmlFor="password" value="Password" className="text-gray-500" />
                            <input
                                id="password"      // ← fix: tambah id
                                type="password"
                                value={data.password}
                                onChange={(e) => setData("password", e.target.value)}
                                className="text-sm mt-1 w-full px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="Password"
                            />
                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        {/* CONFIRM PASSWORD */}
                        <div>
                            <InputLabel htmlFor="password_confirmation" value="Konfirmasi Password" className="text-gray-500" />
                            <input
                                id="password_confirmation"  // ← fix: tambah id
                                type="password"
                                value={data.password_confirmation}
                                onChange={(e) => setData("password_confirmation", e.target.value)}
                                className="text-sm mt-1 w-full px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="Ulangi password"
                            />
                            <InputError message={errors.password_confirmation} className="mt-2" />
                        </div>

                        {/* BUTTON */}
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full py-2 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-medium hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {processing ? "Memproses..." : "Daftar"}
                        </button>
                    </form>

                    {/* LOGIN LINK */}
                    <p className="text-sm text-gray-500 mt-6 text-center">
                        Sudah punya akun?{" "}
                        <Link href={route("login")} className="text-primary hover:underline">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
}