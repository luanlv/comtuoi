import React from 'react';
import Home from './Home';
import fetch from '../../core/fetch';
import needFetch from '../../core/needFetch';
import Layout from '../../components/Layout';
import * as dataAction from '../../actions/data'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

export default {
  path: '/bai-viet/:slug',
  async action({ store, params, path}) {
    var post;
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
          query: '{seo(url: "'+ path +'"){url,title,description,og_title,og_image,og_description},getOnePost(slug: "' + params.slug + '"){title,slug,body,category, description}}',
        }),
        credentials: 'include',
      });
      let { data } = await resp.json();
      // if (!data || !data.getOnePost) throw new Error('Failed to load data.');
      if (!data || !data.getOnePost) {
        return { redirect: '/' }
      }
      seo = data.seo || {}
      store.dispatch(dataAction.setData(data))
      store.dispatch(hideLoading())
    }
    return {
      title: seo.title || store.getState().data.post.value.title,
      description: seo.description || store.getState().data.post.value.description,
      seo: seo,
      component: <Layout><Home post={store.getState().data.post.value} /></Layout>,
    };
  },

};
