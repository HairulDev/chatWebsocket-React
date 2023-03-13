import { FETCH_MESSAGE, FETCH_MESSAGE_BY, CREATE, DELETE, UPDATE, } from '../constants/actionTypes';


export default (state = { messages: [], messageBy: [] }, action) => {
  switch (action.type) {

    case FETCH_MESSAGE:
      return { ...state, messages: action.payload };

    case FETCH_MESSAGE_BY:
      return { ...state, messageBy: action.payload };

    case CREATE:
      return { ...state, messages: [...state.messages, action.payload] };

    case UPDATE:
      return { ...state, messages: state.messages.map((message) => (message.id === action.payload.id ? action.payload : message)) };

    case DELETE:
      return { ...state, messages: [...state.messages, action.payload] };
    default:
      return state;
  }
};

