import express from "express";
import { generateHtml } from "./src/ssr.js";
import { model } from "./src/model.js";

const app = express();
app.use(express.json());

//static 파일 등록
app.use("/src", express.static("./src"));

app.get("/", (req, res) => {
  res.send(generateHtml(model));
});
app.put("/api/todo-items", (req, res) => {
  model.init({ todoItems: req.body.todoItems });
  res.status(201).send(model.todoItems);
});
// app.delete("/api/todo-items/:index", (req, res) => {
//   model.deleteTodoItem(req.params.index);
//   res.status(204).send();
// });

app.listen(8000, () => console.log("listen to http://localhost:8000"));
