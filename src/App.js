import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./API/Nav";
import Home from "./Home";
import Login from "./Login";
import "bootstrap/dist/css/bootstrap.min.css";
import Register from "./Register";
import { Provider } from "react-redux";
import { store } from "./services/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./Footer";
import About from "./About";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Nav />
        <div className="container-fluid" style={{minHeight: '100vh', marginBottom: '4rem'}}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
        <Footer />
        <ToastContainer />
      </Router>
    </Provider>
  );
}

export default App;
