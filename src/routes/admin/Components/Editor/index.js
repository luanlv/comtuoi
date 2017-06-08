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
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import {convertFromHTML} from 'draft-convert'
import {Tag, Input, Tooltip, Button, DatePicker, Select} from 'antd';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import ColorPic from '../ColorPicker'
import axios from 'axios';
var slug = require('slug')
import ReactResizeDetector from 'react-resize-detector';
import VisibilitySensor from 'react-visibility-sensor'


class EditorComponent extends React.Component {
  constructor(props){
    super(props)
    const contentBlocks = htmlToDraft(this.props.defaultValue).contentBlocks;
    const contentState = ContentState.createFromBlockArray(contentBlocks);
    const editorState = EditorState.createWithContent(contentState);
    this.state = {
      oldEditorSize: 0,
      isEndEditor: false,
      content: editorState
    }
    console.log(this.props.defaultValue)
  }

  componentDidMount(){
    $(".home-toolbar").sticky({topSpacing:0});
  }

  uploadCallback (file) {
    var data = new FormData();
    data.append('image', file);

    return new Promise(
      (resolve, reject) => {
        axios.post('/upload/image', data)
          .then(function (res) {
            console.log('/image/' + res.data.name)
            resolve({data: {link: '/image/' + res.data.name}})
          })
          .catch(function (err) {
            reject()
          })
      }
    );
  }

  onEditorStateChange (editorContent){
    this.setState({
      content: draftToHtml(convertToRaw(editorContent.getCurrentContent()))
    })
  }

  onChange(newValue) {
    console.log('change', newValue)
  }

  render() {
    // const blocksFromHTML = htmlToDraft(this.props.content);

    return (
      <div >
        <ReactResizeDetector handleWidth handleHeight onResize={(w, h) => {
          let diff = h - this.state.oldEditorSize
          if(this.state.isEndEditor && diff > 0) {
            var y = $(window).scrollTop();
            $(window).scrollTop(y + diff);
          }
          this.setState({
            oldEditorSize: h
          })
        }} />
        <Editor
          defaultEditorState = {this.state.content}
          toolbarClassName="home-toolbar"
          wrapperClassName="home-wrapper"
          editorClassName="home-editor"
          toolbar={{
            colorPicker: { component: ColorPic },
            image: { uploadCallback: this.uploadCallback }}}
          onEditorStateChange={(content) => this.props.handleChange(draftToHtml(convertToRaw(content.getCurrentContent())))}
        />
        <VisibilitySensor onChange={(isVisible) => {
          this.setState({
            isEndEditor: !isVisible
          })
        }} />
      </div>
    );
  }
}


export default withStyles(s)(EditorComponent)
