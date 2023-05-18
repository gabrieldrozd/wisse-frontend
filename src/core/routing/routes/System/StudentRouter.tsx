import {Route} from "react-router-dom";
import {RoleProtectedRoute} from "@routing/components/RoleProtectedRoute";
import {StudentLayout} from "@app.student/StudentLayout";
import {StudentDashboardPage} from "@app.student/pages/_StudentDashboardPage";

export const StudentRouter = (
    <Route
        path="/student"
        element={
            <RoleProtectedRoute role="Student">
                <StudentLayout />
            </RoleProtectedRoute>
        }
    >
        <Route index element={<StudentDashboardPage />} />
        {/*<Route path="enroll" element={<EnrollPage />} />*/}
    </Route>
);