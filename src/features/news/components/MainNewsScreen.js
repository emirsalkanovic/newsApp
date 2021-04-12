import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

import {
  getAllNews,
  searchNews,
  selectArticleRequest
} from "../actions/news-actions";
import { LoadingSpinner } from "../../../components/LoadingSpinner";
import "../style/news-style.css";
import { SearchBar } from "../../../components/SearchBar";
import ArticleCard from "../../../components/ArticleCard";
import PaginationBar from "../../../components/PaginationBar";

const buttonHolder = {
  height: "40px",
  width: "40px",
  borderRadius: "12px",
  backgroundColor: "#5967c3",
  marginLeft: "20px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  alignSelf: "flex-start"
};

const backButton = {
  height: "20px",
  width: "20px",
  color: "white",
  cursor: "pointer"
};

const MainNewsScreen = props => {
  const dispatch = useDispatch();
  const history = useHistory();
  const news = useSelector(state => state.news.results);
  const isLoading = useSelector(state => state.news.isLoading);
  const isSearching = useSelector(state => state.searchResults.isSearching);

  const [searchTerm, setSearchTerm] = useState("");
  const [searching, setSearching] = useState(false);
  const [sortBy, setSortyBy] = useState("publishedAt");
  const [showMore, setShowMore] = useState(false);
  const [results, setResults] = useState([]);

  const [currentPaginationPage, setCurrentPaginationPage] = useState(1);
  const [disabledNext, setDisabledNext] = useState(false);
  const [disabledPrevious, setDisabledPrevious] = useState(true);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  const searchResults = useSelector(state => state.searchResults.searchResults);

  useEffect(() => {
    setResults(searchResults);
    setSearching(false);
  }, [searchResults]);

  useEffect(() => {
    if (news.length < 1) dispatch(getAllNews());
  }, []);

  useEffect(() => {
    if (searchTerm.length > 0) {
      setSearching(true);
      const timeoutId = setTimeout(
        () => dispatch(searchNews(searchTerm, sortBy)),
        1000
      );
      return () => clearTimeout(timeoutId);
    }
    if (searchTerm.length > 0 && searching) {
      const timeoutId = setTimeout(
        () => dispatch(searchNews(searchTerm, sortBy)),
        1000
      );
      return () => clearTimeout(timeoutId);
    } else {
      setSearching(false);
      setResults([]);
    }

    if (results.length > 0 && searchTerm.length === 0) {
      setResults([]);
    }

    if (searchTerm.length > 0 && currentPaginationPage !== 1) {
      let data = renderNewsData();
      if (currentPaginationPage > Math.ceil(data.length / itemsPerPage)) {
        setCurrentPaginationPage(1);
        setDisabledPrevious(true);
        setDisabledNext(false);
      }
    }
  }, [searchTerm, sortBy]);

  const searchFunction = searchTerm => {
    setSearchTerm(searchTerm);
  };

  const onSearchBackButton = () => {
    setSearchTerm("");
  };

  const handlePaginationPrevious = () => {
    const current = currentPaginationPage - 1;
    setCurrentPaginationPage(current);
    setDisabledNext(false);

    if (current === 1) {
      setDisabledPrevious(true);
    }
  };

  const handlePaginationNext = () => {
    const data = renderNewsData();
    const current = currentPaginationPage + 1;
    setCurrentPaginationPage(current);
    setDisabledPrevious(false);

    if (current === Math.ceil(data.length / itemsPerPage)) {
      setDisabledNext(true);
    }
  };

  const onSortBy = value => {
    if (value === sortBy) {
      return;
    }
    setSortyBy(value);
  };

  const handlePaginationClick = e => {
    const data = renderNewsData();
    const clicked = Number(e.target.id);
    setCurrentPaginationPage(clicked);

    if (clicked === 1) {
      setDisabledPrevious(true);
      setDisabledNext(false);
    } else if (clicked === Math.ceil(data.length / itemsPerPage)) {
      setDisabledNext(true);
      setDisabledPrevious(false);
    } else {
      setDisabledNext(false);
      setDisabledPrevious(false);
    }
  };

  const calculateNumPage = () => {
    let data = renderNewsData();
    return data.length;
  };

  const checkPaginationDisplay = () => {
    let numberOfItems = calculateNumPage();
    if (numberOfItems > itemsPerPage) {
      return (
        <PaginationBar
          previous={handlePaginationPrevious}
          next={handlePaginationNext}
          click={handlePaginationClick}
          perPage={itemsPerPage}
          numPag={calculateNumPage()}
          activepagenum={currentPaginationPage}
          disabledprevious={disabledPrevious}
          disablednext={disabledNext}
          enableFirstLast="false"
        />
      );
    } else {
      return null;
    }
  };

  const renderNewsData = () => {
    if (searchTerm.length > 0 && results.length > 0) {
      return results;
    } else {
      if (showMore) {
        return news;
      } else {
        return news.slice(0, 20);
      }
    }
  };

  const onShowMoreClick = () => {
    setShowMore(!showMore);
    setCurrentPaginationPage(1);
  };

  const onViewArticle = article => {
    history.push("/details");
    dispatch(selectArticleRequest(article));
  };

  const renderContent = () => {
    if (isSearching) {
      return (
        <div className="mainLoadingContainer">
          <LoadingSpinner />;
        </div>
      );
    }
    if (searchTerm.length > 0 && searchResults.length > 0 && !searching) {
      const data = renderNewsData();

      const indexOfLastItem = currentPaginationPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;

      const newsData = data.slice(indexOfFirstItem, indexOfLastItem);
      return (
        <div className="mainContainer">
          <div style={buttonHolder} onClick={onSearchBackButton}>
            <FontAwesomeIcon style={backButton} icon={faAngleLeft} />
          </div>
          <div className="sortContainer">
            <div
              onClick={() => {
                onSortBy("popularity");
              }}
              className="sortItem"
            >
              <p
                className={
                  sortBy === "popularity"
                    ? "activeSortItemText"
                    : "sortItemText"
                }
              >
                Popularity
              </p>
            </div>
            <div onClick={() => onSortBy("relevancy")} className="sortItem">
              <p
                className={
                  sortBy === "relevancy" ? "activeSortItemText" : "sortItemText"
                }
              >
                Relevance
              </p>
            </div>
            <div onClick={() => onSortBy("publishedAt")} className="sortItem">
              <p
                className={
                  sortBy === "publishedAt"
                    ? "activeSortItemText"
                    : "sortItemText"
                }
              >
                Published date
              </p>
            </div>
          </div>
          <Row>
            {newsData.map((article, key) => {
              return (
                <Col key={key} xs={12} md={6} lg={4} xl={3}>
                  <ArticleCard
                    onViewFullArticle={() => onViewArticle(article)}
                    article={article}
                  />
                </Col>
              );
            })}
          </Row>
        </div>
      );
    }
    if (
      searchTerm.length > 0 &&
      searchResults.length === 0 &&
      !isSearching &&
      !searching
    ) {
      return (
        <div className="mainLoadingContainer">
          <h1>NO DATA FOUND</h1>
        </div>
      );
    } else {
      const data = renderNewsData();

      const indexOfLastItem = currentPaginationPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;

      const newsData = data.slice(indexOfFirstItem, indexOfLastItem);
      return (
        <div className="mainContainer">
          <Row>
            {newsData.map((article, key) => {
              return (
                <Col key={key} xs={12} md={6} lg={4} xl={3}>
                  <ArticleCard
                    onViewFullArticle={() => onViewArticle(article)}
                    article={article}
                  />
                </Col>
              );
            })}
          </Row>
        </div>
      );
    }
  };

  if (isLoading) {
    return (
      <div className="mainLoadingContainer">
        <LoadingSpinner />;
      </div>
    );
  } else {
    return (
      <Container style={{ padding: "0px" }} fluid>
        <SearchBar searchTerm={searchTerm} onSearch={searchFunction} />
        {checkPaginationDisplay()}
        {renderContent()}
        {checkPaginationDisplay()}
        <div className="showMoreButtonHolder">
          <button onClick={onShowMoreClick}>
            {showMore ? "Show Less" : "Show More"}
          </button>
        </div>
      </Container>
    );
  }
};

export default MainNewsScreen;
