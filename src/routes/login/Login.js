/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Login.css';
import axios from 'axios';

class Login extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  render() {
    return (
      <div className={s.root}>
        <div className={s.container} style={{paddingTop: 50}}>

          <div className={s.formGroup}>
            <a className={s.facebook} href="/auth/facebook">
              <svg
                className={s.icon}
                width="30"
                height="30"
                viewBox="0 0 30 30"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22 16l1-5h-5V7c0-1.544.784-2 3-2h2V0h-4c-4.072 0-7 2.435-7 7v4H7v5h5v14h6V16h4z"
                />
              </svg>
              <span>Log in with Facebook</span>
            </a>
          </div>

          <strong className={s.lineThrough}>OR</strong>

          <form className='ui large form' action='/auth/login' method='POST'
                onSubmit={(e) => {
                  e.preventDefault()
                  var $username = $(e.target).find('[name=username]').val()
                  var $password = $(e.target).find('[name=password]').val()
                  let data = {
                    username: $username,
                    password: $password
                  }
                  axios.post(
                    '/auth/login',
                    data
                  ).then((res) => {
                    if (res.data) {
                      window.location.reload()
                    } else {
                      $('#loginError').text('Sai tên đăng nhập hoặc mật khẩu')
                    }
                  }).catch((err) => {
                    console.log(err)
                  })
                }}
          >
            <div className='ui stacked segment'>
              <div className='field'>
                <div className='ui left icon input'>
                  <i className='user icon' />
                  <input type='text' placeholder='E-mail' id='username' name='username' />
                </div>
              </div>
              <div className='field'>
                <div className='ui left icon input'>
                  <i className='lock icon' />
                  <input type='password' placeholder='Mật khẩu' id='password' name='password' />
                </div>
              </div>
              <button type='submit' className='ui fluid large teal submit button'
                      onClick={() => {
                        console.log('on click !')
                      }}
              >Đăng nhập</button>
            </div>

            <div className='ui error message' />
          </form>





        </div>
      </div>
    );
  }
}

export default withStyles(s)(Login);
