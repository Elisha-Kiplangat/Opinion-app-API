
import { Context, Next } from "hono";
import { verify } from "hono/jwt";

export const verifyToken = async (token: string, secret: string) => {
    try {
        const decoded = await verify(token as string, secret)
        return decoded;
    } catch (error: any) {
        return error
    }
}

export const authMiddleware = async (c: Context, next: Next, requiredRoles: string[]) => {
    const token = c.req.header("Authorization");

    if (!token) return c.json({err: "Token not provided"}, 401);

    const decoded = await verifyToken(token, process.env.JWT_SECRET as string);

    if (!decoded) return c. json({error: "Invalid token"}, 401);

    // if (decoded.role !== requiredRoles) return c.json({error: "Unauthorized"}, 401);

    if (!requiredRoles.includes(decoded.role)) {
        return c.json({ error: "Unauthorized" }, 403);
    }

    return next();
};

export const adminPartnerRoleAuth = async (c: Context, next: Next) => {
    return await authMiddleware(c, next, ["admin", "partner", "adminPartner"]);
};

export const adminUserRoleAuth = async (c: Context, next: Next) => {
    return await authMiddleware(c, next, ["admin", "user", "adminUser"]);
};
export const allAuthMiddleware = async (c: Context, next: Next, requiredRole: string) => {
    const token = c.req.header("Authorization");

    if (!token) return c.json({ error: "Token not provided" }, 401);

    const decoded = await verifyToken(token, process.env.JWT_SECRET as string);

    if (!decoded) return c.json({ error: "Invalid token" }, 401);

    return next();
}

export const adminRoleAuth = async (c: Context, next: Next) => await authMiddleware(c, next, ["admin"])
export const partnerRoleAuth = async (c: Context, next: Next) => await authMiddleware(c, next, ["partner"])
export const userRoleAuth = async (c: Context, next: Next) => await authMiddleware(c, next, ["user"])
export const allRoleAuth = async (c: Context, next: Next) => await allAuthMiddleware(c, next, "all")
