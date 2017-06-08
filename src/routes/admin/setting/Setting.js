import React, { PropTypes } from 'react';
import { Button, DatePicker, Switch, Row, Col, message, Collapse, Input} from 'antd';
// import CodeMirror from '../Components/CodeMirror'
import fetch from '../../../core/fetch';
import axios from 'axios'
const Panel = Collapse.Panel;
var CodeMirror = require('react-codemirror')
if(process.env.BROWSER) {
  require('codemirror/mode/javascript/javascript');
  require('codemirror/mode/xml/xml');
  require('codemirror/mode/css/css');
}

class Setting extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  constructor(props){
    super(props)
    this.state = {
      setting: {}
    }
    this.init()
  }

  async init () {
    const resp = await fetch('/graphql', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: '{ setting{ssr, css, scriptTop, scriptBottom, adminId, emailAdmin} }',
      }),
      credentials: 'include',
    })
    const {data} = await resp.json();
    this.setState({
      setting: data.setting
    })
  }

  async toggleSSR () {
    this.setState((prevState) => {
      return {
        ...prevState,
        setting: {
          ...prevState.setting,
          ssr: !prevState.setting.ssr
        }
      }
    })
    const resp = await fetch('/graphql', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: 'mutation { updateSetting(ssr: ' + !this.state.setting.ssr + ') { ssr } }',
      }),
      credentials: 'include',
    })
    const {data} = await resp.json();
    if(data.updateSetting) {
      message.success('Update successful');
      this.setState((prevState) => {
        return {
          ...prevState,
          setting: {
            ...prevState.setting,
            ssr: data.updateSetting.ssr
          }
        }
      })
    } else {
      this.setState((prevState) => {
        return {
          ...prevState,
          setting: {
            ...prevState.setting,
            ssr: !prevState.setting.ssr
          }
        }
      })
    }
  }

  updateSetting(setting){
    axios.post('/api/setting/update', setting)
      .then(res => {
        message.success('Cập nhập thành công!')
      })
      .catch(err => {
        message.error('Cập nhập thất bại')
      })
  }

  render() {
    return (
        <div>
          {this.state.setting.ssr !== undefined &&
          <Row className="padding-5">
            <b>SSR: </b>
            <Switch checked={this.state.setting.ssr} onChange={() => this.toggleSSR()} />
          </Row>}
          {this.state.setting.adminId !== undefined &&
          <Row className="padding-5">
            <b>Facebook Admin ID: </b>
            <br/>
            <Input size="large"  defaultValue={this.state.setting.adminId} onChange={(e) => {
              let value = e.target.value
              this.setState(prev => {
                return {
                  ...prev,
                  setting: {
                    ...prev.setting,
                    adminId: value
                  }
                }
              })
            }} />
          </Row>}
          {this.state.setting.emailAdmin !== undefined &&
          <Row className="padding-5">
            <b>Facebook Admin ID: </b>
            <br/>
            <Input size="large"  defaultValue={this.state.setting.emailAdmin} onChange={(e) => {
              let value = e.target.value
              this.setState(prev => {
                return {
                  ...prev,
                  setting: {
                    ...prev.setting,
                    emailAdmin: value
                  }
                }
              })
            }} />
          </Row>}
          <Collapse>
            <Panel header={'STYLESHEETS'} key="1">
              {this.state.setting.css !== undefined &&
              <Row className="padding-5">
                <CodeMirror
                  value={this.state.setting.css} onChange={(value) => this.setState(prev => {
                  return {
                    ...prev,
                    setting: {
                      ...prev.setting,
                      css: value
                    }
                  }
                })}
                />

              </Row>}
            </Panel>
            <Panel header={'Javascript đầu trang'} key="2">
              {this.state.setting.scriptTop !== undefined &&
              <Row className="padding-5">
                <CodeMirror
                  value={this.state.setting.scriptTop} onChange={(value) => this.setState(prev => {
                  return {
                    ...prev,
                    setting: {
                      ...prev.setting,
                      scriptTop: value
                    }
                  }
                })}
                />
              </Row>}
            </Panel>
            <Panel header={'Javascript cuối trang'} key="3">
              {this.state.setting.scriptBottom !== undefined &&
              <Row className="padding-5">
                <CodeMirror
                  value={this.state.setting.scriptBottom} onChange={(value) => this.setState(prev => {
                  return {
                    ...prev,
                    setting: {
                      ...prev.setting,
                      scriptBottom: value
                    }
                  }
                })}
                />
              </Row>}
            </Panel>
          </Collapse>
          <Row className="padding-5">
            <Button
              size="large"
              type="primary"
              onClick={() => {
                this.updateSetting(this.state.setting)
              }}
            >Cập nhập</Button>
          </Row>
        </div>
    );
  }
}

export default Setting
