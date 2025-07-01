export interface User {
    id: string;
    username: string;
    email: string;
    role: "User" | "Admin";
    avatar: string;
}

export interface AuthResponse {
    message: string;
    user: User;
}
