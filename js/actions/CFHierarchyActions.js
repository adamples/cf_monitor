var alt = require('../alt');

var CFHierarchyActions = {

  addSpace: function (id, name) {
    return {
      id: id,
      name: name
    }
  },

  addApplication: function (spaceId, id, name) {
    return {
      spaceId: spaceId,
      id: id,
      name: name
    }
  }

}

module.exports = alt.createActions(CFHierarchyActions);
