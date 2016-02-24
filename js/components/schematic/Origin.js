var React = require('react');
var PureRenderMixin = require('react-addons-pure-render-mixin');

var Origin = React.createClass({
  mixins: [ PureRenderMixin ],

  SIZE: 5,

  render: function() {
    return (
      <g>
        <path class='origin' d={'M -' + this.SIZE + ',0 ' + this.SIZE + ',0'}/>
        <path class='origin' d={'M 0,-' + this.SIZE + ' 0,' + this.SIZE}/>
      </g>
    );
  },

});

module.exports = Origin;
