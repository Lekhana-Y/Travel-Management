
import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Row, Col, Container, Button, Card, CardBody, CardTitle, CardText } from "reactstrap";
import { BASE_URL } from "../utils/config";
import "../styles/payment.css"; 

const Payment = () => {
  const location = useLocation();
  const email = location.state?.email;

 
  const handlePayment = async () => {
    if (!email) return alert("Missing email!");
  
    // Simulate a delay like a real payment
    setTimeout(() => {
      alert("✅ Test Payment Successful!");
      window.location.href = "/thank-you-subscription";
    }, 1000); // 1 second delay for realism
  };
  

  return (
    <section className="payment__section">
      <Container>
        <Row className="justify-content-center mt-5">
          <Col lg="10">
            <h2 className="text-center mb-5 heading__main">Why Subscribe?</h2>
            <Row className="g-4">
              <Col md="6" lg="3">
                <Card className="feature__card text-center">
                  <CardBody>
                    <CardTitle tag="h5">💸 No Service Charges</CardTitle>
                    <CardText>Enjoy zero service fees on all future bookings — forever.</CardText>
                  </CardBody>
                </Card>
              </Col>
              <Col md="6" lg="3">
                <Card className="feature__card text-center">
                  <CardBody>
                    <CardTitle tag="h5">🆕 Early Access</CardTitle>
                    <CardText>Be the first to explore new tours and experiences before anyone else.</CardText>
                  </CardBody>
                </Card>
              </Col>
              <Col md="6" lg="3">
                <Card className="feature__card text-center">
                  <CardBody>
                    <CardTitle tag="h5">🎁 Exclusive Discounts</CardTitle>
                    <CardText>Get special member-only deals and promo codes every month.</CardText>
                  </CardBody>
                </Card>
              </Col>
              <Col md="6" lg="3">
                <Card className="feature__card text-center">
                  <CardBody>
                    <CardTitle tag="h5">🚀 Priority Support</CardTitle>
                    <CardText>Access faster support with priority assistance for your bookings.</CardText>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row className="justify-content-center mt-5">
          <Col lg="6" className="text-center">
            <h2 className="heading__main">Complete Your Subscription</h2>
            <p>
              Subscribing with: <strong>{email || "unknown email"}</strong>
            </p>

            <Button className="btn pay__btn mt-3" onClick={handlePayment}>
              Pay ₹199
            </Button>

            <Link to="/home">
              <Button className="btn home__btn mt-3 ms-2">
                Back to Home
              </Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Payment;



 