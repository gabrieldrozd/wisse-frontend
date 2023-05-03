import {Route} from "react-router-dom";
import {RoleProtectedRoute} from "@core/routing/components/RoleProtectedRoute";
import {AdminStructure} from "@/modules/admin/structure/AdminStructure";
import {AdminDashboardPage} from "@/modules/admin/pages/_dashboard/AdminDashboardPage";
import {BrowseEnrollmentsPage} from "@/modules/admin/pages/enrollments/BrowseEnrollmentsPage";
import {ApprovedEnrollmentsPage} from "@/modules/admin/pages/enrollments/ApprovedEnrollmentsPage";
import {RejectedEnrollmentsPage} from "@/modules/admin/pages/enrollments/RejectedEnrollmentsPage";
import {BrowseStudentsPage} from "@/modules/admin/pages/students/BrowseStudentsPage";
import {BrowseTeachersPage} from "@/modules/admin/pages/teachers/BrowseTeachersPage";
import {AdminRouterContext} from "@core/routing/routes/System/AdminRouterContext";
import {StudentDetailsPage} from "@/modules/admin/pages/students/StudentDetailsPage";
import {TeacherDetailsPage} from "@modules.admin/pages/teachers/TeacherDetailsPage";

export const AdminRouter = (
    <Route
        path="/admin"
        element={
            <RoleProtectedRoute role="Admin">
                <AdminRouterContext>
                    <AdminStructure />
                </AdminRouterContext>
            </RoleProtectedRoute>
        }
    >
        <Route index element={<AdminDashboardPage />} />

        <Route path="enrollments" element={<BrowseEnrollmentsPage />} />
        <Route path="enrollments/approved" element={<ApprovedEnrollmentsPage />} />
        <Route path="enrollments/rejected" element={<RejectedEnrollmentsPage />} />

        <Route path="students" element={<BrowseStudentsPage />} />
        <Route path="students/:studentId" element={<StudentDetailsPage />} />

        <Route path="teachers" element={<BrowseTeachersPage />} />
        <Route path="teachers/:teacherId" element={<TeacherDetailsPage />} />

        <Route path="test-templates" element={<>Test templates</>} />
        <Route path="test-templates/create" element={<>Create new test template</>} />
    </Route>
);