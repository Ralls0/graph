/**
 * Object describing a ServiceObj
 */
class ServiceObj {
  constructor(id, x, y, serviceName, ip, eip) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.serviceName = serviceName;
    this.ip = ip;
    this.eip = eip;
  }

  /**
   * Creates a new Service from plain (JSON) objects
   * @param {*} json a plain object (coming form JSON deserialization)
   * with the right properties
   * @return {ServiceObj} the newly created object
   */
  static from(json) {
    const service = new ServiceObj();
    Object.assign(service, json);
    return service;
  }
}

export default ServiceObj;
