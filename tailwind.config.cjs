/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './index.html',
        './src/_styles/main.scss',
        './src/**/*.{js,ts,jsx,tsx}',
        './src/components/**/*.{js,ts,jsx,tsx}',
        './src/pages/**/*.{js,ts,jsx,tsx}'
    ],
    theme: {
        extend: {}
    },
    plugins: [],
    corePlugins: {
        preflight: false
    }
};
