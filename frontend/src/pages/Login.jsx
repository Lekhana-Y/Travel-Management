import React, { useState, useContext } from "react";
import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import '../styles/login.css';
import loginImg from '../assets/images/login.png';
import userIcon from '../assets/images/user.png';

import { AuthContext } from './../context/authContext';
import { BASE_URL } from "./../utils/config";

// Firebase imports
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../pages/firebase";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
  });

  const [showPassword, setShowPassword] = useState(false); // 👁️ toggle state

  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });

    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(credentials),
      });

      const result = await res.json();
      if (!res.ok) {
        return alert(result.message);
      }

      dispatch({ type: "LOGIN_SUCCESS", payload: result.data });
      navigate("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.message });
    }
  };

  const handleGoogleLogin = async () => {
    try {
      dispatch({ type: "LOGIN_START" });

      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          username: user.displayName,
          email: user.email,
          photo: user.photoURL,
        },
      });

      navigate("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.message });
      console.log(err);
      alert("Google login failed. Please try again.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="8" className="m-auto">
            <div className="login__container d-flex justify-content-between">
              <div className="login__img">
                <img src={loginImg} alt="" />
              </div>

              <div className="login__form">
                <div className="user">
                  <img src={userIcon} alt="" />
                </div>
                <h2>Login</h2>
                <Form onSubmit={handleClick}>
                  <FormGroup>
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      id="email"
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup style={{ position: "relative" }}>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      required
                      id="password"
                      onChange={handleChange}
                    />
                    <span
                      onClick={togglePasswordVisibility}
                      style={{
                        position: "absolute",
                        right: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        cursor: "pointer"
                      }}
                    >
                      <i className={showPassword ? "ri-eye-off-line" : "ri-eye-line"}></i>
                    </span>
                  </FormGroup>
                  <Button className="btn secondary__btn auth__btn" type="submit">
                    Login
                  </Button>

                  <div className="mt-3 text-center">
                    <p>or</p>
                    <Button className="btn signin__btn" onClick={handleGoogleLogin}>
                      Sign in with Google
                    </Button>
                  </div>

                  <p className="mt-3">
                    Don't have an account? <Link to="/register">Create now</Link>
                  </p>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Login;
