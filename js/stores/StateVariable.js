const Immutable = require('immutable');
const Utils = require('../lib/Utils');

const StateVariableRecord = Immutable.Record({
  objectId: null,
  name: null,
  value: null,
  timestamp: null
});

class StateVariable extends StateVariableRecord {

  constructor(objectId, name) {
    super({
      objectId: objectId,
      name: name
    });
  }

  update(value) {
    return this.merge({
      value: value,
      timestamp: Utils.currentTimestamp()
    });
  }

}


module.exports = StateVariable;
