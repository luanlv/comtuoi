/* global CKEDITOR */
import React from 'react';
import {Modal, Form, Input, Icon, Tooltip, Button, Switch, DatePicker, Select, Row, Col, Card, Tabs, Affix, message} from 'antd';
import ReactResizeDetector from 'react-resize-detector';
import VisibilitySensor from 'react-visibility-sensor'
import ImageSelect from '../ImageSelect'
class CKEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      oldEditorSize: 0,
      isEndEditor: false,
      showModalSelectImage: false,
      selectImageType: '',
    }
    this.elementName = "editor_" + this.props.id;
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  showModalSelectImage = (type) => {
    this.setState(prev => {
      return {
        ...prev,
        modalSelectImage: true,
        selectImageType: type
      }
    });
  }
  handleOk = (e) => {
    console.log(e);
    this.setState({
      modalSelectImage: false,
    });
  }
  handleCancel = (e) => {
    this.setState({
      modalSelectImage: false,
    });
  }

  handleSelectImage(img){
    this.setState(prevState => {
      return {
        ...prevState,
        modalSelectImage: false,
      }
    })
    this.editor.insertHtml( '<p style="text-align:center"><img alt="eS9cTTQzZT-3.jpg" src="' + '/image/' + img.name + '" /></p><br/>' );
  }

  render() {
    return (
      <div>
        <Row>
          <Col className="padding-5">
            <span
              id="addImage"
              style={{marginRight: 10}}
              onClick={() => this.showModalSelectImage('editor')}
            />
          </Col>

          <Col>
            <ReactResizeDetector handleWidth handleHeight onResize={(w, h) => {
              let diff = h - this.state.oldEditorSize
              if(this.state.isEndEditor && diff > 0) {
                var y = $(window).scrollTop();
                $(window).scrollTop(y + diff);
              }
              this.setState({
                oldEditorSize: h
              })
            }} />
            <div id="toolbarLocation" />
            <textarea name={this.elementName} defaultValue={this.props.value} />
            <div style={{height: 20}} />
            <VisibilitySensor onChange={(isVisible) => {
              this.setState({
                isEndEditor: !isVisible
              })
            }} />
          </Col>

          <Col>
            <Modal
              style={{top: 30}}
              width="90%"
              title="Basic Modal" visible={this.state.modalSelectImage}
              onOk={this.handleOk} onCancel={this.handleCancel}
            >
              <ImageSelect handleSelect={(img) => this.handleSelectImage(img)} />
            </Modal>
          </Col>
        </Row>
      </div>
    );
  }

  componentDidMount() {
    let configuration = {
      // removePlugins : 'magicline',
      extraPlugins : 'autogrow,image2,sharedspace,colorbutton,justify,font',
      uploadUrl: '/upload/imageCKEditor',
      disallowedContent : 'img{width,height}',
      sharedSpaces: {
        top: 'toolbarLocation'
      }
    }
    this.editor = CKEDITOR.replace(this.elementName, configuration);
    CKEDITOR.instances[this.elementName].on("change", function () {
      let data = CKEDITOR.instances[this.elementName].getData();
      this.props.onChange(data);
    }.bind(this));

    CKEDITOR.on('instanceReady', function(ev) {
      ev.editor.focus()
    });
    $("#toolbarLocation").sticky({topSpacing:0});

    this.editor.addCommand("mySimpleCommand", { // create named command
      exec: function(edt) {
        $( "#addImage" ).trigger( "click" )
      }
    });

    this.editor.ui.addButton('SuperButton', { // add new button and bind our command
      label: "Click me",
      command: 'mySimpleCommand',
      toolbar: 'insert',
      icon: '/assets/add-image.png'
    });

  }

  componentWillUnmount() {
    console.log('destroy')
    this.editor.destroy()
  }

}

export {CKEditor as default};
