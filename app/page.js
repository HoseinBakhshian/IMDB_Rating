"use client";
import Form from "react-bootstrap/Form";
import React, { useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Col, Row } from "react-bootstrap";
import { useRouter } from "next/navigation";

function Home() {
  const searchRef = useRef();
  const router = useRouter();

  const handleSearch = () => {
    let title = searchRef.current.value;
    router.push(`/series?title=${title}`);
  };

  return (
    <div className="landing-page">
      <Row>
        <Col lg={5} className="search-panel text-center">
          <h2 className="fs-1">Explore <span style={{color:"#FFD404",fontWeight:"bold"}}>IMDB</span> Ratings</h2>
          <Row className=" justify-content-center mb-2 mt-4 w-100">
            <Col xs={10} md={8} lg={10} className="p-1">
              <Form className="">
                <Form.Control type="text" placeholder="example: Game of Thrones" ref={searchRef} />
              </Form>
            </Col>
            <Col lg={5} className="p-1">
              <Button variant="outline-light" onClick={handleSearch}>
                Find
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
export default Home;
