export const init = () => {
  return { fetching: false, images: [] };
}

/**
 * Image reducer
 * @param state 
 * @param action 
 * @returns new state with images
 */
export const imgReducer = (state, action) => {
  switch (action.type) {
    case "STACK_IMAGES":
      return { ...state, images: state.images.concat(action.images) };
    case "FETCHING_IMAGES":
      return { ...state, fetching: action.fetching };
    case "RESET_IMAGES":
      return init();
    default:
      return state;
  }
};

/**
 * pagination reducer
 * @param state 
 * @param action 
 * @returns new state with current page number
 */
export const pageReducer = (state, action) => {
  switch (action.type) {
    case "ADVANCE_PAGE":
      return { ...state, page: state.page + 1 };
    default:
      return state;
  }
};
