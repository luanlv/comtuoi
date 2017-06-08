/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* eslint-disable global-require */

// The top-level (parent) route
export default {

  path: '/',

  // Keep in mind, routes are evaluated in order
  children: [
    require('./home').default,
    require('./monngon').default,
    require('./sanpham').default,
    require('./danhsachsanpham').default,
    // require('./landingpage').default,
    require('./lienhedathang').default,
    require('./danhmuc').default,
    require('./tintuc').default,
    require('./baiviet').default,
    // require('./contact').default,
    require('./login').default,
    // require('./register').default,
    // require('./about').default,
    // require('./privacy').default,
    require('./admin').default,
    // Wildcard routes, e.g. { path: '*', ... } (must go last)
    require('./notFound').default,
  ],

  async action({ next, store }) {
    if(process.env.BROWSER && !window.numRendered) {
      window.numRendered = 0
    }
    // Execute each child route until one of them return the result
    const route = await next();

    // Provide default values for title, description etc.
    route.title = `${route.title || 'Untitled Page'} - ComTuoi.Com`;
    route.description = route.description || '';

    return route;
  },

};
