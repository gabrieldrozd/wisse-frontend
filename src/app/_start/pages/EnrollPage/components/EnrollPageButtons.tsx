import {Button} from "@components/Button";
import {IconChevronLeft, IconChevronRight} from "@tabler/icons-react";
import {useCallback} from "react";
import {Group} from "@mantine/core";

interface Props {
    active: number;
    enrollmentForm: any;
    isFormValid: boolean;
    handleStepChange: (nextStep: number) => void;
    handleSubmit: (values: any) => void;
}

export const EnrollPageButtons = ({active, enrollmentForm, isFormValid, handleStepChange, handleSubmit}: Props) => {
    const backButton = useCallback(() => {
        return (
            <Button
                onClick={() => handleStepChange(active - 1)}
                icon={<IconChevronLeft />}
                children={"Back"}
            />
        );
    }, [handleStepChange, active]);

    const beginButton = useCallback(() => {
        return (
            <Button
                onClick={() => handleStepChange(active + 1)}
                iconRight={<IconChevronRight />}
                children={"Begin"}
            />
        );
    }, [handleStepChange, active]);

    const nextButton = useCallback(() => {
        return (
            <Button
                onClick={() => handleStepChange(active + 1)}
                iconRight={<IconChevronRight />}
                disabled={!isFormValid}
                children={active === 2 ? "Skip" : "Next"}
            />
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
                    onClick={() => handleSubmit(enrollmentForm.values)}
                >
                    Submit
                </Button>
            )}
        </Group>
    );
};