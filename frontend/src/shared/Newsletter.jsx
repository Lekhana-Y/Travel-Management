// import React from "react";
// import './newsletter.css';
// import {Container,Row,Col} from 'reactstrap';
// import maleTourist from '../assets/images/male-tourist.png'
// const Newsletter = () => {
//     return (
//         <section className="newsletter">
//             <Container>
//                 <Row>
//                     <Col lg='6'>
//                     <div className="newsletter__content">
//                         <h2>Subscribe now to get useful information</h2>
//                         <div className="newsletter__input">
//                             <input type="email" placeholder="Enter your email"/>
//                             <button className="btn newsletter__btn">Subscribe</button>
//                         </div>
//                         <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia, fugiat.
//                         </p>
//                     </div>
//                     </Col>
//                     <Col lg='6'>
//                     <div className="newsletter__img">
//                         <img src={maleTourist} alt="male tourist" />
//                     </div></Col>
//                 </Row>
//             </Container>
//         </section>
//     );
// }
// export default Newsletter;
// src/components/shared/Newsletter.jsx
import React, { useState, useContext } from "react";
import './newsletter.css';
import { Container, Row, Col } from 'reactstrap';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import maleTourist from '../assets/images/male-tourist.png';

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubscribe = () => {
    if (!user) {
      alert("Please login to subscribe.");
      return;
    }
  
    if (!email) {
      alert("Please enter your email.");
      return;
    }
  
    navigate("/subscribe/payment", {
      state: {
        email,
        from: "newsletter"  
      }
    });
  };
  

  return (
    <section className="newsletter">
      <Container>
        <Row>
          <Col lg='6'>
            <div className="newsletter__content">
              <h2>Subscribe now to get useful information</h2>
              <div className="newsletter__input">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button className="btn newsletter__btn" onClick={handleSubscribe}>
                  Subscribe
                </button>
              </div>
              <p> Subscribe to unlock exclusive travel deals!</p>
            </div>
          </Col>
          <Col lg='6'>
            <div className="newsletter__img">
              <img src={maleTourist} alt="male tourist" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Newsletter;
