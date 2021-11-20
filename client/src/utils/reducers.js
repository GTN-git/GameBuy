// import { useReducer } from "react";
import {
    UPDATE_SEARCH_RESULTS,
    UPDATE_SELL_PAGE
  } from "./actions";
  
  // Initial state required by reducer in Redux
  const initialState = {
    searchResults: [],
    page: 1
  }

export function reducers(state = initialState, action) {
    switch(action.type) {
        case UPDATE_SEARCH_RESULTS:
            return {
                ...state,
                searchResults: [...action.searchResults]
            };
        case UPDATE_SELL_PAGE:
            return {
                ...state,
                page: action.page
            };
        default: return state;
    }
}