import { Router } from "express";
import { payments, customers } from "../store";

export const paymentsRouter = Router();

paymentsRouter.get("/payments", (req, res) => {
  const { customerId } = req.query;
  const result = customerId
    ? payments.filter((p) => p.customerId === customerId)
    : payments;
  res.json(result);
});

paymentsRouter.post("/payments", (req, res) => {
  const { customerId, amountCents, currency } = req.body ?? {};

  if (typeof customerId !== "string" || !customers.some((c) => c.id === customerId)) {
    return res.status(400).json({ error: "unknown customerId" });
  }
  if (typeof amountCents !== "number" || amountCents <= 0) {
    return res.status(400).json({ error: "amountCents must be a positive number" });
  }
  if (typeof currency !== "string" || currency.length !== 3) {
    return res.status(400).json({ error: "currency must be a 3-letter code" });
  }

  const payment = {
    id: `pay_${payments.length + 1}`,
    customerId,
    amountCents,
    currency: currency.toLowerCase(),
    status: "pending" as const,
  };
  payments.push(payment);
  res.status(201).json(payment);
});
