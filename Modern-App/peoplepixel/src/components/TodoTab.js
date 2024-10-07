import React, { useState, useEffect } from 'react';
import './TodoTab.css';

function TodoTab({ contactId }) {
  const [todos, setTodos] = useState([]);
  const [sortBy, setSortBy] = useState('dueDate');
  const [filterPriority, setFilterPriority] = useState('all');

  useEffect(() => {
    // Simulating API call to fetch todos
    const fetchTodos = async () => {
      // Replace this with actual API call
      const response = await fetch(`/api/contacts/${contactId}/todos`);
      const data = await response.json();
      setTodos(data);
    };

    fetchTodos();
  }, [contactId]);

  const addTodo = () => {
    // Implement add todo functionality
  };

  const toggleTodo = (id) => {
    // Implement toggle todo functionality
  };

  const sortedAndFilteredTodos = todos
    .filter(todo => filterPriority === 'all' || todo.priority === filterPriority)
    .sort((a, b) => new Date(a[sortBy]) - new Date(b[sortBy]));

  return (
    <div className="todo-tab">
      <button onClick={addTodo} className="add-button">Add New Todo</button>
      <div className="controls">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="dueDate">Sort by Due Date</option>
          <option value="priority">Sort by Priority</option>
        </select>
        <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)}>
          <option value="all">All Priorities</option>
          <option value="high">High Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="low">Low Priority</option>
        </select>
      </div>
      <ul className="todo-list">
        {sortedAndFilteredTodos.map(todo => (
          <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <input type="checkbox" checked={todo.completed} onChange={() => toggleTodo(todo.id)} />
            <span className="todo-text">{todo.text}</span>
            <span className="todo-due-date">{new Date(todo.dueDate).toLocaleDateString()}</span>
            <span className={`todo-priority ${todo.priority}`}>{todo.priority}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoTab;