const alt = require('../alt');
const StateVariable = require('./StateVariable');
const CFHierarchyActions = require('../actions/CFHierarchyActions');
const Immutable = require('immutable');
const _ = require('underscore');

class CFHierarchyStore {

  constructor() {
    this.spaces = Immutable.Map();
    this.applications = Immutable.Map();
    this.hierarchy = Immutable.Map();

    this.bindListeners({
      handleAddSpace: CFHierarchyActions.ADD_SPACE,
      handleAddApplication: CFHierarchyActions.ADD_APPLICATION
    });
  }

  handleAddSpace(space) {
    var spaceDesc = new Immutable.Map({
      id: space.id,
      name: space.name
    });

    this.spaces = this.spaces.set(space.id, spaceDesc);

    if (!this.hierarchy.has(space.id)) {
      this.hierarchy = this.hierarchy.set(space.id, Immutable.Map());
    }
  }

  handleAddApplication(app) {
    var appDesc = new Immutable.Map({
      id: app.id,
      name: app.name
    });

    this.applications = this.applications.set(app.id, appDesc);

    if (!this.hierarchy.has(app.spaceId)) {
      this.hierarchy = this.hierarchy.set(app.spaceId, Immutable.Set());
    }

    if (!this.hierarchy.get(app.spaceId).has(app.id)) {
      this.hierarchy = this.hierarchy.update(app.spaceId, apps => apps.add(app.id));
    }
  }

  getSpaces() {
    return this.spaces.toList()
  }

  getAppIdsInSpace(spaceId) {
    return this.hierarchy.get(spaceId);
  }

  getAppsInSpace(spaceId) {
    return this.hierarchy.get(spaceId).map(appId => this.applications.get(appId));
  }

};

module.exports = alt.createStore(CFHierarchyStore, 'CFHierarchyStore');
