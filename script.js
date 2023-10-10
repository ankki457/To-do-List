const form = document.getElementById("form");
      const input = document.getElementById("input");
      const todosUL = document.getElementById("todos");
      const allButton = document.getElementById("all");
      const activeButton = document.getElementById("active");
      const completedButton = document.getElementById("completed");
      const clearCompletedButton = document.getElementById("clear-completed");

      let todos = JSON.parse(localStorage.getItem("todos")) || [];

      form.addEventListener("submit", (e) => {
        e.preventDefault();
        addTodo();
      });

      allButton.addEventListener("click", () => filterTodos("all"));
      activeButton.addEventListener("click", () => filterTodos("active"));
      completedButton.addEventListener("click", () => filterTodos("completed"));
      clearCompletedButton.addEventListener("click", clearCompleted);

      renderTodos();

      function addTodo() {
        const todoText = input.value.trim();
        if (todoText) {
          todos.push({ text: todoText, completed: false });
          input.value = "";
          updateLS();
          renderTodos();
        }
      }

      function renderTodos() {
        todosUL.innerHTML = "";
        todos.forEach((todo, index) => {
          const todoEl = document.createElement("li");
          todoEl.innerHTML = `
            <span class="checkbox ${
              todo.completed ? "checked" : ""
            }" onclick="toggleCompleted(${index})"></span>
            <span class="text">${todo.text}</span>
            <span class="delete" onclick="deleteTodo(${index})">X</span>
          `;
          todosUL.appendChild(todoEl);
        });
        updateLS();
      }

      function toggleCompleted(index) {
        todos[index].completed = !todos[index].completed;
        renderTodos();
      }

      function deleteTodo(index) {
        todos.splice(index, 1);
        renderTodos();
      }

      function clearCompleted() {
        todos = todos.filter((todo) => !todo.completed);
        renderTodos();
      }

      function updateLS() {
        localStorage.setItem("todos", JSON.stringify(todos));
      }

      function filterTodos(filter) {
        switch (filter) {
          case "all":
            renderTodos();
            break;
          case "active":
            const activeTodos = todos.filter((todo) => !todo.completed);
            renderFilteredTodos(activeTodos);
            break;
          case "completed":
            const completedTodos = todos.filter((todo) => todo.completed);
            renderFilteredTodos(completedTodos);
            break;
          default:
            renderTodos();
        }
      }

      function renderFilteredTodos(filteredTodos) {
        todosUL.innerHTML = "";
        filteredTodos.forEach((todo, index) => {
          const todoEl = document.createElement("li");
          todoEl.innerHTML = `
            <span class="checkbox ${
              todo.completed ? "checked" : ""
            }" onclick="toggleCompleted(${index})"></span>
            <span class="text">${todo.text}</span>
            <span class="delete" onclick="deleteTodo(${index})">X</span>
          `;
          todosUL.appendChild(todoEl);
        });
      }