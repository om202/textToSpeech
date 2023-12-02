import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from "./API/Nav";
import Home from "./Home";
import Login from "./Login";
import "bootstrap/dist/css/bootstrap.min.css";
import Register from './Register';

function App() {


  return (
    <Router>
      <Nav />
      <div className="container-fluid vh-100">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;