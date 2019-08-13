// Filters Reducer

const FiltersReducerDefaultState = {
    text: '',
    sortBy: 'name'
};

export default (state = FiltersReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            };
        case 'SORT_BY_NAME':
            return {
                ...state,
                sortBy: 'name'
            };
        case 'SORT_BY_MODEL':
            return {
                ...state,
                sortBy: 'model'
            }
        
        default:
            return state;
    }
};