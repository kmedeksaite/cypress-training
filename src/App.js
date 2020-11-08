import { FiPlus } from 'react-icons/fi';

import TodoInput from './components/TodoItem';

import './App.css';

function App() {
  return (
    <div className="app">
      <h1>To-do Testing</h1>

      <form>
        <input type="text" name="add-todo" id="add-todo" placeholder="add new todo..." />
        <button type="submit"><FiPlus /></button>
      </form>

      <TodoInput />
    </div>
  )
}

export default App;
