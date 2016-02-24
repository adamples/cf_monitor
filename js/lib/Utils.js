var Utils = {

  extend: function (klass, mixin) {
    mixin.apply(klass);
  },

  generateRandomUUID: function () {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }

};

module.exports = Utils;
