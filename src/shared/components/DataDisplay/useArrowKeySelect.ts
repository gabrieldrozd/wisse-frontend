import type {Table} from "@tanstack/react-table";
import type {RefObject} from "react";
import {useEffect} from "react";

export interface Props {
    tableBodyRef: RefObject<HTMLTableSectionElement>;
    table: Table<any>;
    selectedRow: any;
    selectRow: (objectRow: any) => Promise<void>;
}

export const useArrowKeySelect = ({tableBodyRef, table, selectedRow, selectRow}: Props) => {
    const handleArrowKeys = async (event: KeyboardEvent) => {
        const arrowUp = "ArrowUp";
        const arrowDown = "ArrowDown";
        const currentRowIndex = table
            .getRowModel()
            .rows.findIndex((row: any) => selectedRow?.externalId === row.original.externalId);

        if (event.key === arrowUp && currentRowIndex > 0) {
            const newRow = table.getRowModel().rows[currentRowIndex - 1].original;
            await selectRow(newRow);
        } else if (event.key === arrowDown && currentRowIndex < table.getRowModel().rows.length - 1) {
            const newRow = table.getRowModel().rows[currentRowIndex + 1].original;
            await selectRow(newRow);
        }
    };

    useEffect(() => {
        const tableBodyElement = tableBodyRef.current;
        if (tableBodyElement) {
            tableBodyElement.addEventListener("keydown", handleArrowKeys);
        }
        return () => {
            if (tableBodyElement) {
                tableBodyElement.removeEventListener("keydown", handleArrowKeys);
            }
        };
    }, [tableBodyRef, handleArrowKeys]);
};