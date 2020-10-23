import { Component, OnInit, NgZone, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { LOG_CLSF, SECTION, AREA_DATA, USER_INFO_KEY, USERID, PushInfo, TRANCODE, COMMON_APP_SERVICE_NAME, SYOKUINCODE_KEY, PASSWORD } from './common/constant';
import { AppComponentService } from './app.component.service';
import { NGXLogger } from 'ngx-logger';
import { LogMonitor } from './log-monitor';
import { SharedData } from './share/shared-data';
import { SERVER_URL } from './resource';
import { NavigateActionService } from './service/navigate-action/navigate-action.service';
import { LoadingService } from './screen/loading/loading.service';
import { WebCommunication } from './service/web-communication/web-communication';
import { SharedDataUtil } from './common/shareddata.util';
import { DialogComponent, DialogType } from './screen/dialog/dialog.component';
import { DIFFERENT_USERID } from './common/message';
import { MatDialog } from '@angular/material';

export let InjectorInstance: Injector;

declare global {
  interface Window {
    plugins: any;
  }
}
declare var window;
declare var navigator;
declare var cordova;
declare var authDialog;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  id = 0;
  constructor(
    private router: Router,
    private injector: Injector,
    private appComSer: AppComponentService,
    private logger: NGXLogger,
    private navigatorService: NavigateActionService,
    private ngZone: NgZone,
    private loading: LoadingService,
    private webComunication: WebCommunication,
    private dialog: MatDialog
  ) {
    InjectorInstance = this.injector;
    this.logger.registerMonitor(new LogMonitor());
    document.addEventListener('backbutton', (evt) => this.back());
    document.addEventListener('deviceready', () => this.onDeviceReady(), false);
    // register handleOpenURL function
    this.appComSer.registerHandleOpenURL();
    // check if app was opened by custom url scheme
    const lastUrl: string = (window as any).handleOpenURL_LastURL || '';
    if (lastUrl && lastUrl !== '') {
      delete (window as any).handleOpenURL_LastURL;
      this.appComSer.handleOpenUrl(lastUrl);
    }

    SharedData.getInstance().putCommonData('ServerInfo', 'serverName', SERVER_URL);
    SharedData.getInstance().putCommonData(SECTION.OneTimeInfo, 'OnePassword', '');
  }
  async ngOnInit() {
    authDialog.setDialog((success) => {
      console.log('SUCESSS');
      
    }, (error) => {
      console.log('SUCESSS');
    })
  }

  back() {
    this.logger.info(`Back button is pressed with current url = ${this.router.url}`,
      { class: 'AppComponent', method: 'back', classification: LOG_CLSF.METHOD_START });
    this.appComSer.registerBackHandel();
    this.logger.info(``, { class: 'AppComponent', method: 'back', classification: LOG_CLSF.METHOD_END });
  }

  /**
   * on Devide Ready
   */
  onDeviceReady() {
    // check permission
    this.appComSer.hasReadPermission();
    // when receive notification
    window.FirebasePlugin.onNotificationOpen((message) => {
      if (message.tap) {
        // when receive from background
        this.setDataCommon(message);
        this.handleNotification();
      } else {
        // when receive from foreground
        this.id = this.id + 1;
        cordova.plugins.notification.local.schedule({
          id: this.id,
          title: message.title,
          text: message.body,
          ...message,
          smallIcon: 'ic_notification'
        });
      }
    }, (error) => {
    });
    // click notification
    cordova.plugins.notification.local.on('click', (message) => {
      this.setDataCommon(message);
      this.handleNotification();
    }, cordova);
  }

  /**
   * @param  {} message
   */
  setDataCommon(message) {
    this.logger.info(`message=${JSON.stringify(message)}`,
      { class: 'AppComponent', method: 'setDataCommon', classification: LOG_CLSF.START });
    // set data common from message
    SharedData.getInstance().putCommonData(SECTION.PushInfo, PushInfo.APP_NAME, message.dapp_APPNAME);
    SharedData.getInstance().putCommonData(SECTION.PushInfo, PushInfo.LOGINUSER, message.dapp_LOGINUSER);
    SharedData.getInstance().putCommonData(SECTION.PushInfo, PushInfo.ACTION, message.dapp_ACTION);
    SharedData.getInstance().putCommonData(SECTION.PushInfo, PushInfo.UNIQUEKEY, message.dapp_UNIQUEKEY);
    SharedData.getInstance().putCommonData(SECTION.PushInfo, PushInfo.TSYOKUINCODE, message.dapp_TSYOKUINCODE);
    SharedData.getInstance().putCommonData(SECTION.PushInfo, PushInfo.MESSAGE_PARAM, message);
    this.logger.info(`message=${JSON.stringify(message)}`,
      { class: 'AppComponent', method: 'setDataCommon', classification: LOG_CLSF.END });
  }

  /**
   * handle notification
   */
  async handleNotification() {
    const login = SharedData.getInstance().getData(AREA_DATA.SECRET, USER_INFO_KEY, USERID);
    // check login
    if (login) {
      // if app is open call launchPushApp
      const userLoginId = SharedData.getInstance().getCommonData(SECTION.PushInfo, PushInfo.LOGINUSER);
      const syokuinCode = SharedData.getInstance().getCommonData(USER_INFO_KEY, SYOKUINCODE_KEY);
      const message = SharedData.getInstance().getCommonData(SECTION.PushInfo, PushInfo.MESSAGE_PARAM);
      // compare syokuinCode from login and push notification
      if ((message && userLoginId === undefined) || (userLoginId && syokuinCode !== userLoginId)) {
        // if syokuinCode not match
        this.ngZone.run(() => {
          const dialogVerUp = DialogComponent.openDialog(this.dialog, {
            type: DialogType.ERROR,
            messages: [DIFFERENT_USERID]
          });
          dialogVerUp.afterClosed().subscribe(() => {
            navigator.app.exitApp();
          });
        });
        return;
      }
      let loadSuccess = true;
      const uniqueKey = SharedData.getInstance().getCommonData(SECTION.PushInfo, PushInfo.UNIQUEKEY);
      SharedData.getInstance().putSendBody(SECTION.CommonApp, TRANCODE.J0XIDB01, {
        SQLFILE: 'XPSHTBLU01', SQLPARAM: [[uniqueKey]]
      });
      // send transaction J0XIDB01
      this.ngZone.run(() => this.loading.startLoading());
      await this.webComunication.sendRecv(SECTION.CommonApp, COMMON_APP_SERVICE_NAME, TRANCODE.J0XIDB01).toPromise().then(result => {
        SharedDataUtil.getBodyMessageOnlyTimeout(result, SECTION.CommonApp, TRANCODE.J0XIDB01, () => {
          const header = SharedData.getInstance().getRecvHeader(SECTION.CommonApp, TRANCODE.J0XIDB01);
          if (header.ConditionCode === '1020005') {
            loadSuccess = false;
          }
        });
      });
      this.ngZone.run(() => this.loading.stopLoading());
      if (!loadSuccess) {
        return;
      }
      this.navigatorService.LaunchPushApp();
    } else {
      // if not login redirect to login
      this.ngZone.run(() => this.router.navigate(['/spla']));
    }
  }

}
