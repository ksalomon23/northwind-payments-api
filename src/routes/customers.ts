import { Router } from "express";
import { customers } from "../store";

export const customersRouter = Router();

customersRouter.get("/customers", (_req, res) => {
  res.json(customers.map(({ id, name }) => ({ id, name })));
});

customersRouter.get("/customers/:id", (req, res) => {
  const customer = customers.find((c) => c.id === req.params.id);
  if (!customer) {
    return res.status(404).json({ error: "customer not found" });
  }
  res.json(customer);
});
