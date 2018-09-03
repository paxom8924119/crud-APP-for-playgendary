import {combineReducers} from "redux";

var NewsReducer = (state = [], action) => {
  switch (action.type) {

    case 'ADD_NEWS':
    return ([
      ...state,
      action.payload,
    ])

      case 'ADD_ALL_NEWS':
      return ([
        ...state,
       ...action.payload,
      ])
       
    case 'DELETE_NEWS':
       let updateState = state.filter(news => news._id !== action._id);
       return [...updateState]
    case 'EDIT_NEWS':
      return state.map((news)=>news._id === action.playload._id ? news = action.playload : news);
    default: 
      return state;
  }
};


const allReducers = combineReducers({
  news: NewsReducer,

})

export default allReducers;



