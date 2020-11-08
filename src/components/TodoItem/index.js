import { useState } from 'react';
import { FiX } from 'react-icons/fi';

import './style.css';

function TodoItem({ onDelete, itemId, itemDescription}) {
  const [isChecked, setIsChecked] = useState(false);

  function handleBoxClick() {
    const toggledValue = !isChecked;

    setIsChecked(toggledValue);
  }

  function handleDelete() {
    onDelete(itemId)
  }

  return (
    <div className="todo-item">
      <input type="checkbox" name={itemId} id={itemId} checked={isChecked} onClick={handleBoxClick} />
      <label htmlFor={itemId} className={isChecked ? 'striked' : ''}>{itemDescription}</label>
      <button onClick={handleDelete}><FiX /></button>
    </div>
  )
}

export default TodoItem;
