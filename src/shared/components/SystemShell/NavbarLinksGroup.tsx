import React, {FC, useEffect, useState} from "react";
import {Group, Box, Collapse, ThemeIcon, Text, UnstyledButton} from "@mantine/core";
import {IconChevronRight} from "@tabler/icons-react";
import classes from "./styles/NavbarLinksGroup.module.scss";
import {useLocation, useNavigate} from "react-router-dom";
import clsx from "clsx";

interface LinksGroupProps {
    label: string;
    path?: string;
    icon?: FC<any>;
    title?: string;
    active?: boolean;
    links?: { label: string; path: string; title?: string; active?: boolean }[];
}

export function LinksGroup({label, path, icon: Icon, active, links}: LinksGroupProps) {
    const navigate = useNavigate();
    const location = useLocation();
    const hasLinks = Array.isArray(links);
    const [opened, setOpened] = useState(false);

    useEffect(() => {
        const isAnyLinkActive =
            links?.some((link) => link.active) || false;
        setOpened(isAnyLinkActive);
    }, [location.pathname, links]);

    const handleGroupClick = () => {
        if (!hasLinks && path) {
            navigate(path);
        } else {
            setOpened((o) => !o);
        }
    };

    const handleLinkClick = (linkPath: string) => {
        navigate(linkPath);
    };

    const items = (hasLinks ? links : []).map((link) => (
        <Text
            key={link.label}
            component="a"
            className={clsx(
                classes.path,
                location.pathname === link.path ? classes.active : ""
            )}

            onClick={() => handleLinkClick(link.path)}
        >
            {link.label}
        </Text>
    ));

    return (
        <>
            <UnstyledButton
                className={`${classes.control} ${
                    !hasLinks && active ? classes.active : ""
                }`}
                onClick={handleGroupClick}
            >
                <Group position="apart" spacing={0}>
                    <Box sx={{display: "flex", alignItems: "center"}}>
                        <ThemeIcon color="indigo.5" variant="light" size="2.5rem">
                            {Icon && <Icon size="1.75rem" />}
                        </ThemeIcon>
                        <Box ml="0.5rem">{label}</Box>
                    </Box>
                    {hasLinks && (
                        <IconChevronRight
                            className={classes.chevron}
                            size="1rem"
                            stroke={1.5}
                            style={{
                                transform: opened ? `rotate(${90}deg)` : "none",
                            }}
                        />
                    )}
                </Group>
            </UnstyledButton>
            {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
        </>
    );
}