import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function SinglePost(props) {
    // `post` is the variable
    // `setPost` is called a setter / toggler function, and is used to change
    // values/states to the `post` variable
    // When first defining the variable-function set, we need to call
    // the useState() method, and give an initial value/state to the variable
    const [post, setPost] = useState({});

    const {taskId} = props;
    // The useEffect is executed whenever we render a page.
    // Within the useEffect method, we can define functions (as many as we want), 
    // and they will be executed when we render the page.
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/todos/${taskId}`);
                setPost(res.data); // post = res.data;
            } catch(err) {
                console.error(err);
            }
        }

        fetchData();
    }, [taskId]);


  return (
    <div className="singlePost">
        <div className="content">
            <p>{post.task}</p>
            <div className="info">
                <span>{post.priority}</span>
                <p><b>{post.due_date}</b></p>
                <p>{post.completed}</p>
            </div>
            <div className="edit">
                <Link to={`/edit_task/${taskId}`} taskId={taskId} />
            </div>
        </div>
    </div>
  )
}

export default SinglePost;