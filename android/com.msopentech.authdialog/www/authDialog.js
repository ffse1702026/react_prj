cordova.define("com.msopentech.authdialog.authDialog", function(require, exports, module) {
var authDialog = {

    setAuthenication: function(username, password, successCallback, errorCallback) {
        cordova.exec(successCallback,
                    errorCallback,
                    'AuthDialog', 'setAuthenication', [username, password]);
    },
    clearAuthenication: function (successCallback, errorCallback) {
        cordova.exec(successCallback,
                    errorCallback,
                    'AuthDialog', 'clearAuthenication', []
        );
    },

};
module.exports = authDialog;

});
