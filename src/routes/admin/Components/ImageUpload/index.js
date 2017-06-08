import React from 'react'
import {Icon, Input, Button, DatePicker, Row, Col, Card, Upload, message, Modal} from 'antd';
import fetch from '../../../../core/fetch';

const Dragger = Upload.Dragger;

class ImageUpload extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      uploadArea: false,
      visible: false,
      selectedImage: {}
    }
  }

  onChange(info) {
    const status = info.file.status;
    if (status !== 'uploading') {
      // console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      this.props.handleUpload(info.file.response)
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }

  beforeUpload (file) {
    const isImage = file.type.match('image*')
    if (!isImage) {
      message.error('You can only upload Image file!');
    }
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      message.error('Image must smaller than 5MB!');
    }
    return isImage && isLt5M;
  }

  render() {
    return (
      <Dragger
        name={'image'}
        multiple={this.props.isMultiple}
        showUploadList = {false}
        action= {'/upload/image'}
        onChange={(info) => this.onChange(info)}
        beforeUpload={this.beforeUpload}
      >
        <p className="ant-upload-drag-icon">
          <Icon type="inbox" />
        </p>
        <p className="ant-upload-text">Kéo thả các các file vào bất kì nơi nào trên vùng này để tải lên.</p>
        <p className="ant-upload-hint">Hoặc bấm vào vùng này để chọn ảnh</p>
      </Dragger>
    )
  }
}

export default ImageUpload
