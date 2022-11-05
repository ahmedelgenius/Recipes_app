let resluts = [];
getRecipes("pizza");

let links = document.querySelectorAll(".nav-link");
for (let i = 0; i < links.length; i++) {
  links[i].addEventListener("click", function (e) {
    let currentRecipe = e.target.text;
    getRecipes(currentRecipe);
  });
}
function getRecipes(meal) {
  let httpRequest = new XMLHttpRequest();
  httpRequest.open(
    "GET",
    `https://forkify-api.herokuapp.com/api/search?q=${meal}`
  );
  httpRequest.send();
  httpRequest.addEventListener("readystatechange", function () {
    if (httpRequest.readyState == 4 && httpRequest.status == 200) {
      resluts = JSON.parse(httpRequest.response).recipes;
      displayRecipes();
    }
  });
}
function displayRecipes() {
  let container = "";
  for (i = 0; i < resluts.length; i++) {
    container += `
    <div  class="col-md-3  ">
    <img class="w-100 h-50  rounded"src="${resluts[i].image_url}" alt="" />
          <h5 class='title'>${resluts[i].title}</h5>
          <div class=' d-flex justify-content-between '>
        <a class='btn btn-info' target='_blank' href='${resluts[i].source_url}'>source</a>
        <a data-bs-toggle="modal" data-bs-target="#exampleModal" onclick='openDetailsModal(${resluts[i].recipe_id})' class='btn btn-warning' target='_blank''>details</a>
        </div>
          </div>`;
  }

  document.getElementById("recipeCard").innerHTML = container;
}
let recipe = {};
async function openDetailsModal(recipeId) {
  let respons = await fetch(
    `https://forkify-api.herokuapp.com/api/get?rId=${recipeId}`
  );
  let data = await respons.json();
  recipe = data.recipe;
  console.log(recipe);
  displayDetails();
}

function displayDetails() {
  display = `
  <img class='w-100' src='${recipe.image_url}'/>
  <h2>${recipe.title}</h2>
  <p class='text-danger'>${recipe.ingredients}</p>
  `;

  document.getElementById("recipeData").innerHTML = display;
}
