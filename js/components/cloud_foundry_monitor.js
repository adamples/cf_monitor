const React = require('react');
const ReactDOM = require('react-dom');
const PureRenderMixin = require('react-addons-pure-render-mixin');
const LoginStore = require('../stores/LoginStore');
const LoginActions = require('../actions/LoginActions');
const ServicesList = require('./services_list');
const LoginForm = require('./login_form');


const CloudFoundryMonitor = React.createClass({

  mixins: [ PureRenderMixin ],

  getInitialState: function () {
    return {
      authorization: LoginStore.getState().authorization
    };
  },

  componentWillMount: function () {
    LoginStore.listen(this.handleLoginStoreChange);
  },

  handleLoginStoreChange: function (storeState) {
    this.setState({ authorization: storeState.authorization });
  },

  render: function () {
    const auth = this.state.authorization;

    if (auth != null && auth.get('isSignedIn') === true) {
      return (<ServicesList/>);
    }
    else {
      return (<LoginForm authorization={this.state.authorization}/>);
    }
  }

});


module.exports = CloudFoundryMonitor;

LoginStore.listen(function (storeState) {
  const auth = storeState.authorization;
  if (auth.get('isSignedIn') !== true) return;

  // const token = auth.get('token');
  const token = 'eyJhbGciOiJSUzI1NiJ9.eyJqdGkiOiIwYWViMDU4NS0wYmMwLTRjYTQtYTUwNS0xOTQxZjE3Zjk1MWUiLCJzdWIiOiI4ZjViYjk0Yy05YTNmLTRhNjctODdlNy1kMDM2ZGQ4ZDE0N2UiLCJzY29wZSI6WyJwYXNzd29yZC53cml0ZSIsImNsb3VkX2NvbnRyb2xsZXIud3JpdGUiLCJvcGVuaWQiLCJjbG91ZF9jb250cm9sbGVyLnJlYWQiXSwiY2xpZW50X2lkIjoiY2YiLCJjaWQiOiJjZiIsImF6cCI6ImNmIiwiZ3JhbnRfdHlwZSI6InBhc3N3b3JkIiwidXNlcl9pZCI6IjhmNWJiOTRjLTlhM2YtNGE2Ny04N2U3LWQwMzZkZDhkMTQ3ZSIsInVzZXJfbmFtZSI6InFhIiwiZW1haWwiOiJxYSIsInJldl9zaWciOiJkMmJhMjRlYSIsImlhdCI6MTQ1NjQxMTk1MiwiZXhwIjoxNDU2NDEyNTUyLCJpc3MiOiJodHRwOi8vdWFhLjU0LjIwMS4yNS42OS54aXAuaW8vb2F1dGgvdG9rZW4iLCJ6aWQiOiJ1YWEiLCJhdWQiOlsiY2YiLCJwYXNzd29yZCIsImNsb3VkX2NvbnRyb2xsZXIiLCJvcGVuaWQiXX0.uNkMn8Gi55Miu70D11ie2UW-74qIlrA133Zgnp28N5IitGqVPe0XNXmPIG_U0QYoosxLOw8I1VR9TfiqD0oSDXdYtrqjNyg5vxbRXkyOjg-qf0H7yAapfqfQXMmM9v1_pzxnMPlarSgiN5Y1w1-Un7xdtRx7mcao1HqQvLD4B8o';

  var req = $.ajax(auth.get('apiEndpoint') + '/v2/apps', {
    dataType: 'json',
    headers: {
      'Authorization': 'bearer ' + token
    }
  });

  $.when(req).then(function (result) {
    console.log(result);
  });
});
