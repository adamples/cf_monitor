var React = require('react');
var PureRenderMixin = require('react-addons-pure-render-mixin');
var TagList = require('../common/TagList');
var ViewPort = require('../common/AutoScalingViewPort');
var SymbolVariantCard = require('./SymbolVariantCard');
var SymbolComponent = require('../schematic/Symbol');
var SymbolComponent = require('../symbol_inspector/Symbol');
var M = require('../../models/Model');
var DEVICE_INSTANCE = M.Schematic.DeviceInstance({ name: '{NAME}', value: '{VALUE}' });

var SymbolPreview = React.createClass({
  mixins: [ PureRenderMixin ],

  render: function () {
    const symbol = this.props.symbol;
    const variants = symbol.get('variants').valueSeq();

    return (
      <div className='repository-symbol-preview ui segments'>
        <div className='ui segment'>
          <div className='ui large header'>
            <i className='icon cubes'/>
            <div className='content'>
              {symbol.get('name')}
              <div className='sub header'>{symbol.get('description')}</div>
            </div>
          </div>
          <div className='content'>
            <TagList forObject={symbol}/>
          </div>
        </div>
        <div className='ui segment' style={{backgroundColor: '#e0f4f8'}}>
          <div className='ui cards'>
            {variants.map((v) => <SymbolVariantCard key={v.get('uuid')} variant={v}/>)}
          </div>
        </div>
        {/*
        <div className='ui segment clearing icon message'>
          <i className="info icon"/>
          <div className='content'>
            This symbol was generated automatically using ANDGateGenerator.
          </div>
          <div className='content'>
            <button className='ui right floated labeled icon button'>
              <i className="options icon"/> Open in Generator
            </button>
          </div>
        </div>
        */}
      </div>
    );
  }
});

module.exports = SymbolPreview;
