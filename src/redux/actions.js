export function authenticate(user){
     return{
       type : "AUTHENTICATE",
       playload : user
     }
    }
     //news
export function addnewNews(news) {
       return {
         type: 'ADD_NEWS',
         payload: news
       };
     }
export function addAllNews(news) {
       return {
         type: 'ADD_ALL_NEWS',
         payload: news
       };
     }
export function deleteNews(_id) {
       return {
         type: 'DELETE_NEWS',
         _id
       };
     }

export function editNews(news) {
      return {
        type: 'EDIT_NEWS',
        playload : news,
      };
    }