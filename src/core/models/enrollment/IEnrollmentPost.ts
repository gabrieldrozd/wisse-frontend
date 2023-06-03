// IEnrollmentPostFormModel
export interface IEnrollmentPostFormModel {
    applicant: IApplicantPostFormModel;
    contact: IContactPostFormModel;
    testResult?: ITestResultPostFormModel;
}

export interface IApplicantPostFormModel {
    firstName: string;
    lastName: string;
    birthDate: string;
    school: string;
    grade: string;
    levelKey: string;
}

export interface IContactPostFormModel {
    email: string;
    phoneNumber: string;
    zipCode: string;
    zipCodeCity: string;
    state: string;
    city: string;
    street: string;
    houseNumber: string;
}

export interface ITestResultPostFormModel {
    calculatedLevel: string;
    correctAnswers: number;
    incorrectAnswers: number;
    totalAnswers: number;
    percentage: number;
}

// IEnrollmentPost
export interface IEnrollmentPost {
    applicant: IApplicantPost;
    contact: IContactPost;
    testResult?: ITestResultPost;
}

export interface IApplicantPost {
    firstName: string;
    lastName: string;
    birthDate: Date;
    school: string;
    grade: string;
    levelKey: string;
}

export interface IContactPost {
    email: string;
    phoneNumber: string;
    zipCode: string;
    zipCodeCity: string;
    state: string;
    city: string;
    street: string;
    houseNumber: string;
}

export interface ITestResultPost {
    calculatedLevel: string;
    correctAnswers: number;
    incorrectAnswers: number;
    totalAnswers: number;
    percentage: number;
}