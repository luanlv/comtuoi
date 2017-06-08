import React from 'react'
import Link from '../Link'
import FacebookProvider, { Comments } from 'react-facebook';

class Slider extends React.Component {
  render () {
    const post = this.props.post
    return (
      <div>
        <div className="sliderBig bgm-2 slick-initialized slick-slider">
          <div className="slide slick-slide" data-slick-index={0} aria-hidden="true" style={{width: '100%'}}>
            <div className="news-big">
              <Link to={'/bai-viet/' + post.slug} className="news-img" style={{margin: 10}}>
                <img src={post.coverUrl.replace("\/image", "\/image\/small")} alt={post.title} /></Link>
              <div className="news-content">
                <h3 className="news-name">
                  <Link to={"/bai-viet/" + post.slug}>
                    {post.title}
                  </Link></h3>
                <div className="description">
                  {post.description.slice(0, 200)} ...
                </div>
                <div className="more-details">
                  <Link className="text-uppercase" to={'/bai-viet/' + post.slug}>
                    Xem chi tiết</Link></div>
              </div>
            </div>
          </div>
        </div>
        <ul className="slick-dots" style={{display: 'block'}}><li className aria-hidden="true"><button type="button" data-role="none">1</button></li><li aria-hidden="true" className><button type="button" data-role="none">2</button></li><li aria-hidden="false" className="slick-active"><button type="button" data-role="none">3</button></li></ul>
      </div>
    )
  }
}

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
              <div className="head lineh">
                <h2 className="title-2" style={{lineHeight: 37}}>
                  Món ngon</h2>
                <div className="head-list">
                  <Link to={"/danh-muc/mon-ngon-tu-com"}>
                    Món ngon từ cốm</Link>
                  <Link to={"/danh-muc/cach-lam-mon-ngon-tai-nha"}>
                    Cách làm món ngon tại nhà</Link>
                </div>
              </div>
              <div className="slider-wrap">
                <Slider post={firstPost} />
              </div>
              <div id="ctl00_ctl00_ctl00_ContentPlaceHolder1_ContentPlaceHolder1_ContentPlaceHolder1_UpdatePanel1">
                {posts.map((el, index) => {
                  return (
                    <div key={index} className="news-lbox">
                      <Link to={'/bai-viet/' + el.slug}
                         className="news-img">
                        <img src={el.coverUrl.replace("\/image", "\/image\/small")}
                             alt={el.title} />
                      </Link>
                      <div className="news-content">
                        <h3 className="news-name">
                          <Link to={'/bai-viet/' + el.slug}>
                            {el.title}</Link></h3>
                        <div className="description">
                          {el.description}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

          <FacebookProvider appID="1673979925975920" appId="1673979925975920">
            <Comments href="http://comtuoi.com/mon-ngon" data-numposts="5" />
          </FacebookProvider>
        </div>
      );
    }
  }
}

export { Main as default }
