import {createContext, FunctionComponent, ReactNode, useContext, useMemo, useState} from "react";
import {StudentBase} from "@models/users/student/studentBrowse";

export interface Props {
    selected: {
        value: StudentBase;
        set: (student: StudentBase) => Promise<void>;
        unset: () => Promise<void>;
    },
}

const Context = createContext<Props>({} as Props);
export const useStudentsContext = () => useContext(Context);

interface ContextProps {
    children: ReactNode;
}

// LOCAL STATE - no API calls here
// only the state of some items that are not stored in the store
export const StudentsContext: FunctionComponent<ContextProps> = ({children}) => {
    const [selected, setSelected] = useState<StudentBase>({} as StudentBase);

    const handleSelectStudent = async (student: StudentBase) => {
        setSelected(student);
    };

    const handleUnsetStudent = async () => {
        setSelected({} as StudentBase);
    };

    const contextObject = useMemo(() => ({
        selected: {
            value: selected,
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