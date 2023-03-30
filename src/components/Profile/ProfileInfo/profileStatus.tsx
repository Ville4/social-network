import React, { ChangeEvent } from "react";

type propsType = {
    status: string
    updateStatusThunk: (status: string) => void
}

type stateType = {
    editMode: boolean
    status: string
}

class ProfileStatus extends React.Component<propsType, stateType> {
   
    state = {
        editMode: false,
        status: this.props.status
    }

    statusChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value
        })        
    }

    activateEditMode = () => {
        this.setState({
            editMode: true
        }) 
    }

    deactivateEditMode = () => {
        this.setState({
            editMode: false
        })
        this.props.updateStatusThunk(this.state.status)
    }

    componentDidUpdate(prevProps: propsType, prevState: stateType) {
        if(prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
    }

    render() {
        return  (
            <div>
                {this.state.editMode
                ? <div>
                    <input onChange={this.statusChange} onBlur={this.deactivateEditMode} value={this.state.status} autoFocus />
                  </div>
                : <div>
                    <div onDoubleClick={this.activateEditMode}>{this.props.status || 'No Status'}</div>
                  </div>
                }  
            </div>
        )
    }
    
}

export default ProfileStatus;