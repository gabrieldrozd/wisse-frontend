import {FC} from "react";

export interface LinkModel {
    label: string;
    path?: string;
    icon: FC<any> | any;
    title?: string;
    links?: NestedLinkModel[];
    helpers?: string[];
}

export interface NestedLinkModel {
    label: string;
    path: string;
    title?: string;
    helpers?: string[];
}