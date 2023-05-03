import {Button, Container, Title} from "@mantine/core";
import {FeatureCards} from "@modules.start/components/home/features/FeatureCards";
import classes from "@modules.start/components/home/styles/FeaturesPreview.module.scss";
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