export interface LoginResponse {
    isAuthSuccessful: boolean;
    errorMessage: string;
    token: string;
}
