import { FiX } from 'react-icons/fi';

import './style.css';

function TodoItem() {
  return (
    <div className="todo-item">
      <input type="checkbox" name="item" id="item"/>
      <label htmlFor="item">Item</label>
      <button><FiX /></button>
    </div>
  )
}

export default TodoItem;
