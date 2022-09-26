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

    var $div1 = document.createElement('div');
    $div1.className = 'row product';
    $li.appendChild($div1);

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

    var $i = document.createElement('i');
    if (xhr.response[i].rating >= 0.5 && xhr.response[i].rating < 1) {
      $i.className = 'fa-solid fa-star-half-stroke';
    } else if (xhr.response[i].rating >= 1) {
      $i.className = 'fa-solid fa-star';
    } else {
      $i.className = 'fa-regular fa-star';
    }
    $span.appendChild($i);

    $i = document.createElement('i');
    if (xhr.response[i].rating >= 1.5 && xhr.response[i].rating < 2) {
      $i.className = 'fa-solid fa-star-half-stroke';
    } else if (xhr.response[i].rating >= 2) {
      $i.className = 'fa-solid fa-star';
    } else {
      $i.className = 'fa-regular fa-star';
    }
    $span.appendChild($i);

    $i = document.createElement('i');
    if (xhr.response[i].rating >= 2.5 && xhr.response[i].rating < 3) {
      $i.className = 'fa-solid fa-star-half-stroke';
    } else if (xhr.response[i].rating >= 3) {
      $i.className = 'fa-solid fa-star';
    } else {
      $i.className = 'fa-regular fa-star';
    }
    $span.appendChild($i);

    $i = document.createElement('i');
    if (xhr.response[i].rating >= 3.5 && xhr.response[i].rating < 4) {
      $i.className = 'fa-solid fa-star-half-stroke';
    } else if (xhr.response[i].rating >= 4) {
      $i.className = 'fa-solid fa-star';
    } else {
      $i.className = 'fa-regular fa-star';
    }
    $span.appendChild($i);

    $i = document.createElement('i');
    if (xhr.response[i].rating >= 4.5 && xhr.response[i].rating < 5) {
      $i.className = 'fa-solid fa-star-half-stroke';
    } else if (xhr.response[i].rating === 5) {
      $i.className = 'fa-solid fa-star';
    } else {
      $i.className = 'fa-regular fa-star';
    }
    $span.appendChild($i);

    var $p = document.createElement('p');
    $p.textContent = '$' + xhr.response[i].price;
    $div3.appendChild($p);

  }
}
