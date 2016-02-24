var React = require('react');
var PureRenderMixin = require('react-addons-pure-render-mixin');
var Text = require('./Text');

var Path = React.createClass({
  mixins: [ PureRenderMixin ],

  getDefaultProps: function () {
    return {
      model: null
    };
  },

  renderPoints: function (path) {
    var points = [ ];
    var prevTarget = null;

    path.get('segments').forEach(function (segment) {
      var target = segment.get('target');
      if (target == null) return;
      points.push(<circle cx={target.get('x')} cy={target.get('y')} r='1.5'
        stroke='red' stroke-width='1.5' fill='white'/>);
      var segmentType = segment.getCommand().toUpperCase();

      switch (segmentType) {
        case 'A': break;
        case 'C':
          var c1 = segment.get('startControlPoint');
          var c2 = segment.get('endControlPoint');

          points.push(<line x1={c1.get('x')} y1={c1.get('y')} x2={prevTarget.get('x')} y2={prevTarget.get('y')}
            stroke='green' stroke-width='0.5'/>);

          points.push(<circle cx={c1.get('x')} cy={c1.get('y')} r='1.5'
            stroke='green' stroke-width='1.5' fill='white'/>);

          points.push(<line x1={c2.get('x')} y1={c2.get('y')} x2={target.get('x')} y2={target.get('y')}
            stroke='green' stroke-width='0.5'/>);

          points.push(<circle cx={c2.get('x')} cy={c2.get('y')} r='1.5'
            stroke='green' stroke-width='1.5' fill='white'/>);

          break;
      }

      prevTarget = target;
    }, [ ]);

    return points;
  },

  render: function() {
    var path = this.props.model;
    var data = path.getData();
    var shapeRendering = data.match(/[AaCc]/) ? 'optimizeSpeed' : 'inherit';

    return (
      <g shape-rendering='geometricPrecision'>
        <path d={data} class={path.cssClassString()} shape-rendering={shapeRendering}>
        </path>
        {this.renderPoints(path)}
      </g>
    );
  },

});

module.exports = Path;
