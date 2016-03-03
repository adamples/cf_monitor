const Immutable = require('immutable');
const React = require('react');
const ReactDOM = require('react-dom');
const PureRenderMixin = require('react-addons-pure-render-mixin');
const ServicesListItem = require('./services_list_item');
const CFHierarchyStore = require('../stores/CFHierarchyStore');


const ServicesList = React.createClass({

  mixins: [ PureRenderMixin ],

  getInitialState: function () {
    return {
      apps: Immutable.Seq()
    };
  },

  componentWillMount: function () {
    CFHierarchyStore.listen(this.handleCFHierarchyStoreChange);
  },

  handleCFHierarchyStoreChange: function (store) {
    this.setState({ apps: store.getAppsInSpace(this.props.spaceId) });
  },

  render: function() {
    const states = this.state.apps
      .sort(function (a, b) {
        return a.get('name').localeCompare(b.get('name'));
      })
      .filter(function (app) {
        return app.get('name').match(/emulator/) == null
      })
      .map(function (app) {
        const id = app.get('id');
        const name = app.get('name');
        return <ServicesListItem key={id} name={name.toUpperCase()} applicationId={id}/>;
      });

    return (
      <div>
        <h2>Showing state of {states.count()} service(s) in space {this.props.name}</h2>
        <table className='ui basic table'>
          <tbody>{states}</tbody>
        </table>
      </div>
    );
  }
});


module.exports = ServicesList;
