import {useState} from "react";
import {motion, Variants} from "framer-motion";
import {ActionIcon, Popover, Text, Title} from "@mantine/core";
import {LinkModel, NestedLinkModel} from "@core/routing/models/links";
import {IconInfoSquare} from "@tabler/icons-react";

const findHelpers = (links: LinkModel[]): string[] => {
    for (const link of links) {
        if (link.path === location.pathname && link.helpers) {
            return link.helpers;
        }
        if (link.links) {
            const nestedHelpers = findHelpersInNestedLinks(location.pathname, link.links);
            if (nestedHelpers) {
                return nestedHelpers;
            }
        }
    }
    return [];
};

const findHelpersInNestedLinks = (path: string, nestedLinks: NestedLinkModel[]): string[] => {
    for (const nestedLink of nestedLinks) {
        if (nestedLink.path === path) {
            return nestedLink.helpers!;
        }
    }
    return [];
};

interface Props {
    links: LinkModel[];
}

export const AdminHints = ({links}: Props) => {
    const [clicked, setClicked] = useState(false);

    const helpers = findHelpers(links);

    const handleClick = () => {
        setClicked(true);
    };

    const iconVariants: Variants = {
        initial: {
            scale: 1,
            opacity: 1
        },
        animate: {
            scale: [1, 1.2, 1],
            opacity: [1, 0.6, 1]
        }
    };

    return (
        <Popover width={500} position="bottom" shadow="xl">
            <Popover.Target>
                <motion.div
                    variants={iconVariants}
                    initial="initial"
                    animate={!clicked ? "animate" : "initial"}
                    transition={{
                        loop: Infinity,
                        duration: 0.75,
                        ease: "linear",
                        times: [0, 1],
                        repeatDelay: 2,
                        repeat: Infinity
                    }}
                >
                    <ActionIcon
                        mx={20}
                        size={40}
                        radius={10}
                        color="indigo.5"
                        variant="filled"
                        onClick={handleClick}
                        style={{
                            boxShadow: "1px 2px 5px 0px rgba(51,51,51,0.5)"
                        }}
                    >
                        <IconInfoSquare size={30} color="#fff" stroke={2.5} />
                    </ActionIcon>
                </motion.div>
            </Popover.Target>
            <Popover.Dropdown mt={6}>
                <>
                    <Title
                        p={10}
                        mb={10}
                        bg="indigo.5"
                        size="large"
                        style={{borderRadius: "10px"}}
                    >
                        <Text ml={10} color="white.0">
                            Hints and tips for this page
                        </Text>
                    </Title>

                    {helpers.map((helper, index) => (
                        <Text
                            key={index}
                            py={10}
                            px={20}
                            mt={index === 0 ? 0 : 20}
                            size="sm"
                            style={{
                                borderLeft: "3px solid #6366f1",
                                boxShadow: "1px 2px 5px 0px rgba(51,51,51,0.5)",
                                borderRadius: "5px",
                            }}
                        >
                            {helper}
                        </Text>
                    ))}
                </>
            </Popover.Dropdown>
        </Popover>
    );
};