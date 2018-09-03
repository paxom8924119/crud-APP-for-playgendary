import React from 'react';
import {News} from "../../redux/fetch"
import {newsInputValidator} from "../../redux/validatorForm"

class NewsItem extends React.Component{
    constructor(props){
        super(props)
        this.state={
            edit : false,
            price : this.props.news.price,
            item : this.props.news.item,

        }
        this.handleChange = this.handleChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.edit = this.edit.bind(this);
    }
    edit(){
        let edit = this.state.edit;
        if(!edit){
            this.setState({edit:true})
        } else {
         
            let price = this.state.price , item = this.state.item;
            let errorMsg =newsInputValidator(item , price );
            if(!errorMsg){
            News.EditNews(this.props.news._id , price , item).then(rez => {
                this.props.editNews(rez);
                this.setState({edit:false});
                this.props.handleError(false , '');              
                this.props.handleSuccess(true , 'Excellent!!! Item was successfully edited');      
            })
            }else {
                this.props.handleError(true ,errorMsg)
                this.props.handleSuccess(false , '');
            }
        }
        
    }
    
    handleChange(e){
       let {name,value} = e.target;
        this.setState({[name] : value});
    }
    handleDelete(){
        News.DeleteItem(this.props.news._id).then((newsItem)=>{
            this.props.delete(newsItem._id);
            this.props.handleSuccess(true , 'Excellent!!! Item was successfully deleted');  
        })    
    }
  render(){
    return (
        <div key={this.props.news._id} style={Style.card}>
            <div style={Style.header_card}><span>CRUD App</span></div>
           <div style={{padding:'20px 10px 0 10px'}}>
           {!this.state.edit ? (
            <div>
             <strong style={Style.strong}>Item : </strong>
            <span>{this.props.news.item}</span><br/>
            <strong style={Style.strong}>Price : </strong>
            <span>{this.props.news.price}$</span>
            </div>
           ) : (
            <div>
                
            <strong style={Style.strong}>Item : </strong>
            <input value={this.state.item} name="item" onChange={(e)=>this.handleChange(e)} style={Style.input} /><br/>
            <strong style={Style.strong}>Price : </strong>
            <input value={this.state.price} name="price" onChange={(e)=>this.handleChange(e)} style={Style.input}/>
            </div>
           )}
           </div>
        <div style={Style.btns}>
        <button onClick={()=>this.edit()} className="btn btn-warning">{!this.state.edit ? 'edit' : 'ok'}</button>
        <button onClick={()=>this.handleDelete()} className="btn btn-danger" style = {Style.btn}>delete</button>
        </div>
        </div>   
    )
  };
};
let Style = {
    strong : {fontSize: "20px",color:"#777"},
    header_card : {
       textAlign : "center",
       color : "#777",  
       paddingTop:'15px',
       width:'100%',
       fontSize: '20px',
       width: '100%',
       position: 'relative',
       display: 'flex',
       justifyContent: 'center',
       alignItems: 'center',
       background:' #e7e7e7',
   },
    card : {   
     borderRadius: '2px', 
     height: '250px',
     margin: '1rem',
     position: 'relative',
     display:"flex",
     flexDirection:"row",
     flexWrap : "wrap",
   
     width: '25%',  
     minWidth:'25%', 
     boxShadow:' 4px 4px 17px -3px rgba (0,0,0,0,75)'   
   },
   btns:{  
    position : 'absolute',
    bottom: '10px',
    right : "10px"
   },
   btn : {
    marginLeft : '10px',
   },
   input:{
       maxWidth:'100px',
       width:'100%'
   }
   
}


export default NewsItem;
