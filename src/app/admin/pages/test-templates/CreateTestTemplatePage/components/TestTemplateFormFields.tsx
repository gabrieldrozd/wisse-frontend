import {useTestTemplateFormContext} from "@app.admin/context/testTemplateFormContext";
import {Flex, Select, Textarea, TextInput} from "@mantine/core";
import {levels} from "@const/education";

export const TestTemplateFormFields = () => {
    const form = useTestTemplateFormContext();

    return (
        <>
            <Flex direction={{base: "column", md: "row"}} gap={20} mb={20}>
                <TextInput
                    w={{base: "100%", md: "80%"}}
                    size="md"
                    label="Test template name"
                    placeholder="Enter test template name"
                    required
                    {...form.getInputProps("name")}
                />
                <Select
                    w={{base: "100%", md: "20%"}}
                    size="md"
                    data={levels}
                    label="Level"
                    placeholder="Select test template level"
                    required
                    {...form.getInputProps("languageLevel")}
                />
            </Flex>
            <Textarea
                mb={20}
                size="md"
                minRows={5}
                label="Test template description"
                placeholder="Enter test template description"
                required
                {...form.getInputProps("description")}
            />
        </>
    );
};