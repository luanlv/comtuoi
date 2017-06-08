import React from 'react';
import Home from './Home';
import fetch from '../../core/fetch';
import needFetch from '../../core/needFetch';
import Layout from '../../components/Layout';
import {setData} from '../../actions/data'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

export default {
  path: '/san-pham',
  async action({ store, path}) {
    let seo = {}
    if(!process.env.BROWSER || !store.getState().setting.ssr || (process.env.BROWSER && needFetch())){
      store.dispatch(showLoading())
      const resp = await fetch('/graphql', {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: '{ seo(url: "'+ path +'"){url,title,description,og_title,og_image,og_description},getProducts{name, price, slug, coverUrl, description, saleOff, body, created_at} }',
        }),
        credentials: 'include',
      });
      const { data } = await resp.json();
      seo = data.seo || {}
      store.dispatch(setData(data))
      store.dispatch(hideLoading())
    }

    return {
      title: seo.title || 'Trang danh sách sản phẩm',
      description: seo.description || '',
      seo: seo,
      component: <Layout><Home products={store.getState().data.products.value} /></Layout>,
    };
  },

};
