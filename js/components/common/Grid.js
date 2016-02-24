var React = require('react');
var PureRenderMixin = require('react-addons-pure-render-mixin');

var Grid = React.createClass({
  mixins: [ PureRenderMixin ],

  getDefaultProps: function () {
    return {
      x: 0,
      y: 0,
      width: 1,
      height: 1,
      scale: 1,
      size: 10,
      multiplier: 10,
      class: ''
    };
  },

  MIN_SPACING: 5,

  getMainGridSize: function () {
    var size = this.props.size;
    while (size * this.props.scale < this.MIN_SPACING) size *= 10;
    while (size * this.props.scale > this.MIN_SPACING * this.props.multiplier) size /= this.props.multiplier;
    return size;
  },

  render: function() {
    var id = Math.floor(Math.random() * 10000);
    var size = this.getMainGridSize();
    var secondarySize = size * this.props.multiplier;

    var actualSize = size * this.props.scale;
    var mainOpacity = 0.1;
    var secondaryOpacity = 0.2;

    if (actualSize < this.MIN_SPACING * 2) {
      var k = actualSize / this.MIN_SPACING - 1;
      mainOpacity = k * 0.1;
      secondaryOpacity = 0.1 + k * 0.1;
    }

    if (actualSize > this.MIN_SPACING * (this.props.multiplier - 2)) {
      var k = actualSize / this.MIN_SPACING - (this.props.multiplier - 2);
      secondaryOpacity = 0.2 - k * 0.1;
    }

    console.log(actualSize, secondaryOpacity);

    return (
      <g>
        <defs>
          <pattern id={'grid-main-' + id} width={size} height={size} patternUnits='userSpaceOnUse'
            class={'grid ' + this.props.class}>
            <path d={'M ' + size + ' 0 L 0 0 0 ' + size} stroke-width={1 / this.props.scale}/>
          </pattern>
          <pattern id={'grid-secondary-' + id} width={secondarySize} height={secondarySize} patternUnits='userSpaceOnUse'
            class={'grid ' + this.props.class}>
            <path d={'M ' + secondarySize + ' 0 L 0 0 0 ' + secondarySize} stroke-width={1 / this.props.scale}/>
          </pattern>
        </defs>
        <rect x={this.props.x} y={this.props.y} width={this.props.width} height={this.props.height} fill={'url(#grid-main-' + id + ')'} opacity={mainOpacity}/>
        <rect x={this.props.x} y={this.props.y} width={this.props.width} height={this.props.height} fill={'url(#grid-secondary-' + id + ')'}  opacity={secondaryOpacity}/>
      </g>
    );
  }
});

module.exports = Grid;
