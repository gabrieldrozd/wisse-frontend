import {createContext, FunctionComponent, ReactNode, useContext, useMemo, useState} from "react";
import {StudentBase} from "@models/users/student/studentBrowse";
import {TeacherBase} from "@models/users/teacher/teacherBrowse";

export interface Props {
    selected: {
        value: TeacherBase;
        set: (student: TeacherBase) => Promise<void>;
        unset: () => Promise<void>;
    },
}

const Context = createContext<Props>({} as Props);
export const useTeachersContext = () => useContext(Context);

interface ContextProps {
    children: ReactNode;
}

export const TeachersContext: FunctionComponent<ContextProps> = ({children}) => {
    const [selected, setSelected] = useState<TeacherBase>({} as TeacherBase);

    const handleSelectTeacher = async (student: TeacherBase) => {
        setSelected(student);
    };

    const handleUnsetTeacher = async () => {
        setSelected({} as TeacherBase);
    };

    const contextObject = useMemo(() => ({
        selected: {
            value: selected,
            set: handleSelectTeacher,
            unset: handleUnsetTeacher,
        }
    }), [selected]);

    return (
        <Context.Provider value={contextObject}>
            {children}
        </Context.Provider>
    );
};