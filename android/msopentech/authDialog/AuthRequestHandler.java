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
    public static boolean showDialog = false;

    @Override
    public boolean execute(String action, JSONArray args, final CallbackContext callbackContext) throws JSONException {
        LOG.d(LOG_TAG, "action = " + action);
        if (action.equals("setDialog")) {
            showDialog = true;
            Bundle bundle = new Bundle();
            bundle.putString("username", "sang");
            bundle.putString("password", "nguyen");
            Intent intent = this.cordova.getActivity().getIntent();
            intent.putExtras(bundle);
            // this.cordova.getActivity().setIntent(intent);
            callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.OK, 0));
            return true;

        } else if (action.equals("clearDialog")) {
            showDialog = false;
            Intent intent = this.cordova.getActivity().getIntent();
            Bundle bundle = intent.getExtras();
            intent.removeExtra("username");
            bundle.remove("username");
            callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.OK, 0));
            return true;
        }
        callbackContext.error("Invalid action");
        return false;

    }
 
    public boolean onReceivedHttpAuthRequest(CordovaWebView view, final ICordovaHttpAuthHandler handler, String host, String realm) {
        Intent intent = this.cordova.getActivity().getIntent();
        Bundle bundle = intent.getExtras();
        String username = bundle.getString("username");
        String password = bundle.getString("password");
        LOG.d(LOG_TAG, "aconReceivedHttpAuthRequesttion = " + showDialog + " -- username: " + username + " --- password: " + password);
        // AuthenticationDialog dialog = new AuthenticationDialog(cordova.getActivity(), host, realm);

        // dialog.setOkListener(new AuthenticationDialog.OkListener() {
        //     public void onOk(String host, String realm, String username, String password) {
        //         handler.proceed(username, password);
        //     }
        // });

        // dialog.setCancelListener(new AuthenticationDialog.CancelListener() {
        //     public void onCancel() {
        //         handler.cancel();
        //     }
        // });

        // dialog.show();
        
        handler.cancel();
        return true;
    }
}