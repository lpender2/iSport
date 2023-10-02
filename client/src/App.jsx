import{BrowserRouter as Router, Routes, Route} from "react-router-dom";
import React, { useState, useEffect } from "react";
import Homepage from "./views/Homepage";
import Login from "./views/Login";
import Register from "./views/Register";
import axios from "axios";
import Cookies from "js-cookie";
import 'bootstrap/dist/css/bootstrap.min.css';
import CreateEventPage from "./views/CreateEvent";
import Layout from "./components/Layout";


function App() {
  
  const [user, setUser] = useState({});

  useEffect(() => {
    axios.get("http://localhost:8000/api/user")  
    .catch((err) => console.log(err));
    const userData = Cookies.get("user");
      if (userData) {
        const parsedUserData = JSON.parse(userData);
        setUser(parsedUserData);
      }
    }, []);
  
  return (
    <Router>
      <div className="App">
      <Layout user={user} setUser={setUser}>
          <Routes>
            <Route path="/create-event" element={<CreateEventPage user={user} />} />  
            <Route path="/dashboard" element={<Homepage setUser={setUser} />} />
            <Route path="/register" element={<Register setUser={setUser} />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/" element={<Login setUser={setUser} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>  
      </div>
    </Router>
  );
}

function NotFound() {
  return <div>404 Not Found</div>;
}

export default App;
