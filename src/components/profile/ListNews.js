import React, { Component } from 'react'

import NewsItem from "./NewsItem.js"
import {News} from "../../redux/fetch"

class ListNews extends Component{
    constructor(props){
        super(props);
        this.state={
            listNews:[]
        }
    }
    componentWillMount(){
        let listNews = this.state.listNews;
        if(!listNews){
             News.GetAll("/api/news/getall").then(rez=>this.setState({listNews:rez}));
             this.props.actionNews.addAllNews(listNews);
        }
       
    }

    render() {
        if(!this.props.news.length){
            return(<p style={Style.message}>ADD your first item</p>)
        }
        return (
        <div className="container" style={Style.container}>
            {        
                this.props.news.map(news=>{
                    return  <NewsItem   key={news._id}
                                        news={news} 
                                        delete = {this.props.actionNews.deleteNews}
                                        editNews = {this.props.actionNews.editNews}
                                        handleError = {this.props.handleError}
                                        handleSuccess = {this.props.handleSuccess}/>                               
                })
            }
        </div>
        )
    }
};

let Style = {
    message:{
        textAlign:'center' ,
        marginTop:'50px' ,
        fontSize:"20px" ,
        color:"#777" , 
        justifyContent:"center"
    },
    container : {
        marginTop:"50px",
        width:"100%",
        position:'relative' ,
        display:"flex",
        flexWrap:"wrap",
        justifyContent:"center"
    }
}
export default ListNews;
