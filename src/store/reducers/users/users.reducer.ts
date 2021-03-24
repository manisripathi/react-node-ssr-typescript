/* eslint-disable import/prefer-default-export */
import { SET_USERS } from '../../actions/users.actions';

export const users = (state = [], action: any) => {
  switch (action.type) {
    case SET_USERS:
      return action.payload;
    default:
      return state;
  }
};
