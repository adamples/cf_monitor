var Immutable = require('immutable');
var React = require('react');
var PureRenderMixin = require('react-addons-pure-render-mixin');

var ParametersForm = React.createClass({
  mixins: [ PureRenderMixin ],

  getInitialState: function () {
    return {
      values: this.props.initialValues
    }
  },

  componentWillMount: function () {
  },

  componentDidMount: function () {
  },

  componentWillUnmount: function () {
  },

  handleChange: function (e) {
    const name = e.target.name;
    const prevValue = this.state.values.get(name);
    const isCheckbox = (e.target.type == 'checkbox');
    const newValue = isCheckbox ? e.target.checked : e.target.value;
    console.log(`${name}: ${prevValue} -> ${newValue}`);
    const newValues = this.state.values.set(name, newValue);

    this.setState({ values: newValues });
    this.props.onValuesChanged(newValues);
  },

  renderList: function (l) {
    return l.map((p) => { return this.renderElement(p); });
  },

  renderGroup: function (g) {
    return ([
      <h4 className='ui dividing header'>{g.get('name')}</h4>,
      this.renderList(g.get('parameters'))
    ]);
  },

  renderBooleanParam: function (p) {
    const name = p.get('name');
    const isChecked = this.state.values.get(name);

    return (
      <div className='inline field'>
        <div className='ui checkbox'>
          <input name={name} id={name} type='checkbox' checked={isChecked}/>
          <label for={name}>{p.get('description')}</label>
        </div>
      </div>
    );
  },

  renderIntegerParam: function (p) {
    const name = p.get('name');
    const value = this.state.values.get(name);

    return (
      <div className='inline field'>
        <label style={{width: 200}}>{p.get('description')}</label>
        <input name={name} type='number' value={value}/>
      </div>
    );
  },

  renderParam: function (p) {
    switch (p.get('type')) {
      case "BOOLEAN": return this.renderBooleanParam(p);
      case "INTEGER": return this.renderIntegerParam(p);
    }
  },

  renderElement: function (e) {
    if (e.get('type') == 'GROUP') return this.renderGroup(e);
    else return this.renderParam(e);
  },

  render: function () {
    console.log(JSON.stringify(this.state.values.toJSON()));

    return (
      <form className='ui form' onChange={this.handleChange}>
        {this.renderList(this.props.parameters)}
      </form>
    );
  }
});

module.exports = ParametersForm;
