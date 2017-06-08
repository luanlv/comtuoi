/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import fetch from '../../../core/fetch';

const title = 'Dashboard';

export default {

  path: '/',

  async action({query}) {
    const {App, Dashboard } = await require('../AdminRequire')

    const resp = await fetch('/graphql', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: '{ getOrders{name, phone, address, product, quantity, done, created_at} }',
      }),
      credentials: 'include',
    });
    const { data } = await resp.json();
    return {
      title,
      chunk: 'admin',
      disableSSR: true,
      component: <App
        name={title}
      >
        <Dashboard title={title} orders={data.getOrders} />
      </App>,
    };
  },
};
