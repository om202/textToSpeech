import Nav from "./API/Nav";
import Home from "./Home";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <Nav />
      <div className="container-fluid vh-100">
        <Home />
      </div>
    </>
  );
}

export default App;
