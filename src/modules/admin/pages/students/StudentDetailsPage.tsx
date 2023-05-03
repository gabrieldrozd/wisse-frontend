import {useParams} from "react-router-dom";
import {useEffect} from "react";

export const StudentDetailsPage = () => {
    const {studentId} = useParams<{ studentId: string }>();


    useEffect(() => {
        console.log(studentId);
    }, [studentId]);

    return (
        <>Student details</>
    );
};