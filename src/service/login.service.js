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

    get serviceError() {
        return ServiceError;
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
        this.user = info;
        if (this.user && this.user.id !== info.id) {
            this.userChangeSubject.next(info);
        }
    }
    makeErrorObject(errorStatus, data=null) {
        return {data: data, code: errorStatus};
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
                return this.makeErrorObject(ServiceError.success);
            } else if(resultData.code === 401){
                return this.makeErrorObject(ServiceError.autherror);
            } 
            return this.makeErrorObject(ServiceError.fail);
        } catch {
            return this.makeErrorObject(ServiceError.unknown);;
        }
    }

    async logout() {
        let url = `${this.config.host}/logout`;
        try {
            const result = await this.requestService.requestPost(url, {});
            return this.makeErrorObject(ServiceError.success);
        } catch {
            return this.makeErrorObject(ServiceError.fail);
        }
    }

    async adminLogin(email, password, code) {
        let url = `${this.config.host}/adminlogin`;
        this._isAthenticateChecked = true;
        try {
            const body = JSON.stringify({ email: email, password: password, code: code });
            let result = await this.requestService.
                requestPost(url, body, [{ kind: 'Content-Type', value: 'application/json' }, { kind: 'X-Auth-Types', value: 'admin' }]);

            if (result.result) {
                this.setUser(result.data);
                console.log(JSON.stringify(this.user));
                return this.makeErrorObject(ServiceError.success);
            } else {
                if (result.code === 401) {
                    return this.makeErrorObject(ServiceError.autherror);
                }
                return this.makeErrorObject(ServiceError.fail);
               
            }
        } catch (e) {
            console.log(`fail login exceptional ${e}`);
            return this.makeErrorObject(ServiceError.unknown);
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
                return this.makeErrorObject(ServiceError.success);
            } else {
                if (result.code === 401) {
                    return this.makeErrorObject(ServiceError.autherror);
                }
                return this.makeErrorObject(ServiceError.fail);
            }
        } catch (e) {
            console.log(`fail login exceptional ${e}`);
            return this.makeErrorObject(ServiceError.unknown);
        }
    }
    async getUserProfileById(id) {
        let url = `${this.config.host}/profilebyid?uid=${id}`;
        try {
            let result = await this.requestService.
                requestGet(url);
            if (result.result) {
                if(result.code == 200) {
                    this.setUserProfile(result.data);
                    return this.makeErrorObject(ServiceError.success, result.data);    
                } 
            } else {
                if(result.code == 401){
                    return this.makeErrorObject(ServiceError.autherror);
                } 
                return this.makeErrorObject(ServiceError.fail);
            }
        } catch (e) {
            return this.makeErrorObject(ServiceError.unknown);
        }
    }
    async getUserProfile() {
        let url = `${this.config.host}/profile`;
        try {
            let result = await this.requestService.
                requestGet(url);
            if (result.result) {
                if(result.code == 200) {
                    this.setUserProfile(result.data);
                    return this.makeErrorObject(ServiceError.success, result.data);    
                } 
            } else {
                if(result.code == 401){
                    return this.makeErrorObject(ServiceError.autherror);
                } 
                return this.makeErrorObject(ServiceError.fail);
            }
        } catch (e) {
            return this.makeErrorObject(ServiceError.unknown);
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
                return this.makeErrorObject(ServiceError.success, result.data);
            } else {
                if(result.code == 401) {
                    return this.makeErrorObject(ServiceError.autherror);
                } 
                return this.makeErrorObject(ServiceError.fail);
            }
        } catch (e) {
            return this.makeErrorObject(ServiceError.unknown);
        }
    }
}

export default LoginService;