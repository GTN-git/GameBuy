// import { useReducer } from "react";
import {
    UPDATE_SEARCH_RESULTS,
    UPDATE_SELL_POST
  } from "./actions";
  
  // Initial state required by reducer in Redux
  const initialState = {
    searchResults: [],
    post: {}
  }

export function reducers(state = initialState, action) {
    switch(action.type) {
        case UPDATE_SEARCH_RESULTS:
            return {
                ...state,
                searchResults: [...action.searchResults]
            };
        case UPDATE_SELL_POST:
            return {
                ...state,
                searchResults: [...action.post]
            };
        default: return state;
    }
}