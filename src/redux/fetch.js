export class News {
    static GetAll(url) {
        return fetch(url)
            .then(response => {
                return new Promise((resolve, reject) => {
                    if (response.status == 200) {
                        resolve(response);
                    } else {
                        let error = new Error(response.statusText);
                        error.code = response.status;
                        reject(error);
                    }
                })
            })
            .then(res => {
                if(res.status === 200){
                    return res.json()
                }
            })
            .catch(error => error);
    }
    static Add(url, data) {
        return fetch(url, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                "Content-type": 'application/json'
            }
        }).then(res => {
             if(res.status === 200){
                return res.json()
            }
        }).catch(error => error);
    }
    static DeleteItem( _id) {
        return fetch('/api/news/deletenews', {
            method: "POST",
            body: _id,
            headers: {
                "Content-type": 'text/plain'
            }
        }).then(res => {
            if(res.status === 200){
                return res.json()
            }
        }) .catch(error => error);
    }

    static GetSession(url){
        return fetch(url)
            .then(response => {
                return new Promise((resolve, reject) => {
                    if (response.status == 200) {
                        resolve(response);
                    } else {
                        let error = new Error(response.statusText);
                        error.code = response.status;
                        reject(error);
                    }
                })
            })
            .then(rez => {
                alert()
                console.log(rez.json())
                return rez.json();
            })
            .catch(error => error);
    }
    static EditNews(_id , price , item){
        return fetch('/api/news/editnews' , {
            method: "POST",
            body: JSON.stringify({_id , price , item}),
            headers: {
                'Accept': 'application/json',
                "Content-type": 'application/json'
            }
        }).then(res => {
             if(res.status === 200){
                return res.json()
            }
        })
        .catch(error => error);
    }
}
