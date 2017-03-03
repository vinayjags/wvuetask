/* This is our main store class which will be used to share state`
 * of the application across different components
 */
const state = {
    isLoggedin: false
}

class Store{
    constructor(){
        this.state = state;
    }
    setLoginState(newLoginState){
        this.state.isLoggedin = newLoginState;
    }
}

const store = new Store();

export default store;