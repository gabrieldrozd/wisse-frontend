export interface EnrollmentPost {
    applicant: ApplicantPost;
    contact: ContactPost;
    testResult?: TestResultPost;
}

export interface ApplicantPost {
    firstName: string;
    lastName: string;
    birthDate: Date;
    school: string;
    grade: string;
    levelKey: string;
}

export interface ContactPost {
    email: string;
    phoneNumber: string;
    zipCode: string;
    zipCodeCity: string;
    state: string;
    city: string;
    street: string;
    houseNumber: string;
}

export interface TestResultPost {
    calculatedLevel: string;
    correctAnswers: number;
    incorrectAnswers: number;
    totalAnswers: number;
    percentage: number;
}