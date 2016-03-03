const alt = require('../alt');

const StateVariablesActions = {

  setVariables: function (variables) {
    return variables;
  }

}

module.exports = alt.createActions(StateVariablesActions);
