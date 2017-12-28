'use strict';

class BaseNode{
  constructor(nodeDetails){
    this.nodeDetails = nodeDetails;
  }

  setCallback(callback){

    if (typeof callback !== 'function')
      throw 'invalid callback';
    this.callback = callback;
  }

  doCallback(o)
  {
    if (typeof this.callback !== 'function')
      throw 'invalid callback';

      this.callback(
        this.createNodeDetails(o)
      );
  }

  getNodeDetails()
  {
    let o = {
        node: Object.assign({}, this.nodeDetails)
      };

    return o;
  }

  createNodeDetails(data)
  {
    let o = {
        node: Object.assign({}, this.nodeDetails)
      };

    return Object.assign(o, data);
  }

  enabled(enabled){
    if (enabled == this.dataEnabled)
      return;

    this.dataEnabled = enabled;

    if (enabled)
      this.readData();
  }
}

export default BaseNode