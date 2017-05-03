# DOMination

DOMination is a JavaScript DOM interaction library, inspired by jQuery.  Using DOMination, users can:
  * Select single or multiple DOM elements
  * Traverse and manipulate DOM elements
  * Build DOM elements
  * Create `DOMNodeCollection` objects from `HTMLElement`s
  * Queue functions until DOM is fully loaded
  * Simplify HTTP requests

## Getting Started

To get started with DOMination, download this library into your project and include the webpack output file `DOMination.js` in your source code.

```html
<head>
  <meta charset="utf-8">
  <link rel="stylesheet" href="./css/style.css">
  <link rel="stylesheet" href="./css/reset.css">
  <script src="./js/DOMination.js" type="text/javascript"></script>
  ...
</head>
```

## API

[DOM Traversal](#dom-traversal)  
  * [`each`](#each)  
  * [`children`](#children)  
  * [`parent`](#parent)  

[DOM Manipulation](#dom-manipulation)  
  * [`html`](#html)  
  * [`empty`](#empty)  
  * [`append`](#append)  
  * [`remove`](#remove)  
  * [`attr`](#attr)  
  * [`addClass`](#addclass)  
  * [`removeClass`](#removeclass)  
  * [`toggleClass`](#toggleclass)  

[Event Listeners](#event-listeners)  
  * [`on`](#on)  
  * [`off`](#off)  

[`AJAX`](#AJAX)  


### DOM Traversal

`DOMNodeCollection` methods to navigate DOM elements

#### `children`
Returns a `DOMNodeCollection` object containing all of the **direct** children elements of every `HTMLElement` in the original `DOMNodeCollection`.

#### `parent`
Returns a `DOMNodeCollection` object containing the **unique** parent elements of every `HTMLElement` in the original `DOMNodeCollection`.  

### DOM Manipulation
`DOMNodeCollection` methods to view and/or change DOM elements

#### `html`
Returns the `innerHTML` for the first element in the `DOMNodeCollection` if no argument is given.  If a string argument is given, it changes the `innerHTML` of each `DOMNodeCollection` element to the string argument originally passed in.

#### `empty`
Empties the innerHTML of each `DOMNodeCollection` element

#### `append`
Takes a single `HTMLElement`, `DOMNodeCollection`, or `string` argument and appends it to each `DOMNodeCollection` element.

#### `remove`
Remove each `DOMNodeCollection` element from the DOM.

#### `attr`
Takes either one (`attr(attribute)`) or two (`attr(attribute, value)`) arguments.  If given one argument, the method **gets** the value of the attribute given for the first element in the `DOMNodeCollection`.  If given two arguments the method **sets** the attribute given, to the value given, for each `DOMNodeCollection` element.

#### `addClass`
Adds a **unique** class, given as an argument, to each `DOMNodeCollection` element.

#### `removeClass`
Removes a class, given as an argument, from each `DOMNodeCollection` element.

#### `toggleClass`
Toggles a class, given as an argument, for each `DOMNodeCollection` element.

### Event Listeners

#### `on`
Adds event listener to each `DOMNodeCollection` element.


#### `off`
Removes event listener from each `DOMNodeCollection` element.

```javascript
function handler () {
  console.log("Someone clicked me! HALP!"
}

$l('.addItemButton').on('click', handler);
$l('.addItemButton').off("click");
```

## `AJAX`

Sends HTTP Request and returns a `Promise` object.  Accepts a `Hash` object as an argument with any of the following attributes:
  * method (default: "GET"): HTTP Request method or type
  * url (default: window.location.href): URL for HTTP Request
  * success: success callback
  * error: error callback
  * contentType (default: 'text/plain'): content type of HTTP Request

```javascript
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
      if (xhr.status >= 200 && xhr.state < 300) {
        successCallback(xhr.response);
      } else {
        failureCallback({
          status: xhr.status,
          statusText: xhr.statusText
        });
      }
    };
    xhr.error = function() {
      failureCallback({
        status: xhr.status,
        statusText: xhr.statusText
      });
    };
    xhr.send(requestOptions['data']);
  });
};
```

## Example

For an example of a project using the DOMination library, view the ToDo List Demo.  To run the demo, clone the DOMination library and view the html file locally.
