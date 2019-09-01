export class ServiceError {
    constructor() {
    }

    static get sucess() { return 'sucess'; }
    static get autherror() { return 'autherror'; }
    static get fail() { return'fail'; }
    static get unknown() { return'unknown'; }
}

export default ServiceError;