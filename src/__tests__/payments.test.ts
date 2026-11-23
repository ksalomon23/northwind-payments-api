import jwt from "jsonwebtoken";
import request from "supertest";
import { createApp } from "../app";

const TEST_SECRET = process.env.JWT_SECRET ?? "northwind-demo-secret-not-real";
const authHeader = () => `Bearer ${jwt.sign({ sub: "cust_1" }, TEST_SECRET)}`;

describe("GET /payments", () => {
  it("requires a bearer token", async () => {
    const res = await request(createApp()).get("/payments");
    expect(res.status).toBe(401);
  });

  it("rejects a token signed with a non-allowlisted algorithm", async () => {
    const token = jwt.sign({ sub: "cust_1" }, TEST_SECRET, { algorithm: "HS512" });
    const res = await request(createApp()).get("/payments").set("authorization", `Bearer ${token}`);
    expect(res.status).toBe(401);
  });

  it("lists all payments when authenticated", async () => {
    const res = await request(createApp()).get("/payments").set("authorization", authHeader());
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("filters by customerId", async () => {
    const res = await request(createApp())
      .get("/payments?customerId=cust_1")
      .set("authorization", authHeader());
    expect(res.status).toBe(200);
    expect(res.body.every((p: { customerId: string }) => p.customerId === "cust_1")).toBe(true);
  });
});

describe("POST /payments", () => {
  it("rejects a missing/invalid token", async () => {
    const res = await request(createApp())
      .post("/payments")
      .send({ customerId: "cust_1", amountCents: 2500, currency: "usd" });
    expect(res.status).toBe(401);
  });

  it("creates a payment for a known customer", async () => {
    const res = await request(createApp())
      .post("/payments")
      .set("authorization", authHeader())
      .send({ customerId: "cust_1", amountCents: 2500, currency: "usd" });
    expect(res.status).toBe(201);
    expect(res.body.status).toBe("pending");
  });

  it("rejects an unknown customer", async () => {
    const res = await request(createApp())
      .post("/payments")
      .set("authorization", authHeader())
      .send({ customerId: "nope", amountCents: 2500, currency: "usd" });
    expect(res.status).toBe(400);
  });

  it("rejects a non-positive amount", async () => {
    const res = await request(createApp())
      .post("/payments")
      .set("authorization", authHeader())
      .send({ customerId: "cust_1", amountCents: -5, currency: "usd" });
    expect(res.status).toBe(400);
  });
});
