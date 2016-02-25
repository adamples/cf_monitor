var alt = require('../alt');

var LoginActions = alt.createActions({

  signIn: function (apiEndpoint, userName, token, tokenExpirationTimestamp) {
    return {
      apiEndpoint: apiEndpoint,
      userName: userName,
      token: token,
      tokenExpirationTimestamp: tokenExpirationTimestamp
    };
  },

  signOut: function () {
    return { };
  },

  authenticate: function (apiEndpoint, username, password) {
    return function (dispatch) {
      dispatch();

      const loginEndpoint = apiEndpoint.replace(/\/\/[a-z]+\./, "//login.");

      const f = $.ajax(`${loginEndpoint}/oauth/token`, {
        method: 'POST',
        beforeSend: function (xhr) {
          xhr.setRequestHeader ("Authorization", "Basic Y2Y6");
        },
        data: {
          grant_type: 'password',
          response_type: 'token',
          username: username,
          password: password,
          scope: ''
        }
      });

      $.when(f).then(function (response) {
        if (response != null && response.access_token != null) {
          const expirationTs = new Date().getTime() + response.expires_in;
          LoginActions.signIn(apiEndpoint, username, response.access_token, expirationTs);
        }
      });

    };
  }

})

module.exports = LoginActions;
