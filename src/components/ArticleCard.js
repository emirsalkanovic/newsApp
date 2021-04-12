import React from "react";
import { Card } from "react-bootstrap";
import Image from "../assets/img/image-default.png";

const cardContainer = {
  borderBottom: ".5px solid #5967c3",
  borderRadius: "7px",
  marginBottom: "20px"
};

const titleStyle = {
  fontSize: ".8rem",
  fontWeiht: "bold"
};

const textStyle = {
  fontSize: "0.65rem"
};

const buttonStyle = {
  color: "#5967c3",
  cursor: "pointer"
};

const buttonContainer = {
  dispaly: "flex",
  minHeight: "100%"
};

const ArticleCard = props => {
  return (
    <div style={cardContainer}>
      <Card
        style={{
          width: "18rem",
          margin: "0 auto",
          minHeight: "400px",
          border: "none"
        }}
      >
        <Card.Img
          variant="top"
          src={props.article.urlToImage ? props.article.urlToImage : Image}
        />
        <Card.Body>
          <Card.Title style={titleStyle}>{props.article.title}</Card.Title>
          <Card.Text style={textStyle}>{props.article.description}</Card.Text>
        </Card.Body>
      </Card>
      <div onClick={props.onViewFullArticle} style={buttonContainer}>
        <p style={buttonStyle}>View full article </p>
      </div>
    </div>
  );
};

export default ArticleCard;
