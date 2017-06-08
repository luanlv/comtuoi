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
    this.getProducts(1)
  }
  render() {
    return (
        <div>
          <Table columns={columns} rowKey={record => record.slug} dataSource={this.state.data} />
        </div>
    );
  }
  async getProducts(page) {

    const resp = await fetch('/graphql', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: "{getProducts{coverUrl, slug,name, price, body, view, saleOff, created_at}}",
      }),
      credentials: 'include',
    });

    const {data} = await resp.json();
    this.setState(prev => {
      return {
        ...prev,
        loading: false,
        page: data.getProducts.page,
        totalPage: data.getProducts.totalPage,
        data: data.getProducts
      }
    })
  }
}

const columns = [{
  title: 'Tên sản phẩm',
  dataIndex: 'name',
  key: 'name',
  render: text => <span>{text.length > 53 ? (text.slice(0, 50) + '...') : (text)}</span>,
}, {
  title: 'Giá sản phẩm',
  dataIndex: 'price',
  key: 'price',
  render: price => <span>{price}</span>,
}, {
  title: 'Action',
  key: 'action',
  render: (text, record) => (
    <span>
      <Link to={"/admin/product?v=edit&slug=" + record.slug }>Sửa</Link>
    </span>
  ),
}];

export default ListNews
