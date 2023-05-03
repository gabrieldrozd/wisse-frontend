import {createFormContext} from "@mantine/form";
import {EnrollmentPost} from "@models/enrollment/enrollmentPost";

export const [EnrollmentFormProvider, useEnrollmentFormContext, useEnrollmentForm] = createFormContext<EnrollmentPost>();