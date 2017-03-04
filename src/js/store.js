/* This is our main store class which will be used to share state`
 * of the application across different components
 */
const state = {
    isLoggedin: false,
    loginName: ''
}

class Store{
    constructor(){
        this.state = state;
    }
    setLoginState(newLoginState){
        this.state.isLoggedin = newLoginState;
    }
    setLoginName(newLoginName){
        this.state.loginName = newLoginName;
    }
}

const store = new Store();

export default store;