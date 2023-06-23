import {createContext, FunctionComponent, ReactNode, useContext, useMemo, useState} from "react";
import {IStudentBase} from "@models/users/student/studentBrowse";

export interface Props {
    selected: {
        value: IStudentBase;
        set: (student: IStudentBase) => Promise<void>;
        unset: () => Promise<void>;
    },
}

const Context = createContext<Props>({} as Props);
export const useStudentsContext = () => useContext(Context);

interface ContextProps {
    children: ReactNode;
}

export const StudentsContext: FunctionComponent<ContextProps> = ({children}) => {
    const [selected, setSelected] = useState<IStudentBase>({} as IStudentBase);

    const handleSelectStudent = async (student: IStudentBase) => {
        setSelected(student);
    };

    const handleUnsetStudent = async () => {
        setSelected({} as IStudentBase);
    };

    const contextObject = useMemo(() => ({
        selected: {
            value: selected ?? {} as IStudentBase,
            set: handleSelectStudent,
            unset: handleUnsetStudent,
        }
    }), [selected]);

    return (
        <Context.Provider value={contextObject}>
            {children}
        </Context.Provider>
    );
};