import { SearchContainer } from "../components/SearchContainer.js";
import RecipeCard from "../components/RecipeCard.js";
import { recipes } from "../data/recipes.js";
import Filter from "../components/Filter.js";
import { getURLParams } from "../utils/getUrlParams.js";

const filterRecipesBySearch = () => {
  const params = getURLParams();
  let filteredRecipes = [...recipes];

  if (params.search && params.search.length > 0) {
    const searchQuery = params.search[0].toLowerCase();
    filteredRecipes = filteredRecipes.filter(recipe =>
      recipe.name.toLowerCase().includes(searchQuery) ||
      recipe.description.toLowerCase().includes(searchQuery) ||
      recipe.ingredients.some(i => i.ingredient.toLowerCase().includes(searchQuery))
    );
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