import { SearchContainer } from "../components/SearchContainer.js";
import RecipeCard from "../components/RecipeCard.js";
import { recipes } from "../data/recipes.js";
import Filter from "../components/Filter.js";
import { getURLParams } from "../utils/getUrlParams.js";

const checkSearch = (recipe, searchQuery) => {
  if (!searchQuery) return true;

  const recipeName = recipe.name.toLowerCase();
  const recipeDescription = recipe.description.toLowerCase();
  const recipeIngredients = recipe.ingredients.map((ing) =>
    ing.ingredient.toLowerCase()
  );
  const recipeAppareils = recipe.appliance.toLowerCase();
  const recipeUstensiles = recipe.ustensils.map((u) => u.toLowerCase());

  return (
    recipeName.includes(searchQuery) ||
    recipeDescription.includes(searchQuery) ||
    recipeIngredients.some((ingredient) =>
      ingredient.includes(searchQuery)
    ) ||
    recipeAppareils.includes(searchQuery) ||
    recipeUstensiles.some((ustensile) => ustensile.includes(searchQuery))
  );
};

const checkIngredients = (recipe, ingredients) => {
  if (!ingredients || ingredients.length === 0) return true;

  const recipeIngredients = recipe.ingredients.map((i) =>
    i.ingredient.toLowerCase()
  );

  return ingredients.every((ingredient) =>
    recipeIngredients.includes(ingredient.toLowerCase())
  );
};

const checkUstensils = (recipe, ustensiles) => {
  if (!ustensiles || ustensiles.length === 0) return true;

  const recipeUstensiles = recipe.ustensils.map((u) => u.toLowerCase());

  return ustensiles.every((ustensile) =>
    recipeUstensiles.includes(ustensile.toLowerCase())
  );
};

const checkAppareils = (recipe, appareils) => {
  if (!appareils || appareils.length === 0) return true;

  const recipeAppliance = recipe.appliance.toLowerCase();

  return appareils.includes(recipeAppliance);
};

const filterRecipesBySearch = () => {
  const params = getURLParams();
  const searchQuery =
    params.search && params.search.length > 0
      ? params.search[0].toLowerCase()
      : "";

  const filteredRecipes = recipes.filter((recipe) => {
    const isSearchMatching = checkSearch(recipe, searchQuery);
    const isIngredientsMatching = checkIngredients(recipe, params.ingredients);
    const isUstensilsMatching = checkUstensils(recipe, params.ustensiles);
    const isAppareilsMatching = checkAppareils(recipe, params.appareils);

    return (
      isSearchMatching &&
      isIngredientsMatching &&
      isUstensilsMatching &&
      isAppareilsMatching
    );
  });

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
