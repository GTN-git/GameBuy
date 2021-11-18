// import { useReducer } from "react";
import {
    UPDATE_SEARCH_RESULTS
  } from "./actions";
  
  // Initial state required by reducer in Redux
  const initialState = {
    searchResults: []
  }

export function reducers(state = initialState, action) {
    switch(action.type) {
        case UPDATE_SEARCH_RESULTS:
            return {
                ...state,
                searchResults: [...action.searchResults]
            };
        default: return state;
    }
}