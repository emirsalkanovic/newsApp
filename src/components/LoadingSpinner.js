import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export const LoadingSpinner = () => {
  return (
    <div className="loadingScreenContainer">
      <FontAwesomeIcon className="loadingIcon" size="6x" icon={faSpinner} />
    </div>
  );
};
