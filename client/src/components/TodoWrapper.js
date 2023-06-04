import React, { useEffect, useState } from 'react'
import { TodoForm } from './TodoForm'
import { v4 as uuidv4 } from 'uuid';
import { Todo } from './Todo';
import { EditTodoForm } from './EditTodoForm';
import axios from 'axios';
uuidv4();

export const TodoWrapper = () => {
    const [todos, setTodos] = useState([])
    const [trigger, SetTrigger ] = useState(false)

    
    const toggleComplete = id => {
        setTodos(todos.map(todo => todo._id === id ? {...todo, completed: !todo.completed} : todo))
    }

    const editTodo = id => {
        setTodos(todos.map(todo => todo._id === id ? {...todo, isEditing: !todo.isEditing} : todo))
    }

    const fetchTodo = async () => {
        console.log("fetch working");
        try {
          const response = await axios.get(process.env.REACT_APP_LIST_URL)
          .catch(error => {
            console.log(error)
          });
          console.log(response);
          const todoList = response.data;
          console.log("inside fetch working");
          console.log(todoList);
          setTodos(todoList);
          return todoList
        } catch (error) {
          console.error(error);
        }
      };

    const addTodo = (content) => {
        axios.post(process.env.REACT_APP_ADD_URL, { content: content })
        .then(response => {
            const todoList = response.data;
            console.log(todoList);
            fetchTodo()
        })
        .catch(error => {
            console.error(error);
        });
    }

    const editTask = (content, id) => {
        axios.post(process.env.REACT_APP_EDIT_URL + `/${id}`, { content: content })
        .then(response => {
            const todoList = response.data;
            console.log(todoList);
            fetchTodo();
        })
        .catch(error => {
            console.error(error);
        });
    }

    const deleteTodo = (id, content) => {
        axios.post(process.env.REACT_APP_DELETE_URL + `/${id}`, { content: content })
        .then(response => {
            const todoList = response.data;
            console.log(todoList);
            fetchTodo();
        })
        .catch(error => {
            console.error(error);
        });
    }

    useEffect(() => {
        fetchTodo();
      }, []);



  return (
    <div className='TodoWrapper'>
        <h1>Get Things Done!</h1>
        <TodoForm addTodo={addTodo} SetTrigger={SetTrigger}/>
        {todos.map((todo, index) => (
            todo.isEditing ? (
                <EditTodoForm editTodo={editTask} task={todo}/>
            )
            : (
                <Todo task={todo} key={index} toggleComplete={toggleComplete} deleteTodo={deleteTodo} editTodo={editTodo}/>
            )
        ))}
    </div>
  )
}
