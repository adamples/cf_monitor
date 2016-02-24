var Immutable = require('immutable');
var React = require('react');
var PureRenderMixin = require('react-addons-pure-render-mixin');
var ANDGateGenerator = require('../../lib/symbol_generators/logic/ANDGateGenerator');
var ParametersForm = require('./ParametersForm');
var SymbolPreview = require('../library/SymbolPreview');

var GeneratorWithPreview = React.createClass({
  mixins: [ PureRenderMixin ],

  getInitialState: function () {
    return {
      parameters: Immutable.Map({
        inputsN: 2,
        isOutputInverted: false,
        areInputsInverted: false,
        isTriState: false,
        isTriStateInverted: false
      })
    }
  },

  componentWillMount: function () {
  },

  componentDidMount: function () {
  },

  componentWillUnmount: function () {
  },

  handleFormValuesChanged: function (newValues) {
    this.setState({ parameters: newValues });
  },

  render: function () {
    const symbol = ANDGateGenerator.generate(this.state.parameters.toObject());

    return (
      <div className='ui grid' style={{ maxWidth: 1300, padding: 10 }}>
        <div className='six wide column'>
          <div className='ui segment'>
            <ParametersForm
              parameters={ANDGateGenerator.getParametersDesc()}
              initialValues={this.state.parameters}
              onValuesChanged={this.handleFormValuesChanged}
            />
          </div>
        </div>
        <div className='ten wide column'>
          <SymbolPreview symbol={symbol}/>
        </div>
      </div>
    );
  }
});

module.exports = GeneratorWithPreview;
