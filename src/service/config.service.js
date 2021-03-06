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
            return `http://localhost:9090`;
        } else {
            return `http://qesg-dev.ddns.net:9090`;
        }
    }
    
}
export const envs = running_env;
