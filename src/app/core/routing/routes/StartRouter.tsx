import {Route} from "react-router-dom";
import {UnprotectedRoute} from "@core/routing/components/UnprotectedRoute";
import {StartStructure} from "@/modules/_start/structure/StartStructure";
import {HomePage} from "@/modules/_start/pages/home/HomePage";
import {EnrollPage} from "@/modules/_start/pages/enroll/EnrollPage";

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
