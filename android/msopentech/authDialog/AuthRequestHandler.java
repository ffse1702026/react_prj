package com.msopentech.authDialog;

import org.apache.cordova.*;
import org.apache.cordova.LOG;
import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PluginResult;
import org.json.JSONObject;
import org.json.JSONArray;
import org.json.JSONException;

import android.util.Log;

import java.net.HttpCookie;

import android.webkit.CookieManager;
import android.content.Intent;
import android.os.Bundle;

public class AuthRequestHandler extends CordovaPlugin {

    protected static final String LOG_TAG = "AuthRequestHandler";
    protected static final String SET_AUTHENICATION = "setAuthenication";
    protected static final String CLEAR_AUTHENICATION = "clearAuthenication";
    protected static final String USERNAME_AUTH = "usernameBasicAuth";
    protected static final String PASSWORD_AUTH = "passwordBasicAuth";
    protected static final String INVALID = "Invalid action";
    @Override
    public boolean execute(String action, JSONArray args, final CallbackContext callbackContext) throws JSONException {
        LOG.d(LOG_TAG, "action = " + action);
        if (action.equals(SET_AUTHENICATION)) {
            final String username = args.getString(0);
            final String password = args.getString(1);
            Bundle bundle = new Bundle();
            bundle.putString(USERNAME_AUTH, username);
            bundle.putString(PASSWORD_AUTH, password);
            Intent intent = this.cordova.getActivity().getIntent();
            intent.putExtras(bundle);
            // this.cordova.getActivity().setIntent(intent);
            callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.OK, 0));
            return true;

        } else if (action.equals(CLEAR_AUTHENICATION)) {
            Intent intent = this.cordova.getActivity().getIntent();
            intent.removeExtra(USERNAME_AUTH);
            callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.OK, 0));
            return true;
        }
        callbackContext.error(INVALID);
        return false;

    }
 
    public boolean onReceivedHttpAuthRequest(CordovaWebView view, final ICordovaHttpAuthHandler handler, String host, String realm) {
        LOG.d(LOG_TAG, "aconReceivedHttpAuthRequesttion = " + " -- username: " + username + " --- password: " + password);
        Intent intent = this.cordova.getActivity().getIntent();
        Bundle bundle = intent.getExtras();
        String username = bundle.getString(USERNAME_AUTH);
        String password = bundle.getString(PASSWORD_AUTH);
        if(username != null && password != null) {
            handler.proceed(username, password);
        } else {
            handler.cancel();
        }
        return true;
    }
}