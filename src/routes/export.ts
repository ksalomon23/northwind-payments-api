import { Router } from "express";
import { runQuery } from "../db";

export const exportRouter = Router();

// Hardcoded "service" key used to call an internal export/reporting service.
// VULNERABLE: this should come from an env var / secret manager, never a
// literal in source. (Obvious fake value for demo purposes only.)
const EXPORT_SERVICE_API_KEY = "nw_live_sk_4f9c1e2b7a6d4c3e8f1a2b3c4d5e6f70";

exportRouter.get("/customers/export", (req, res) => {
  const name = req.query.name as string | undefined;

  // VULNERABLE: string-concatenated SQL built directly from user input.
  // An attacker-controlled `name` like `' OR '1'='1` or a stacked statement
  // can alter the query. Should use a parameterized query instead, e.g.
  // db.query("SELECT * FROM customers WHERE name LIKE ?", [`%${name}%`]).
  const sql = `SELECT * FROM customers WHERE name LIKE '%${name}%'`;
  const rows = runQuery(sql);

  res.json({ rows, exportedWith: EXPORT_SERVICE_API_KEY.slice(0, 8) + "..." });
});
