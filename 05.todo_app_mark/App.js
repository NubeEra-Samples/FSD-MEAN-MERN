function TodoItem({ todo, index, toggleComplete, handleDelete }) {
  return (
    <li
      className={todo.completed ? "completed" : ""}
      style={{ display: "flex", alignItems: "center" }}
    >
      {/* Make the span take full width so click works reliably */}
      <span
        onClick={() => toggleComplete(index)}
        style={{ cursor: "pointer", flexGrow: 1 }}
      >
        {todo.text}
      </span>
      <button onClick={() => handleDelete(index)}>Delete</button>
    </li>
  );
}

function App() {
  const [todos, setTodos] = React.useState([]);
  const [input, setInput] = React.useState("");

  const handleInputChange = (e) => setInput(e.target.value);

  const handleAdd = () => {
    if (input.trim() === "") return;
    setTodos([...todos, { text: input, completed: false }]);
    setInput("");
  };

  const handleDelete = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const toggleComplete = (index) => {
    // Toggle completed status
    setTodos(
      todos.map((todo, i) =>
        i === index ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div>
      <h1>Complete React Todo App</h1>
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Enter todo"
      />
      <button onClick={handleAdd}>Add</button>

      <ul style={{ padding: 0, listStyleType: "none" }}>
        {todos.map((todo, index) => (
          <TodoItem
            key={index}
            todo={todo}
            index={index}
            toggleComplete={toggleComplete}
            handleDelete={handleDelete}
          />
        ))}
      </ul>
    </div>
  );
}
