var Utils = {

  generateRandomUUID: function () {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  },

  currentTimestamp() {
    return Math.round(new Date().getTime() / 1000);
  }

};

module.exports = Utils;
