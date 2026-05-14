import InputError from "@/Components/InputError";
import { Head, useForm, Link } from "@inertiajs/react";
import logo from "../../../assets/logo.png";
import { useMemo, useRef, useState } from "react";

export default function VerifyOtp({ email, status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: email ?? "",
        otp: "",
    });

    const [digits, setDigits] = useState(["", "", "", ""]);
    const inputRefs = useRef([]);
    const otpValue = useMemo(() => digits.join(""), [digits]);

    const submit = (e) => {
        e.preventDefault();
        setData("otp", otpValue);
        post(route("password.otp.verify"));
    };

    const focusIndex = (index) => {
        const el = inputRefs.current[index];
        if (el) el.focus();
    };

    const onChangeDigit = (index, value) => {
        const next = String(value ?? "").replace(/\D/g, "");
        const char = next.slice(-1);

        const updated = [...digits];
        updated[index] = char;
        setDigits(updated);

        if (char && index < 3) {
            focusIndex(index + 1);
        }
    };

    const onKeyDownDigit = (index, e) => {
        if (e.key === "Backspace" && digits[index] === "" && index > 0) {
            const updated = [...digits];
            updated[index - 1] = "";
            setDigits(updated);
            focusIndex(index - 1);
        }
    };

    const onPasteDigits = (e) => {
        const text = e.clipboardData?.getData("text") ?? "";
        const onlyDigits = text.replace(/\D/g, "").slice(0, 4);

        if (!onlyDigits) return;
        e.preventDefault();

        const updated = ["", "", "", ""];
        for (let i = 0; i < onlyDigits.length; i += 1) {
            updated[i] = onlyDigits[i];
        }
        setDigits(updated);
        focusIndex(Math.min(onlyDigits.length, 4) - 1);
    };

    return (
        <>
            <Head title="Verifikasi OTP" />

            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-100 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[linear-gradient(#00000010_1px,transparent_1px),linear-gradient(90deg,#00000010_1px,transparent_1px)] bg-[size:40px_40px]" />
                <div className="absolute w-[400px] h-[400px] bg-green-400/30 blur-3xl rounded-full"></div>

                <div className="relative w-full max-w-sm p-7 rounded-2xl bg-white/70 backdrop-blur-xl border border-green-100 shadow-xl">
                    <div className="flex justify-center mb-3">
                        <img src={logo} alt="MyKost" className="w-20 h-20 object-contain" />
                    </div>

                    <p className="text-md bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent text-center mb-3">
                        Verifikasi OTP
                    </p>

                    <p className="text-xs text-gray-500 text-center mb-5 leading-relaxed">
                        Masukkan kode OTP yang dikirim ke email kamu.
                    </p>

                    {status && (
                        <div className="mb-4 text-sm text-green-500 text-center">{status}</div>
                    )}

                    <form onSubmit={submit} className="space-y-5">
                        {/* keep email in payload, do not show it */}
                        <input type="hidden" name="email" value={data.email} readOnly />

                        <div onPaste={onPasteDigits}>
                            <div className="flex items-center justify-center gap-3">
                                {[0, 1, 2, 3].map((index) => (
                                    <input
                                        key={index}
                                        ref={(el) => (inputRefs.current[index] = el)}
                                        type="text"
                                        inputMode="numeric"
                                        pattern="[0-9]*"
                                        maxLength={1}
                                        value={digits[index]}
                                        onChange={(e) => onChangeDigit(index, e.target.value)}
                                        onKeyDown={(e) => onKeyDownDigit(index, e)}
                                        className="w-12 h-12 text-center text-lg font-semibold rounded-xl bg-white border border-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
                                        aria-label={`Digit OTP ${index + 1}`}
                                    />
                                ))}
                            </div>
                            <InputError message={errors.otp} className="mt-2" />
                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full py-2 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-medium hover:opacity-90 transition"
                        >
                            Verifikasi
                        </button>
                    </form>

                    <p className="text-sm text-gray-500 mt-6 text-center">
                        Ubah email?{" "}
                        <Link href={route("password.request")} className="text-primary hover:underline">
                            Kembali
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
}
