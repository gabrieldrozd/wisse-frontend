import {useState} from "react";
import {useLocation} from "react-router-dom";
import {motion, Variants} from "framer-motion";
import {IconInfoSquare} from "@tabler/icons-react";
import {ActionIcon, Popover, Text, Title} from "@mantine/core";
import {useAdminHints} from "@app.admin/hooks/useAdminHints";

export const AdminHints = () => {
    const location = useLocation();
    const hints = useAdminHints({currentPath: location.pathname});
    const [clicked, setClicked] = useState(false);

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

                    {hints.map((helper, index) => (
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