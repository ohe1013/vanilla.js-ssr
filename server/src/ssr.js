import { App } from "./component.js";

export const generateHtml = (model) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Todo List</title>
</head>
<body>
<div id="app">
  ${App(model.todoItems)}
</div>
</body>
<script>window.__INITIAL_MODEL__=${JSON.stringify({
  todoItems: model.todoItems,
})}</script>
<script src="./src/main.js" type="module"></script>
</html>
`;
