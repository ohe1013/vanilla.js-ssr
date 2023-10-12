export const TodoItem = (item) => `<li>${item}</li>`;

export const TodoList = (items) => `<ul>
${items.map(TodoItem).join("")}
</ul>`;

export const Button = ({ id, text }) => `<button id=${id}>${text}</button>`;

export const App = (todoItems) => `
${Button({ id: "add", text: "add item" })}
${Button({ id: "delete", text: "delete item" })}
  ${TodoList(todoItems)}
`;
