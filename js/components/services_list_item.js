const React = require('react');
const ReactDOM = require('react-dom');
const PureRenderMixin = require('react-addons-pure-render-mixin');

const ServicesListItem = React.createClass({

  getIsStarted() {
    return [ ];
  },

  getIsRunning() {
    if (this.props.service.isRunning == null) return [ ];
    else if (this.props.service.isRunning) return <div className='ui label'>RUNNING</div>;
    else return <div className='ui red label'>STOPPED</div>;
  },

  getHB() {
    return [ ];
  },

  placeholder(s, format) {
    if (s == null) return "?";
    else if (format == null) return s;
    else return format(s);
  },

  formatBytes(x) {
    return `${x}MB`;
  },

  formatPercent(x) {
    const f = Math.round(x * 100);
    return `${f}%`;
  },

  getCpuStatisticColor() {
    const usage = this.props.service.cpuUsage;
    if (usage == null || usage < 0.8) return '';
    else if (usage < 0.9) return 'blue';
    else return 'red';
  },

  getMemoryStatisticColor() {
    const usage = this.props.service.memoryUsage;
    if (usage == null || usage < 0.8) return '';
    else if (usage < 0.9) return 'blue';
    else return 'red';
  },

  render: function() {
    return (
        <div className='ui segment'>
          <div className='cf-app-status'>
            <div className='cf-app-identifier'>
              <div className='content'>
                <div className='ui large header'>{this.props.service.name} <span className='version'>{this.placeholder(this.props.service.version)}</span></div>
                <div className='meta'>{this.props.service.name}</div>
              </div>
            </div>
            <div className='cf-app-meta'>
              <div className='ui padded grid'>

                <div className='sixteen wide column'>
                  {this.getIsStarted()}
                  {this.getIsRunning()}
                  {this.getHB()}
                </div>

                <div className='two wide column meta'>Instances</div>
                <div className='three wide column'>{this.placeholder(this.props.service.instancesN)}</div>

                <div className='two wide column meta'>RAM</div>
                <div className='three wide column'>{this.placeholder(this.props.service.memory, this.formatBytes)}</div>

                <div className='two wide column meta'>HDD</div>
                <div className='three wide column'>{this.placeholder(this.props.service.diskQuota, this.formatBytes)}</div>

              </div>
            </div>
            <div className='cf-app-resources'>
              <div className='ui tiny statistics'>
                <div className={'statistic ' + this.getCpuStatisticColor()}>
                  <div className='value'>
                    {this.placeholder(this.props.service.cpuUsage, this.formatPercent)}
                  </div>
                  <div className='label'>
                    CPU
                  </div>
                </div>
                <div className={'statistic ' + this.getMemoryStatisticColor()}>
                  <div className='value'>
                    {this.placeholder(this.props.service.memoryUsage, this.formatPercent)}
                  </div>
                  <div className='label'>
                    RAM
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }
});

module.exports = ServicesListItem;
