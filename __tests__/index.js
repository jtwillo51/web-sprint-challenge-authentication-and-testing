const superTest = require("supertest");
const server = require("../index");
const db = require("../database/dbConfig");

afterAll(async () => {
  await db.destroy();
});

describe("users tests", () => {
  test("working", async () => {
    const res = await superTest(server).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.headers["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.body.message).toBe("All good!");
  });

  //change username to pass test
  //   test("register", async () => {
  //     const res = await superTest(server)
  //       .post("/api/auth/register")
  //       .send({ username: "jamjarr5", password: "1234" });
  //     expect(res.statusCode).toBe(201);
  //     expect(res.headers["content-type"]).toBe("application/json; charset=utf-8");
  //   });

  test("POST /login", async () => {
    const res = await superTest(server)
      .post("/api/auth/login")
      .send({ username: "jamjarr5", password: "1234" });
    expect(res.statusCode).toBe(200);
    expect(res.headers["content-type"]).toBe("application/json; charset=utf-8");
  });

  test("GET /jokes", async () => {
    const res = await superTest(server).get("/api/jokes");
    expect(res.statusCode).toBe(200);
    expect(res.headers["content-type"]).toBe("application/json; charset=utf-8");
  });
});
