import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

function Login() {
  const [inputs, setInputs] = useState({
    login: '', 
    password: ''
  });
  /* SAME AS: 
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  */
  const [err, setErr] = useState(null);

  const navigate = useNavigate();

  // const {auth} = useContext(AuthContext);

  const handleChange = (e) => {
    // Spread(...) syntax allow strings and arrays to be expanded
    // the inputs variable contains both login & password, so I spread (...) the object in order to get both of them
    setInputs((prev) => ({ ...prev, [e.target.name] : e.target.value    }));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault(); // override the default behaviour when submitting a form
  //   try {
  //     await auth(inputs); // send the data to the AuthContext component for validation
  //     navigate('/'); // if successful, navigate to the home page
  //   } catch (err) {
  //     console.error(err);
  //     setErr(err.response.data);
  //   }
  // }


  return (
    <div className="auth">
        <h1>LOGIN</h1>
        <form>
            <input type="text" placeholder="Email or Username" name="login" required onChange={handleChange} />
            <input type="password" placeholder="Password" name="password" required onChange={handleChange}/>
            {/* <button onClick={handleSubmit}>Login</button> */}
            <button>Login</button>
            {err && <p>{err}</p>} {/*if there is an error, create a <p> tag showing the error to the user*/}
            <span>No account? <Link to="/register">Register</Link> </span>
        </form>
    </div>
  )
}

export default Login;