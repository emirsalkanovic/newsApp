import * as types from "./news-aciton-types";
import { axiosInstance } from "../../../config/axios";

const API_KEY = "676d4e7cff57460aa2f7517eaa5671a5";

function fetchAllNewsRequest() {
  return {
    type: types.GET_ALL_NEWS_REQUEST
  };
}

function fetchAllNewsSuccess(response) {
  return {
    type: types.GET_ALL_NEWS_SUCCESS,
    payload: response.data.articles
  };
}

function fetchAllNewsFailure(error) {
  return {
    type: types.GET_ALL_NEWS_FAILURE,
    payload: error
  };
}

function searchNewsRequest(query) {
  return {
    type: types.SEARCH_NEWS_REQUEST
  };
}

function searchNewsSuccess(response) {
  return {
    type: types.SEARCH_NEWS_SUCCESS,
    payload: response.data.articles
  };
}

function searchNewsFailure(error) {
  return {
    type: types.SEARCH_NEWS_FAILURE,
    payload: error
  };
}

function selectArticle(article) {
  return {
    type: types.SET_SELECTED_ARTICLE,
    payload: article
  };
}

export function getAllNews() {
  return async dispatch => {
    dispatch(fetchAllNewsRequest());
    try {
      const url = `top-headlines?country=us&apiKey=${API_KEY}&pageSize=100`;
      const response = await axiosInstance.get(url);
      dispatch(fetchAllNewsSuccess(response));
    } catch (error) {
      dispatch(fetchAllNewsFailure(error.message));
    }
  };
}

export function searchNews(query, sortBy) {
  return async dispatch => {
    dispatch(searchNewsRequest(query, sortBy));
    try {
      const url = `everything?q=${query}&apiKey=${API_KEY}&sortBy=${sortBy}`;
      const response = await axiosInstance.get(url);
      dispatch(searchNewsSuccess(response));
    } catch (error) {
      dispatch(searchNewsFailure(error.message));
    }
  };
}

export function selectArticleRequest(article) {
  return async dispatch => {
    dispatch(selectArticle(article));
  };
}
