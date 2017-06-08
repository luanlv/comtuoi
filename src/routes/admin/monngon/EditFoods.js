/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import {Modal, Input, Button, Switch, Select, Row, Col, Card, Tabs, message, Affix} from 'antd';
import axios from 'axios';
import history from '../../../core/history'
import CustomTag from '../Components/Tags'
import ImageUpload from '../Components/ImageUpload'
import ImageSelect from '../Components/ImageSelect'
import fetch from '../../../core/fetch';
const TabPane = Tabs.TabPane;
import CKEditor from '../Components/CKEditor'
const Option = Select.Option;

class EditNewsComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: this.props.isEdit,
      selectImageType: '',
      showModalSelectImage: false,
      data: {
        description: '',
        tags: []
      }
    }
    if(this.props.isEdit) this.init(this.props.slug)
  }

  async init (slug) {
    const resp = await fetch('/graphql', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: '{ getOneNews(slug: "'+ slug +'"){category, coverUrl, slug, public, title, description, body, view, tags, created_at} }',
      }),
      credentials: 'include',
    })
    const {data} = await resp.json();
    this.setState(prev => {
      return {
        ...prev,
        loading: false,
        data: data.getOneNews
      }
    })
  }

  handleCoverUpload (img) {
    this.setState(prevState => {
      return {
        ...prevState,
        data: {
          ...prevState.data,
          coverUrl: '/image/' + img.name
        }
      }
    })
  }
  showModalSelectImage = (type) => {
    this.setState(prev => {
      return {
        ...prev,
        modalSelectImage: true,
        selectImageType: type
      }
    });
  }
  handleOk = (e) => {
    this.setState({
      modalSelectImage: false,
    });
  }
  handleCancel = (e) => {
    this.setState({
      modalSelectImage: false,
    });
  }

  handleSelectImage(img){
    if(this.state.selectImageType === 'cover') {
      this.setState(prevState => {
        return {
          ...prevState,
          modalSelectImage: false,
          data: {
            ...prevState.data,
            coverUrl: '/image/' + img.name
          }
        }
      })
    } else {
      window.prompt("Copy to clipboard: Ctrl+C, Enter", '/image/' + img.name)
      this.setState(prevState => {
        return {
          ...prevState,
          modalSelectImage: false,
        }
      })
    }
  }

  addNews(post){
    axios.post('/api/post/new', post)
      .then(res => {
        history.push({
          pathname: '/admin/news',
          search: '?v=edit&slug=' + res.data.slug
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  updateNews(post){
    axios.post('/api/post/update', post)
      .then(res => {
        message.success('Cập nhập thành công!')
      })
      .catch(err => {
        message.error('Cập nhập thất bại')
      })
  }

  render() {
    if(this.props.loading){
      return (<div>loading...</div>)
    }
    return (
      !this.state.loading && <div className="admin-editor">
        <Row className="padding-5" style={{marginBottom: 15}}>
          <Affix
            offsetTop={10}
          >
            {this.props.isEdit && <Button
              size="large"
              type="primary" style={{float: 'right'}}
              onClick={() => {
                this.updateNews(this.state.data)
              }}
            >Cập nhập</Button>}
            {!this.props.isEdit && <Button
              size="large"
              type="primary" style={{float: 'right'}}
              onClick={() => {
                this.addNews(this.state.data)
              }}
            >Thêm mới</Button>}
          </Affix>
        </Row>
        <Row>
          <Tabs type="card">
            <TabPane tab="Thông tin bài viết" key="1">
              <Row>
                <Col sm={12} className="padding-5" >
                  <div style={{ marginBottom: 16 }}>
                    <label><b>Tựa đề:</b></label>
                    <Input
                      placeholder="Tựa đề"
                      defaultValue={this.state.data.title}
                      onChange={(e) => {
                        let that = this
                        let value = e.target.value
                        let newSlug = function(){
                          if(that.props.isEdit)
                            return that.state.data.slug
                          else {
                            return slugify(value)
                          }
                        }
                        this.setState(prev => {
                          return {
                            ...prev,
                            data: {
                              ...prev.data,
                              title: value,
                              slug: newSlug()
                            }
                          }
                        })
                      }}
                    />
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <label><b>slug:</b></label>
                    <Input
                      placeholder="Slug"
                      disabled={this.props.isEdit}
                      value={this.state.data.slug}
                      onChange={(e) => {
                        let value = e.target.value
                        this.setState(prev => {
                          return {
                            ...prev,
                            data: {
                              ...prev.data,
                              slug: value
                            }
                          }
                        })
                      }}
                    />
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <label><b>Danh mục:</b></label>
                    <Select
                      defaultValue={this.state.data.category}
                      style={{ width: '100%' }}
                      onChange={(value) => {
                        this.setState(prev => {
                          return {
                            ...prev,
                            data: {
                            ...prev.data,
                            category: value
                          }
                        }
                        })
                      }}
                    >
                      <Option value="mon-ngon-tu-com">Món ngon từ cốm</Option>
                      <Option value="cach-lam-mon-ngon-tai-nha">Cách làm món ngon tại nhà</Option>
                    </Select>
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <label><b>Tags:</b></label>
                    <CustomTag defaultValue={this.state.data.tags}
                               handleChange={(tags) => {
                                 this.setState(prev => {
                                   return {
                                     ...prev,
                                     data: {
                                       ...prev.data,
                                       tags: tags
                                     }
                                   }
                                 })
                               }}
                    />
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <label><b>Mô tả ( {(this.state.data.description.length >= 140 && this.state.data.description.length <= 150) ? <span style={{color: 'blue'}}>{this.state.data.description.length}</span> : <span style={{color: 'red'}}>{this.state.data.description.length}</span>} /150) :</b></label>
                    <Input type="textarea"
                           autosize={{ minRows: 2, maxRows: 10 }}
                           defaultValue={this.state.data.description}
                           onChange={(e) => {
                             let value = e.target.value
                             this.setState(prev => {
                               return {
                                 ...prev,
                                 data: {
                                   ...prev.data,
                                   description: value
                                 }
                               }
                             })
                           }}
                    />
                  </div>
                </Col>
                <Col sm={12} className="padding-5">
                  <div style={{ marginBottom: 16 }}>
                    <b>Public: </b>
                    <Switch checked={this.state.data.public || false} onChange={(value) => {
                      this.setState(prev => {
                        return {
                          ...prev,
                          data: {
                            ...prev.data,
                            public:value
                          }
                        }
                      })
                    }} />
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <label><b>Ảnh đại diện:</b></label>
                    {!this.state.data.coverUrl && <ImageUpload
                      isMultiple={false}
                      handleUpload={(img) => this.handleCoverUpload(img)}
                    />}
                    {this.state.data.coverUrl && <Card bordered={false} className="imgWr"
                                                       onClick={() => this.showModalSelectImage('cover')}
                    >
                      <img src={this.state.data.coverUrl} />
                    </Card>}
                  </div>
                  <Button
                    style={{marginRight: 10}}
                    onClick={() => this.showModalSelectImage('cover')}
                  >Chọn ảnh từ thư viện</Button>
                  {this.state.data.coverUrl && <Button
                    onClick={() => {
                      this.setState(prevState => {
                        return {
                          ...prevState,
                          data: {
                            ...prevState.data,
                            coverUrl: null
                          }
                        }
                      })
                    }
                    }
                  >Xóa ảnh </Button>}
                </Col>
              </Row>
            </TabPane>
            <TabPane tab="Nội dung" key="2">
              <Row >
                <div style={{maxWidth: 800, padding: 5, border: '1px solid #ddd', margin: '0 auto'}}>
                  <Col className="padding-5">
                    <CKEditor
                      id={1}
                      value={this.state.data.body || ''}
                      onChange={(value) => {
                        console.log(value)
                        this.setState(prev => {
                          return {
                            ...prev,
                            data: {
                              ...prev.data,
                              body: value
                            }
                          }
                        })
                      }}
                    />
                  </Col>

                </div>
              </Row>
            </TabPane>
          </Tabs>
        </Row>

        <Modal
          style={{top: 30}}
          width="90%"
          title="Basic Modal" visible={this.state.modalSelectImage}
               onOk={this.handleOk} onCancel={this.handleCancel}
        >
          <ImageSelect handleSelect={(img) => this.handleSelectImage(img)} />
        </Modal>
      </div>
    );
  }
}

function slugify(str)
{
  // Chuyển hết sang chữ thường
  str = str.toLowerCase();

  // xóa dấu
  str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a');
  str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e');
  str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i');
  str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
  str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u');
  str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y');
  str = str.replace(/(đ)/g, 'd');

  // Xóa ký tự đặc biệt
  str = str.replace(/([^0-9a-z-\s])/g, '');

  // Xóa khoảng trắng thay bằng ký tự -
  str = str.replace(/(\s+)/g, '-');

  // xóa phần dự - ở đầu
  str = str.replace(/^-+/g, '');

  // xóa phần dư - ở cuối
  str = str.replace(/-+$/g, '');

  // return
  return str;
}

export default EditNewsComponent
