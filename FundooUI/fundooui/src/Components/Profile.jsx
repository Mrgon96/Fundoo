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
import {image64toCanvasRef} from './ResuableUtils'
import { width } from '@material-ui/system';

export class Profile extends Component {
  constructor(){
    super();
    this.imagePreviewCanvas=React.createRef()
    this.state={
      imgSrc:null,
      crop: {
        aspect: 1/1
      }
      // image:{
      //   base64Data:null,
      // fileUploaded:'',
      // },
      // crop: {
      //   aspect: 1/1  
      // },
      // croppedImage:{
      //   imgSrc:null,
      //   crop: {
      //     aspect: 1/1
      //   }
      // }
    }
  }

  onChangeFile = event =>{
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.onloadend = () => {
      // var image = {...this.state.image}
      // image.fileUploaded=file
      // image.base64Data=reader.result
      // var croppedImage = {...this.state.croppedImage}
      // croppedImage.imgSrc=reader.result
      // croppedImage.crop = this.state.crop
      this.setState({
        // image,
        // croppedImage
        imgSrc:reader.result
      });
      console.log(this.state)
      
    };
    reader.readAsDataURL(file);
    this.image = URL.createObjectURL(file)
  }


  handleCropChange = (crop) =>{
    this.setState({
        crop:crop
    })
  }


  handleImageLoaded = (image) =>{
    console.log("IMAGE", image)
  }

  handleOnCropComplete = (crop, pixelCrop) =>{
    console.log(crop, pixelCrop)

    const canvasRef = this.imagePreviewCanvas.current
    const {imgSrc} = this.state
    image64toCanvasRef(canvasRef, imgSrc, pixelCrop)
  }


    render() {
      // let displayImage="none"
      // if(this.state.fileUploaded!==''){
      //   displayImage="block"
      // }
        // console.log(this.props.openDialog)
        // let {imgSrc} = this.state
        return (
            <Dialog open={this.props.openDialog}
            PaperProps={{
              style:{
                width:"95%",
                height:"400px"
              }
            }}>
                <DialogTitle>Profile Pic</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Change Your Profile Pic Here
          </DialogContentText>
          <TextField onChange={this.onChangeFile} type="file" variant="standard"></TextField>
          {/* <img src={this.state.fileUploaded} style={{width:200,height:200, display:displayImage}}></img> */}
        
          <ReactCrop 
          src={this.imgSrc}
          crop={this.state.crop} 
          onImageLoaded={this.handleImageLoaded}
          onChange={this.handleCropChange} 
          onComplete={this.handleOnCropComplete}
          />
          <br></br>
          <p>Preview Canvas</p>
          <canvas
          ref={this.imagePreviewCanvas}
          >


          </canvas>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.openDialogBox} color="primary">
            Cancel
          </Button>
          
        </DialogActions>
            </Dialog>
        )
    }
}

export default Profile
