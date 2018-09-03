



export let validatorLogAndSign = (email , password) => {
  
    if(!email||!password){
        return "it's no good) fill all of the fields"
    }
    if(!/^[-._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$/.test(email)) {
        return 'Email address has a different structure , sorry :( Try once more'
    }
    return false
}

export let newsInputValidator = (item , price) => {
    if(!item||!price){
        return "it's no good) fill all of the fields"
    }
    if(isNaN(price)){
        return 'The price should be a number and not a string'
    }
    return false;
}


