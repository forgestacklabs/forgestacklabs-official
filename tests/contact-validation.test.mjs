import test from "node:test";
import assert from "node:assert/strict";
import { validateContactPayload } from "../lib/contact-validation.ts";

const base = { name: "Test User", email: "TEST@example.com", organization: "Example Co", message: "A local test enquiry" };
test("accepts a product enquiry and preserves product context", () => { const result = validateContactPayload({ ...base, source: "Product Demo Request", product: "Fuel OS" }); assert.equal(result.data?.source, "Product Demo Request"); assert.equal(result.data?.product, "Fuel OS"); assert.equal(result.data?.email, "test@example.com"); });
test("accepts a short project enquiry with optional planning fields", () => { const result = validateContactPayload({ ...base, source: "Custom Architecture Brief", targetTimeline: "", estimatedBudgetRange: "" }); assert.equal(result.data?.source, "Custom Architecture Brief"); });
test("rejects missing fields, invalid email, and unknown fields", () => { assert.ok("error" in validateContactPayload({ source: "Product Demo Request" })); assert.ok("error" in validateContactPayload({ ...base, email: "bad", source: "Product Demo Request" })); assert.ok("error" in validateContactPayload({ ...base, source: "Product Demo Request", secret: "no" })); });
