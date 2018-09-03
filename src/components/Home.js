import React from "react";

export let Home = () => <div style={home}>
                            <p style={wellcome}>Welcome to the CRUD App</p>
                           <div> <small>for authorization OAuth 2.0 please write your clentID and clientSecret in the auth.js in the folder config</small></div>
                        </div>



let home = {
    width: '100%',
    height: '50vh',
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
    flexDirection:'column'
}
let wellcome = {
    color : "#777",
    fontSize:'25px'
}