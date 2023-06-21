import {breakpoints} from "@const/breakpoints";
import {colors} from "@const/colors";
import {ApplicationContext} from "@context/ApplicationContext";
import type {MantineThemeOverride} from "@mantine/core";
import {MantineProvider} from "@mantine/core";
import {createTheme, NextUIProvider} from "@nextui-org/react";
import {store} from "@store/store";
import React from "react";
import ReactDOM from "react-dom/client";
import "@styles/main.scss";
import {Provider} from "react-redux";

import {App} from "@/App";

const nextUITheme = createTheme({
    type: "light",
    theme: {
        breakpoints: {
            xs: breakpoints.xs,
            sm: breakpoints.sm,
            md: breakpoints.md,
            lg: breakpoints.lg,
            xl: breakpoints.xl
        },
        colors: {
            // Primary
            primary: colors.indigo500,
            primaryLight: colors.indigo200,
            primaryLightHover: colors.indigo300,
            primaryLightActive: colors.indigo400,
            primaryLightContrast: colors.indigo600,
            primaryBorder: colors.indigo400,
            primaryBorderHover: colors.indigo600,
            primarySolidHover: colors.indigo700,
            primarySolidContrast: colors.white,
            primaryShadow: colors.indigo300,
            // Secondary
            secondary: colors.sky500,
            secondaryLight: colors.sky200,
            secondaryLightHover: colors.sky300,
            secondaryLightActive: colors.sky400,
            secondaryLightContrast: colors.sky600,
            secondaryBorder: colors.sky400,
            secondaryBorderHover: colors.sky600,
            secondarySolidHover: colors.sky700,
            secondarySolidContrast: colors.white,
            secondaryShadow: colors.sky300,
            // Success
            success: colors.green600,
            successLight: colors.green200,
            successLightHover: colors.green300,
            successLightActive: colors.green400,
            successLightContrast: colors.green700,
            successBorder: colors.green400,
            successBorderHover: colors.green600,
            successSolidHover: colors.green700,
            successSolidContrast: colors.white,
            successShadow: colors.green200,
            // Warning
            warning: colors.amber500,
            warningLight: colors.amber200,
            warningLightHover: colors.amber300,
            warningLightActive: colors.amber400,
            warningLightContrast: colors.amber700,
            warningBorder: colors.amber400,
            warningBorderHover: colors.amber600,
            warningSolidHover: colors.amber700,
            warningSolidContrast: colors.white,
            warningShadow: colors.orange300,
            // Error
            error: colors.red600,
            errorLight: colors.red200,
            errorLightHover: colors.red300,
            errorLightActive: colors.red400,
            errorLightContrast: colors.red700,
            errorBorder: colors.red400,
            errorBorderHover: colors.red600,
            errorSolidHover: colors.red700,
            errorSolidContrast: colors.white,
            errorShadow: colors.red300,
            // Neutral
            gradient: colors.gray400,
        },
        shadows: {
            xs: "0 2px 8px 1px rgb(104 112 118 / 0.07), 0 1px 1px -1px rgb(104 112 118 / 0.04)",
            sm: "0 2px 8px 2px rgb(104 112 118 / 0.07), 0 2px 4px -1px rgb(104 112 118 / 0.04)",
            md: "0 12px 20px 6px rgb(104 112 118 / 0.08)",
            lg: "0 12px 34px 6px rgb(104 112 118 / 0.18)",
            xl: "0 25px 65px 0px rgb(104 112 118 / 0.35)"
        },
        dropShadows: {
            xs: "drop-shadow(0 2px 4px rgb(104 112 118 / 0.07)) drop-shadow(0 1px 1px rgb(104 112 118 / 0.04))",
            sm: "drop-shadow(0 2px 8px rgb(104 112 118 / 0.07)) drop-shadow(0 2px 4px rgb(104 112 118 / 0.04))",
            md: "drop-shadow(0 4px 12px rgb(104 112 118 / 0.08)) drop-shadow(0 20px 8px rgb(104 112 118 / 0.04))",
            lg: "drop-shadow(0 12px 24px rgb(104 112 118 / 0.15)) drop-shadow(0 12px 14px rgb(104 112 118 / 0.1))",
            xl: "drop-shadow(0 25px 34px rgb(104 112 118 / 0.35))"
        },
        fontSizes: {
            xs: "0.75rem",
            sm: "0.875rem",
            base: "1rem",
            md: "1rem",
            lg: "1.125rem",
            xl: "1.25rem",
            "2xl": "1.5rem",
            "3xl": "1.875rem",
            "4xl": "2.25rem",
            "5xl": "3rem",
            "6xl": "3.75rem",
            "7xl": "4.5rem",
            "8xl": "6rem",
            "9xl": "8rem",
        }
    },
});

const mantineTheme: MantineThemeOverride = {
    breakpoints: {
        xs: breakpoints.xs,
        sm: breakpoints.sm,
        md: breakpoints.md,
        lg: breakpoints.lg,
        xl: breakpoints.xl
    },
    colors: {
        white: ["#ffffff", "#f9fafb", "#f3f4f6", "#e5e7eb", "#d1d5db", "#9ca3af", "#6b7280", "#4b5563", "#374151", "#1f2937"],
        slate: ["#f8fafc", "#f1f5f9", "#e2e8f0", "#cbd5e1", "#94a3b8", "#64748b", "#475569", "#334155", "#1e293b", "#0f172a"],
        gray: ["#f9fafb", "#f3f4f6", "#e5e7eb", "#d1d5db", "#9ca3af", "#6b7280", "#4b5563", "#374151", "#1f2937", "#111827"],
        zinc: ["#fafafa", "#f4f4f5", "#e4e4e7", "#d4d4d8", "#a1a1aa", "#71717a", "#52525b", "#3f3f46", "#27272a", "#18181b"],
        neutral: ["#fafafa", "#f5f5f5", "#e5e5e5", "#d4d4d4", "#a3a3a3", "#737373", "#525252", "#404040", "#262626", "#171717"],
        stone: ["#fafaf9", "#f5f5f4", "#e7e5e4", "#d6d3d1", "#a8a29e", "#78716c", "#57534e", "#44403c", "#292524", "#1c1917"],
        red: ["#fef2f2", "#fee2e2", "#fecaca", "#fca5a5", "#f87171", "#ef4444", "#dc2626", "#b91c1c", "#991b1b", "#7f1d1d"],
        orange: ["#fff7ed", "#ffedd5", "#fed7aa", "#fdba74", "#fb923c", "#f97316", "#ea580c", "#c2410c", "#9a3412", "#7c2d12"],
        amber: ["#fffbeb", "#fef3c7", "#fde68a", "#fcd34d", "#fbbf24", "#f59e0b", "#d97706", "#b45309", "#92400e", "#78350f"],
        yellow: ["#fefce8", "#fef9c3", "#fef08a", "#fde047", "#facc15", "#eab308", "#ca8a04", "#a16207", "#854d0e", "#713f12"],
        lime: ["#f7fee7", "#ecfccb", "#d9f99d", "#bef264", "#a3e635", "#84cc16", "#65a30d", "#4d7c0f", "#3f6212", "#365314"],
        green: ["#f0fdf4", "#dcfce7", "#bbf7d0", "#86efac", "#4ade80", "#22c55e", "#16a34a", "#15803d", "#166534", "#14532d"],
        emerald: ["#ecfdf5", "#d1fae5", "#a7f3d0", "#6ee7b7", "#34d399", "#10b981", "#059669", "#047857", "#065f46", "#064e3b"],
        teal: ["#f0fdfa", "#ccfbf1", "#99f6e4", "#5eead4", "#2dd4bf", "#14b8a6", "#0d9488", "#0f766e", "#115e59", "#134e4a"],
        cyan: ["#ecfeff", "#cffafe", "#a5f3fc", "#67e8f9", "#22d3ee", "#06b6d4", "#0891b2", "#0e7490", "#155e75", "#164e63"],
        sky: ["#f0f9ff", "#e0f2fe", "#bae6fd", "#7dd3fc", "#38bdf8", "#0ea5e9", "#0284c7", "#0369a1", "#075985", "#0c4a6e"],
        blue: ["#eff6ff", "#dbeafe", "#bfdbfe", "#93c5fd", "#60a5fa", "#3b82f6", "#2563eb", "#1d4ed8", "#1e40af", "#1e3a8a"],
        indigo: ["#eef2ff", "#e0e7ff", "#c7d2fe", "#a5b4fc", "#818cf8", "#6366f1", "#4f46e5", "#4338ca", "#3730a3", "#312e81"],
        violet: ["#f5f3ff", "#ede9fe", "#ddd6fe", "#c4b5fd", "#a78bfa", "#8b5cf6", "#7c3aed", "#6d28d9", "#5b21b6", "#4c1d95"],
        purple: ["#faf5ff", "#f3e8ff", "#e9d5ff", "#d8b4fe", "#c084fc", "#a855f7", "#9333ea", "#7e22ce", "#6b21a8", "#581c87"],
        fuchsia: ["#fdf4ff", "#fae8ff", "#f5d0fe", "#f0abfc", "#e879f9", "#d946ef", "#c026d3", "#a21caf", "#86198f", "#701a75"],
        pink: ["#fdf2f8", "#fce7f3", "#fbcfe8", "#f9a8d4", "#f472b6", "#ec4899", "#db2777", "#be185d", "#9d174d", "#831843"],
        rose: ["#fff1f2", "#ffe4e6", "#fecdd3", "#fda4af", "#fb7185", "#f43f5e", "#e11d48", "#be123c", "#9f1239", "#881337"]
    },
    fontFamily: "Montserrat, sans-serif",
    fontSizes: {
        xs: "0.75rem",
        sm: "0.875rem",
        md: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
    }
};

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(
    //<StrictMode>
    <ApplicationContext>
        <Provider store={store}>
            <NextUIProvider theme={nextUITheme}>
                <MantineProvider theme={mantineTheme}>
                    <App />
                </MantineProvider>
            </NextUIProvider>
        </Provider>
    </ApplicationContext>
    //</StrictMode>,
);
