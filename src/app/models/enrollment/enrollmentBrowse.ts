export interface EnrollmentBase {
    externalId: string;
    enrollmentDate: Date;
    enrollmentStatus: string;
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