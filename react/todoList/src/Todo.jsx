import { useState } from 'react';

function Todo() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");

    function handleChange(e) {
        setNewTask(e.target.value);
    }

    function handleAdd() {
        if (newTask.trim() === "") return;

        setTasks(t => [
            ...t,
            { text: newTask, completed: false }
        ]);
        setNewTask("");
    }

    function handleRemove(index) {
        setTasks(t => t.filter((_, i) => i !== index));
    }

    function handleToggleComplete(index) {
        setTasks(t =>
            t.map((task, i) =>
                i === index
                    ? { ...task, completed: !task.completed }
                    : task
            )
        );
    }

    function moveTaskUp(index) {
        if (index === 0) return;

        const updated = [...tasks];
        [updated[index], updated[index - 1]] =
        [updated[index - 1], updated[index]];
        setTasks(updated);
    }

    function moveTaskDown(index) {
        if (index === tasks.length - 1) return;

        const updated = [...tasks];
        [updated[index], updated[index + 1]] =
        [updated[index + 1], updated[index]];
        setTasks(updated);
    }

    return (
        <div className="todoContainer">
            <h1>Todo List</h1>

            <div className="todoList">
                <ol>
                    {tasks.map((task, index) => (
                        <li key={index}>
                            <span
                                className={`content ${task.completed ? "done" : ""}`}
                                onClick={() => handleToggleComplete(index)}
                            >
                                {task.text}
                            </span>

                            <div className="actions">
                                <button onClick={() => moveTaskUp(index)}>⬆️</button>
                                <button onClick={() => moveTaskDown(index)}>⬇️</button>
                                <button onClick={() => handleRemove(index)}>❌</button>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>

            <input
                type="text"
                value={newTask}
                onChange={handleChange}
                placeholder="Add a task..."
            />
            <button onClick={handleAdd}>Add</button>
        </div>
    );
}

export default Todo;
