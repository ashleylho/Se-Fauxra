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
var $p = document.querySelector('.wishlist-none');
var $oops = document.querySelector('.oops');

var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline');
xhr.responseType = 'json';
xhr.addEventListener('load', loadData);
xhr.addEventListener('error', errorMessage);
xhr.send();

function errorMessage() {
  var $error = document.querySelector('.error');
  $error.classList.remove('hidden');
}

function loadData(event) {
  var $spinner = document.querySelector('.spinner');
  if (xhr.readyState === 1) {
    $spinner.classList.remove('hidden');
  } else if (xhr.readyState === 4) {
    $spinner.classList.add('hidden');
  }
  data.products = xhr.response;
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
      $oops.classList.add('hidden');
      $list.classList.remove('hidden');
      $product[i].classList.remove('hidden');
    } else {
      $product[i].classList.add('hidden');
    }
    $productDetailsLi[i].classList.add('hidden');
    $productDetailsLiM[i].classList.add('hidden');
  }
  var categories = ['eyeshadow', 'bronzer', 'blush', 'foundation', 'eyeliner', 'lipstick', 'mascara'];
  if (!categories.includes(text)) {
    $oops.classList.remove('hidden');
  }

  data.view = 'search';
  $form.reset();
}

function renderData() {
  for (var i = 0; i < data.products.length; i++) {
    var $li = document.createElement('li');
    $li.className = 'column-third hidden single-product';
    $li.setAttribute('data-product-id', i + 1);
    $li.setAttribute('data-product-type', data.products[i].product_type);
    $li.setAttribute('data-api-id', data.products[i].id);
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

    $div3.appendChild(rating(data.products[i].rating));

    var $p = document.createElement('p');
    $p.className = 'p-search';
    $p.textContent = '$' + data.products[i].price;
    $div3.appendChild($p);

    var $div6 = document.createElement('div');
    $div6.className = 'column-full heart-div';
    $div1.appendChild($div6);

    var $button = document.createElement('button');
    $div6.appendChild($button);

    var $i = document.createElement('i');
    $i.className = 'fa-regular fa-heart';
    $i.setAttribute('data-heart-id', i + 1);
    $i.setAttribute('data-api-id', data.products[i].id);
    $button.appendChild($i);

    var stringName = data.products[i].name.slice(10);
    var indexOf = data.products[i].description.toLowerCase().indexOf('for best results');
    if (indexOf > 0) {
      var description = data.products[i].description.slice(0, indexOf);
    } else {
      description = data.products[i].description;
    }

    if (description.includes("Why You'll Love It")) {
      description = description.replace("Why You'll Love It", "Why You'll Love It: ");
    }
    var indexFeatures = data.products[i].description.toLowerCase().indexOf('features');
    if (description.includes('Features')) {
      description = description.slice(0, indexFeatures);
    }

    var colon = data.products[i].description.indexOf('s:');
    if (colon > 0) {
      var bestResultsHeader = 'For Best Results:';
    }
    var bestResultsDescription = data.products[i].description.slice(colon + 2);

    if (bestResultsDescription.includes('results')) {
      var noColon = bestResultsDescription.indexOf('results');
      bestResultsDescription = bestResultsDescription.slice(noColon + 8);
      bestResultsDescription = bestResultsDescription.charAt(0).toUpperCase() + bestResultsDescription.slice(1);
    }

    $li = document.createElement('li');
    $li.setAttribute('data-product-id', i + 1);
    $li.className = 'single-product-details-desktop hidden';
    $li.setAttribute('data-api-id', data.products[i].id);
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

    var $div7 = document.createElement('div');
    $div3.appendChild($div7);

    var $h2 = document.createElement('h2');
    $h2.textContent = 'Maybelline';
    $div7.appendChild($h2);

    var $h3 = document.createElement('h3');
    $h3.className = 'h3-product-basics';
    $h3.textContent = stringName;
    $div7.appendChild($h3);

    $p = document.createElement('p');
    $p.className = 'price-desktop';
    $p.textContent = '$' + data.products[i].price;
    $div7.appendChild($p);

    $div7.appendChild(rating(data.products[i].rating));

    $div6 = document.createElement('div');
    $div6.className = 'column-full heart-div';
    $div3.appendChild($div6);

    $button = document.createElement('button');
    $button.className = 'heart-desktop-button';
    $div6.appendChild($button);

    $i = document.createElement('i');
    $i.className = 'fa-regular fa-heart heart-desktop';
    $i.setAttribute('data-heart-id', i + 1);
    $i.setAttribute('data-api-id', data.products[i].id);
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

    $li = document.createElement('li');
    $li.setAttribute('data-product-id', i + 1);
    $li.setAttribute('data-api-id', data.products[i].id);
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
    $i.setAttribute('data-api-id', data.products[i].id);
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

    $div4.appendChild(rating(data.products[i].rating));

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

  wishlist();

  if (data.view === 'search') {
    $wishlist.classList.add('hidden');
    $searchDiv.classList.remove('hidden');
    $list.classList.add('hidden');
    $desktop.classList.add('hidden');
    $mobile.classList.add('hidden');
    data.view = 'search';
  } else if (data.view === 'wishlist') {
    $searchDiv.classList.add('hidden');
    $wishlist.classList.remove('hidden');
    $list.classList.add('hidden');
    $desktop.classList.add('hidden');
    $mobile.classList.add('hidden');
    data.view = 'wishlist';
  } else if (data.view === 'description') {
    data.view = 'description';
    $desktop.classList.remove('hidden');
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
    hearts();
    for (var j = 0; j < data.products.length; j++) {
      var newObject = {
        product: data.products[j],
        apiId: data.products[j].id,
        wishlistId: data.nextWishlistId
      };
      if (event.target === $heart[j]) {
        data.wishlist.push(newObject);
        data.nextWishlistId++;
        var $wishlistItem = closestId.cloneNode(true);
        $wishlistItem.className = 'column-half single-product-w';
        $wishlistUl.appendChild($wishlistItem);
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

$desktop.addEventListener('click', handleClickDescription);
$mobile.addEventListener('click', handleClickDescription);

function handleClickDescription() {
  var $heart = document.querySelectorAll('.fa-heart');
  var $singleProduct = document.querySelectorAll('.single-product');
  if (event.target.className.includes('fa-heart')) {
    if (window.matchMedia('(min-width: 768px)').matches) {
      event.target.className = 'fa-solid fa-heart heart-desktop';
    } else {
      event.target.className = 'fa-solid fa-heart heart-mobile';
    }
    for (var j = 0; j < $heart.length; j++) {
      var newObject = {
        product: data.products[event.target.dataset.heartId - 1],
        apiId: data.products[event.target.dataset.heartId - 1].id,
        wishlistId: data.nextWishlistId
      };
      if (event.target === $heart[j]) {
        data.wishlist.push(newObject);
        data.nextWishlistId++;
        for (var i = 0; i < $singleProduct.length; i++) {
          if ($singleProduct[i].dataset.productId === $heart[j].dataset.heartId) {
            var $wishlistItem = $singleProduct[i].cloneNode(true);
            $wishlistItem.className = 'column-half single-product-w';
            $wishlistUl.appendChild($wishlistItem);
          }
        }
      }
      hearts();
    }
  }
}

$searchLink.addEventListener('click', viewSwap);
$wishlistLink.addEventListener('click', viewSwap);

function viewSwap(event) {
  if (event.target === $searchLink) {
    $searchDiv.classList.remove('hidden');
    $list.classList.add('hidden');
    $desktop.classList.add('hidden');
    $mobile.classList.add('hidden');
    $wishlist.classList.add('hidden');
    data.view = 'search';
  } else if (event.target === $wishlistLink) {
    if (data.wishlist.length === 0) {
      $p.classList.remove('hidden');
    } else {
      $p.classList.add('hidden');
    }
    $searchDiv.classList.add('hidden');
    $wishlist.classList.remove('hidden');
    $list.classList.add('hidden');
    $desktop.classList.add('hidden');
    $mobile.classList.add('hidden');
    $oops.classList.add('hidden');
    data.view = 'wishlist';
    var $descriptions = document.querySelectorAll('.single-product-details-desktop');
    for (var q = 0; q < $descriptions.length; q++) {
      $descriptions[q].classList.add('hidden');
    }
  }
}

document.addEventListener('DOMContentLoaded', renderData);

$wishlist.addEventListener('click', handleWishlist);

function handleWishlist(event) {
  var $li = document.querySelectorAll('.single-product-w');
  var closest = event.target.closest('li');
  var $allHearts = document.querySelectorAll('.fa-heart');
  for (var i = 0; i < $li.length; i++) {
    if (event.target.tagName === 'I' && closest === $li[i]) {
      data.wishlist.splice(i, 1);
      closest.remove();
      for (var j = 0; j < $allHearts.length; j++) {
        if (event.target.dataset.apiId === $allHearts[j].dataset.apiId) {
          $allHearts[j].classList.remove('fa-solid');
          $allHearts[j].classList.add('fa-regular');
        }
      }
    }
  }

  if (data.wishlist.length === 0) {
    $p.classList.remove('hidden');
  } else {
    $p.classList.add('hidden');
  }
}

if (data.wishlist.length === 0) {
  $p.classList.remove('hidden');
} else {
  $p.classList.add('hidden');
}

function wishlist() {
  for (var k = 0; k < data.wishlist.length; k++) {
    var $li = document.createElement('li');
    $li.className = 'column-half single-product-w';
    $li.setAttribute('data-api-id', data.wishlist[k].product.id);
    $li.setAttribute('data-product-type', data.wishlist[k].product.product_type);
    $wishlistUl.appendChild($li);

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
    $img.setAttribute('src', data.wishlist[k].product.api_featured_image);
    $div2.appendChild($img);

    var $div3 = document.createElement('div');
    $div3.className = 'column-half info';
    $div1.appendChild($div3);

    var $h4 = document.createElement('h4');
    $h4.textContent = data.wishlist[k].product.name;
    $div3.appendChild($h4);

    $div3.appendChild(rating(data.wishlist[k].product.rating));

    var $p = document.createElement('p');
    $p.className = 'p-search';
    $p.textContent = '$' + data.wishlist[k].product.price;
    $div3.appendChild($p);

    var $div6 = document.createElement('div');
    $div6.className = 'column-full heart-div';
    $div1.appendChild($div6);

    var $button = document.createElement('button');
    $div6.appendChild($button);

    var $i = document.createElement('i');
    $i.className = 'fa-solid fa-heart wishlist-heart';
    $i.setAttribute('data-heart-id', data.wishlist[k].wishlistId);
    $i.setAttribute('data-api-id', data.wishlist[k].product.id);
    $button.appendChild($i);
  }
}

function hearts() {
  var $allHearts = document.querySelectorAll('.fa-heart');
  if (event.target.matches('.fa-heart')) {
    for (var i = 0; i < $allHearts.length; i++) {
      if (event.target.dataset.apiId === $allHearts[i].dataset.apiId) {
        $allHearts[i].classList.remove('fa-regular');
        $allHearts[i].classList.add('fa-solid');
      }
    }
  }
}

function rating(rating) {
  var $span = document.createElement('span');
  for (var j = 0; j < 5; j++) {
    if (j + 0.5 <= rating && rating < (j + 1)) {
      var $i = document.createElement('i');
      $i.className = 'fa-solid fa-star-half-stroke';
      $span.appendChild($i);
    } else if (j < rating && j + 0.5 < rating) {
      $i = document.createElement('i');
      $i.className = 'fa-solid fa-star';
      $span.appendChild($i);
    } else {
      $i = document.createElement('i');
      $i.className = 'fa-regular fa-star';
      $span.appendChild($i);
    }
  }
  return $span;
}
