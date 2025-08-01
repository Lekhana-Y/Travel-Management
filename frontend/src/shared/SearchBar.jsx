import React, { useRef } from "react";
import './search-bar.css';
import { Col, Form, FormGroup } from 'reactstrap';
import { BASE_URL } from "./../utils/config";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const locationRef = useRef('');
  const distanceRef = useRef(0);
  const maxGroupSizeRef = useRef(0);
  const navigate = useNavigate();

  const searchHandler = async () => {
    const location = locationRef.current.value.trim();
    const distance = distanceRef.current.value;
    const maxGroupSize = maxGroupSizeRef.current.value;

    if (!location) {
      alert('Please enter the location');
      return;
    }

    const endpoint = `${BASE_URL}/tours/search/getTourBySearch?city=${location}&distance=${distance}&maxGroupSize=${maxGroupSize}`;

    try {
      const res = await fetch(endpoint);
      if (!res.ok) throw new Error("Something went wrong");

      const result = await res.json();
      navigate(`/tours/search?city=${location}&distance=${distance}&maxGroupSize=${maxGroupSize}`, {
        state: result.data,
      });
    } catch (err) {
      alert(err.message || "Search failed");
    }
  };

  return (
    <Col lg="12">
      <div className="search__bar">
        <Form className="d-flex align-items-center gap-4">
          <FormGroup className="d-flex gap-3 form__group form__group-fast">
            <span><i className="ri-map-pin-line"></i></span>
            <div>
              <h6>Location</h6>
              <input type="text" placeholder="Where are you going?" ref={locationRef} />
            </div>
          </FormGroup>

          <span className="search__icon" type="submit">
            <i className="ri-search-line" onClick={searchHandler}></i>
          </span>
        </Form>
      </div>
    </Col>
  );
};

export default SearchBar;
