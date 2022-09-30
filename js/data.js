/* exported data */

var data = {
  view: 'search',
  products: [],
  wishlist: [],
  nextWishlistId: 1
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
