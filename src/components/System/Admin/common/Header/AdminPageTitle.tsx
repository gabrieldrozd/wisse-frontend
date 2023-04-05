import {Paper, Title} from "@mantine/core";
import {useLocation} from "react-router-dom";
import {LinkModel, NestedLinkModel} from "@core/routing/models/links";

const findTitleByPath = (path: string, links: LinkModel[]): string | null => {
    for (const link of links) {
        if (link.path === path) {
            return link.title!;
        }
        if (link.links) {
            const nestedTitle = findTitleByPathInNestedLinks(path, link.links);
            if (nestedTitle) {
                return nestedTitle;
            }
        }
    }
    return null;
};

const findTitleByPathInNestedLinks = (path: string, nestedLinks: NestedLinkModel[]): string | null => {
    for (const nestedLink of nestedLinks) {
        if (nestedLink.path === path) {
            return nestedLink.title!;
        }
    }
    return null;
};

export interface AdminPageTitleProps {
    links: LinkModel[];
}

export const AdminPageTitle = ({links}: AdminPageTitleProps) => {
    const location = useLocation();
    const title = findTitleByPath(location.pathname, links);

    return (
        <Paper bg="indigo.2" mx={20}>
            <Title order={3} p={10} style={{fontFamily: "Quicksand"}}>
                {title}
            </Title>
        </Paper>
    );
};