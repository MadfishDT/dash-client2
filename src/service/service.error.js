export class ServiceError {
    constructor() {
    }

    static get success() { return 'success'; }
    static get autherror() { return 'autherror'; }
    static get fail() { return'fail'; }
    static get unknown() { return'unknown'; }
    static get duplicate() { return'duplicate'; }
    static get notaccept() { return'notaccept'; }
    
}

export default ServiceError;