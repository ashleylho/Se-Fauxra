var $productList = document.querySelector('#product-list');
var $search = document.querySelector('.search');
var $form = document.querySelector('form');

var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline');
xhr.responseType = 'json';
xhr.addEventListener('load', loadData);
xhr.send();

function loadData(event) {
  for (var i = 0; i < xhr.response.length; i++) {
    var $li = document.createElement('li');
    $li.className = 'column-third half';
    $productList.appendChild($li);

    var $div = document.createElement('div');
    $div.className = 'border-div';
    $li.appendChild($div);

    var $div1 = document.createElement('div');
    $div1.className = 'row product';
    $div.appendChild($div1);

    var $div2 = document.createElement('div');
    $div2.className = 'column-half';
    $div1.appendChild($div2);

    var $img = document.createElement('img');
    $img.setAttribute('src', xhr.response[i].api_featured_image);
    $div2.appendChild($img);

    var $div3 = document.createElement('div');
    $div3.className = 'column-half info';
    $div1.appendChild($div3);

    var $h4 = document.createElement('h4');
    $h4.textContent = xhr.response[i].name;
    $div3.appendChild($h4);

    var $span = document.createElement('span');
    $div3.appendChild($span);

    for (var j = 0; j < 5; j++) {
      if (j + 0.5 <= xhr.response[i].rating && xhr.response[i].rating < (j + 1)) {
        var $i = document.createElement('i');
        $i.className = 'fa-solid fa-star-half-stroke';
        $span.appendChild($i);
      } else if (j < xhr.response[i].rating && j + 0.5 < xhr.response[i].rating) {
        $i = document.createElement('i');
        $i.className = 'fa-solid fa-star';
        $span.appendChild($i);
      } else {
        $i = document.createElement('i');
        $i.className = 'fa-regular fa-star';
        $span.appendChild($i);
      }
    }

    var $p = document.createElement('p');
    $p.textContent = '$' + xhr.response[i].price;
    $div3.appendChild($p);
  }
}

$form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  var $product = document.querySelectorAll('li');
  var text = $search.value.toLowerCase();
  for (var i = 0; i < $product.length; i++) {
    if (text === xhr.response[i].product_type) {
      $product[i].classList.remove('hidden');
    } else {
      $product[i].classList.add('hidden');
    }
  }
}
