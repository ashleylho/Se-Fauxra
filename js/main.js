var $productList = document.querySelector('#product-list');

var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline');
xhr.responseType = 'json';
xhr.addEventListener('load', loadData);
xhr.send();

function loadData(event) {
  for (var i = 0; i < xhr.response.length; i++) {
    var $li = document.createElement('li');
    $productList.appendChild($li);
  }
}
