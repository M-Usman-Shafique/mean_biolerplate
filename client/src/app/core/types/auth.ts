export interface User {
    id: string;
    username: string;
    email: string;
    role: "User" | "Admin";
    avatar: string;
}

export interface AuthResponse {
    statusCode: number;
    message: string;
    success: boolean;
    data: {
        user: User;
        accessToken: string;
        refreshToken: string;
    };
}
