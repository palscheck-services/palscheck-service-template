import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { buildResponse } from "./build-response";
const { errorCB } = buildResponse

export interface AuthenticationRequest extends Request {
    data?: { [key: string]: any }
}

export function generateToken(Payload: object): string {
    const key = process.env.JwtSecrete || "";
    const payload = {
        data: Payload
    }
    const token = jwt.sign(payload, key, { expiresIn: '365d' })
    return token

}

export function validateToken(req: AuthenticationRequest, res: Response, next: NextFunction) {
    const authHeader = req.header("Authorization");
    const key = process.env.JwtSecrete || "";
    if (!authHeader || authHeader === "false") {
        return errorCB({
            statusCode: 401,
            message: 'you are not authorized for this action',
            data: null,
            res
        })
    }
    if (!authHeader.startsWith("Bearer ")) {
        return errorCB({
            statusCode: 401,
            message: 'you are not authorized for this action',
            data: null,
            res
        })
    }
    const jwtToken = authHeader.substring(7);
    const payload: any = jwt.verify(jwtToken, key);
    req.data = payload.data;
    next();
}