import React from "react";

const PaginationBar = props => {
  const paginationContainer = {
    display: "flex",
    widht: "50%",
    justifyContent: "space-around",
    alignItems: "center",
    height: "50px",
    alignSelf: "center",
    fontSize: "0.8rem"
  };

  const numberStyle = {
    color: "gray",
    cursor: "pointer",
    width: "50px",
    justifyContent: "center",
    display: "flex"
  };

  const activeNumberStyle = {
    color: "#5967c3",
    fontWeight: "bold",
    cursor: "pointer",
    width: "50px",
    justifyContent: "center",
    display: "flex"
  };

  const pagFirst = {
    color: "#5967c3",
    fontSize: "bold",
    cursor: "pointer"
  };
  const pagFirstDisabled = {
    color: "gray",
    cursor: "none"
  };
  const pagPrevious = {
    color: "#5967c3",
    fontSize: "bold",
    cursor: "pointer",
    listStyleType: "none"
  };
  const pagPreviousDisabled = {
    color: "gray",
    cursor: "none",
    listStyleType: "none"
  };
  const pagNext = {
    color: "#5967c3",
    fontSize: "bold",
    cursor: "pointer",
    listStyleType: "none"
  };
  const pagNextDisabled = {
    color: "gray",
    cursor: "none",
    listStyleType: "none"
  };
  const pagLast = {
    color: "#5967c3",
    fontSize: "bold",
    cursor: "pointer"
  };
  const pagLastDisabled = {
    color: "gray",
    cursor: "none"
  };

  const calculatePageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(props.numPag / props.perPage); i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const checkNumberStyle = number => {
    if (number === props.activepagenum) {
      return activeNumberStyle;
    }
    return numberStyle;
  };

  const renderPageNumbers = calculatePageNumbers().map(number => {
    return (
      <li
        key={number}
        id={number}
        onClick={props.click}
        style={checkNumberStyle(number)}
      >
        {number}
      </li>
    );
  });
  return (
    <ul style={paginationContainer}>
      {props.enableFirstLast === "true" && (
        <li
          onClick={props.enabledFirst ? props.first : null}
          style={props.enabledFirst ? pagFirst : pagFirstDisabled}
        >
          first
        </li>
      )}
      <li
        onClick={props.disabledprevious ? null : props.previous}
        style={props.disabledprevious ? pagPreviousDisabled : pagPrevious}
      >
        previous
      </li>

      {renderPageNumbers}
      <li
        onClick={props.disablednext ? null : props.next}
        style={props.disablednext ? pagNextDisabled : pagNext}
      >
        next
      </li>
      {props.enableFirstLast === "true" && (
        <li
          onClick={props.enabledLast ? props.last : null}
          style={props.enabledLast ? pagLast : pagLastDisabled}
        >
          last
        </li>
      )}
    </ul>
  );
};

export default PaginationBar;
