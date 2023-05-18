import {createContext, FunctionComponent, ReactNode, useMemo} from "react";

export interface Props {
}

const Context = createContext<Props>({} as Props);

interface ContextProps {
    children: ReactNode;
}

export const StudentRouterContext: FunctionComponent<ContextProps> = ({children}) => {
    const contextObject = useMemo(() => ({}), []);

    return (
        <Context.Provider value={contextObject}>
            {children}
        </Context.Provider>
    );
};