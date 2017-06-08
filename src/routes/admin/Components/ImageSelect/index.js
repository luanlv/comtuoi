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
import {Icon, Input, Button, DatePicker, Row, Col, Card, Upload, message, Modal} from 'antd';
import fetch from '../../../../core/fetch';
var Waypoint = require('react-waypoint');
import CopyToClipboard from 'react-copy-to-clipboard';

const Dragger = Upload.Dragger;

var list=[]
for(let i = 0; i< 50; i++){
  list.push(i)
}

const props = {
  name: 'image',
  multiple: true,
  showUploadList: false,
  action: '/upload/image',
};

class ImageSelect extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      copyImageUrl: 'abc',
      copied: false,
      uploadArea: false,
      visible: false,
      filter: '',
      time: (new Date()).toISOString(),
      imgs: [],
      selectedImage: {}
    }
    this.fetchImage(40, this.state.time)
  }

  async fetchImage (num, time, reset = true) {
    const resp = await fetch('/graphql', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: '{ listImage(num: ' + num + ', time: "' + time + '", filter: "' + this.state.filter + '") { _id slug name type fileSize dimensions {width height} userUpload created_at } }',
      }),
      credentials: 'include',
    })
    const {data} = await resp.json();

    this.setState(prevState => {
      if(data.listImage.length > 0) {
        let newImgs;
        if (reset) {
          newImgs = data.listImage
        } else {
          newImgs = prevState.imgs.concat(data.listImage)
        }
        return {
          ...prevState,
          imgs: newImgs,
          time: newImgs[newImgs.length - 1].created_at
        }
      }
    })
  }
  showModal (el) {
    this.setState({
      visible: true,
      selectedImage: el
    });
  }
  handleOk (e) {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  handleCancel (e) {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  beforeUpload (file) {
    const isImage = file.type.match('image*')
    if (!isImage) {
      message.error('You can only upload Image file!');
    }
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      message.error('Image must smaller than 5MB!');
    }
    return isImage && isLt5M;
  }

  _handleWaypointEnter () {
    alert('loading more ...')
  }

  onChange(info) {
    const status = info.file.status;
    if (status !== 'uploading') {
      // console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      this.setState(prevState => {
        var newImgs = prevState.imgs
        newImgs.unshift(info.file.response)
        return {
          ...prevState,
          imgs: newImgs
        }
      })
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }

  render() {
    return (
      <div>

        <Row className="padding-5 margin-5">
          <Col sm={16}>
            <Button
              onClick={() => {
                this.setState((preState, curProps) => {
                  return {
                    ...preState,
                    uploadArea: !preState.uploadArea
                  }
                })
              }}
            >Thêm ảnh</Button>
          </Col>
          <Col sm={8}>
            <Input size="large" placeholder="Search by name"
                   onChange={(e) => {
                     let newInput = e.target.value
                     this.setState((prevState) => {
                       return {
                         ...prevState,
                         filter: newInput
                       }
                     })
                     this.fetchImage(40, this.state.time)
                   }
                   }
            />
          </Col>
        </Row>

        {this.state.uploadArea && <Row className="padding-5 margin-5">
          <div style={{ marginTop: 16, height: 180 }}>
            <Dragger
              {...props}
              onChange={(info) => this.onChange(info)}
              beforeUpload={this.beforeUpload}
            >
              <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
              </p>
              <p className="ant-upload-text">Kéo thả các các file vào bất kì nơi nào trên vùng này để tải lên.</p>
              <p className="ant-upload-hint">Hoặc bấm vào vùng này để chọn ảnh</p>
            </Dragger>
          </div>
        </Row>}

        <div style={{ background: '#ECECEC'}}>
          <Row>
            {this.state.imgs.map((el, key) => {
              return (
                <Col xs={12} sm={6} md={4} lg={4} key={key} className="padding-5">
                  <Card bordered={false} className="imgWr"
                        onClick={() => this.props.handleSelect(el)}
                  >
                    <img src={"/image/small/" + el.name} />
                  </Card>
                </Col>
              )
            })}
            <Col xs={12} sm={6} md={4} lg={4} className="padding-5">
              <Card bordered={false} className="imgWr"
                    onClick={() => this.fetchImage(40, this.state.imgs[this.state.imgs.length - 1].created_at, false)}
              >
                <img src="https://www.loadebar.com/images/template/load-more.png" />
              </Card>
            </Col>
          </Row>
          {/*<Waypoint*/}
          {/*scrollableAncestor={window}*/}
          {/*onEnter={() => this._handleWaypointEnter()}*/}
          {/*>*/}
          {/*</Waypoint>*/}
        </div>
      </div>
    );
  }
}

export default ImageSelect
