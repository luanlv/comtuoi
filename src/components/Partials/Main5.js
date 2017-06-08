import React from 'react'
import Link from '../Link'
import FacebookProvider, { Comments } from 'react-facebook';

class Main extends React.Component {
  render() {
    if (this.props.posts.data.length < 1) {
      return (
        <div id="mainContent">
          Loading...
        </div>
      )
    } else {
      const firstPost = this.props.posts.data[0]
      const posts = this.props.posts.data.slice(1)
      return (
        <div id="colContent">
          <div className="headno">
            <h1 className="title text-uppercase">
              <span id="ctl00_ctl00_ctl00_ContentPlaceHolder1_ContentPlaceHolder1_ContentPlaceHolder1_lblCategory">{this.props.title}</span>
            </h1>
          </div>
          <div className="news-big line-bottom mb12">
            <Link to={"/bai-viet/" + firstPost.slug} className="news-img">
              <img src={firstPost.coverUrl.replace("\/image", "\/image\/small")}
                   alt={firstPost.title}/></Link>
            <div className="news-content">
              <h3 className="news-name">
                <Link to={"/bai-viet/" + firstPost.slug}>
                  {firstPost.title}
                </Link></h3>
              <div className="description">
                {firstPost.description.slice(0, 50)} ...
              </div>
              <div className="more-details">
                <Link to={'/bai-viet/' + firstPost.slug}>Xem chi tiết</Link></div>
            </div>
          </div>

          {posts.map((el, index) => {
            return (
              <div key={index} className="news-lbox">
                <Link
                  to={'/bai-viet/' + el.slug}
                  className="news-img">
                  <img
                    src={el.coverUrl.replace("\/image", "\/image\/small")}
                    alt={el.title}/>
                </Link>
                <div className="news-content">
                  <h3 className="news-name">
                    <Link
                      to={'/bai-viet/' + el.slug}>
                      {el.title}
                    </Link></h3>
                  <div className="description">
                    {el.description}
                  </div>
                </div>
              </div>
            )
          })}
          <FacebookProvider appID="1673979925975920" appId="1673979925975920">
            <Comments href={"http://comtuoi.com/tin-tuc"} data-numposts="5" />
          </FacebookProvider>
        </div>
      )
    }
  }
}

export { Main as default }
