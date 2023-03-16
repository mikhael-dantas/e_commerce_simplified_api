import { verify } from "jsonwebtoken";
import { ICheckAccessTokenUseCase } from "./interface";

export class CheckAccessTokenUseCase implements ICheckAccessTokenUseCase {
    async execute({
        token,
        secret,
        algorithm = "RS256",
        permissions
    }:{
        token: string,
        secret: string,
        algorithm?: "RS256" | "HS256",
        permissions?: string[]
    }) {

        secret = secret.replace(/\\n/g, '\n');

        const decodedToken = verify(token, 
            secret,
            {
            algorithms: [
                process.env.NODE_ENV === "test" ? "HS256" : algorithm
            ]});
        if (typeof decodedToken === "string") {
            throw new Error("Invalid token");
        }
        if (permissions && permissions.length > 0) {
            if (!decodedToken.permissions) {
                throw new Error("Invalid token permissions");
            }
            const permissionsValidation = permissions.map(permission => {
                return decodedToken.permissions.includes(permission);
            });

            if (permissionsValidation.includes(false)) {
                throw new Error(`Invalid token permissions`);
            }
        }
        return decodedToken;
    }
}