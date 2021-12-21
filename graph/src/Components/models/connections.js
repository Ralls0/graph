/**
 * Object describing a ConnectionObj
 */
class ConnectionObj {
  constructor(id, points, from, to) {
    this.id = id;
    this.points = points;
    this.from = from;
    this.to = to;
  }

  /**
   * Creates a new Connection from plain (JSON) objects
   * @param {*} json a plain object (coming form JSON deserialization)
   * with the right properties
   * @return {ConnectionObj} the newly created object
   */
  static from(json) {
    const conn = new ConnectionObj();
    Object.assign(conn, json);
    return conn;
  }
}

export default ConnectionObj;
