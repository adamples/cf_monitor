const React = require('react');
const ReactDOM = require('react-dom');
const CloudFoundryMonitor = require('./components/cloud_foundry_monitor');

ReactDOM.render(
  <CloudFoundryMonitor/>,
  document.getElementById('root')
);



const ServiceStateActions = require('./actions/ServiceStateActions');
const LoginActions = require('./actions/LoginActions');

setTimeout(function () {
  LoginActions.authenticate('//cf.54.201.25.69.xip.io', 'qa', 'Prox123!');
}, 0);
