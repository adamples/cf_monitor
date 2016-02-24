var React = require('react');
var PureRenderMixin = require('react-addons-pure-render-mixin');
var Model = require('../../models/SchematicModel');
var Origin = require('./Origin');
var Text = require('./Text');
var Pin = require('./Pin');

var Symbol = React.createClass({
  mixins: [ PureRenderMixin ],

  getDefaultProps: function () {
    return {
      x: 0,
      y: 0,
      relRotation: 0,
      absRotation: 0,
      symbolPrototype: null,
      deviceInstance: null,
      gateName: null
    };
  },

  getName: function () {
    var name = this.props.deviceInstance.get('name');
    if (!!this.props.gateName) name += '' + this.props.gateName;
    return name;
  },

  getValue: function () {
    var value = this.props.deviceInstance.get('value');
    return value || ''
  },

  renderPin: function (pin) {
    var padName = this.props.deviceInstance.getPadName(this.props.gateName, pin.get('name'));

    return (<Pin
      x={pin.get('x')} y={pin.get('y')}
      name={pin.get('name')}
      padName={padName}
      showName={pin.get('showName')}
      showPadName={padName != null && pin.get('showPadName')}
      isInverted={pin.get('isInverted')}
      isClock={pin.get('isClock')}
      length={pin.get('length')}
      relRotation={pin.get('rotation')}
      absRotation={this.props.absRotation + pin.get('rotation')}
    />);
  },

  renderText: function (text) {
    return (<Text
      x={text.x} y={text.y}
      class={text.cssClassString()}
      halign={text.halign}
      valign={text.valign}
      relRotation={text.rotation}
      absRotation={this.props.absRotation + text.rotation}
    >{text.get('value')}</Text>);
  },

  renderPath: function (path) {
    var data = path.getData();
    var shapeRendering = data.match(/[AaCc]/) ? 'optimizeSpeed' : 'inherit';
    return (<path d={data} class={path.cssClassString()} shape-rendering={shapeRendering} />);
  },

  render: function() {
    var children = [ ];

    this.props.symbolPrototype.outline.forEach(function (path) {
      if (path.get('isFilled')) children.push(this.renderPath(path.addClass('outline-fill')));
    }.bind(this));

    children.push(<Origin/>);

    this.props.symbolPrototype.pins.forEach(function (pin) {
      children.push(this.renderPin(pin));
    }.bind(this));

    var nameText = this.props.symbolPrototype.nameText
      .setValue(this.getName())
      .addClass('name');
    children.push(this.renderText(nameText));

    var valueText = this.props.symbolPrototype.valueText
      .setValue(this.getValue())
      .addClass('value');
    children.push(this.renderText(valueText));

    this.props.symbolPrototype.outline.forEach(function (path) {
      children.push(this.renderPath(path.addClass('outline-stroke')));
    }.bind(this));

    return (
      <g transform={'translate(' + this.props.x + ',' + this.props.y + ') rotate(' + this.props.relRotation + ')'} class='symbol'>
        {children}
      </g>
    );
  }
});

module.exports = Symbol;
