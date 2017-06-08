/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './style.css';
// import {Tag, Input, Tooltip, Button, DatePicker, Select} from 'antd';
// import ColorPic from '../Components/ColorPicker'
// import axios from 'axios';
var slug = require('slug')
class EditorComponent extends React.Component {
  constructor(props){
    super(props)
    this.state = { editorHtml: '' }
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange (html) {
    this.setState({ editorHtml: html });
  }
  componentDidMount() {
  }

  render() {
    return (
      <div style={{width: 800, margin: '10px auto'}}>
      </div>
    )
  }

}

export default withStyles(s)(EditorComponent)
