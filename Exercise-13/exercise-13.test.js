const request = require("supertest");
const app = require("./exercise-13");

test("GET /", async () => {
    const response = await request(app)
        .get("/")
        .expect(200)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/);

    expect(response.body).toEqual({ data: "This is data" });
});
