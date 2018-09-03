
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import {auth} from "../redux/auth"

class Header extends Component {
    constructor(props) {
        super(props)
        this.logout = this.logout.bind(this);
    }
    logout(){
        auth.logOutUser().then(res=>{
            if(res.status === 200){
                this.props.isAuthenticate(false);
        }
          
        })
    }
    render() {
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <Link to="/" className="navbar-brand">CRUD App</Link>
                    </div>
                  
                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav navbar-right" >
                            {this.props.authenticate ? (
                                <div className="navbar-brand" style={HeadeStyle.navbarBrand}>
                                    <li><Link to="/profile" style={HeadeStyle.link}>Profile</Link></li>
                                    <li style={{ marginLeft: "20px" }}>
                                        <a href="/logout"
                                            style={HeadeStyle.link}>Log out</a>
                                        </li>
                                </div>
                            ) : (
                                <div className="navbar-brand" style={HeadeStyle.navbarBrand}>
                                    <li><Link to="/login"  style={HeadeStyle.link}>Log in</Link></li>
                                    <li style={{ marginLeft: "20px" }}><Link to="/signup" style={HeadeStyle.link}>Sign up</Link></li>
                                </div>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

let HeadeStyle = {
    navbarBrand:{
        display: 'flex', 
        justifyContent: "center",
        alignItems: "center"
    },
    link:{
        color:"#777"
    }
}

export default Header;