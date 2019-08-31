import React, { Component } from 'react'
import '../App.css'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import Button from '@material-ui/core/Button';
import CheckIcon from '../Images/check.svg'  

import LabelEditList from './LabelEditList'

export class LabelEdit extends Component {
    constructor(props){
        super(props);
        this.state = {
            editLabel:false,
            labelId:null,
            labelsArr:[]
        }

        this.EditLabel = this.EditLabel.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount(){

    }
    EditLabel = (e)=>{
        console.log("EVENT NAME", e.target.src)

        // this.setState({
        //     editLabel:!this.state.editLabel,
        //     // labelId:e.target.id
        // })
    }

    handleChange = (e, id) =>{
        console.log("EVENT NAME", e.target)
    }
    render() {
        
        
        const labelListMap = this.props.labelsList.map((key=>{
            
            // }
    
            return (<LabelEditList key={key.id} data={key} EditLabel={this.EditLabel} handleChange={this.handleChange} />)
            })
            )
        return (
            <div>
                <Dialog open={this.props.openEdit}>
                    <h4 className="labelEditHeading">Edit Labels</h4>
                <DialogContent>
                {labelListMap}
                   
                   </DialogContent>
                   <DialogActions>
                       <Button variant="outlined" onClick={this.props.changeOpenEdit}>
                           Done
                       </Button>
                   </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default LabelEdit
