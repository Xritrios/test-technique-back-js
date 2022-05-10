import { bootstrapApp } from "../app";
import request from "supertest";
import { Express } from "express";
import { todoModel } from "../models";

let app: Express;
const PORT = 4000;

describe("REST API TESTS", () => {
  beforeAll(async () => {
    app = await bootstrapApp(PORT);
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`);
    });
  });

  describe("GET /todos", () => {
    it("should get all todos", async () => {
      const response = await request(app).get("/todos").expect(200);
      expect(response).toHaveProperty("body");
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("todos");
      const { todos } = response.body;
      expect(todos).toBeInstanceOf(Array);
    });
  });

  describe("POST /todos", () => {
    it("should create a new todo", async () => {
      const validTodo = {
        title: "valid title",
        description: "valid description",
        status: "pending",
      };
      const response = await request(app)
        .post("/todos")
        .send({ todo: validTodo })
        .expect(200);
      expect(response).toHaveProperty("body");
      expect(response.body).toHaveProperty("todo");
      const { todo } = response.body;
      expect(todo.title).toBe(validTodo.title);
      expect(todo.description).toBe(validTodo.description);
      expect(todo.status).toBe(validTodo.status);
    });

    it("should not create a todo when the title is shorter than 8 characters", async () => {
      const invalidTodo = {
        title: "short",
        description: "test description",
        status: "pending",
      };
      const response = await request(app)
        .post("/todos")
        .send({ todo: invalidTodo })
        .expect(490);

      const { error } = response.body;
      expect(error).toBe(
        "Path `title` (`" +
          invalidTodo.title +
          "`) is shorter than the minimum allowed length (8)."
      );
    });
  });

  describe("PUT /todos/edit/:id", () => {
    it("should update the todo given a valid id", async () => {
      const todos = await todoModel.find();
      const firstTodoItem = todos[0];
      var hexId = firstTodoItem._id.toHexString();
      const todo = {
        title: "modified title",
        description: "modified description",
        status: "pending",
      };
      const response = await request(app)
        .put(`/todos/edit/${hexId}`)
        .send({ todo })
        .expect(200);
      expect(response).toHaveProperty("body");
      expect(response.body).toHaveProperty("todo");
      expect(response.body.todo._id).toBe(hexId);
      expect(response.body.todo.title).toBe(todo.title);
      expect(response.body.todo.description).toBe(todo.description);
      expect(response.body.todo.status).toBe(todo.status);
    });
  });

  describe("DELETE /todos/:id", () => {
    it("should delete the todo given a valid id", async () => {
      const todos = await todoModel.find();
      var hexId = todos[0]._id.toHexString();
      const response = await request(app).delete(`/todos/${hexId}`).expect(200);
      expect(response).toHaveProperty("body");
      expect(response.body).toHaveProperty("todo");
      expect(response.body.todo._id).toBe(hexId);
      const todo = await todoModel.findById(hexId).then((todo) => {
        expect(todo).toBeNull();
      });
    });
  });
});
