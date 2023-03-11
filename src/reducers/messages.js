import { FETCH_MESSAGE, CREATE, DELETE, LIKE, } from '../constants/actionTypes';


export default (state = { isLoading: true, messages: [] }, action) => {
  switch (action.type) {
    case 'START_LOADING':
      return { ...state, isLoading: true };
    case 'END_LOADING':
      return { ...state, isLoading: false };

    case FETCH_MESSAGE:
      return { ...state, messages: action.payload };

    case CREATE:
      return { ...state, messages: [...state.messages, action.payload] };


    case LIKE:
      return { ...state, messages: state.messages.map((post) => (post._id === action.payload._id ? action.payload : post)) };

    case DELETE:
      return { ...state, messages: state.messages.filter((post) => post._id !== action.payload) };
    default:
      return state;
  }
};

