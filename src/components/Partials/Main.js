import React from 'react'
import Link from '../../components/Link'
class Main extends React.Component {
  render() {
    const first_foodNews = this.props.data.foodNews.value.data[0]
    const foodNews = this.props.data.foodNews.value.data.slice(1, 4)
    const news = this.props.data.news.value.data.slice(0, 3)
    const products = this.props.data.products.value
    return (
      <div id="colContent">
        <h2 className="title text-uppercase">
          sản phẩm
        </h2>

        <div className="wrap-section line-bottom pro-site">
          <div className="product-tb pro-tb row">
            {products.map((el, index) => {
              return (
                <div key={index} className="col-xs-4 element-item">
                  <div className="product-box">
                    <Link to={'/san-pham/' + el.slug} className="product-img">
                      <img src={el.coverUrl.replace("\/image", "\/image\/small")} alt={el.title} /></Link>
                    <div className="product-content">
                      <h3 className="product-name">
                        <Link to={'/san-pham/' + el.slug} >
                          {el.name}</Link>
                      </h3>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="head lineh">
          <h2 className="title-2" style={{lineHeight: 37}}>
            Món ngon
          </h2>
          <div className="head-list">
            <Link to={'/danh-muc/mon-ngon-tu-com'}>
              Món ngon từ cốm</Link>
            <Link to="/danh-muc/cach-lam-mon-ngon-tai-nha" >
              Cách làm món ngon tại nhà</Link>
          </div>
        </div>

        <div className="wrap-section">
          <div className="section-box">
            <Link to={'/bai-viet/' + first_foodNews.slug} className="section-img">
              <img src={first_foodNews.coverUrl.replace("\/image", "\/image\/small")}
                   alt={first_foodNews.title}/>
              <span className="section-name">
                    {first_foodNews.title}
                  </span> </Link>
            <div className="description">
              {first_foodNews.description}
            </div>
          </div>


          <ul className="section-list">
            {foodNews.map((el, index) => {
              return (
                <li key={index}>
                  <Link className="section-img" to={'/bai-viet/' + el.slug}>
                    <img src={el.coverUrl.replace("\/image", "\/image\/small")}
                         alt={el.title} /></Link>
                  <div className="section-content">
                    <h3 className="section-name">
                      <Link to={'/bai-viet/' + el.slug}>
                        {el.title}
                      </Link>
                    </h3>
                    <div className="description">
                      {el.description.slice(0, 50)} ...
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
          <div className="more-all">
            <Link to="/mon-ngon"><span>Xem tất cả</span></Link>
          </div>
        </div>

        <div className="head lineh">
          <h2 className="title-2" style={{lineHeight: 37}}>
            Tin tức
          </h2>
          <div className="head-list">
            <Link to="/danh-muc/su-kien">
              Sự kiện</Link>
            <Link to="/danh-muc/tin-tuc-tong-hop">
              Tin tức tổng hợp</Link>
          </div>
        </div>


        <div className="wrap-section">
          <div id="isotopelist" className="section-tb row mobile100"
               style={{position: 'relative', height: '305.25px'}}>
            {news.map((el, index) => {
              return (
                <div key={index} className="col-lg-4 col-md-6 col-sm-4 col-xs-6  element-item">
                  <div className="box-news">
                    <Link className="section-img"
                          to={'/bai-viet/' + el.slug}>
                      <img
                        src={el.coverUrl.replace("\/image", "\/image\/small")}
                        alt={el.title}
                      /></Link>
                    <div className="section-content">
                      <h3 className="section-name">
                        <Link to={'/bai-viet/' + el.slug}>
                          {el.title}</Link>
                      </h3>
                      <div className="description">
                        {el.description.slice(0, 50)} ...
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="more-all">
            <Link to="/tin-tuc"><span>Xem tất cả</span></Link>
          </div>
        </div>

      </div>
    )
  }
}

export { Main as default }
