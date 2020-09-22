//"use strict";

/*
document.addEventListener('DOMContentLoaded', (e) => {
    setTimeout(() => {
        document.querySelector('.splash').classList.add('display-none');
    }, 2000);

});*/

// Global variable
let _restaurants = [];
let _favs = [];
let _category = [];
let _selectedKeyword = "";

// Appends JSON data to the DOM
function appendRestaurants(restaurants) {
  let htmlTemplate = "";
  for (let restaurant of restaurants) {
    htmlTemplate += /*html*/ `
<section class="page" class="cafema" id="${restaurant.id}">
  <div class="bg-holder" style="background-image: url('${restaurant.img}')">
    <a href="#restauranter"><img src="img/arrow.png" alt="" id="arrow-cafe"></a> <br><br><br>
  </div>
    <div class="xontent-container">
      <div class="top-container">
        <div class="name">
          <h1>${restaurant.name}</h1>
        </div>
        <div class="price-save">
          <img src="img/dollar-signs.png" width="27px">
          <img src="img/heart.png" width="17px">
        </div>
      </div>
      <div class="info">
        <div id="icon-text">
          <img src="img/opening-hours.png" width="20px">
          <p>${restaurant.hours}</p>
        </div>
        <div id="icon-text">
          <img src="img/phone.png" width="20px">
          <p>${restaurant.phone}</p>
        </div>
        <div id="icon-text">
          <img src="img/address.png" width="20px">
          <p>${restaurant.adress}</p>
        </div>
        <div id="icon-text">
          <img src="img/stars.png" width="110px">
        </div>
      </div>
    <div class="accordion">
      <div class="accordion__item open-accordion">
        <div class="accordion__header">${restaurant.option1}</div>
        <div class="accordion__body">
          <p>${restaurant.description1}</p>
        </div>
      </div>
      <div class="accordion__item">
        <div class="accordion__header">${restaurant.option2}</div>
        <div class="accordion__body">
          <p>${restaurant.description2}</p>
        </div>
      </div>
      <div class="accordion__item">
        <div class="accordion__header">${restaurant.option3}</div>
        <div class="accordion__body">
          <p>${restaurant.description3}
          </p>
        </div>
      </div>

    </div>
      <div class="menu-link">
    <h3>Se resten af vores menu <a href="${restaurant.link}">her</a></h3>
  </div>
  </div>

</section>
        `;

  }

  document.querySelector("body").innerHTML += htmlTemplate;
  pageChange();
}

// COLLAPSIBLES
function init() {
  $(document).ready(function () {
    $('.accordion__header').click(function () {

      $(".accordion__body").not($(this).next()).slideUp(400);
      $(this).next().slideToggle(400);

      $(".accordion__item").not($(this).closest(".accordion__item")).removeClass("open-accordion");
      $(this).closest(".accordion__item").toggleClass("open-accordion");
    });
  });
};

// Fetches JSON data from the JSON file categories.json
fetch('json/restaurants.json')
  .then(function (response) {
    return response.json();
  })
  .then(function (jsonData) {
    console.log(jsonData);
    _restaurants = jsonData;
    appendRestaurants(jsonData)
    init();
  });

function addtofav(id) {
  let fav = _restaurants.find(fav => fav.id === id);
  _favs.push(fav);
  appendFav();
  filteredbykeyword(_selectedKeyword);
}

function removefromfav(id) {
  _favs = _favs.filter(fav => fav.id !== id);
  appendFav();
  filteredbykeyword(_selectedKeyword);
}

/**
 * Checking if resturant already is added to _favs
 */
function isFav(id) {
  return _favs.find(fav => fav.id === id); // checking if _favMovies has the movie with matching id or not
}

function appendFav() {
  let htmlTemplate = "";
  for (let restaurant of _favs) {
    console.log(restaurant);
    htmlTemplate += /*html*/ `
        <article>
            <a href="#${restaurant.id}"> 
      <div class="page-container">        
<div class="fav-container">

        <div class="img-name-cont">

            <div>
               <img class="rest-img" src="${restaurant.img}">
            </div>

            <div class="name-city">
                <div class="rest-name">
                <h2>${restaurant.name}</h2>
                </div>

                <div class="rest-city">
                <h3>Aarhus</h3>
            </div>
            
            </div>
        </div>
</a>
        <div class="heart-img">
            <img id="hjerte" onclick="addtofav('${restaurant.id}')" src="img/heart-filled.png">
        </div>

    </div>
 </div>  
        </article>
        `
  };
  document.querySelector("#favoritcontainer").innerHTML = htmlTemplate;
}


// Fetches JSON data from the JSON file categories.json
fetch('json/categories.json')
  .then(function (response) {
    return response.json();
  })
  .then(function (jsonData) {
    console.log(jsonData);
    _category = jsonData;
    console.log(_category);
    appendCategories(jsonData)
  });

// Appends JSON data to the DOM
function appendCategories(categories) {
  let htmlTemplate = "";
  for (let category of categories) {
    htmlTemplate += /*html*/ `
        <article onclick = "filteredbykeyword('${category.name}')">
        <a href = "#restauranter"> <img src = "${category.img}"> 
        <h3>${category.name}</h3></a>
        </article>
        `;
  }
  document.querySelector("#categories").innerHTML = htmlTemplate;
}

function filteredbykeyword(keyword) {
  _selectedKeyword = keyword;
  let restaurants = [];
  for (let restaurant of _restaurants) {
    console.log(restaurant)
    if (restaurant.categories.includes(keyword.toLowerCase())) {
      restaurants.push(restaurant);
    }
  }
  console.log(restaurants);
  appendRestaurantsByCategory(restaurants);
  navigateTo("restauranter");
}

function search(value) {
  let searchQuery = value.toLowerCase();
  let filteredProducts = [];
  for (let cat of _category) {
    let name = cat.name.toLowerCase();

    if (name.includes(searchQuery)) {
      filteredProducts.push(cat);
    }
  }
  console.log(filteredProducts);
  appendCategories(filteredProducts);
}




// Appends JSON data to the DOM
function appendRestaurantsByCategory(restaurants) {
  let htmlTemplate = "";
  for (let restaurant of restaurants) {
    console.log(restaurant);
    htmlTemplate += /*html*/ `
        <article>
        <a href="#${restaurant.id}"> <img class="resti-img" src="${restaurant.imgcrop}">
        <div class="name-heart">
        <h3>${restaurant.name}</h3></a>
        ${generateFavButton(restaurant.id)}
        </div>
        </article>
        `
  };


  document.querySelector("#restaurants").innerHTML = htmlTemplate;
}

/**
 * Generating the fav button
 */
function generateFavButton(id) {
  let btnTemplate = `
    <img id="hjerte" onclick="addtofav('${id}')" src="img/heart.png">`;
  if (isFav(id)) {
    btnTemplate = `
      <img id="hjerte" onclick="removefromfav('${id}')" src="img/heart-filled.png">`;
  }
  return btnTemplate;
}