import { Injectable, NgZone } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import {
  LOG_CLSF, ReturnInfo, GLOBAL_KEY, COMMON, USER_INFO_KEY, PASSWORD, USERID, AREA_DATA,
  SECTION, TRANCODE, DEVICE_ENUM, COMMON_APP_SERVICE_NAME, SYOKUINCODE_KEY, PushInfo
} from 'src/app/common/constant';
import { LoadingService } from '../loading/loading.service';
import { WebCommunication } from '../../service/web-communication/web-communication';
import { FingerprintAuthService } from 'src/app/service/finger-auth/fingerprint.authentication.service';
import { Router } from '@angular/router';
import { DialogComponent, DialogType } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material';
import {
  SERVER_REQUIRES_USERNAME_PASSWORD,
  FORCE_TO_UPDATE_TO_LATEST_VERSION, FAILED_TO_COMMUNICATE_WITH_SERVER, FORGOT_PASSWORD, DIFFERENT_USERID, SESSION_EXPIRED
} from 'src/app/common/message';
import { SharedData } from 'src/app/share/shared-data';
import { BuisinessUtility } from 'src/app/common/buisiness-utility';
import { NavigateActionService } from 'src/app/service/navigate-action/navigate-action.service';
import { HandleUrlService } from 'src/app/service/handle-url/handle-url.service';
import { SharedDataUtil } from 'src/app/common/shareddata.util';
import { Subject, Observable, from } from 'rxjs';
import { SERVER_URL } from 'src/app/resource';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
declare var window;
declare var navigator;
declare var authDialog;
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  submitSubject = new Subject<boolean>();
  messageError = "";
  script = "";

  constructor(
    private logger: NGXLogger,
    private loading: LoadingService,
    private webComunication: WebCommunication,
    private fingerPrintAuthService: FingerprintAuthService,
    private router: Router,
    private dialog: MatDialog,
    private navigateActionService: NavigateActionService,
    private buisinessUtility: BuisinessUtility,
    private ngZone: NgZone,
    private http: HttpClient
  ) { }
  async login(form, model) {
    this.logger.info('', { class: 'LoginComponent', method: 'login', classification: LOG_CLSF.METHOD_START });
    if (form.invalid) {
      form.markAsSubmitted();
      return;
    }
    // Add loading
    this.loading.startLoading();
    // Set authentication information
    SharedData.getInstance().putData(AREA_DATA.SECRET, USER_INFO_KEY, USERID, model.username);
    SharedData.getInstance().putData(AREA_DATA.SECRET, USER_INFO_KEY, PASSWORD, model.password);

    this.script = "";
    // get Script
    await this.getScript().toPromise().then(async result => {
      if(result === ReturnInfo.SUCESS) {
        await this.setBasicAuthenication();
        // Open InAppbrowser and set option
        const windowOpen = window.open(`${SERVER_URL}/api/login`, '_blank', 'hidden=no,clearcache=yes,clearsessioncache=yes');
        // Add event loadstop
        this.handleEventLoadStop(windowOpen, model);
        // Add event message
        this.handleEventMessage(windowOpen, model, form);
        windowOpen.addEventListener('loaderror', () => {
              const dialogVerUp = DialogComponent.openDialog(this.dialog, {
                type: DialogType.ERROR,
                messages: [FAILED_TO_COMMUNICATE_WITH_SERVER]
              });
          this.logger.info(`could not connect to ${SERVER_URL}/api/login
          )`, { class: 'LoginComponent', method: 'login', classification: LOG_CLSF.METHOD_END });
          // add stop loading if load error
          this.loading.stopLoading();
        });
      }
    });
    
    this.logger.info(`Login with username=${model.username}`,
      { class: 'LoginComponent', method: 'login', classification: LOG_CLSF.END });
    this.logger.info('', { class: 'LoginComponent', method: 'login', classification: LOG_CLSF.METHOD_END });
  }

  forgotPassword() {
    const dialog = DialogComponent.openDialog(this.dialog, {
      type: DialogType.INFO,
      messages: [FORGOT_PASSWORD]
    });
    return false;
  }
  /**
   * get token firebase
   */
  private initFirebaseRegist() {
    return new Promise((reslove, reject) => {
      // get token
      window.FirebasePlugin.getToken((fcmToken) => {
        // set token to local
        this.setFCMToken(fcmToken);
        reslove(fcmToken);
      }, (error) => {
        reject(error);
      });
    });
  }

  private async setFCMToken(fcmToken) {
    // get token previous and last user login
    const token = localStorage.getItem(PushInfo.FCM_TOKEN);
    const lastUserID = localStorage.getItem(PushInfo.USERID);
    const lastPassword = localStorage.getItem(PushInfo.PASSWORD);

    // get information of user login
    const userID = SharedData.getInstance().getData(AREA_DATA.SECRET, USER_INFO_KEY, USERID);
    const password = SharedData.getInstance().getData(AREA_DATA.SECRET, USER_INFO_KEY, PASSWORD);
    const compareLastUser = userID !== lastUserID || lastPassword !== password;
    // set user and password to localstorage
    localStorage.setItem(PushInfo.USERID, SharedData.getInstance().getData(AREA_DATA.SECRET, USER_INFO_KEY, USERID));
    localStorage.setItem(PushInfo.PASSWORD, SharedData.getInstance().getData(AREA_DATA.SECRET, USER_INFO_KEY, PASSWORD));

    // if token not set or token is update or user different last user login
    if (token === null || (token && token !== fcmToken) || compareLastUser) {
      // set FCM token to local storage
      localStorage.setItem(PushInfo.FCM_TOKEN, fcmToken);
      // set param of transaction J0XPSH01
      SharedData.getInstance().putSendBody(SECTION.CommonApp, TRANCODE.J0XPSH01, {
        PLATFORM: PushInfo.FCM,
        PNSTOKEN: fcmToken,
        CATEGORY: SharedData.getInstance().getCommonData(USER_INFO_KEY, SYOKUINCODE_KEY),
        DEVICEID: SharedData.getInstance().getData(DEVICE_ENUM.AREA, DEVICE_ENUM.INFOR, DEVICE_ENUM.IMEI)
      });
      // call transaction
      this.loading.startLoading();
      this.logger.info(`SECTION=${COMMON_APP_SERVICE_NAME}, TRANCODE=${TRANCODE.J0XPSH01}`,
        { class: 'LoginService', method: 'login', classification: LOG_CLSF.START });
        await this.webComunication.sendRecv(SECTION.CommonApp, COMMON_APP_SERVICE_NAME, TRANCODE.J0XPSH01).toPromise().then(result => {

          // Check if respone of J0XPSH01 is 302
          if (result === ReturnInfo.REDIRECT) {
            this.ngZone.run(() => {
              const dialogVerUp = DialogComponent.openDialog(this.dialog, {
                type: DialogType.ERROR,
                messages: [SESSION_EXPIRED]
              });
              dialogVerUp.afterClosed().subscribe(() => {
                navigator.app.exitApp();
              })
            });
          } else {
            SharedDataUtil.getBodyMessageOnlyTimeout(result, SECTION.CommonApp, TRANCODE.J0XPSH01, () => {
              const header = SharedData.getInstance().getRecvHeader(SECTION.CommonApp, TRANCODE.J0XPSH01);
              if (header.ConditionCode === '0') {
                this.loginSuccess();
              } else {
                localStorage.setItem(PushInfo.FCM_TOKEN, null);
              }
            }, () => {
              localStorage.setItem(PushInfo.FCM_TOKEN, null);
              this.loginSuccess();
            });
          }
        });
      this.logger.info(`SECTION=${COMMON_APP_SERVICE_NAME}, TRANCODE=${TRANCODE.J0XPSH01}`,
        { class: 'LoginService', method: 'login', classification: LOG_CLSF.END });
      this.loading.stopLoading();
    } else {
      this.loginSuccess();
    }
  }

  /**
   * login successfully
   */
  private async loginSuccess() {
    if (SharedData.getInstance().getCommonData(SECTION.PushInfo, PushInfo.MESSAGE_PARAM)) {
      this.navigateActionService.LaunchPushApp();
    }
    // check SYOKUINCODE from pushinfo
    this.ngZone.run(() => this.router.navigate(['/menu']));
  }

  /**
   * clear notification data
   */
  clearDataNotification() {
    SharedData.getInstance().putCommonData(SECTION.PushInfo, PushInfo.APP_NAME, null);
    SharedData.getInstance().putCommonData(SECTION.PushInfo, PushInfo.ACTION, null);
    SharedData.getInstance().putCommonData(SECTION.PushInfo, PushInfo.UNIQUEKEY, null);
    SharedData.getInstance().putCommonData(SECTION.PushInfo, PushInfo.TSYOKUINCODE, null);
    SharedData.getInstance().putCommonData(SECTION.PushInfo, PushInfo.MESSAGE_PARAM, null);
    SharedData.getInstance().putCommonData(SECTION.PushInfo, PushInfo.LOGINUSER, null);
  }

  getChangeEvent() {
    return this.submitSubject;
  }

  /**
   * Handle Loadstop event InAppBrowser
   */
  private handleEventLoadStop(windowOpen, model) {
    // Add event load stop
    windowOpen.addEventListener("loadstop", () => {

      windowOpen.executeScript({
        code: this.script
      });

    })
  }

  /**
  * Handle message event InAppBrowser
  */
 private handleEventMessage(windowOpen, model, form) {

  // Add event listener message
  windowOpen.addEventListener('message', (message) => {
      const data = message.data;
      windowOpen.close();
      // windowOpen.close();
      // Check message code
      if (data.code != 0) {
        this.ngZone.run(() => {
          // show message error if authenication fail
          const dialogVerUp = DialogComponent.openDialog(this.dialog, {
            type: DialogType.ERROR,
            messages: [data.message]
          });
        });
      } else {
        
        // get user information if authenication success
        this.ngZone.run(() => {
          this.getUserInfor(model, form);
        });
      } 
  });
}

  /**
  * get User Information
  * @model
  * @form
  */
 private async getUserInfor(model, form) {
   await this.clearBasicAuthenication();
   // get user infor
   this.getUserInforAPI().toPromise().then(async result => {
     // get result after call api
     this.loading.stopLoading();
     if (result === ReturnInfo.REDIRECT) {
       // check if response server is 302
       this.ngZone.run(() => {
         // displaymessage and end app
         const dialogVerUp = DialogComponent.openDialog(this.dialog, {
           type: DialogType.ERROR,
           messages: [SESSION_EXPIRED]
         });
         dialogVerUp.afterClosed().subscribe(() => {
           navigator.app.exitApp();
         })
       });
     } else if (result === ReturnInfo.FAILED_TO_COMMUNICATION_SERVER) {
       // check if response server is different 200
       this.ngZone.run(() => {
         const dialogVerUp = DialogComponent.openDialog(this.dialog, {
           type: DialogType.ERROR,
           messages: [FAILED_TO_COMMUNICATE_WITH_SERVER]
         });
       });

     } else if (result === ReturnInfo.LOGIN_FAILED) {
       // check if Status different 0
       this.ngZone.run(() => {
         const dialogVerUp = DialogComponent.openDialog(this.dialog, {
           type: DialogType.ERROR,
           messages: [this.messageError]
         });
       });
     } else {
       // HttpStatus is 200 and Status is 0 => Set cookie
       await this.navigateActionService.setCookie();
       const userLoginId = SharedData.getInstance().getCommonData(SECTION.PushInfo, PushInfo.LOGINUSER);
        const syokuinCode = SharedData.getInstance().getCommonData(USER_INFO_KEY, SYOKUINCODE_KEY);
        const message = SharedData.getInstance().getCommonData(SECTION.PushInfo, PushInfo.MESSAGE_PARAM);
        let loadSuccess = true;
        // compare syokuinCode from login and push notification
        if ((message && userLoginId === undefined) || (userLoginId && syokuinCode !== userLoginId)) {
          // if syokuinCode not match
          const dialogVerUp = DialogComponent.openDialog(this.dialog, {
            type: DialogType.ERROR,
            messages: [DIFFERENT_USERID]
          });
          this.submitSubject.next(false);
          form.reset();
          dialogVerUp.afterClosed().subscribe(() => {
            SharedData.getInstance().putData(AREA_DATA.SECRET, USER_INFO_KEY, USERID, null);
            SharedData.getInstance().putData(AREA_DATA.SECRET, USER_INFO_KEY, PASSWORD, null);
          });
          // clear data notification
          this.clearDataNotification();
        } else {
          // check SYOKUINCODE from pushinfo
          if (message) {
            const uniqueKey = SharedData.getInstance().getCommonData(SECTION.PushInfo, PushInfo.UNIQUEKEY);
            SharedData.getInstance().putSendBody(SECTION.CommonApp, TRANCODE.J0XIDB01, {
              SQLFILE: 'XPSHTBLU01', SQLPARAM: [[uniqueKey]]
            });
            // send transaction J0XIDB01
            this.ngZone.run(() => this.loading.startLoading());
            this.logger.info(`SECTION=${COMMON_APP_SERVICE_NAME}, TRANCODE=${TRANCODE.J0XIDB01}`,
              { class: 'LoginService', method: 'login', classification: LOG_CLSF.START });
            await this.webComunication.sendRecv(SECTION.CommonApp, COMMON_APP_SERVICE_NAME,
              TRANCODE.J0XIDB01).toPromise().then(result => {
                // Check if respone of J0XIDB01 is 302
                if (result === ReturnInfo.REDIRECT) {
                  loadSuccess = false;
                  this.ngZone.run(() => {
                    const dialogVerUp = DialogComponent.openDialog(this.dialog, {
                      type: DialogType.ERROR,
                      messages: [SESSION_EXPIRED]
                    });
                    dialogVerUp.afterClosed().subscribe(() => {
                      navigator.app.exitApp();
                    })
                  });
                } else {
                  SharedDataUtil.getBodyMessageOnlyTimeout(result, SECTION.CommonApp, TRANCODE.J0XIDB01, () => {
                    const header = SharedData.getInstance().getRecvHeader(SECTION.CommonApp, TRANCODE.J0XIDB01);
                    if (header.ConditionCode === '1020005') {
                      loadSuccess = false;
                    }
                  });
                }
              });
            this.logger.info(`SECTION=${COMMON_APP_SERVICE_NAME}, TRANCODE=${TRANCODE.J0XIDB01}`,
              { class: 'LoginService', method: 'login', classification: LOG_CLSF.END });
            this.ngZone.run(() => this.loading.stopLoading());
          }
          if (!loadSuccess) {
            return;
          }
          // if syokuinCode match
          this.logger.trace(`Login sucessfully`, { class: 'LoginComponent', method: 'login' });
          this.fingerPrintAuthService.fingerPrintEncrypt(model.username, model.password);
          const receiveNotify = localStorage.getItem(PushInfo.PUSH_NOTIFICATION);
          // check notifiPush status
          if (receiveNotify && receiveNotify === 'ON') {
            // if notifiPush is ON
            await this.initFirebaseRegist();
          } else {
            // if notifiPush is OFF redirect to menu
            this.loginSuccess();
          }
        }

     }
   });
 }

 /**
  * get User info
  */
 getUserInforAPI(): Observable<number> {
  // get data from user info
  return this.http.get<any>(`${SERVER_URL}/api/userinfo`).pipe(
    map(res => {
      // check response
      if (res == null || res.Status == null || res.Status !== '0') {
        // check if Status != 0
        this.messageError = res.Message;
        return ReturnInfo.LOGIN_FAILED;
      } else {
        // set UserInformation to SharedData
        Object.keys(res.UserInfo).map(key => {
          SharedData.getInstance().putCommonData(USER_INFO_KEY, key, res.UserInfo[key]);
        });
        return ReturnInfo.SUCESS;
      }
    }),
    catchError(error => {
      if (error.status === 302) {
        // check if HttpStatus is 302
        const redirectURL = error.headers.get('DAPP_Location');
        SharedData.getInstance().putCommonData(GLOBAL_KEY, COMMON.RedirectURL, redirectURL);
        return from([ReturnInfo.REDIRECT]);
      } else {
        // check other HttpStatus
        return from([ReturnInfo.FAILED_TO_COMMUNICATION_SERVER]);
      }
    })
  );
}

/**
  * get User info
  */
 getScript(): Observable<number> {
  // get data from user info
  return this.http.get(`${SERVER_URL}/api/script`, {responseType: 'text'}).pipe(
    map(res => {
      // check response
      this.script = SharedData.getInstance().getDataByExpression(res);     
      return ReturnInfo.SUCESS;
    }),
    catchError(error => {
      this.ngZone.run(() => {
        const dialogVerUp = DialogComponent.openDialog(this.dialog, {
          type: DialogType.ERROR,
          messages: [FAILED_TO_COMMUNICATE_WITH_SERVER]
        });
        dialogVerUp.afterClosed().subscribe(() => {
          navigator.app.exitApp();
        });
      });
      // check other HttpStatus
      return from([ReturnInfo.FAILED_TO_COMMUNICATION_SERVER]);
    })
  );
  
}
  /**
  * Handle set Authenication for inappbrowser
  */
  setBasicAuthenication() {
    const tokenBase64 = this.webComunication.basicToken;
    if(tokenBase64 && tokenBase64 != "") {
      const token = atob(tokenBase64);
      const username = token.split(":")[0];
      const password = token.split(":")[1];
      return new Promise((resolve, reject) => {
        authDialog.setAuthenication(username, password,(success) => {
          this.logger.info(`set Authenication sucess`,
              { class: 'LoginService', method: 'setBasicAuthenication', classification: LOG_CLSF.DATA });
          resolve();
        }, (error) => {
          this.logger.info(`set Authenication error`,
              { class: 'LoginService', method: 'setBasicAuthenication', classification: LOG_CLSF.DATA });
          resolve();
        })
      });
    }
    
  }

  clearBasicAuthenication() {
    const tokenBase64 = this.webComunication.basicToken;
    if(tokenBase64 && tokenBase64 != "") {

      return new Promise((resolve, reject) => {
        authDialog.clearAuthenication((success) => {
          this.logger.info(`clear Authenication sucess`,
              { class: 'LoginService', method: 'clearBasicAuthenication', classification: LOG_CLSF.DATA });
          resolve();
        }, (error) => {
          this.logger.info(`clear Authenication error`,
              { class: 'LoginService', method: 'clearBasicAuthenication', classification: LOG_CLSF.DATA });
          resolve();
        })
      });
    }
  }

}
