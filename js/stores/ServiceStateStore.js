const alt = require('../alt');
const ServiceStateActions = require('../actions/ServiceStateActions');
const Immutable = require('immutable');
const _ = require('underscore');

class ServiceStateStore {

  constructor() {
    this.nameToService = { };
    this.services = [ ];
    this.bindListeners({
      handleAddService: ServiceStateActions.ADD_SERVICE,
      handleSetServiceResources: ServiceStateActions.SET_SERVICE_RESOURCES,
      handleSetServiceRunning: ServiceStateActions.SET_SERVICE_RUNNING,
      handleSetServiceVersion: ServiceStateActions.SET_SERVICE_VERSION,
      handleSetInstanceState: ServiceStateActions.SET_INSTANCE_STATE
    });
  }

  handleAddService(data) {
    this.getService(data.serviceName);
  }

  sortServices() {
    this.services.sort(function (a, b) {
      return a.name.localeCompare(b.name);
    });
  }

  getService(name) {
    if (this.nameToService[name] == null) {
      const newService = { name: name };
      this.services.push(newService);
      this.nameToService[name] = newService;
      this.sortServices();
    }
    return this.nameToService[name];
  }

  getServiceInstance(serviceName, instanceId) {
    let service = this.getService(serviceName);

    if (service.instances == null) service.instances = { };

    if (service.instances[instanceId] == null) {
      const newInstance = { id: instanceId };
      service.instances[instanceId] = newInstance;
    }

    return service.instances[instanceId];
  }

  calculateAggregateResourceUsages(serviceName) {
    let service = this.getService(serviceName);
    if (service.instances == null) return;
    const instances = _.values(service.instances);

    if (instances.length == service.instancesN) {
      service.cpuUsage = _.reduce(instances, (m, o) => m + o.cpuUsage, 0) / service.instancesN;
      service.memoryUsage = _.reduce(instances, (m, o) => m + o.memoryUsage, 0) / (service.memory * 1024 * 1024 * service.instancesN);
    }
    else {
      service.cpuUsage = null;
      service.memoryUsage = null;
    }
  }

  handleSetServiceResources(data) {
    let service = this.getService(data.serviceName);
    service.instancesN = data.instancesN;
    service.memory = data.memory;
    service.diskQuota = data.diskQuota;
  }

  handleSetServiceRunning(data) {
    let service = this.getService(data.serviceName);
    service.isRunning = data.isRunning;
  }

  handleSetServiceVersion(data) {
    let service = this.getService(data.serviceName);
    service.version = data.version;
  }

  handleSetInstanceState(data) {
    const instance = this.getServiceInstance(data.serviceName, data.instanceId);
    instance.isRunning = data.isRunning;
    instance.memoryUsage = data.memoryUsage;
    instance.cpuUsage = data.cpuUsage;
    instance.diskUsage = data.diskUsage;
    this.calculateAggregateResourceUsages(data.serviceName);
  }
};

module.exports = alt.createStore(ServiceStateStore, 'ServiceStateStore');
