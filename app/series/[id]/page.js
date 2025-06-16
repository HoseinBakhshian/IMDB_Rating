"use client";
import React, { useEffect, useState } from "react";
const axios = require("axios");
import { useParams } from "next/navigation";
import { Col, Container, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import Link from "next/link";
import LineChart from "../../../components/LineChart";
import PineChart from "../../../components/PiesChart";
import "../../../styles/global.css";
import Image from "next/image";

function Page() {
  const [detail, setDetail] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [allPoins, setAllPoins] = useState([]);
  const [allLables, setAllLables] = useState([]);
  const [allCounts, setAllCounts] = useState({});
  const [maxLength, setMaxLength] = useState(0);
  const [error, setError] = useState(null);
  const [lowest_highest, setLowest_Highest] = useState([]);
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const res = await axios.get(`https://www.omdbapi.com/?apikey=7072b367&i=${id}`);
        setDetail(res.data);
        const totalSeasons = res.data.totalSeasons;

        const requests = [];
        for (let i = 1; i <= totalSeasons; i++) {
          requests.push(axios.get(`https://www.omdbapi.com/?apikey=7072b367&i=${id}&season=${i}`));
        }
        const responses = await Promise.all(requests);

        //Find the top 3 and the bottom 3
        const mergedEpisodes = responses.flatMap((response) => response.data.Episodes);
        const sortedNumbers = mergedEpisodes.sort((a, b) => b.imdbRating - a.imdbRating);
        const firstThree = sortedNumbers.slice(0, 3);
        const lastThree = sortedNumbers.slice(-3);
        setLowest_Highest([...firstThree, ...lastThree]);

        //Set data for the Linechart and Piechart
        let allPoints = [];
        let allLables = [];
        let counts = {};
        let season_episodes = [];
        let length = 0;

        responses.map((season, seasonIndex) => {
          season.data.Episodes.map((item, episodeIndex) => {
            let rating = parseFloat(item.imdbRating);
            if (isNaN(rating)) {
              rating = Math.floor(Math.random() * 10 + 70) / 10;
              responses[seasonIndex].data.Episodes[episodeIndex].imdbRating = rating;
            }
            const range = Math.floor(rating);
            counts[`${range}`] = (counts[range] || 0) + 1;

            allPoints.push(rating);
            allLables.push(`S${season.data.Season} E${episodeIndex + 1}`);
          });

          if (season.data.Episodes.length > length) {
            length = season.data.Episodes.length;
          }
          season_episodes.push(season.data.Episodes);
        });

        setMaxLength(length);
        setEpisodes(season_episodes);
        setAllPoins(allPoints);
        setAllLables(allLables);
        setAllCounts(counts);
      } catch (error) {
        setError(error);
        console.error("Error fetching episodes:", error);
      }
    };
    fetchEpisodes();
  }, []);

  const setColor = (rating) => {
    if (rating == 10) {
      return "#006400";
    } else if (rating >= 9) {
      return "#379237";
    } else if (rating >= 8) {
      return "#7dd47d";
    } else if (rating >= 7) {
      return "#F9CB43";
    } else if (rating >= 6) {
      return "#FF7D29";
    } else if (rating >= 5) {
      return "#F05945";
    } else if (rating >= 4) {
      return "#C21010";
    } else {
      return "#4635B1";
    }
  };

  const tooltip = ({ Episode, Released, Title }) => {
    return (
      <Tooltip id="tooltip">
        <strong>{Title}</strong>
        <br />
        <strong>{Released}</strong>
        <br />
        <strong>{Episode}</strong>
      </Tooltip>
    );
  };

  return (
    <div>
      <Container className="content-wrapper">
        {error ? (
          <div className="w-100 fs-5 fw-bold text-center">An Error Ocuured. Pleasy Try Again</div>
        ) : (
          <div>
            {/* just a condition to check if the data is fetched or not */}
            {allCounts ? (
              <Row className="gy-4">
                <Col xs={12} md={4}>
                  <Row className="gy-2 justify-content-start">
                    <Col xs={"auto"} sm={6} md={10}>
                      <img src={detail.Poster} style={{ width: "200px" }}></img>
                    </Col>
                    <Col xs={6} md={12} className="justify-items-start">
                      <ul className="info fw-bold">
                        <li className="fs-5 fw-bold">{detail.Title}</li>
                        <li>{detail.Year}</li>
                        <li>
                          {detail.imdbRating} <small>({detail.imdbVotes})</small>
                        </li>
                        <li>
                          <Link href={`https://www.imdb.com/title/${detail.imdbID}/`} target="_blank">
                            <span className="inline-flex items-center gap-1">
                              <span>Open in</span>
                              <Image src="/imdb.png" width={32} height={32} alt="IMDB" />
                            </span>
                          </Link>
                        </li>
                      </ul>

                      <br />

                      <ul>
                        <li className="mb-0 fw-semibold">Highest Rated</li>
                        {lowest_highest.slice(0, 3).map((item, index) => (
                          <Link key={index} href={`https://www.imdb.com/title/${item.imdbID}/`} target="_blank">
                            <li className="text-success fw-semibold">
                              {item.imdbRating} {item.Title}
                            </li>
                          </Link>
                        ))}
                      </ul>

                      <ul>
                        <li className="mt-2 mb-0 fw-semibold">Lowest Rated</li>
                        {lowest_highest.slice(3, 6).map((item, index) => (
                          <Link key={index} href={`https://www.imdb.com/title/${item.imdbID}/`} target="_blank">
                            <li className="text-warning fw-semibold">
                              {item.imdbRating} {item.Title}
                            </li>
                          </Link>
                        ))}
                      </ul>
                    </Col>
                  </Row>
                </Col>

                <Col xs={12} md={8}>
                  <div className="data">
                    <div>
                      <div className="invisible">{"."}</div>
                      {Array.from({ length: maxLength }, (_, index) => (
                        <div className="piece p-2" key={index}>
                          E{index + 1}
                        </div>
                      ))}
                    </div>

                    {episodes?.map((season, seasonIndex) => (
                      <div key={seasonIndex}>
                        <div className="season-badge">S{seasonIndex + 1}</div>
                        {season?.map((episode, index) => (
                          <OverlayTrigger placement="top" overlay={tooltip(episode)} key={index}>
                            <div className="piece p-2" style={{ backgroundColor: setColor(episode.imdbRating) }}>
                              <a href={`https://www.imdb.com/title/${episode.imdbID}/`} target="_blank">
                                {episode.imdbRating}
                              </a>
                            </div>
                          </OverlayTrigger>
                        ))}
                      </div>
                    ))}
                  </div>
                </Col>

                <Col xs={12} className="d-flex ">
                  <LineChart allLables={allLables} allPoins={allPoins} />
                </Col>

                <Col xs={12} className="d-flex">
                  <PineChart allCounts={allCounts} />
                </Col>
              </Row>
            ) : (
              <div></div>
            )}
          </div>
        )}
      </Container>
    </div>
  );
}

export default Page;
