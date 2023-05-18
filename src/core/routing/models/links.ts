import {FC} from "react";

export interface LinkModel {
    label: string;
    path?: string;
    title?: string;
    icon?: FC<any> | any;
    active?: boolean;
    links?: NestedLinkModel[];
    hints?: string[];
}

export interface NestedLinkModel {
    label: string;
    path: string;
    title?: string;
    active?: boolean;
    hints?: string[];
}