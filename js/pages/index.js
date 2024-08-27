import { SearchContainer } from "../components/SearchContainer.js";
import RecipeCard from "../components/RecipeCard.js";
import { recipes } from "../data/recipes.js";
import Filter from "../components/Filter.js";
import { getURLParams } from "../utils/getUrlParams.js";

const checkSearch = (recipe, searchQuery) => {
  if (!searchQuery) return true;

  const recipeName = recipe.name.toLowerCase();
  const recipeDescription = recipe.description.toLowerCase();
  let recipeIngredients = [];
  for (let i = 0; i < recipe.ingredients.length; i++) {
    recipeIngredients.push(recipe.ingredients[i].ingredient.toLowerCase());
  }
  const recipeAppareils = recipe.appliance.toLowerCase();
  let recipeUstensiles = [];
  for (let i = 0; i < recipe.ustensils.length; i++) {
    recipeUstensiles.push(recipe.ustensils[i].toLowerCase());
  }

  if (recipeName.includes(searchQuery) || recipeDescription.includes(searchQuery)) {
    return true;
  }

  for (let i = 0; i < recipeIngredients.length; i++) {
    if (recipeIngredients[i].includes(searchQuery)) {
      return true;
    }
  }

  if (recipeAppareils.includes(searchQuery)) {
    return true;
  }

  for (let i = 0; i < recipeUstensiles.length; i++) {
    if (recipeUstensiles[i].includes(searchQuery)) {
      return true;
    }
  }

  return false;
};

const checkIngredients = (recipe, ingredients) => {
  if (!ingredients || ingredients.length === 0) return true;

  let recipeIngredients = [];
  for (let i = 0; i < recipe.ingredients.length; i++) {
    recipeIngredients.push(recipe.ingredients[i].ingredient.toLowerCase());
  }

  for (let i = 0; i < ingredients.length; i++) {
    let found = false;
    for (let j = 0; j < recipeIngredients.length; j++) {
      if (recipeIngredients[j] === ingredients[i].toLowerCase()) {
        found = true;
        break;
      }
    }
    if (!found) return false;
  }

  return true;
};

const checkUstensils = (recipe, ustensiles) => {
  if (!ustensiles || ustensiles.length === 0) return true;

  let recipeUstensiles = [];
  for (let i = 0; i < recipe.ustensils.length; i++) {
    recipeUstensiles.push(recipe.ustensils[i].toLowerCase());
  }

  for (let i = 0; i < ustensiles.length; i++) {
    let found = false;
    for (let j = 0; j < recipeUstensiles.length; j++) {
      if (recipeUstensiles[j] === ustensiles[i].toLowerCase()) {
        found = true;
        break;
      }
    }
    if (!found) return false;
  }

  return true;
};

const checkAppareils = (recipe, appareils) => {
  if (!appareils || appareils.length === 0) return true;

  const recipeAppliance = recipe.appliance.toLowerCase();

  for (let i = 0; i < appareils.length; i++) {
    if (recipeAppliance === appareils[i].toLowerCase()) {
      return true;
    }
  }

  return false;
};

const filterRecipesBySearch = () => {
  const params = getURLParams();
  const searchQuery = params.search && params.search.length > 0 ? params.search[0].toLowerCase() : "";

  const filteredRecipes = [];
  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    const isSearchMatching = checkSearch(recipe, searchQuery);
    const isIngredientsMatching = checkIngredients(recipe, params.ingredients);
    const isUstensilsMatching = checkUstensils(recipe, params.ustensiles);
    const isAppareilsMatching = checkAppareils(recipe, params.appareils);

    if (isSearchMatching && isIngredientsMatching && isUstensilsMatching && isAppareilsMatching) {
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
            ${filteredRecipes
              .map((recipe) => RecipeCard.render(recipe))
              .join("")}
            </div>
        </section>`;
};

(async () => {
  displayPages();
})();

export default {
  displayPages,
};
