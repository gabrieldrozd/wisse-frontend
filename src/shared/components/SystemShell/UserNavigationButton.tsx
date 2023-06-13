import {UnstyledButton, Group, Avatar, Text, createStyles, Menu, Popover, Divider} from "@mantine/core";
import type {IAccessToken} from "@models/auth/IAccessToken";
import {useAuthState} from "@store/slices/users/auth/useAuthState";
import {IconChevronRight, IconLogout, IconX} from "@tabler/icons-react";
import {useEffect, useState} from "react";
import {Button} from "@nextui-org/react";

const useStyles = createStyles((theme) => ({
    user: {
        display: "block",
        width: "100%",
        padding: theme.spacing.md,
        color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

        "&:hover": {
            backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0],
        },
    },
}));

interface Props {
    accessToken: IAccessToken;
}

export function UserNavigationButton({accessToken}: Props) {
    const {actions: {logout}} = useAuthState();
    const [menuOpened, setMenuOpened] = useState(false);
    const [confirmOpened, setConfirmOpened] = useState(false);

    const {classes} = useStyles();
    const {firstName, lastName, email} = accessToken;
    const [fullName, setFullName] = useState<string>("");

    useEffect(() => {
        if (accessToken.role === "Admin") {
            setFullName("Admin");
        } else {
            setFullName(`${firstName} ${lastName}`);
        }
    }, [accessToken]);

    const handleLogout = () => {
        logout();
        setMenuOpened(false);
    };

    return (
        <>
            <Menu shadow="md" width={200} position="right-end" opened={menuOpened} onOpen={() => setMenuOpened(true)}>
                <Menu.Target>
                    <UnstyledButton className={classes.user}>
                        <Group>
                            <Avatar radius="xl" />

                            <div style={{flex: 1}}>
                                <Text size="sm" weight={500}>
                                    {fullName}
                                </Text>

                                <Text color="dimmed" size="xs">
                                    {email}
                                </Text>
                            </div>

                            {<IconChevronRight size="0.9rem" stroke={3} />}
                        </Group>
                    </UnstyledButton>
                </Menu.Target>

                <Menu.Dropdown>
                    <Popover position="right-end" withArrow shadow="md" opened={confirmOpened} onChange={setConfirmOpened}>
                        <Popover.Target>
                            <Menu.Item color="red" icon={<IconLogout size={14} />} onClick={() => setConfirmOpened(true)}>
                                Logout
                            </Menu.Item>
                        </Popover.Target>
                        <Popover.Dropdown>
                            <Text size="sm" weight={500} ta={"center"}>
                                Are you sure you want to logout?
                            </Text>
                            <Divider my={10} />
                            <Group position="apart">
                                <Button size="sm" color="error" onPress={handleLogout}>
                                    Logout
                                </Button>
                                <Button
                                    size="sm"
                                    color="gradient"
                                    onPress={() => {
                                        setConfirmOpened(false);
                                        setMenuOpened(false);
                                    }}
                                >
                                    Cancel
                                </Button>
                            </Group>
                        </Popover.Dropdown>
                    </Popover>

                    <Menu.Item icon={<IconX size={14} />} onClick={() => setMenuOpened(false)}>
                        Close menu
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
        </>
    );
}