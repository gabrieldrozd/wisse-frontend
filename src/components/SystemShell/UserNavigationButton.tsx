import {
    UnstyledButton,
    Group,
    Avatar,
    Text,
    createStyles,
} from "@mantine/core";
import {IconChevronRight} from "@tabler/icons-react";
import {useEffect, useState} from "react";
import {AccessToken} from "@models/auth/accessToken";

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

export interface UserNavigationButtonProps {
    accessToken: AccessToken;
}

export function UserNavigationButton({accessToken}: UserNavigationButtonProps) {
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

    return (
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
    );
}