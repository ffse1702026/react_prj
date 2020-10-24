cordova.define("com.msopentech.authdialog.authDialog", function(require, exports, module) {
var authDialog = {

    setDialog: function(successCallback, errorCallback) {
        cordova.exec(successCallback,
                    errorCallback,
                    'AuthDialog', 'setDialog', []);
    },
    clearDialog: function (successCallback, errorCallback) {
        cordova.exec(successCallback,
                    errorCallback,
                    'AuthDialog', 'clearDialog', []
        );
    },

};
module.exports = authDialog;

});
