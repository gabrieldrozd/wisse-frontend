import {useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Notify} from "@services/Notify";

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