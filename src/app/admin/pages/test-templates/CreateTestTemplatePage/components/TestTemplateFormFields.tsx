import {ErrorText} from "@components/ErrorText";
import {Label} from "@components/Label";
import {levels} from "@const/education";
import {Flex, Stack} from "@mantine/core";
import type {ITestTemplatePostFormModel} from "@models/education/testTemplate";
import {Dropdown, Input, Textarea} from "@nextui-org/react";
import {memo} from "react";
import type {Control, FieldErrors} from "react-hook-form";
import {Controller} from "react-hook-form";

interface Props {
    formControl: Control<ITestTemplatePostFormModel>;
    testTemplateErrors: FieldErrors<ITestTemplatePostFormModel>;
    setValue: (name: string, value: any) => void;
    languageLevel: string;
}

export const TestTemplateFormFields = memo(function TestTemplateFormFields({
    formControl, testTemplateErrors, setValue, languageLevel
}: Props) {
    return (
        <>
            <Flex direction={{base: "column", md: "row"}} gap={20} mb={20}>
                <Stack w={{base: "100%", md: "80%"}} spacing={0}>
                    <Label text="Test template name" />
                    <Controller
                        name="name"
                        control={formControl}
                        defaultValue=""
                        render={({field}) => (
                            <Input
                                size="md"
                                aria-label="Test template name"
                                placeholder="Enter test template name"
                                required
                                {...field}
                                status={testTemplateErrors?.name ? "error" : undefined}
                            />
                        )}
                    />
                    {testTemplateErrors?.name && (
                        <ErrorText text={testTemplateErrors.name.message as string} />
                    )}
                </Stack>

                <Stack w={{base: "100%", md: "20%"}} spacing={0}>
                    <Label text="Test template level" />
                    <Dropdown>
                        <Dropdown.Button shadow color="primary">
                            {languageLevel || "Select test template level"}
                        </Dropdown.Button>
                        <Dropdown.Menu
                            color="primary"
                            selectionMode="single"
                            aria-label="Test template level"
                            onAction={(value) => setValue("languageLevel", value)}
                        >
                            {levels.map((level) => (
                                <Dropdown.Item key={level.value}>
                                    {level.value}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                    {testTemplateErrors?.languageLevel && (
                        <ErrorText text={testTemplateErrors.languageLevel.message as string} />
                    )}
                </Stack>

            </Flex>
            <Stack spacing={0}>
                <Label text="Test template description" />
                <Controller
                    name="description"
                    control={formControl}
                    defaultValue=""
                    render={({field}) => (
                        <Textarea
                            size="md"
                            minRows={10}
                            aria-label="Test template description"
                            placeholder="Enter test template description"
                            required
                            {...field}
                            status={testTemplateErrors?.description ? "error" : undefined}
                        />
                    )}
                />
                {testTemplateErrors?.description && (
                    <ErrorText text={testTemplateErrors.description.message as string} />
                )}
            </Stack>
        </>
    );
}, (prevProps, nextProps) => {
    return (
        prevProps.formControl === nextProps.formControl &&
        prevProps.testTemplateErrors === nextProps.testTemplateErrors &&
        prevProps.setValue === nextProps.setValue &&
        prevProps.languageLevel === nextProps.languageLevel
    );
});