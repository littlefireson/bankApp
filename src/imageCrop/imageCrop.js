import React, { Component } from 'react';
import ReactCrop from 'react-image-crop';
import {Modal} from 'antd-mobile'
import 'react-image-crop/dist/ReactCrop.css';
import style from '../App.css';
import ExifOrientationImg from 'react-exif-orientation-img'
// const aa = require("../load-image/load-image-exif.js") 
import EXIF from '../exif/exif'
import { func } from 'prop-types';
function closest(el, selector) {
    const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
    while (el) {
        if (matchesSelector.call(el, selector)) {
        return el;
        }
        el = el.parentElement;
    }
    return null;
}
class ImageCrop extends Component {
  state = {
    src: null,
    crop: {
      aspect: 1.58,
      width: 50,
      x: 0,
      y: 0,
    },
    modal1: false,
    fileUrl:'',
    value:''
  };

  onSelectFile = e => {
    // loadImage.parseMetaData
    console.log(e.target.files.name)
    var self = this
    EXIF.getData(e.target.files[0], function() {
      self.setState({Orientation:EXIF.getAllTags(this).Orientation})
    });
    const canvas = document.createElement('canvas');
    
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      const name = e.target.files.name
      reader.addEventListener('load', () =>{

        // if(canvas.getContext){
        //   var ctx = canvas.getContext("2d");
        //   var img = new Image();
        //   img.src = reader.result;
        
          
        //   ctx.drawImage(img, 10, 10);
        // }


        this.setState({ src: reader.result ,modal1:true,value:name})
      },
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  onImageLoaded = (image, pixelCrop) => {
    console.log('onImageLoaded')
    this.imageRef = image;
  };

  onCropComplete = (crop, pixelCrop) => {
    console.log('onCropComplete')
    this.makeClientCrop(crop, pixelCrop);
    this.setState({
      value:""
    })
  };

  onCropChange = crop => {
    console.log('onCropChange')
    this.setState({ crop ,modal1:true});
  };

  async makeClientCrop(crop, pixelCrop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg(
        this.imageRef,
        pixelCrop,
        'newFile.jpeg',
      );
      this.setState({ croppedImageUrl });
    }
  }

  getCroppedImg(image, pixelCrop, fileName) {
    const canvas = document.createElement('canvas');
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    const ctx = canvas.getContext('2d');
    // if(this.state.Orientation == '6'){
    //   ctx.rotate(90*Math.PI/180);
    // }else if(this.state.Orientation == '8'){
    //     ctx.rotate(3 * 90 * Math.PI / 180);
    // }else if(this.state.Orientation == '3'){
    //   ctx.rotate(Math.PI);
    // }
    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height,
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        if (!blob) {
          //reject(new Error('Canvas is empty'));
          console.error('Canvas is empty');
          return;
        }
        blob.name = fileName;
        window.URL.revokeObjectURL(this.fileUrl);
        
        this.blobToDataURL(blob);
        this.fileUrl = window.URL.createObjectURL(blob);
        resolve(this.fileUrl);
      }, 'image/jpeg');

    });
  }
  showModal = key => (e) => {
    e.preventDefault(); // 修复 Android 上点击穿透
    this.setState({
      [key]: true,
    });
  }
  showModal = key => (e) => {
    e.preventDefault(); // 修复 Android 上点击穿透
    this.setState({
        [key]: true,
    });
    this.handleCode();
}
  onClose = key => () => {
    this.setState({
        [key]: false,
    });
  }
    onWrapTouchStart = (e) => {
        // fix touch to scroll background page on iOS
        if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
            return;
        }
        const pNode = closest(e.target, '.am-modal-content');
        if (!pNode) {
            e.preventDefault();
        }
    }
  blobToDataURL=(blob)=> {


    const reader = new FileReader();
    reader.addEventListener('load', () =>
      this.setState({ fileUrl: reader.result }),
    );
    reader.readAsDataURL(blob);
  }
  render() {
    const { crop, croppedImageUrl, src ,modal1,fileUrl} = this.state;

    return (
      <div className="App">
        <div className={style['image-croper-flex-padding']}>
          <div className={style['image-croper-flex']}>
            <div className={style['image-croper-box']}>
              <div className={style['image-croper-file']} style={{backgroundImage:`url("${croppedImageUrl}")`}} >
                <input type="file" onChange={this.onSelectFile} value={this.state.value} />
              </div>
            </div>
          </div>
        </div>
        
        {modal1 && (
         <Modal
         visible={this.state.modal1}
         transparent
         maskClosable={false}
         title="请剪切图片"
         footer={[
             { text: '确定', onPress: () => { 
              if(this.props.side === 'front'){
                this.props.changeImg(fileUrl,0);
              }else{
                this.props.changeImg(fileUrl,1);
              }
              this.onClose('modal1')(); 
            } }]}
         wrapProps={{ onTouchStart: this.onWrapTouchStart }}
         >

        <ExifOrientationImg
          src={src}
          style={{width:'100%'}}
          alt="A waterfall"
        /> 
          <ReactCrop
            src={src}
            crop={crop}
            onImageLoaded={this.onImageLoaded}
            onComplete={this.onCropComplete}
            onChange={this.onCropChange}
          />
           </Modal>
        )}
        {/* {croppedImageUrl && (
          <img alt="Crop" style={{ maxWidth: '100%' }} src={croppedImageUrl} />
        )} */}
      </div>
    );
  }
}

export default ImageCrop;
