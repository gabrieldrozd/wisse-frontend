import {Button, Container, Title, UnstyledButton} from "@mantine/core";
import {FeatureCards} from "@components/Start/Home/Features/FeatureCards";
import classes from "../styles/FeaturesPreview.module.scss";
import {Link} from "react-router-dom";

export const FeaturesPreview = () => {
    return (
        <Container size="xl" className={classes.rootContainer}>
            <Title order={1}>
                Features
            </Title>

            <FeatureCards />

            <Button
                size="lg"
                color="indigo.5"
                variant="filled"
                component={Link}
                to="/features"
            >
                And much more...
            </Button>
        </Container>
    );
};