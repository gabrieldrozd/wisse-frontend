import {NavLink} from "react-router-dom";
import classes from "./styles/StartLinkItem.module.scss";

interface StartLinkItemProps {
    link: { label: string, path: string; };
    isActive: boolean;
    setActive: (path: string) => void;
    isDropdown: boolean;
    closeDropdown: () => void;
}

export const StartLinkItem = ({link, isActive, setActive, isDropdown, closeDropdown}: StartLinkItemProps) => {
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
            to={link.path}
            key={link.label}
            className={`
                ${isDropdown ? classes.dropdownLink : classes.link} ${activeClass}
            `}
            onClick={() => {
                setActive(link.path);
                setTimeout(() => {
                    closeDropdown();
                }, 200);
            }}
        >
            {link.label}
        </NavLink>
    );
};