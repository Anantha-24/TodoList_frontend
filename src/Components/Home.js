import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Create from './Create';
import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill } from 'react-icons/bs';

function Home() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/get')
      .then(response => {
        console.log(response);
        setTodos(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError(err.message || 'An error occurred');
        setLoading(false);
      });
  }, []);

  const handleEdit = (id) => {
    axios.put(`http://localhost:3001/update/${id}`)
      .then(() => {
        setTodos(prevTodos => 
          prevTodos.map(todo => 
            todo._id === id ? { ...todo, done: !todo.done } : todo
          )
        );
      })
      .catch(err => console.log(err));
  };

  const addTodo = (newTodo) => {
    setTodos([...todos, newTodo]);
  };

  const deleteTodo = (id) => {
    axios.delete(`http://localhost:3001/delete/${id}`)
      .then(() => {
        setTodos(prevTodos => prevTodos.filter(todo => todo._id !== id));
      })
      .catch(err => console.log(err));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='home'>
      <h2>Todo List</h2>
      <Create addTodo={addTodo} />
      {
        todos.length === 0
          ? <div><h2>No Records</h2></div>
          : todos.map(todo => (
            <div className="task" key={todo._id}>
              <div className="checkbox" onClick={() => handleEdit(todo._id)}>
                {todo.done ?
                  <BsFillCheckCircleFill className="icon" />
                  : <BsCircleFill className="icon" />
                }
                <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
              </div>
              <div>
                <span>
                  <BsFillTrashFill className='icon' onClick={() => deleteTodo(todo._id)} />
                </span>
              </div>
            </div>
          ))
      }
    </div>
  );
}

export default Home;
