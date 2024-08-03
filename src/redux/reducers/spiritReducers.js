import { SET_TINH_THAN, UPDATE_TINH_THAN, DELETE_TINH_THAN } from '../actions/spiritActions';

const initialState = {
  tinhThan: [],
};

const spiritReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TINH_THAN:
      return {
        ...state,
        tinhThan: action.payload,
      };
    case UPDATE_TINH_THAN:
      return {
        ...state,
        tinhThan: state.tinhThan.map(item =>
          item.id === action.payload.id
            ? { ...item, ...action.payload.updatedContent }
            : item
        ),
      };
    case DELETE_TINH_THAN:
      return {
        ...state,
        tinhThan: state.tinhThan.filter(item => item.id !== action.payload),
      };
    default:
      return state;
  }
};

export default spiritReducer;