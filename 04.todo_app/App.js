function App() {
  const [todos, setTodos] = React.useState([]);
  const [input, setInput] = React.useState("");

  function handleAdd() {
    if (input.trim() === "") return;
    setTodos([...todos, input]);
    setInput(""); // clear input
  }

  function handleInputChange(e) {
    setInput(e.target.value);
  }

  function handleDelete(index) {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  }

  return (
    <div>
      <h1>Todo App</h1>
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Enter todo"
      />
      <button onClick={handleAdd}>Add</button>

      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo} <button onClick={() => handleDelete(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
