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
            "@api": path.resolve("src/app/api"),
            "@core": path.resolve("src/app/core"),
            "@hooks": path.resolve("src/app/hooks"),
            "@models": path.resolve("src/app/models"),
            "@store": path.resolve("src/app/store"),

            "@common": path.resolve("src/common"),
            "@components": path.resolve("src/components"),

            "@modules.common": path.resolve("src/modules/_common"),
            "@modules.start": path.resolve("src/modules/_start"),
            "@modules.admin": path.resolve("src/modules/admin"),
            "@modules.student": path.resolve("src/modules/student"),
            "@modules.teacher": path.resolve("src/modules/teacher"),
        }
    }
});
