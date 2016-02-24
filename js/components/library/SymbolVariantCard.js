var React = require('react');
var PureRenderMixin = require('react-addons-pure-render-mixin');
var TagList = require('../common/TagList');
var ViewPort = require('../common/AutoScalingViewPort');
var SymbolComponent = require('../schematic/Symbol');
var M = require('../../models/Model');

var SymbolVariantCard = React.createClass({
  mixins: [ PureRenderMixin ],

  getInitialState: function () {
    return {
      deviceInstance: M.Schematic.DeviceInstance({ name: '{NAME}', value: '{VALUE}' })
    }
  },

  render: function () {
    const variant = this.props.variant;

    return (
      <div className='ui card'>
        <div className='content'>
          <div className='header'>{variant.get('name')}</div>
        </div>
        {/*<div className="ui top right attached teal label">
          Preferred
        </div>*/}
        <div className='image'>
          <svg version='1.2'
            width={290}
            height={290}
            class='schematic'
          >
            <ViewPort width={290} height={290}>
              <SymbolComponent x={0} y={0}
                symbolPrototype={variant.get('prototype')}
                deviceInstance={this.state.deviceInstance}
              />
            </ViewPort>
          </svg>
        </div>
        <div className='extra content'>
          <TagList forObject={variant}/>
        </div>
      </div>
    );
  }
});

module.exports = SymbolVariantCard;
