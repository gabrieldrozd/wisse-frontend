import {SimpleGrid} from "@mantine/core";
import {breakpoints} from "@common/constants/breakpoints";
import {LeftSideFeatureCard} from "@components/Start/Home/Features/Cards/LeftSideFeatureCard";
import {RightSideFeatureCard} from "@components/Start/Home/Features/Cards/RightSideFeatureCard";
import {useMediaQuery} from "@mantine/hooks";

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