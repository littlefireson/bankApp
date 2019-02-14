import React, { Component } from 'react';
import WxImageViewer from 'react-wx-images-viewer';
class Imagesviewer extends Component {

  state = {
    index: 0,
    isOpen: false
  };

  onClose = () =>{
    this.setState({
      isOpen: false
    })
  }

  openViewer (index){
    this.setState({
      index,
      isOpen: true
    })
  }

  render() {
    const {
      
      index,
      isOpen
    } = this.state;
    const imags = this.props.urls
    return (
      <div className="app">
        <div className="img-list">
          {
            imags.map((item, index) => {
              return <div className="img" key={item}>
                <img src={item} alt="" onClick={this.openViewer.bind(this, index)} width="100%" height="auto" className=""/> 
              </div>
            })
          }
        </div>
        {
          isOpen ? <WxImageViewer zIndex={1000} onClose={this.onClose} urls={imags} index={index}/> : ""
        }
      </div>
    )
  }
}

export default Imagesviewer;