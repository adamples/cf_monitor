const Immutable = require('immutable');
const React = require('react');
const ReactDOM = require('react-dom');
const PureRenderMixin = require('react-addons-pure-render-mixin');
const ServiceStateStore = require('./stores/ServiceStateStore');
const ServiceStateActions = require('./actions/ServiceStateActions');

const ServiceState = React.createClass({

  getIsRunning() {
    if (this.props.service.isRunning == null) return 'unknown';
    else if (this.props.service.isRunning) return 'RUNNING';
    else return 'STOPPED';
  },

  getResources() {
    let result = '';

    if (this.props.service.instancesN != null) {
      result += `${this.props.service.instancesN} instances`;
    }
    else {
      result += 'unknown number of instances';
    }

    result += ', ';

    if (this.props.service.memory != null) {
      result += `${this.props.service.memory} MB`;
    }
    else {
      result += 'unknown memory';
    }

    return result;
  },

  render: function() {
    console.log(this.props.service);
    return (
      <div className='ui item'>
        <div className='content'>
          <div className='header'>{this.props.service.name}</div>
          <div className='meta'>{this.getIsRunning()}

<div className="ui mini horizontal statistic">
  <div className="value">
    {this.props.service.instancesN ? this.props.service.instancesN : '?'} /
    {this.props.service.instancesN ? this.props.service.instancesN : '?'}
  </div>
  <div className="label">
    instances
  </div>
</div>

<div className="ui mini horizontal statistic">
  <div className="value">
    {this.props.service.memory ? this.props.service.memory : '?'} /
    {this.props.service.memory ? this.props.service.memory : '?'}
  </div>
  <div className="label">
    MB
  </div>
</div>

         </div>
        </div>
      </div>
    );
  }
});

const ServicesList = React.createClass({

  getInitialState: function () {
    return {
     services: [ ]
    };
  },

  componentWillMount: function () {
    ServiceStateStore.listen(this.handleServiceStateStoreChange);
  },

  handleServiceStateStoreChange: function (storeState) {
    this.setState({ services: storeState.services });
  },

  render: function() {
    const states = this.state.services.map(function (x) {
      return <ServiceState key={x.name} service={x}/>;
    });

    return (
    <div>
      <h2>Showing state of {states.length} service(s)</h2>
      <div className='ui items'>{states}</div>
    </div>);
  }
});

setTimeout(function () {
  ServiceStateActions.addService("HDS");
  ServiceStateActions.setServiceRunning("HDS", true);
  ServiceStateActions.setServiceResources("HDS", 1, 1024);
}, 1000);

setTimeout(function () {
  ServiceStateActions.addService("EAPI");
  ServiceStateActions.setServiceRunning("HDS", false);
  ServiceStateActions.setServiceRunning("EAPI", true);
}, 2000);

setTimeout(function () {
  ServiceStateActions.addService("EAPI");
  ServiceStateActions.setServiceRunning("HDS", true);
  ServiceStateActions.setServiceResources("EAPI", 3, 1536);
  ServiceStateActions.setServiceRunning("EAPI", false);
}, 5000);

ReactDOM.render(
  <ServicesList/>,
  document.getElementById('root')
);
