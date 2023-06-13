import {Button, Container, createStyles, Group, Mark, rem, Space, Text, Title} from "@mantine/core";
import {useLocation, useNavigate} from "react-router-dom";
import {IconChevronLeft} from "@tabler/icons-react";
import {useAuthState} from "@store/slices/users/auth/useAuthState";

const useStyles = createStyles((theme) => ({
    root: {
        paddingTop: rem(80),
        paddingBottom: rem(80),
    },

    label: {
        textAlign: "center",
        fontWeight: 900,
        fontSize: rem(150),
        lineHeight: 1,
        marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
        color: "rgba(0, 0, 0, 0.1)",

        [theme.fn.smallerThan("sm")]: {
            fontSize: rem(120),
        },
    },

    title: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        textAlign: "center",
        fontWeight: 900,
        fontSize: rem(38),

        [theme.fn.smallerThan("sm")]: {
            fontSize: rem(32),
        },
    },

    description: {
        maxWidth: rem(500),
        margin: "auto",
        marginTop: theme.spacing.xl,
        marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
    },
}));

export const AccessDeniedPage = () => {
    const {selectors: {isAuthenticated, accessToken}} = useAuthState();
    const {classes} = useStyles();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from || "/";

    const handleGoBack = () => {
        if (!isAuthenticated()) {
            navigate("/");
        } else if (isAuthenticated()) {
            const user = accessToken();
            switch (user.role) {
                case "Admin":
                    navigate("/admin");
                    break;
                case "Teacher":
                    navigate("/teacher");
                    break;
                case "Student":
                    navigate("/student");
                    break;
                default:
                    navigate("/");
                    break;
            }
        }
    };

    return (
        <Container className={classes.root}>
            <div className={classes.label}>DENIED</div>
            <Title className={classes.title}>You don't have access to go there.</Title>
            <Text color="dimmed" size="lg" align="center" className={classes.description}>
                Unfortunately, you don't have access to navigate to: <Mark color="indigo.3" fw={500}>'{from}'</Mark>.
                <Space h="xs" />
                If you think this is a mistake, please contact the administrator.
            </Text>

            <Group position="center">
                <Button
                    size="lg"
                    color="indigo.5"
                    variant="filled"
                    onClick={handleGoBack}
                    leftIcon={<IconChevronLeft />}
                >
                    Take me back
                </Button>
            </Group>
        </Container>
    );
};