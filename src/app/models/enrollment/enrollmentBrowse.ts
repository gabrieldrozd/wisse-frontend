export interface EnrollmentBase {
    externalId: string;
    enrolledOn: Date;
    decisionDate: Date;
    status: EnrollmentsStatus;
    applicant: ApplicantBase;
    contact: ContactBase;
}

export interface ApplicantBase {
    firstName: string;
    lastName: string;
    birthDate: Date;
}

export interface ContactBase {
    email: string;
    phoneNumber: string;
}

export type EnrollmentsStatus = "Pending" | "Approved" | "Rejected";