import {Route} from "react-router-dom";
import {UnprotectedRoute} from "@routing/components/UnprotectedRoute";
import {StartLayout} from "@app.start/StartLayout";
import {HomePage} from "@app.start/pages/HomePage";
import {EnrollPage} from "@app.start/pages/EnrollPage";

export const StartRouter = (
    <Route
        path="/"
        element={
            <UnprotectedRoute>
                <StartLayout />
            </UnprotectedRoute>
        }
    >
        <Route index element={<HomePage />} />
        <Route path="enroll" element={<EnrollPage />} />
    </Route>
);
