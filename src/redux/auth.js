export const auth = {
	isAuthenticated: false,
	authenticate(c) {
		// req.user on backend will contain user info if
		// this person has credentials that are valid
		return fetch('/user', {
			credentials: 'include'
		})
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
            return rez.json();
        })
		.catch((err) => {
			console.log('Error fetching authorized user.');
		});
    },
    FetchRegister(url,data){
        
        return fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json'
            },
          })
            .then((response) => {   
                         
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
            .catch((err) => {
              console.log('Error logging in.', err);
            });
    },
    logOutUser(){
        return fetch('/logout').then(response => {
            return new Promise((resolve, reject) => {
                if (response.status == 200) {
                    resolve(response);
                } else {
                    let error = new Error(response.statusText);
                    error.code = response.status;
                    reject(error);
                }
            })
        }).catch((err) => {
            console.log('Error logout.', err);
          });  
    }
}