import {EnrollmentBase} from "@models/enrollment/enrollmentBrowse";
import {createContext, FunctionComponent, ReactNode, useContext, useMemo, useState} from "react";

export interface Props {
    enrollment: {
        value: EnrollmentBase;
        set: (enrollment: EnrollmentBase) => Promise<void>;
        unset: () => Promise<void>;
    }
}

const Context = createContext<Props>({} as Props);
export const useBrowseEnrollmentsContext = () => useContext(Context);

interface ContextProps {
    children: ReactNode;
}

export const BrowseEnrollmentsContext: FunctionComponent<ContextProps> = ({children}) => {
    const [selectedEnrollment, setSelectedEnrollment] = useState<EnrollmentBase>({} as EnrollmentBase);

    const handleSelectEnrollment = async (enrollment: EnrollmentBase) => {
        setSelectedEnrollment(enrollment);
    }

    const handleUnsetEnrollment = async () => {
        setSelectedEnrollment({} as EnrollmentBase);
    }

    const contextObject = useMemo(() => ({
        enrollment: {
            value: selectedEnrollment,
            set: handleSelectEnrollment,
            unset: handleUnsetEnrollment,
        }
    }), [selectedEnrollment]);

    return (
        <Context.Provider value={contextObject}>
            {children}
        </Context.Provider>
    );
};