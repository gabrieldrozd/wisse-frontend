export interface Envelope {
    statusCode: number;
    isSuccess: boolean;
    hasErrors: boolean;
    errors: EnvelopeError[];
}

export interface DataEnvelope<T> {
    statusCode: number;
    isSuccess: boolean;
    hasErrors: boolean;
    errors: EnvelopeError[];
    data: T;
}

export interface EnvelopeError {
    code: string;
    message: string;
}