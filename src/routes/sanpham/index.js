import React from 'react';
import Home from './Home';
import fetch from '../../core/fetch';
import needFetch from '../../core/needFetch';
import Layout from '../../components/Layout';
import {setData} from '../../actions/data'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

export default {
  path: '/san-pham/:slug',
  async action({ store, params, path }) {
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
          query: '{ seo(url: "'+ path +'"){url,title,description,og_title,og_image,og_description},getProducts{name, slug, price, coverUrl, description, saleOff, body, created_at},getOneProduct(slug: "'+ params.slug +'"){name, slug, price, coverUrl, description, saleOff, body, created_at} }',
        }),
        credentials: 'include',
      });
      const { data } = await resp.json();
      seo = data.seo || {}
      store.dispatch(setData(data))
      store.dispatch(hideLoading())
    }

    return {
      title: seo.title || store.getState().data.product.value.name,
      description: seo.description || store.getState().data.product.value.description,
      seo: seo,
      component: <Layout><Home product={store.getState().data.product.value} products={store.getState().data.products.value} /></Layout>,
    };
  },

};
