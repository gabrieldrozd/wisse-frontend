import {useEnrollPageContext} from "@app.start/context/enrollPageContext";
import {Button} from "@components/Button";
import {Group} from "@mantine/core";
import {IconChevronLeft, IconChevronRight} from "@tabler/icons-react";
import {useCallback} from "react";

interface Props {
    active: number;
    handleStepChange: (nextStep: number) => void;
    onSubmit: () => void;
}

export const EnrollPageButtons = ({active, handleStepChange, onSubmit}: Props) => {
    const {
        isEnrollFormValid: {value: isFormValid},
        testMode,
        isTestCompleted
    } = useEnrollPageContext();

    const backButton = useCallback(() => {
        return (
            <Button
                onClick={() => handleStepChange(active - 1)}
                icon={<IconChevronLeft />}
            >
                Back
            </Button>
        );
    }, [handleStepChange, active]);

    const beginButton = useCallback(() => {
        return (
            <Button
                onClick={() => handleStepChange(active + 1)}
                iconRight={<IconChevronRight />}
            >
                Begin
            </Button>
        );
    }, [handleStepChange, active]);

    const nextButton = useCallback(() => {
        if (active === 2) {
            if ((testMode.value === "info" || testMode.value === "test") && !isTestCompleted.value) {
                return (
                    <Button
                        onClick={() => handleStepChange(active + 1)}
                        iconRight={<IconChevronRight />}
                    >
                        Skip
                    </Button>
                );
            }

            if (testMode.value === "test" && isTestCompleted.value) {
                return (
                    <Button
                        onClick={() => handleStepChange(active + 1)}
                        iconRight={<IconChevronRight />}
                    >
                        Next
                    </Button>
                );
            }
        }

        return (
            <Button
                onClick={() => handleStepChange(active + 1)}
                iconRight={<IconChevronRight />}
                disabled={active === 1 && !isFormValid}
            >
                Next
            </Button>
        );
    }, [handleStepChange, active, isFormValid]);

    const showBackButton = active > 0;
    const showBeginButton = active === 0;
    const showNextButton = active < 3 && active > 0;
    const showSubmitButton = active === 3;

    return (
        <Group position="right" spacing={10}>
            {showBackButton && backButton()}
            {showBeginButton && beginButton()}
            {showNextButton && nextButton()}
            {showSubmitButton && (
                <Button
                    iconRight={<IconChevronRight />}
                    onClick={() => onSubmit()}
                >
                    Submit
                </Button>
            )}
        </Group>
    );
};