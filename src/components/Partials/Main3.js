import React from 'react'
import Link from '../Link'
import FacebookProvider, { Comments } from 'react-facebook';

class Main extends React.Component {
  render() {
    const {page, totalPage, data} = this.props.news
    const news = data
    return (
      <div id="colContent">
        <div className="head lineh">
          <h2 className="title-2" style={{lineHeight: 37}}>
            tin tức</h2>
          <div className="head-list">
            <Link to="/danh-muc/su-kien">
              Sự kiện</Link>
            <Link to="/danh-muc/tin-tuc-tong-hop">
              Tin tức tổng hợp</Link>
          </div>
        </div>

        <div className="news-big line-bottom">
          <Link to={'/bai-viet/' + news[0].slug} className="news-img">
            <img src={news[0].coverUrl.replace("\/image", "\/image\/small") } /></Link>
          <div className="news-content">
            <h3 className="news-name">
              <Link to={'/bai-viet/' + news[0].slug}>
                {news[0].title}
              </Link></h3>
            <div className="description">
              {news[0].description}
            </div>
            <div className="more-details">
              <Link to={'/bai-viet/' + news[0].slug}>
                Xem chi tiết</Link></div>
          </div>
        </div>

        <div id="ctl00_ctl00_ctl00_ContentPlaceHolder1_ContentPlaceHolder1_ContentPlaceHolder1_UpdatePanel1">
          <div className="wrap-section pro-site">
            <div className="product-tb row" style={{position: 'relative', height: '1656.63px'}}>
              {news.map((el, index) => {
                return (
                  <div key={index} className="col-xs-4 element-item" >
                    <div className="product-box">
                      <Link to={'/bai-viet/' + el.slug} className="product-img">
                        <img src={el.coverUrl.replace("\/image", "\/image\/small")} /></Link>

                      <div className="product-content">
                        <h3 className="product-name" style={{height: 80}}>
                          <Link to={'/bai-viet/' + el.slug}>
                            {el.title}
                          </Link>
                        </h3>
                        <div className="description" style={{height: 60}}>
                          {el.description}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <div id="pagerp" className="pager">
            <span id="ctl00_ctl00_ctl00_ContentPlaceHolder1_ContentPlaceHolder1_ContentPlaceHolder1_DataPager1"><span className="first">First</span>&nbsp;<span className="prev">Previous</span>&nbsp;<span className="current">1</span>&nbsp;<a className="numer-paging" href="javascript:__doPostBack('ctl00$ctl00$ctl00$ContentPlaceHolder1$ContentPlaceHolder1$ContentPlaceHolder1$DataPager1$ctl02$ctl01','')">2</a>&nbsp;<a className="numer-paging" href="javascript:__doPostBack('ctl00$ctl00$ctl00$ContentPlaceHolder1$ContentPlaceHolder1$ContentPlaceHolder1$DataPager1$ctl02$ctl02','')">3</a>&nbsp;<a className="numer-paging" href="javascript:__doPostBack('ctl00$ctl00$ctl00$ContentPlaceHolder1$ContentPlaceHolder1$ContentPlaceHolder1$DataPager1$ctl02$ctl03','')">4</a>&nbsp;<a className="numer-paging" href="javascript:__doPostBack('ctl00$ctl00$ctl00$ContentPlaceHolder1$ContentPlaceHolder1$ContentPlaceHolder1$DataPager1$ctl02$ctl04','')">5</a>&nbsp;&nbsp;<a href="javascript:__doPostBack('ctl00$ctl00$ctl00$ContentPlaceHolder1$ContentPlaceHolder1$ContentPlaceHolder1$DataPager1$ctl02$ctl05','')">...</a>&nbsp;<a className="next" href="javascript:__doPostBack('ctl00$ctl00$ctl00$ContentPlaceHolder1$ContentPlaceHolder1$ContentPlaceHolder1$DataPager1$ctl03$ctl00','')">Next</a>&nbsp;<a className="last" href="javascript:__doPostBack('ctl00$ctl00$ctl00$ContentPlaceHolder1$ContentPlaceHolder1$ContentPlaceHolder1$DataPager1$ctl04$ctl00','')">Last</a>&nbsp;</span>
          </div>
        </div>

        <FacebookProvider appID="1673979925975920" appId="1673979925975920">
          <Comments href={"http://comtuoi.com/tin-tuc"} data-numposts="5" />
        </FacebookProvider>
      </div>
    );
  }
}

export { Main as default }
