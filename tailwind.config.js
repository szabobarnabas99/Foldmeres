/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}", "./node_modules/flowbite/**/*.js"],

    theme: {
        extend: {
            keyframes: {
                fillUp: {
                    "0%": { width: "0px" },
                    "100%": { width: "50px" },
                },
            },
            animation: {
                fillUp: "fillUp 4.5s linear",
            },
        },
    },

    plugins: [require("flowbite/plugin")],
};
