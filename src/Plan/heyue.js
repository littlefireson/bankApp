import React, { Component } from 'react';
import WxImageViewer from 'react-wx-images-viewer';
class Imagesviewer extends Component {

  state = {
    imags: [
      require("../images/heyue.jpg"),
    ],
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
      imags,
      index,
      isOpen
    } = this.state;

    return (
      <div className="app">
        <div className="img-list">
          {
            this.state.imags.map((item, index) => {
              return <div className="img" key={item}>
                <img src={item} alt="" onClick={this.openViewer.bind(this, index)} width="100%" height="auto" className=""/> 
              </div>
            })
          }
        </div>
        {
          isOpen ? <WxImageViewer onClose={this.onClose} urls={this.state.imags} index={index}/> : ""
        }
      </div>
    )
  }
}

export default Imagesviewer;