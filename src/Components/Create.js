import React, { useState } from 'react';
import axios from 'axios';

function Create({ addTodo }) {
  const [task, setTask] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAdd = () => {
    if (task.trim()) {
      setLoading(true);
      axios.post('http://localhost:3001/add', { task: task })
        .then(result => {
          console.log(result);
          addTodo && addTodo(result.data);
          setTask('');
          setLoading(false);
          setError(null);
        })
        .catch(err => {
          console.error(err);
          setError('Failed to add task');
          setLoading(false);
        });
    } else {
      setError('Task cannot be empty');
    }
  };

  return (
    <div className="create_form">
      <input
        type='text'
        value={task}
        placeholder='Enter Task'
        onChange={(e) => setTask(e.target.value)}
      />
      <button type='button' onClick={handleAdd} disabled={loading}>
        {loading ? 'Adding...' : 'Add'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default Create;
