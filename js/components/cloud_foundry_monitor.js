const React = require('react');
const ReactDOM = require('react-dom');
const PureRenderMixin = require('react-addons-pure-render-mixin');
const LoginStore = require('../stores/LoginStore');
const LoginActions = require('../actions/LoginActions');
const ServiceStateActions = require('../actions/ServiceStateActions');
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

  const token = auth.get('token');

  const req = $.ajax('/cf/cf.54.201.25.69.xip.io/v2/apps?q=space_guid:9c3b1b8c-70b4-4baa-aea3-9b4f9938641f&results-per-page=100', {
    dataType: 'json',
    beforeSend: function (xhr) {
      xhr.setRequestHeader('Authorization', 'bearer ' + token);
    }
  });

  $.when(req).then(function (result) {
    console.log(result);

    result.resources.forEach(resource => {
      const app = resource.entity;
      ServiceStateActions.addService(app.name);
      ServiceStateActions.setServiceResources(app.name, app.instances, app.memory, app.disk_quota);
      ServiceStateActions.setServiceRunning(app.name, app.state === "STARTED");

      if (app.environment_json.VERSION != null)
        ServiceStateActions.setServiceVersion(app.name, app.environment_json.VERSION);

      setInterval(function () {
        const req = $.ajax('/cf/cf.54.201.25.69.xip.io' + resource.metadata.url + '/stats', {
          dataType: 'json',
          beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'bearer ' + token);
          }
        });

        $.when(req).then(function (result) {
          for (var id in result) {
            const instance = result[id];
            const usage = instance.stats.usage;
            ServiceStateActions.setInstanceState(app.name, id, instance.state === "RUNNING",
              usage.mem, usage.cpu, usage.disk);
          };
        });
      }, 5000);
    });
  });
});
