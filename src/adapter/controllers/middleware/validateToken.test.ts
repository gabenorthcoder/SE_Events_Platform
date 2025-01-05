import { Request, Response, NextFunction } from "express";
import { validateToken } from "./validateToken";
import { AuthMiddlewareService } from "../../../infrastructure/middleware/authMiddlewareService";

jest.mock("../../../infrastructure/middleware/authMiddlewareService");

describe("validateToken middleware", () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: NextFunction;

    beforeEach(() => {
        req = {
            headers: {}
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        next = jest.fn();
    });

    it("should return 401 if no authorization header is provided", async () => {
        await validateToken(req as Request, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: "Unauthorized: No token provided" });
        expect(next).not.toHaveBeenCalled();
    });

    

    
});