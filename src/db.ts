// Minimal stand-in for a real SQL database client, so this demo repo doesn't
// need a native driver. In a real deployment this would be a pg/mysql2/etc.
// connection - the vulnerability below is in how the *query string* is built,
// which is the same whether or not a real driver executes it.
import { customers } from "./store";

export function runQuery(sql: string): unknown[] {
  // Demo-only "driver": just logs the statement a real DB would run.
  console.log(`[fake-db] executing: ${sql}`);
  return customers;
}
