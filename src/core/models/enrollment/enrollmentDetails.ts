export interface EnrollmentDetails {
    externalId:   string;
    enrolledOn:   Date;
    decisionDate: Date;
    status:       string;
    applicant:    ApplicantDetails;
    contact:      ContactDetails;
}

export interface ApplicantDetails {
    firstName:     string;
    lastName:      string;
    birthDate:     Date;
    education:     Education;
    languageLevel: LanguageLevel;
}

export interface Education {
    school: string;
    grade:  string;
}

export interface LanguageLevel {
    key:  string;
    name: string;
}

export interface ContactDetails {
    email:       string;
    phoneNumber: string;
    zipCode:     string;
    zipCodeCity: string;
    state:       string;
    city:        string;
    street:      string;
    houseNumber: string;
}