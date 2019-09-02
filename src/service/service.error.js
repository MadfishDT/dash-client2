export class ServiceError {
    constructor() {
    }

    static get success() { return 'success'; }
    static get autherror() { return 'autherror'; }
    static get fail() { return'fail'; }
    static get unknown() { return'unknown'; }
}

export default ServiceError;