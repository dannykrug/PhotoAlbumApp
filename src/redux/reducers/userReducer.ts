import {ActionTypes} from '../types';

const userReducer = (state = [], action: any) => {
  switch (action.type) {
    case ActionTypes.FETCH_USERS:
      return action.payload;
    default:
      return state;
  }
};

export default userReducer;
