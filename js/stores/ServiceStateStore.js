const alt = require('../alt');
const ServiceStateActions = require('../actions/ServiceStateActions');
const Immutable = require('immutable');

class ServiceStateStore {

  constructor() {
    this.nameToService = { };
    this.services = [ ];
    this.bindListeners({
      handleAddService: ServiceStateActions.ADD_SERVICE,
      handleSetServiceResources: ServiceStateActions.SET_SERVICE_RESOURCES,
      handleServiceRunning: ServiceStateActions.SET_SERVICE_RUNNING
    });
  }

  handleAddService(data) {
    this.getService(data.serviceName);
  }

  sortServices() {
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

  handleSetServiceResources(data) {
    let service = this.getService(data.serviceName);
    service.instancesN = data.instancesN;
    service.memory = data.memory;
  }

  handleServiceRunning(data) {
    let service = this.getService(data.serviceName);
    service.isRunning = data.isRunning;
  }
};

module.exports = alt.createStore(ServiceStateStore, 'ServiceStateStore');
