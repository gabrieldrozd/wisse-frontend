import {createContext, FunctionComponent, ReactNode, useMemo} from "react";
import {EnrollmentsContext} from "@modules.admin/components/enrollments/_context/EnrollmentsContext";
import {StudentsContext} from "@modules.admin/components/students/_context/StudentsContext";

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
                    {children}
                </StudentsContext>
            </EnrollmentsContext>
        </Context.Provider>
    );
};