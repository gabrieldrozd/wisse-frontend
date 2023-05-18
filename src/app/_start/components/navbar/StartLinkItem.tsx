import {NavLink} from "react-router-dom";
import classes from "./styles/StartLinkItem.module.scss";
import clsx from "clsx";
import {LinkModel} from "@routing/models/links";

interface StartLinkItemProps {
    route: LinkModel;
    isActive: boolean;
    setActive: (path: string) => void;
    isDropdown: boolean;
    closeDropdown: () => void;
}

export const StartLinkItem = ({route, isActive, setActive, isDropdown, closeDropdown}: StartLinkItemProps) => {
    let activeClass = "";
    if (isActive) {
        if (isDropdown) {
            activeClass = classes.dropdownLinkActive;
        } else {
            activeClass = classes.linkActive;
        }
    }

    return (
        <NavLink
            to={route.path!}
            key={route.label}
            className={clsx(
                classes.link,
                activeClass,
                isDropdown ? classes.dropdownLink : "",
            )}
            onClick={() => {
                setActive(route.path!);
                setTimeout(() => {
                    closeDropdown();
                }, 200);
            }}
        >
            <div>
                {route.label}
            </div>
        </NavLink>
    );
};