const alt = require('../alt');
const StateVariable = require('./StateVariable');
const StateVariablesActions = require('../actions/StateVariablesActions');
const Immutable = require('immutable');
const _ = require('underscore');

class StateVariablesStore {

  static get AGGREGATES() {
    return {
      'cpuUsage': { name: 'cpuUsage', max: 1 },
      'memoryUsage': { name: 'memoryUsage', max: 'memoryQuota' },
      'diskUsage': { name: 'diskUsage', max: 'diskQuota' }
    }
  };

  constructor() {
    this.variables = Immutable.Map();

    this.bindListeners({
      handleSetVariables: StateVariablesActions.SET_VARIABLES
    });
  }

  /* - Public API --------------------------------------------------------- */

  getObjectVariables(objectId) {
    return this.variables.get(objectId);
  }

  getInstancesN(objectId) {
    const instances = this.variables.getIn([ objectId, 'instances', 'value' ]);
    return instances;
  }

  getInstances(objectId) {
    const instancesN = this.getInstancesN(objectId);
    if (instancesN == null) return null;

    const instances = _.map(_.range(0, instancesN), i => this.getObjectVariables(`${objectId}#${i}`))
    const validInstances = _.without(instances, null);

    if (validInstances.length !== instancesN) return null;
    return Immutable.List(validInstances);
  }

  /* - End-of-Public API -------------------------------------------------- */

  handleSetVariables(variables) {
    for (const variable of variables)
      this.updateVariable(variable.objectId, variable.name, variable.value);

    for (const variable of variables) {
      if (StateVariablesStore.AGGREGATES[variable.name] != null) {
        const m = variable.objectId.match(/([^#]+)#([0-9]+)/)

        if (m != null) {
          const objectId = m[1];
          const instanceId = parseInt(m[2]);

          this.calculateAggregate(objectId, variable.name);
        }
      }
    }
  }

  updateVariable(objectId, name, value) {
    const variable = new StateVariable(objectId, name).update(value);

    if (!this.variables.has(objectId))
      this.variables = this.variables.set(objectId, Immutable.Map());

    this.variables = this.variables.setIn([ objectId, name ], variable);
  }

  _getAggregateMax(varName, appVars) {
    const maxValue = StateVariablesStore.AGGREGATES[varName].max;

    if (_.isString(maxValue)) return appVars.getIn([ maxValue, 'value' ]);
    if (_.isFunction(maxValue)) return maxValue(appVars);
    return maxValue;
  }

  calculateAggregate(objectId, name) {
    const appVars = this.getObjectVariables(objectId);
    const instances = this.getInstances(objectId);
    if (instances == null) return;
    const max = this._getAggregateMax(name, appVars);
    const values = instances.map(instance => instance.getIn([ name, 'value' ]));
    if (values.has(null)) return;
    const sum = values.reduce((m, o) => m + o)
    const aggregate = sum / max / instances.count();

    this.updateVariable(objectId, StateVariablesStore.AGGREGATES[name].name, aggregate);
  }

};

module.exports = alt.createStore(StateVariablesStore, 'StateVariablesStore');
