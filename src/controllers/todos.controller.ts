import express from "express";
import { Request, Response } from "express";
import { todoModel } from "../models";

export const todosController = express();

todosController.get("", async (_req: Request, res: Response) => {
  const todos = await todoModel.find();

  const serializedTodos = todos.map((todo: any) => ({
    id: todo.id,
    title: todo.title,
    description: todo.description,
    status: todo.status,
  }));

  res.json({ todos: serializedTodos });
});

todosController.post("", (req: Request, res: Response) => {
  const { todo } = req.body;

  const todoToSave = todoModel.create(todo);

  res.status(200);
});
