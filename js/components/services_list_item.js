const Immutable = require('immutable');
const React = require('react');
const ReactDOM = require('react-dom');
const PureRenderMixin = require('react-addons-pure-render-mixin');
const StateVariablesStore = require('../stores/StateVariablesStore');

const ServicesListItem = React.createClass({

  mixins: [ PureRenderMixin ],

  getInitialState() {
    return {
      variables: Immutable.Map()
    }
  },

  componentWillMount() {
    StateVariablesStore.listen(this.handleStateVariablesStoreChange);
  },

  handleStateVariablesStoreChange(store) {
    this.setState({ variables: store.getObjectVariables(this.props.applicationId) });
  },

  v(name) {
    return this.state.variables.getIn([ name, 'value' ]);
  },

  placeholder(s, format) {
    if (s == null) return "?";
    else if (format == null) return s;
    else return format(s);
  },

  formatBytes(x) {
    const bytes = Math.round(x);
    if (bytes <= 1024) return `${bytes}B`;

    const _kBytes = Math.round(bytes / 102.4) / 10;
    const kBytes = (_kBytes > 10) ? Math.round(_kBytes) : _kBytes;
    if (kBytes <= 1024) return `${kBytes}kB`;

    const _MBytes = Math.round(kBytes / 102.4) / 10;
    const MBytes = (_MBytes > 10) ? Math.round(_MBytes) : _MBytes;
    if (MBytes <= 1024) return `${MBytes}MB`;

    const _GBytes = Math.round(MBytes / 102.4) / 10;
    const GBytes = (_GBytes > 10) ? Math.round(_GBytes) : _GBytes;
    return `${GBytes}GB`;
  },

  formatPercent(x) {
    const f = Math.round(x * 100);
    return `${f}%`;
  },

  getIsStarted() {
    const state = this.v('requestedState');

    if (state == null) return [ ];
    else return <div className='ui label'>{state}</div>;
  },

  getIsRunning() {
    const state = this.v('state');

    if (state == null) return [ ];
    else return <div className='ui label'>{state}</div>;
  },

  getHB() {
    return [ ];
  },

  getVersion() {
    return this.state.variables.getIn([ 'environment', 'value', 'VERSION' ]);
  },

  getCpuStatisticColor() {
    const usage = this.v('cpuUsage');
    if (usage == null || usage < 0.8) return '';
    else if (usage < 0.9) return 'blue';
    else return 'red';
  },

  getMemoryStatisticColor() {
    const usage = this.v('memoryUsage');
    if (usage == null || usage < 0.8) return '';
    else if (usage < 0.9) return 'blue';
    else return 'red';
  },

  render: function() {
    return (
      <tr className='cf-app-status'>
        <td className='cf-app-identifier'>
          <div className='content'>
            <div className='ui large header'>{this.props.name}</div>
            <div className='meta'>{this.placeholder(this.getVersion())}</div>
          </div>
        </td>
        <td className='cf-app-meta'>
          <div className='ui padded grid'>

            <div className='sixteen wide column'>
              {this.getIsStarted()}
              {this.getIsRunning()}
              {this.getHB()}
            </div>

            <div className='two wide column meta'>Instances</div>
            <div className='three wide column'>{this.placeholder(this.v('instances'))}</div>

            <div className='two wide column meta'>RAM</div>
            <div className='three wide column'>{this.placeholder(this.v('memoryQuota'), this.formatBytes)}</div>

            <div className='two wide column meta'>HDD</div>
            <div className='three wide column'>{this.placeholder(this.v('diskQuota'), this.formatBytes)}</div>

          </div>
        </td>
        <td className='cf-app-resources'>
          <div className='ui tiny statistics'>
            <div className={'statistic ' + this.getCpuStatisticColor()}>
              <div className='value'>
                {this.placeholder(this.v('cpuUsage'), this.formatPercent)}
              </div>
              <div className='label'>
                CPU
              </div>
            </div>
            <div className={'statistic ' + this.getMemoryStatisticColor()}>
              <div className='value'>
                {this.placeholder(this.v('memoryUsage'), this.formatPercent)}
              </div>
              <div className='label'>
                RAM
              </div>
            </div>
          </div>
        </td>
      </tr>
    );
  }
});

module.exports = ServicesListItem;
