/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Layout from '../../components/Layout';
import Login from './Login';
import needFetch from '../../core/needFetch';

const title = 'Log In';

export default {

  path: '/login',

  action({store}) {
    needFetch()
    let user = store.getState().user
    if(user && user.username){
      return { redirect: '/' }
    }
    return {
      title,
      component: <Layout><Login title={title} /></Layout>,
    };
  },

};
