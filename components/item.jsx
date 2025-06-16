import React from "react";
import Card from 'react-bootstrap/Card';


function Item({info}) {
  return (
      <Card className="h-100 pointer" >
        <Card.Img className="ratio" variant="top" src={info.Poster} />
        <Card.Body>
          <Card.Title>{info.Title}</Card.Title>
          <Card.Text style={{color:"black"}}>{info.Year}</Card.Text>
        </Card.Body>
      </Card>
  );
}

export default Item;


