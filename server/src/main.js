import { App } from "./component.js";
import { model } from "./model.js";

async function updateTodoItems(todoItems) {
  const headers = { "Content-Type": "application/json" };
  const body = JSON.stringify({ todoItems });
  return fetch("/api/todo-items", { method: "put", headers, body }).then(
    (res) => res.json()
  );
}

async function syncServerModel() {
  const newTodoItems = await updateTodoItems(model.todoItems);
  console.log(newTodoItems);
  model.init({ todoItems: newTodoItems });
}

function render() {
  const $app = document.querySelector("#app");
  $app.innerHTML = App(model.todoItems);

  $app.querySelector("#add").onclick = async () => {
    model.addToItem("새로운 아이템");
    syncServerModel().then(render);
  };

  $app.querySelector("#delete").onclick = async () => {
    model.deleteTodoItem(0);
    syncServerModel().then(render);
  };
}

function main() {
  model.init(window.__INITIAL_MODEL__);
  render();
}
main();
// function main() {
//   document.querySelector("#add").onclick = () => {
//     fetch("/api/todo-items", {
//       method: "post",
//       body: JSON.stringify({ content: "add item" }),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     }).then(() => location.reload);
//   };
//   document.querySelector("#delete").onclick = () => {
//     fetch("/api/todo-items/0", { method: "delete" }).then(() =>
//       location.reload()
//     );
//   };
// }

// main();
