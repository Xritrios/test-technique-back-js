import { json, urlencoded } from "body-parser";
import express from "express";
import mongoose from "mongoose";
import { todosController } from "./controllers";

const PORT = 8080;

export async function bootstrapApp(port: number) {
  await mongoose.connect("mongodb://localhost:27017/todolist");

  const app = express();

  app.use(json());
  app.use(urlencoded({ extended: true }));

  app.use("/todos", todosController);

  if (process.env.NODE_ENV !== "test") {
    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  }

  return app;
}

bootstrapApp(PORT);
