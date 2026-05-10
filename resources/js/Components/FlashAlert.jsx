import { useEffect } from "react";

import { usePage } from "@inertiajs/react";

import Swal from "sweetalert2";

export default function FlashAlert() {

    const { flash } = usePage().props;

    useEffect(() => {

        if (flash.success) {

            Swal.fire({
                icon: "success",
                title: "Berhasil",
                text: flash.success,
                background: "#0f172a",
                color: "#fff",
                confirmButtonColor: "#06b6d4",
            });

        }

        if (flash.error) {

            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: flash.error,
                background: "#0f172a",
                color: "#fff",
                confirmButtonColor: "#ef4444",
            });

        }

        if (flash.warning) {

            Swal.fire({
                icon: "warning",
                title: "Peringatan",
                text: flash.warning,
                background: "#0f172a",
                color: "#fff",
                confirmButtonColor: "#f59e0b",
            });

        }

        if (flash.info) {

            Swal.fire({
                icon: "info",
                title: "Informasi",
                text: flash.info,
                background: "#0f172a",
                color: "#fff",
                confirmButtonColor: "#3b82f6",
            });

        }

    }, [flash]);

    return null;
}