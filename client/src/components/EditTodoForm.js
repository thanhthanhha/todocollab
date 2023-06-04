import React, {useState} from 'react'

export const EditTodoForm = ({editTodo, task}) => {
    const [value, setValue] = useState(task.content);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!value) {
          setErrorMessage('Please enter a value');
          return; // Stop further execution
        }

        editTodo(value, task._id);
        setValue("")
    }

  return (
    <form className='TodoForm' onSubmit={handleSubmit}>
      <div className="form-group">
        <input type='text' value={value} className='todo-input' placeholder='Update Task' onChange={(e) => setValue(e.target.value)}/>
        <button type='submit' className='todo-btn'>Update Task</button>
      </div>
        {errorMessage && <p className='error-message'>{errorMessage}</p>}
    </form>
  )
}
