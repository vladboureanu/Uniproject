import './styles/style.scss';

import Home from './pages/Home';
import AddTask from './pages/AddTask';
import EditTask from './pages/EditTask';
import Login from './pages/Login';
import Register from './pages/Register';

import NavBar from './components/NavBar';
import Footer from './components/Footer';
// import Welcome from './components/Welcome';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      <NavBar />
      <Outlet /> {/* Outlet is like an empty space used to render the content of pages, acts like a placeholder*/}
      <Footer />
    </div>
  )
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />
      }, 
      {
        path: "/add_task", 
        element: <AddTask />
      }, 
      {
        path: "/edit_task/:id", 
        element: <EditTask />
      }
    ]
  },
  {
    path: "/register", 
    element: <Register />
  },
  {
    path: "/login",
    element: <Login />
  }
]);


function App() {
  return (
    <div className="App">
      <div className="container">
         <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
