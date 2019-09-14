import LoginService from './login.service';
import RequestService from './request.service';
import ContentsService from './contents.service';
import ServiceError from './service.error';

export default {
  install(Vue) {
    Vue.prototype.$service = {};
    Vue.prototype.css = {root:''};
    Vue.prototype.$eservice = ServiceError;
    Vue.prototype.$service.$requestservice = new RequestService(Vue.prototype);
    Vue.prototype.$service.$loginservice = new LoginService(Vue.prototype);
    Vue.prototype.$service.$contentsservice = new ContentsService(Vue.prototype);
  }
};
