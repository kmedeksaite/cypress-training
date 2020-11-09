import { randomBytes } from 'crypto';
import { useState, useEffect } from 'react';
import { FiPlus } from 'react-icons/fi';

import TodoInput from './components/TodoItem';

import './App.css';

function App() {
  const [description, setDescription] = useState('');
  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem('@todo-testing:todos');

    if (storedTodos) return JSON.parse(storedTodos);

    return [];
  });

  useEffect(() => {
    localStorage.setItem('@todo-testing:todos', JSON.stringify(todos));
  }, [todos]);

  function handleAddTodo(event) {
    event.preventDefault();

    if (!description) {
      alert('Please, enter a todo item.');
      return;
    }

    const newTodo = {
      id: randomBytes(4).toString('hex'),
      description,
      checked: false,
    }

    setTodos([...todos, newTodo]);
    setDescription('');
  }

  function deleteItem(itemId) {
    const allTodos = [...todos].filter(item => item.id !== itemId);

    setTodos([...allTodos]);    
  }

  function checkItem(itemId) {
    const allTodos = [...todos].map(item => {
      if (item.id === itemId) {
        item.checked = !item.checked
      }

      return item;
    });

    setTodos([...allTodos]);
  }

  return (
    <div className="app">
      <h1>To-do Testing</h1>

      <form onSubmit={handleAddTodo}>
        <input 
          type="text"
          name="add-todo"
          id="add-todo"
          placeholder="add new todo..."
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <button type="submit"><FiPlus /></button>
      </form>

      <div className="todos">
        {todos.map((item) => (
          <TodoInput key={item.id} item={item} onCheck={checkItem} onDelete={deleteItem} className="item" />
        ))}
      </div>
    </div>
  )
}

export default App;
