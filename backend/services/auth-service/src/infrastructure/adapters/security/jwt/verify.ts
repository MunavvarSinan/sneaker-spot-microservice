import { SecurityError } from "@application/core/api/api-error";
import config from "@shared/config";
import { JwtPayload, verify } from "jsonwebtoken"

interface VerifyTokenInterface {
    verify(token: string, secret: string): Promise<JwtPayload>
    validate: (payload: JwtPayload) => boolean
}

export const VerifyToken: VerifyTokenInterface = {
    verify: async (token: string, secret: string): Promise<JwtPayload> => {
        const payload = verify(token, secret) as JwtPayload;
        VerifyToken.validate(payload);
        return payload;
    },
    validate: (payload: JwtPayload) => {
        if (!payload || !payload.iss || !payload.sub || payload.iss !== config.TOKEN_INFO.issuer) {
            throw new SecurityError('Invalid token');
        }
        return true
    }
}