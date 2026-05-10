import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
    ],

    darkMode: "class",

    theme: {
        extend: {
            fontFamily: {
                sans: ["Poppins", ...defaultTheme.fontFamily.sans],
            },
            colors: {
                primary:    "#ABE7B2",
                secondary:  "#93BFC7",
                light:      "#CBF3BB",
                background: "#ECF4E8",

                mint: {
                    50:  "#ECF4E8", 
                    100: "#CBF3BB", 
                    200: "#ABE7B2", 
                    300: "#93BFC7", 
                },
                kost: {
                    dark:  "#2f3e46", 
                    muted: "#7aa080", 
                },

                //Dark Mode Colors
                dark: {
                    bg:      "#0f1f1c",
                    sidebar: "#0d1a17",
                    card:    "#162320",
                    border:  "#ABE7B2",
                },
            },
        },
    },

    plugins: [forms],
};