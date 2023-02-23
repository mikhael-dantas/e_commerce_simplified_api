import { verify } from "jsonwebtoken";
import { ICheckAccessTokenUseCase } from "./interface";

export class CheckAccessTokenUseCase implements ICheckAccessTokenUseCase {
    async execute({
        token,
        secret,
    }:{
        token: string,
        secret: string
    }) {
        const decodedToken = verify(token, secret);
        if (typeof decodedToken === "string") {
            throw new Error("Invalid token");
        }
        return decodedToken;
    }
}