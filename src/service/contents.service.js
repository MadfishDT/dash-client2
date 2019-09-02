import { ConfigService } from './config.service';
import { Subject } from 'rxjs'
import { ServiceError } from './service.error';

export class ContentsService {

    constructor(global) {
        this.requestService = global.$service.$requestservice;
        this.loginService = global.$service.$loginservice;
        this.config = new ConfigService();
        this._categoriesSubject = new Subject();
        this._categoryChangeSubject = new Subject();
        this._categorySelectedSubject = new Subject();

    }
    get serviceError() {
        return ServiceError;
    }
    emitChangeCategory(category_id) {
        this._categoryChangeSubject.next(category_id);
    }
    get categoryChangeSubject() {
        return this._categoryChangeSubject;
    }
    get categoriesSubject() {
        return this._categoriesSubject;
    }
    makeErrorObject(errorStatus, data=null) {
        return {data: data, code: errorStatus};
    }
    async getCompanys() {
        let url = `${this.config.host}/comp`;
        try {
            let result = await this.requestService.
                requestGet(url);
            if (result.result) {
                return this.makeErrorObject(ServiceError.success, result.data)
            } else {
                return this.makeErrorObject(ServiceError.fail);
            }
        } catch (e) {
            return this.makeErrorObject(ServiceError.unknown);
        }
    }
    async getCategories() {
        let url = `${this.config.host}/categories`;
        try {
            let result = await this.requestService.
                requestGet(url);
            if (result.result) {
                return this.makeErrorObject(ServiceError.success, result.data)
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
    async getQuestions(id) {
        let url = `${this.config.host}/questions?id=${id}`;
        try {
            let result = await this.requestService.
                requestGet(url);
            if (result.result) {
                return this.makeErrorObject(ServiceError.success,result.data);
            } else {
                if(result.code === 401) {
                    return this.makeErrorObject(ServiceError.autherror);
                }
                return this.makeErrorObject(ServiceError.fail);
            }
        } catch (e) {
            return this.makeErrorObject(ServiceError.unknown);
        }
    }
    async addAnswers(categoriid, data) {
        let url = `${this.config.host}/answers`;
        try {
            let result = await this.requestService.requestPost(url, JSON.stringify({cid: categoriid, answers: data}),
            [{ kind: 'Content-Type', value: 'application/json' }]);
            if (result.result) {
                return this.makeErrorObject(ServiceError.success);
            } else {
                if(result.code === 401) {
                    return this.makeErrorObject(ServiceError.autherror);
                }
                return this.makeErrorObject(ServiceError.fail);
            }
        } catch(e) {
            return this.makeErrorObject(ServiceError.unknown);
        }
    }
}

export default ContentsService;