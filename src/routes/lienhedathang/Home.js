/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import axios from 'axios';
import Link from '../../components/Link'
class Home extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      data: {
        name: '',
        phone: '',
        address: '',
        product: this.props.selectProduct || 'com-kho-hoa-vang',
        quantity: ''
      }
    }
    this.order = this.order.bind(this)
  }

  order() {
    axios.post('/api/order/new', this.state.data)
      .then(res => {
        $('#myModal').modal({
          show: true
        })
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    return (
      <div >
        <div id="mainContent">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div className="form-horizontal">
                  <fieldset>
                    {/* Form Name */}
                    <legend >Đặt hàng</legend>
                    {/* Text input*/}
                    <div className="form-group">
                      <label className="col-md-4 control-label" htmlFor="product_id">Họ Và Tên:</label>
                      <div className="col-md-8">
                        <input id="product_id" name="product_id" placeholder="Họ Và Tên" className="form-control input-md" required type="text"
                          defaultValue={this.state.data.name}
                          onChange={(e) => {
                            let value = e.target.value
                            this.setState(prev => {
                              return {
                                ...prev,
                                data: {
                                  ...prev.data,
                                  name: value
                                }
                              }
                            })
                          }}
                        />
                      </div>
                    </div>
                    {/* Text input*/}
                    <div className="form-group">
                      <label className="col-md-4 control-label" htmlFor="product_name">Số điện thoại:</label>
                      <div className="col-md-8">
                        <input id="product_name" name="product_name" placeholder="Số điện thoại" className="form-control input-md" required type="text"
                               defaultValue={this.state.data.phone}
                               onChange={(e) => {
                                 let value = e.target.value
                                 this.setState(prev => {
                                   return {
                                     ...prev,
                                     data: {
                                       ...prev.data,
                                       phone: value
                                     }
                                   }
                                 })
                               }}
                        />
                      </div>
                    </div>
                    {/* Text input*/}
                    <div className="form-group">
                      <label className="col-md-4 control-label" htmlFor="product_description">Địa chỉ:</label>
                      <div className="col-md-8">
                        <textarea className="form-control" id="product_description" name="product_description"
                            defaultValue={this.state.data.address}
                            onChange={(e) => {
                              let value = e.target.value
                              this.setState(prev => {
                                return {
                                  ...prev,
                                  data: {
                                    ...prev.data,
                                    address: value
                                  }
                                }
                              })
                            }}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="col-md-4 control-label" htmlFor="product_categorie">Sản phẩm:</label>
                      <div className="col-md-8">
                        <select id="product_categorie" name="product_categorie" className="form-control"
                                defaultValue={this.state.data.product}
                                onChange={(e) => {
                                  let value = e.target.value
                                  this.setState(prev => {
                                    return {
                                      ...prev,
                                      data: {
                                        ...prev.data,
                                        product: value
                                      }
                                    }
                                  })
                                }}
                        >
                          <option value="com-kho-hoa-vang">Cốm khô hoa vàng</option>
                          <option value="cha-com">Chả Cốm</option>
                          <option value="com-non-me-tri">Cốm Non Mễ Trì</option>
                        </select>
                      </div>
                    </div>
                    {/* Text input*/}
                    <div className="form-group">
                      <label className="col-md-4 control-label" htmlFor="available_quantity">Số lượng (kg):</label>
                      <div className="col-md-8">
                        <input id="available_quantity" name="available_quantity" placeholder="VD: 1kg" className="form-control input-md" required type="text"
                               defaultValue={this.state.data.quantity}
                               onChange={(e) => {
                                 let value = e.target.value
                                 this.setState(prev => {
                                   return {
                                     ...prev,
                                     data: {
                                       ...prev.data,
                                       quantity: value
                                     }
                                   }
                                 })
                               }}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="col-md-4 control-label" htmlFor="singlebutton" />
                      <div className="col-md-8">
                        <button id="singlebutton" name="singlebutton" className="btn btn-primary"
                          onClick={this.order}
                        >Đặt hàng</button>
                      </div>
                    </div>

                    <legend>Liên hệ</legend>
                    <p>Hotline : <b style={{color: 'red'}}>01684.756.756</b></p>
                    <p>Địa chỉ : 29 chợ Dịch Vọng hậu, Cầu Giấy, Hà Nội</p>
                  </fieldset>
                </div>
              </div>
              <div className="col-md-6">
                <fieldset>
                  <legend>Hình thức thanh toán</legend>
                  <p>Để thuận lợi hơn cho quí khách mua Cốm, chúng tôi có 2 hình thức thanh toán sau :</p>
                  <p>Khách hàng ở gần (bán kính 20km) : Quý khách thanh toán bằng chuyển khoản hoặc tiền mặt sau khi nhận cốm .</p>
                  <p>Khách hàng ở xa (trên 20km) : Quý khách vui lòng thanh toán 100% đơn hàng trước khi nhận hàng.</p>
                  <p><b>Thông tin tài khoản</b></p>
                  <p>Chủ tài khoản : <b style={{color: 'red'}}>Nguyễn Hữu Tú</b></p>
                  <p>Số tài khoản : <b style={{color: 'red'}}>0491000039525</b></p>
                  <p>Ngân hàng: <b style={{color: 'red'}}>Vietcombank chi nhánh Thăng Long</b></p>
                  <br/>
                  <p>Hotline : <b style={{color: 'red'}}>01684.756.756</b></p>
                  <p>Địa chỉ : 29 chợ Dịch Vọng hậu, Cầu Giấy, Hà Nội</p>
                </fieldset>
              </div>
            </div>
          </div>

          <Modal />
        </div>
      </div>
    );
  }
}

const Modal = () => {
  return (
    <div id="myModal" className="modal fade" role="dialog">
      <div className="modal-dialog">
        {/* Modal content*/}
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal">×</button>
            <h4 className="modal-title">Modal Header</h4>
          </div>
          <div className="modal-body">
            <p>
              Đặt hàng thành công, chúng tôi sẽ sớm liên lạc với bạn, nếu có gì thắc mắc xin lên hệ qua số điện thoại tư vấn và hỗ trợ <b style={{color: 'red'}}>0973.318.868</b>
            </p>
          </div>
          <div className="modal-footer">
            <Link to={'/san-pham'} className="btn btn-primary">Trang sản phẩm</Link>
            <button type="button" className="btn btn-default" data-dismiss="modal">Đóng cửa sổ</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
