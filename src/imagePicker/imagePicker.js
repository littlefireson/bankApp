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
    url:""
  };
  onChange = (files, type, index) => {
    console.log(files, type, index);
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
  changeFile (event) {
    console.log(event)
    var _this = this;

    // 选择的文件对象(file里只包含图片的体积，不包含图片的尺寸)
    var file = event.target.files[0];
    console.log(file)

    // 选择的文件是图片
    if(file.type.indexOf("image") === 0) {
        // 压缩图片需要的一些元素和对象
        var reader = new FileReader(),
            //创建一个img对象
            img = new Image();

        reader.readAsDataURL(file);
        // 文件base64化，以便获知图片原始尺寸
        reader.onload = function(e) {
            img.src = e.target.result;
        };

        // base64地址图片加载完毕后执行
        img.onload = function () {
            // 缩放图片需要的canvas（也可以在DOM中直接定义canvas标签，这样就能把压缩完的图片不转base64也能直接显示出来）
            var canvas = document.createElement('canvas');
            var context = canvas.getContext('2d');

            // 图片原始尺寸
            var originWidth = this.width;
            var originHeight = this.height;

            // 最大尺寸限制，可通过设置宽高来实现图片压缩程度
            var maxWidth = 300,
                maxHeight = 300;
            // 目标尺寸
            var targetWidth = originWidth,
                targetHeight = originHeight;
            // 图片尺寸超过300x300的限制
            if(originWidth > maxWidth || originHeight > maxHeight) {
                if(originWidth / originHeight > maxWidth / maxHeight) {
                    // 更宽，按照宽度限定尺寸
                    targetWidth = maxWidth;
                    targetHeight = Math.round(maxWidth * (originHeight / originWidth));
                } else {
                    targetHeight = maxHeight;
                    targetWidth = Math.round(maxHeight * (originWidth / originHeight));
                }
            }
            // canvas对图片进行缩放
            canvas.width = targetWidth;
            canvas.height = targetHeight;
            // 清除画布
            context.clearRect(0, 0, targetWidth, targetHeight);
            // 图片压缩
            context.drawImage(img, 0, 0, targetWidth, targetHeight);
            /*第一个参数是创建的img对象；第二三个参数是左上角坐标，后面两个是画布区域宽高*/

            //压缩后的图片转base64 url
            /*canvas.toDataURL(mimeType, qualityArgument),mimeType 默认值是'image/png';
             * qualityArgument表示导出的图片质量，只有导出为jpeg和webp格式的时候此参数才有效，默认值是0.92*/
            var newUrl = canvas.toDataURL('image/jpeg', 0.92);//base64 格式

            _this.setState({
                url: newUrl
            })

            //也可以把压缩后的图片转blob格式用于上传
            // canvas.toBlob((blob)=>{
            //     console.log(blob)
            //     //把blob作为参数传给后端
            // }, 'image/jpeg', 0.92)
        };
    } else {
        alert('请上传图片格式');
    }
}

  onTabChange = (key) => {
    console.log(key);
  };
  render() {
    const { files } = this.state;
    return (
      <div>
        <ImagePicker
          files={files}
          onChange={this.changeFile}
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