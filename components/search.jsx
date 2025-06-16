import Form from "react-bootstrap/Form";
import React, { useRef } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useRouter } from "next/navigation";

import "bootstrap/dist/css/bootstrap.min.css";


function Search() {
  const searchRef = useRef();
  const router = useRouter(); 

  const handleSearch = () => {
    let title = searchRef.current.value;
    router.push(`/series?title=${title}`);
  };

  return (
    <Container id="header">
      <Row className=" justify-content-center mb-2 w-100">
        <Col xs={9} md={6} xl={4} className="p-1">
          <Form className="">
            <Form.Control type="text" className="" ref={searchRef} placeholder="example: Game of Thrones" />
          </Form>
        </Col>
        <Col xs="auto" className="p-1">
          <Button variant="outline-light" onClick={handleSearch}>
            Find
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Search;
