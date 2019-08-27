import React, { Component } from 'react'
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export class LabelMenu extends Component {
    render() {
        return (
            <div>
                <h1>HI</h1>
                <FormGroup row>
        <FormControlLabel
        control={
          <Checkbox  value="checkedA" />
        }
        label="Secondary"
            />
        </FormGroup>

            </div>
        )
    }
}

export default LabelMenu
