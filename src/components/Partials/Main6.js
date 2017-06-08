import React from 'react'
import Link from '../Link'
import FacebookProvider, { Comments } from 'react-facebook';

class Main extends React.Component {
  render() {
    if (!this.props.product) {
      return (
        <div id="mainContent">
          Loading...
        </div>
      )
    } else {
      const product = this.props.product
      const products = this.props.products || []
      return (
        <div id="colContent">
              <div className="wrapper-details">
                <div className="details-content">
                  <h1 className="title">
                    {product.name}
                    </h1>
                </div>
              </div>
              <div className="wrapper-text detail-text">
                <div className="wrap-product">
                  <div className="details-img" style={{paddingRight: 5}}>
                    <img src={product.coverUrl} />
                  </div>
                  <div className="details-content details-content2">
                    <h4 className="title-2" style={{textAlign: 'center'}}>Thông tin sản phẩm</h4>
                    <div className="price-product" style={{textAlign: 'center'}}>
                      <em style={{color: 'red'}}>{numberWithCommas(product.price)} đ/kg</em>
                    </div>
                    <div className="product-status" style={{textAlign: 'center', borderTop: '1px solid #ddd'}}>
                      Mua trên 3kg giảm <b style={{color: 'blue'}}>10%</b>
                    </div>
                    <div className="product-ship" style={{textAlign: 'center', borderTop: '1px solid #ddd', borderBottom: '1px solid #ddd'}}>
                      <div className="centerText" style={{display: 'inline-block', paddingRight: 5}}>
                        Vận chuyển
                      </div>
                      <div style={{display: 'inline-block', borderLeft: '1px solid #ddd', paddingLeft: 5}}>
                        <div>{'<20km : 25k/đơn'}</div>
                        <div>{'>20km : 25k/kg' }</div>
                      </div>
                    </div>
                    <div className="wrap-button" style={{textAlign: 'center'}}>

                      <div className="col-w230 w258" style={{width: 250, float: 'none', textAlign: 'center'}}>
                        <div className="box-in" style={{margin: '0 auto'}}>
                          <Link to={"/lien-he-dat-hang?sp=" + product.slug} className="button-btn btn-b corner text-center blink_me2">Đặt hàng ngay!</Link>
                        </div>
                      </div>

                      <div className="col-w230 w298" style={{width: 250, float: 'none'}}>
                        <div className="box-in">
                          <a href="tel:01684756756" className="button-btn phone corner blink_me" style={{fontSize: 18, fontWeight: 'bold'}}>
                            Tư vấn: <b>01684 756 756</b></a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="wrapper-text" style={{marginTop: 20}}>
                  <div className="post-body" dangerouslySetInnerHTML={{__html: product.body}} />
                </div>
              </div>
              <div className="headno headpo">
                <h2 className="title">
                  Sản phẩm liên quan</h2>

              </div>

          <div className="wrap-section prom">
            <div className="product-tb pro-tb row">
              {products.map((el, index) => {
                return (
                  <div key={index} className="col-xs-4 element-item">
                    <div className="product-box">
                      <Link to={'/san-pham/' + el.slug} className="product-img">
                        <img src={el.coverUrl.replace("\/image", "\/image\/small")} alt={el.name} /></Link>
                      <div className="product-content">
                        <h3 className="product-name">
                          <Link to={'/san-pham/' + el.slug}>
                            {el.name}</Link></h3>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>


          <FacebookProvider appID="1673979925975920" appId="1673979925975920">
            <Comments href={"http://comtuoi.com/tin-tuc"} data-numposts="5" />
          </FacebookProvider>
      </div>
      )
    }
  }
}

export { Main as default }


function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
