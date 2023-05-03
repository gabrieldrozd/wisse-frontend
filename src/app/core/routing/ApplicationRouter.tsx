import {createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom";
import {StartRouter} from "@core/routing/routes/StartRouter";
import {NotFoundPage} from "@/modules/_common/pages/NotFoundPage";
import {StudentRouter} from "@core/routing/routes/System/StudentRouter";
import {AdminRouter} from "@core/routing/routes/System/AdminRouter";
import {TeacherRouter} from "@core/routing/routes/System/TeacherRouter";
import {AccessDeniedPage} from "@/modules/_common/pages/AccessDeniedPage";

export const ApplicationRouter = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            {StartRouter}
            {AdminRouter}
            {TeacherRouter}
            {StudentRouter}

            <Route path="access-denied" element={<AccessDeniedPage />} />
            <Route path="*" element={<NotFoundPage />} />
        </Route>
    )
);