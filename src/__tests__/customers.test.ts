import request from "supertest";
import { createApp } from "../app";

describe("GET /customers", () => {
  it("lists customers without emails", async () => {
    const res = await request(createApp()).get("/customers");
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).not.toHaveProperty("email");
  });
});

describe("GET /customers/:id", () => {
  it("returns a known customer", async () => {
    const res = await request(createApp()).get("/customers/cust_1");
    expect(res.status).toBe(200);
    expect(res.body.id).toBe("cust_1");
  });

  it("404s for an unknown customer", async () => {
    const res = await request(createApp()).get("/customers/does_not_exist");
    expect(res.status).toBe(404);
  });
});
