import { START, SUCCESS, FAIL } from '../constants/ActionTypes'

function httpGet(url) {

    return new Promise(function(resolve, reject) {

        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);

        xhr.onload = function() {
            if (this.status === 200) {
                resolve(this.response);
            } else {
                var error = new Error(this.statusText);
                error.code = this.status;
                reject(error);
            }
        };

        xhr.onerror = function() {
            reject(new Error("Network Error"));
        };

        xhr.send();
    });

}


export default store => next => action => {
    const { api , type , ...rest } = action
    if(!api) return next(action)

    next({
        type: type + START,
        ...rest
    })

    
    httpGet(api)
        .then(
            response => {
                let data = JSON.parse(response)
                return next({type: type + SUCCESS,data,...rest})
            },
            error => {
                console.log('error')
                console.log(error)
                return next({type: type + FAIL, error, ...rest})
            }
        );


}