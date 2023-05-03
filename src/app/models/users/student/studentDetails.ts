export interface StudentDetails {
    externalId: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    birthDate: string;
    education: EducationDetails;
    languageLevel: LanguageLevel;
    contact: Contact;
}

export interface EducationDetails {
    school: string;
    grade: string;
}

export interface LanguageLevel {
    key: string;
    name: string;
}

export interface Contact {
    zipCode: string;
    zipCodeCity: string;
    state: string;
    city: string;
    street: string;
    houseNumber: string;
}
