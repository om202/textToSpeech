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
import appInsights from "./services/applicationInsights";

appInsights.loadAppInsights();

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Nav />
        <div
          className="container-fluid app-container"
          style={{ marginBottom: "4rem", paddingTop: "120px" }}
        >
          <Routes>
            <Route path="/" element={<Home insights={appInsights} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About insights={appInsights} />} />
          </Routes>
        </div>
        <Footer />
        <ToastContainer />
      </Router>
    </Provider>
  );
}

export default App;
