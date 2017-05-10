const DOMNodeCollection = require('./dom_node_collection');

window.$l = function (arg){
  let queue = [];
  if (typeof arg === 'string'){
    let els = Array.from(document.querySelectorAll(arg));
    return new DOMNodeCollection(els);
  } else if (arg instanceof HTMLElement){
    return new DOMNodeCollection([arg]);
  } else if (typeof arg === "function" ) {
      queue.push(arg);
      document.addEventListener("DOMContentLoaded",() => {
        queue.forEach((el) => {
          el();
        });
      });
    }
  };


$l.extend = function(...args){
    return Object.assign({}, ...args);
};

$l.$ajax = function (options){
  let defaults = {
    method: 'GET',
    url: window.location.href,
    data: {},
    contentType: 'text/plain',
    success(data) {
      JSON.parse(data);
    },
    error() { }
  };
  let requestOptions = $l.extend(defaults, options);

  return new Promise(function (successCallback, failureCallback) {
    const xhr = new XMLHttpRequest();
    xhr.open(requestOptions['method'], requestOptions['url']);
    xhr.onload = function() {
      if (xhr.status >= 200 && xhr.status < 300) {
        successCallback(xhr.response);
      } else {
        failureCallback({ status: xhr.status, statusText: xhr.statusText });
      }
    };
    xhr.error = function() {
      failureCallback({ status: xhr.status, statusText: xhr.statusText });
    };
    xhr.send(requestOptions['data']);
  });
};
