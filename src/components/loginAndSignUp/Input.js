
import React, { Component } from 'react'

class Input extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
            <input
                type="text"
                placeholder="E-mail"
                autoFocus="true"
                name="email"
                className="form-control"
                required
                id='email'
                value={this.props.value.email}
                onChange={e => this.props.handleChange(e)}
                style={{ marginBottom: '10px', height: "40px" }} />
            <input
                type="password"
                placeholder="Password"
                name="password"
                className="form-control"
                required
                id='password'
                value={this.props.value.password}
                onChange={e => this.props.handleChange(e)}
                style={{ marginBottom: '20px', height: "40px" }} />
            </div>
            
        )
    }
}

export default Input;