import {createContext, FunctionComponent, ReactNode, useMemo} from "react";
import {EnrollmentsContext} from "@app.admin/context/enrollmentsContext";
import {StudentsContext} from "@app.admin/context/studentsContext";
import {TeachersContext} from "@app.admin/context/teachersContext";

export interface Props {
}

const Context = createContext<Props>({} as Props);

interface ContextProps {
    children: ReactNode;
}

export const AdminRouterContext: FunctionComponent<ContextProps> = ({children}) => {
    const contextObject = useMemo(() => ({}), []);

    return (
        <Context.Provider value={contextObject}>
            <EnrollmentsContext>
                <StudentsContext>
                    <TeachersContext>
                        {children}
                    </TeachersContext>
                </StudentsContext>
            </EnrollmentsContext>
        </Context.Provider>
    );
};