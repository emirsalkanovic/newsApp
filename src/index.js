import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import confugureStore from "./config/store";
import "bootstrap/dist/css/bootstrap.min.css";

import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import NewsDetailsScreen from "./features/news/components/NewsDetailsScreen";

const store = confugureStore();

const routing = (
  <Provider store={store}>
    <Router>
      <div className="appMainContainer">
        <Switch>
          <Route exact path="/" component={App} />
          <Route path="/details" component={NewsDetailsScreen} />
        </Switch>
      </div>
    </Router>
  </Provider>
);
ReactDOM.render(routing, document.getElementById("root"));

reportWebVitals();
