import { FiX } from 'react-icons/fi';

import './style.css';

function TodoItem({ item, onDelete, onCheck }) {
  function handleBoxClick() {
    onCheck(item.id)
  }

  function handleDelete() {
    onDelete(item.id)
  }

  return (
    <div className="todo-item">
      <input type="checkbox" name={item.id} id={item.id} checked={item.checked} onClick={handleBoxClick} />
      <label htmlFor={item.id} className={item.checked ? 'striked' : ''}>{item.description}</label>
      <button onClick={handleDelete}><FiX /></button>
    </div>
  )
}

export default TodoItem;
