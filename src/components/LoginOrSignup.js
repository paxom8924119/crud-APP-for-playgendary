import React, { Component } from 'react'
import { auth } from '../redux/auth';
import {Link} from "react-router-dom";
import Input from "../components/loginAndSignUp/Input"
import {ErrorOrSuccess} from "../components/ErrorAndSuccess"
import {validatorLogAndSign} from '../redux/validatorForm'

class LoginOrSignup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error : false,
      errorMessage : '',
      success : false,
      successMessage : ''
    }
    this.handleChange=this.handleChange.bind(this);
  }
  componentWillMount(){
      auth.authenticate().then(user => {
        if(user !== undefined){
          
          this.setState({ email: "", password: '' })
          this.props.isAuthenticate(true);
      
        }
      }) 
  }
  handleChange(e) {
    let {value,name} = e.target;
    this.setState({ [name]: value });
  };
  signupOrLogin(e) {
    e.preventDefault();
    let url = this.props.urlFetch;
    let {email , password} = this.state;
    let errorMsg = validatorLogAndSign(email,password);
      if(!errorMsg) {
        auth.FetchRegister(url,{email,password}).then(_ =>{
          auth.authenticate().then(user => {
            if(user != undefined){
              this.setState(
                { 
                  email: "",
                  password: "" ,
                  error : false ,
                  success:true,
                  successMessage:"You have successfully logged in system :) Make yourselves at home. It's time go to the profile"
                }
              ); 
              this.props.isAuthenticate(true);
            }else this.setState(
              {
                error:true,
                errorMessage : "error" ,
                success:false ,
                successMessage:''
              }
            )
          })
      })
    }else {
      this.setState({error:true,errorMessage:errorMsg , success:false , successMessage:''})
    }
    
  }
  render() {
    let link = this.props.register === 'Login' ? 'signup' : 'login'
    return (
      <div style={{ marginTop: "5%" }}>
      {this.state.error&&<ErrorOrSuccess alert="error" message={this.state.errorMessage} />}
      {this.state.success&&<ErrorOrSuccess alert="success" message={this.state.successMessage} />}
  
        <div className="container" style={Style.container}>
          <div className="card card-container col-md-10" style={Style.card}>
            <img style={{ borderRadius: "100px" }} id="profile-img" className="profile-img-card" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" />
            <form className="form-signin col-md-4">
        
              <label htmlFor="" style={{ color: "#777" }}>{this.props.register}</label>
              <span id="reauth-email" className="reauth-email"></span>

              <Input handleChange={this.handleChange} value={this.state} />  
                        
              <button type="submit"
                      className="btn btn-lg btn-primary btn-block btn-signin"
                      onClick={(e) => this.signupOrLogin(e)}>Send</button>

            <label style={{marginTop:"10px"}}>
               
               <span style={Style.text}>Login with : </span>
                 <a href="/auth/facebook" style={Style.text}><i className="fab fa-facebook-f" style={Style.i}></i></a>
                </label>
                <strong style={Style.strong}>or</strong>
                <a href="/auth/google" style={Style.text}>
                  <i className="fab fa-google-plus-g" style={Style.i}></i></a>
                  <strong style={Style.strong}>or just </strong>
                <Link style={Style.link} to={`/${link}`}>{link}</Link>
            </form>
          </div>
        </div>
      </div>
    )
  }
};

let Style={
  text:{ color: "#777" },
  link:{ color: "#777" , fontSize:'18px' , fontWeight:"800"},
  i : {fontSize:'15px'},
  container : { display: 'flex', alignItems: "center", justifyContent: "center" },
  card : { display: 'flex', flexDirection: 'column', alignItems: "center", justifyContent: "center" },
  strong : {margin:"0 10px 0 10px" , color: "#777" }
}

export default LoginOrSignup;
