/* exported data */
// var xhr = new XMLHttpRequest();
// xhr.open('GET', 'https://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline');
// xhr.responseType = 'json';
// xhr.send();

var data = {
  view: 'search',
  products: [],
  wishlist: []
};

window.addEventListener('beforeunload', beforeUnload);

function beforeUnload(event) {
  var dataJSON = JSON.stringify(data);
  window.localStorage.setItem('data-model', dataJSON);
}

var previousDataJSON = localStorage.getItem('data-model');
if (previousDataJSON !== null) {
  data = JSON.parse(previousDataJSON);
}
