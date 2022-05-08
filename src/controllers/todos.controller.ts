import express from "express";
import { Request, Response } from "express";
import { todoModel } from "../models";

export const todosController = express();

todosController.get("/", async (_req: Request, res: Response) => {
  const todos = await todoModel.find();

  const serializedTodos = todos.map((todo: any) => ({
    id: todo.id,
    title: todo.title,
    description: todo.description,
    status: todo.status,
  }));

  res.json({ todos: serializedTodos });
});

todosController.post("/", (req: Request, res: Response) => {
  const { todo } = req.body;

  const todoToSave = todoModel
    .create(todo)
    .then(() => res.status(200))
    .catch((err) => console.log(err));
});

todosController.post("/:id", (req: Request, res: Response) => {
  todoModel
    .findByIdAndDelete(req.params.id)
    .then(() => res.status(200))
    .catch((err) => {
      console.log(err);
    });
});

todosController.post("/edit/:id", (req: Request, res: Response) => {
  todoModel
    .findByIdAndUpdate(req.params.id, req.body.todo)
    .then(() => res.status(200))
    .catch((err) => console.log(err));
});

todosController.get("/edit/:id", (req: Request, res: Response) => {
  todoModel
    .findById(req.params.id)
    .then((result) => {
      res.json({ todo: result });
    })
    .catch((err) => console.log(err));
});

todosController.post("/finish/:id", (req: Request, res: Response) => {
  console.log(req.body.todo);
  todoModel
    .findByIdAndUpdate(req.params.id, req.body.todo)
    .then(() => res.status(200))
    .catch((err) => console.log(err));
});
