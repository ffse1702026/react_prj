#!/usr/bin/env node
const fs = require('fs')
// var mkdirs = require('mkdirs');
fs.copyFileSync("./build-extras.gradle", "./platforms/android/build-extras.gradle");
fs.copyFileSync("./gradle.properties", "./platforms/android/gradle.properties");
// fs.copyFileSync("./ExitApp.java", "./platforms/android/app/src/main/java/org/apache/cordova/exitapp/ExitApp.java");
fs.copyFileSync("./InAppBrowser.java", "./platforms/android/app/src/main/java/org/apache/cordova/inappbrowser/InAppBrowser.java");
dir = "./platforms/android/platform_www/plugins/com.msopentech.authdialog/www"
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}
fs.copyFileSync("./authDialog.js", `${dir}/authDialog.js`);
fs.copyFileSync("./cordova_plugins.js", `./platforms/android/platform_www/cordova_plugins.js`);
fs.copyFileSync("./authdialog-strings.xml", `./platforms/android/app/src/main/res/values/authdialog-strings.xml`);
fs.copyFileSync("./AuthRequestHandler.java", `./platforms/android/app/src/main/java/com/msopentech/authDialog/AuthRequestHandler.java`);