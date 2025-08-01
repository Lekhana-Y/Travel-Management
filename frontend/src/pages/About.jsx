import React from "react";
import { Container, Row, Col } from "reactstrap";
import "../styles/about.css";
import aboutImg from "../assets/images/tour-img02.jpg"; 

const About = () => {
  return (
    <section className="about">
      <Container>
        <Row className="align-items-center">
          <Col lg="6" md="6">
            <div className="about__img">
              <img src={aboutImg} alt="About Us" />
            </div>
          </Col>
          <Col lg="6" md="6">
            <div className="about__content">
              <h2>About Our Travel Agency</h2>
              <p>
                We are passionate about helping travelers explore the world effortlessly. Whether it's relaxing beaches, thrilling adventures, or cultural experiences — we've got you covered.
              </p>
              <p>
                With years of experience in the tourism industry, we specialize in crafting personalized travel experiences. Our goal is to make your journey memorable and stress-free.
              </p>
              <ul>
                <li>✔️ Custom Tour Packages</li>
                <li>✔️ 24/7 Customer Support</li>
                <li>✔️ Best Price Guarantee</li>
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default About;
