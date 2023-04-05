import {
    Box,
    Button,
    Card,
    Col, Container,
    Grid,
    Group,
    Image,
    Mark,
    SimpleGrid,
    Text,
    ThemeIcon,
    Title
} from "@mantine/core";
import image from "@assets/start/classroom.svg";
import {IconAppsFilled, IconClockCancel, IconPointer,} from "@tabler/icons-react";
import classes from "./styles/HeroWelcome.module.scss";
import {breakpoints} from "@common/constants/breakpoints";

const features = [
    {
        icon: IconAppsFilled,
        title: "Fully functional",
        description: "Packed with thousands of features",
    },
    {
        icon: IconClockCancel,
        title: "Time saving",
        description: "Nothing is more important than time",
    },
    {
        icon: IconPointer,
        title: "Easy to use",
        description: "From the youngest to the oldest",
    },
];

export const HeroWelcome = () => {
    const items = features.map((feature) => (
        <Card key={feature.title} shadow="md" radius="1.5rem" ta="center">
            <ThemeIcon
                size={40}
                radius="md"
                variant="filled"
                color="#6166f1"
            >
                <feature.icon size={30} stroke={1.5} />
            </ThemeIcon>
            <Text mt="sm" fw={500}>
                {feature.title}
            </Text>
            <Text c="dimmed" fz="sm">
                {feature.description}
            </Text>
        </Card>
    ));

    return (
        <Container size="xl" className={classes.rootContainer}>
            <Grid>
                <Col xs={12} md={6}>
                    <Box className={classes.imageContainer}>
                        <Image className={classes.image} src={image} />
                    </Box>
                </Col>

                <Col xs={12} md={6} className={classes.contentContainer}>
                    <Title order={1}>
                        <Mark className={classes.wisseMarker}>Wisse</Mark> cool school tool
                    </Title>

                    <Text className={classes.initDescription}>
                        Fully functional school management and educational system, with thousands of time saving features,
                        to use by Administrators, Office workers, Teachers and Students.
                    </Text>

                    <SimpleGrid
                        className={classes.simpleGrid}
                    >
                        {items}
                    </SimpleGrid>
                </Col>
            </Grid>
        </Container>
    );
};