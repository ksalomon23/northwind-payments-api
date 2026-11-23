import express from "express";
import { healthRouter } from "./routes/health";
import { customersRouter } from "./routes/customers";
import { paymentsRouter } from "./routes/payments";
import { requireAuth } from "./auth";
import { exportRouter } from "./routes/export";

export function createApp() {
  const app = express();
  app.use(express.json());

  app.use(healthRouter);
  app.use(customersRouter);
  app.use(exportRouter);
  app.use("/payments", requireAuth);
  app.use(paymentsRouter);

  app.use((_req, res) => {
    res.status(404).json({ error: "not found" });
  });

  return app;
}
