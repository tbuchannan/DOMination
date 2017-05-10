/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

class DOMNodeCollection {
  constructor(els) {
    this.els = els;
    this.callbacks = {};
  }

  html(string) {
    if (typeof string === 'undefined' ) {
      return this.els[0].innerHTML;
    } else {
      this.els.forEach((el) => {
        el.innerHTML = string;
      });
    }
  }

  empty() {
    this.html('');
  }

  append(arg) {
    if (typeof arg ==='string'){
      this.els.forEach((el) => {
        el.innerHTML += arg;
      });
    } else {
      for(let i = 0; i < arg.els.length; i++) {
        this.els.forEach((el) => {
          el.innerHTML += arg.els[i].outerHTML;
        });
      }
    }
  }

  attr(attribute, value) {
    if (typeof value === 'undefined') {
      return this.els[0].getAttribute(attribute);
    } else {
      for (let i = 0; i < this.els.length; i++ ) {
        this.els[i].setAttribute(attribute, value);
      }
    }
  }

  addClass(...classNames){
    for (let i = 0; i < this.els.length; i++) {
      for (let j = 0; j < classNames.length; j++) {
        this.els[i].classList.add(classNames[j]);
      }
    }
  }

  removeClass(...classNames){
    for (let i = 0; i < this.els.length; i++) {
      for (let j = 0; j < classNames.length; j++) {
        this.els[i].classList.remove(classNames[j]);
      }
    }
  }

  children(){
    let childrenCollection = [];
    for(let i = 0; i < this.els.length; i++) {
      let kids = Array.from(this.els[i].children);
      childrenCollection = childrenCollection.concat(kids);
    }
    return new DOMNodeCollection(childrenCollection);
  }

  parent(){
    let parentCollection = [];
    for(let i = 0; i < this.els.length; i++) {
      let parent = this.els[i].parentElement;
      if (parentCollection.includes(parent)){
        continue;
      } else {
        parentCollection.push(this.els[i].parentElement);
      }
    }
    return new DOMNodeCollection(parentCollection);
  }

  find(selector) {
    let collection = [];
    this.els.forEach((el) => {
      collection = collection.concat(Array.from(el.querySelectorAll(selector)));
    });
    return collection;
  }

  remove(){
    this.empty();
    this.els = [];
  }

  on (type, eventCallback) {
    this.els.forEach((el)=> {
      el.addEventListener(type, eventCallback);
    });
    this.callbacks[type] = eventCallback;
  }

  off (type) {
    delete this.callbacks[type];
  }
}

module.exports = DOMNodeCollection;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__(0);

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


/***/ })
/******/ ]);