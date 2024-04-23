import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [inputs, setInputs] = useState({
    email: '',
    username: '', 
    password: ''
  });

  const [err, setErr] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    // Spread(...) syntax allow strings and arrays to be expanded
    // the inputs variable contains email, username & password, so I spread (...) the object in order to get both of them
    setInputs((prev) => ({ ...prev, [e.target.name] : e.target.value    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/register');
      navigate("/login");
    } catch (err) {
      console.error(err);
      setErr(err.response.data);
    }
  };


  return (
    <div className="auth">
        <h1>REGISTER</h1>
        <form>
            <input type="email" placeholder="Email" name="email" required onChange={handleChange}/>
            <input type="text" placeholder="Username" name="username" required onChange={handleChange}/>
            <input type="password" placeholder="Password" name="password" required onChange={handleChange}/>
            <button onClick={handleSubmit}>Register</button>
            {err && <p>{err}</p>}
            <span>Already have an account? <Link to="/login">Login</Link> </span>
        </form>
    </div>
  )
}

export default Register;