import { useState } from 'react'

export default function Todo() {
    // State management
    const [todoContent, setTodoContent] = useState([
        { task: "complete task", status: false }
    ]);
    const [input, setInput] = useState("");

    // Add new todo
    function handleTodoForm(event) {
        event.preventDefault();
        
        // Validate input
        if (input.trim() === "") return;

        // Add new todo to list
        setTodoContent([
            ...todoContent,
            { task: input, status: false }
        ]);
        
        // Clear input field
        setInput('');
    }

    // Toggle todo completion status
    function handleStatusToggle(index) {
        setTodoContent(todos =>
            todos.map((todo, i) =>
                i === index
                    ? { ...todo, status: !todo.status }
                    : todo
            )
        );
    }

    // Delete todo by index
    function handleDelete(index) {
        setTodoContent(todos =>
            todos.filter((_, i) => i !== index)
        );
    }

    return (
        <div className="todo-container">
            <h1 className='todo-title'>Todo-List</h1>
            {/* Todo input form */}
            <form className="todo-form" onSubmit={handleTodoForm}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter a task..."
                />
                <button type="submit">Add</button>
            </form>

            {/* Todo list */}
            <div className="todo-content">
                <ul>
                    {todoContent.map((todo, index) => (
                        <li key={index}>
                            <span
                                onClick={() => handleStatusToggle(index)}
                                className={`content ${todo.status ? "done" : ""}`}
                            >
                                {todo.task}
                            </span> 
                            <button 
                                onClick={() => handleDelete(index)}
                                aria-label="Delete task"
                            >
                                🗑️
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}