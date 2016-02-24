var React = require('react');
var PureRenderMixin = require('react-addons-pure-render-mixin');

var Grid = React.createClass({
  mixins: [ PureRenderMixin ],

  getDefaultProps: function () {
    return {
      'viewBox': '0 0 0 0',
      'viewPort': '0 0',
      'zoom': 0,
      'type': 'lines',
      'size': 0,
      'major': 0
    };
  },

  getParsedViewBox() {
    var splitted = this.props.viewBox.split(/\s+/);
    return {
      offsetX: parseFloat(splitted[0]),
      offsetY: parseFloat(splitted[1]),
      width: parseFloat(splitted[2]),
      height: parseFloat(splitted[3])
    };
  },

  getParsedViewPort() {
    var splitted = this.props.viewPort.split(/\s+/);
    return {
      width: parseFloat(splitted[0]),
      height: parseFloat(splitted[1])
    };
  },

  render: function() {
    var viewBox = this.getParsedViewBox();
    var viewPort = this.getParsedViewPort();
    var strokeWidth = 1 / this.props.zoom;

    return (
      <g>
        <defs>
          <pattern id='smallGrid' width='10' height='10' patternUnits='userSpaceOnUse' class='grid primary-grid'>
            <path d='M 10 0 L 0 0 0 10' stroke-width={strokeWidth}/>
          </pattern>
          <pattern id='grid' width='100' height='100' patternUnits='userSpaceOnUse' class='grid secondary-grid'>
            <rect width='100' height='100' fill='url(#smallGrid)'/>
            <path d='M 100 0 L 0 0 0 100' stroke-width={strokeWidth}/>
          </pattern>
        </defs>
        <rect x={viewBox.offsetX} y={viewBox.offsetY} width={viewBox.width} height={viewBox.height} fill='url(#grid)' class='grid'/>
      </g>
    );
  }
});

module.exports = Grid;
