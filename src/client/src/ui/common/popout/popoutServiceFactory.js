import BrowserPopoutService from './browserPopoutService';
import OpenfinPopoutService from './openfinPopoutService';


export default class PopoutServiceFactory {
  constructor(openfin) {
    this._openfin = openfin;
  }

  getService() {
    return window.fin ? new OpenfinPopoutService(this._openfin) : new BrowserPopoutService();
  }
}
