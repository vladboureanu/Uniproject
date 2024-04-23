import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
    

export default function Home() {
    // const [var, setVar] = useState(initial_val);
    // The setVar is a function that allows us to change the value/state of the 'var' variable,
    // and we call it whenever we want to change its value/state.

    // Here the todos variable takes an intial value of an empty array
    const [todos, setTodos] = useState([]);

    // useEffect is used to run certain functions where rendering the page
    // here we will use it in order to get all the Todo Tasks from our server
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('http://localhost:5000/todos');
                setTodos(res.data); // change the todos variable, so that todos = res.data
            } catch (err) {
                console.error(err);
            }
        }

        fetchData();
    });

    // getText is used to parse the HTML text returned by the markdown editor
    const getText = (html) => {
        const txt = new DOMParser().parseFromString(html, "text/html");
        return txt.body.textContent;
    }

    return(
        <div className="home">
            <div className="todos">
                {todos.map((todo) => {
                    <div className="todo" key={todos.id}>
                        <div className="content">
                            <p> {todos.due_date} </p>
                            <p> {getText(todos.desc)} </p>
                        </div>
                    </div>      
                })}
            </div>
        </div>
    )
}