import React from 'react'
import FacebookProvider, { Comments } from 'react-facebook';

const Main = ({post}) => {
    return (
      <div id="colContent">
        <div className="headno">
          <h1 className="title text-uppercase">
            <span id="ctl00_ctl00_ctl00_ContentPlaceHolder1_ContentPlaceHolder1_ContentPlaceHolder1_lblTitleNews">
              {mapSlugToName(post.category)}
            </span></h1>
        </div>

        <div className="wrapper-text">
          <h2>{post.title}</h2>
          <div className="post-body" dangerouslySetInnerHTML={{__html: post.body}} />
        </div>

        <FacebookProvider appID="1673979925975920" appId="1673979925975920">
          <Comments href={"http://comtuoi.com/tin-tuc"} data-numposts="5" />
        </FacebookProvider>

      </div>
    )
}

export { Main as default }

function mapSlugToName(slug) {
  switch(slug) {
    case 'mon-ngon-tu-com':
      return 'Món ngon từ cốm';
      break;
    case 'cach-lam-mon-ngon-tai-nha':
      return 'Cách làm món ngon tại nhà';
      break;
    case 'su-kien':
      return 'Sự kiện';
      break;
    case 'tin-tuc-tong-hop':
      return 'Tin tức tổng hợp'
      break;
    default:
      return ''
  }
}
