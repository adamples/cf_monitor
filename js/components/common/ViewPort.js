var React = require('react');
var PureRenderMixin = require('react-addons-pure-render-mixin');
var Grid = require('./Grid');

var ViewPort = React.createClass({
  mixins: [ PureRenderMixin ],

  getDefaultProps: function () {
    return {
      x: 0,
      y: 0,
      width: 1,
      height: 1,
      scale: 1.0,
      offsetX: 0,
      offsetY: 0
    };
  },

  getTransform: function () {
    return 'translate(' + this.props.x + ' ' + this.props.y + ') ' +
      'scale(' + this.props.scale + ') ' +
      'translate(' + (-this.props.offsetX) + ' ' + (-this.props.offsetY) + ')';
  },

  render: function() {
    var gridWidth = this.props.width / this.props.scale;
    var gridHeight = this.props.height / this.props.scale;

    return (
      <g>
        {
          //<rect x={this.props.x - 0.5} y={this.props.y - 0.5}
          //width={this.props.width + 1} height={this.props.height + 1}
          //stroke='black' stroke-width='1' fill='white' class='viewport-background'/>
        }
        <g transform={this.getTransform()}>
          <Grid class='secondary-grid' x={this.props.offsetX} y={this.props.offsetY}
            width={gridWidth} height={gridHeight} size={10} scale={this.props.scale}/>
          {this.props.children}
        </g>
      </g>
    );
  }
});

module.exports = ViewPort;
