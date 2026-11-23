export interface Customer {
  id: string;
  name: string;
  email: string;
}

export interface Payment {
  id: string;
  customerId: string;
  amountCents: number;
  currency: string;
  status: "pending" | "settled" | "failed";
}

export const customers: Customer[] = [
  { id: "cust_1", name: "Ada Lovelace", email: "ada@example.com" },
  { id: "cust_2", name: "Grace Hopper", email: "grace@example.com" },
];

export const payments: Payment[] = [
  { id: "pay_1", customerId: "cust_1", amountCents: 1999, currency: "usd", status: "settled" },
  { id: "pay_2", customerId: "cust_2", amountCents: 500, currency: "usd", status: "pending" },
];
