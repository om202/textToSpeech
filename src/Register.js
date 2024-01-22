const Register = () => {
  return (
    <div className="container-fluid p-3 p-md-5 p-lg-5" style={{marginTop: "80px"}}>
      <div className="row">
        <div className="col-md-4 offset-md-4">
        <h1 className="card-title mb-4 display-6">Register</h1>
          <form className="mb-5">
            <div className="form-group">
              <input
                type="text"
                placeholder="Full Name"
                className="form-control mb-4"
                id="fullName"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                placeholder="Email"
                className="form-control mb-4"
                id="email"
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                className="form-control mb-4"
                id="password"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
          <div className="">
            Already have an account? <a href="/login">Login</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
