import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { app } from "../../src/app";
import resetDb from "../resetDb";
import request from "supertest";

describe("user authenticate e2e", () => {
  beforeEach(async () => {
    await app.ready();
    await resetDb();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to authenticate", async () => {
    await request(app.server).post("/users/create").send({
      user_name: "Jhon Doe",
      email: "user@email.com",
      password: "123456",
    });

    const response = await request(app.server).post("/users/login").send({
      email: "user@email.com",
      password: "123456",
    });

    expect(response.statusCode).toEqual(200);
  });
});
