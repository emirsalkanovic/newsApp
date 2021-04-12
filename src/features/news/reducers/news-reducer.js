import * as types from "../actions/news-aciton-types";

const INITIAL_STATE_TOP_MOVIES = {
  isLoading: false,
  results: [],
  selectedArticle: null
};

export function newsReducer(state = INITIAL_STATE_TOP_MOVIES, action) {
  switch (action.type) {
    case types.GET_ALL_NEWS_REQUEST:
      return {
        ...state,
        isLoading: true,
        results: []
      };
    case types.GET_ALL_NEWS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        results: action.payload
      };
    case types.GET_ALL_NEWS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: "Error while trying to fetch news"
      };
    case types.SET_SELECTED_ARTICLE: {
      return {
        ...state,
        selectedArticle: action.payload
      };
    }

    default:
      return state;
  }
}

const INITIAL_SEARCH_STATE = {
  searchResults: [],
  isSearching: false
};

export function searchNewsReducer(state = INITIAL_SEARCH_STATE, action) {
  switch (action.type) {
    case types.SEARCH_NEWS_REQUEST:
      return {
        ...state,
        isSearching: true
      };
    case types.SEARCH_NEWS_SUCCESS:
      return {
        ...state,
        searchResults: action.payload,
        isSearching: false
      };
    case types.SEARCH_NEWS_FAILURE:
      return {
        ...state,
        isSearching: false,
        error: "Error while trying to fetch news"
      };
    default:
      return state;
  }
}
