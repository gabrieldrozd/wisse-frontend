import {Route} from "react-router-dom";
import {AdminRouterContext} from "@routing/routes/System/AdminRouterContext";
import {RoleProtectedRoute} from "@routing/components/RoleProtectedRoute";
import {AdminLayout} from "@app.admin/AdminLayout";
import {AdminDashboardPage} from "@app.admin/pages/_AdminDashboardPage";
import {BrowseEnrollmentsPage} from "@app.admin/pages/enrollments/BrowseEnrollmentsPage";
import {ApprovedEnrollmentsPage} from "@app.admin/pages/enrollments/ApprovedEnrollmentsPage";
import {RejectedEnrollmentsPage} from "@app.admin/pages/enrollments/RejectedEnrollmentsPage";
import {BrowseStudentsPage} from "@app.admin/pages/students/BrowseStudentsPage";
import {StudentDetailsPage} from "@app.admin/pages/students/StudentDetailsPage";
import {BrowseTeachersPage} from "@app.admin/pages/teachers/BrowseTeachersPage";
import {TeacherDetailsPage} from "@app.admin/pages/teachers/TeacherDetailsPage";
import {CreateTestTemplatePage} from "@app.admin/pages/test-templates/CreateTestTemplatePage";
import {PaginationContextProvider} from "@context/PaginationContextProvider";

export const AdminRouter = (
    <Route
        path="/admin"
        element={
            <RoleProtectedRoute role="Admin">
                <AdminRouterContext>
                    <AdminLayout />
                </AdminRouterContext>
            </RoleProtectedRoute>
        }
    >
        <Route index element={<AdminDashboardPage />} />

        <Route path="enrollments" element={<BrowseEnrollmentsPage />} />
        <Route path="enrollments/approved" element={<PaginationContextProvider><ApprovedEnrollmentsPage /></PaginationContextProvider>} />
        <Route path="enrollments/rejected" element={<PaginationContextProvider><RejectedEnrollmentsPage /></PaginationContextProvider>} />

        <Route path="students" element={<BrowseStudentsPage />} />
        <Route path="students/:studentId" element={<StudentDetailsPage />} />

        <Route path="teachers" element={<BrowseTeachersPage />} />
        <Route path="teachers/:teacherId" element={<TeacherDetailsPage />} />
        {/*<Route path="teachers/create" element={<CreateTeacherPage />} />*/}

        <Route path="courses" element={<>Courses</>} />
        <Route path="courses/:courseId" element={<>Course Details</>} />

        <Route path="test-templates" element={<>Test templates</>} />
        <Route path="test-templates/create" element={<CreateTestTemplatePage />} />
    </Route>
);