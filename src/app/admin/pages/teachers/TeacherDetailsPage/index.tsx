import {Notify} from "@services/Notify";
import {useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";

export const TeacherDetailsPage = () => {
    const navigate = useNavigate();
    const {teacherId} = useParams<{ teacherId: string }>();

    useEffect(() => {
        if (!teacherId || teacherId === "undefined") {
            Notify.warning("Not selected", "Teacher must be selected first");
            navigate("/admin/teachers");
        }
    }, [teacherId]);

    return (
        <>Teacher details</>
    );
};