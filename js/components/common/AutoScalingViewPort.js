var React = require('react');
var PureRenderMixin = require('react-addons-pure-render-mixin');
var ViewPort = require('./ViewPort');
var M = require('../../models/CommonModel');

var AutoScalingViewPort = React.createClass({
  mixins: [ PureRenderMixin ],

  getDefaultProps: function () {
    return {
      x: 0,
      y: 0,
      width: 1,
      height: 1,
      margin: 10
    };
  },

  getInitialState: function () {
    return {
      viewPort: M.ViewPort()
    };
  },

  componentDidMount: function () {
    var bbox = this.refs['auto-scaling-content'].getBBox();
    var contentRect = M.Rect.fromSVGRect(bbox);
    var userContentRect = contentRect;

    var viewPort = M.ViewPort({
      coords: M.Rect({
        origin: M.Point({ x: this.props.x, y: this.props.y }),
        width: this.props.width,
        height: this.props.height
      })
    })
      .zoomToRect(userContentRect, this.props.margin);

    this.setState({ viewPort: viewPort });
  },

  getTransform: function () {
    return 'translate(' + this.props.x + ' ' + this.props.y + ') ' +
      'scale(' + this.props.scale + ') ' +
      'translate(' + (-this.props.offsetX) + ' ' + (-this.props.offsetY) + ')';
  },

  render: function() {
    var gridWidth = this.props.width / this.props.scale;
    var gridHeight = this.props.height / this.props.scale;
    var vp = this.state.viewPort;

    return (
      <ViewPort x={this.props.x} y={this.props.y} width={this.props.width} height={this.props.height}
        scale={vp.get('scale')} offsetX={vp.getIn([ 'offset', 'x' ])} offsetY={vp.getIn([ 'offset', 'y' ])}
      >
        <g ref='auto-scaling-content'>
          {this.props.children}
        </g>
      </ViewPort>
    );
  }
});

module.exports = AutoScalingViewPort;
