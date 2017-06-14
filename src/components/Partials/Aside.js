import React from 'react'
import Link from '../Link'
import FacebookProvider, { Page } from 'react-facebook';

class Aside extends React.Component {
  render() {
    return (
      <div id="colAside">
        <div className="row">
          <div className="col-md-12 col-xs-6">
          </div>
          <div className="col-md-12 col-xs-6">
            {/*<div className="adv">*/}
              {/*<Link to={'/'}>*/}
                {/*<img src="/assets/images/hotline.jpg" alt="Hotline" /></Link>*/}
            {/*</div>*/}
            {/*<div className="adv">*/}
              {/*<Link to={'/'}>*/}
                {/*<img src="/assets/images/mon-ngon-tu-com.jpg" alt="cac mon ngon tu com" /></Link>*/}
            {/*</div>*/}
          </div>
        </div>

        <div className="row">
          <div className="col-md-12 col-xs-6">
          </div>
          <div className="col-md-12 col-xs-6">
            <div className="wrap-video">
              <a href=" https://www.youtube.com/watch?v=UFr0rU3es4M" target="_blank" className="videob">
                <img src="/assets/images/video-com.jpg"
                     alt="video-com.jpg"/>
                <span className="ico-play">
                    </span></a>
              <div className="video-content">
                <h3 className="video-name">
                  <Link to="/">Đặc sản Cốm Làng Vòng Thủ Đô Hà Nội</Link></h3>
              </div>
            </div>
            <ul className="list-video">
              <li><Link to="/bai-viet/thuc-don-3-mon-gian-di-ma-ngon-cho-ngay-luoi-vao-bep" className="video-box"><span className="video-img">
                        <img src="/image/small/niolaFMsg1-1492484092-14924837329720-untitled-1.jpg" id="ctl00_ctl00_ctl00_ContentPlaceHolder1_cphAside_lstVideo_ctrl0_lstListVideo_ctrl0_Img3" alt="R8cvtxxu3g-che-com-03.jpg" />
                      </span><span className="video-content"><span className="video-name">
                          Thực đơn 3 món giản dị mà ngon cho ngày lười vào bếp </span> </span></Link>
              </li>
              <li><Link to="/bai-viet/com-vong-thom-ngon-duoc-lam-cong-phu-the-nao" className="video-box"><span className="video-img">
                        <img src="/image/small/q8u9mdGl1f-8dd01a94-a7ba-44f0-9469-026371258284.jpg" id="ctl00_ctl00_ctl00_ContentPlaceHolder1_cphAside_lstVideo_ctrl0_lstListVideo_ctrl1_Img3" alt="Cốm Mễ Trì thơm ngon được làm công phu thế nào.jpg" />

                      </span><span className="video-content"><span className="video-name">
                          Cốm vòng thơm ngon được làm công phu thế nào?</span> </span></Link>
              </li>
            </ul>
          </div>
        </div>
        <FacebookProvider appID="1673979925975920" appId="1673979925975920">
          <Page href="https://www.facebook.com/comvongbathoa/" data-numposts="5" />
        </FacebookProvider>

      </div>
    )
  }
}

export {Aside as default}
