var $productList = document.querySelector('#product-list');
var $search = document.querySelector('.search');
var $form = document.querySelector('form');
// var $container = document.querySelector('.main-container');
var $productDetails = document.querySelector('#product-details-desktop');
// var $productDetailsMobile = document.querySelector('#product-details-mobile');

var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline');
xhr.responseType = 'json';
xhr.addEventListener('load', loadData);
xhr.send();

function loadData(event) {
  for (var i = 0; i < xhr.response.length; i++) {
    var $li = document.createElement('li');
    $li.className = 'column-third hidden single-product';
    $li.setAttribute('data-productId', i + 1);
    $li.setAttribute('data-productType', xhr.response[i].product_type);
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
    $p.className = 'p-search';
    $p.textContent = '$' + xhr.response[i].price;
    $div3.appendChild($p);
  }

  renderData();
}

$form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  var $product = document.querySelectorAll('li');
  var text = $search.value.toLowerCase();
  for (var i = 0; i < $product.length; i++) {
    if (text === $product[i].dataset.producttype) {
      $product[i].classList.remove('hidden');
    } else {
      $product[i].classList.add('hidden');
    }
  }
}

function renderData() {
  for (var i = 0; i < xhr.response.length; i++) {
    var stringName = xhr.response[i].name.slice(10);
    var indexOf = xhr.response[i].description.toLowerCase().indexOf('for best results');
    if (indexOf > 0) {
      var description = xhr.response[i].description.slice(0, indexOf);
    } else {
      description = xhr.response[i].description;
    }

    var colon = xhr.response[i].description.indexOf(':');
    if (colon > 0) {
      var bestResultsHeader = xhr.response[i].description.slice(indexOf, colon + 1);
    }
    var bestResultsDescription = xhr.response[i].description.slice(colon + 1);

    var $li = document.createElement('li');
    $li.setAttribute('data-productId', i + 1);
    $li.className = 'single-product-details hidden';
    $productDetails.appendChild($li);

    var $div1 = document.createElement('div');
    $div1.className = 'row img-product-info';
    $li.appendChild($div1);

    var $div2 = document.createElement('div');
    $div2.className = 'column-half';
    $div1.appendChild($div2);

    var $img = document.createElement('img');
    $img.setAttribute('src', xhr.response[i].api_featured_image);
    $img.className = 'desktop-img';
    $div2.appendChild($img);

    var $div3 = document.createElement('div');
    $div3.className = 'column-half product-basics';
    $div1.appendChild($div3);

    var $h2 = document.createElement('h2');
    $h2.textContent = 'Maybelline';
    $div3.appendChild($h2);

    var $h3 = document.createElement('h3');
    $h3.className = 'h3-product-basics';
    $h3.textContent = stringName;
    $div3.appendChild($h3);

    var $p = document.createElement('p');
    $p.className = 'price-desktop';
    $p.textContent = '$' + xhr.response[i].price;
    $div3.appendChild($p);

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

    var $div4 = document.createElement('div');
    $div4.className = 'row description';
    $li.appendChild($div4);

    var $div5 = document.createElement('div');
    $div5.className = 'column-full';
    $div4.appendChild($div5);

    var $2ndh3 = document.createElement('h3');
    $2ndh3.textContent = 'Description:';
    $div5.appendChild($2ndh3);

    var $2ndp = document.createElement('p');
    $2ndp.textContent = description;
    $2ndp.className = 'p-description';
    $div5.appendChild($2ndp);

    if (xhr.response[i].description.toLowerCase().includes('for best results')) {
      var $3rdh3 = document.createElement('h3');
      $3rdh3.textContent = bestResultsHeader;
      $div5.appendChild($3rdh3);

      var $3rdp = document.createElement('p');
      $3rdp.textContent = bestResultsDescription;
      $3rdp.className = 'p-description';
      $div5.appendChild($3rdp);
    }
  }
}

$productList.addEventListener('click', handleClick);

function handleClick(event) {
  var closestId = event.target.closest('li');
  var $li = document.querySelectorAll('.single-product');
  var $liDescription = document.querySelectorAll('.single-product-details');
  for (var i = 0; i < $li.length; i++) {
    if ($li[i] === closestId) {
      $li[i].classList.add('hidden');
      $liDescription[i].classList.remove('hidden');
    } else {
      $li[i].classList.add('hidden');
      $liDescription[i].classList.add('hidden');
    }
  }
}
