'use strict';

var React = require('react');
var PureRenderMixin = require('react-addons-pure-render-mixin');

const COLORS = [
  'red', 'orange', 'yellow', 'olive', 'green', 'teal', 'blue', 'violet', 'purple', 'pink', 'brown'
];

function tagNameToColor(tagName) {
  var result = 0;

  for (let i = 0, c = tagName.length; i < c; ++i) {
    result += tagName.charCodeAt(i) * i + i;
  }

  console.log(result);

  return COLORS[result % COLORS.length];
}

var TagList = React.createClass({
  mixins: [ PureRenderMixin ],

  render: function () {
    return (
      <div>
        {this.props.forObject.get('tags').map(function (tag) {
          return (<span className='ui label'>{tag}</span>);
        })}
      </div>
    );
  }
});

module.exports = TagList;
