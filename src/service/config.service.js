const running_env = {
    dev : 0,
    stage : 1,
    prod : 2,
}

let instance;

export class ConfigService {

    constructor() {
        if (instance) return instance;
        this.environmnet = running_env.dev;
        instance = this;
    }

    get host() {    
        if(process.env.NODE_ENV === 'development') {
            return `${window.location.origin}`.replace(':8080','') + ':9090';
        } else {
            return `${window.location.origin}`.replace(':8080','') + ':9090';
        }
    }
    
}
export const envs = running_env;
