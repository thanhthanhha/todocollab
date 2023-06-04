import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare} from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

export const Todo = ({task, toggleComplete, deleteTodo, editTodo}) => {
  return (
    <div className='Todo'>
        <p onClick={() => toggleComplete(task._id)} className={`${task.completed ? 'completed' : ""}`}>{task.content}</p>
        <div>
            <FontAwesomeIcon icon={faPenToSquare} onClick={() => editTodo(task._id)}/>
            <FontAwesomeIcon icon={faTrash} onClick={() => deleteTodo(task._id)} />
        </div>
    </div>
  )
}
