import { ConfigService } from './config.service';
import { Subject } from 'rxjs'
import { ServiceMode } from './service.mode';

export class StatusSerivce {

    constructor(global) {
        this._categoriesSubject = new Subject();
        this._categoryChangeSubject = new Subject();
        this._categorySelectedSubject = new Subject();
    }
    
    changeMode(serviceMode) {
        
    }
}

export default ContentsService;