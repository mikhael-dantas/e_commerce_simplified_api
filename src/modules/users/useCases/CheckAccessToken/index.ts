import { verify } from "jsonwebtoken";
import { ICheckAccessTokenUseCase } from "./interface";

export class CheckAccessTokenUseCase implements ICheckAccessTokenUseCase {
    async execute({
        token,
        secret,
        algorithm = "RS256"
    }:{
        token: string,
        secret: string,
        algorithm?: "RS256" | "HS256"
    }) {
        const decodedToken = verify(token, secret, {algorithms: [algorithm]});
        if (typeof decodedToken === "string") {
            throw new Error("Invalid token");
        }
        return decodedToken;
    }
}