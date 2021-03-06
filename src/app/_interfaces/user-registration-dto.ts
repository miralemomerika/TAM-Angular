export interface UserRegistrationDto {
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    password: string,
    confirmPassword: string,
    clientURI: string,
    role: string,
    institution?: string,
    studentType?: string,
}
