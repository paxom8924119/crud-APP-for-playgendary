import React, { Component } from 'react';
import { News } from "../../redux/fetch";
import {newsInputValidator} from "../../redux/validatorForm"


class TodoInput extends Component {

  constructor(props) {
    super(props);
    this.state = {
      price: "",
      item: "",
    }
    this.addNews = this.addNews.bind(this);
  }

  handleChange(e) {
   
    let {value,name} = e.target; 

    this.setState({ [name]: value });
  };

  addNews(e) {
    e.preventDefault();
    let {price,item} = this.state;
    let errorMsg = newsInputValidator(item,price);
    if(!errorMsg) {
        News.Add("/api/news/addnews", {price,item}).then((newNews) => {      
          this.props.addnewNews(newNews);
          this.setState({price: '',item: ''});
          this.props.handleError(false , '');
          this.props.handleSuccess(true , 'Excellent!!! Product successfully added');
        })  
    }else {
      this.props.handleError(true ,errorMsg);
      this.props.handleSuccess(false , '');
    }
  }
  render() {
    return (
      <div style={Style.wrapper}>
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text" style={{ color: '#777', fontSize: "18px" }}>Item and Price</span>
          </div>
          <div style={{ display: 'flex', flexDirection: "row" }}>
            <input
              type="text"
              placeholder="Item"
              className="form-control"
              name='item'
              value={this.state.item}
              onChange={e => this.handleChange(e)}
              style={Style.inputAdd} />
            <input
              type="text"
              placeholder="Price"
              autoFocus="true"
              className="form-control"
              name='price'
              value={this.state.price}
              onChange={e => this.handleChange(e)}
              style={Style.inputAdd} />
          </div>
          <input
            type="submit"
            value="Send"
            className="btn btn-lg btn-primary btn-block"
            onClick={(e) => this.addNews(e)}
            style={Style.btnAdd}/>
        </div>
      </div>
    )
  }
};

let Style={
  inputAdd : {
    border: "1px solid #337ab7",
    borderBottomLeftRadius: "0",
    borderBottomRightRadius: "0",
    width: "50%"
  },
  btnAdd : {
    borderRadius: '0',
    borderBottomLeftRadius: "5px",
    borderBottomRightRadius: "5px",
    padding: "5px 0 5px 0",
    width: '100%'
  },
  wrapper : { 
    display: 'flex',
    flexDirection: "row",
    justifyContent: "center",
    marginTop: '50px' }
}

export default TodoInput;
