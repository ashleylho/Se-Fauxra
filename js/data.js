/* exported data */
var data = {
  entries: []
};

var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline');
xhr.responseType = 'json';
xhr.send();

window.addEventListener('beforeunload', beforeUnload);

function beforeUnload(event) {
  var xhrJSON = JSON.stringify(xhr.response);
  window.localStorage.setItem('API data', xhrJSON);
}

var previousDataJSON = localStorage.getItem('API data');
if (previousDataJSON !== null) {
  xhr.response = JSON.parse(previousDataJSON);
}
