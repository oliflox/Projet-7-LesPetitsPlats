import { recipes } from "../data/recipes.js";
import { getURLParams } from "../utils/getUrlParams.js";

const filterRecipesBySearch = () => {
  const params = getURLParams();
  const searchQuery = params.search && params.search.length > 0 ? params.search[0].toLowerCase() : "";
  const ingredients = params.ingredients ? params.ingredients.map(ingredient => ingredient.toLowerCase()) : [];
  const ustensiles = params.ustensiles ? params.ustensiles.map(ustensil => ustensil.toLowerCase()) : [];
  const appareils = params.appareils ? params.appareils.map(appareil => appareil.toLowerCase()) : [];

  return recipes.filter(recipe => {
    const recipeName = recipe.name.toLowerCase();
    const recipeDescription = recipe.description.toLowerCase();
    const recipeIngredients = recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase());
    const recipeUstensiles = recipe.ustensils.map(ustensil => ustensil.toLowerCase());
    const recipeAppareils = recipe.appliance.toLowerCase();

    const matchesSearchQuery = !searchQuery || 
      recipeName.includes(searchQuery) ||
      recipeDescription.includes(searchQuery) ||
      recipeIngredients.some(ingredient => ingredient.includes(searchQuery)) ||
      recipeUstensiles.some(ustensil => ustensil.includes(searchQuery)) ||
      recipeAppareils.includes(searchQuery);

    const matchesIngredients = ingredients.length === 0 || 
      ingredients.every(ingredient => recipeIngredients.includes(ingredient));

    const matchesUstensiles = ustensiles.length === 0 || 
      ustensiles.every(ustensil => recipeUstensiles.includes(ustensil));

    const matchesAppareils = appareils.length === 0 || 
      appareils.includes(recipeAppareils);

    return matchesSearchQuery && matchesIngredients && matchesUstensiles && matchesAppareils;
  });
};



  export default {
    filterRecipesBySearch
  };