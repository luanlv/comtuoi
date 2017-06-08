/* eslint-disable import/prefer-default-export */

import * as type from '../constants';

export function setData(value = {}) {
  return {
    type: type.SET_DATA,
    payload: {
      value
    },
  };
}
