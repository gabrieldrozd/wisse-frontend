import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import {Notify} from "@core/services/Notify";

export const StudentDetailsPage = () => {
    const navigate = useNavigate();
    const {studentId} = useParams<{ studentId: string }>();


    useEffect(() => {
        if (!studentId || studentId === "undefined") {
            Notify.warning("Not selected", "Student must be selected first");
            navigate("/admin/students");
        }
    }, [studentId]);

    return (
        <>Student details</>
    );
};