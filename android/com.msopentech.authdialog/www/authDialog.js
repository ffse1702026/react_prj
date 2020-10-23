cordova.define("com.msopentech.authdialog.authDialog", function(require, exports, module) {
var authDialog = {

    setDialog: function(successCallback, errorCallback) {
        cordova.exec(successCallback,
                    errorCallback,
                    'AuthRequestHandler', 'setDialog');
    },
    clearDialog: function (successCallback, errorCallback) {
        cordova.exec(successCallback,
                    errorCallback,
                    'AuthRequestHandler', 'clearDialog'
        );
    },

};
module.exports = authDialog;

});
