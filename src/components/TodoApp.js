import React, { useState } from 'react';

const TodoApp = () => {
    const [tasks, setTasks] = useState([]);

    const addTask = (task) => {
        const newTask = {
            id: Date.now(),
            title: task,
            completed: false,
        };
        setTasks((prevTasks) => [...prevTasks, newTask]);
    };

    const editTask = (id, updatedTitle) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === id ? { ...task, title: updatedTitle } : task
            )
        );
    };

    const deleteTask = (id) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    };

    return (
        <div>
            <h1>Todo List</h1>
            <input
                type="text"
                placeholder="Görev ekle"
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.target.value) {
                        addTask(e.target.value);
                        e.target.value = '';
                    }
                }}
            />
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        {task.title}
                        <button onClick={() => editTask(task.id, prompt('Yeni başlık:', task.title))}>Düzenle</button>
                        <button onClick={() => deleteTask(task.id)}>Sil</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoApp;
