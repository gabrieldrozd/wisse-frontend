import {Route} from "react-router-dom";
import {RoleProtectedRoute} from "@core/routing/components/RoleProtectedRoute";
import {StudentStructure} from "@structures/StudentStructure";
import {StudentDashboardPage} from "@pages/System/Student/StudentDashboardPage";
import {useAuthSlice} from "@store/slices/users/auth/authSlice";

export const StudentRouter = (
    <Route
        path="/student"
        element={
            <RoleProtectedRoute role="Student">
                <StudentStructure />
            </RoleProtectedRoute>
        }
    >
        <Route index element={<StudentDashboardPage />} />
        {/*<Route path="enroll" element={<EnrollPage />} />*/}
    </Route>
);