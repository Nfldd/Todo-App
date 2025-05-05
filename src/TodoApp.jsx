import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  const addTodo = () => {
    if (task.trim()) {
      setTodos([...todos, { id: uuidv4(), text: task }]);
      setTask("");
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const startEditing = (id, text) => {
    setEditingId(id);
    setEditingText(text);
  };

  const updateTodo = () => {
    setTodos(
      todos.map((todo) =>
        todo.id === editingId ? { ...todo, text: editingText } : todo
      )
    );
    setEditingId(null);
    setEditingText("");
  };

  const readTodo = (text) => {
    alert(text);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md space-y-4 border border-gray-200">
        <h2 className="text-2xl font-bold text-center text-gray-800">📝 Todo List</h2>
        <div className="flex space-x-2">
          <input
            type="text"
            className="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter task..."
          />
          <button className="add" onClick={addTodo}>
            ADD
          </button>
        </div>
        <ul className="space">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex justify-between items-center p-3 bg-gray-100 rounded shadow"
            >
              {editingId === todo.id ? (
                <input
                  type="text"
                  className="border p-1 flex-1 rounded"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                />
              ) : (
                <span className="text-gray-800">{todo.text}</span>
              )}
              <div className="space-x-2">
                <button className="read" onClick={() => readTodo(todo.text)}>
                  READ
                </button>
                {editingId === todo.id ? (
                  <button className="save" onClick={updateTodo}>
                    SAVE
                  </button>
                ) : (
                  <button className="edit" onClick={() => startEditing(todo.id, todo.text)}>
                    EDIT
                  </button>
                )}
                <button className="delete" onClick={() => deleteTodo(todo.id)}>
                  DELETE
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoApp;