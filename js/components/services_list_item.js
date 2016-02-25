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

  render: function() {
    return (
        <div className='ui segment'>
          <div className='cf-app-status'>
            <div className='cf-app-identifier'>
              <div className='content'>
                <div className='ui large header'>{this.props.service.name} <span className='version'>14.2 b0208</span></div>
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
                <div className='three wide column'>{this.props.service.instancesN ? this.props.service.instancesN : '?'}</div>

                <div className='two wide column meta'>RAM</div>
                <div className='three wide column'>{this.props.service.memory ? this.props.service.memory : '?'}</div>

                <div className='two wide column meta'>HDD</div>
                <div className='three wide column'>?</div>

                <div className='two wide column meta'>Uptime</div>
                <div className='three wide column'>13h 25m 48s</div>

              </div>
            </div>
            <div className='cf-app-resources'>
              <div className='ui tiny statistics'>
                <div className='statistic'>
                  <div className='value'>
                    12.7%
                  </div>
                  <div className='label'>
                    CPU
                  </div>
                </div>
                <div className='statistic'>
                  <div className='value'>
                    47.8%
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
