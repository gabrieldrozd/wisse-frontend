import {SimpleGrid} from "@mantine/core";
import {useMediaQuery} from "@mantine/hooks";
import {breakpoints} from "@const/breakpoints";
import {LeftSideFeatureCard} from "@app.start/pages/HomePage/components/cards/LeftSideFeatureCard";
import {RightSideFeatureCard} from "@app.start/pages/HomePage/components/cards/RightSideFeatureCard";

const features = [
    {
        id: 1,
        title: "Education",
        description: "Manage your education and your students",
    },
    {
        id: 2,
        title: "Users",
        description: "Manage users and their permissions",
    },
    {
        id: 3,
        title: "Payments",
        description: "Manage payments and subscriptions",
    },
    {
        id: 4,
        title: "Lessons",
        description: "Manage lessons and their content",
    }
];

export function FeatureCards() {
    const mediaMatch = useMediaQuery(`(max-width: ${breakpoints.md})`);

    return (
        <SimpleGrid
            p={20}
            cols={2}
            spacing="xl"
            breakpoints={[
                {maxWidth: breakpoints.md, cols: 1, spacing: "md"},
            ]}
        >
            {features.map((feature) => {
                if (mediaMatch) {
                    return <LeftSideFeatureCard key={feature.id} feature={feature} />;
                }

                return feature.id % 2 === 0
                    ? <RightSideFeatureCard key={feature.id} feature={feature} />
                    : <LeftSideFeatureCard key={feature.id} feature={feature} />;
            })}
        </SimpleGrid>

    );
}