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
      parent = this.els[i].parentElement;
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
