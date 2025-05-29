import { Product } from "./product";

export type SuccessResponse<T> = {
    data: T;
    pagination?: {
        page: number;
        limit: number;
    };
}

export type ErrorResponse = {
    error: string;
}

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;