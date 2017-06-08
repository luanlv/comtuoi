import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Header from '../../components/Partials/Header'
import Main from '../../components/Partials/Main'
import Aside from '../../components/Partials/Aside'
import Footer from '../../components/Partials/Footer'
import MenuMobile from '../../components/Partials/MenuMobile'

class Home extends React.Component {

  render() {
    return (
      <div >
        <div id="mainContent">
          <div className="container">
            <div id="banner-top" className="row">
              <div className="left col-md-3">
                <img src="/assets/images/banner_left.jpg" alt="banner 1"/>
              </div>
              <div className="right col-md-9">
                <img src="/assets/images/banner_right.jpg" alt="banner 2"/>
              </div>
            </div>
            <Main data={this.props.data} />
            <Aside />
          </div>
        </div>
      </div>
  );
  }
}

export default Home
