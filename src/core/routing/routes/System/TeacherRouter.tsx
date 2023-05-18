import {Route} from "react-router-dom";
import {RoleProtectedRoute} from "@routing/components/RoleProtectedRoute";
import {StudentDashboardPage} from "@app.student/pages/_StudentDashboardPage";

export const TeacherRouter = (
    <Route
        path="/teacher"
        element={
            <RoleProtectedRoute role="Teacher">
                Teacher
                {/*<StudentStructure />*/}
            </RoleProtectedRoute>
        }
    >
        <Route index element={<StudentDashboardPage />} />
        {/*<Route path="enroll" element={<EnrollPage />} />*/}
    </Route>
);