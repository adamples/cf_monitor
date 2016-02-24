var React = require('react');
var PureRenderMixin = require('react-addons-pure-render-mixin');
var Origin = require('./Origin');

var Text = React.createClass({
  mixins: [PureRenderMixin],

  getDefaultProps: function () {
    return {
      'x': 0,
      'y': 0,
      'class': null,
      'decoration': null,
      'relRotation': 0,
      'absRotation': 0,
      'halign': 'left',
      'valign': 'bottom',
      'hspace': 0,
      'vspace': 0
    };
  },

  textAnchor: function () {
    if (this.props.absRotation == 90 || this.props.absRotation == 180) {
      switch (this.props.halign) {
        case 'left': return 'end';
        case 'center': return 'middle';
        case 'right': return 'start';
      }
    }
    else {
      switch (this.props.halign) {
        case 'left': return 'start';
        case 'center': return 'middle';
        case 'right': return 'end';
      }
    }
  },

  alignmentBaseline: function () {
    if (this.props.absRotation == 90 || this.props.absRotation == 180) {
      switch (this.props.valign) {
        case 'top': return 'text-after-edge';
        case 'center': return 'middle';
        case 'bottom': return 'text-before-edge';
      }
    }
    else {
      switch (this.props.valign) {
        case 'top': return 'text-before-edge';
        case 'center': return 'middle';
        case 'bottom': return 'text-after-edge';
      }
    }
  },

  transform: function () {
    if (this.props.absRotation == 90 || this.props.absRotation == 180) {
      return 'rotate(180)'
    }
    else {
      return '';
    }
  },

  render: function() {
    return (
      <g class={'text' + (this.props.class ? ' ' + this.props.class : '')}
        transform={'translate(' + this.props.x + ' ' + this.props.y + ') rotate(' + this.props.relRotation + ')'}>
        <Origin/>
        <g class='text-offset'>
          <text
            text-anchor={this.textAnchor()}
            style={{'alignmentBaseline': this.alignmentBaseline()}}
            transform={this.transform()}
            text-decoration={this.props.decoration}
           >
            {this.props.children}
          </text>
        </g>
      </g>
    );
  }
});

module.exports = Text;
