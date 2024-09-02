import { recipes } from "../data/recipes.js";
import { getURLParams } from "../utils/getUrlParams.js";

const filterRecipesBySearch = () => {
  const params = getURLParams();
  const searchQuery = params.search && params.search.length > 0 ? params.search[0].toLowerCase() : "";
  const ingredients = params.ingredients ? params.ingredients.map(ingredient => ingredient.toLowerCase()) : [];
  const ustensiles = params.ustensiles ? params.ustensiles.map(ustensil => ustensil.toLowerCase()) : [];
  const appareils = params.appareils ? params.appareils.map(appareil => appareil.toLowerCase()) : [];

  const filteredRecipes = [];

  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    const recipeName = recipe.name.toLowerCase();
    const recipeDescription = recipe.description.toLowerCase();
    const recipeIngredients = recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase());
    const recipeUstensiles = recipe.ustensils.map(ustensil => ustensil.toLowerCase());
    const recipeAppareils = recipe.appliance.toLowerCase();

    let isMatching = true;

    if (searchQuery && !(recipeName.includes(searchQuery) || recipeDescription.includes(searchQuery) || recipeIngredients.some(ingredient => ingredient.includes(searchQuery)) || recipeUstensiles.some(ustensil => ustensil.includes(searchQuery)) || recipeAppareils.includes(searchQuery))) {
      isMatching = false;
    }

    if (isMatching && ingredients.length > 0 && !ingredients.every(ingredient => recipeIngredients.includes(ingredient))) {
      isMatching = false;
    }

    if (isMatching && ustensiles.length > 0 && !ustensiles.every(ustensil => recipeUstensiles.includes(ustensil))) {
      isMatching = false;
    }

    if (isMatching && appareils.length > 0 && !appareils.includes(recipeAppareils)) {
      isMatching = false;
    }

    if (isMatching) {
      filteredRecipes.push(recipe);
    }
  }

  return filteredRecipes;
};


  export default {
    filterRecipesBySearch
  };