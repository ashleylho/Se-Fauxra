var $productList = document.querySelector('#product-list');
var $search = document.querySelector('.search');
var $form = document.querySelector('form');
var $productDetails = document.querySelector('#product-details-desktop');
var $productDetailsMobile = document.querySelector('#product-details-mobile');
var $list = document.querySelector('.list');
var $desktop = document.querySelector('.desktop');
var $mobile = document.querySelector('.mobile');
var $searchLink = document.querySelector('.search-link');
var $wishlistLink = document.querySelector('.wishlist-link');
var $wishlist = document.querySelector('.wishlist');
var $searchDiv = document.querySelector('.search-div');
var $wishlistUl = document.querySelector('.wishlist-ul');

var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline');
xhr.responseType = 'json';
xhr.addEventListener('load', loadData);
xhr.send();

function loadData(event) {
  data.products = xhr.response;
  // renderData();
}

$form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  var $productDetailsLi = document.querySelectorAll('.single-product-details-desktop');
  var $productDetailsLiM = document.querySelectorAll('.single-product-details-mobile');
  event.preventDefault();
  var $product = document.querySelectorAll('.single-product');
  var text = $search.value.toLowerCase();
  for (var i = 0; i < $product.length; i++) {
    if (text === $product[i].dataset.productType) {
      $list.classList.remove('hidden');
      $product[i].classList.remove('hidden');
    } else {
      $product[i].classList.add('hidden');
    }
    $productDetailsLi[i].classList.add('hidden');
    $productDetailsLiM[i].classList.add('hidden');
  }
  data.view = 'search';
}

function renderData() {
  for (var i = 0; i < data.products.length; i++) {
    // product list
    var $li = document.createElement('li');
    $li.className = 'column-third hidden single-product';
    $li.setAttribute('data-product-id', i + 1);
    $li.setAttribute('data-product-type', data.products[i].product_type);
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
    $img.setAttribute('src', data.products[i].api_featured_image);
    $div2.appendChild($img);

    var $div3 = document.createElement('div');
    $div3.className = 'column-half info';
    $div1.appendChild($div3);

    var $h4 = document.createElement('h4');
    $h4.textContent = data.products[i].name;
    $div3.appendChild($h4);

    var $span = document.createElement('span');
    $div3.appendChild($span);

    for (var j = 0; j < 5; j++) {
      if (j + 0.5 <= data.products[i].rating && data.products[i].rating < (j + 1)) {
        var $i = document.createElement('i');
        $i.className = 'fa-solid fa-star-half-stroke';
        $span.appendChild($i);
      } else if (j < data.products[i].rating && j + 0.5 < data.products[i].rating) {
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
    $p.textContent = '$' + data.products[i].price;
    $div3.appendChild($p);

    var $div6 = document.createElement('div');
    $div6.className = 'column-full heart-div';
    $div1.appendChild($div6);

    var $button = document.createElement('button');
    $button.className = 'heart-list';
    $div6.appendChild($button);

    $i = document.createElement('i');
    $i.className = 'fa-regular fa-heart';
    $i.setAttribute('data-heart-id', i + 1);
    $button.appendChild($i);

    // manipulating name and description data
    var stringName = data.products[i].name.slice(10);
    var indexOf = data.products[i].description.toLowerCase().indexOf('for best results');
    if (indexOf > 0) {
      var description = data.products[i].description.slice(0, indexOf);
    } else {
      description = data.products[i].description;
    }

    var colon = data.products[i].description.indexOf(':');
    if (colon > 0) {
      var bestResultsHeader = data.products[i].description.slice(indexOf, colon + 1);
    }
    var bestResultsDescription = data.products[i].description.slice(colon + 1);

    // desktop dom
    $li = document.createElement('li');
    $li.setAttribute('data-product-id', i + 1);
    $li.className = 'single-product-details-desktop hidden';
    $productDetails.appendChild($li);

    $div1 = document.createElement('div');
    $div1.className = 'row img-product-info';
    $li.appendChild($div1);

    $div2 = document.createElement('div');
    $div2.className = 'column-half';
    $div1.appendChild($div2);

    $img = document.createElement('img');
    $img.setAttribute('src', data.products[i].api_featured_image);
    $img.className = 'desktop-img';
    $div2.appendChild($img);

    $div3 = document.createElement('div');
    $div3.className = 'column-half product-basics';
    $div1.appendChild($div3);

    var $h2 = document.createElement('h2');
    $h2.textContent = 'Maybelline';
    $div3.appendChild($h2);

    var $h3 = document.createElement('h3');
    $h3.className = 'h3-product-basics';
    $h3.textContent = stringName;
    $div3.appendChild($h3);

    $p = document.createElement('p');
    $p.className = 'price-desktop';
    $p.textContent = '$' + data.products[i].price;
    $div3.appendChild($p);

    $span = document.createElement('span');
    $div3.appendChild($span);

    for (j = 0; j < 5; j++) {
      if (j + 0.5 <= data.products[i].rating && data.products[i].rating < (j + 1)) {
        $i = document.createElement('i');
        $i.className = 'fa-solid fa-star-half-stroke';
        $span.appendChild($i);
      } else if (j < data.products[i].rating && j + 0.5 < data.products[i].rating) {
        $i = document.createElement('i');
        $i.className = 'fa-solid fa-star';
        $span.appendChild($i);
      } else {
        $i = document.createElement('i');
        $i.className = 'fa-regular fa-star';
        $span.appendChild($i);
      }
    }

    $div6 = document.createElement('div');
    $div6.className = 'column-full heart-div';
    $div3.appendChild($div6);

    $button = document.createElement('button');
    $button.className = 'heart-desktop-button';
    $div6.appendChild($button);

    $i = document.createElement('i');
    $i.className = 'fa-regular fa-heart heart-desktop';
    $i.setAttribute('data-heart-id', i + 1);
    $button.appendChild($i);

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

    if (data.products[i].description.toLowerCase().includes('for best results')) {
      var $3rdh3 = document.createElement('h3');
      $3rdh3.textContent = bestResultsHeader;
      $div5.appendChild($3rdh3);

      var $3rdp = document.createElement('p');
      $3rdp.textContent = bestResultsDescription;
      $3rdp.className = 'p-description';
      $div5.appendChild($3rdp);
    }
    // mobile dom
    $li = document.createElement('li');
    $li.setAttribute('data-product-id', i + 1);
    $li.className = 'single-product-details-mobile hidden';
    $productDetailsMobile.appendChild($li);

    $div1 = document.createElement('div');
    $div1.className = 'row img-product-info-mobile';
    $li.appendChild($div1);

    $div2 = document.createElement('div');
    $div2.className = 'column-full product-basics';
    $div1.appendChild($div2);

    $h2 = document.createElement('h2');
    $h2.textContent = 'Maybelline';
    $h2.className = 'h2-mobile';
    $div2.appendChild($h2);

    $h3 = document.createElement('h3');
    $h3.className = 'h3-mobile';
    $h3.textContent = stringName;
    $div2.appendChild($h3);

    $img = document.createElement('img');
    $img.className = 'img-mobile';
    $img.setAttribute('src', data.products[i].api_featured_image);
    $div2.appendChild($img);

    $div6 = document.createElement('div');
    $div6.className = 'column-full heart-div';
    $div2.appendChild($div6);

    $button = document.createElement('button');
    $button.className = 'heart-mobile-button';
    $div6.appendChild($button);

    $i = document.createElement('i');
    $i.className = 'fa-regular fa-heart heart-mobile';
    $i.setAttribute('data-heart-id', i + 1);
    $button.appendChild($i);

    $div3 = document.createElement('div');
    $div3.className = 'row';
    $div1.appendChild($div3);

    $div4 = document.createElement('div');
    $div4.className = 'column-full mobile-description';
    $div3.appendChild($div4);

    $2ndh3 = document.createElement('h3');
    $2ndh3.className = 'h3-description-mobile';
    $2ndh3.textContent = 'About The Product:';
    $div4.appendChild($2ndh3);

    $span = document.createElement('span');
    $span.className = 'span-mobile';
    $div4.appendChild($span);

    for (j = 0; j < 5; j++) {
      if (j + 0.5 <= data.products[i].rating && data.products[i].rating < (j + 1)) {
        $i = document.createElement('i');
        $i.className = 'fa-solid fa-star-half-stroke';
        $span.appendChild($i);
      } else if (j < data.products[i].rating && j + 0.5 < data.products[i].rating) {
        $i = document.createElement('i');
        $i.className = 'fa-solid fa-star';
        $span.appendChild($i);
      } else {
        $i = document.createElement('i');
        $i.className = 'fa-regular fa-star';
        $span.appendChild($i);
      }
    }

    $p = document.createElement('p');
    $p.className = 'p-description-mobile';
    $p.textContent = '$' + data.products[i].price;
    $div4.appendChild($p);

    $2ndh3 = document.createElement('h3');
    $2ndh3.textContent = 'Description:';
    $2ndh3.className = 'h3-description-mobile';
    $div4.appendChild($2ndh3);

    $2ndp = document.createElement('p');
    $2ndp.textContent = description;
    $2ndp.className = 'p-description-mobile';
    $div4.appendChild($2ndp);

    if (data.products[i].description.toLowerCase().includes('for best results')) {
      $3rdh3 = document.createElement('h3');
      $3rdh3.className = 'h3-description-mobile';
      $3rdh3.textContent = bestResultsHeader;
      $div4.appendChild($3rdh3);

      $3rdp = document.createElement('p');
      $3rdp.textContent = bestResultsDescription;
      $3rdp.className = 'p-description-mobile';
      $div4.appendChild($3rdp);
    }
  }

  // wishlist
  for (var k = 0; k < data.wishlist.length; k++) {
    $li = document.createElement('li');
    $li.className = 'column-third single-product-w';
    $li.setAttribute('data-product-id', k + 1);
    $li.setAttribute('data-product-type', data.wishlist[k].product.product_type);
    $wishlistUl.appendChild($li);

    $div = document.createElement('div');
    $div.className = 'border-div';
    $li.appendChild($div);

    $div1 = document.createElement('div');
    $div1.className = 'row product';
    $div.appendChild($div1);

    $div2 = document.createElement('div');
    $div2.className = 'column-half';
    $div1.appendChild($div2);

    $img = document.createElement('img');
    $img.setAttribute('src', data.wishlist[k].product.api_featured_image);
    $div2.appendChild($img);

    $div3 = document.createElement('div');
    $div3.className = 'column-half info';
    $div1.appendChild($div3);

    $h4 = document.createElement('h4');
    $h4.textContent = data.wishlist[k].product.name;
    $div3.appendChild($h4);

    $span = document.createElement('span');
    $div3.appendChild($span);

    for (var q = 0; q < 5; q++) {
      if (q + 0.5 <= data.wishlist[k].product.rating && data.wishlist[k].product.rating < (q + 1)) {
        $i = document.createElement('i');
        $i.className = 'fa-solid fa-star-half-stroke';
        $span.appendChild($i);
      } else if (q < data.wishlist[k].product.rating && q + 0.5 < data.wishlist[k].product.rating) {
        $i = document.createElement('i');
        $i.className = 'fa-solid fa-star';
        $span.appendChild($i);
      } else {
        $i = document.createElement('i');
        $i.className = 'fa-regular fa-star';
        $span.appendChild($i);
      }
    }

    $p = document.createElement('p');
    $p.className = 'p-search';
    $p.textContent = '$' + data.wishlist[k].product.price;
    $div3.appendChild($p);

    $div6 = document.createElement('div');
    $div6.className = 'column-full heart-div';
    $div1.appendChild($div6);

    $button = document.createElement('button');
    $button.className = 'heart-list';
    $div6.appendChild($button);

    $i = document.createElement('i');
    $i.className = 'fa-solid fa-heart';
    $i.setAttribute('data-heart-id', k + 1);
    $button.appendChild($i);
  }

  if (data.view === 'search') {
    $wishlist.classList.add('hidden');
    $searchDiv.classList.remove('hidden');
    $list.classList.remove('hidden');
    $desktop.classList.remove('hidden');
    $mobile.classList.remove('hidden');
    data.view = 'search';
  } else if (data.view === 'wishlist') {
    $searchDiv.classList.add('hidden');
    $wishlist.classList.remove('hidden');
    $list.classList.add('hidden');
    $desktop.classList.add('hidden');
    $mobile.classList.add('hidden');
    data.view = 'wishlist';
  }
}

$productList.addEventListener('click', handleClick);

function handleClick(event) {
  var closestId = event.target.closest('li');
  var $li = document.querySelectorAll('.single-product');
  var $liDescription = document.querySelectorAll('.single-product-details-desktop');
  var $liDescriptionM = document.querySelectorAll('.single-product-details-mobile');
  var $heart = document.querySelectorAll('.fa-heart');

  data.view = 'description';

  if (event.target.className.includes('fa-heart')) {
    event.target.classList = 'fa-solid fa-heart heart-list';
    for (var j = 0; j < $heart.length; j++) {
      var newObject = {
        product: data.products[j],
        wishlistId: data.nextWishlistId
      };

      if (event.target === $heart[j]) {
        data.wishlist.unshift(newObject);
        data.nextWishlistId++;
        var $wishlistItem = closestId.cloneNode(true);
        $wishlistItem.className = 'column-half single-product-w wishlist-item';
        $wishlistUl.appendChild($wishlistItem);
      }

      if (event.target.dataset.heartId === $heart[j].dataset.heartId) {
        $heart.forEach(function () {
          $heart[j].classList.remove('fa-regular');
          $heart[j].classList.add('fa-solid');
        });
      }
    }
  } else {
    for (var i = 0; i < $li.length; i++) {
      if ($li[i] === closestId) {
        $li[i].classList.add('hidden');
        $desktop.classList.remove('hidden');
        $mobile.classList.remove('hidden');
        $liDescription[i].classList.remove('hidden');
        $liDescriptionM[i].classList.remove('hidden');
        $list.classList.add('hidden');
      } else {
        $li[i].classList.add('hidden');
        $liDescription[i].classList.add('hidden');
        $liDescriptionM[i].classList.add('hidden');
      }
    }
  }
}

$desktop.addEventListener('click', handleClickDesktop);
$mobile.addEventListener('click', handleClickMobile);

function handleClickDesktop() {
  var $heart = document.querySelectorAll('.fa-heart');
  var $singleProduct = document.querySelectorAll('.single-product');
  if (event.target.className.includes('fa-heart')) {
    event.target.className = 'fa-solid fa-heart heart-desktop';
    for (var j = 0; j < $heart.length; j++) {
      var newObject = {
        product: data.products[event.target.dataset.heartId - 1],
        wishlistId: data.nextWishlistId
      };

      if (event.target === $heart[j]) {
        data.wishlist.unshift(newObject);
        data.nextWishlistId++;
        for (var i = 0; i < $singleProduct.length; i++) {
          if ($singleProduct[i].dataset.productId === $heart[j].dataset.heartId) {
            var $wishlistItem = $singleProduct[i].cloneNode(true);
            $wishlistItem.className = 'column-half single-product-w wishlist-item';
            $wishlistUl.appendChild($wishlistItem);
            $wishlistUl.prepend($wishlistItem);
          }
        }
      }

      if (event.target.dataset.heartId === $heart[j].dataset.heartId) {
        $heart.forEach(function () {
          $heart[j].classList.remove('fa-regular');
          $heart[j].classList.add('fa-solid');
        });
      }
    }
  }
}

function handleClickMobile() {
  var $heart = document.querySelectorAll('.fa-heart');
  var $singleProduct = document.querySelectorAll('.single-product');
  if (event.target.className.includes('fa-heart')) {
    event.target.className = 'fa-solid fa-heart heart-mobile';
    for (var j = 0; j < $heart.length; j++) {
      var newObject = {
        product: data.products[event.target.dataset.heartId - 1],
        wishlistId: data.nextWishlistId
      };

      if (event.target === $heart[j]) {
        data.wishlist.unshift(newObject);
        data.nextWishlistId++;
        for (var i = 0; i < $singleProduct.length; i++) {
          if ($singleProduct[i].dataset.productId === $heart[j].dataset.heartId) {
            var $wishlistItem = $singleProduct[i].cloneNode(true);
            $wishlistItem.className = 'column-half single-product-w wishlist-item';
            $wishlistUl.appendChild($wishlistItem);
          }
        }
      }

      if (event.target.dataset.heartId === $heart[j].dataset.heartId) {
        $heart.forEach(function () {
          $heart[j].classList.remove('fa-regular');
          $heart[j].classList.add('fa-solid');
        });
      }
    }
  }
}

$searchLink.addEventListener('click', viewSwap);
$wishlistLink.addEventListener('click', viewSwap);

function viewSwap(event) {
  if (event.target === $searchLink) {
    $wishlist.classList.add('hidden');
    $searchDiv.classList.remove('hidden');
    $list.classList.remove('hidden');
    $desktop.classList.remove('hidden');
    $mobile.classList.remove('hidden');
    data.view = 'search';
  } else if (event.target === $wishlistLink) {
    if (data.wishlist.length === 0) {
      var $none = document.querySelector('.none-header');
      var $p = document.createElement('p');
      $p.className = 'wishlist-none';
      $p.textContent = 'There are no products currently on your wishlist.';
      $none.appendChild($p);
    }
    $searchDiv.classList.add('hidden');
    $wishlist.classList.remove('hidden');
    $list.classList.add('hidden');
    $desktop.classList.add('hidden');
    $mobile.classList.add('hidden');
    data.view = 'wishlist';
  }
}

document.addEventListener('DOMContentLoaded', renderData);
