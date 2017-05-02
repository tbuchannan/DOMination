const DOMNodeCollection = require('./dom_node_collection');

window.$l = function (arg){

  if (typeof arg === 'string'){
    let els = Array.from(document.querySelectorAll(arg));
    return new DOMNodeCollection(els);
  } else if (arg instanceof HTMLElement){
    return new DOMNodeCollection([arg]);
  }

};
