const React = require('react');
const ReactDOM = require('react-dom');
const PureRenderMixin = require('react-addons-pure-render-mixin');


const LoginForm = React.createClass({

  mixins: [ PureRenderMixin ],

  render: function () {
    const auth = this.props.authorization;

    return (
      <form className={`ui form ${auth.get('inProgress') ? 'loading' : ''}`}>
        <div className='field'>
          <label>CF API Endpoint</label>
          <input type='text' name='api-endpoint' placeholder='cf-api.example.com'/>
        </div>
        <div className='field'>
          <label>User Name</label>
          <input type='text' name='username' placeholder='api-client'/>
        </div>
        <div className='field'>
          <label>Password</label>
          <input type='text' name='password' placeholder='api-secret'/>
        </div>
        <button className='ui button' type='submit'>SignIn</button>
      </form>
    );
  }

});


module.exports = LoginForm;
