import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../redux/actions'
import nac from '../redux/actions'
import NewsInput from './profile/NewsInput'
import ListNews from './profile/ListNews'
import {ErrorOrSuccess} from '../components/ErrorAndSuccess'

console.log("Actions", actions);
console.log("Nac", nac);

class Profile extends Component{
  constructor(props){
    super(props);
    this.state = {
      error : false,
      errorMessage : "",
      success : false,
      successMessage : ""
    }
    this.handleError = this.handleError.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);
  }
  handleError(error , errorMessage){
    this.setState({error , errorMessage});
  }
  handleSuccess(success , successMessage){
    this.setState({success , successMessage});
  }
  render() {
    return (
      <div style={Style.wrapperProfile}>

      {this.state.error&&<ErrorOrSuccess alert="error" message={this.state.errorMessage} />}
      {this.state.success&&<ErrorOrSuccess alert="sucess" message={this.state.successMessage} />}

      <div className='container col-md-8' style={Style.container}>
        <NewsInput 
            addnewNews={this.props.actions.addnewNews} 
            handleError = {this.handleError}
            handleSuccess = {this.handleSuccess}/>
        <ListNews 
            news={this.props.news}
            actionNews={this.props.actions}
            handleError = {this.handleError}
            handleSuccess = {this.handleSuccess}/>
      </div>
      </div>
    )
  }
};


let Style = {
  container : {position:"relative"},
  wrapperProfile : {
    display: 'flex',
    alignItems: "center",
    justifyContent: "center" ,
    width:"100%"
  }
}


export default connect(state => {
  return {news: state.news}
}, dispatch =>{
  return {
    actions: bindActionCreators(actions, dispatch)
  }
})(Profile);
