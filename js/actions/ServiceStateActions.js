var alt = require('../alt');

var ServiceStateActions = {

  addService: function (serviceName) {
    return { serviceName: serviceName };
  },

  setServiceResources: function (serviceName, instancesN, memory, diskQuota) {
    return {
      serviceName: serviceName,
      instancesN: instancesN,
      memory: memory,
      diskQuota: diskQuota
    };
  },

  setServiceRunning: function (serviceName, isRunning) {
    return {
      serviceName: serviceName,
      isRunning: isRunning
    };
  },

  setServiceVersion: function (serviceName, version) {
    return {
      serviceName: serviceName,
      version: version
    };
  },

  setInstanceState: function (serviceName, instanceId, isRunning, memoryUsage, cpuUsage, diskUsage) {
    return {
      serviceName: serviceName,
      instanceId: instanceId,
      isRunning: isRunning,
      memoryUsage: memoryUsage,
      cpuUsage: cpuUsage,
      diskUsage: diskUsage
    }
  }

}

module.exports = alt.createActions(ServiceStateActions);
