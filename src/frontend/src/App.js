import './App.css';
import { BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom'
import Home from "./pages/Home"
import AddQuote from "./pages/AddQuotes"
import Quote from "./pages/Quote"
import Login from "./pages/Login"
import Registration from "./pages/Registration"
import { AuthContext } from "./helpers/AuthContext"
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [authState, setAuthState] = useState({
    username: "", 
    id: 0,
    status: false
  });

  useEffect(() => {
    axios.get("http://localhost:3001/auth/validate", {
      headers: {
        accessToken: localStorage.getItem("accessToken")
      }
    })
    .then((response) => {
      if(response.data.error){
        setAuthState({
          ...authState,
          status: false
        });
      } else {
        setAuthState({
          username: response.data.username, 
          id: response.data.id,
          status: true
        });
      }
    })
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({
      username: "", 
      id: 0,
      status: false
    });
  }

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <div className='navbar'>
            {!authState.status ? (
                <>
                  <Link to="/login">Login</Link>
                  <Link to="/registration">Registration</Link>
                </>
            ) : (
                <>
                  <Link to="/">Home Page</Link>
                  <Link to="/addQuote">Add an Quote</Link>
                  <div className='logout'><button onClick={logout}> Log out </button></div>
                </>
            )}
          </div>
          <Routes>
            <Route path="/" element={ <Home/> } />
            <Route path="/addQuote" element={ <AddQuote/> } />
            <Route path="/quote/:id" element={ <Quote/> } />
            <Route path="/login" element={ <Login/> } />
            <Route path="/registration" element={ <Registration/> } />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
