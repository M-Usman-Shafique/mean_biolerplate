export class ApiResponse<T = Record<string, unknown>> {
    statusCode: number;
    message: string;
    success: boolean;
    data: T;

    constructor(statusCode: number, data: T = {} as T, message = "Success") {
        this.statusCode = statusCode;
        this.message = message;
        this.success = statusCode < 400;
        this.data = data;
    }
}
