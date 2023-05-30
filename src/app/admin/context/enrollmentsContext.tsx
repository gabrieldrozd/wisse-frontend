import type {EnrollmentBase} from "@models/enrollment/enrollmentBrowse";
import type {FunctionComponent, ReactNode} from "react";
import {createContext, useContext, useMemo, useState} from "react";

export interface Props {
    selected: {
        value: EnrollmentBase;
        set: (enrollment: EnrollmentBase) => Promise<void>;
        unset: () => Promise<void>;
    },
}

const Context = createContext<Props>({} as Props);
export const useEnrollmentsContext = () => useContext(Context);

interface ContextProps {
    children: ReactNode;
}

// LOCAL STATE - no API calls here
// only the state of some items that are not stored in the store
export const EnrollmentsContext: FunctionComponent<ContextProps> = ({children}) => {
    const [selected, setSelected] = useState<EnrollmentBase>({} as EnrollmentBase);

    const handleSelectEnrollment = async (enrollment: EnrollmentBase) => {
        setSelected(enrollment);
    };

    const handleUnsetEnrollment = async () => {
        setSelected({} as EnrollmentBase);
    };

    const contextObject = useMemo(() => ({
        selected: {
            value: selected,
            set: handleSelectEnrollment,
            unset: handleUnsetEnrollment,
        }
    }), [selected]);

    return (
        <Context.Provider value={contextObject}>
            {children}
        </Context.Provider>
    );
};