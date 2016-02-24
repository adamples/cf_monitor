var alt = require('../alt');

var ServiceStateActions = {

  addService: function (serviceName) {
    return { serviceName: serviceName };
  },

  setServiceResources: function (serviceName, instancesN, memory) {
    return {
      serviceName: serviceName,
      instancesN: instancesN,
      memory: memory
    };
  },

  setServiceRunning: function (serviceName, isRunning) {
    return {
      serviceName: serviceName,
      isRunning: isRunning
    };
  }

}

module.exports = alt.createActions(ServiceStateActions);
