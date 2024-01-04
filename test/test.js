const { exportAllDeclaration } = require("@babel/types");
const { response } = require("express");
const request = require("supertest");
const { app, server } = require("../index");

describe("Users API", () => {
  it("GET /users returns a 200 response", async () => {
    const res = await request(app).get("/users");
    expect(res.status).toBe(200);
  });

  it("GET /users/{userId} returns the user", async () => {
    const user = {
      userId: 1,
      userFirstName: "Alice",
      userLastName: "Smith",
      workLocation: "San Francisco",
      skills: ["Java", "C++"],
    };
    const res = await request(app).get("/users/1");
    expect(res.body).toEqual(user);
  });

  it("PUT /users creates a new user and returns a 200 response", async () => {
    const newUser = {
      userId: 6,
      userFirstName: "John",
      userLastName: "Doe",
      workLocation: "New York",
      skills: ["JavaScript", "Python"],
    };
    const res = await request(app).post("/users").send({ newUser });
    expect(res.status).toBe(200);
  });

  it("DELETE /users/${userId} deletes the user", async () => {
    const users = await request(app).get("/users");
    let index = users.body.slice(-1)[0].userId;

    const res = await request(app).delete("/users/" + index);
    expect(res.status).toEqual(200);

    const resAfterDelete = await request(app).delete("/users/" + index);
    expect(resAfterDelete.status).toEqual(404);
  });

  it("PUT /users/${userId} returns a 200 response and updates the user by id with the data from the object received", async () => {
    const updateUserId = 12;
    const updateUser = {
      userFirstName: "John",
      userLastName: "Doe",
      workLocation: "Toronto",
      skills: ["JavaScript", "Python"],
    };

    const res = await request(app)
      .put(`/users/${updateUserId}`)
      .send(updateUser);

    //Check for 200 response
    expect(res.status).toBe(200);

    //Check that api returns the new workLocation
    const res1 = await request(app).get("/users/12");
    expect(res1.body.workLocation).toBe("Toronto");
  });

  afterAll(async () => {
    await server.close();
  });
});
