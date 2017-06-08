/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import UniversalRouter from 'universal-router'
import history from '../../../core/history'
import Link from '../../../components/Link'
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Button, DatePicker, Table, Icon} from 'antd';

class ListNews extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      loading: true,
      page: 1,
      totalPage: 1,
      data: []
    }
    this.getNews(1)
  }
  render() {
    return (
        <div>
          <Table columns={columns} rowKey={record => record.slug} dataSource={this.state.data} />
        </div>
    );
  }
  async getNews(page) {

    const resp = await fetch('/graphql', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: '{getNews(page:'+ page +' ){page,totalPage,data{category, coverUrl, slug, public, title, description, body, view, tags, created_at}}}',
      }),
      credentials: 'include',
    });

    const {data} = await resp.json();
    // console.log(data.getNews)
    this.setState(prev => {
      return {
        ...prev,
        loading: false,
        page: data.getNews.page,
        totalPage: data.getNews.totalPage,
        data: data.getNews.data
      }
    })
  }
}

const columns = [{
  title: 'Tựa đề',
  dataIndex: 'title',
  key: 'title',
  render: text => <span>{text.length > 53 ? (text.slice(0, 50) + '...') : (text)}</span>,
}, {
  title: 'Lượt xem',
  dataIndex: 'view',
  key: 'view',
}, {
  title: 'Công khai',
  dataIndex: 'public',
  key: 'public',
  render: boolean => <span>{boolean ? 'true' : 'false'}</span>
}, {
  title: 'Action',
  key: 'action',
  render: (text, record) => (
    <span>
      <Link to={"/admin/news?v=edit&slug=" + record.slug }>Sửa</Link>
    </span>
  ),
}];

export default ListNews
