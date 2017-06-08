import React from 'react'
import {Icon, Input, Button, DatePicker, Row, Col, Card, Upload, message, Modal, Slider, Switch, Radio, Popconfirm} from 'antd';
import fetch from '../../../../core/fetch';
import ReactAvatarEditor from 'react-avatar-editor'
import axios from 'axios'

class ImageEditor extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      slug: this.props.slug || '',
      name: this.props.name || '',
      imageRef: this.props.imageRef || '',
      position: { x: 0.5, y: 0.5 },
      scale: 1,
      rotate: 0,
      rate: 'keepOld',
      borderRadius: 0,
      preview: null,
      width: this.props.width || 200,
      initWidth: this.props.width || 200,
      height: this.props.height || 200,
      initHeight: this.props.height || 200,
      override: true,
      background: 'transparent'
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState(prev => {
      return {
        ...prev,
        imageRef: nextProps.imageRef || '',
        width: this.props.width || 200,
        initWidth: this.props.width || 200,
        height: this.props.height || 200,
        initHeight: this.props.height || 200,
      }
    })
  }

  handleSave = (data) => {
    let that = this
    const img = this.editor.getImageScaledToCanvas().toDataURL()
    const rect = this.editor.getCroppingRect()
    axios.post('/upload/imageEditor', {
      override: this.state.override,
      name: this.state.name,
      slug: this.state.slug,
      img: img
    })
      .then(function (res) {
        that.props.handleOk()
      })
      .catch(function (err) {
        console.log(err)
      })
  }

  handleScale = (value) => {
    const scale = value
    this.setState({ scale })
  }

  rotateLeft = (e) => {
    e.preventDefault()

    this.setState({
      rotate: this.state.rotate - 90
    })
  }

  rotateRight = (e) => {
    e.preventDefault()
    this.setState({
      rotate: this.state.rotate + 90
    })
  }

  handleBorderRadius = (e) => {
    const borderRadius = parseInt(e.target.value)
    this.setState({ borderRadius })
  }

  handleXPosition = (value) => {
    const x = value
    this.setState({ position: { ...this.state.position, x } })
  }

  handleYPosition = (value) => {
    const y = value
    this.setState({ position: { ...this.state.position, y } })
  }

  handleWidth = (e) => {
    const width = parseInt(e.target.value)
    this.setState({ width })
  }

  handleHeight = (e) => {
    console.log(e)
    const height = parseInt(e.target.value)
    this.setState({ height })
  }

  logCallback (e) {
    console.log('callback', e)
  }

  setEditorRef = (editor) => {
    if (editor) this.editor = editor
  }

  handlePositionChange = position => {
    console.log('Position set to', position)
    this.setState({ position })
  }

  heightWithRate (width, height) {
    if(this.state.rate === 'keepOld'){
      return Math.round(width * this.state.initHeight / this.state.initWidth)
    } else if(this.state.rate === 'custom'){
      return height
    } else if ( this.state.rate === '4-3'){
      return Math.round(width * 3 / 4)
    } else if ( this.state.rate === '1-1') {
      return width
    } else if ( this.state.rate === '3-4') {
      return Math.round(width * 4 / 3)
    }
    return height
  }
  render() {
    return (
      <div>
        <Row>
          <Col xs={12} style={{padding: 15}}>
            <ReactAvatarEditor
              style={{background: this.state.background}}
              ref={this.setEditorRef}
              scale={parseFloat(this.state.scale)}
              width={this.state.width}
              height={this.heightWithRate(this.state.width, this.state.height)}
              position={this.state.position}
              onPositionChange={this.handlePositionChange}
              rotate={parseFloat(this.state.rotate)}
              borderRadius={this.state.borderRadius}
              onSave={this.handleSave}
              onLoadFailure={this.logCallback.bind(this, 'onLoadFailed')}
              onLoadSuccess={this.logCallback.bind(this, 'onLoadSuccess')}
              onImageReady={this.logCallback.bind(this, 'onImageReady')}
              onImageLoad={this.logCallback.bind(this, 'onImageLoad')}
              onDropFile={this.logCallback.bind(this, 'onDropFile')}
              image={this.state.imageRef}
            />
          </Col>

          <Col xs={12}>
            {/*{ !!this.state.preview &&*/}
            {/*<img*/}
            {/*src={this.state.preview.img}*/}
            {/*style={{ borderRadius: `${(Math.min(this.state.preview.height, this.state.preview.width) + 10) * ((this.state.preview.borderRadius / 2) / 100)}px` }}*/}
            {/*/>*/}
            {/*}*/}

            <b>Tỷ lệ phóng to (<span style={{color: 'blue'}}>{this.state.scale})</span>:</b>
            <Slider
              name='scale'
              type='range'
              min={1} max={5}
              step={0.01}
              onChange={this.handleScale}
              defaultValue={1}
            />
            <br />
            <b>Nền (Không ảnh hưởng đến ảnh):</b>
            <br/>
            <Radio.Group value={this.state.background} onChange={e => {
              this.setState(prev => {
                return {
                  prev,
                  background: e.target.value
                }
              })
            }}>
              <Radio.Button value="transparent">Trong suốt</Radio.Button>
              <Radio.Button value="red">Nền đỏ</Radio.Button>
              <Radio.Button value="blue">Nền xanh da trời</Radio.Button>
              <Radio.Button value="green">Nền xanh lá cây</Radio.Button>
            </Radio.Group>
            <br />
            <br />
            <b>Tỷ lệ:</b>
            <br/>
            <Radio.Group value={this.state.rate} onChange={value => {
              this.setState(prev => {
                return {
                  prev,
                  rate: value.target.value
                }
              })
            }}>
              <Radio.Button value="keepOld">Như ảnh cũ</Radio.Button>
              <Radio.Button value="custom">Tự do</Radio.Button>
              <Radio.Button value="4-3">4/3</Radio.Button>
              <Radio.Button value="1-1">1/1</Radio.Button>
              <Radio.Button value="3-4">3/4</Radio.Button>
            </Radio.Group>
            <br/>
            <br/>
            <b>Chiều dài:</b>
            <Input
              name='width'
              type='number'
              onChange={this.handleWidth}
              min='50'
              max='400'
              step='10'
              value={this.state.width}
            />
            <br />
            <br />
            <b>Chiều rộng:</b>
            <Input
              disabled={this.state.rate !== 'custom'}
              name='height'
              type='number'
              onChange={this.handleHeight}
              min='50'
              max='400'
              step='10'
              value={this.heightWithRate(this.state.width, this.state.height)}
            />
            <br />
            <br />
            <b>Quay ảnh:</b>
            <div>
              <Button onClick={this.rotateLeft}>Quay trái</Button>
              <Button onClick={this.rotateRight}>Quay phải</Button>
            </div>
            <br />
            <b>Đè ảnh cũ: </b>
            <Switch checked={this.state.override} onChange={(value) => {
              this.setState(prev => {
                return {
                  ...prev,
                  override: !prev.override
                }
              })
            }} />
            <br/>
            <br/>

            <Popconfirm placement="right"
                        onConfirm={this.handleSave}
                        okText="Đồng ý" cancelText="Hủy">
              <Button  type="primary">
                {this.state.override ? 'Thay thế ảnh cũ' : 'Thêm ảnh mới'}
              </Button>
            </Popconfirm>

          </Col>

        </Row>

      </div>
    )
    console.log(parseFloat(this.state.scale))
  }
}

class ImageWithRect extends React.Component {
  constructor (props) {
    super(props)

    this.setCanvas = this.setCanvas.bind(this)
    this.handleImageLoad = this.handleImageLoad.bind(this)
  }

  componentDidMount () {
    this.redraw()
  }

  componentDidUpdate () {
    this.redraw()
  }

  setCanvas (canvas) {
    if (canvas) this.canvas = canvas
  }

  handleImageLoad () {
    const ctx = this.canvas.getContext('2d')
    const { rect, width, height } = this.props

    ctx.clearRect(0, 0, width, height)

    ctx.strokeStyle = 'red'

    if (rect && (rect.width > 1 || rect.height > 1)) {
      ctx.drawImage(
        this.imgElement,
        Math.round(-rect.x * (width / rect.width)),
        Math.round(-rect.y * (height / rect.height)),
        Math.round(width / rect.width),
        Math.round(height / rect.height)
      )

      if (rect) {
        ctx.strokeRect(
          1,
          1,
          Math.round(width) - 2,
          Math.round(height) - 2
        )
      }
    } else {
      ctx.drawImage(this.imgElement, 0, 0, width, height)

      if (rect) {
        ctx.strokeRect(
          Math.round(rect.x * width) + 0.5,
          Math.round(rect.y * height) + 0.5,
          Math.round(rect.width * width),
          Math.round(rect.height * height)
        )
      }
    }
  }

  redraw () {
    const img = new Image()

    img.src = this.props.image
    img.onload = this.handleImageLoad
    this.imgElement = img
  }

  render () {
    return (
      <canvas
        ref={this.setCanvas}
        style={this.props.style}
        width={this.props.width}
        height={this.props.height}
      />
    )
  }
}


export default ImageEditor
