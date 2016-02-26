const React = require('react');
const ReactDOM = require('react-dom');
const PureRenderMixin = require('react-addons-pure-render-mixin');
const ServicesListItem = require('./services_list_item');
const ServiceStateStore = require('../stores/ServiceStateStore');
const ServiceStateActions = require('../actions/ServiceStateActions');


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
      return <ServicesListItem key={x.name} service={x}/>;
    });

    return (
      <div>
        <h2>Showing state of {states.length} service(s)</h2>
        <div className='ui segments'>{states}</div>
      </div>
    );
  }
});


module.exports = ServicesList;
