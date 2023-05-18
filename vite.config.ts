import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve("src"),
            "@assets": path.resolve("src/_assets"),
            "@styles": path.resolve("src/_styles"),
            "@base": path.resolve("src/_styles/base.scss"),
            "@colors": path.resolve("src/_styles/colors.scss"),

            "@app.common": path.resolve("src/app/_common"),
            "@app.start": path.resolve("src/app/_start"),
            "@app.admin": path.resolve("src/app/admin"),
            "@app.student": path.resolve("src/app/student"),
            "@app.teacher": path.resolve("src/app/teacher"),

            "@api": path.resolve("src/core/api"),
            "@context": path.resolve("src/core/context"),
            "@models": path.resolve("src/core/models"),
            "@routing": path.resolve("src/core/routing"),
            "@services": path.resolve("src/core/services"),

            "@components": path.resolve("src/shared/components"),
            "@const": path.resolve("src/shared/constants"),
            "@hooks": path.resolve("src/shared/hooks"),
            "@utils": path.resolve("src/shared/utilities"),

            "@store": path.resolve("src/store"),
        }
    }
});
