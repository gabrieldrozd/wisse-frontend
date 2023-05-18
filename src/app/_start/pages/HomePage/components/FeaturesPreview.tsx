import {Container, Title} from "@mantine/core";
import {FeatureCards} from "@app.start/pages/HomePage/components/FeatureCards";
import classes from "./styles/FeaturesPreview.module.scss";
import {Button} from "@components/Button";

export const FeaturesPreview = () => {
    return (
        <Container size="xl" className={classes.rootContainer}>
            <Title order={1}>
                Features
            </Title>

            <FeatureCards />

            <Button
                size="lg"
                color="primary"
                to="/features"
                style={{width: "30rem"}}
            >
                And much more...
            </Button>
        </Container>
    );
};