import { ConfigService } from './config.service';
import { Subject } from 'rxjs'
import { ServiceError } from './service.error';

export class LoginService {

    constructor(global) {
        this.gobal = global;
        this.requestService = global.$service.$requestservice;
        //this.RequestService = new RequestService();
        this.config = new ConfigService();
        this.user = null;
        this.userProfile = null;
        this._isAthenticateChecked = false;
        this._sessionAlive = false;
        this._authChange = new Subject();
        this._userSubject = new Subject();
        this._userProfileSubject = new Subject();
    }

    get authChangeSubject() {
        return this._authChange;
    }
    get userChangeSubject() {
        return this._userSubject;
    }

    get userProfileChangeSubject() {
        return this._userProfileSubject;
    }

    get isExistSession() {
        return this._sessionAlive;
    }

    get isAthenticateChecked() {
        return this._isAthenticateChecked;
    }

    getUser() {
        if (this.isAthenticateChecked && this.user) {
            return this.user;
        } 
        return null;
    }

    getImageUrl(path) {
        let url = `${this.config.host}/photo${path}`;
        return url;
    }

    setUser(info) {
        if (this.user && this.user.id !== info.id) {
            this.user = info;
            this.userChangeSubject.next(info);
        } else if (!this.user) {
            this.user = info;
            this.userChangeSubject.next(info);
        } else {
            return;
        }
    }

    setUserProfile(info) {
        if (this.userProfile && this.userProfile.id !== info.id) {
            this.userProfile = info;
            this.userProfileChangeSubject.next(info);
        } else if (!this.userProfile) {
            this.userProfile = info;
            this.userProfileChangeSubject.next(info);
        } else {
            return;
        }
    }
    async updataAgreement() {
        let url = `${this.config.host}/agree`;
        try {
            const resultData = await this.requestService.requestPost(url, {});
            if(resultData.code === 200) {
                return ServiceError.sucess;
            } else if(resultData.code === 401){
                return ServiceError.autherror;
            } else {
                return ServiceError.fail;
            }
        } catch {
            return ServiceError.unknown;
        }
    }
    async logout() {
        let url = `${this.config.host}/logout`;
        try {
            await this.requestService.requestPost(url, {});
            return true;
        } catch {
            return false;
        }
    }
    async adminLogin(email, password, code) {
        const body = JSON.stringify({ email: email, password: password, code: code });
        let url = `${this.config.host}/adminlogin`;
        this._isAthenticateChecked = true;
        try {
            let result = await this.requestService.
                requestPost(url, body, [{ kind: 'Content-Type', value: 'application/json' }, { kind: 'X-Auth-Types', value: 'admin' }]);

            if (result.result) {
                this.setUser(result.data);
                console.log(JSON.stringify(this.user));
                return true;
            } else {
                if (result.code === 401) {
                    console.log('fail');
                }
                return false;
            }
        } catch (e) {
            console.log(`fail login exceptional ${e}`);
            return false;
        }
    }
    async login(email, password) {
        const body = JSON.stringify({ email: email, password: password });
        let url = `${this.config.host}/login`;
        this._isAthenticateChecked = true;
        try {
            let result = await this.requestService.
                requestPost(url, body, [{ kind: 'Content-Type', value: 'application/json' }]);

            if (result.result) {
                this.setUser(result.data);
                console.log(JSON.stringify(this.user));
                return true;
            } else {
                if (result.code === 401) {
                    console.log('fail');
                }
                return false;
            }
        } catch (e) {
            console.log(`fail login exceptional ${e}`);
            return false;
        }
    }

    async getUserProfile() {
        let url = `${this.config.host}/profile`;
        try {
            let result = await this.requestService.
                requestGet(url);
            if (result) {
                this.setUserProfile(result.data);
                return result.data;
            } else {
                return null;
            }
        } catch (e) {
            return null;
        }
    }

    async getAuthenticated() {
        let url = `${this.config.host}/authrequired`;
        this._isAthenticateChecked = true;
        try {
            let result = await this.requestService.
                requestGet(url);
            if (result.result) {
                this.setUser(result.data);
                return result.data;
            } else {
                return null;
            }
        } catch (e) {
            return null;
        }
    }
}

export default LoginService;