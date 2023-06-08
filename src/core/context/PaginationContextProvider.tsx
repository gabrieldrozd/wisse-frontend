import type {IPaginationRequest} from "@models/api/pagination";
import type {ReactNode} from "react";
import {createContext, useContext, useMemo, useState} from "react";

export interface IPaginationModel {
    /**
     * The current pagination state.
     */
    model: IPaginationRequest;

    /**
     * Sets the current page index.
     * @param index The page index to set.
     */
    setPageIndex: (index: number) => void;

    /**
     * Sets the current page size.
     * @param size The page size to set.
     */
    setPageSize: (size: number) => void;

    /**
     * Sets the current sort order.
     * @param isAscending The sort order to set.
     */
    setIsAscending: (isAscending: boolean) => void;
}

const PaginationContext = createContext<IPaginationModel>({} as IPaginationModel);
export const usePagination = () => useContext(PaginationContext);

interface Props {
    children: ReactNode;
}

/**
 * Provides the pagination context.
 * @param children The children to render.
 * @example
 *
 *  export const MyComponent = () => {
 *      const {pagination, setPageIndex, setPageSize, setIsAscending} = usePagination();
 *
 *      // ...
 *
 *      return (
 *          <PaginationContextProvider>
 *              <MyOtherComponent />
 *              <MyThirdComponent />
 *          </PaginationContextProvider>
 *      );
 *  }
 */
export const PaginationContextProvider = ({children}: Props) => {
    const [pagination, setPagination] = useState<IPaginationRequest>({
        pageIndex: 1,
        pageSize: 10,
        isAscending: true,
    });

    const handleSetPageIndex = async (index: number) => setPagination({...pagination, pageIndex: index});
    const handleSetPageSize = async (size: number) => setPagination({...pagination, pageSize: size});
    const handleSetIsAscending = async (isAscending: boolean) => setPagination({...pagination, isAscending: isAscending});

    const contextObject = useMemo(() => ({
        model: pagination,
        setPageIndex: handleSetPageIndex,
        setPageSize: handleSetPageSize,
        setIsAscending: handleSetIsAscending,
    }), [pagination]);

    return (
        <PaginationContext.Provider value={contextObject}>
            {children}
        </PaginationContext.Provider>
    );
};