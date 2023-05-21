import {createFormContext} from "@mantine/form";
import {ITestTemplatePostFormModel} from "@models/education/test-template/testTemplate";

export const [TestTemplateFormProvider, useTestTemplateFormContext, useTestTemplateForm] = createFormContext<ITestTemplatePostFormModel>();