import {FC} from "react";

export interface LinkModel {
    label: string;
    path?: string;
    icon: FC<any>;
    title?: string;
    links?: NestedLinkModel[];
}

export interface NestedLinkModel {
    label: string;
    path: string;
    title?: string
}