import {createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom";
import {StartRouter} from "@routing/routes/StartRouter";
import {AdminRouter} from "@routing/routes/System/AdminRouter";
import {TeacherRouter} from "@routing/routes/System/TeacherRouter";
import {StudentRouter} from "@routing/routes/System/StudentRouter";
import {AccessDeniedPage} from "@app.common/pages/AccessDeniedPage";
import {NotFoundPage} from "@app.common/pages/NotFoundPage";
import {AuthorizedRoute} from "@routing/components/AuthorizedRoute";

export const ApplicationRouter = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            {StartRouter}
            {AdminRouter}
            {TeacherRouter}
            {StudentRouter}

            {/* TODO: Routing could probably be done like below (this approach needs multiple tests) */}
            {/*<Route*/}
            {/*    path="admin"*/}
            {/*    element={*/}
            {/*        <AuthorizedRoute>*/}
            {/*            {AdminRouter}*/}
            {/*        </AuthorizedRoute>*/}
            {/*    }*/}
            {/*/>*/}

            <Route path="access-denied" element={<AccessDeniedPage />} />
            <Route path="*" element={<NotFoundPage />} />
        </Route>
    )
);