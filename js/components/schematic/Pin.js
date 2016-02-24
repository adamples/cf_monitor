var React = require('react');
var PureRenderMixin = require('react-addons-pure-render-mixin');
var Text = require('./Text');

var Pin = React.createClass({
  mixins: [PureRenderMixin],

  getDefaultProps: function () {
    return {
      length: 20,
      relRotation: 0,
      absRotation: 0,
      isInverted: false,
      isClock: false,
      showName: true,
      showPadName: true
    };
  },

  render: function() {
    var inverter = this.props.isInverted ? <circle class='inverter' cx={-this.props.length + 2} cy={0} r={4}/> : null;
    var clock = this.props.isClock ? <path class='clock' d={'m ' + (-this.props.length) + ',-3 -12,3 12,3'}/> : null;

    var nameX = -this.props.length - (this.props.isClock ? 12 : 0);
    var length = this.props.length - (this.props.isInverted ? 9.5 : 0);
    var nameText = <Text class='description' x={nameX} y={0} absRotation={this.props.absRotation} halign='right' valign='center'
      decoration={this.props.isInverted ? 'overline' : null}>{this.getDescription()}</Text>;
    var padNameText = <Text class='pad-name' x={0} y={0} absRotation={this.props.absRotation} halign='center' valign={this.getPadNameVAlign()}>
      {this.props.padName}</Text>;

    return (
      <g transform={'translate(' + this.props.x + ',' + this.props.y + ') rotate(' + this.props.relRotation + ')'} class='pin'>
        <path d={'M 0,0 ' + (-length) + ',0'}/>
        {inverter}
        {clock}
        {this.props.showName ? nameText : null}
        {this.props.showPadName ? padNameText : null}
      </g>
    );
  },

  getDescription: function () {
    var description = this.props.name;
    if (this.props.func) description += ' (' + this.props.func + ')';
    return description;
  },

  getPadNameVAlign: function () {
    return (this.props.absRotation == 90 || this.props.absRotation == 180) ? 'top' : 'bottom'
  }

});

module.exports = Pin;
