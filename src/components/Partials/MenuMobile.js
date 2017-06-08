import React from 'react'
import Link from '../Link'
class MenuMobile extends React.Component {
  closeMenu(){
    if(process.env.BROWSER) {
      console.log('close')
      $('#close-menu').trigger('click')
    }
  }
  render() {
    return (
      <div id="menumobile" className="mobile-panel mobile-left" style={{transform: 'translate3d(-120%, 0px, 0px)'}}>
        <div className="close-menu">
          <a id="close-menu" href="#menumobile" className="glyphicon glyphicon-remove-circle" />
        </div>
        <div className="menu-in">
          <div className="menu-mobile">
            <div className="logo">
              <Link to="/"
                onClick={this.closeMenu}
              >
                <img src="/assets/images/main_logo.png" alt="logo com hoa vang" /></Link></div>
            <ul className="menu-nav">
              <li><Link to="/san-pham" onClick={this.closeMenu} >Sản phẩm</Link>
                <ul>
                  <li><Link to="/san-pham/com-kho-hoa-vang" onClick={this.closeMenu} >
                    Cốm khô hoa vàng</Link></li>
                  <li>
                    <Link to="/san-pham/cha-com" onClick={this.closeMenu} >
                    Chả Cốm
                    </Link></li>
                  <li>
                    <Link to="/san-pham/com-non-me-tri" onClick={this.closeMenu} >
                      Cốm Non Mễ Trì
                    </Link></li>
                </ul>
              </li>
              <li><Link to="/mon-ngon" onClick={this.closeMenu} >MÓN NGON</Link>
                <ul>
                  <li><Link to="/danh-muc/mon-ngon-tu-com" onClick={this.closeMenu} >
                      <span className="icon-chevron-right iconl" />
                    Món ngon từ Cốm
                  </Link></li>
                  <li><Link to="/danh-muc/cach-lam-mon-ngon-tai-nha" onClick={this.closeMenu} >
                      <span className="icon-chevron-right iconl" />
                    Cách làm món ngon tài nhà
                  </Link></li>
                </ul>
              </li>
              <li className="active"><Link to="/tin-tuc" onClick={this.closeMenu} >TIN TỨC</Link>
                <ul>
                  <li><Link to="/danh-muc/su-kien" onClick={this.closeMenu} >
                    <span className="icon-chevron-right iconl" />
                    Sự kiện
                  </Link></li>
                  <li><Link to="/danh-muc/tin-tuc-tong-hop" onClick={this.closeMenu} >
                    <span className="icon-chevron-right iconl" />
                    Tin tức tổng hợp
                  </Link></li>
                </ul>
              </li>
              <li className="last"><Link to="/lien-he-dat-hang" onClick={this.closeMenu} >Liên hệ đặt hàng</Link></li>
            </ul>
            <div className="mo-box">
              <div className="hotline">
                Tổng đài CSKH: <strong>097 331 8868</strong></div>
            </div>
            <div className="mo-box">
              <div className="share">
                Follow me on <a target="_blank" href="https://www.facebook.com/comvongbathoa">
                  <img src="/assets/images/fa-1.png" alt /></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export { MenuMobile as default }
