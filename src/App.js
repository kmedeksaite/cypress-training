import { useState, useEffect } from 'react';
import { FiPlus } from 'react-icons/fi';

import TodoInput from './components/TodoItem';

import './App.css';

function App() {
  const [newItem, setNewItem] = useState('');
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

    if (!newItem) {
      alert('Please, enter a todo item.');
      return;
    }

    setTodos([...todos, newItem]);
    setNewItem('');
  }

  function deleteItem(itemId) {
    const allTodos = [...todos].filter((_, index) => index !== itemId);

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
          value={newItem}
          onChange={e => setNewItem(e.target.value)}
        />
        <button type="submit"><FiPlus /></button>
      </form>


      {todos.map((item, index) => (
        <TodoInput itemDescription={item} itemId={index} onDelete={deleteItem} />
      ))}
    </div>
  )
}

export default App;
