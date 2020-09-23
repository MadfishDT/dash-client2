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
        this._userAnswerSelectedSubject = new Subject();
    }
    get serviceError() {
        return ServiceError;
    }
    emitChangeCategory(category_id) {
        this._categoryChangeSubject.next(category_id);
    }
    get userAnswerSelectedSubject() {
        return this._userAnswerSelectedSubject
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
    async getPortfolios() {
        let url = `${this.config.host}/getport`;
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
     async getUserAnswers(cid) {
        let url = `${this.config.host}/uanswers?cid=${cid}`;
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
    
    async getUIDFromServer() {
        let url = `${this.config.host}/nguid`;
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
    async deleteCategory(code) {
        let url = `${this.config.host}/delccategory?code=${code}`;
        try {
            let result = await this.requestService.
                requestDelete(url);
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

    async deleteCampaign(uid) {
        let url = `${this.config.host}/delcp?uid=${uid}`;
        try {
            let result = await this.requestService.
                requestDelete(url);
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
    async getCCategoriesByUser() {
        let url = `${this.config.host}/ccategoriesuser`;
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
    async getCCategories() {
        let url = `${this.config.host}/ccategoriescode`;
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
    async getCCategoriesByCode(code) {
        let url = `${this.config.host}/ccatecode?code=${code}`;
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

    async getCQuestions(cid) {
        let url = `${this.config.host}/cquestions?id=${cid}`;
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
    async getCampaignMappings(uid) {
        let url = `${this.config.host}/getcm?uid=${uid}`;
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
    async addCampaignMappings(campaign, companies) {
        let url = `${this.config.host}/cmn`;
        try {
            let result = await this.requestService.requestPost(url, JSON.stringify({campaign: campaign, companies: companies}),
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
    async addCQuestions(categoriid, data) {
        let url = `${this.config.host}/wcqustions`;
        try {
            let result = await this.requestService.requestPost(url, JSON.stringify({cid: categoriid, data: data}),
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
    async getCampaignsbyCCode() {
        let url = `${this.config.host}/ccampaigns`;
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
    async getCampaigns() {
        let url = `${this.config.host}/getcauser`;
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
    /*async deleteCampaign(campaign) {
        let url = `${this.config.host}/pushcp`;
        try {
            let result = await this.requestService.requestPost(url, JSON.stringify(campaign),
            [{ kind: 'Content-Type', value: 'application/json' }]);
            if (result.result) {
                return this.makeErrorObject(ServiceError.success);
            } else {
                if(result.code === 401) {
                    return this.makeErrorObject(ServiceError.autherror);
                } else if(result.code === 409) {
                    return this.makeErrorObject(ServiceError.duplicate);
                } else if(result.code === 406) {
                    return this.makeErrorObject(ServiceError.notaccept);
                } else {
                    return this.makeErrorObject(ServerError.fail);
                }
                
            }
        } catch(e) {
            return this.makeErrorObject(ServiceError.unknown);
        }
    }*/
    async addNewCampaign(campaign) {
        let url = `${this.config.host}/pushcp`;
        try {
            let result = await this.requestService.requestPost(url, JSON.stringify(campaign),
            [{ kind: 'Content-Type', value: 'application/json' }]);
            if (result.result) {
                return this.makeErrorObject(ServiceError.success);
            } else {
                if(result.code === 401) {
                    return this.makeErrorObject(ServiceError.autherror);
                } else if(result.code === 409) {
                    return this.makeErrorObject(ServiceError.duplicate);
                } else if(result.code === 406) {
                    return this.makeErrorObject(ServiceError.notaccept);
                } else {
                    return this.makeErrorObject(ServerError.fail);
                }
                
            }
        } catch(e) {
            return this.makeErrorObject(ServiceError.unknown);
        }
    }
    async updateCampaignTemplate(campaign) {
        let url = `${this.config.host}/udatecpt`;
        try {
            console.log(JSON.stringify(campaign));
            let result = await this.requestService.requestPost(url, JSON.stringify(campaign),
            [{ kind: 'Content-Type', value: 'application/json' }]);
            if (result.result) {
                return this.makeErrorObject(ServiceError.success);
            } else {
                if(result.code === 401) {
                    return this.makeErrorObject(ServiceError.autherror);
                } else if(result.code === 409) {
                    return this.makeErrorObject(ServiceError.duplicate);
                } else if(result.code === 406){
                    return this.makeErrorObject(ServiceError.notaccept);
                } else {
                    return this.makeErrorObject(ServiceError.unknown);
                }
            }
        } catch(e) {
            return this.makeErrorObject(ServiceError.unknown);
        }
    }
    async updateCampaignStatus(campaign) {
        let url = `${this.config.host}/udatecps`;
        try {
            let result = await this.requestService.requestPost(url, JSON.stringify(campaign),
            [{ kind: 'Content-Type', value: 'application/json' }]);
            if (result.result) {
                return this.makeErrorObject(ServiceError.success);
            } else {
                if(result.code === 401) {
                    return this.makeErrorObject(ServiceError.autherror);
                } else if(result.code === 409) {
                    return this.makeErrorObject(ServiceError.duplicate);
                } else if(result.code === 406){
                    return this.makeErrorObject(ServiceError.notaccept);
                } else {
                    return this.makeErrorObject(ServiceError.unknown);
                }
            }
        } catch(e) {
            return this.makeErrorObject(ServiceError.unknown);
        }
    }
    async updateCampaignName(campaign) {
        let url = `${this.config.host}/udatecp`;
        try {
            let result = await this.requestService.requestPost(url, JSON.stringify(campaign),
            [{ kind: 'Content-Type', value: 'application/json' }]);
            if (result.result) {
                return this.makeErrorObject(ServiceError.success);
            } else {
                if(result.code === 401) {
                    return this.makeErrorObject(ServiceError.autherror);
                } else if(result.code === 409) {
                    return this.makeErrorObject(ServiceError.duplicate);
                } else if(result.code === 406){
                    return this.makeErrorObject(ServiceError.notaccept);
                } else {
                    return this.makeErrorObject(ServiceError.unknown);
                }
            }
        } catch(e) {
            return this.makeErrorObject(ServiceError.unknown);
        }
    }

    async addNewUser(userData) {
        let url = `${this.config.host}/nuser`;
        try {
            let result = await this.requestService.requestPost(url, JSON.stringify(userData),
            [{ kind: 'Content-Type', value: 'application/json' }]);
            if (result.result) {
                return this.makeErrorObject(ServiceError.success);
            } else {
                if(result.code === 401) {
                    return this.makeErrorObject(ServiceError.autherror);
                } else if(result.code === 409) {
                    return this.makeErrorObject(ServiceError.duplicate);
                } else if(result.code === 406)
                return this.makeErrorObject(ServiceError.notaccept);
            }
        } catch(e) {
            return this.makeErrorObject(ServiceError.unknown);
        }
    }

    async addAnswers(answers) {
        let url = `${this.config.host}/answers`;
        try {
            let result = await this.requestService.requestPost(url, JSON.stringify(answers),
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

    async addNewCCategories(code, name) {
        let url = `${this.config.host}/nccategories`;
        try {
            let result = await this.requestService.requestPost(url, JSON.stringify({code: code, name: name}),
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
    async updateCCategories(datas) {
        let url = `${this.config.host}/uccategories`;
        try {
            let result = await this.requestService.requestPost(url, JSON.stringify(datas),
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
    async addCCategories(datas) {
        let url = `${this.config.host}/wccategories`;
        try {
            let result = await this.requestService.requestPost(url, JSON.stringify(datas),
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

    async getAnswersById(aid) {
        let url = `${this.config.host}/ucanswers?aid=${aid}`;
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
    async getAnswers(cid) {
        let url = `${this.config.host}/answers?cid=${cid}`;
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

    currentMode() {
        
    }
}

export default ContentsService;