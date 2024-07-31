import { SearchContainer } from "../components/SearchContainer.js";
import RecipeCard from "../components/RecipeCard.js";
import { recipes } from "../data/recipes.js";
import Filter from "../components/Filter.js";
import { getURLParams } from "../utils/getUrlParams.js";

const normalizeString = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
};

const filterRecipesBySearch = () => {
  const params = getURLParams();
  let filteredRecipes = [...recipes];

  if (params.search && params.search.length > 0) {
    const searchQuery = normalizeString(params.search[0]);
    filteredRecipes = filteredRecipes.filter(recipe =>
      normalizeString(recipe.name).includes(searchQuery)
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
        </section>
    `;
};

(async () => {
  displayPages();
})();

export default {
  displayPages,
};
