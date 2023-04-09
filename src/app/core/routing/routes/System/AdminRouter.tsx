import {Route} from "react-router-dom";
import {RoleProtectedRoute} from "@core/routing/components/RoleProtectedRoute";
import {AdminStructure} from "@structures/AdminStructure";
import {AdminDashboardPage} from "@pages/System/Admin/AdminDashboardPage";
import {BrowseEnrollmentsPage} from "@pages/System/Admin/Enrollments/BrowseEnrollmentsPage";
import {ApprovedEnrollmentsPage} from "@pages/System/Admin/Enrollments/ApprovedEnrollmentsPage";
import {RejectedEnrollmentsPage} from "@pages/System/Admin/Enrollments/RejectedEnrollmentsPage";
import {BrowseEnrollmentsContext} from "@components/System/Admin/Enrollments/Browse/_context/BrowseEnrollmentsContext";

export const AdminRouter = (
    <Route
        path="/admin"
        element={
            <RoleProtectedRoute role="Admin">
                <AdminStructure />
            </RoleProtectedRoute>
        }
    >
        <Route index element={<AdminDashboardPage />} />
        <Route path="enrollments" element={
            <BrowseEnrollmentsContext>
                <BrowseEnrollmentsPage />
            </BrowseEnrollmentsContext>
        } />
        <Route path="enrollments/approved" element={<ApprovedEnrollmentsPage />} />
        <Route path="enrollments/rejected" element={<RejectedEnrollmentsPage />} />
    </Route>
);