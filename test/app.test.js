const request = require("supertest");
const { createApp } = require("../src/app");

describe("POST /average", () => {
  let app;

  beforeEach(() => {
    app = createApp();
  });

  test("accepts a number and returns average and count", async () => {
    const response = await request(app)
      .post("/average")
      .send({ number: 10 });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ average: 10, count: 1 });
  });

  test("returns the running average across requests", async () => {
    await request(app).post("/average").send({ number: 10 });
    const second = await request(app).post("/average").send({ number: 20 });
    const third = await request(app).post("/average").send({ number: 30 });

    expect(second.body).toEqual({ average: 15, count: 2 });
    expect(third.body).toEqual({ average: 20, count: 3 });
  });

  test.each([
    ["a string", { number: "hello" }],
    ["a missing number", {}],
    ["null", { number: null }],
    ["an array", { number: [1, 2] }]
  ])("rejects %s", async (_description, body) => {
    const response = await request(app).post("/average").send(body);

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Invalid input");
  });

  test("returns JSON error for malformed JSON", async () => {
    const response = await request(app)
      .post("/average")
      .set("Content-Type", "application/json")
      .send('{"number":');

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Invalid JSON");
  });
});
