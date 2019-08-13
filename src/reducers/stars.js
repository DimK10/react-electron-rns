const starsReducerDefaultState = [];

export default (state = starsReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_STAR':
          return [
            ...state,
            action.star
          ];
        case 'REMOVE_STAR':
          return state.filter(({ id }) => id !== action.id);
        case 'EDIT_STAR':
          return state.map((star) => {
            if (star.id === action.id) {
              return {
                ...star,
                ...action.updates
              };
            } else {
              return star;
            };
          });
        default:
          return state;
    }
};