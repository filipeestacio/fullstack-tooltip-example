import { NextFunction, Request, Response } from "express";
import { User } from "../types/user";

export const fakeAuth = (req: Request, res: Response, next: NextFunction) => {
    req.user = {
        id: "1",
        name: "John Doe",
        email: "john.doe@example.com",
    } as User;
    next();
}