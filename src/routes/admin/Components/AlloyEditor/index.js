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
  }

  render() {
    return (
      <div id={this.elementName}>
        test ok
      </div>
    );
  }

  componentDidMount() {
    var editor = AlloyEditor.editable(this.elementName);
    editor.get('nativeEditor').on('imageAdd', function(event) {
      var instance = this;

      // var target = event.details[0].target;
      console.log(event)
      // var progressbar = target.progressbar;
      //
      // if (progressbar) {
      //   progressbar.destroy();
      // }
      //
      // var data = JSON.parse(event.data);
      //
      // if (data.success) {
      //   var image = A.one(instance._editor.element.$).one('[data-random-id="' + data.file.randomId + '"]');
      //   console.log(image)
      //   if (image) {
      //     image.removeAttribute('data-random-id');
      //     image.removeClass(CSS_UPLOADING_IMAGE);
      //
      //     image.attr(data.file.attributeDataImageId, data.file.fileEntryId);
      //
      //     var editor = instance._editor;
      //
      //     var imageSrc = editor.config.attachmentURLPrefix ? editor.config.attachmentURLPrefix + data.file.title : data.file.url;
      //
      //     image.attr('src', imageSrc);
      //
      //     var imageContainer = image.ancestor();
      //
      //     image.unwrap(imageContainer);
      //
      //     imageContainer.remove();
      //
      //     editor.fire(
      //       'imageUploaded',
      //       {
      //         el: image,
      //         fileEntryId: data.file.fileEntryId,
      //         uploadImageReturnType: instance.get('uploadItemReturnType')
      //       }
      //     );
      //   }
      // }
      // else {
      //   instance._removeTempImage(data.file);
      // }
    });
  }

  componentWillUnmount() {

  }

}

export {FroalaEditor as default};
