import {Card, Center, Col, Flex, Grid, Group, Image, Text} from "@mantine/core";
import {Carousel} from "@mantine/carousel";
import {IconChevronLeft, IconChevronRight} from "@tabler/icons-react";

const images = [
    "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
    "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
    "https://images.unsplash.com/photo-1605774337664-7a846e9cdf17?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
    "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
    "https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
];

export interface RightSideFeatureCardProps {
    feature: {
        id: number;
        title: string;
        description: string;
    };
}

export const RightSideFeatureCard = ({feature}: RightSideFeatureCardProps) => {
    const slides = images.map((image) => (
        <Carousel.Slide key={image}>
            <Image src={image} height={300} />
        </Carousel.Slide>
    ));

    return (
        <Card radius="xl" withBorder shadow="md">
            <Card.Section>
                <Grid gutter="lg">
                    <Col md={5} p={20}>
                        <Center h="100%">
                            <Flex
                                direction="column"
                            >
                                <Group position="center" mt="lg">
                                    <Text fw={500} fz="lg">
                                        {feature.title}
                                    </Text>
                                </Group>

                                <Text fz="sm" c="dimmed" mt="lg">
                                    {feature.description}
                                </Text>
                            </Flex>
                        </Center>
                    </Col>
                    <Col md={7} p={0}>
                        <Carousel
                            withIndicators
                            loop
                            nextControlIcon={<IconChevronRight />}
                            previousControlIcon={<IconChevronLeft />}
                            styles={{
                                indicator: {
                                    width: 10,
                                    height: 10,
                                    borderRadius: 10,
                                    backgroundColor: "#6166f1",
                                    active: {
                                        backgroundColor: "blue",
                                    }
                                },
                                control: {
                                    width: 40,
                                    height: 40,
                                    backgroundColor: "#6166f1",
                                    color: "white"
                                }
                            }}
                        >
                            {slides}
                        </Carousel>
                    </Col>
                </Grid>
            </Card.Section>
        </Card>
    );
};