import React from "react";
import { useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import Image from "../../../assets/img/image-default.png";

const cardContainer = {
  display: "flex",
  width: "100%",
  height: "100vh",
  flexDirection: "column"
};

const cardHeaderHolder = {
  width: "100%",
  height: "55px",
  backgroundColor: "#5967c3",
  alignItems: "center",
  display: "flex"
};

const buttonHolder = {
  height: "40px",
  width: "40px",
  borderRadius: "12px",
  backgroundColor: "white",
  marginLeft: "10%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer"
};

const backButton = {
  height: "20px",
  width: "20px"
};

const cardMainContentHolder = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  flex: 1,
  marginLeft: "10%",
  marginRight: "10%",
  marginBottom: "10px"
};

const header = {
  marginTop: "20px",
  fontSize: "1.2rem",
  color: "black",
  fontWeight: "bold",
  textAlign: "center"
};

const imageHolder = {
  minHeigt: "100px",
  minWidth: "100px",
  maxHeight: "500px",
  maxWidth: "500px",
  backgroundColor: "gray"
};

const image = {
  height: "100%",
  width: "100%"
};

const description = {
  fontSize: "1rem",
  color: "gray",
  textAlign: "center",
  fontWeight: "500"
};

const sourceText = {
  fontSize: "0.6rem",
  color: "gray",
  borderBottom: "0.3px solid #5967c3",
  padding: "0px",
  margin: "3px",
  textAlign: "center"
};

const content = {
  marginTop: "5%",
  fontSize: "1rem",
  color: "black",
  textAlign: "center",
  overflowY: "auto",
  maxHeight: "200px"
};

const NewsDetailsScreen = props => {
  const onBackButton = () => {
    props.history.goBack();
  };

  const selectedArticle = useSelector(state => state.news.selectedArticle);

  return (
    <div style={cardContainer}>
      <div style={cardHeaderHolder}>
        <div style={buttonHolder} onClick={onBackButton}>
          <FontAwesomeIcon style={backButton} icon={faAngleLeft} />
        </div>
      </div>
      <div style={cardMainContentHolder}>
        <p style={header}>{selectedArticle.title}</p>
        <p style={description}>{selectedArticle.description}</p>
        <div style={imageHolder}>
          <img
            style={image}
            src={
              selectedArticle.urlToImage ? selectedArticle.urlToImage : Image
            }
            alt="articleImage"
          />
        </div>
        <p style={sourceText}>Source: {selectedArticle.source.name}</p>
        <p style={sourceText}>Author: {selectedArticle.author}</p>
        <p style={sourceText}>Published at: {selectedArticle.publishedAt}</p>
        <p style={content}>{selectedArticle.content}</p>
      </div>
    </div>
  );
};

export default NewsDetailsScreen;
