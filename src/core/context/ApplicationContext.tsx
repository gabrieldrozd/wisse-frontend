import type {ReactNode} from "react";
import {createContext, useContext, useMemo, useState} from "react";

export declare interface AppContextProps {
    isLoading: {
        value: boolean;
        set: (loading: boolean) => void;
    };
}

const AppContext = createContext<AppContextProps>({} as AppContextProps);
export const useAppContext = () => useContext(AppContext);

export declare interface Props {
    children: ReactNode;
}

export const ApplicationContext = ({children}: Props) => {
    const [isLoading, setIsLoading] = useState(false);

    const contextObject = () => ({
        isLoading: {
            value: isLoading,
            set: setIsLoading,
        }
    });

    return (
        <AppContext.Provider value={contextObject()}>
            {children}
        </AppContext.Provider>
    );
};