/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import { Button, DatePicker, Table, Timeline, Icon, Row, Col, Input, Modal, Card, message} from 'antd';
import moment from 'moment'
import ImageUpload from '../Components/ImageUpload'
import ImageSelect from '../Components/ImageSelect'
import axios from 'axios'

class View extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      selectImageType: '',
      showModalSelectImage: false,
      new: true,
      listSEO: this.props.listSEO || [],
      showModal: false,
      selectSEO: {
        description: '',
        og_description: ''
      },
      filter_text: '',
    }
    this.fetchAllSeo()
  }

  async fetchAllSeo (filter = this.state.filter_text) {
    const resp = await fetch('/graphql', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: '{ allSeo(filter:"'+ filter +'"){url,title,description,og_title,og_image,og_description,created_at} }',
      }),
      credentials: 'include',
    });
    const { data } = await resp.json();
    this.setState(prev => {
      return {
        ...prev,
        listSEO: data.allSeo
      }
    })
  }

  handleOkSEO = (e) => {
    if(this.state.new) {
      axios.post('/api/seo/new', this.state.selectSEO)
        .then(res => {
          message.success("Thêm thành công")
          this.setState(prev => {
            return {
              ...prev,
              showModal: false,
              selectSEO: {
                description: '',
                og_description: ''
              }
            }
          })
          this.fetchAllSeo()
        })
        .catch(err => {
          message.error('Có lỗi')
          console.log(err)
        })
    } else {
      axios.post('/api/seo/update', this.state.selectSEO)
        .then(res => {
          message.success("Cập nhập thành công")
          this.setState(prev => {
            return {
              ...prev,
              showModal: false,
              selectSEO: {
                description: '',
                og_description: ''
              }
            }
          })
          this.fetchAllSeo()
        })
        .catch(err => {
          message.error('Có lỗi')
          console.log(err)
        })
    }
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
          selectSEO: {
            ...prevState.selectSEO,
            og_image: '/image/' + img.name
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

  showModalSelectImage = (type) => {
    this.setState(prev => {
      return {
        ...prev,
        modalSelectImage: true,
        selectImageType: type
      }
    });
  }


  handleCoverUpload (img) {
    this.setState(prevState => {
      return {
        ...prevState,
        selectSEO: {
          ...prevState.selectSEO,
          og_image: '/image/' + img.name
        }
      }
    })
  }

  render() {
    return (
        <div>
          <Row className="padding-5">
            <Button
              type="primary"
              style={{marginRight: 10}}
              onClick={() => {this.setState(prev => {
                return {
                  ...prev,
                  new: true,
                  showModal: true,
                  selectSEO: {
                    description: '',
                    og_description: ''
                  }
                }
              })}}
            >Thêm mới</Button>
            <Input.Search
              placeholder="Tìm kiếm"
              style={{ width: 200 }}
              onSearch={value => {
                this.setState(prev => {
                  return {
                    ...prev,
                    filter_text: value
                  }
                })
                this.fetchAllSeo(value)
              }
              }
            />
          </Row>
          <Row className="padding-5">
            <Table
              columns={columns} rowKey={record => record.created_at} dataSource={this.state.listSEO}
              onRowClick = {(record, index) => {
                console.log(record)
                this.setState(prev => {
                  return {
                    ...prev,
                    new: false,
                    showModal: true,
                    selectSEO: record
                  }
                })
              } }
            />
          </Row>

          <Modal
            width="90%"
            wrapClassName="vertical-center-modal"
            visible={this.state.showModal}
            cancelText="Đóng"
            okText={this.state.new ? "Thêm mới" : "Cập nhập"}
            onCancel={() => this.setState({showModal: false})}
            onOk={() => this.handleOkSEO()}
          >
            <div style={{ marginBottom: 16 }}>
              <label><b>URL: </b></label>
              <br/>
              <Input
                placeholder="URL"
                value={this.state.selectSEO.url || ''}
                onChange={(e) => {
                  let value = e.target.value
                  this.setState(prev => {
                    return {
                      ...prev,
                      selectSEO: {
                        ...prev.selectSEO,
                        url: value
                      }
                    }
                  })
                }}
              />
            </div>

            <div style={{ marginBottom: 16 }}>
              <label><b>Tựa đề: </b></label>
              <br/>
              <Input
                placeholder="Tựa đề"
                value={this.state.selectSEO.title || ''}
                onChange={(e) => {
                  let value = e.target.value
                  this.setState(prev => {
                    return {
                      ...prev,
                      selectSEO: {
                        ...prev.selectSEO,
                        title: value
                      }
                    }
                  })
                }}
              />
            </div>

            <div style={{ marginBottom: 16 }}>
              <label><b>Mô tả ( {(this.state.selectSEO.description.length >= 140 && this.state.selectSEO.description.length <= 150) ? <span style={{color: 'blue'}}>{this.state.selectSEO.description.length}</span> : <span style={{color: 'red'}}>{this.state.selectSEO.description.length}</span>} /150) :</b></label>
              <Input type="textarea"
                     autosize={{ minRows: 2, maxRows: 10 }}
                     value={this.state.selectSEO.description}
                     onChange={(e) => {
                       let value = e.target.value
                       this.setState(prev => {
                         return {
                           ...prev,
                           selectSEO: {
                             ...prev.selectSEO,
                             description: value
                           }
                         }
                       })
                     }}
              />
            </div>

            <div style={{ marginBottom: 16 }}>
              <label><b>Tựa đề (OG): </b></label>
              <br/>
              <Input
                placeholder="Tựa đề (OG)"
                value={this.state.selectSEO.og_title || ''}
                onChange={(e) => {
                  let value = e.target.value
                  this.setState(prev => {
                    return {
                      ...prev,
                      selectSEO: {
                        ...prev.selectSEO,
                        og_title: value
                      }
                    }
                  })
                }}
              />
            </div>

            <div style={{ marginBottom: 16 }}>
              <label><b>Ảnh đại diện (OG):</b></label>
              {!this.state.selectSEO.og_image && <ImageUpload
                isMultiple={false}
                handleUpload={(img) => this.handleCoverUpload(img)}
              />}
              {this.state.selectSEO.og_image &&
                <div style={{width: 180, height: 150}}>
                  <Card
                    bordered={false} className="imgWr"
                    onClick={() => this.showModalSelectImage('cover')}
                  >
                    <img src={this.state.selectSEO.og_image} />
                  </Card>
                </div>}
            </div>

            <Button
              style={{marginRight: 10}}
              onClick={() => this.showModalSelectImage('cover')}
            >Chọn ảnh từ thư viện</Button>
            {this.state.selectSEO.og_image && <Button
              onClick={() => {
                this.setState(prevState => {
                  return {
                    ...prevState,
                    selectSEO: {
                      ...prevState.selectSEO,
                      og_image: ''
                    }
                  }
                })
              }
              }
            >Xóa ảnh </Button>}

            <div style={{ marginBottom: 16, marginTop: 16 }}>
              <label><b>Mô tả ( {(this.state.selectSEO.og_description.length >= 140 && this.state.selectSEO.og_description.length <= 150) ? <span style={{color: 'blue'}}>{this.state.selectSEO.og_description.length}</span> : <span style={{color: 'red'}}>{this.state.selectSEO.og_description.length}</span>} /150) :</b></label>
              <Input type="textarea"
                     autosize={{ minRows: 2, maxRows: 10 }}
                     value={this.state.selectSEO.og_description}
                     onChange={(e) => {
                       let value = e.target.value
                       this.setState(prev => {
                         return {
                           ...prev,
                           selectSEO: {
                             ...prev.selectSEO,
                             og_description: value
                           }
                         }
                       })
                     }}
              />
            </div>

          </Modal>

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


const columns = [
  {
    title: 'Link trang web',
    dataIndex: 'url',
    key: 'url',
    render: url => <span>{url}</span>,
  },
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    render: title => <span>{title}</span>,
  }
];

function mapProduct(slug){
  switch(slug){
    case 'com-kho-hoa-vang':
      return 'Cốm khô hoa vàng'
      break;
    case 'Chả Cốm':
      return 'Chả Cốm'
      break;
    case 'com-non-me-tri':
      return 'Cốm Non Mễ Trì'
      break;
    default:
      return ''
      break;
  }
}

export default View
