import React, { useState, useContext } from "react";
import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import '../styles/login.css';
import registerImg from '../assets/images/register.png';
import userIcon from '../assets/images/user.png';

import { AuthContext } from './../context/authContext';
import { BASE_URL } from "./../utils/config";

// Firebase
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../pages/firebase";

const Register = () => {
  const [credentials, setCredentials] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.message || "Registration failed");
        return;
      }

      dispatch({ type: 'REGISTER_SUCCESS' });
      alert("Registered successfully!");
      navigate('/login');
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
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
      alert("Google login failed. Please try again.");
    }
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="8" className="m-auto">
            <div className="login__container d-flex justify-content-between">
              <div className="login__img">
                <img src={registerImg} alt="register" />
              </div>

              <div className="login__form">
                <div className="user">
                  <img src={userIcon} alt="user icon" />
                </div>
                <h2>Create Account</h2>
                <Form onSubmit={handleClick}>
                  <FormGroup>
                    <input
                      type="text"
                      placeholder="Username"
                      required
                      id="userName"
                      onChange={handleChange}
                    />
                  </FormGroup>
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
                    Create Account
                  </Button>

                  <div className="mt-3 text-center">
                    <p>or</p>
                    <Button className="btn signin__btn" onClick={handleGoogleLogin}>
                      Sign in with Google
                    </Button>
                  </div>
                </Form>
                <p>Already have an account? <Link to='/login'>Login</Link></p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Register;
