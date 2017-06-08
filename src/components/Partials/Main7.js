import React from 'react'
import Link from '../Link'
import FacebookProvider, { Comments } from 'react-facebook';

class Main extends React.Component {
  render() {
    if (this.props.products.length < 1) {
      return (
        <div id="mainContent">
          Loading...
        </div>
      )
    } else {
      const products = this.props.products
      return (
        <div id="colContent">
          <div id="bannerSub">
            <div className="slider-wrapper">
            </div>
          </div>
          <div className="head-la head-pro">
            <h2 className="title text-uppercase">
              sản phẩm</h2>
            {/*<div className="h-link">*/}
              {/*<a href="nghien-cuu.aspx">*/}
                {/*Nghiên cứu phát triển</a>*/}
            {/*</div>*/}
            {/*<div className="link-nc">*/}
              {/*<a href="nghien-cuu.aspx">Click me</a>*/}
            {/*</div>*/}
          </div>
          <div className="wrap-section">
            <div className="product-tb row isotopelist listfull">
              {products.map((el, index) => {
                return (
                  <div className="col-xs-12 element-item" key={index}>
                    <div className="product-box">
                      <Link to={'/san-pham/' + el.slug} className="product-img">
                        <img src={el.coverUrl.replace("\/image", "\/image\/small")} alt={el.title} /></Link>
                      <div className="product-content">
                        <h3 className="product-name">
                          <Link to={'/san-pham/' + el.slug} >
                            {el.name}
                          </Link>
                        </h3>
                        <div className="description">
                          {el.description} ...
                        </div>
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
