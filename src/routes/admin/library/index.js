/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import fetch from '../../../core/fetch';
// import moment from 'moment'

const title = 'Library';

export default {

  path: '/library',

  async action({store}) {
    store.dispatch(showLoading())
    const {App, Library } = await require('../AdminRequire')
    store.dispatch(hideLoading())
    return {
      title,
      chunk: 'admin',
      disableSSR: true,
      component: <App
        name={title}
      >
        <Library title={title} />
      </App>,
    };
  },
};
