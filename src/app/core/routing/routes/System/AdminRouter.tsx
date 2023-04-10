import {Route} from "react-router-dom";
import {RoleProtectedRoute} from "@core/routing/components/RoleProtectedRoute";
import {AdminStructure} from "@structures/AdminStructure";
import {AdminDashboardPage} from "@pages/System/Admin/AdminDashboardPage";
import {BrowseEnrollmentsPage} from "@pages/System/Admin/Enrollments/BrowseEnrollmentsPage";
import {ApprovedEnrollmentsPage} from "@pages/System/Admin/Enrollments/ApprovedEnrollmentsPage";
import {RejectedEnrollmentsPage} from "@pages/System/Admin/Enrollments/RejectedEnrollmentsPage";
import {EnrollmentsContext} from "@components/System/Admin/Enrollments/_context/EnrollmentsContext";

export const AdminRouter = (
    <Route
        path="/admin"
        element={
            <RoleProtectedRoute role="Admin">
                <EnrollmentsContext>
                    <AdminStructure />
                </EnrollmentsContext>
            </RoleProtectedRoute>
        }
    >
        <Route index element={<AdminDashboardPage />} />
        <Route path="enrollments" element={<BrowseEnrollmentsPage />} />
        <Route path="enrollments/approved" element={<ApprovedEnrollmentsPage />} />
        <Route path="enrollments/rejected" element={<RejectedEnrollmentsPage />} />
    </Route>
);