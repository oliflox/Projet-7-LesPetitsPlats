import { recipes } from "../data/recipes.js";
import { getURLParams } from "../utils/getUrlParams.js";

const filterRecipesBySearch = () => {
  const params = getURLParams();
  const searchQuery = params.search?.[0]?.toLowerCase() || "";
  const ingredients = params.ingredients?.map(ingredient => ingredient.toLowerCase()) || [];
  const ustensiles = params.ustensiles?.map(ustensil => ustensil.toLowerCase()) || [];
  const appareils = params.appareils?.map(appareil => appareil.toLowerCase()) || [];

  return recipes.filter(({ name, description, ingredients: recipeIngredients, ustensils: recipeUstensiles, appliance }) => {
    const recipeName = name.toLowerCase();
    const recipeDescription = description.toLowerCase();
    const recipeIngredientsList = recipeIngredients.map(ing => ing.ingredient.toLowerCase());
    const recipeUstensilesList = recipeUstensiles.map(ust => ust.toLowerCase());
    const recipeAppareils = appliance.toLowerCase();

    return (
      (!searchQuery || [recipeName, recipeDescription, recipeAppareils].some(field => field.includes(searchQuery)) ||
        recipeIngredientsList.some(ing => ing.includes(searchQuery)) ||
        recipeUstensilesList.some(ust => ust.includes(searchQuery))) &&
      (ingredients.length === 0 || ingredients.every(ing => recipeIngredientsList.includes(ing))) &&
      (ustensiles.length === 0 || ustensiles.every(ust => recipeUstensilesList.includes(ust))) &&
      (appareils.length === 0 || appareils.includes(recipeAppareils))
    );
  });
};




  export default {
    filterRecipesBySearch
  };