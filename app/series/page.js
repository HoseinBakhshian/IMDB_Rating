"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
const axios = require("axios");

import Item from "../../components/item";
import { Col, Container, Row } from "react-bootstrap";

function Serie() {
  const [result, setResult] = useState({});

  const searchParams = useSearchParams();
  const title = searchParams.get("title");
  const router = useRouter();

  useEffect(() => {
    axios
      .get(`https://www.omdbapi.com/?apikey=7072b367&s=${title}&type=series`)
      .then(function (res) {
        setResult(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [searchParams]);

  const handleClick = (id) => {
    router.push(`/series/${id}`);
  };

  return (
    <div>
      <Container className="content-wrapper">
        <Row className="justify-content-center gy-3" xs={2} md={4} lg={5}>
          {result.Response === "False" ? (
            <div className="w-100 fs-5 fw-bold text-center">No Results Found</div>
          ) : (
            result.Search?.map((item, index) => (
              <Col key={index} onClick={() => handleClick(item.imdbID)}>
                <Item info={item} />
              </Col>
            ))
          )}
        </Row>
      </Container>{" "}
      <div id="myChart"></div>
      {/* <div className="space"></div> */}
    </div>
  );
}

export default Serie;
