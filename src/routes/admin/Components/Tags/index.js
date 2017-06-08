import React from 'react'
import { Tag, Input, Tooltip, Button } from 'antd';
import slug from 'slug'

class EditableTagGroup extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      tags: this.props.defaultValue || [],
      inputVisible: false,
      inputValue: '',
    }
  }

  handleClose = (removedTag) => {
    const tags = this.state.tags.filter(tag => tag.slug !== removedTag);
    this.setState({ tags });
    this.props.handleChange(tags || [])
  }
  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  }

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  }

  handleInputConfirm = () => {
    const state = this.state;
    const inputValue = state.inputValue;
    let tags = state.tags;
    if (inputValue && indexByField(tags, 'slug', slug(inputValue, {lower: true}))) {
      tags = [...tags, {name: inputValue, slug: slug(inputValue, {lower: true}) }];
    }
    this.setState({
      tags,
      inputVisible: false,
      inputValue: '',
    });
    this.props.handleChange(tags || [])
  }

  saveInputRef = input => this.input = input

  render() {
    const { tags, inputVisible, inputValue } = this.state;
    return (
      <div>
        {tags.map((tag, index) => {
          const isLongTag = tag.name.length > 20;
          const tagElem = (
            <Tag key={index} closable afterClose={() => this.handleClose(tag)}>
              {isLongTag ? `${tag.name.slice(0, 20)}...` : tag.name}
            </Tag>
          );
          return isLongTag ? <Tooltip title={tag.name}>{tagElem}</Tooltip> : tagElem;
        })}
        {inputVisible && (
          <Input
            ref={this.saveInputRef}
            type="text" size="small"
            style={{ width: 78 }}
            value={inputValue}
            onChange={this.handleInputChange}
            onBlur={this.handleInputConfirm}
            onPressEnter={this.handleInputConfirm}
          />
        )}
        {!inputVisible && <Button size="small" type="dashed" onClick={this.showInput}>+ New Tag</Button>}
      </div>
    );
  }
}

function indexByField(list = [], fieldName, value){
  let lenth = list.length
  for (let i = 0; i< lenth; i++) {
    if (list[i][fieldName] === value) {
      return i
    }
  }
  return -1
}

export default EditableTagGroup
