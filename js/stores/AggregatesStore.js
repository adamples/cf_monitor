const alt = require('../alt');
const StateVariable = require('./StateVariable');
const StateVariablesActions = require('../actions/StateVariablesActions');
const StateVariablesStore = require('./StateVariablesStore');
const Immutable = require('immutable');
const _ = require('underscore');

class AggregatesStore {

  static VARIABLES = {
    'cpuUsage': { name: 'cpuUsage', max: 1 },
    'memoryUsage': { name: 'memoryUsage', max: 'memoryQuota' },
    'diskUsage': { name: 'diskUsage', max: 'diskQuota' }
  };

  constructor() {
    this.bindListeners({
      handleSetVariables: AggregatesActions.SET_VARIABLES
    });
  }

  handleSetVariables(variables) {
    this.waitFor(StateVariablesStore);

    for (const variable of variables)
      if (VARIABLES[variable.name] != null) {
        const m = variable.objectId.match(/([^#]+)#([0-9]+)/)

        if (m != null) {
          const objectId = m[1];
          const instanceId = parseInt(m[2]);

          this.calculateAggregate(objectId, variable.name);
        }
      }
  }

  getInstancesN(objectId) {
    const appVars = StateVariablesStore.getObjectVariables(objectId);
    const instances = appVars.getIn([ 'instances', 'value' ]);
    return instances;
  }

  getInstances(objectId) {
    const instancesN = this.getInstancesN(objectId);
    if (instancesN == null) return null;

    const instances = _.map(_.range(0, instancesN), i => StateVariablesStore.getObjectVariables(`${objectId}#${i}`))
    const validInstances = _.without(instances, null);

    if (validInstances.length !== instancesN) return null;
    return Immutable.List(validInstances);
  }

  getMax(varName, appVars) {
    const maxValue = VARIABLES[varName].max;

    if (_.isString(maxValue)) return appVars.get(maxValue);
    if (_.isFunction(maxValue)) return maxValue(appVars);
    return maxValue;
  }

  calculateAggregate(objectId, name) {
    const appVars = StateVariablesStore.getObjectVariables(objectId);
    const instances = getInstances(objectId);
    if (instances == null) return;
    const max = getMax(name, appVars);
    const values = instances.map(instance => instance.get(name));
    if (values.has(null)) return;
    const aggregate = values.reduce((m, o) => m + o) / max / instances.count();

    StateVariablesActions.setVariables([
      { objectId: objectId, name: VARIABLES[name].name, aggregate }
    ]);
  }

};

module.exports = alt.createStore(AggregatesStore, 'AggregatesStore');
