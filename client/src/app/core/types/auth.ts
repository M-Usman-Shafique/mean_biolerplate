export interface User {
    _id: string;
    username: string;
    email: string;
    role: "user" | "admin";
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
