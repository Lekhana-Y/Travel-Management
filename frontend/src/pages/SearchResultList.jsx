import React, { useState, useEffect } from "react";
import CommonSection from "./../shared/CommonSection";
import { Container, Row, Col, FormGroup, Label, Input } from "reactstrap";
import Newsletter from './../shared/Newsletter';
import { useLocation } from "react-router-dom";
import TourCard from "./../shared/TourCard";

const SearchResultList = () => {
  const location = useLocation();
  const [data] = useState(location.state);
  const [filteredData, setFilteredData] = useState(data);
  const [filterOption, setFilterOption] = useState("");

  useEffect(() => {
    let sortedData = [...data];

    if (filterOption === "distance") {
      sortedData.sort((a, b) => a.distance - b.distance); // Ascending distance
    } else if (filterOption === "price") {
      sortedData.sort((a, b) => a.price - b.price); // Ascending price
    } else if (filterOption === "reviews") {
      sortedData.sort((a, b) => b.reviews.length - a.reviews.length); // Descending reviews
    }

    setFilteredData(sortedData);
  }, [filterOption, data]);

  return (
    <>
      <CommonSection title={"Tour Search Result"} />
      <section>
        <Container>
          <Row className="mb-4">
            <Col lg="4">
              <FormGroup>
                <Label for="filterSelect">Filter By</Label>
                <Input
                  id="filterSelect"
                  name="filterSelect"
                  type="select"
                  value={filterOption}
                  onChange={(e) => setFilterOption(e.target.value)}
                >
                  <option value="">-- Select Filter --</option>
                  <option value="distance">Distance (Asc)</option>
                  <option value="price">Cost (Asc)</option>
                  <option value="reviews">Reviews (Desc)</option>
                </Input>
              </FormGroup>
            </Col>
          </Row>

          <Row>
            {filteredData.length === 0 ? (
              <h4 className="text-center">No tour found</h4>
            ) : (
              filteredData.map((tour) => (
                <Col lg="3" className="mb-4" key={tour._id}>
                  <TourCard tour={tour} />
                </Col>
              ))
            )}
          </Row>
        </Container>
      </section>
      <Newsletter />
    </>
  );
};

export default SearchResultList;
