import {createContext, FunctionComponent, ReactNode, useContext, useMemo, useState} from "react";
import {EnrollmentsContext} from "@components/System/Admin/Enrollments/_context/EnrollmentsContext";
import {StudentsContext} from "@/modules/admin/components/students/_context/StudentsContext";

export interface Props {
}

const Context = createContext<Props>({} as Props);

interface ContextProps {
    children: ReactNode;
}

export const TeacherRouterContext: FunctionComponent<ContextProps> = ({children}) => {
    const contextObject = useMemo(() => ({}), []);

    return (
        <Context.Provider value={contextObject}>
            {children}
        </Context.Provider>
    );
};