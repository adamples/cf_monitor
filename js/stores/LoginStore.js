const alt = require('../alt');
const LoginActions = require('../actions/LoginActions');
const Immutable = require('immutable');


const AuthorizationData = Immutable.Record({
  inProgress: false,
  isSignedIn: false,
  apiEndpoint: null,
  userName: null,
  token: null,
  tokenExpirationTimestamp: null
});


class LoginStore {

  constructor() {
    this.authorization = AuthorizationData({});

    this.bindListeners({
      handleSignIn: LoginActions.SIGN_IN,
      handleSignOut: LoginActions.SIGN_OUT,
      handleAuthenticate: LoginActions.AUTHENTICATE
    });
  }

  handleSignIn(data) {
    this.authorization = this.authorization.merge({
      isSignedIn: true,
      apiEndpoint: data.apiEndpoint,
      userName: data.userName,
      token: data.token,
      tokenExpirationTimestamp: data.tokenExpirationTimestamp
    });
  }

  handleSignOut() {
    this.authorization = this.authorization.merge({
      isSignedIn: false,
      token: null
    });
  }

  handleAuthenticate() {
    this.handleSignOut();
    this.authorization = this.authorization.set('inProgress', true);
  }

};

module.exports = alt.createStore(LoginStore, 'LoginStore');
