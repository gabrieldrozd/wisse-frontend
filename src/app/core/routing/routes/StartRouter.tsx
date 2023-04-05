import {Route} from "react-router-dom";
import {UnprotectedRoute} from "@core/routing/components/UnprotectedRoute";
import {StartStructure} from "@structures/StartStructure";
import {HomePage} from "@pages/Start/HomePage";
import {EnrollPage} from "@pages/Start/EnrollPage";

export const StartRouter = (
    <Route
        path="/"
        element={
            <UnprotectedRoute>
                <StartStructure />
            </UnprotectedRoute>
        }
    >
        <Route index element={<HomePage />} />
        <Route path="enroll" element={<EnrollPage />} />
    </Route>
);
