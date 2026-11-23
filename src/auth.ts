import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

// Demo-only secret. Never commit a real signing secret - this is a fake value
// for the sandbox repo and is overridable via the JWT_SECRET env var.
const JWT_SECRET = process.env.JWT_SECRET ?? "northwind-demo-secret-not-real";

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const header = req.header("authorization") ?? "";
  const token = header.startsWith("Bearer ") ? header.slice("Bearer ".length) : undefined;

  if (!token) {
    return res.status(401).json({ error: "missing bearer token" });
  }

  try {
    // NOTE: jsonwebtoken <9 lets a caller omit `algorithms`, which is the
    // root cause behind GHSA-qwph-4952-7xr6 (algorithm confusion in verify()).
    // The fix bump to ^9.0.2 requires passing an explicit algorithms allowlist.
    jwt.verify(token, JWT_SECRET);
  } catch {
    return res.status(401).json({ error: "invalid token" });
  }

  next();
}
