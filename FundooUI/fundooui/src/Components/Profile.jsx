import React, { Component } from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { image64toCanvasRef } from './ResuableUtils'
import { width } from '@material-ui/system';

export class Profile extends Component {
  constructor(){
    super();
    this.state = {
      src: null,
    crop: {
      unit: "%",
      width: 30,
      aspect: 1
    },
    croppedImageUrl:null
    }
  }


  onSelectFile = e => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        this.setState({ src: reader.result })
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  };


  onImageLoaded = image => {
    this.imageRef = image;
  };

  onCropComplete = crop => {
    this.makeClientCrop(crop);
  };

  onCropChange = (crop, percentCrop) => {
    this.setState({ crop });
  };

  async makeClientCrop(crop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg(
        this.imageRef,
        crop,
        "newFile.jpeg"
      );
      this.setState({ croppedImageUrl });
    }
  }

  getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        if (!blob) {
          //reject(new Error('Canvas is empty'));
          console.error("Canvas is empty");
          return;
        }
        blob.name = fileName;
        window.URL.revokeObjectURL(this.fileUrl);
        this.fileUrl = window.URL.createObjectURL(blob);
        resolve(this.fileUrl);
      }, "image/jpeg");
    });
  }

  render() {
    return (
<Dialog open={this.props.openDialog}
        PaperProps={{
          style: {
            width: "95%",
            height: "auto"
          }
        }}>
        <DialogTitle>Profile Pic</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Change Your Profile Pic Here
          </DialogContentText> 
<div className="App">
<div>
  <input type="file" onChange={this.onSelectFile} />
</div>
{this.state.src && (
  <ReactCrop
    src={this.state.src}
    crop={this.state.crop}
    onImageLoaded={this.onImageLoaded}
    onComplete={this.onCropComplete}
    onChange={this.onCropChange}
  />
)}
{this.state.croppedImageUrl && (
  <img alt="Crop" style={{ maxWidth: "100%" }} src={this.state.croppedImageUrl} />
)}
 </div>
 <h1>{this.fileUrl}</h1>
       </DialogContent>
      </Dialog>
    )
  }
}

export default Profile
