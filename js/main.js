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
  ServiceStateActions.addService("hds");
  ServiceStateActions.setServiceRunning("hds", true);
  ServiceStateActions.setServiceResources("hds", 1, 1024);
}, 1000);

setTimeout(function () {
  ServiceStateActions.addService("eapi");
  ServiceStateActions.setServiceRunning("hds", false);
  ServiceStateActions.setServiceRunning("eapi", true);
}, 2000);

setTimeout(function () {
  ServiceStateActions.addService("eapi");
  ServiceStateActions.setServiceRunning("hds", true);
  ServiceStateActions.setServiceResources("eapi", 3, 1536);
  ServiceStateActions.setServiceRunning("eapi", false);
}, 5000);


setTimeout(function () {

  LoginActions.authenticate('//cf.54.201.25.69.xip.io', 'qa', 'Prox123!');

}, 1000);
