import {  ImagePicker, WingBlank, SegmentedControl } from 'antd-mobile';
import React, { Component } from 'react';

const data = [
//   {
//   url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
//   id: '2121',
// }
];

class ImagePickerExample extends Component {
  state = {
    files: data,
    src: null,
  };
  onChange = (files, type, index) => {
    this.setState({
      files,
    });
    if(this.props.side == 'front'){
      this.props.changeImg(files,0);
    }else{
      this.props.changeImg(files,1);
    }
  };
  onAddImageClick = (e) => {
    e.preventDefault();
    this.setState({
      files: this.state.files.concat({
        url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
        id: '3',
      }),
    });
  };
  onTabChange = (key) => {
    console.log(key);
  };
  render() {
    const { files } = this.state;
    return (
      <div>
        <ImagePicker
          files={files}
          onChange={this.onChange}
          onImageClick={(index, fs) => console.log(index, fs)}
          selectable={files.length < 1}
          length={1}
          multiple={this.state.multiple}
        />
      </div>
    );
  }
}

export default ImagePickerExample;
// ReactDOM.render(<ImagePickerExample />, mountNode);