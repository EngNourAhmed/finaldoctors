/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./resources/**/*.blade.php",
        "./resources/**/*.js",
        "./resources/**/*.vue",
        "./public/index.html",
        "./app/Models/**/*.php",
    ],
    theme: {
        extend: {},
    },
    plugins: [],
}
