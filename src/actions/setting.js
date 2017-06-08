/* eslint-disable import/prefer-default-export */

import * as type from '../constants';

export function setSetting({ value }) {
  return {
    type: type.SET_SETTING,
    payload: {
      value
    },
  };
}
