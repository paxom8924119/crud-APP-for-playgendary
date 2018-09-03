import React from "react";


export let ErrorOrSuccess = props => <div style={btn} className={props.alert == 'error' ?'alert alert-danger' : 'alert alert-success'}>
                                {props.message}
                            </div>

let btn = {
    position : 'absolute',
    width :' 100%',
    top : "50px"

}

