import { SET_SETTING } from '../constants';

export default function setting(state = {}, action) {
  switch (action.type) {
    case SET_SETTING:
      return {
        ...state,
        ['ssr']: action.payload.value,
      };
    default:
      return state;
  }
}
