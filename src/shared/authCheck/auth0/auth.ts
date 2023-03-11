import { decode } from "jsonwebtoken";
import JwksRsa from "jwks-rsa";

export async function GetSecret(scopedAccessToken: string): Promise<string> {
    const decoded = decode(scopedAccessToken, { complete: true })
    if (!decoded) {
        throw new Error("Invalid token")
    }
    const kid = decoded.header.kid;
    const domain = process.env.DOMAIN
    if (!domain) {
        throw new Error("DOMAIN not defined")
    }
    const publicKeyFromCertificate = (await JwksRsa({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${domain}/.well-known/jwks.json`
    }).getSigningKey(kid)).getPublicKey()


    return publicKeyFromCertificate
}