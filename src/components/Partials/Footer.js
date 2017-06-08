import React from 'react'
import Link from '../Link'

class Footer extends React.Component {
  render () {
    return (
      <div id="footer">
        <div className="footer-wrapper">
          <div className="container">

            <div className="footer-box mobi480h">
              <div className="dangky">
                <a href="http://online.gov.vn/CustomWebsiteDisplay.aspx?DocId=27183" target="_blank"><img src="/assets/images/dangky.png" alt="img" /></a></div>
            </div>

            <div className="footer-right">
              <div className="row">
                <div className="col-md-4 col-sm-6 col-xs-12">
                  <h2>
                    MÓN NGON TỪ CỐM </h2>
                  <ul className="list-footer">
                    <li><Link to={'/bai-viet/cach-lam-che-com-thom-mat'}>
                      Chè cốm
                        <span className="icona-left icon-chevron-right" /></Link></li>
                    <li><Link to={'/bai-viet/cach-lam-cha-com-ngon-tai-nha'}>
                      Chả cốm
                        <span className="icona-left icon-chevron-right" /></Link></li>
                    <li><Link to={'/bai-viet/com-xao---mon-an-binh-di-goi-nho-mua-thu'}>
                      Cốm xào
                        <span className="icona-left icon-chevron-right" /></Link></li>
                    <li><Link to={'/bai-viet/tom-chien-com-xanh-don-gian-la-mieng'}>
                      Tôm chiên cốm
                        <span className="icona-left icon-chevron-right" /></Link></li>
                    <li><Link to={'/bai-viet/mon-trung-ran-com-ngon-cho-ban-vung-ve'}>
                      Trứng cốm
                      <span className="icona-left icon-chevron-right" /></Link></li>
                  </ul>
                </div>
                <div className="col-md-4 col-sm-6 col-xs-12">
                  <h2>
                    THÔNG TIN WEBSITE</h2>
                  <ul className="list-footer">
                    <li><Link to={'/lien-he-dat-hang'}>
                        Hình thức thanh toán
                      <span className="icona-left icon-chevron-right" /></Link></li>
                    <li><Link to={'/lien-he-dat-hang'}>
                      Chính sách vận chuyển, giao nhận
                      <span className="icona-left icon-chevron-right" /></Link></li>
                    <li><Link to={'/lien-he-dat-hang'}>
                      Liên hệ đặt hàng
                      <span className="icona-left icon-chevron-right" /></Link></li>
                  </ul>
                </div>
                <div className="col-md-4 col-sm-12 col-xs-12">
                  <h2>CƠ SỞ SẢN XUẤT CỐM MỄ TRÌ</h2>
                  <ul className="address-box list-footer">
                    <li className="add-1"><span>Địa chỉ : 29 chợ Dịch Vọng hậu, Cầu Giấy, Hà Nội</span></li>
                    <li className="add-2"><span>Điện thoại : 01684 756 756</span></li>
                    <li className="add-5"><span>Email: <a href="mailto:comlangvong295@gmail.com">commetri295@gmail.com</a></span></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="footer-box mobi480s">

              <div className="dangky">
                <a href="http://online.gov.vn/CustomWebsiteDisplay.aspx" target="_blank"><img src="/assets/images/dangky.png" alt="img" /></a></div>
            </div>
          </div>
        </div>
        <div className="copyright">
          <div className="container">
            <div className="col-md-6">
              © 2017 COMTUOI. All rights reserved | <a href="http://vnguy.com/" target="_blank">
                Thiet Ke Web</a> <a href="http://vnguy.com/" target="_blank">VnGuy.Com</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export {Footer as default}
