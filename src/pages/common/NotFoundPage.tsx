import {Button, Container, createStyles, Group, rem, Text, Title} from "@mantine/core";
import {useNavigate} from "react-router-dom";
import {IconChevronLeft} from "@tabler/icons-react";

const useStyles = createStyles((theme) => ({
    root: {
        paddingTop: rem(80),
        paddingBottom: rem(80),
    },

    label: {
        textAlign: "center",
        fontWeight: 900,
        fontSize: rem(220),
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

export const NotFoundPage = () => {
    const {classes} = useStyles();
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <Container className={classes.root}>
            <div className={classes.label}>404</div>
            <Title className={classes.title}>You have found a secret place.</Title>
            <Text color="dimmed" size="lg" align="center" className={classes.description}>
                Unfortunately, this is only a 404 page. You may have mistyped the address, or the page has
                been moved to another URL.
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