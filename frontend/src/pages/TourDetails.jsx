import React, { useRef, useState, useEffect, useContext } from "react";
import '../styles/tour-details.css';
import { Container, Row, Col, Form, ListGroup, Button } from "reactstrap";
import { useParams } from "react-router-dom";
import calculateAvgRating from "../utils/avgRating";
import avatar from '../assets/images/avatar.jpg';
import Booking from "../components/Booking/Booking";
import Newsletter from "../shared/Newsletter";
import { AuthContext } from "../context/authContext";
import { BASE_URL } from './../utils/config';
import useFetch from './../hooks/useFetch';
import MapComponent from '../components/MapComponent';


const TourDetails = () => {
  const { id } = useParams();
  const reviewMsgRef = useRef("");
  const [tourRating, setTourRating] = useState(null);
  const [weather, setWeather] = useState(null);
  const [showWeather, setShowWeather] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const { user } = useContext(AuthContext);

  const { data: tour, loading, error } = useFetch(`${BASE_URL}/tours/${id}`);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [tour]);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(`${BASE_URL}/weather/${tour.city}`);
        const result = await res.json();
        if (!res.ok) {
          return alert(result.message);
        }
        setWeather(result.data);
      } catch (err) {
        alert("Weather fetch failed");
      }
    };

    if (tour && showWeather) {
      fetchWeather();
    }
  }, [tour, showWeather]);

  const submitHandler = async e => {
    e.preventDefault();
    const reviewText = reviewMsgRef.current.value;

    try {
      if (!user) {
        return alert('Please sign in to leave a review.');
      }

      const reviewObj = {
        username: user?.username,
        reviewText,
        rating: tourRating,
      };

      const res = await fetch(`${BASE_URL}/review/${id}`, {
        method: 'post',
        headers: { 'content-type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(reviewObj)
      });

      const result = await res.json();
      if (!res.ok) return alert(result.message);

      alert(result.message);
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <h4 className="text-center pt-5">Loading.......</h4>;
  if (error) return <h4 className="text-center pt-5">{error}</h4>;
  if (!tour) return <h4 className="text-center pt-5">Tour not found</h4>;

  const { photo, title, desc, price, reviews, address, city, distance, maxGroupSize } = tour;
  const { totalRating, avgRating } = calculateAvgRating(reviews);
  const options = { day: "numeric", month: "long", year: "numeric" };

  return (
    <>
      <section>
        <Container>
          <Row>
            <Col lg="8">
              <div className="tour__content">
                <img src={photo} alt={title} />
                <div className="tour__info">
                  <h2>{title}</h2>
                  <div className="d-flex align-items-center gap-5">
                    <span className="d-flex align-items-center gap-1">
                      <i className="ri-star-fill" style={{ color: "var(--secondary-color)" }}></i>
                      {avgRating === 0 ? null : avgRating}
                      {totalRating === 0 ? "Not Rated" : (<span>({reviews?.length})</span>)}
                    </span>
                    <span><i className="ri-map-pin-user-fill"></i>{address}</span>
                  </div>

                  <div className="tour__extra-details">
                    <span><i className="ri-map-pin-2-fill"></i>{city}</span>
                    <span><i className="ri-money-dollar-circle-line"></i>${price}</span>
                    <span><i className="ri-map-pin-time-line"></i>{distance} k/m</span>
                    <span><i className="ri-group-line"></i>{maxGroupSize} people</span>
                  </div>

                  <h5>Description</h5>
                  <p>{desc}</p>

                  {/* 🌦️ Weather + Google Maps */}
                  <div className="mb-3 d-flex flex-wrap gap-3">
                    {!showWeather && (
                      <Button className="btn primary__btn" onClick={() => setShowWeather(true)}>
                        Check Weather in {city}
                      </Button>
                    )}
                    <Button
                      className="btn primary__btn"
                      onClick={() => setShowMap(!showMap)}
                    >
                      {showMap ? 'Hide Map' : `Open ${city} in Google Maps`}
                    </Button>
                  </div>

                  <Button
                    className="btn secondary__btn"
                    onClick={() =>
                      window.open(
                        `https://www.google.com/maps/search/?api=1&query=airports+near+${encodeURIComponent(city)}`,
                        "_blank"
                      )
                    }
                  >
                    Nearby Airports
                  </Button>
                  <Button
                    className="btn secondary__btn"
                    onClick={() =>
                      window.open(
                        `https://www.google.com/maps/search/?api=1&query=restaurants+near+${encodeURIComponent(city)}`,
                        "_blank"
                      )
                    }
                  >
                    Nearby Restaurants
                  </Button>
                  <Button
                    className="btn secondary__btn"
                    onClick={() =>
                      window.open(
                        `https://www.google.com/maps/search/?api=1&query=hotels+near+${encodeURIComponent(city)}`,
                        "_blank"
                      )
                    }
                  >
                    Nearby Hotels
                  </Button>

                  {/* Weather Section */}
                  {weather && weather.forecast && (
                    <div className="weather__info mt-3">
                      <h6>🌦️ 5-Day Weather Forecast for {weather.city}</h6>
                      <div className="weather__forecast-list d-flex flex-wrap gap-3">
                        {weather.forecast.map((day, index) => (
                          <div className="weather__forecast-card" key={index}>
                            <p><strong>{day.date}</strong></p>
                            <img src={day.icon} alt="weather icon" />
                            <p>{day.condition}</p>
                            <p>{day.temp}°C</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Google Maps Embed Section */}
                  {showMap && (
  <div className="map__section mt-4">
    <h6>🗺️ Map View - {city}</h6>
    <MapComponent coordinates={[tour.longitude || 113.9213, tour.latitude || -0.7893]} zoom={6} />
  </div>
)}

                </div>

                <div className="tour__reviews mt-4">
                  <h4>Reviews ({reviews?.length})</h4>
                  <Form onSubmit={submitHandler}>
                    <div className="d-flex align-items-center gap-3 mb-4 rating__group">
                      {[1, 2, 3, 4, 5].map(num => (
                        <span key={num} onClick={() => setTourRating(num)}>{num} <i className="ri-star-s-fill"></i></span>
                      ))}
                    </div>
                    <div className="review__input">
                      <input type="text" ref={reviewMsgRef} placeholder="Share your thoughts" required />
                      <button className="btn primary__btn text-white" type="submit">Submit</button>
                    </div>
                  </Form>

                  <ListGroup className="user__reviews">
                    {reviews?.map((review, idx) => (
                      <div className="review__item" key={idx}>
                        <img src={avatar} alt="avatar" />
                        <div className="w-100">
                          <div className="d-flex align-items-center justify-content-between">
                            <div>
                              <h5>{review.username}</h5>
                              <p>{new Date(review.createdAt).toLocaleDateString("en-US", options)}</p>
                            </div>
                            <span className="d-flex align-items-center">{review.rating}<i className="ri-star-s-fill"></i></span>
                          </div>
                          <h6>{review.reviewText}</h6>
                        </div>
                      </div>
                    ))}
                  </ListGroup>
                </div>
              </div>
            </Col>

            <Col lg="4">
              <Booking tour={tour} avgRating={avgRating} />
            </Col>
          </Row>
        </Container>
        <Newsletter />
      </section>
    </>
  );
};

export default TourDetails;
