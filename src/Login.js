import MicrosoftLogin from "./services/microsoftLogin";

const Login = () => {
  return (
    <div
      className="container-fluid p-3 p-md-5 p-lg-5"
      style={{ marginTop: "80px" }}
    >
      <div className="row">
        <div className="col-md-4 offset-md-4">
          <h1 className="card-title mb-4 display-6">Login</h1>
          <form className="mb-5">
            <div className="form-group">
              <input
                type="email"
                placeholder="Email"
                className="form-control mb-4"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                className="form-control mb-4"
                id="exampleInputPassword1"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
          <div className="mb-4 row">
            <div className="col">
              <h4 className="mb-2">
               Other methods
              </h4>
              <div className="col-6">
                <MicrosoftLogin />
              </div>
            </div>
          </div>
          <div className="">
            Do not have an account? <a href="/register">Register</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
