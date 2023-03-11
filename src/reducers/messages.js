import { FETCH_MESSAGE, CREATE, DELETE, LIKE, START_LOADING, END_LOADING, } from '../constants/actionTypes';


export default (state = { isLoading: true, messages: [] }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };

    case FETCH_MESSAGE:
      return { ...state, messages: action.payload };

    case CREATE:
      return { ...state, messages: [...state.messages, action.payload] };

    case DELETE:
      return { ...state, messages: state.messages.filter((message) => message.id !== action.payload) };
    default:
      return state;
  }
};

