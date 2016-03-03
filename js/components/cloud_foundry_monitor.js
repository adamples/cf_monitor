const React = require('react');
const ReactDOM = require('react-dom');
const PureRenderMixin = require('react-addons-pure-render-mixin');
const LoginStore = require('../stores/LoginStore');
const LoginActions = require('../actions/LoginActions');
const CFHierarchyActions = require('../actions/CFHierarchyActions');
const StateVariablesActions = require('../actions/StateVariablesActions');
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
      return (<ServicesList spaceId='9c3b1b8c-70b4-4baa-aea3-9b4f9938641f' name='qa2'/>);
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

      StateVariablesActions.setVariables([
        { objectId: resource.metadata.guid, name: "instances", value: app.instances },
        { objectId: resource.metadata.guid, name: "memoryQuota", value: app.memory * 1024 * 1024 },
        { objectId: resource.metadata.guid, name: "diskQuota", value: app.disk_quota * 1024 * 1024 },
        { objectId: resource.metadata.guid, name: "requestedState", value: app.state },
        { objectId: resource.metadata.guid, name: "environment", value: app.environment_json }
      ]);

      CFHierarchyActions.addApplication('9c3b1b8c-70b4-4baa-aea3-9b4f9938641f', resource.metadata.guid, app.name);

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

            StateVariablesActions.setVariables([
              { objectId: resource.metadata.guid + "#" + id, name: "state", value: instance.state }
            ]);

            if (instance.stats == null) continue;

            const usage = instance.stats.usage;

            StateVariablesActions.setVariables([
              { objectId: resource.metadata.guid + "#" + id, name: "memoryUsage", value: usage.mem },
              { objectId: resource.metadata.guid + "#" + id, name: "cpuUsage", value: usage.cpu },
              { objectId: resource.metadata.guid + "#" + id, name: "diskUsage", value: usage.disk }
            ]);

          };
        });
      }, 5000);
    });
  });
});
