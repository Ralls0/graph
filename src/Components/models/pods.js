/**
 * Object describing PodObj
 */
class PodObj {
  constructor(id, x, y, podName, ip, parentServiceId) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.podName = podName;
    this.ip = ip;
    this.parentServiceId = parentServiceId;
  }

  /**
   * Creates a new Pod from plain (JSON) objects
   * @param {*} json a plain object (coming form JSON deserialization)
   * with the right properties
   * @return {PodObj} the newly created object
   */
  static from(json) {
    const pod = new PodObj();
    Object.assign(pod, json);
    return pod;
  }
}

export default PodObj;
