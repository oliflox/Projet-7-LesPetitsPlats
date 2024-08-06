import { SearchContainer } from "../components/SearchContainer.js";
import RecipeCard from "../components/RecipeCard.js";
import { recipes } from "../data/recipes.js";
import Filter from "../components/Filter.js";
import { getURLParams } from "../utils/getUrlParams.js";

const filterRecipesBySearch = () => {
  const params = getURLParams();
  let filteredRecipes = [];
  const searchQuery = params.search && params.search.length > 0 ? params.search[0].toLowerCase() : '';

  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    let matches = true;

    if (searchQuery) {
      const recipeName = recipe.name.toLowerCase();
      const recipeDescription = recipe.description.toLowerCase();
      
      matches = recipeName.indexOf(searchQuery) !== -1 || recipeDescription.indexOf(searchQuery) !== -1;

      if (!matches) {
        for (let j = 0; j < recipe.ingredients.length; j++) {
          const ingredient = recipe.ingredients[j].ingredient.toLowerCase();
          if (ingredient.indexOf(searchQuery) !== -1) {
            matches = true;
            break;
          }
        }
      }
    }

    if (matches && params.ustensiles && params.ustensiles.length > 0) {
      const recipeUstensiles = recipe.ustensils.map(u => u.toLowerCase());
      matches = params.ustensiles.every(ustensile => recipeUstensiles.includes(ustensile.toLowerCase()));
    }

    if (matches && params.ingredients && params.ingredients.length > 0) {
      const recipeIngredients = recipe.ingredients.map(i => i.ingredient.toLowerCase());
      matches = params.ingredients.every(ingredient => recipeIngredients.includes(ingredient.toLowerCase()));
    }
    if (matches && params.appareils && params.appareils.length > 0) {
      const recipeAppliance = recipe.appliance.toLowerCase();
      matches = params.appareils.includes(recipeAppliance);
    }

    if (matches) {
      filteredRecipes.push(recipe);
    }
  }

  return filteredRecipes;
};




export const displayPages = () => {
  const filteredRecipes = filterRecipesBySearch();
  const app = document.querySelector("#app");

  app.innerHTML = `
        ${SearchContainer()}
        <section class="recipeSection">
            ${Filter.render(filteredRecipes)}
            <div class="recipeGrid">
            ${filteredRecipes.map((recipe) => RecipeCard.render(recipe)).join("")}
            </div>
        </section>`
    ;
};

(async () => {
  displayPages();
})();

export default {
  displayPages,
};