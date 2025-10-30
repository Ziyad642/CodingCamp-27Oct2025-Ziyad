// ======== To-Do List Logic ========
const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoDate = document.getElementById("todo-date");
const todoList = document.getElementById("todo-list");
const filterInput = document.getElementById("filter-input");

let todos = [];

// ======== Tambah To-Do ========
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const text = todoInput.value.trim();
  const date = todoDate.value;

  // Validasi input
  if (text === "" || date === "") {
    alert("Please fill in both task and date!");
    return;
  }

  const newTodo = {
    id: Date.now(),
    text,
    date,
  };

  todos.push(newTodo);
  renderTodos(todos);

  todoForm.reset();
});

// ======== Render To-Do List ======== 
function renderTodos(list) {
  todoList.innerHTML = "";

  if (list.length === 0) {
    todoList.innerHTML = "<p style='text-align:center;color:#777;'>No tasks found</p>";
    return;
  }

  list.forEach((todo) => {
    const li = document.createElement("li");
    li.className = "todo-item";

    li.innerHTML = `
      <div class="todo-text">
        <span>${todo.text}</span>
        <span>${todo.date}</span>
      </div>
      <button class="delete-btn" data-id="${todo.id}">Delete</button>
    `;

    todoList.appendChild(li);
  });
}

// ======== Hapus To-Do ========
todoList.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const id = parseInt(e.target.getAttribute("data-id"));
    todos = todos.filter((todo) => todo.id !== id);
    renderTodos(todos);
  }
});

// ======== Filter To-Do ========
filterInput.addEventListener("keyup", (e) => {
  const keyword = e.target.value.toLowerCase();
  const filtered = todos.filter((todo) =>
    todo.text.toLowerCase().includes(keyword)
  );
  renderTodos(filtered);
});
