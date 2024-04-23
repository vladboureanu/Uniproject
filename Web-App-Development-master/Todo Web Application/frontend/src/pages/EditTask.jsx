import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';

function EditTask(props) {
  const [task, setTask] = useState({});
  const [value, setValue] = useState('');
  const {taskId} = props;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/todos/:${taskId}`);
        setTask(res.data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  });

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/todos/:${task.id}`);
      // same as : await axios.delete(`http://localhost:5000/todos/:${taskId}`);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  // getText is used to parse the HTML text returned by the markdown editor
  const getText = (html) => {
    const txt = new DOMParser().parseFromString(html, "text/html");
    return txt.body.textContent;
  }

  return (
    <div className="edit">
      <div className="content">
          <div className="info">
            <p>{task.due_date}</p>
            <p>{task.priority}</p>
          </div>
          <ReactQuill className='editor' theme='snow' value={value} onChange={setValue} />
      </div>
    </div>
  )
}

export default EditTask;