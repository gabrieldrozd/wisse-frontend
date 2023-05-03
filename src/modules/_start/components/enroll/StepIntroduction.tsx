import {Col, Flex, Grid, Mark, Text, Timeline} from "@mantine/core";
import {
    IconChevronsRight,
    IconClockHour4,
    IconFileCheck,
    IconFileText,
    IconKeyboard,
    IconSearch
} from "@tabler/icons-react";

export const StepIntroduction = () => {
    return (
        <Grid>
            <Col xs={12} md={9} p={20}>
                <Grid gutter="xs">
                    <Col xs={12}>
                        <Text size="xl" weight={500} mb={15}>
                            About the Enrollment Process
                        </Text>
                        <Text size={14}>
                            Our enrollment process is designed to be simple and efficient, ensuring a smooth experience for you.
                            We encourage you to read the details provided below to better understand the process and the language levels we offer.
                            If you have any questions or concerns, please feel free to contact us.
                        </Text>
                    </Col>

                    <Col xs={12} md={7}>
                        <Text size="xl" weight={500} mb={15}>
                            Language Levels
                        </Text>

                        <Text size={14} mb={10}>
                            <Mark color="indigo.2" fw={500} p={2}>A0 - Beginner</Mark>
                            : No knowledge of the language
                        </Text>
                        <Text size={14} mb={10}>
                            <Mark color="indigo.2" fw={500} p={2}>A1 - Elementary</Mark>
                            : Basic ability to communicate and exchange information
                        </Text>
                        <Text size={14} mb={10}>
                            <Mark color="indigo.2" fw={500} p={2}>A2 - Pre-Intermediate</Mark>
                            : Can understand and use familiar everyday expressions and simple phrases
                        </Text>
                        <Text size={14} mb={10}>
                            <Mark color="indigo.2" fw={500} p={2}>B1 - Intermediate</Mark>
                            : Can handle most situations likely to arise while traveling in an area where the language is spoken
                        </Text>
                        <Text size={14} mb={10}>
                            <Mark color="indigo.2" fw={500} p={2}>B2 - Upper Intermediate</Mark>
                            : Can interact with a degree of fluency and spontaneity without strain for either party
                        </Text>
                        <Text size={14} mb={10}>
                            <Mark color="indigo.2" fw={500} p={2}>C1 - Advanced</Mark>
                            : Can understand a wide range of demanding, longer texts and recognize implicit meaning
                        </Text>
                        <Text size={14} mb={10}>
                            <Mark color="indigo.2" fw={500} p={2}>C2 - Mastery</Mark>
                            : Can understand virtually everything heard or read with ease
                        </Text>
                    </Col>

                    <Col xs={12} md={5}>
                        <Flex direction="column">
                            <Text size="xl" weight={500} mb={15}>
                                Course Groups
                            </Text>
                            <Text size={14} mb={15}>
                                <Mark color="indigo.2" fw={500} p={2}>Individual Courses</Mark>
                                : One-on-one lessons tailored to your specific needs and goals
                            </Text>

                            <Text size={14}>
                                <Mark color="indigo.2" fw={500} p={2}>Group Courses</Mark>
                                : Interactive classes with other students, providing a collaborative learning environment
                                <Text size={12} color="dimmed" fs="italic">
                                    *Group courses have a maximum of 8 students per class.
                                </Text>
                            </Text>
                        </Flex>

                        <Flex direction="column">
                            <Text size="xl" weight={500} mt={30} mb={15}>
                                Activities during English Classes
                            </Text>
                            <Text size={14}>
                                Our classes incorporate a diverse range of activities, such as listening exercises,
                                reading comprehension tasks, engaging discussions, role-playing scenarios, and interactive games.
                                This ensures a dynamic, immersive learning experience that caters to various learning styles and preferences.
                            </Text>
                        </Flex>
                    </Col>
                </Grid>
            </Col>

            <Col xs={12} md={3} p={20}>
                <Text size="xl" weight={500} my={20}>
                    Enrollment Process in detail
                </Text>
                <Timeline mt={30}>
                    <Timeline.Item
                        pb={5}
                        title="Get to know our offer"
                        bullet={<IconFileText size={25} />}
                        bulletSize={40}
                    >
                        <Text size={14}>
                            Get to know our offer
                        </Text>
                    </Timeline.Item>

                    <Timeline.Item
                        pb={5}
                        title="Fill in the enrollment form"
                        bullet={<IconKeyboard size={25} />}
                        bulletSize={40}
                    >
                        <Text size={14}>
                            Fill in the enrollment form
                        </Text>
                    </Timeline.Item>

                    <Timeline.Item
                        pb={5}
                        title="Check correctness of the data"
                        bullet={<IconSearch size={25} />}
                        bulletSize={40}
                    >
                        <Text size={14}>
                            Check correctness of the data
                        </Text>
                    </Timeline.Item>

                    <Timeline.Item
                        pb={5}
                        title="Wait for our verification contact"
                        bullet={<IconClockHour4 size={25} />}
                        bulletSize={40}
                    >
                        <Text size={14}>
                            Wait for our verification contact
                        </Text>
                    </Timeline.Item>

                    <Timeline.Item
                        pb={5}
                        title="Our response and decision"
                        bullet={<IconFileCheck size={25} />}
                        bulletSize={40}
                    >
                        <Text size={14}>
                            Our response and decision
                        </Text>
                    </Timeline.Item>

                    <Timeline.Item
                        pb={5}
                        title="Start your journey"
                        bullet={<IconChevronsRight size={25} />}
                        bulletSize={40}
                    >
                        <Text size={14}>
                            Start your journey
                        </Text>
                    </Timeline.Item>
                </Timeline>
            </Col>
        </Grid>
    );
};