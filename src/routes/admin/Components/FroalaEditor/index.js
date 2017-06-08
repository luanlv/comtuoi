/* global CKEDITOR */
import React from 'react';
import ReactResizeDetector from 'react-resize-detector';
import VisibilitySensor from 'react-visibility-sensor'

class FroalaEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      oldEditorSize: 0,
      isEndEditor: false
    }
    this.elementName = "editor_" + this.props.id;
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  render() {
    return (
      <div>

        <textarea id={this.elementName} defaultValue={this.props.value} />
      </div>
    );
  }

  componentDidMount() {
    $('#' + this.elementName)
      .froalaEditor({
        // Set the image upload parameter.
        imageUploadParam: 'image',

        // Set the image upload URL.
        imageUploadURL: '/upload/imageFroala',

        // Additional upload params.
        // imageUploadParams: {id: 'my_editor'},

        // Set request type.
        imageUploadMethod: 'POST',

        // Set max image size to 5MB.
        imageMaxSize: 5 * 1024 * 1024,

        // Allow to upload PNG and JPG.
        imageAllowedTypes: ['jpeg', 'jpg', 'png']
      })
      // .on('froalaEditor.image.beforeUpload', function (e, editor, images) {
        // Return false if you want to stop the image upload.
      // })
      .on('froalaEditor.image.uploaded', function (e, editor, response) {
        console.log(response)
        // Image was uploaded to the server.
      })
      .on('froalaEditor.image.inserted', function (e, editor, $img, response) {
        // Image was inserted in the editor.
      })
      .on('froalaEditor.image.replaced', function (e, editor, $img, response) {
        // Image was replaced in the editor.
      })

  }

  componentWillUnmount() {

  }

}

export {FroalaEditor as default};
