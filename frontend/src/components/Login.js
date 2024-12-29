import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function Login() {
  const location = useLocation();
  const { logIn } = location.state || { logIn: false };
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear previous error messages
    try {
      let response;
      let userHandle;
      if (logIn) {
        response = await axios.get("http://localhost:8080/userLogIn", {
          params: { name: userDetails.name, password: userDetails.password },
        });
        userHandle = userDetails.name; // Assuming response contains user details
      } else {
        response = await axios.post(
          "http://localhost:8080/newUser",
          userDetails
        );
        console.log(response);
        userHandle = userDetails.name;
      }

      alert(
        logIn ? "User logged in successfully" : "User created successfully"
      );
      navigate("/", { replace: true, state: { userHandle } });
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage("Required field missing");
      } else if (error.response && error.response.status === 404) {
        setErrorMessage("User not found");
      } else if (error.response && error.response.status === 401) {
        setErrorMessage("Wrong password");
      } else if (error.response && error.response.status === 409) {
        setErrorMessage("Username not already taken");
      } else {
        console.error("An error occurred", error);
        setErrorMessage("An error occurred. Please try again later.");
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <main className="form-signin w-[40%] m-auto">
      <form className="border-2 p-10 rounded-xl" onSubmit={handleSubmit}>
        <h1 className="h3 mb-3 fw-normal">
          {logIn ? "Please Log In" : "Please Sign In"}
        </h1>

        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingName"
            name="name"
            placeholder="Handle"
            value={userDetails.name}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="floatingName">Handle</label>
        </div>

        {!logIn && (
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="floatingEmail"
              name="email"
              placeholder="handle@gmail.com"
              value={userDetails.email}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="floatingEmail">Email</label>
          </div>
        )}

        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            name="password"
            placeholder="Password"
            value={userDetails.password}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>

        {errorMessage && (
          <div className="error-message text-danger mt-3">{errorMessage}</div>
        )}

        <div className="form-check text-start my-3 flex justify-between">
          <div>
            <input
              className="form-check-input"
              type="checkbox"
              value="remember-me"
              id="flexCheckDefault"
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Remember me
            </label>
          </div>
          {logIn && (
            <div>
              <button
                type="button"
                className="text-blue-700 font-medium"
                onClick={() => navigate("/login", { state: { logIn: false } })}
              >
                Sign In
              </button>
            </div>
          )}
        </div>
        <button className="btn btn-primary w-100 py-2" type="submit">
          {logIn ? "Log In" : "Sign In"}
        </button>
      </form>
    </main>
  );
}

export default Login;
