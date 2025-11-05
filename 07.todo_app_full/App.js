function TodoItem({ todo, index, toggleComplete, handleDelete, handleEdit }) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editText, setEditText] = React.useState(todo.text);

  const handleSave = () => {
    handleEdit(index, editText);
    setIsEditing(false);
  };

  return (
    <li className={todo.completed ? "completed" : ""} style={{ display: "flex", alignItems: "center" }}>
      {isEditing ? (
        <>
          <input
            className="edit-input"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <span
            onClick={() => toggleComplete(index)}
            style={{ cursor: "pointer", flexGrow: 1 }}
          >
            {todo.text}
          </span>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => handleDelete(index)}>Delete</button>
        </>
      )}
    </li>
  );
}

function App() {
  const [todos, setTodos] = React.useState([]);
  const [input, setInput] = React.useState("");
  const [filter, setFilter] = React.useState("all"); // all | completed | pending

  // Load todos from localStorage
  React.useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(savedTodos);
  }, []);

  // Save todos to localStorage
  React.useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

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
    setTodos(
      todos.map((todo, i) =>
        i === index ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleEdit = (index, newText) => {
    setTodos(
      todos.map((todo, i) => (i === index ? { ...todo, text: newText } : todo))
    );
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "all") return true;
    if (filter === "completed") return todo.completed;
    if (filter === "pending") return !todo.completed;
  });

  return (
    <div>
      <h1>Full React Todo App</h1>
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Enter todo"
      />
      <button onClick={handleAdd}>Add</button>

      <div className="filters" style={{ marginTop: "10px" }}>
        <span>Filter: </span>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
        <button onClick={() => setFilter("pending")}>Pending</button>
      </div>

      <ul style={{ padding: 0, listStyleType: "none" }}>
        {filteredTodos.map((todo, index) => (
          <TodoItem
            key={index}
            todo={todo}
            index={index}
            toggleComplete={toggleComplete}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        ))}
      </ul>
    </div>
  );
}
