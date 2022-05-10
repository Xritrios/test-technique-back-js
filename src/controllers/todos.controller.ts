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
    .then(() => res.json())
    .catch((err) => {
      if(err.errors.title.path === 'title' && err.errors.title.kind === 'minlength') {
        res.statusMessage = "Title length too small"
        res.status(490).json({ error: err.errors.title.message });
      }
    });
});

todosController.delete("/:id", (req: Request, res: Response) => {
  todoModel
    .findByIdAndDelete(req.params.id)
    .then(() => res.json())
    .catch((err) => {
      console.log(err);
    });
});

todosController.put("/edit/:id", (req: Request, res: Response) => {
  todoModel
    .findByIdAndUpdate(req.params.id, req.body.todo)
    .then(() => res.json())
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

todosController.put("/finish/:id", (req: Request, res: Response) => {
  todoModel
    .findByIdAndUpdate(req.params.id, req.body.todo)
    .then(() => res.json())
    .catch((err) => console.log(err));
});
